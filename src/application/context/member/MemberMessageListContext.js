'use strict';

function MemberMessageListContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.queryMemberMessageListResult = {};
    
    this.userMessageStatusResult = {};
    
    this.messageTypeResult = {};
    
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};


    this.execute = function() {
    	
    	this.getUserMessageStatus();
    	
    	this.getMessageType();
    };
    
    this.viewMessageInfo = function (raw) {

		var promise = apiService.post(ApiDefines.MEMBER_MESSAGE_DETAIL, angular
			.extend({entityDTO:{userMessageId:raw.userMessageId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.memberMessageDetailResult = result.data;
				$state.go('main.messageDetail',{"data":{"userMessageInfo":this.memberMessageDetailResult}});
			}
		}.bind(this));



        var memberManageInfo =  {
                name: '消息管理',
                sref: 'main.myPromotion'
            };
            this.doActiveMenu(memberManageInfo);

    }
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.MEMBER_MESSAGE_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryMemberMessageListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	
	this.getUserMessageStatus = function() {
		this.userMessageStatusResult = webStorageCache.get(DropDownListDefines.USER_MESSAGE_STATUS);
		if (!this.userMessageStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.USER_MESSAGE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.userMessageStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.USER_MESSAGE_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMessageType = function() {
		this.messageTypeResult = webStorageCache.get(DropDownListDefines.MESSAGE_TYPE);
		if (!this.messageTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MESSAGE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.messageTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.MESSAGE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
    this.reset =function () {
     	 this.queryModel = {entityDTO:{}};
     };

}

MemberMessageListContext.extend(ContextSupport);
