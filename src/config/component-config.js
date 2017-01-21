'use strict';
/***********************************************************************
 * 描述：框架组件配置<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var componentConfig = {
	// 控件
	components: [
		{
			// 必需项
			clazz: 'ConfirmComponent',
			// 必需项
			name: 'elConfirm',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-confirm.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$modal']
		},
		{
			// 必需项
			clazz: 'ContentConfirmComponent',
			// 必需项
			name: 'elContentConfirm',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-contentConfirm.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$modal','webStorageCache']
		},
		{
			// 必需项
			clazz: 'MultipButtonConfirmComponent',
			// 必需项
			name: 'elMultipButtonConfirm',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-multipButtonConfirm.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$modal','webStorageCache']
		},
		{
			// 必需项
			clazz: 'LaddaButtonComponent',
			// 必需项
			name: 'elLaddaButton',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},
		{
			// 必需项
			clazz: 'ValidationComponent',
			// 必需项
			name: 'elValidation',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-validation.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$window', '$position']
		},
		{
			// 必需项
			clazz: 'RuleEqualsComponent',
			// 必需项
			name: 'elRuleEquals',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: 'ngModel',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},{
            // 必需项
            clazz: 'WorkFlowComponent',
            // 必需项
            name: 'elWorkflow',
            // 必需项[link, compile]
            mode: 'link',
            // 可选项[true, false]
            scope: true,
            // 可选项[true, false]
            share: true,
            // 可选项[E, A, C, M]
            restrict: 'E',
            // 可选项
            priority: '0',
            // 可选项
            replace: false,
            // 可选项
            transclude: false,
            // 可选项,此值不为空时将忽略‘templateUrl’
            template: '',
            // 可选项,‘template’不为空时将被忽略
            templateUrl: '',
            // 可选项,依赖其他指令
            require: '',
            // 可选项,依赖的模块
            requires: ['$compile', '$parse', '$log', '$timeout']
        },
		{
			// 必需项
			clazz: 'RuleRemoteComponent',
			// 必需项
			name: 'elRuleRemote',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: 'ngModel',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$http']
		},
		{
			// 必需项
			clazz: 'SizeFitComponent',
			// 必需项
			name: 'elSizeFit',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout', '$window']
		},
		{
			// 必需项
			clazz: 'AutoPanelComponent',
			// 必需项
			name: 'elAutoPanel',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-auto-panel.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},
		{
			// 必需项
			clazz: 'PagingComponent',
			// 必需项
			name: 'elPaging',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-paging.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},
		{
			// 必需项
			clazz: 'MenuBoxComponent',
			// 必需项
			name: 'elMenuBox',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'E',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,此值不为空时将忽略‘templateUrl’
			template: '',
			// 可选项,‘template’不为空时将被忽略
			templateUrl: './src/web/tmpl/cps-menu-box.html',
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},
        {
            // 必需项
            clazz: 'ColResizeComponent',
            // 必需项
            name: 'elColResize',
            // 必需项[link, compile]
            mode: 'link',
            // 可选项[true, false]
            scope: true,
            // 可选项[true, false]
            share: true,
            // 可选项[E, A, C, M]
            restrict: 'A',
            // 可选项
            priority: '0',
            // 可选项
            replace: false,
            // 可选项
            transclude: false,
            // 可选项,依赖其他指令
            require: '',
            // 可选项,依赖的模块
            requires: ['$compile', '$parse', '$log', '$timeout', '$window']
        },
        {
    		// 必需项
        	clazz: 'DatepickerComponent',
    		name: 'elDatepicker',
    		// 必需项[link, compile]
    		mode: 'link',
    		// 可选项[true, false]
    		scope: true,
    		// 可选项[true, false]
    		share: true,
    		// 可选项[E, A, C, M]
    		restrict: 'A',
    		// 可选项
    		priority: '0',
    		// 可选项
    		replace: false,
    		// 可选项
    		transclude: false,
    		// 可选项,依赖其他指令
    		require: 'ngModel',
    		requires: ['$compile', '$parse', '$filter']
    	},{
			// 必需项
			clazz: 'CKEditorComponent',
			// 必需项
			name: 'cpsEditor',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: 'ngModel',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},{
			// 必需项
			clazz: 'MergeTableComponent',
			// 必需项
			name: 'onFinishRenderFilters',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},{
			// 必需项
			clazz: 'DynamicFormValidationComponent',
			// 必需项
			name: 'dyName',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'A',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: 'ngModel',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout']
		},{
			// 必需项
			clazz: 'ProductAttributeTreeViewComponent',
			// 必需项
			name: 'productAttributeTree',
			// 必需项[link, compile]
			mode: 'link',
			// 可选项[true, false]
			scope: true,
			// 可选项[true, false]
			share: true,
			// 可选项[E, A, C, M]
			restrict: 'EA',
			// 可选项
			priority: '0',
			// 可选项
			replace: false,
			//模板
			template: '<div></div>',
			// 可选项
			transclude: false,
			// 可选项,依赖其他指令
			require: '',
			// 可选项,依赖的模块
			requires: ['$compile', '$parse', '$log', '$timeout','apiService']
		}
	]
}
