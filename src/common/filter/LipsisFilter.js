
function LipsisFilter() {

	this.doFilter = function(input, maxLen) {
		if ('string' == (typeof input)) {
			if (input.length > maxLen) {
				return input.substring(0, maxLen) + '...';
			} else {
				return input;
			}
		} else {
			return '';
		}
	};

}