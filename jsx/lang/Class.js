'use strict';
Function.prototype.extend = function(superClass) {
	var constructor = this;
	var className = this.getClassName();
	this.prototype = new superClass();
	this.prototype.constructor = constructor;
	this.prototype.superClass = superClass;
	this.prototype.className = className;
};

Function.prototype.implement = function(interfaces) {
	if (interfaces && 0 == interfaces.length) {
		throw new Error('The ‘interfaces’ is must param');
	}
	for (var i in interfaces) {
		var _interface = interfaces[i];
		for (var p in _interface.prototype) {
			if (!this.prototype[p] instanceof Function) {
				throw new Error('The function ‘' + p + '’ of interface must be implement');
			}
		}
	}
};

Function.prototype.getClassName = function() {
	var className = this.prototype.constructor.toString();
	className = className.replace(/function /, '').replace(/\([\s\S]*\) \{[\s\S]*\}/g, '');
	return className;
};

Function.prototype.before = function(func) {
	var _self = this;
	return function() {
		if (false == func.apply(this, arguments)) {
			return false;
		}
		return _self.apply(this, arguments);
	};
};

Function.prototype.after = function(func) {
	var _self = this;
	return function() {
		var ret = _self.apply(this, arguments);
		if (false == ret) {
			return false;
		}
		func.apply(this, arguments);
		return ret;
	};
};
