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

//会员列表
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'NotificationListContext',
		// 必需项
		controllerName: 'notificationListController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'NoticeCreateContext',
	// 必需项
	controllerName: 'noticeCreateController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'NoticeUpdateContext',
	// 必需项
	controllerName: 'noticeUpdateController',
	// 可选项
	requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'NoticeApproveContext',
	// 必需项
	controllerName: 'noticeApproveController',
	// 可选项
	requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
});










contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'TemplateListContext',
		// 必需项
		controllerName: 'templateListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'HelpCenterAddContext',
	// 必需项
	controllerName: 'helpCenterAddController',
	// 可选项
	requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'HelpCenterUpdateContext',
	// 必需项
	controllerName: 'helpCenterUpdateController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'HelpCenterListContext',
		// 必需项
		controllerName: 'helpCenterListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'HelpCenterCheckHotQuestionContext',
		// 必需项
		controllerName: 'HelpCenterCheckHotQuestionController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
	

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'EditTemplateContext',
		// 必需项
		controllerName: 'editTemplateController',
		// 可选项
		requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});




