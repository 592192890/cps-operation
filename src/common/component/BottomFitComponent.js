'use strict';
/***********************************************************************
 * 描述：底部高度自适应指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function BottomFitComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var elBottomFit = attrs.elBottomFit;
		var $elBottomFit = angular.fromJson(elBottomFit.replace(/\'/g, '"'));
		var parent = document.querySelector($elBottomFit.parent);
		var $scope = element.scope();
		var autoHeight;
		(autoHeight = function() {
			var height = parent.offsetHeight - $elBottomFit.top;
			$scope.elementHeight = 'height:' + height + 'px;';
			if (element[0].offsetHeight - height > 5) {
				var tr = document.querySelector('table tr:last-child');
				if (tr) {
					var $tds = angular.element(tr).find('td');
					$tds.attr('style', 'border-bottom: none;');
				}
			}
		})();
		
		$window.onresize = function() {
			scope.$apply(autoHeight);
		};
	};

}