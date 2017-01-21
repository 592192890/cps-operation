
function LocalEnvUtil() {}

LocalEnvUtil.test = function(callback) {
	if ('develop' == AppContext.getEnvironment()) {
		callback();
	}
};