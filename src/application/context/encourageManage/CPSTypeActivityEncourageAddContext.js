'use strict';

function CPSTypeActivityEncourageAddContext($state,$stateParams,$cookieStore,$timeout, apiService, FileUploader, webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.activityEncourageUploader = UploaderUtil.create(
			FileUploader,
			{
				url : webStorageCache.get(Constants.FILE_SERVER_PATH) + ApiDefines.UPLOAD_IMG_FILE,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'encourageFilter' ],
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
    	//Init page radio
    	this.queryModel.entityDTO.encourageType = 1;
    	this.queryModel.entityDTO.encourageMethod = 0;
    	if($stateParams.data) {
			webStorageCache.set('cpstypeId',$stateParams.data.cpstypeId ,{exp:Constants.EXP_TIME});
			webStorageCache.set('cpstypeName',$stateParams.data.cpstypeName ,{exp:Constants.EXP_TIME});
		}
		this.queryModel.entityDTO.cpstypeId =webStorageCache.get('cpstypeId');
		this.queryModel.entityDTO.cpstypeName =webStorageCache.get('cpstypeName');
    	this.generateEncourageNo();
    	
    };
    
    this.generateEncourageNo = function () {
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
    	$state.go('main.cpsTypeDetail',{"data":{"cpstypeId":this.queryModel.entityDTO.cpstypeId,"cpstypeName":this.queryModel.entityDTO.cpstypeName}});
        var promotionManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(promotionManageInfo);
    };
    
  this.saveEncourage = function (valid) {
	  this.sumbmited = true;
  	if(valid){
		var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_ADD,
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
  
  this.saveToAudit = function (valid) {
	  this.sumbmited = true;
	  	if(valid){
	  	   	 this.queryModel.entityDTO.requestLocation =2;
			var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_SUBMIT_AUDIT,
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
  
  

};

CPSTypeActivityEncourageAddContext.extend(ContextSupport);
