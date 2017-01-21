'use strict';
/*******************************************************************************
 * 描述：菜单框指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function MenuBoxComponent($compile, $parse, $log, $timeout) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var items = attrs.items;
		var targetPanel = attrs.targetPanel;
		var $items = $parse(items)(scope);
		var $scope = element.scope();
		$scope.items = $items;
		$scope.menuItem = {};
		$scope.doLink = function(index, linkUrl) {
			$scope.menuItem.linkIndex = index;
			if (targetPanel) {
				var targetPanelElement = document.querySelector(targetPanel);
				if (targetPanelElement) {
					var panelScope = angular.element(targetPanelElement).scope();
					panelScope.panelUrl = linkUrl;
				}
			}
		};
		if (0 < $items.length) {
			$scope.doLink(0, $items[0].link);
		}
	};

}