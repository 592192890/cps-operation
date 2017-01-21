'use strict';

function AdActivitiesViewContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache,FileUploader,$modal) {

    this.queryModel = {entityDTO:{}};
    
    this.query = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};
    
    this.activityTypeDropListResult = {};
    
    this.promoteTypeDropListResult = {};
    
    this.approveMethodDropListResult = {};
    
    this.contentTypeDropListResult = {};
    
    this.acitivityDetailResult = {};
    
    this.viewModel = {entityDTO:{}};
    
    this.queryActivityMaterialListResult = {};
    
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
    	
    	if($stateParams.data) {
			webStorageCache.set('activityId',$stateParams.data.activityId ,{exp:86400});
			
			webStorageCache.set('activityStatus',$stateParams.data.activityStatus ,{exp:86400});
			
			
		}
    	
		this.queryModel.entityDTO.activityId = webStorageCache.get('activityId');
		
		this.query.entityDTO.activityId = webStorageCache.get('activityId');
		
		this.queryModel.entityDTO.activityStatus = webStorageCache.get('activityStatus');
    	
    	this.getActivityType();
    	
    	this.getActivityPromoteType();
    	
    	this.getApproveMethod();
    	
    	this.getContentType();
    	
    	this.getActivityDetail();
    };
	
	
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.ACTIVITY_MATERIAL_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.query));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryActivityMaterialListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
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
	
	this.getContentType = function() {
		this.contentTypeDropListResult = webStorageCache.get(DropDownListDefines.CONTENT_TYPE);
		if (!this.contentTypeDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.CONTENT_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.contentTypeDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.CONTENT_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
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
    
    this.goBack = function () {
    	$state.go('main.adActiveList');
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    }
    
	this.preview = function() {
		this.viewModel.entityDTO = {
				"isTmpPic" : false,"picUrl":this.activityLogo
		};
		var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
				.extend(this.viewModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.viewPicture = ModalUtil.createModal($modal,
						ModalPath.VIEW_PICTURE, this, "md");
				this.src = result.data.pictureData;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
    
	this.getActivityDetail = function() {
		var promise = apiService.post(ApiDefines.ACTIVITY_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.acitivityDetailResult = result.data;
				this.activityLogo = result.data.activityLogo;

				var updateColumns=result.data.updateColumns;
				if(updateColumns!=undefined&&updateColumns.length>0){
					updateColumns.forEach(function(content,index){
						$("."+content).css("color","red");
					});
				}
				if(updateColumns!=undefined&&updateColumns.length>0) {
					this.updatedColumnList =updateColumns;
				}
				
			}
		}.bind(this));
	}.bind(this);
	
	this.checkColumnInList = function (name) {
    	var flag=false;
    	if (this.updatedColumnList) {
    		for(var i=0;i<this.updatedColumnList.length;i++){
    			if((this.updatedColumnList)[i] == name){
    				flag=true;
    				break;
    			}
    		}
    	}
    	return flag;
    };

}

AdActivitiesViewContext.extend(ContextSupport);
