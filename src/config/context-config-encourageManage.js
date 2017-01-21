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

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeListContext',
		// 必需项
		controllerName: 'cpsTypeListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeAddContext',
		// 必需项
		controllerName: 'cpsTypeAddController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeUpdateContext',
		// 必需项
		controllerName: 'cpsTypeUpdateController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeDetailContext',
		// 必需项
		controllerName: 'cpsTypeDetailController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','webStorageCache','$modal']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeActivityEncourageAddContext',
		// 必需项
		controllerName: 'cpsTypeActivityEncourageAddController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','FileUploader','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeActivityEncourageUpdateContext',
		// 必需项
		controllerName: 'cpsTypeActivityEncourageUpdateController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','FileUploader','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ActivityEncourageViewContext',
		// 必需项
		controllerName: 'activityEncourageViewController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService', 'FileUploader','$modal','webStorageCache']
	});

contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSProductListContext',
		// 必需项
		controllerName: 'cpsProductListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','$modal','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'CPSTypeEncourageAuditContext',
		// 必需项
		controllerName: 'cpsTypeEncourageAuditController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});


contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ProductBrandContext',
		// 必需项
		controllerName: 'productBrandController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ProductTypeContext',
		// 必需项
		controllerName: 'productTypeController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ProductCPSContext',
		// 必需项
		controllerName: 'productCPSController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ActivityEncourageListContext',
		// 必需项
		controllerName: 'activityEncourageListController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService','$modal','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ActivityEncourageUpdateContext',
		// 必需项
		controllerName: 'activityEncourageUpdateController',
		// 可选项
		requires: ['$state','$stateParams', '$cookieStore', '$timeout', 'apiService', 'FileUploader','$modal','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ActivityEncourageAuditContext',
		// 必需项
		controllerName: 'activityEncourageAuditController',
		// 可选项
		requires: ['$state', '$stateParams','$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ActivityEncourageAddContext',
		// 必需项
		controllerName: 'activityEncourageAddController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService', 'FileUploader','$modal','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AddProductContext',
		// 必需项
		controllerName: 'addProductController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService', '$modal','webStorageCache']
	});