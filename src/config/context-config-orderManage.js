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
		clazz: 'CPSOrderListContext',
		// 必需项
		controllerName: 'cpsOrderListController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'AdditionalOrderSettleContext',
		// 必需项
		controllerName: 'additionalOrderSettleController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'ExceptionOrderImportContext',
		// 必需项
		controllerName: 'exceptionOrderImportController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache','FileUploader']
	});