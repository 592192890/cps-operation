'use strict';

function CPSTypeActivityEncourageUpdateContext($state,$stateParams,$cookieStore,$timeout, apiService, FileUploader, webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.auditHis = 0;
    
    this.auditResultDropList = {};
    
    this.isTmpFile = false;
    
    this.showDeleteFlag = true;
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    
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
						 this.queryModel.entityDTO.fileName = result.originalFileName;
						 this.isTmpFile = true;
						 this.showDeleteFlag = true;
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});
    
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
			webStorageCache.set('ruleId',$stateParams.data.ruleId ,{exp:Constants.EXP_TIME});
			webStorageCache.set('cpstypeId',$stateParams.data.cpstypeId ,{exp:Constants.EXP_TIME});
			webStorageCache.set('cpstypeName',$stateParams.data.cpstypeName ,{exp:Constants.EXP_TIME});
		}
		this.queryModel.entityDTO.ruleId =webStorageCache.get('ruleId');
		this.queryEncourageDetail();
    }.bind(this);
    
    this.getAuditResultDropList = function () {
    	this.auditResultDropList = webStorageCache.get(DropDownListDefines.AUDIT_RESULT);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.AUDIT_RESULT);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.auditResultDropList = result.data;
					 webStorageCache.set(DropDownListDefines.AUDIT_RESULT, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
    
    this.queryEncourageDetail = function () {
    	var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_DETAIL,
				angular.extend(  {entityDTO:{ruleId:this.queryModel.entityDTO.ruleId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryModel.entityDTO = result.data.encourageRule;
				this.queryModel.entityDTO.cpstypeId =webStorageCache.get('cpstypeId');
				this.queryModel.entityDTO.cpstypeName =webStorageCache.get('cpstypeName');
				this.encourageRuleUpdateCustom = result.data.encourageRuleUpdateCustom;
				if(this.queryModel.entityDTO.approveAnnexUrl) {
					this.showDeleteFlag = true;
				} else {
					this.showDeleteFlag = false;
				}
				if('encourageRuleUpdateCustom' in result.data &&  'updatedColumnList' in result.data.encourageRuleUpdateCustom) {
					this.updatedColumnList = result.data.encourageRuleUpdateCustom.updatedColumnList;
				}
			} else {
				// .....
				this.popAlert(result.message, 'error');
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
				this.queryResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
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
    
    this.deleteFlag = false;
    
  this.updateColumn = [];
  
  this.addColumnName = function (name) {
		var flag=false;
		for(var i=0;i<this.updateColumn.length;i++){
			if((this.updateColumn)[i] == name){
				flag=true;
				break;
			}
		}
		if(flag==false){
			this.updateColumn.push(name);
		}
  };
    
  this.saveEncourage = function (valid) {
	  this.sumbmited = true;
	  	if(valid){
	  if(this.deleteFlag) {
		  this.doRemoveFile( this.fileUrl);
		  this.queryModel.entityDTO.approveAnnexUrl= null;
		  this.queryModel.entityDTO.fileName= null;
	  }
	  
	  if( this.queryModel.entityDTO.ruleStatus == 3 ) {
		  this.queryModel.entityDTO.updateColumnList =  this.updateColumn;
	  }
		var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_ACTIVITY_UPDATE,
				angular.extend( this.queryModel ));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.goBack();
				this.popAlert('修改成功', 'success');	
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
	  		 if(this.deleteFlag) {
	  			  this.doRemoveFile( this.fileUrl);
	  			  this.queryModel.entityDTO.approveAnnexUrl= null;
	  			  this.queryModel.entityDTO.fileName= null;
	  		  }
	  		 this.queryModel.entityDTO.requestLocation =1;
	  		  if( this.queryModel.entityDTO.ruleStatus == 3 ) {
	  			  this.queryModel.entityDTO.updateColumnList =  this.updateColumn;
	  		  }
			var promise = apiService.post(ApiDefines.CPS_TYPE_ENCOURAGE_SUBMIT_AUDIT,
					angular.extend( this.queryModel ));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.goBack();
					this.popAlert('修改成功', 'success');	
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
	  	}
    }.bind(this);
  
  this.downloadfile = function (downFileName) {
		if(this.checkColumnInList (downFileName) ) {
			window.open(webStorageCache.get(Constants.FILE_SERVER_PATH)+"/"+ this.queryModel.entityDTO.approveAnnexUrl);
		} else {
			window.open(webStorageCache.get(Constants.FILE_SERVER_PATH)+"/"+ this.encourageRuleUpdateCustom.approveAnnexUrl);
		}
  };
  
  this.removeFile = function (downFileName) {
	  this.deleteFlag = true;
	  this.showDeleteFlag = false;
	  this.fileUrl = downFileName;
  };
  
  this.doRemoveFile = function (downFileName) {
		var promise = apiService.post(webStorageCache.get(Constants.FILE_SERVER_PATH)+ApiDefines.FILE_DELETE,
				angular.extend( {entityDTO:{isTmpFile:this.isTmpFile,fileUrl:downFileName}}));
		promise.then(function(result) {
			if ('1' == result.code) {
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    }.bind(this);
  
  

}

CPSTypeActivityEncourageUpdateContext.extend(ContextSupport);
