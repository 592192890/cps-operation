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

//推广活动列表
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AdActivitiesListContext',
		// 必需项
		controllerName: 'adActivitiesListController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});


contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AdActivitiesAddContext',
		// 必需项
		controllerName: 'adActivitiesAddController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader','$modal']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AdActivitiesAuditContext',
		// 必需项
		controllerName: 'adActivitiesAuditController',
		// 可选项
		requires: ['$state','$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache','$modal']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AdActivitiesUpdateContext',
		// 必需项
		controllerName: 'adActivitiesUpdateController',
		// 可选项
		requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader','$modal']
	});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'AdActivitiesViewContext',
	// 必需项
	controllerName: 'adActivitiesViewController',
	// 可选项
	requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader','$modal']
});


