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

function RoleSelectContext($state, $cookieStore, $timeout, apiService) {

	this.queryModel = {entityDTO:{}};


	this.execute = function() {
		this.queryModel.entityDTO.activityType ='OS';
	};

	this.doSaveRole = function (){
		var promise = apiService.post(ApiDefines.SELECT_ROLE + this.queryModel.entityDTO.activityType,
				angular.extend({}));
		promise.then(function(result) {
			if ('1' == result.code) {
				$state.go('checkLogin');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	};
}

RoleSelectContext.extend(ContextSupport);
