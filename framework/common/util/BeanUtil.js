'use strict';
/***********************************************************************
 * 描述：Bean对象操作工具类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function BeanUtil() {}

BeanUtil.newInstance = function(clazz, args, that) {
	if (typeof clazz == 'string') {
		clazz = window[clazz];
	}
	if (that) {
		clazz.apply(that, args || []);
		return that;
	} else {
		var bean = {};
		bean.__proto__ = clazz.prototype;
		clazz.apply(bean, args || []);
		return bean;
	}
};

BeanUtil.toGetter = function(propName) {
	return 'get' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
};

BeanUtil.toSetter = function(propName) {
	return 'set' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
};

BeanUtil.getProperties = function(bean) {
	var properties = [];
	for (var k in bean) {
		if (0 == k.indexOf('get')) {
			if (bean[k] instanceof Function) {
				properties.push(k.substring(3, 4).toLowerCase() + k.substring(4));
			}
		}
	}
	return properties;
};

BeanUtil.getClassName = function(bean) {
	var className = bean.__proto__.constructor.toString();
	className = className.replace(/function /, '').replace(/\([\s\S]*\) \{[\s\S]*\}/g, '');
	return className;
};
