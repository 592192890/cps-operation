'use strict';
/***********************************************************************
 * 描述：反射工具类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ReflectionUtil() {}

/**
 * 静态方法调用方法
 * @param clazz 类 Function
 * @param method 方法
 * @param args 参数
 */
ReflectionUtil.invokeClassMethod = function(clazz, method, args) {
	var invokeResult = false;
	if (clazz instanceof Function) {
		for (var m in clazz.prototype) {
			if (clazz.prototype[m] == method) {
				clazz.prototype[m](args);
				invokeResult = true;
				break;
			}
		}
	}
	return invokeResult;
};

/**
 * 实例方法调用方法
 * @param instance 实例对象
 * @param method 方法
 * @param args 参数
 */
ReflectionUtil.invokeInstanceMethod = function(instance, method, args) {
	var invokeResult = false;
	if (instance instanceof Object) {
		for (var m in instance) {
			if (instance[m] instanceof Function) {
				if (method instanceof Function) {
					if (instance[m] == method) {
						method.apply(instance, args);
						invokeResult = true;
						break;
					}
				} else {
					if (m == method) {
						instance[m]();
						invokeResult = true;
						break;
					}
				}
			}
		}
	}
	return invokeResult;
};

ReflectionUtil.isMethod = function(instance, methodName) {
	if (instance instanceof Object) {
		for (var m in instance) {
			if (instance[m] instanceof Function) {
				if (m == methodName) {
					return true;
				}
			}
		}
	}
	return false;
};

ReflectionUtil.isField = function(instance, fieldName) {
	if (instance instanceof Object) {
		for (var f in instance) {
			if (!(instance[f] instanceof Function)) {
				if (f == fieldName) {
					return true;
				}
			}
		}
	}
	return false;
};

ReflectionUtil.getMethodNames = function(instance) {
	var methods = [];
	if (!(instance instanceof Function)) {
		for (var m in instance) {
			if (instance[m] instanceof Function) {
				methods.push(m);
			}
		}
	}
	return methods;
};

ReflectionUtil.getMethods = function(instance) {
	var methods = [];
	if (!(instance instanceof Function)) {
		for (var m in instance) {
			if (instance[m] instanceof Function) {
				methods.push(instance[m]);
			}
		}
	}
	return methods;
};

ReflectionUtil.getFieldNames = function(instance) {
	var fields = [];
	if (!(instance instanceof Function)) {
		for (var f in instance) {
			if (!(instance[f] instanceof Function)) {
				fields.push(f);
			}
		}
	}
	return fields;
};

ReflectionUtil.getFields = function(instance) {
	var fields = [];
	if (!(instance instanceof Function)) {
		for (var f in instance) {
			if (!(instance[f] instanceof Function)) {
				fields.push(instance[f]);
			}
		}
	}
	return fields;
};

ReflectionUtil.getPublicMethodNames = function(clazz) {
	var methods = [];
	if (typeof clazz == 'string') {
		clazz = window[clazz];
	}
	if (clazz instanceof Function) {
		for (var m in clazz.prototype) {
			if (clazz.prototype[m] instanceof Function) {
				methods.push(m);
			}
		}
	}
	return methods;
};

ReflectionUtil.getPublicMethods = function(clazz) {
	var methods = [];
	if (typeof clazz == 'string') {
		clazz = window[clazz];
	}
	if (clazz instanceof Function) {
		for (var m in clazz.prototype) {
			if (clazz.prototype[m] instanceof Function) {
				methods.push(clazz.prototype[m]);
			}
		}
	}
	return methods;
};

ReflectionUtil.getPublicFieldNames = function(clazz) {
	var fields = [];
	if (typeof clazz == 'string') {
		clazz = window[clazz];
	}
	if (clazz instanceof Function) {
		for (var f in clazz.prototype) {
			if (!(clazz.prototype[f] instanceof Function)) {
				fields.push(f);
			}
		}
	}
	return fields;
};

ReflectionUtil.getPublicFields = function(clazz) {
	var fields = [];
	if (typeof clazz == 'string') {
		clazz = window[clazz];
	}
	if (clazz instanceof Function) {
		for (var f in clazz.prototype) {
			if (!(clazz.prototype[f] instanceof Function)) {
				fields.push(clazz.prototype[f]);
			}
		}
	}
	return fields;
};
