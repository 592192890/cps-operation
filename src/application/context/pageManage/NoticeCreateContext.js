'use strict';

function NoticeCreateContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.errorMessageRequire = 0;
    
    this.errorMessageLength = 0;


    this.execute = function() {

    };
    this.changed = function () {
    		if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
    			$("#contentErrorRequire").show();
        	}else {
        		$("#contentErrorRequire").hide();
        	}
    		if (this.queryModel.entityDTO.content.length > 6500) {
    			$("#contentErrorLength").show();
    		}else {
    			$("#contentErrorLength").hide();
    		}
    }.bind(this);
    
    this.saveNotice = function(valid) {
    	
    	this.sumbmited = true;
    	
    	if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
    		this.errorMessageRequire = 1;
            return;
    	}else {
    		this.errorMessageRequire = 0;
    	}
    	if (this.queryModel.entityDTO.content.length > 6500) {
    		this.errorMessageLength = 1;
            return;
    	}else {
    		this.errorMessageLength = 0;
    	}
    	if(valid){
    	if(this.queryModel.entityDTO.isSendMsg == true){
    		
    	   this.queryModel.entityDTO.isSendMsg = 1;
    	}else{
    		
    	   this.queryModel.entityDTO.isSendMsg = 0;
    	}
    	
    	
    	
		var promise = apiService.post(ApiDefines.CREATE_NOTICE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("公告创建成功", 'success');
				$state.go('main.notificationList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);
	
    this.saveAndAskApprove = function(valid) {
    	
    	this.sumbmited = true;
    	
    	if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
    		
    		this.errorMessageRequire = 1;
    		
            return;
    	}
    	if (this.queryModel.entityDTO.content.length > 6500) {
    		this.errorMessageLength = 1;
            return;
    	}else {
    		this.errorMessageLength = 0;
    	}
    	
    	
    	if(valid){
    	
    	if(this.queryModel.entityDTO.isSendMsg == true){
    		
    	   this.queryModel.entityDTO.isSendMsg = 1;
    	}else{
    		
    	   this.queryModel.entityDTO.isSendMsg = 0;
    	}
    	
    	this.queryModel.entityDTO.requestLocation = 2;
    	
    	
    	
		var promise = apiService.post(ApiDefines.SAVE_AND_ASK_APPROVE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("公告创建成功并已提交审核", 'success');
				$state.go('main.notificationList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);

	this.goBack = function () {
		$state.go('main.notificationList');
		var notificationListInfo =  {
			name: '页面管理',
			sref: 'main.notificationManagement'
		};
		this.doActiveMenu(notificationListInfo);
	};


}

NoticeCreateContext.extend(ContextSupport);
