'use strict';

function MessageListContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryMessageListResult = {};
	
	this.messageStatusResult = {};
	
	this.messageReceiverRangeResult = {};
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};


    this.execute = function() {
    	
    	this.getMessageStatus();
    	
    	this.getMessageReceiverRange();
    	
    	if($stateParams.data) {
    		this.queryModel.entityDTO.status=$stateParams.data.status;
    	}
    };
    
    this.editMessage = function (raw) {

		var promise = apiService.post(ApiDefines.MESSAGE_DETAIL, angular
			.extend( {entityDTO:{messageId:raw.messageId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.messageDetailResult = result.data;
				$state.go('main.messageEdit',{"data":{"messageInfo":result.data}});
			}
		}.bind(this));

        var memberManageInfo =  {
                name: '消息管理',
                sref: 'main.myPromotion'
            };
            this.doActiveMenu(memberManageInfo);

    }
    
    this.viewMessage = function (raw) {
		var promise = apiService.post(ApiDefines.MESSAGE_DETAIL, angular
			.extend( {entityDTO:{messageId:raw.messageId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.messageDetailResult = result.data;
				$state.go('main.messageView',{"data":{"messageInfo":result.data}});
			}
		}.bind(this));


        var memberManageInfo =  {
                name: '消息管理',
                sref: 'main.myPromotion'
            };
		this.doActiveMenu(memberManageInfo);

    }
    
    this.createMessage = function () {
    	
    	$state.go('main.messageCreate');

        var memberManageInfo =  {
                name: '消息管理',
                sref: 'main.myPromotion'
            };
            this.doActiveMenu(memberManageInfo);

    }
    
    this.sendMessageConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	this.sendMessage = function(messageId) {
		this.sendMessageConfirm.opened = true;
        // 确认回调
        this.sendMessageConfirm.ok = function() {
		this.queryModel.entityDTO.messageId = messageId;
		var promise = apiService.post(ApiDefines.SEND_MESSAGE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息发送成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
	
    this.deleteMessageConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	
	this.deleteMessage = function(messageId) {
		this.deleteMessageConfirm.opened = true;
        // 确认回调
        this.deleteMessageConfirm.ok = function() {
		this.queryModel.entityDTO.messageId = messageId;
		var promise = apiService.post(ApiDefines.DELETE_MESSAGE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息删除成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
    
	this.getMessageStatus = function() {
		this.messageStatusResult = webStorageCache.get(DropDownListDefines.MESSAGE_STATUS);
		if (!this.messageStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MESSAGE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.messageStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.MESSAGE_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMessageReceiverRange = function() {
		this.messageReceiverRangeResult = webStorageCache.get(DropDownListDefines.MESSAGE_RECEIVER_RANGE);
		if (!this.messageReceiverRangeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MESSAGE_RECEIVER_RANGE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.messageReceiverRangeResult = result.data;
					webStorageCache.set(DropDownListDefines.MESSAGE_RECEIVER_RANGE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.MESSAGE_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryMessageListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);

	this.reset = function() {
	    this.queryModel = {entityDTO:{}};
	};
}

MessageListContext.extend(ContextSupport);
