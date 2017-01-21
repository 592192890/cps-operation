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

var filterConfig = {
	// 场景配置
	filters: [
		{
			moduleName: 'cps_context',
			// 可选项
			name: 'lipsisFilter',
			// 必需项
			clazz: 'LipsisFilter'
		},
		{
			moduleName: 'cps_context',
			// 可选项
			name: 'keyFilter',
			// 必需项
			clazz: 'KeyFilter'
		},
		{
			moduleName: 'cps_context',
			// 可选项
			name: 'currencyFilter',
			// 必需项
			clazz: 'CurrencyFilter'
		},
        {
            moduleName: 'cps_context',
            // 可选项
            name: 'highlightFilter',
            // 必需项
            clazz: 'HighlightFilter',
            requires: ['$sce']
        },
        {
            moduleName: 'cps_context',
            // 可选项
            name: 'enterFilter',
            // 必需项
            clazz: 'EnterFilter',
            requires: ['$sce']
        }
	]
};
