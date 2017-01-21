'use strict';

function HelpCenterAddContext($state,$stateParams,$cookieStore,$timeout,apiService,webStorageCache) {

	 this.queryModel = {entityDTO:{}};
	 
	 this.questionTypeResult = {};
	 
	 this.errorMessageRequire = 0;
	    
	 this.errorMessageLength = 0;

     this.execute = function() {
    	 
    	 if($stateParams.data) {
 			webStorageCache.set('faqTypeId',$stateParams.data.faqTypeId ,{exp:86400});
 			webStorageCache.set('faqTypeName',$stateParams.data.faqTypeName ,{exp:86400});
 		}
     	
 		this.queryModel.entityDTO.faqTypeId = webStorageCache.get('faqTypeId');
 		this.queryModel.entityDTO.faqTypeName = webStorageCache.get('faqTypeName');
 		
    	
    	this.getQuestionType();
    	this.getCurrentSelectedUpdateDetails();
    };
    
    this.changed = function () {
    	if(this.queryModel.entityDTO.answer == "" || this.queryModel.entityDTO.answer == null){
			$("#contentErrorRequire").show();
    	}else {
    		$("#contentErrorRequire").hide();
    	}
		if (this.queryModel.entityDTO.answer.length > 6500) {
			$("#contentErrorLength").show();
		}else {
			$("#contentErrorLength").hide();
		}
	}.bind(this);


    
    this.saveQuestion = function(valid) {   	
    	this.sumbmited = true;
    	
    	this.queryModel.entityDTO.faqTypeId = webStorageCache.get('faqTypeId');
    	if(this.queryModel.entityDTO.answer == "" || this.queryModel.entityDTO.answer == null){
    		this.errorMessageRequire = 1;
            return;
    	}else {
    		this.errorMessageRequire = 0;
    	}
    	if (this.queryModel.entityDTO.answer.length > 6500) {
    		this.errorMessageLength = 1;
            return;
    	}else {
    		this.errorMessageLength = 0;
    	}
    	if(valid){    	
    	
			var promise = apiService.post(ApiDefines.CREATE_QUESTION, angular
					.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.popAlert("问题创建成功", 'success');
					$state.go('main.helpCenterList');
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
		
    	}
	}.bind(this);
    
	this.getCurrentSelectedUpdateDetails = function() {
		if($state.params.data!==null){
			this.queryModel.entityDTO.faqTypeId = webStorageCache.get('faqTypeId');
			if(this.queryModel.entityDTO.faqTypeId == null) {
				return;
			}
		} else {
			return;
		}
		var promise = apiService.post(ApiDefines.HELP_CENTER_GET_FAQDETAILS,
				angular.extend( this.queryModel ));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryModel.entityDTO = result.data;
			} else {
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}

	this.getQuestionType = function() {
		this.questionTypeResult = webStorageCache.get(DropDownListDefines.FAQ_TYPE);
		if (!this.questionTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.FAQ_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.questionTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.FAQ_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.saveAddedCategory = function(valid) {
    	this.sumbmited = true;    	
    	// }
    	if(valid){    	
    	
		var promise = apiService.post(ApiDefines.HELP_CENTER_ADD_CATEGORY, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("问题创建成功", 'success');
				$state.go('main.helpCenterList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);

	this.updateHelpCategory = function(valid) {
    	this.sumbmited = true;
    	this.queryModel.entityDTO.faqTypeId = $stateParams.data.faqTypeId;    	
    	if(valid){    	    	
		var promise = apiService.post(ApiDefines.HELP_CENTER_UPDATE_CATEGORY, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("问题创建成功", 'success');
				$state.go('main.helpCenterList');
				this.queryModel = {};
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);


    this.goBack = function () {
    	$state.go('main.helpCenterList');
    	this.queryModel = {};
    };

}

HelpCenterAddContext.extend(ContextSupport);
