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

function MultipButtonConfirmComponent($compile, $parse, $log, $timeout, $modal,webStorageCache) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
		var $confirm = $parse(attrs['confirm'])(scope);
		scope.multipButtonConfirmContext = {
			doConfirm: function() {
				if ($confirm.ok && $confirm.ok instanceof Function) {
					if(this.hidden==true){
						//pass
						$confirm.ok();
					}else{
						$confirm.ok(this.confirmContent);
					}
					//$confirm.ok(this.confirmContent);
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
			},
			passStatus:function(){
				$("#passAuditButton").addClass("active");
				$("#noPassAuditButton").removeClass("active");

			},
			noPassStatus:function(){
				$("#passAuditButton").removeClass("active");
				$("#noPassAuditButton").addClass("active");

			}
		};
	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		
		
		var confirm = attrs['confirm'];
		//scope.multipButtonConfirmContext.hidden=true;
		

		scope.$watch(confirm + '.opened', function(newVal, oldVal) {
			
			if (true == newVal) {
				scope.multipButtonConfirmContext.hidden=true;
				scope.multipButtonConfirmContext.confirmContent="";
				scope.multipButtonConfirmContext.confirmTitle = attrs['title'] || '确认提示';
				scope.multipButtonConfirmContext.modalInstance = ModalUtil.createModal($modal, 'multipButtonConfirmTpl.html', scope, 'sm');
			}
		});



	};

}