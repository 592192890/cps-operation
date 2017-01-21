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

function RuleRemoteComponent($compile, $parse, $log, $timeout, $http) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var elRuleRemote = attrs.elRuleRemote;
		var $elRuleRemote = angular.fromJson(elRuleRemote.replace(/\'/g, '"'));
		
		var valid = function() {
			var params = {};
			for (var k in $elRuleRemote.params) {
				var $params = $elRuleRemote.params[k];
				if (0 == $params.indexOf('#')) {
					params[k] = document.querySelector($params).value;
				} else {
					params[k] = $elRuleRemote.params[k];
				}
				if (params[k] && 'string' == typeof params[k]) {
					params[k] = params[k].replace(/(^\s*)|(\s*$)/g, "");
				}
			}
			$http.post(appConfig.apiPath + ApiDefines[$elRuleRemote.apiName], params).success(function(data, status, headers, config) {
				if ('0' == data.code) {
					controller.$setValidity('remote', true);
				} else {
					controller.$setValidity('remote', false);
				}
				element.triggerHandler('emitError');
			}).error(function(data, status, headers, config) {
				controller.$setValidity('remote', false);
			});
		};
		element.on('keyup', valid);
	};

}