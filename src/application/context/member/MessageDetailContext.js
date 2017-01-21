'use strict';

function MessageDetailContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.memberMessageDetailResult = {};
	
    this.userMessageStatusResult = {};
    
    this.messageTypeResult = {};

    
    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('userMessageInfo',$stateParams.data.userMessageInfo ,{exp:86400});
		}

		this.memberMessageDetailResult  = webStorageCache.get('userMessageInfo');

		//this.getMemberMessageDetail();
		
    	this.getUserMessageStatus();
    	
    	this.getMessageType();


    	
    	
    };
    
	this.getUserMessageStatus = function() {
		this.userMessageStatusResult = webStorageCache.get(DropDownListDefines.USER_MESSAGE_STATUS);
		if (!this.userMessageStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.USER_MESSAGE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.userMessageStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.USER_MESSAGE_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMessageType = function() {
		this.messageTypeResult = webStorageCache.get(DropDownListDefines.MESSAGE_TYPE);
		if (!this.messageTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MESSAGE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.messageTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.MESSAGE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    

	
	
    
    
	this.getMemberMessageDetail = function() {

		var promise = apiService.post(ApiDefines.MEMBER_MESSAGE_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.memberMessageDetailResult = result.data;
			}
		}.bind(this));
	}.bind(this);
    

	

	


	

	

	

	

    


}

MessageDetailContext.extend(ContextSupport);
