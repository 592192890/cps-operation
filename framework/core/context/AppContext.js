'use strict';
/***********************************************************************
 * 描述：核心环境上下文<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function AppContext() {}

AppContext.CONTAINER = {
	angular: 'angular'
};

AppContext.getContainer = function() {
	return appConfig.container;
};

AppContext.getEnvironment = function() {
	return appConfig.environment;
};

AppContext.getApiPath = function() {
	return appConfig.apiPath;
};
