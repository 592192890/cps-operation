
function TypeofUtil() {}

TypeofUtil.isJSON = function(obj) {
	return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
};

TypeofUtil.isArray = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

TypeofUtil.isFunction = function(obj) {
	return obj instanceof Function;
};

TypeofUtil.isPlainObject = function(obj) {
	if (!obj || toString.call(obj) !== "[object Object]") {
		return false;
	}

	if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
		return false;
	}

	var key;
	for (key in obj) {}

	return key === undefined || hasOwnProperty.call(obj, key);
};
