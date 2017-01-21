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
		clazz: 'MemberBillQueryContext',
		// 必需项
		controllerName: 'memberBillQueryController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'MemberDailySummaryContext',
		// 必需项
		controllerName: 'memberDailySummaryController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ConfigItemContext',
		// 必需项
		controllerName: 'configItemController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ApplyPurchaseContext',
		// 必需项
		controllerName: 'applyPurchaseController',
		// 可选项
		requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
	
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AccountQueryContext',
		// 必需项
		controllerName: 'accountQueryController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'MemberSetlementDetailContext',
		// 必需项
		controllerName: 'memberSetlementDetailController',
		// 可选项
		requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'SubmitBusinessAuditContext',
		// 必需项
		controllerName: 'submitBusinessAuditController',
		// 可选项
		requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});