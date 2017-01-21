'use strict';
/*******************************************************************************
 * 描述：My97日期指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function DatepickerComponent($compile, $parse, $filter) {

	/**
	 * 控制器
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var setter = $parse(attrs.ngModel).assign;
		var options = $parse(attrs.elDatepicker)(scope);
		var value = $parse(attrs.ngModel)(scope);
		if (value) {
			if (-1 == value.indexOf('-')) {
				setter(scope.$parent, $filter("date")(value, 'yyyy-MM-dd HH:mm:ss'));
			}
		}
		
		var _options = {
			dateFmt: 'yyyy-MM-dd'
		}

		angular.extend(_options, options);

		element.attr('onclick', 'WdatePicker(' + JSON.stringify(_options) + ')');
		element[0].onchange = function() {
			setter(scope.$parent, element.val());
		};
	};

}