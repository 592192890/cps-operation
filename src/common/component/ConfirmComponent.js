'use strict';
/***********************************************************************
 * 描述：确认提示框指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ConfirmComponent($compile, $parse, $log, $timeout, $modal) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
		var $confirm = $parse(attrs['confirm'])(scope);
		scope.confirmContext = {
			doConfirm: function() {
				if ($confirm.ok && $confirm.ok instanceof Function) {
					$confirm.ok();
				}
				$confirm.opened = false;
				$confirm.ok = undefined;
				$confirm.cancel = undefined;
				this.modalInstance.dismiss('cancel');
			},
			doCancel: function() {
				if ($confirm.cancel && $confirm.cancel instanceof Function) {
					$confirm.cancel();
				}
				$confirm.opened = false;
				$confirm.ok = undefined;
				$confirm.cancel = undefined;
				this.modalInstance.dismiss('cancel');
			}
		};
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var confirm = attrs['confirm'];
		scope.$watch(confirm + '.opened', function(newVal, oldVal) {
			if (true == newVal) {
				scope.confirmContext.confirmTitle = attrs['title'] || '确认提示';
				scope.confirmContext.confirmMsg = attrs['msg'];
				scope.confirmContext.modalInstance = ModalUtil.createModal($modal, 'confirmTpl.html', scope, 'sm');
			}
		});
	};

}