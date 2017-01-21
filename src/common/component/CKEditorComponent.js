'use strict';
/***********************************************************************
 * 描述：比较元素内容指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function CKEditorComponent($compile, $parse, $log, $timeout) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var setter = $parse(attrs.ngModel).assign;
		var $scope = element.scope();
		var height = attrs.height || '300px';
		var width = attrs.width || '950px';

		var ckeditor = CKEDITOR.replace(element[0], { height:height, width:width,removePlugins:'elementspath' });
		if (!controller) {
			return;
		}
		scope.$watch(attrs.ngModel, function (value) {
			if (typeof value != 'undefined'){
				setTimeout(function(){
					console.log(value);
					ckeditor.setData(value)
				},1000);
			}
				
		});
        //
		ckeditor.on('pasteState', function() {
			setter(scope.$parent,ckeditor.getData());
			if($scope.changed) {
				$scope.changed();
			}
		});
	};

}