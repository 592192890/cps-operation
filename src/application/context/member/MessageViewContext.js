'use strict';

function MessageViewContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.messageDetailResult = {};
	
    this.messageReceiverRangeResult = {};
    
    this.accountTypeResult = {};
    
    this.memberTypeResult = {};

    this.execute = function() {

    	if($stateParams.data) {
			webStorageCache.set('messageInfo',$stateParams.data.messageInfo ,{exp:86400});
		}
    	
		this.messageDetailResult = webStorageCache.get('messageInfo');

		//this.getMessageDetail();

		this.getMessageReceiverRange();
		
		this.getMemberType();
		
		this.getAccountType();
    	
    	
    };
    
	this.getMessageReceiverRange = function() {
		this.messageReceiverRangeResult = webStorageCache.get(DropDownListDefines.MESSAGE_RECEIVER_RANGE);
		if (!this.messageReceiverRangeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MESSAGE_RECEIVER_RANGE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.messageReceiverRangeResult = result.data;
					webStorageCache.set(DropDownListDefines.MESSAGE_RECEIVER_RANGE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMemberType = function() {
		this.memberTypeResult = webStorageCache.get(DropDownListDefines.MEMBER_TYPE);
		if (!this.memberTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MEMBER_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.MEMBER_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getAccountType = function() {
		this.accountTypeResult = webStorageCache.get(DropDownListDefines.ACCOUNT_TYPE);
		if (!this.accountTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACCOUNT_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.accountTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.ACCOUNT_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	
    
    
	this.getMessageDetail = function() {
		var promise = apiService.post(ApiDefines.MESSAGE_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.messageDetailResult = result.data;
			}
		}.bind(this));
	};
    

	

	


	

	

	

	

    


}

MessageViewContext.extend(ContextSupport);
