'use strict';
/***********************************************************************
 * 描述：比较元素内容指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function MergeTableComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var $scope=element.scope;

		if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }

         scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		        var id=attrs.class;
				$("#"+id).rowspan(0);
				$("#"+id).rowspan(1);
			}); 
       
	};

}