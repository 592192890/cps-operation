

//说明， 从数组中根据key和key的值取得对应的value
function KeyFilter() {

	this.doFilter = function(input, key_name, key_code, value_name) {
		if (angular.isArray(input)) {
			for(var i=0; i<input.length;i++){
				if(input[i][key_name] == key_code){
					return input[i][value_name];
				}
			}
		} else {
			return '';
		}
		
	};

}