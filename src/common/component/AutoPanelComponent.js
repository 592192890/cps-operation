'use strict';
/***********************************************************************
 * 描述：尺寸自适应指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function AutoPanelComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var top = attrs.top;
		var right = attrs.right;
		var bottom = attrs.bottom;
		var left = attrs.left;
		var height = attrs.height;
		var appendWith = attrs.appendWith;
		var $scope = element.scope();
		if (appendWith) {
			var innerElement = document.querySelector(appendWith);
			if (innerElement) {
				var $innerElement = angular.element(innerElement);
				element.find('div').append($compile($innerElement)(scope));
				$innerElement.removeClass('hidden');
			}
		}
		$scope.panelStyle = {};
		if (top) {
			$scope.panelStyle.top = top + 'px';
		}
		if (right) {
			$scope.panelStyle.right = right + 'px';
		}
		if (bottom) {
			$scope.panelStyle.bottom = bottom + 'px';
		}
		if (left) {
			$scope.panelStyle.left = left + 'px';
		}
		if (height) {
			$scope.panelStyle.height = height + 'px';
		}
	};

}