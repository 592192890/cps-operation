
function InstanceUtil() {}

InstanceUtil.isNotEmpty = function(obj) {
	var hasProp = false;
	if (!TypeofUtil.isArray(obj)) {
		for (var p in obj) {
			hasProp = true;
			break;
		}
	}
	return hasProp;
};