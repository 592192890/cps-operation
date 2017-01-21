'use strict';
/***********************************************************************
 * 描述：管理器工程类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ManagerFactory() {};

ManagerFactory.manager;

ManagerFactory.newInstance = function() {
	if (!ManagerFactory.manager) {
		if (AppContext.CONTAINER.angular == AppContext.getContainer()) {
			ManagerFactory.manager = new AngularManager();
		} else {
			// to do
		}
	}
	return ManagerFactory.manager;
};
