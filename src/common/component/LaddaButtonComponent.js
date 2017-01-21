'use strict';
/*******************************************************************************
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function LaddaButtonComponent($compile, $parse, $log, $timeout) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {

	};

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		// Create ladda instance.
        var l = Ladda.create(element[0]);
        // Watch laddButton attribute;
        scope.$watch(attrs.elLaddaButton, function (value) {
            // If directive value is number show progress bar
            if (typeof value === "number") {
                if (!l.isLoading()) {
                    l.start();
                }
                l.setProgress(value / 100);
            } else if (value === true) {
                // If directive value is true start loading
                l.start();
            } else if (value === false) {
                // If directive value is true end loading
                l.stop();
            }
        });
	};

}