'use strict';

function MessageCreateContext($state, $cookieStore, $timeout, apiService,
		webStorageCache, FileUploader) {

    this.queryModel = {entityDTO:{}};
    
    this.hidden_range = 0;
    
    this.hidden_member = 0;
    
    this.error_message_accountType = 0;
    
    this.error_message_memberType = 0;
    
    this.error_message_content = 0;
    
    this.error_message_memberIds = 0;
    


    this.execute = function() {
    };
    
    this.changed = function () {
		if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == null){
			$("#contentError").show();
    	}else {
    		$("#contentError").hide();
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
    
    this.saveMessage = function(valid) {
    	
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
    	
    	
    	

		var promise = apiService.post(ApiDefines.CREATE_MESSAGE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息创建成功", 'success');
				$state.go('main.messageList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);
	
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
    
    this.reset =function () {
    	 this.queryModel = {entityDTO:{}};
    };
    this.goBack=function(){
        $state.go('main.messageList');
    }
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
						this.queryModel.entityDTO.memberIds = result.memberIds;
						this.popAlert('文件上传成功', 'success');
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
			});


}

MessageCreateContext.extend(ContextSupport);
