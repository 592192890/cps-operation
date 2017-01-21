'use strict';
/***********************************************************************
 * 描述：Api环境上下文<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ApiContext() {}

ApiContext.exception = false;
ApiContext.txCache = [];
ApiContext.openTx = function() {};
ApiContext.commitTx = function() {
	if (!ApiContext.exception) {
		for (var i in ApiContext.txCache) {
			ApiContext.txCache[i]();
		}
	}
};

ApiContext.getCRUD = function() {
	var manager = ManagerFactory.newInstance();
	var $resource = manager.getApiResource();
	var $q = manager.getQ();

	function Response(deferred) {
		var manager = ManagerFactory.newInstance();
		var $scope = manager.getCurrentScope();
		$q.all([deferred.promise]).then(function(result) {
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
		
		this.success = function(result, headers) {
			deferred.resolve(result);
		};
		this.error = function(result, headers) {
			deferred.reject(result);
		};
	}
	
	var filterUrl = function(url) {
		if (0 > url.indexOf('http://') && 0 > url.indexOf('https://')) {
			url = AppContext.getApiPath() + url;
		//	url = 'http://'+ window.location.host + url;
		}
		return url;
	};
	
	return {
		get: function(url, params) {
			var deferred = $q.defer();
			var response = new Response(deferred);
			$resource(filterUrl(url), params || {}).get(response.success, response.error);
			return deferred.promise;
		},
		query: function(url, params) {
			var deferred = $q.defer();
			var response = new Response(deferred);
			$resource(filterUrl(url), params || {}).query(response.success, response.error);
			return deferred.promise;
		},
		post: function(url, params, payload, hasTx) {
			var deferred = $q.defer();
			var response = new Response(deferred);
			if (hasTx) {
				ApiContext.txCache.push(function() {
					$resource(filterUrl(url)).save(params || {}, payload || {}, response.success, response.error);
				});
			} else {
				$resource(filterUrl(url)).save(params || {}, payload || {}, response.success, response.error);
			}
			return deferred.promise;
		},
		put: function(url, params, payload, hasTx) {
			var deferred = $q.defer();
			var response = new Response(deferred);
			if (hasTx) {
				ApiContext.txCache.push(function() {
					$resource(filterUrl(url), {}, {
						put: {
							method: "PUT"
						}
					}).put(params || {}, payload || {}, response.success, response.error);
				});
			} else {
				$resource(filterUrl(url), {}, {
					put: {
						method: "PUT"
					}
				}).put(params || {}, payload || {}, response.success, response.error);
			}
			return deferred.promise;
		},
		'delete': function(url, params, payload, hasTx) {
			var deferred = $q.defer();
			var response = new Response(deferred);
			if (hasTx) {
				ApiContext.txCache.push(function() {
					$resource(filterUrl(url))['delete'](params || {}, payload || {}, response.success, response.error);
				});
			} else {
				$resource(filterUrl(url))['delete'](params || {}, payload || {}, response.success, response.error);
			}
			return deferred.promise;
		}
	};
};
