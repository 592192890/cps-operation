'use strict';
/*******************************************************************************
 * 描述：框架启动入口类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var browser_support = true;

window.onload = function() {
};

(function() {
    if(browser_support){
        AngularContainer.startup();
    }
})();