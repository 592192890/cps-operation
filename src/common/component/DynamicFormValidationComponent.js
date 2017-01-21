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

function DynamicFormValidationComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link=function(scope, elm, iAttrs, ngModelCtr) {
              ngModelCtr.$name = scope.$eval(iAttrs.dyName)
              var formController = elm.controller('form') || {
                $addControl: angular.noop
              };
              formController.$addControl(ngModelCtr);

              scope.$on('$destroy', function() {
                formController.$removeControl(ngModelCtr);
              });

            };

}