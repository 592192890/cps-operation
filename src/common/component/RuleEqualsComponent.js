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

function RuleEqualsComponent($compile, $parse, $log, $timeout, $modal) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var elRuleEquals = document.querySelector(attrs.elRuleEquals);
		var $elRuleEquals = angular.element(elRuleEquals);
		var valid = function() {
			scope.$apply(function () {
				var v = element.val() === $elRuleEquals.val();
				controller.$setValidity('equals', v);
			});
		};
		element.on('keyup', valid);
		element.on('focus', valid);
	};

}