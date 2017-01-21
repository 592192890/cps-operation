'use strict';
/***********************************************************************
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ModalUtil() {}

ModalUtil.createModal = function($modal, url, scope, size) {
    var options = {
        animation: true,
        templateUrl: url,
        size: size || 'lg',
        backdrop: 'static',
        keyboard: false
    };
    if (scope) {
        angular.extend(options, {'scope': scope});
    }
    var modal = $modal.open(options);

    scope.closeModal = function() {
        modal.dismiss('cancel');
    };
    modal.rendered.then(function() {
        var modalElement = document.querySelector('.modal-dialog [ng-controller]');
        var $modalElement = angular.element(modalElement);
        var modalScope = $modalElement.scope();
        if (modalScope) {
            modalScope.parentContext = scope;
        }
    });

    return modal;

};