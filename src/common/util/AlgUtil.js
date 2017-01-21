
function AlgUtil() {}

AlgUtil.arryToVertically = function(array, num) {
	var dataCols = new Array();
	var arraySize = array.length;
	var rowSize = parseInt(arraySize / num, 10) + (0 == arraySize % num ? 0 : 1);
	for (var i = 0; i < num; i++) {
		var arr = new Array();
		for (var j = 0; j < rowSize; j++) {
			if (j * num + i + 1 > arraySize) {
				break;
			} else {
				arr.push(array[j * num + i]);
			}
		}
		dataCols.push(arr);
	}
	return dataCols;
};
