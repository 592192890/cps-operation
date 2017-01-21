'use strict';
/***********************************************************************

 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function CheckLoginContext($state,$cookieStore,$timeout, apiService,ngNotify,$modal,FileUploader) {


    this.execute = function() {

       // this.validateUserInfo();
       // this.loginCPS();
    	  $state.go('main');
    };
    

    this.validateUserInfo = function () {
  	  var promise = apiService.post(ApiDefines.VALIDATE_USER_INFO, {});
      promise.then(function(result) {
          if ('1' == result.code) {
        	  this.getUserInfo();

          }else {
        		this.popAlert("用户信息过期,请重新登录.", 'error');
          }
      }.bind(this));
    };
    
	this.getUserInfo = function (){
		var promise = apiService.post(ApiDefines.GET_USER_INFO,
				angular.extend({}));
		promise.then(function(result) {
			if ('1' == result.code) {
				UserUtil.saveLoginInfo(result.data);
				$state.go('main');
        this.userInfo=result.data;
			} else {
				// go to login
				this.popAlert("用户信息过期,请重新登录.", 'error');
			}
		}.bind(this));
	};

    this.queryModel = {};

    this.loginCPS = function () {
        // todo

        $state.go('main');
    };

     this.goSuccess = function () {
         $state.go('main');
     };

    this.type=1;

    this.doSomething = function () {
        //query data;
        alert('query data');
    };


    this.doUpdate = function(){
        var promise = apiService.post(ApiDefines.UPDATE_CUSTOMER, this.$parent.rowDetails);
        promise.then(function(result) {
            if ('0' == result.code) {
                this.$parent.doPagingSearch();
                this.popAlert(MsgDefines.MSG_007_002, 'success');
                this.closeModal();
            }
        }.bind(this));
    };

    this.enBusLicenBackUpUploader = UploaderUtil.create(FileUploader, {
        url: appConfig.apiPath + ApiDefines.UPLOAD_IMG_FILE,
        formData: [{bFileType: '0'}],
        alias: 'file',
        autoUpload: true,
        filters: ['imgFilter'],
        success: function (result) {
            if ('1' == result.code) {
                this.flag = "1";
            	this.popAlert('上传', 'success');
            }
        }.bind(this)
    });

    this.doDelete = function(id) {
        // 弹出确认框
        this.delConfirm.opened = true;
        // 确认回调
        this.delConfirm.ok = function() {
            this.popAlert('delete done', 'success');
        }.bind(this);
    };
    this.delConfirm = {
        opened: false,
        ok: undefined,
        cancel: undefined
    };

    this.doSave = function(valid) {
        if(valid) {
            alert('do save ok');
        } 
    };
}

CheckLoginContext.extend(ContextSupport);
