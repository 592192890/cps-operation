
function ApiService($state, $cookieStore, $timeout, ngNotify) {

	var crud = ApiContext.getCRUD();
	
	var warnOption = {position: 'top', sticky: false, type:'warn'};
	var errorOption = {position: 'top', sticky: true, type:'error'};

	this.post = function(url, payload, params) {
		params = params || {};
		angular.extend(params, {userToken: UserUtil.getToken()});
		var promise = crud.post(url, params, payload, false);
		promise.then(function(result) {
			if ('2' == result.code) {
				window.location = Constants.LOGIN_URL;
			} else if ('1' == result.code) {
				if (result.data) {
					if ((result.data.records && 0 == result.data.records.length)
						|| (result.data.pageDTO && 0 == result.data.pageDTO.totalCount)) {
						if(typeof(payload.showMessage) != "undefined" && payload.showMessage == true){
							//angular.element(document.querySelector('body')).scope().popAlert(MsgDefines.MSG_000_001, 'warning');
							ngNotify.set(MsgDefines.MSG_000_001, warnOption);
						}
					}
				}
			} 
		});
		return promise;
	};

    this.getDropDownList = function( payload, params) {
        params = params || {};
        angular.extend(params, {userToken: UserUtil.getToken()});
        var promise = crud.post(ApiDefines.DROP_DOWN_LIST, params, {'entityDTO':{'typeCode':payload}}, false);
        return promise;
    };

    //userToken需要传递过来
    this.getDropDownListDefault = function( payload, params,userToken) {
        params = params || {};
        angular.extend(params, {userToken:userToken});
        var promise = crud.post(ApiDefines.DROP_DOWN_LIST, params, payload, false);
        promise.then(function(result) {
            if ('2' == result.code) {
            	window.location = Constants.LOGIN_URL;
            } else if ('1' == result.code) {
                if (result.data) {
                    if ((result.data.records && 0 == result.data.records.length)
                        || (result.data.pageDTO && 0 == result.data.pageDTO.totalCount)) {
                        if(typeof(payload.showMessage) != "undefined" && payload.showMessage == true){
                            //angular.element(document.querySelector('body')).scope().popAlert(MsgDefines.MSG_000_001, 'warning');
                        	ngNotify.set(MsgDefines.MSG_000_001, warnOption);
                        }
                    }
                }
            }
        });
        return promise;
    };
    //userToken需要传递过来
    this.postDefault = function(url, payload, params) {
        params = params || {};
        var promise = crud.post(url, params, payload, false);
        promise.then(function(result) {
            if ('2' == result.code) {
            	window.location = Constants.LOGIN_URL;
            } else if ('1' == result.code) {
                if (result.data) {
                    if ((result.data.records && 0 == result.data.records.length)
                        || (result.data.pageDTO && 0 == result.data.pageDTO.totalCount)) {
                        if(typeof(payload.showMessage) != "undefined" && payload.showMessage == true){
                            //angular.element(document.querySelector('body')).scope().popAlert(MsgDefines.MSG_000_001, 'warning');
                        	ngNotify.set(MsgDefines.MSG_000_001, warnOption);
                        }
                    }
                }
            }
        });
        return promise;
    };

    this.submitData= function(url, formData,that,callback) {
        $.ajax({
            method: 'POST',
            url: appConfig.apiPath + url+'?userToken='+UserUtil.getToken(),
            data: this.transformFormData(formData),
            contentType:false,
            processData:false,
            dataType:'json'
        }).done(function(result){
            if((typeof callback== "function") && (typeof that != "undefined")){
                callback.call(that,result);
            }else{
                if ('0' == result.code) {

                }else{

                }
            }
        });
    };

    this.transformFormData= function (jsonObj) {
        var formData = new FormData();
        for (var k in jsonObj) {
            formData.append(k,jsonObj[k]);
        }
        return formData;
    };


}