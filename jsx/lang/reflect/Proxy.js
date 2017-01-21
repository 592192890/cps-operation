'use strict';
/***********************************************************************
 * 描述：动态代理类<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function Proxy() {}

Proxy.newProxyInstance = function(classes, handler) {
	var proxy = new Proxy();
	for (var i in classes) {
		if (classes[i] instanceof Function) {
			var bean = BeanUtil.newInstance(classes[i]);
			var methodNames = ReflectionUtil.getMethodNames(bean);
			for (var j in methodNames) {
				var dynaCode = 'proxy.' + methodNames[j] + ' = function() {'
							 + 'return handler.invoke(proxy, bean.' + methodNames[j] + ', arguments);'
							 + '};';
				eval(dynaCode);
			}
		}
	}
	return proxy;
};
