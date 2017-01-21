'use strict';
/***********************************************************************
 * 描述：领域角色<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function RoleSupport() {

	var manager = ManagerFactory.newInstance();

	this.env = AppContext.getEnvironment();

	this.apiService = manager.obtainBean('cps_context', 'apiService');

}