'use strict';
/***********************************************************************
 * 描述：核心管理器<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function AngularManager() {}

AngularManager.extend(Manager);

AngularManager.prototype.obtainBean = function(moduleName, beanName) {
	var moduleNames = [];
	if (typeof moduleName == 'string') {
		moduleNames.push(moduleName);
	} else {
		moduleNames = moduleName;
	}
	var bean = angular.injector(moduleNames).get(beanName);
	return bean;
};

AngularManager.prototype.obtainModule = function(moduleName) {
	return angular.module(moduleName);
};

AngularManager.prototype.getApiResource = function() {
	return this.obtainBean('ngResource', '$resource');
};

AngularManager.prototype.getQ = function() {
	return this.obtainBean('ng', '$q');
};

AngularManager.prototype.getTimeout = function() {
	return this.obtainBean('ng', '$timeout');
};

AngularManager.prototype.getRootScope = function() {
	return this.obtainBean('ng', '$rootScope');
};

AngularManager.prototype.getCookieStore = function() {
	return this.obtainBean('ngCookies', '$cookieStore');
};

AngularManager.prototype.getCurrentScope = function() {
	return angular.element(document.querySelector('[ng-controller]')).scope();
};

AngularManager.prototype.getModal = function() {
	return this.obtainBean('ui.bootstrap.modal', '$modal');
};

AngularManager.prototype.getFilter = function() {
	return this.obtainBean('ng', '$filter');
};
