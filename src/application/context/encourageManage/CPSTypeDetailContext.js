'use strict';

function CPSTypeDetailContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache,$modal) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    
    this.execute = function() {
    	if($stateParams.data) {
			webStorageCache.set('cpstypeId',$stateParams.data.cpstypeId ,{exp:Constants.EXP_TIME});
			webStorageCache.set('cpstypeName',$stateParams.data.cpstypeName ,{exp:Constants.EXP_TIME});
		}
		this.queryModel.entityDTO.cpstypeId =webStorageCache.get('cpstypeId');
		this.queryModel.entityDTO.cpstypeName =webStorageCache.get('cpstypeName');
		this.getEncourageStatusDropList();
    	this.getEncourageTypeDropList();
    	this.getEncourageMethodDropList();
    	this.roleCode = UserUtil.getUserRole();
    };
    
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
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_TYPE_DETAIL, angular
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
    
    this.goBack = function () {
    	$state.go('main.cpsTypeManage');
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    };
    
    this.goAddEncourage = function () {
    	$state.go('main.cpsTypeAddEncourage');
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    }
    
    this.goUpdateEncourage = function (raw) {
    	$state.go('main.cpsTypeUpdateEncourage',{"data":{"cpstypeId":this.queryModel.entityDTO.cpstypeId,"cpstypeName":this.queryModel.entityDTO.cpstypeName,"ruleId":raw.ruleId}});
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    }
    
    this.goViewEncourage = function (raw) {
    	$state.go('main.cpsTypeViewEncourage',{"data":{"cpstypeId":this.queryModel.entityDTO.cpstypeId,"cpstypeName":this.queryModel.entityDTO.cpstypeName,"ruleId":raw.ruleId}});
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    	
    	
    };
    
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
    
   this.businessAudite = function (raw) {
	   this.entityDTO = raw;
	   this.approveStep =1;
	   this.cpstypeName = this.queryModel.entityDTO.cpstypeName;
	   this.productBrand = ModalUtil.createModal($modal, ModalPath.CPS_TYPE_ENCOURAGE_AUDIT, this, "md");
   };
	  
   this.financeAudite = function (raw) {
	   this.approveStep =2;
	   this.entityDTO = raw;
	   this.cpstypeName = this.queryModel.entityDTO.cpstypeName;
	   this.productBrand = ModalUtil.createModal($modal, ModalPath.CPS_TYPE_ENCOURAGE_AUDIT, this, "md");
   };
   
   this.deleteConfirm = {
           opened: false,
           ok: undefined,
           cancel: undefined
   };
   
   this.deleteEncourage = function (entity) {
	   this.deleteConfirm.opened = true;
       // 确认回调
       this.deleteConfirm.ok = function() {

          var url=ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_DELETE;
          var param={
             "entityDTO":{
                "cpstypeId":entity.cpstypeId,
                "ruleId":entity.ruleId
              }
          };
       		apiService.post(url,param).then(function(result) {
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
}

CPSTypeDetailContext.extend(ContextSupport);
