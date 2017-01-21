'use strict';

function AdActivitiesUpdateContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache,FileUploader,$modal) {

    this.queryModel = {entityDTO:{}};
    
    this.query = {entityDTO:{}};
    
    this.viewModel = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};
    
    this.activityTypeDropListResult = {};
    
    this.promoteTypeDropListResult = {};
    
    this.approveMethodDropListResult = {};
    
    this.contentTypeDropListResult = {};
    
    this.approveStatusDropListResult = {};
    
    this.queryActivityMaterialListResult = [];
    
    this.activityMaterialId = [];
    
    this.updateColumnList = [];
    
    this.pageSize = 20;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};
    
    this.picMaterialUploader = UploaderUtil.create(
			FileUploader,
			{
				url :appConfig.apiPath + ApiDefines.ADD_ACTIVITY_MATERIAL,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'imgFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						result.data.tmpFlag = true;
						this.queryActivityMaterialListResult.push(result.data);
						this.activityMaterialId.push(result.data.materialId);
						this.popAlert('文件上传成功', 'success');
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
				url :appConfig.apiPath + ApiDefines.UPDATE_ACTIVITY_MATERIAL,
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
    
    
    this.removeMaterial = function (raw) {
    	
		if(!raw.tmpFlag){
			
			this.deleteActivityMaterial(raw);
			
		}
        
		var index = this.queryActivityMaterialListResult.indexOf(raw);
		if (index != -1) {
			this.queryActivityMaterialListResult.splice(index,1);
		}
		
		this.removeMaterialId(raw.materialId);
		

			
			
		
    	
		

    };
    
    this.removeMaterialId = function (raw) {
        
		var index = this.activityMaterialId.indexOf(raw);
		if (index != -1) {
			this.activityMaterialId.splice(index,1);
		}
    	

    };
    
    this.deleteActivityMaterialConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
    this.deleteActivityMaterial = function (raw) {
    	
  	  this.deleteActivityMaterialConfirm.opened = true;
        // 确认回调
        this.deleteActivityMaterialConfirm.ok = function() {
      	  
      	  this.queryModel = {entityDTO:{}};
      	  
      	  this.queryModel.entityDTO.materialId = raw.materialId;
      		var promise = apiService.post(ApiDefines.DELETE_ADACTIVITY_MATERIAL,
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
  
	this.preview = function(tmp,url) {
		
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
	
	this.unique = function(arr) {
		var result = [], hash = {};
		for (var i = 0, elem; (elem = arr[i]) != null; i++) {
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
		return result;
	};
	
    this.addUpdateColumnList = function (name) {

        	
    	this.updateColumnList.push(name);
    	
    	this.updateColumnList = this.unique(this.updateColumnList);
    };
	
    this.updateAdActivity = function(valid) {
    	
    	this.sumbmited = true;
    	
    	if(valid){
	    	
	    	if(this.queryModel.entityDTO.contentType == 1){
	    		
	    	   this.queryModel.entityDTO.activityMaterialIdList = this.activityMaterialId;
	    	}

	    	if(this.queryModel.entityDTO.activityLogo!=undefined){
	    		this.addUpdateColumnList("activityLogo");
	    	}
	    	this.queryModel.entityDTO.updateColumnList = this.updateColumnList;

			var promise = apiService.post(ApiDefines.UPDATE_ACTIVITY, angular
					.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.popAlert("修改申请已提交", 'success');
					$state.go('main.adActiveList');
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
    	}
	}.bind(this);
	
	this.submitUpLoader = function (materialId) {
		this.picMaterialUpdateUploader.formData = [{materialId:materialId,activityId:this.queryModel.entityDTO.activityId}];
	};
    
    
    
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

						this.queryModel.entityDTO.activityLogo=result.fileUrl;
						this.popAlert('文件上传成功', 'success');
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});


    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('activityId',$stateParams.data.activityId ,{exp:86400});
			
			webStorageCache.set('activityStatus',$stateParams.data.activityStatus ,{exp:86400});
			
			
			
			
		}
    	
    	this.queryModel.entityDTO.activityId = webStorageCache.get('activityId');
    	
    	this.queryModel.entityDTO.activityStatus = webStorageCache.get('activityStatus');
    	
    	this.query.entityDTO.activityId = webStorageCache.get('activityId');
    	
    	this.getActivityType();
    	
    	this.getActivityPromoteType();
    	
    	this.getApproveMethod();
    	
    	this.getContentType();
    	
    	this.getApproveStatus();
    	
       	this.getActivityStatus();
       	
       	this.getActivityDetail();
       	
       	this.doPagingSearch();
    };
    
    
    
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
	
	this.getActivityDetail = function() {
		var promise = apiService.post(ApiDefines.ACTIVITY_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.acitivityDetailResult = result.data;
				this.activityLogo = result.data.activityLogo;
				this.queryModel.entityDTO.name = result.data.name;
				this.queryModel.entityDTO.startDate = result.data.startDate;
				this.queryModel.entityDTO.endDate = result.data.endDate;
				this.queryModel.entityDTO.activityIntruduce = result.data.activityIntruduce;
				this.queryModel.entityDTO.contentName = result.data.contentName;
				this.queryModel.entityDTO.contentType = result.data.contentType;
				this.queryModel.entityDTO.promoteUrl = result.data.promoteUrl;
				this.queryModel.entityDTO.remark = result.data.remark;
				this.queryModel.entityDTO.activityType = result.data.activityType;
				this.queryModel.entityDTO.promoteType = result.data.promoteType;
				this.queryModel.entityDTO.approveMethod = result.data.approveMethod;
				this.queryModel.entityDTO.promoteText = result.data.promoteText;
				
			}
		}.bind(this));
	}.bind(this);
	
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
				for(var i = 0; i<this.queryActivityMaterialListResult.length;i++){
					this.queryActivityMaterialListResult[i].tmpFlag = false;
					this.activityMaterialId.push(this.queryActivityMaterialListResult[i].materialId);
				}
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
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

AdActivitiesUpdateContext.extend(ContextSupport);
