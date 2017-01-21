
function RequireJsUtil() {}

/*RequireJsUtil.head = document.querySelector('head'); 

RequireJsUtil.require = function(url) {
	var script = document.querySelector('script[src="' + url + '"]');
	if (!script) {
		script = document.createElement('script');
		script.type= 'text/javascript'; 
		script.src = url;
		RequireJsUtil.head.appendChild(script);
	}
}*/

RequireJsUtil.request;
RequireJsUtil.createRequest = function() {
	try {
		RequireJsUtil.request = new ActiveXObject("Msxml2.XMLHTTP");// IE高版本创建XMLHTTP
	} catch (E) {
		try {
			RequireJsUtil.request = new ActiveXObject("Microsoft.XMLHTTP");// IE低版本创建XMLHTTP
		} catch (E) {
			RequireJsUtil.request = new XMLHttpRequest();// 兼容非IE浏览器，直接创建XMLHTTP对象
		}
	}
}

RequireJsUtil.require = function(urlKey) {
	var paths = requirejsConfig.paths;
	var url = '';
	for (var k in paths) {
		if (k == urlKey) {
			url = paths[k];
			break;
		}
	}
	if (url) {
		RequireJsUtil.createRequest(); // 创建xmlHttpRequest对象
		RequireJsUtil.request.open("get", url, false);
		RequireJsUtil.request.setRequestHeader("Content-Type", "text/javascript"); 
		RequireJsUtil.request.onreadystatechange = function() {
			if (RequireJsUtil.request.readyState == 4) {
				if (RequireJsUtil.request.status == 200) {
					
				}
			}
		}; // 指定响应函数
		RequireJsUtil.request.send(null);
	}
}
