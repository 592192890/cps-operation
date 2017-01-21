'use strict';

function ActivityEncourageViewContext($state,$stateParams,$cookieStore,$timeout, apiService,FileUploader,$modal,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};
    
    this.showDeleteFlag = true;
    
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
    	if($stateParams.data) {
			webStorageCache.set('ruleId',$stateParams.data.ruleId ,{exp:86400});
		}
		this.queryModel.entityDTO.ruleId =webStorageCache.get('ruleId');
	
    	this.getDatail();
    };
    

    
    this.getDatail = function () {
    	var promise = apiService.post(ApiDefines.ENCOURAGE_ACTIVITY_DATAIL,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryModel.entityDTO = result.data;
				this.selectedCPSTypeArray=this.queryModel.entityDTO.cpstypeIdList;
				this.selectedProductArray=this.queryModel.entityDTO.productIdList;
				if(typeof this.queryModel.entityDTO.cpstypeIdList  == 'undefined') {
					this.selectedCPSTypeArray= [];
				}
				if(typeof this.queryModel.entityDTO.productIdList  == 'undefined') {
					this.selectedProductArray=[];
				}
				this.productRange = this.queryModel.entityDTO.suitableRangeProduct;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    }.bind(this);

	this.downloadfile =function (url,name){
		window.open(webStorageCache.get(Constants.FILE_SERVER_PATH) + ApiDefines.FILE_NORMRAL_DOWN + '?fileUrl=' + url);
		//var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
		//	.extend({"entityDTO":{"isTmpPic" : true,"picUrl":url}}));
		//promise.then(function(result) {
		//	if ('1' == result.code) {
		//		this.viewPicture = ModalUtil.createModal($modal,
		//			ModalPath.VIEW_PICTURE, this, "md");
		//		this.src = result.data.pictureData;
		//	} else {
		//		// .....
		//		this.popAlert(result.message, 'error');
		//	}
		//}.bind(this));
	};
    
    this.goBack = function () {
    	$state.go('main.cpsActivityEncourageManage');
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    

    this.auditHis =0;
    
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
    

}

ActivityEncourageViewContext.extend(ContextSupport);
