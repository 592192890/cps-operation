'use strict';

function CPSTypeAddContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    

    this.execute = function() {
    	this.generateCPSNo();
    };
    
    this.generateCPSNo = function () {
    	var promise = apiService.post(ApiDefines.CPS_NO_GET,
				angular.extend( this.queryModel ));
		promise.then(function(result) {
			if ('1' == result.code) {
				 this.queryModel.entityDTO.cpstypeId = result.data.cpstypeId;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    }.bind(this);
    
    
    this.saveCPSType = function (valid) {
    	this.sumbmited = true;
    	if(valid){
			var promise = apiService.post(ApiDefines.CPS_TYPE_ADD,
					angular.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.goBack();
					this.popAlert('添加成功', 'success');		
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
		}
    }
    
    
    this.goBack = function () {
    	$state.go('main.cpsTypeManage');
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    };

}

CPSTypeAddContext.extend(ContextSupport);
