'use strict';

function AdActivitiesListContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.activityStatusDropListResult = {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryAdvertisementListResult = {};
	
	this.activityTypeDropListResult = {};
	
	this.promoteTypeDropListResult = {};
	
	this.approveMethodDropListResult = {};
	
	this.approveStatusDropListResult = {};
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};

    this.execute = function() {
    	
    	this.getActivityPromoteType();
    	
    	this.getActivityStatus();
    	
    	this.getActivityType();
    	
    	this.getApproveMethod();
    	
    	this.getApproveStatus();
    	this.roleCode = UserUtil.getUserRole();
    	if(this.roleCode == 'OE'){
    		this.queryModel.entityDTO.activityStatus = "1";
    		
    	}
    	if($stateParams.data) {
    		this.queryModel.entityDTO.activityStatus =$stateParams.data.status;
    	}
    };
    
	this.getActivityPromoteType = function() {
		this.promoteTypeDropListResult = webStorageCache.get(DropDownListDefines.PROMOTE_TYPE);
		if (!this.promoteTypeDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.PROMOTE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.promoteTypeDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.PROMOTE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getActivityStatus = function() {
		this.activityStatusDropListResult = webStorageCache.get(DropDownListDefines.ACTIVITY_STATUS);
		if (!this.activityStatusDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACTIVITY_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.activityStatusDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.ACTIVITY_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getActivityType = function() {
		this.activityTypeDropListResult = webStorageCache.get(DropDownListDefines.ACTIVITY_TYPE);
		if (!this.activityTypeDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACTIVITY_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.activityTypeDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.ACTIVITY_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getApproveMethod = function() {
		this.approveMethodDropListResult = webStorageCache.get(DropDownListDefines.APPROVE_METHOD);
		if (!this.approveMethodDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.APPROVE_METHOD);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.approveMethodDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.APPROVE_METHOD,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getApproveStatus = function() {
		this.approveStatusDropListResult = webStorageCache.get(DropDownListDefines.ACTIVITY_APPROVE_STATUS);
		if (!this.approveStatusDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACTIVITY_APPROVE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.approveStatusDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.ACTIVITY_APPROVE_STATUS,
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
    
    this.goAdActivityAdd = function () {
    	$state.go('main.adActivityAdd');
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    
    this.viewAdActivity = function (raw) {

    	$state.go('main.adActivityView',{"data":{"activityId":raw.activityId,"activityStatus":raw.activityStatus}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    

    

    
    this.publishAdActivityConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.publishAdActivity = function (raw) {
    	
    	  this.publishAdActivityConfirm.opened = true;
          // 确认回调
          this.publishAdActivityConfirm.ok = function() {
        	  
        	  this.queryModel = {entityDTO:{}};
        	  
        	  this.queryModel.entityDTO.activityId = raw.activityId;
        		var promise = apiService.post(ApiDefines.PUBLISH_ACTIVITY,
        				angular.extend( this.queryModel ));
        		promise.then(function(result) {
        			if ('1' == result.code) {
        				 this.doPagingSearch(1);
        				 this.popAlert("发布操作完成", 'success');
        			} else {
        				// .....
        				this.popAlert(result.message, 'error');
        			}
        		}.bind(this));
          }.bind(this);
    };
    

    
    this.puaseAdActivityConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.puaseAdActivity = function (raw) {
    	
    	  this.puaseAdActivityConfirm.opened = true;
          // 确认回调
          this.puaseAdActivityConfirm.ok = function() {
        	  
        	  this.queryModel = {entityDTO:{}};
        	  
        	  this.queryModel.entityDTO.activityId = raw.activityId;

        	  var promise = apiService.post(ApiDefines.PUASE_ACTIVITY,
        				angular.extend( this.queryModel ));
        		promise.then(function(result) {
        			if ('1' == result.code) {
        				 this.doPagingSearch(1);
        				 this.popAlert("暂停操作完成", 'success');
        			} else {
        				// .....
        				this.popAlert(result.message, 'error');
        			}
        		}.bind(this));
          }.bind(this);
    };
    
    
    this.auditAdActivity = function (raw) {
    	$state.go('main.adActivityAudit',{"data":{"activityId":raw.activityId,"activityStatus":raw.activityStatus}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.ADVERTISEMENT_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryAdvertisementListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
    
    

    
    this.deleteAdActivityConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
    this.deleteAdActivity = function (raw) {
    	
  	  this.deleteAdActivityConfirm.opened = true;
        // 确认回调
        this.deleteAdActivityConfirm.ok = function() {
      	  
      	  this.queryModel = {entityDTO:{}};
      	  
      	  this.queryModel.entityDTO.activityId = raw.activityId;
      		var promise = apiService.post(ApiDefines.DELETE_ADACTIVITY,
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
    
    this.subitToAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.sumbitToAudit = function (raw) {
    	
    	  this.subitToAuditConfirm.opened = true;
          // 确认回调
          this.subitToAuditConfirm.ok = function() {
        	  
        	  this.queryModel = {entityDTO:{}};
        	  
        	  this.queryModel.entityDTO.activityId = raw.activityId;
        		var promise = apiService.post(ApiDefines.SUMBIT_TO_AUDIT,
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

    
    this.updateAdActivity = function (raw) {
    	$state.go('main.adActivityUpdate',{"data":{"activityId":raw.activityId,"activityStatus":raw.activityStatus}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };

}

AdActivitiesListContext.extend(ContextSupport);
