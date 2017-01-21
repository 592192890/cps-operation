'use strict';
/***********************************************************************
 * 描述：组件根对象<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ComponentSupport() {}

/**
 * 设置环境上下文
 */
ComponentSupport.prototype.context = function(scope, element, attrs, transclude) {};

/**
 * link方式执行指令
 */
ComponentSupport.prototype.link = function(scope, element, attrs, controller) {};

/**
 * compile方式执行指令
 */
ComponentSupport.prototype.compile = function(element, attrs, transclude) {};