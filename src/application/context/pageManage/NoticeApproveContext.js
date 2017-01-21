'use strict';

function NoticeApproveContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.memberMessageDetailResult = {};
    
    this.noticeTypeResult = {};
    
    this.isSendMsgResult = {};
    
    this.approveModel = {entityDTO:{}};


    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('noticeId',$stateParams.data.noticeId ,{exp:86400});
		}
    	
		this.queryModel.entityDTO.noticeId = webStorageCache.get('noticeId');
		
		this.approveModel.entityDTO.noticeId = webStorageCache.get('noticeId');
		
		this.getNoticeDetail();
		
    	this.isSendMsg();
    	
    	this.getNoticeType();

    };
    
	this.isSendMsg = function() {
		this.isSendMsgResult = webStorageCache.get(DropDownListDefines.NOTICE_IS_SEND_MSG);
		if (!this.isSendMsgResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.NOTICE_IS_SEND_MSG);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.isSendMsgResult = result.data;
					webStorageCache.set(DropDownListDefines.NOTICE_IS_SEND_MSG,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getNoticeType = function() {
		this.noticeTypeResult = webStorageCache.get(DropDownListDefines.NOTICE_TYPE);
		if (!this.noticeTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.NOTICE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.noticeTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.NOTICE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
	this.getNoticeDetail = function() {

		var promise = apiService.post(ApiDefines.NOTICE_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.memberMessageDetailResult = result.data;

			}
		}.bind(this));
	}.bind(this);
	
    this.approveNotice = function(approveType) {
    	
    	
    	this.approveModel.entityDTO.approveResult = approveType;
    	
    	
		var promise = apiService.post(ApiDefines.NOTICE_APPROVE, angular
				.extend(this.approveModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("审核操作已完成", 'success');
				$state.go('main.notificationList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
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

NoticeApproveContext.extend(ContextSupport);
