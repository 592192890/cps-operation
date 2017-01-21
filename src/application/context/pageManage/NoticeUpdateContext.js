'use strict';

function NoticeUpdateContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.errorMessageRequire = 0;


    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('noticeId',$stateParams.data.noticeId ,{exp:86400});
		}
    	
		this.queryModel.entityDTO.noticeId = webStorageCache.get('noticeId');
		
		this.getNoticeDetail();

    };
    
    this.changed = function () {
		if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
			$("#contentError").show();
    	}else {
    		$("#contentError").hide();
    	}
		if (this.queryModel.entityDTO.content.length > 6500) {
			$("#contentErrorLength").show();
		}else {
			$("#contentErrorLength").hide();
		}
}.bind(this);
    
	this.getNoticeDetail = function() {

		var promise = apiService.post(ApiDefines.NOTICE_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.memberMessageDetailResult = result.data;
				this.queryModel.entityDTO.title = result.data.title;
				this.queryModel.entityDTO.type = result.data.type;
				this.queryModel.entityDTO.content = result.data.content;
				this.queryModel.entityDTO.isSendMsg = result.data.isSendMsg;
				if(this.queryModel.entityDTO.isSendMsg == 1){
					
					this.queryModel.entityDTO.isSendMsg = true;
				}
			}
		}.bind(this));
	}.bind(this);
	
    this.updateNotice = function(valid) {
    	
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
    	
    	
    	
		var promise = apiService.post(ApiDefines.UPDATE_NOTICE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("公告修改成功", 'success');
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
    	
    	this.queryModel.entityDTO.requestLocation = 1;
    	
    	
    	
		var promise = apiService.post(ApiDefines.SAVE_AND_ASK_APPROVE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("公告已提交审核", 'success');
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

NoticeUpdateContext.extend(ContextSupport);
