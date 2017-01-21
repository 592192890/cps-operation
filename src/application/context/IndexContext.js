'use strict';
/***********************************************************************
 * 描述：系统入口-场景类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function IndexContext($state, $cookieStore, $timeout, apiService, ngNotify,webStorageCache) {

	this.overflow = {};
	
	this.queryModel = {};

	this.alert = {type: 'warning',opened: false,msg: ''};
	
	//'info', 'success', 'warn', 'error', 'grimace'
	this.succcessOption = {position: 'top', sticky: false, type:'success'};
	this.infoOption = {position: 'top', sticky: false, type:'info'};
	this.warnOption = {position: 'top', sticky: false, type:'warn'};
	this.errorOption = {position: 'top', sticky: false, type:'error',duration :5000};

	this.execute = function() {
		
		//init system config
//		var promise = apiService.post(ApiDefines.GET_UPLOAD_SERVER_URL,
//				angular.extend(this.queryModel));
//		promise.then(function(result) {
//			if ('1' == result.code) {
//				webStorageCache.set(Constants.FILE_SERVER_PATH,result.data.uploadFileServer ,{exp:86400});
//			} else {
//				// .....
//				this.popAlert(result.message, 'error');
//			}
//		}.bind(this));
			
		webStorageCache.set(Constants.FILE_SERVER_PATH,appConfig.apiPath  ,{exp:86400});
	};

	this.popAlert = function(msg, type) {
		//this.alert.opened = true;
		//this.alert.msg = msg;
		if (!type) {
			ngNotify.set(msg, this.infoOption);
		}else{
			if(type == 'warning'){
				ngNotify.set(msg, this.warnOption);
			}else if(type == 'success'){
				ngNotify.set(msg, this.succcessOption);
			}else if(type == 'error'){
				ngNotify.set(msg, this.errorOption);
			}
		}
	};
	
	this.ngNotify = function(msg, option){
		if(!option){
			ngNotify.set(msg, this.infoOption);
		}
		ngNotify.set(msg, option);
	}
	
	this.colseNgNotify = function(){
		ngNotify.dismiss();
	}

	this.reset = function () {
		this.queryModel = {entityDTO:{}};
	};

}

IndexContext.extend(ContextSupport);
