'use strict';

function AdActivitiesAddContext($state,$cookieStore,$timeout, apiService,webStorageCache,FileUploader,$modal) {

    this.queryModel = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};
    
    this.activityTypeDropListResult = {};
    
    this.promoteTypeDropListResult = {};
    
    this.approveMethodDropListResult = {};
    
    this.contentTypeDropListResult = {};
    
    this.materialList = [];
    
    this.activityMaterialId = [];
    
    this.viewModel = {entityDTO:{}};
    
    this.picMaterialUploader = UploaderUtil.create(
			FileUploader,
			{
				url : appConfig.apiPath + ApiDefines.ADD_ACTIVITY_MATERIAL,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'imgFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						this.popAlert('文件上传成功', 'success');
						
						this.materialList.push(result.data);
						
						this.activityMaterialId.push(result.data.materialId);
						
						
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});
    
    this.activityLogoUploader = UploaderUtil.create(
			FileUploader,
			{
				url : webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.UPLOAD_IMG_FILE,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'imgFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						this.popAlert('文件上传成功', 'success');
						
						this.queryModel.entityDTO.activityLogo = result.fileUrl;
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});
    
    this.picMaterialUpdateUploader = UploaderUtil.create(
			FileUploader,
			{
				url : appConfig.apiPath + ApiDefines.UPDATE_ACTIVITY_MATERIAL,
				formData : [ {

				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'imgFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						this.popAlert('文件上传成功', 'success');
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});
    
	this.submitUpLoader = function (materialId) {
		this.picMaterialUpdateUploader.formData = [{materialId:materialId}];
	};
    
    this.removeMaterial = function (raw) {
        
		var index = this.materialList.indexOf(raw);
		if (index != -1) {
			this.materialList.splice(index,1);
		}
    	
		this.removeMaterialId(raw.materialId);

    };
    
    this.removeMaterialId = function (raw) {
        
		var index = this.activityMaterialId.indexOf(raw);
		if (index != -1) {
			this.activityMaterialId.splice(index,1);
		}
    	

    };
    
	this.preview = function(url) {
		
		this.viewModel.entityDTO = {
				"isTmpPic" : false,"picUrl":url
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


    this.execute = function() {
    	
    	this.getActivityType();
    	
    	this.getActivityPromoteType();
    	
    	this.getApproveMethod();
    	
    	this.getContentType();
    };
    
    this.saveAdActivity = function(valid) {
    	
    	
    	this.sumbmited = true;
    	
    	if(valid){
    	
    	if(this.queryModel.entityDTO.contentType == 1){
    		
    	   this.queryModel.entityDTO.activityMaterialIdList = this.activityMaterialId;
    	}
    	
    	

		var promise = apiService.post(ApiDefines.ADD_ACTIVITY, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("广告活动创建成功", 'success');
				$state.go('main.adActiveList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
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
    
    this.reset =function () {
   	 this.queryModel = {entityDTO:{}};
   };

}

AdActivitiesAddContext.extend(ContextSupport);
