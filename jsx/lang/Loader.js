'use strict';
/***********************************************************************
 * 描述：JS类文件加载器<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function Loader() {}

Loader.ready = function(fn) {
	var _fn = window.onload;
	if (_fn instanceof Function) {
		window.onload = function() {
			_fn();
			fn();
		};
	} else {
		window.onload = function() {
			fn();
		};
	}
};

Loader.imports = function(path, defer) {
	if (true == defer) {
		Loader.ready(function() {
			document.write('<script src="' + path + '"><\/script>');
		});
	} else {
		document.write('<script src="' + path + '"><\/script>');
	}
};
