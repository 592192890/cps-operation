'use strict';

function CPSTypeEncourageAuditContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.queryModel.entityDTO.approveResult = 1;
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
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
    	this.getAuditResultDropList();
    	if(this.$parent.approveStep == 1) {
    		this.auditTitle = "业务审核激励方案";
    	} else {
    		this.auditTitle = "财务审核激励方案";
    	}
    	this.queryModel.entityDTO.ruleId = this.$parent.entityDTO.ruleId;
    };
    
    this.view = function () {
    	$state.go('main.cpsTypeViewEncourage',{"data":{"cpstypeId":this.$parent.entityDTO.cpstypeId,"cpstypeName":this.$parent.cpstypeName,"ruleId":this.$parent.entityDTO.ruleId}});
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    	
    	
    };
    
    this.submit = function () {
    	var url ="";
    	if(this.$parent.approveStep == 1) {
    		url = ApiDefines.BISSNESS_ENCOURAGE_AUDIT
    	} else {
    		url = ApiDefines.FINANCE_ENCOURAGE_AUDIT
    	}
    	var promise = apiService.post(url,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				 this.popAlert("操作成功", 'success');
				 this.$parent.doPagingSearch(1);
				 this.close();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    }
    
    this.close = function () {
    	 this.$close();
    };

}

CPSTypeEncourageAuditContext.extend(ContextSupport);
