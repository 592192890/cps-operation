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
		clazz: 'PromotionDetailReportContext',
		// 必需项
		controllerName: 'promotionDetailReportController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});
contextConfig.contexts
	.push({
		moduleName: 'cps_context',
		// 必需项
		clazz: 'PromotionEffectReportContext',
		// 必需项
		controllerName: 'promotionEffectReportController',
		// 可选项
		requires: ['$state', '$cookieStore', '$timeout', 'apiService','webStorageCache']
	});