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

function SizeFitComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var elSizeFit = attrs.elSizeFit;
		var $elSizeFit = angular.fromJson(elSizeFit.replace(/\'/g, '"'));
		var $scope = element.scope();
		var autoFit;
		(autoFit = function() {
			var contentElement = document.querySelector('.main-page.content-view');
			if (contentElement) {
				var top = $elSizeFit.top;
				var left = $elSizeFit.left;
				$scope.fitStyle = {};
				if (top) {
					var height = contentElement.offsetHeight - $elSizeFit.top;
					$scope.fitStyle.height = height + 'px';
				}
				if (left) {
					var width = contentElement.clientWidth - $elSizeFit.left;
					$scope.fitStyle.width = width + 'px';
				}
			}
		})();
		
		$window.onresize = function() {
			scope.$apply(autoFit);
		};
		
		scope.$watch('mainCtx.notice.show', function(newVal, oldVal) {
			if (true == newVal && false == oldVal) {
				$scope.fitStyle.height = element[0].offsetHeight - 46 + 'px';
			} else if (false == newVal && true == oldVal) {
				$scope.fitStyle.height = element[0].offsetHeight + 46 + 'px';
			}
		});
	};

}