'use strict';
/***********************************************************************
 * 描述：对象混合工具类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function MixinUtil() {}

/**
 * 混入
 * @param receivingClass
 * @param givingClass
 */
MixinUtil.create = function(receivingClass, givingClass) {
	for (var methodName in givingClass.prototype) {
		if (!receivingClass.prototype[methodName]) {
			receivingClass.prototype[methodName] = givingClass.prototype[methodName];
		}
	}
};