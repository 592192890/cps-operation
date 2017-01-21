'use strict';
/***********************************************************************
 * 描述：动态代理调用处理类<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function InvocationHandler(target, beforeFn, afterFn) {
	this.invoke = function(proxy, method, args) {
		if (beforeFn && beforeFn instanceof Function) {
			beforeFn();
		}
		var result = method.apply(target, args);
		if (afterFn && afterFn instanceof Function) {
			afterFn();
		}
		return result;
	};
}
