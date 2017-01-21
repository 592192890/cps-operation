'use strict';

function ActivityEncourageAuditContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.qeuryResult = {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    
	this.encourageTypeDropList = {};
	
	this.encourageStatusDropList = {};
	
	this.encourageMethodDropList = {};
	
	this.encourageScopeDropList = {};
	
	this.auditResultDropList = {};
	
	this.auditHis =0;
	
	this.submit = function () {
		var url ="";
    	if(	webStorageCache.get('auditType') == 1) {
    		url = ApiDefines.BISSNESS_ENCOURAGE_AUDIT
    	} else {
    		url = ApiDefines.FINANCE_ENCOURAGE_AUDIT
    	}
    	this.queryModel.entityDTO.approveResult = 1;
    	var promise = apiService.post(url,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				 this.popAlert("操作成功", 'success');
				 this.goBack();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	};
	
	   this.noPassReason = {
	            opened: false,
	            ok: undefined,
	            cancel: undefined
	    };
	
	this.submitFalse = function () {
	    this.noPassReason.opened = true;
        // 确认回调
        this.noPassReason.ok = function(content) {
			var url ="";
	    	if(	webStorageCache.get('auditType') == 1) {
	    		url = ApiDefines.BISSNESS_ENCOURAGE_AUDIT
	    	} else {
	    		url = ApiDefines.FINANCE_ENCOURAGE_AUDIT
	    	}
	    	this.queryModel.entityDTO.approveResult = 0;
	    	this.queryModel.entityDTO.remark= content;
	    	var promise = apiService.post(url,
					angular.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					 this.popAlert("操作成功", 'success');
					 this.goBack();
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
        }.bind(this);
	};
	
	this.getEncourageFalseReasonDropList = function () {
		 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_APPROVE_REMARK);
		 promise.then(function(result) {
			 if ('1' == result.code) {
				 webStorageCache.set('noPassAuditReasonArr', result.data ,{exp : Constants.EXP_TIME });
			 }
		 }.bind(this));
     }.bind(this);
	
	this.getEncourageScopeDropList = function () {
    	this.encourageScopeDropList = webStorageCache.get(DropDownListDefines.ENCOURAGE_SCOPE);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_SCOPE);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageScopeDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_SCOPE, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
    
    this.getEncourageMethodDropList = function () {
    	this.encourageMethodDropList = webStorageCache.get(DropDownListDefines.ENCOURAGE_METHOD);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_METHOD);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageMethodDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_METHOD, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
    
    this.getEncourageStatusDropList = function () {
    	this.encourageStatusDropList = webStorageCache.get(DropDownListDefines.ENCOURAGE_RULE_STATUS);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_RULE_STATUS);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageStatusDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_RULE_STATUS, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
    
    this.getEncourageTypeDropList = function () {
    	this.encourageTypeDropList = webStorageCache.get(DropDownListDefines.ENCOURAGE_TYPE);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_TYPE);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageTypeDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_TYPE, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
     
     this.getAuditResultDropList = function () {
     	this.auditResultDropList = webStorageCache.get(DropDownListDefines.APPROVE_RESULT);
 		if (!this.auditResultDropList) {
 			 var promise = apiService.getDropDownList(DropDownListDefines.APPROVE_RESULT);
 			 promise.then(function(result) {
 				 if ('1' == result.code) {
 					 this.auditResultDropList = result.data;
 					 webStorageCache.set(DropDownListDefines.APPROVE_RESULT, result.data ,{exp : Constants.EXP_TIME });
 				 }
 			 }.bind(this));
 	   }
      }.bind(this);
     
    this.execute = function() {
    	this.getEncourageStatusDropList();
    	this.getEncourageTypeDropList();
    	this.getEncourageMethodDropList();
    	this.getEncourageScopeDropList();
    	this.getEncourageFalseReasonDropList();
    	this.getAuditResultDropList();
    	
    	if($stateParams.data) {
			webStorageCache.set('ruleId',$stateParams.data.ruleId ,{exp:86400});
			webStorageCache.set('auditType',$stateParams.data.auditType ,{exp:86400});
		}
		this.queryModel.entityDTO.ruleId =webStorageCache.get('ruleId');
	
    	this.getDatail();
    };
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.GET_AUDIT_HIS_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : [ ]
				}, {entityDTO:{businessId:this.queryModel.entityDTO.ruleId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryAuditHisResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
    
    this.getDatail = function () {
    	var promise = apiService.post(ApiDefines.ENCOURAGE_ACTIVITY_DATAIL,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryResult = result.data;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    }.bind(this);
    
    this.goBack = function () {
    	$state.go('main.cpsActivityEncourageManage');
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }

}

ActivityEncourageAuditContext.extend(ContextSupport);
