'use strict';
/***********************************************************************
 * 描述：Jsx预加载<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

(function() {
	document.write('<script src="./jsx/lang/Loader.js"><\/script>');
	document.write('<script src="./jsx/lang/Class.js"><\/script>');
	document.write('<script src="./jsx/lang/Object.js"><\/script>');
	document.write('<script src="./jsx/lang/Array.js"><\/script>');
	document.write('<script src="./jsx/lang/Thread.js"><\/script>');
	document.write('<script src="./jsx/lang/reflect/Proxy.js"><\/script>');
	document.write('<script src="./jsx/lang/reflect/InvocationHandler.js"><\/script>');
	document.write('<script src="./jsx/util/HashMap.js"><\/script>');
})();