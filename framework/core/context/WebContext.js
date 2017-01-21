'use strict';
/***********************************************************************
 * 描述：Web环境上下文<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function WebContext() {}

/**
 * 创建场景对象
 * @param ctxClass 场景类名 String类型
 * @param injectParams 场景注入参数 Array类型
 * @returns context 场景对象
 */
WebContext.createContext = function(scope, ctxClass, injectParams) {
	var ctx = BeanUtil.newInstance(ctxClass, injectParams, scope);
	return ctx;
};

/**
 * 创建服务对象
 * @param serviceClass 服务类名 String类型
 * @param injectParams 场景注入参数 Array类型
 * @returns service 对象
 */
WebContext.createService = function(serviceClass, injectParams) {
	var service = BeanUtil.newInstance(serviceClass, injectParams);
	return service;
};

/**
 * 创建过滤器对象
 * @param filterClass 过滤器类名 String类型
 * @param injectParams 场景注入参数 Array类型
 * @returns service 对象
 */
WebContext.createFilter = function(filterClass, injectParams) {
	var filter = BeanUtil.newInstance(filterClass, injectParams);
	return filter;
};

/**
 * 创建Bean对象
 * @param beanClass 场景类名 String类型
 * @param injectParams 场景注入参数 Array类型
 * @returns service 对象
 */
WebContext.createBean = function(beanClass, injectParams) {
	var bean = BeanUtil.newInstance(beanClass, injectParams);
	return bean;
};

/**
 * 创建组件对象
 * @param componentClass 场景类名 String类型
 * @param injectParams 场景注入参数 Array类型
 * @returns service 对象
 */
WebContext.createComponent = function(componentClass, injectParams) {
	var component = BeanUtil.newInstance(componentClass, injectParams);
	return component;
};

/**
 * 设置请求参数
 * @param ctx
 * @param requestParams
 */
WebContext.setRequestParams = function(ctx, requestParams) {
	if (ctx && requestParams) {
		for (var k in requestParams) {
			ctx[k] = requestParams[k];
		}
	}
};

/**
 * 注入代理role对象
 * @param moduleName
 * @param ctx
 * @param proxyBeans
 */
WebContext.setProxyRoles = function(moduleName, ctx, proxyBeans) {
	if (ctx && proxyBeans) {
		for (var i in proxyBeans) {
			var clazz = proxyBeans[i].clazz;
			if (clazz) {
				var name = proxyBeans[i].name;
				var parent = proxyBeans[i].parent;
				if (parent && window[parent]) {
					clazz = window[clazz];
					if (clazz) {
						parent = window[parent];
						clazz.extend(parent);
					}
				}
				if (clazz) {
					if (!ctx[name] || ReflectionUtil.isField(ctx, name)) {
						var target = BeanUtil.newInstance(clazz)
						var handler = new InvocationHandler(target, ApiContext.openTx, ApiContext.commitTx);
						ctx[name] = Proxy.newProxyInstance([clazz], handler);
					}
				}
			}
		}
	}
};

