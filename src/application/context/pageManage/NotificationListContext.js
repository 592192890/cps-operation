'use strict';

function NotificationListContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.noticeStatusResult = {};
    
    this.noticeTypeResult = {};
    
    this.queryNoticeListResult = {};
    
    this.isSendMsgResult = {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};

    this.execute = function() {
    	
    	this.roleCode = UserUtil.getUserRole();
    	
    	this.getNoticeStatus();
    	
    	this.isSendMsg();
    	
    	this.getNoticeType();
    	if($stateParams.data) {
    		this.queryModel.entityDTO.status =$stateParams.data.status;
			$stateParams.data.status = null;
    	}
    };
    
    this.updateNotice = function (raw) {

    	$state.go('main.updateNotification',{"data":{"noticeId":raw.noticeId}});
        var promotionManageInfo =  {
            name: '页面管理',
            sref: 'main.notificationManagement'
        };
        this.doActiveMenu(promotionManageInfo);
    };

	this.viewNotice = function (raw) {
		$state.go('main.viewNotification',{"data":{"noticeId":raw.noticeId}});
		var viewNotificationInfo =  {
			name: '页面管理',
			sref: 'main.notificationManagement'
		};
		this.doActiveMenu(viewNotificationInfo);
	}
    
    this.goApprove = function (raw) {

    	$state.go('main.approveNotification',{"data":{"noticeId":raw.noticeId}});
        var promotionManageInfo =  {
            name: '页面管理',
            sref: 'main.notificationManagement'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    
    
    
    this.addNotification = function () {
    	
    	$state.go('main.addNotification');
    	
        var promotionManageInfo =  {
                name: '页面管理',
                sref: 'main.notificationManagement'
            };
            this.doActiveMenu(promotionManageInfo);

    }
    
	this.getNoticeStatus = function() {
		this.noticeStatusResult = webStorageCache.get(DropDownListDefines.NOTICE_STATUS);
		if (!this.noticeStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.NOTICE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.noticeStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.NOTICE_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.isSendMsg = function() {
		this.isSendMsgResult = webStorageCache.get(DropDownListDefines.NOTICE_IS_SEND_MSG);
		if (!this.isSendMsgResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.NOTICE_IS_SEND_MSG);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.isSendMsgResult = result.data;
					webStorageCache.set(DropDownListDefines.NOTICE_IS_SEND_MSG,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getNoticeType = function() {
		this.noticeTypeResult = webStorageCache.get(DropDownListDefines.NOTICE_TYPE);
		if (!this.noticeTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.NOTICE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.noticeTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.NOTICE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
    this.deleteNoticeConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
    this.deleteNotice = function (raw) {
    	
  	  this.deleteNoticeConfirm.opened = true;
        // 确认回调
        this.deleteNoticeConfirm.ok = function() {
      	  
      	  this.queryModel = {entityDTO:{}};
      	  
      	  this.queryModel.entityDTO.noticeId = raw.noticeId;
      		var promise = apiService.post(ApiDefines.DELETE_NOTICE,
      				angular.extend( this.queryModel ));
      		promise.then(function(result) {
      			if ('1' == result.code) {
      				 this.doPagingSearch(1);
      				 this.popAlert("删除操作完成", 'success');
      			} else {
      				// .....
      				this.popAlert(result.message, 'error');
      			}
      		}.bind(this));
        }.bind(this);
  };
  
  this.askForApproveConfirm = {
          opened: false,
          ok: undefined,
          cancel: undefined
  };
  
  
  this.askForApprove = function (raw) {
  	
	  this.askForApproveConfirm.opened = true;
      // 确认回调
      this.askForApproveConfirm.ok = function() {
    	  
    	  this.queryModel = {entityDTO:{}};
    	  
    	  this.queryModel.entityDTO.noticeId = raw.noticeId;
    		var promise = apiService.post(ApiDefines.ASK_FOR_APPROVE,
    				angular.extend( this.queryModel ));
    		promise.then(function(result) {
    			if ('1' == result.code) {
    				 this.doPagingSearch(1);
    				 this.popAlert("提交审核操作完成", 'success');
    			} else {
    				// .....
    				this.popAlert(result.message, 'error');
    			}
    		}.bind(this));
      }.bind(this);
};

this.offLineConfirm = {
        opened: false,
        ok: undefined,
        cancel: undefined
};


this.offLine = function (raw) {
	
	  this.offLineConfirm.opened = true;
    // 确认回调
    this.offLineConfirm.ok = function() {
  	  
  	  this.queryModel = {entityDTO:{}};
  	  
  	  this.queryModel.entityDTO.noticeId = raw.noticeId;
  		var promise = apiService.post(ApiDefines.OFF_LINE,
  				angular.extend( this.queryModel ));
  		promise.then(function(result) {
  			if ('1' == result.code) {
  				 this.doPagingSearch(1);
  				 this.popAlert("下线操作完成", 'success');
  			} else {
  				// .....
  				this.popAlert(result.message, 'error');
  			}
  		}.bind(this));
    }.bind(this);
};




  



this.sortNotice = function(orderAction,noticeId) {
	
	this.queryModel = {entityDTO:{}};
	
	this.queryModel.entityDTO.noticeId = noticeId;
	
	this.queryModel.entityDTO.orderAction = orderAction;
	
	
	
	var promise = apiService.post(ApiDefines.SORT_NOTICE, angular
			.extend(this.queryModel));
	promise.then(function(result) {
		if ('1' == result.code) {
			this.doPagingSearch(this.index);
			this.popAlert("排序完成", 'success');
		} else {
			// .....
			this.popAlert(result.message, 'error');
		}
	}.bind(this));
	
}.bind(this);
  
	
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.NOTICE_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryNoticeListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	
    this.reset =function () {
     	 this.queryModel = {entityDTO:{}};
     };

}

NotificationListContext.extend(ContextSupport);
