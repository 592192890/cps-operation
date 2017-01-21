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
		clazz: 'MemberListContext',
		// 必需项
		controllerName: 'memberListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MemberAuditContext',
	// 必需项
	controllerName: 'memberAuditController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MemberInfoContext',
	// 必需项
	controllerName: 'memberInfoController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader','$modal']
});


 

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MediaListContext',
	// 必需项
	controllerName: 'mediaListController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MediaAuditContext',
	// 必需项
	controllerName: 'mediaAuditController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MessageListContext',
	// 必需项
	controllerName: 'messageListController',
	// 可选项
	requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MemberMessageListContext',
	// 必需项
	controllerName: 'memberMessageListController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MediaBlackListContext',
	// 必需项
	controllerName: 'mediaBlackListController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MediaInfoContext',
	// 必需项
	controllerName: 'mediaInfoController',
	// 可选项
	requires: ['$state','$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MediaAuditInfoContext',
	// 必需项
	controllerName: 'mediaAuditInfoController',
	// 可选项
	requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MessageEditContext',
	// 必需项
	controllerName: 'messageEditController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache','$stateParams','FileUploader']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MessageCreateContext',
	// 必需项
	controllerName: 'messageCreateController',
	// 可选项
	requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MemberDetailContext',
	// 必需项
	controllerName: 'memberDetailController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache','$modal']
});


contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MemberAuditInfoContext',
	// 必需项
	controllerName: 'memberAuditInfoController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache','$modal']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MessageViewContext',
	// 必需项
	controllerName: 'messageViewController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'MessageDetailContext',
	// 必需项
	controllerName: 'messageDetailController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});


contextConfig.contexts
.push({
	moduleName: 'cps_context',
	// 必需项
	clazz: 'ViewPictureContext',
	// 必需项
	controllerName: 'viewPictureController',
	// 可选项
	requires: ['$state', '$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
});

























