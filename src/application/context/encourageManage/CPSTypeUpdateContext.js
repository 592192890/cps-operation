'use strict';

function CPSTypeUpdateContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    


    this.execute = function() {
    	if($stateParams.data) {
			webStorageCache.set('cpstypeId',$stateParams.data.cpstypeId ,{exp:86400});
			webStorageCache.set('cpstypeName',$stateParams.data.cpstypeName ,{exp:86400});
		}
		this.queryModel.entityDTO.cpstypeId =webStorageCache.get('cpstypeId');
		this.queryModel.entityDTO.cpstypeName =webStorageCache.get('cpstypeName');
    };
    
    this.saveCPSType = function (valid) {
    	this.sumbmited = true;
    	if(valid){
			var promise = apiService.post(ApiDefines.CPS_TYPE_UPDATE,
					angular.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.goBack();
					this.popAlert('修改成功', 'success');		
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

CPSTypeUpdateContext.extend(ContextSupport);
