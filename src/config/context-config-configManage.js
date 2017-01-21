'use strict';
/***********************************************************************
 * 描述：框架核心配置<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

//配置项管理
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ConfigManagementContext',
		// 必需项
		controllerName: 'configManagementController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CreateConfigContext',
		// 必需项
		controllerName: 'createConfigController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'EditeConfigContext',
		// 必需项
		controllerName: 'editeConfigController',
		// 可选项
		requires: ['$state','$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});





