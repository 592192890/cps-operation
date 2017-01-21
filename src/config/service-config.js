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

var serviceConfig = {
	// 场景配置
	services: [
		{
			moduleName: 'cps_context',
			// 可选项
			name: 'apiService',
			// 必需项
			clazz: 'ApiService',
			// 可选项
			requires: ['$state', '$cookieStore', '$timeout', 'ngNotify']
		}
	]
};