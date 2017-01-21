'use strict';

function MessageEditContext($state,$cookieStore,$timeout, apiService,webStorageCache,$stateParams, FileUploader) {

    this.queryModel = {entityDTO:{}};
    
    this.query = {entityDTO:{}};
    
    this.memberMessageDetailResult = {};
	
    this.userMessageStatusResult = {};
    
    this.messageTypeResult = {};
    
    this.hidden_range = 0;
    
    this.hidden_member = 0;
    
    this.error_message_accountType = 0;
    
    this.error_message_memberType = 0;
    
    this.error_message_content = 0;
    
    this.error_message_memberIds = 0;

    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('messageInfo',$stateParams.data.messageInfo ,{exp:86400});
		}

		this.queryModel.entityDTO.messageId = webStorageCache.get('messageInfo').messageId;

		this.getMemberMessageDetail( this.queryModel.entityDTO.messageId);

		this.queryModel.entityDTO.content = webStorageCache.get('messageInfo').content;
		this.getUserMessageStatus();
    	
    	this.getMessageType();
    };
    
    this.changed = function () {
		if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
			$("#contentError").show();
    	}else {
    		$("#contentError").hide();
    	}
}.bind(this);

    
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
	
	this.sendMessage = function(valid) {
		
		this.sumbmited = true;
		
    	if(this.accountTypeRows.length == 0 && this.queryModel.entityDTO.reciverRange == 2){
    		
    		this.error_message_accountType = 1;
    		
            return;
    	}else{
    		
    		this.error_message_accountType = 0;
    	}
    	
    	if(this.memberTypeRows.length == 0 && this.queryModel.entityDTO.reciverRange == 2){
    		
    		this.error_message_memberType = 1;
    		
            return;
    	}else{
    		
    		this.error_message_memberType = 0;
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange == 3 && (this.queryModel.entityDTO.memberIds == "" || this.queryModel.entityDTO.memberIds == null)){
    		
    		this.error_message_memberIds = 1;
    		
            return;
    	}else{
    		
    		this.error_message_memberIds = 0;
    	}
    	
    	if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
    		
    		this.error_message_content = 1;
    		
            return;
    	}else{
    		
    		this.error_message_content = 0;
    	}
    	
    	if(valid){
		
    	if(this.accountTypeRows.length != 0){
    		
    		if(this.accountTypeRows.length >=2){
    			
    			this.queryModel.entityDTO.accountType = 0;
    		}else{
    			
    			this.queryModel.entityDTO.accountType = this.accountTypeRows[0];
    		}
    	}
    	
    	if(this.memberTypeRows.length != 0){
    		
    		if(this.memberTypeRows.length >=2){
    			
    			this.queryModel.entityDTO.memberType = 0;
    		}else{
    			
    			this.queryModel.entityDTO.memberType = this.memberTypeRows[0];
    		}
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange != 3){
    		
    		this.queryModel.entityDTO.memberIds = "";
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange != 2){
    		
    		this.queryModel.entityDTO.accountType = "";
    		
    		this.queryModel.entityDTO.memberType = "";
    	}

		var promise = apiService.post(ApiDefines.SAVE_SEND_MESSAGE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息发送成功", 'success');
				$state.go('main.messageList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);
	
    this.updateMessage = function(valid) {
    	
    	this.sumbmited = true;
    	
    	if(this.accountTypeRows.length == 0 && this.queryModel.entityDTO.reciverRange == 2){
    		
    		this.error_message_accountType = 1;
    		
            return;
    	}else{
    		
    		this.error_message_accountType = 0;
    	}
    	
    	if(this.memberTypeRows.length == 0 && this.queryModel.entityDTO.reciverRange == 2){
    		
    		this.error_message_memberType = 1;
    		
            return;
    	}else{
    		
    		this.error_message_memberType = 0;
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange == 3 && (this.queryModel.entityDTO.memberIds == "" || this.queryModel.entityDTO.memberIds == null)){
    		
    		this.error_message_memberIds = 1;
    		
            return;
    	}else{
    		
    		this.error_message_memberIds = 0;
    	}
    	
    	if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
    		
    		this.error_message_content = 1;
    		
            return;
    	}else{
    		
    		this.error_message_content = 0;
    	}
    	
    	if(valid){
    	
    	if(this.accountTypeRows.length != 0){
    		
    		if(this.accountTypeRows.length >=2){
    			
    			this.queryModel.entityDTO.accountType = 0;
    		}else{
    			
    			this.queryModel.entityDTO.accountType = this.accountTypeRows[0];
    		}
    	}
    	
    	if(this.memberTypeRows.length != 0){
    		
    		if(this.memberTypeRows.length >=2){
    			
    			this.queryModel.entityDTO.memberType = 0;
    		}else{
    			
    			this.queryModel.entityDTO.memberType = this.memberTypeRows[0];
    		}
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange != 3){
    		
    		this.queryModel.entityDTO.memberIds = "";
    	}
    	
    	if(this.queryModel.entityDTO.reciverRange != 2){
    		
    		this.queryModel.entityDTO.accountType = "";
    		
    		this.queryModel.entityDTO.memberType = "";
    	}
    	

		var promise = apiService.post(ApiDefines.UPDATE_MESSAGE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息修改成功", 'success');
				$state.go('main.messageList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    	}
	}.bind(this);
    
	
    this.downloadTemplateFile =function () {
        
    	window.open('http://' + window.location.host + '/resources/messageMemberIdsImport.xlsx');
    }
    
	this.enBusLicenBackUpUploaderCorporateIdentityCardUrl = UploaderUtil
	.create(
			FileUploader,
			{
				url : 'http://' + window.location.host + ApiDefines.IMPORT_MEMBER_ID,
				formData : [ {
					
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'xslFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						this.queryModel.entityDTO.memberIds = result.data.memberIds;
						this.popAlert('文件上传成功', 'success');
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});

	
	this.accountTypeRows = [];
	
	this.memberTypeRows = [];
	
    this.accountTypeRow = function(row){
        var index = this.accountTypeRows.indexOf(row);
        if(index != -1){
            this.accountTypeRows.splice(index,1);
        } else {
            this.accountTypeRows.push(row);
        }
    };
    
    this.memberTypeRow = function(row){
        var index = this.memberTypeRows.indexOf(row);
        if(index != -1){
            this.memberTypeRows.splice(index,1);
        } else {
            this.memberTypeRows.push(row);
        }
    };
	
    
    
	this.getMemberMessageDetail = function(messageId) {

		var promise = apiService.post(ApiDefines.MESSAGE_DETAIL, angular
				.extend({entityDTO:{messageId:messageId}}));
		promise.then(function(result) {
			if ('1' == result.code) {
			//	this.memberMessageDetailResult = result.data;
				this.queryModel.entityDTO.reciverRange = result.data.reciverRange;
				this.queryModel.entityDTO.content = result.data.content;
				this.queryModel.entityDTO.accountType = result.data.accountType;
				this.queryModel.entityDTO.memberIds = result.data.memberIds;
				this.queryModel.entityDTO.title = result.data.title;
				if(this.queryModel.entityDTO.reciverRange == 2){
					
					if(this.queryModel.entityDTO.accountType == 0){
						this.query.entityDTO.accountAll = true;
						this.accountTypeRow(0);
					}else if(this.queryModel.entityDTO.accountType == 1){
						this.query.entityDTO.person = true;
						this.accountTypeRow(1);
					}else{
						this.query.entityDTO.company = true;
						this.accountTypeRow(2);
					}
				}

				
				this.queryModel.entityDTO.memberType = result.data.memberType;
				if(this.queryModel.entityDTO.reciverRange == 2){
					
					if(this.queryModel.entityDTO.memberType == 0){
						this.query.entityDTO.memberAll = true;
						this.memberTypeRow(0);
					}else if(this.queryModel.entityDTO.memberType == 1){
						this.query.entityDTO.platform = true;
						this.memberTypeRow(1);
					}else{
						this.query.entityDTO.normal = true;
						this.memberTypeRow(2);
					}
				}

			}
		}.bind(this));
	}.bind(this);

}

MessageEditContext.extend(ContextSupport);
