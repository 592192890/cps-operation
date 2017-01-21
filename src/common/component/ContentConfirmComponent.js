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

function ContentConfirmComponent($compile, $parse, $log, $timeout, $modal,webStorageCache) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
		var $confirm = $parse(attrs['confirm'])(scope);
		scope.contentConfirmContext = {
			doConfirm: function() {
				if ($confirm.ok && $confirm.ok instanceof Function) {
					if(this.selecedtype=='other'){
						$confirm.ok(this.confirmContent);
					}else{
						for(var i=0;i<this.noPassAuditReasonArr.length;i++){
							if(this.selecedtype==this.noPassAuditReasonArr[i].optionKey){
								var reason=this.noPassAuditReasonArr[i].optionValue;
								break;
							}
						}
						$confirm.ok(reason);
					}
					
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
				scope.contentConfirmContext.confirmTitle = attrs['title'] || '确认提示';
				scope.contentConfirmContext.confirmMsg = attrs['msg'];

				var storeName=attrs['ngModel'];
				scope.contentConfirmContext.noPassAuditReasonArr=webStorageCache.get(storeName);

				scope.contentConfirmContext.modalInstance = ModalUtil.createModal($modal, 'contentConfirmTpl.html', scope, 'sm');
			}
		});


	};

}