'use strict';

function ActivityEncourageListContext($state,$stateParams,$cookieStore,$timeout, apiService,$modal,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.queryResult = {};
    
    this.activityStatusDropListResult= {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.encourageTypeDropList = {};
	
	this.encourageStatusDropList = {};
	
	this.encourageMethodDropList = {};
    
    this.hidden = false;
    
    this.getEncourageMethodDropList = function () {
    	this.encourageMethodDropList = webStorageCache.get(DropDownListDefines.ENCOURAGE_METHOD);
		if (!this.encourageMethodDropList) {
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
		if (!this.encourageStatusDropList) {
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
		if (!this.encourageTypeDropList) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_TYPE);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageTypeDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_TYPE, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);

    this.execute = function() {
    	this.getEncourageStatusDropList();
    	this.getEncourageTypeDropList();
    	this.getEncourageMethodDropList();
    	this.roleCode = UserUtil.getUserRole();
    	if($stateParams.data) {
    		this.queryModel.entityDTO.ruleStatus = $stateParams.data.status;
    		this.queryModel.entityDTO.encourageType = $stateParams.data.type;
    	}
    	
    };

	this.viewEncourage = function (raw) {
		$state.go('main.cpsActivityEncourageView',{"data":{"ruleId":raw.ruleId}});
		var promotionManageInfo =  {
			name: '推广管理',
			sref: 'main.adActiveList'
		};
		this.doActiveMenu(promotionManageInfo);
	};
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.ENCOURAGE_ACTIVITY_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : [ ]
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
    
    this.addActivityEncourage = function (raw) {
    	$state.go('main.cpsActivityEncourageAdd');
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }
    
    this.submitAduitConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.submitAduit = function (id) {
    	  this.submitAduitConfirm.opened = true;
          // 确认回调
          this.submitAduitConfirm.ok = function() {
        		var promise = apiService.post(ApiDefines.ENCOURAGE_SUBMIT_AUDIT,
        				angular.extend( {entityDTO:{ruleId:id}} ));
        		promise.then(function(result) {
        			if ('1' == result.code) {
        				this.doPagingSearch(1);
        				 this.popAlert("操作成功", 'success');
        			} else {
        				// .....
        				this.popAlert(result.message, 'error');
        			}
        		}.bind(this));
          }.bind(this);
    };
    
    this.goUpdateEncourage = function (raw) {
    	$state.go('main.cpsActivityEncourageUpdate',{"data":{"ruleId":raw.ruleId}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }
    
    this.goBusinessAudite = function (raw) {
    	$state.go('main.cpsActivityEncourageAudit',{"data":{"auditType":"1","ruleId":raw.ruleId}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }
    
    this.goFinanceAudite = function (raw) {
    	$state.go('main.cpsActivityEncourageAudit',{"data":{"auditType":"2","ruleId":raw.ruleId}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }
    
    this.deleteConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.deleteEncourage = function (id) {
 	   this.deleteConfirm.opened = true;
        // 确认回调
        this.deleteConfirm.ok = function() {
      		var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_DELETE,
      				angular.extend( {entityDTO:{ruleId:id}} ));
      		promise.then(function(result) {
      			if ('1' == result.code) {
      				this.doPagingSearch(1);
      				 this.popAlert("删除成功", 'success');
      			} else {
      				// .....
      				this.popAlert(result.message, 'error');
      			}
      		}.bind(this));
        }.bind(this);
    };
    
    this.publishConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.publishEncourage = function (id) {
 	   this.publishConfirm.opened = true;
 	   this.publishConfirm.ok = function() {
 		var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_PUBULISH,
 				angular.extend( {entityDTO:{ruleId:id}} ));
 		promise.then(function(result) {
 			if ('1' == result.code) {
 				this.doPagingSearch(1);
 				 this.popAlert("发布成功", 'success');
 			} else {
 				// .....
 				this.popAlert(result.message, 'error');
 			}
 		}.bind(this));
 	   }.bind(this);
    };
    
    this.checkedRows = [];
    
    this.checkAllRows = function(){
        if(this.checkedRows.length == this.queryResult.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.queryResult);
        }
    }.bind(this);

    this.checkRow = function(row){
        var index = this.checkedRows.indexOf(row);
        if(index != -1){
            this.checkedRows.splice(index,1);
        } else {
            this.checkedRows.push(row);
        }
    };
    
    this.reset =function () {
    	 this.queryModel = {entityDTO:{}};
    };
}

ActivityEncourageListContext.extend(ContextSupport);
