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

var contextConfig = {
	// 场景配置
	contexts: [
		{
			moduleName: 'cps_context',
			// 必需项
			clazz: 'IndexContext',
			// 必需项
			controllerName: 'indexController',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'apiService', 'ngNotify','webStorageCache']
		},
		{
			moduleName: 'cps_context',
			// 必需项
			clazz: 'RoleSelectContext',
			// 必需项
			controllerName: 'roleSelectController',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'apiService']
		},
		{
			moduleName: 'cps_context',
			// 必需项
			clazz: 'CheckLoginContext',
			// 必需项
			controllerName: 'checkLoginController',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'apiService', 'ngNotify','$modal','FileUploader']
		},
		{
			moduleName: 'cps_context',
			// 必需项
			clazz: 'HomeContext',
			// 必需项
			controllerName: 'homeController',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'apiService', 'ngNotify','webStorageCache']
		},{
			moduleName: 'cps_context',
			// 必需项
			clazz: 'MainContext',
			// 必需项
			controllerName: 'mainController',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'apiService', 'ngNotify']
		}
    ]
};
