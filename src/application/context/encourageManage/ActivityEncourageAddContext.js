'use strict';

function ActivityEncourageAddContext($state,$cookieStore,$timeout, apiService, FileUploader, $modal,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};

    this.productRange = 0;
    
    this.auditHis = 0;
    
    this.queryModel.entityDTO.amountRuleList=[];
   

  	this.amountRuleList =[
		{
		amountMin:'amountMin0',encourageRatio:'encourageRatio0'
		}
	];
	

    this.addEncourageList=function(){
    	
    	if(this.amountRuleList.length>=5){
    		return;
    	}else{

    		var index=this.amountRuleList.length-1;
    		var value=parseInt(this.amountRuleList[index].amountMin.split('amountMin')[1])+1;
    		this.amountRuleList.push({amountMin:"amountMin"+value,encourageRatio:"encourageRatio"+value});

    	}
    	
    };
    this.deleteEncourageList=function(entity){
    	
    	this.amountRuleList.splice(entity,1);
    	this.queryModel.entityDTO.amountRuleList.splice(entity,1);
    }
    this.changeEncourageType=function(id){
    	
    	this.queryModel.entityDTO.encourageType=id;
    	
    };

    this.activityEncourageUploader = UploaderUtil.create(
			FileUploader,
			{
				url : webStorageCache.get(Constants.FILE_SERVER_PATH) + ApiDefines.UPLOAD_IMG_FILE,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'imgFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						this.popAlert('文件上传成功', 'success');
						 this.queryModel.entityDTO.approveAnnexUrl = result.fileUrl;
						 this.queryModel.entityDTO.fileName =  result.originalFileName;
						 this.isTmpFile = true;
						 this.showDeleteFlag = true;
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});
    
    this.removeFile = function (downFileName) {
    	  this.deleteFlag = true;
    	  this.showDeleteFlag = false;
    	  this.queryModel.entityDTO.approveAnnexUrl= null;
    	  this.clearUploader(this.activityEncourageUploader, 'input[uploader=activityEncourageUploader]');
    };
    
    this.execute = function() {
    	this.generateCPSNo();
    	this.queryModel.entityDTO.encourageMethod = 0;
    	this.queryModel.entityDTO.encourageType = 2;
    	this.queryModel.entityDTO.suitableRangeProduct =1;
    };
    
    this.generateCPSNo = function () {
    	var promise = apiService.post(ApiDefines.CPS_NO_GET,
				angular.extend( this.queryModel ));
		promise.then(function(result) {
			if ('1' == result.code) {
				 this.queryModel.entityDTO.ruleId = result.data.cpstypeId;
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
    };
    
   this.selectedProductArray = [];
    
    this.selectProduct = function () {
    	  this.product = ModalUtil.createModal($modal, ModalPath.SELECT_PRODUCT, this, "lg");
    };
    
    this.removeProductList=function(result){
		var index = this.selectedProductArray.indexOf(result);
		if (index != -1) {
			this.selectedProductArray.splice(index,1);
		}
	};
	
	this.clearSelectedProduct = function () {
		this.selectedProductArray = [];
	};

	this.selectedCPSTypeArray = [];

    this.selectedCPSType = function () {
  	  this.productCPS = ModalUtil.createModal($modal, ModalPath.EDIT_PRODDUCT_CPS, this, "md");
    };

	this.removeCPSTypeList=function(result){
		var index = this.selectedCPSTypeArray.indexOf(result);
		if (index != -1) {
			this.selectedCPSTypeArray.splice(index,1);
		}
	};
	
	this.clearSelectedCPSType = function () {
		this.selectedCPSTypeArray = [];
	};
  
  this.saveEncourage = function (valid) {
	  this.sumbmited = true;
	  	if(valid){
		  this.queryModel.entityDTO.productIdList = this.selectedProductArray;
		  this.queryModel.entityDTO.cpstypeIdList = this.selectedCPSTypeArray;
		  var promise = apiService.post(ApiDefines.ENCOURAGE_ACTIVITY_ADD,
					angular.extend( this.queryModel ));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.goBack();
					this.popAlert('添加成功', 'success');	
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
	  	}
  }.bind(this);
    
 this.saveEncourageAndAudit = function (valid) {
	 this.sumbmited = true;

  	if(valid){

		  this.queryModel.entityDTO.productIdList = this.selectedProductArray;
		  this.queryModel.entityDTO.cpstypeIdList = this.selectedCPSTypeArray;
			//添加时
		   	 this.queryModel.entityDTO.requestLocation = 2;
		  var promise = apiService.post(ApiDefines.ENCOURAGE_ACTIVITY_ADD_AUDIT,
					angular.extend( this.queryModel ));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.goBack();
					this.popAlert('添加成功', 'success');	
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
  	}
  }.bind(this);

}

ActivityEncourageAddContext.extend(ContextSupport);
