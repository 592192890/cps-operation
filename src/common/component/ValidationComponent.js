'use strict';
/***********************************************************************
 * 描述：验证指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ValidationComponent($compile, $parse, $log, $timeout, $window, $position) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
		//console.log(transclude);
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var formName = attrs.form;
		var controlName = attrs.control;
		var submitId = attrs.submit;
		var messages = attrs.messages;
		//被验证标签
		var control = document.querySelector('[name=' + controlName + ']');
		
		//验证标签
		if(controlName == 'dynamicName'){
			var now = new Date();
			var dynamicName = 'dynamicName_'+now.getTime();
			control.name = dynamicName;
			element.attr('control',dynamicName);
		}
		var submit = document.querySelector(submitId);

		var $form = $parse(formName)(scope);
		var $control = angular.element(control);
		var $submit = angular.element(submit);
		var $messages = angular.fromJson(messages.replace(/\'/g, '"'));
		var $wrap = $control.parent();

		var $scope = element.scope();
		
		var placement = attrs.placement || 'right';
		
		$scope.validationMessage = {};
		$scope.placement = placement;
		
		var f = function() {
			var position = $position.position($control);
			if ('left' == attrs.placement) {
				$scope.validationMessage.style = {top: position.top + (control.clientHeight - 39) / 2 + 'px', left: position.left - 208 + 'px'};
			} else {
				$scope.validationMessage.style = {top: position.top + (control.clientHeight - 39) / 2 + 'px', left: position.left + control.clientWidth + 8 + 'px'};
			}
		};
		
		f();
		
		angular.element($window).bind('resize', function() {
			scope.$apply(function() {
				f();
			});
		});

		var valid = function(isSubmit) {
			f();
			if ((!$form[controlName].$pristine || isSubmit) && $form[controlName].$invalid) {
				$wrap.addClass('has-error');
				$wrap.removeClass('has-success');
				$scope.validationMessage.style.display = 'block';
			}
			if ((!$form[controlName].$pristine || isSubmit) && $form[controlName].$valid) {
				$wrap.addClass('has-success');
				$wrap.removeClass('has-error');
				$scope.validationMessage.style.display = 'none';
			}
			if ($form[controlName].$error) {
				var error = $form[controlName].$error;
				for (var k in error) {
					$scope.validationMessage.content = $messages[k];
					break;
				}
			}
		};

		$control.bind('keyup', function() {
			scope.$apply(valid);
		});
		
		$control.bind('focus', function() {
			if(!scope.$$phase){
				scope.$apply(valid);
			}else{
				valid(true);
			}
		});
		
		$control.bind('change', function() {
			scope.$apply(function() {
				valid(true);
			});
		});
		
		$control.bind('mouseup', function() {
			scope.$apply(function() {
				valid(true);
			});
		});
		
		$control.bind('down', function() {
			scope.$apply(function() {
				valid(true);
			});
		});
		
		$control.bind('select', function() {
			scope.$apply(function() {
				valid(true);
			});
		});
		
		$control.bind('emitError', function() {
			valid.call(scope);
		}.bind(this));

		$submit.bind('click', function() {
			scope.$apply(function() {
				valid(true);
			});
		});
	};

}