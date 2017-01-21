'use strict';

function HelpCenterUpdateContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.questionTypeResult = {};
    
    this.questionDetailResult = {};
    
    this.errorMessageRequire = 0;
    
    this.errorMessageLength = 0;	

    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('faqId',$stateParams.data.faqId ,{exp:86400});
			webStorageCache.set('faqTypeName',$stateParams.data.faqTypeName ,{exp:86400});
		}
    	
		this.queryModel.entityDTO.faqId = webStorageCache.get('faqId');
		this.queryModel.entityDTO.faqTypeName = webStorageCache.get('faqTypeName');
		
		this.getQuestionType();
		
		this.getQuestionDetail();
    };
    
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
    
	this.getQuestionDetail = function() {

		var promise = apiService.post(ApiDefines.QUESTION_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.questionDetailResult = result.data;
				this.queryModel.entityDTO.type = result.data.type;
				this.queryModel.entityDTO.title = result.data.title;
				this.queryModel.entityDTO.answer = result.data.answer;
				this.queryModel.entityDTO.isHotQuestion = result.data.isHotQuestion;

			}
		}.bind(this));
	}.bind(this);
	
    this.updateQuestion = function(valid) {
    	
    	this.sumbmited = true;
    	
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
    	
		var promise = apiService.post(ApiDefines.UPDATE_QUESTION, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("问题修改成功", 'success');
				$state.go('main.helpCenterList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);
	
    this.goBack = function () {
    	$state.go('main.helpCenterList');

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
	
    
    
    


}

HelpCenterUpdateContext.extend(ContextSupport);
