'use strict';
/*******************************************************************************
 * 描述：workflow 标签指令<br>
 * 
 * options节点说明: nodeCode:节点code nodeDesc:节点描述,用于显示.
 * nodeStatus:节点状态2:完成,1:处理中,0:未完成 nodeType:节点类型0:开始节点,1:普通节点,2:结束节点
 * nodeTime:节点完成时间
 * 
 * options json样例: { "nodeList" : [ { "nodeCode" : "1", "nodeDesc" : "测试节点1",
 * "nodeStatus" : 1, "nodeType" : 0, "nodeTime" : "2014-12-22 13:20:19" }, {
 * "nodeCode" : "2", "nodeDesc" : "测试节点2", "nodeStatus" : 1, "nodeType" : 1,
 * "nodeTime" : "2014-12-22 13:20:19" }, { "nodeCode" : "3", "nodeDesc" :
 * "测试节点3", "nodeStatus" : 0, "nodeType" : 2, "nodeTime" : "2014-12-22 13:20:19" } ] }
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function WorkFlowComponent($compile, $parse, $log, $timeout) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	/*
	 * this.testList = { "flowDesc" : "流程描述", "nodeList" : [ { "nodeCode" : "1",
	 * "nodeDesc" : "测试节点1", "nodeStatus" : 2, "nodeType" : 0, "nodeTime" :
	 * "2014-12-22 13:20:19" }, { "nodeCode" : "2", "nodeDesc" : "测试节点2",
	 * "nodeStatus" : 2, "nodeType" : 1, "nodeTime" : "2014-12-22 13:20:19" }, {
	 * "nodeCode" : "3", "nodeDesc" : "测试节点3", "nodeStatus" : 2, "nodeType" : 2 } ] };
	 */

	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {
		var options = scope.$parent[attrs.options];
		if (!options) {
			return;
		}
		var htmlBody = "";
		htmlBody = htmlBody + "<div class='signup-page step flow-body' style='width: 650px; margin: 0 auto'>";
		htmlBody = htmlBody + "<h3 class='flow-h'>" + options.flowDesc
				+ "</h3>";
		for ( var nodeIndex in options.nodeList) {
			var nodeCode = options.nodeList[nodeIndex].nodeCode;
			var nodeDesc = options.nodeList[nodeIndex].nodeDesc;
			var nodeStatus = options.nodeList[nodeIndex].nodeStatus;
			var nodeType = options.nodeList[nodeIndex].nodeType;
			var nodeTime = options.nodeList[nodeIndex].nodeTime;
			if (!nodeTime) {
				nodeTime = "";
			}

			var liClass = "";
			var descClass = "";
			var timeClass = "";
			if (nodeType == 0) {
				liClass = "flow flow1";
				descClass = "flow-text flow-text1";
				timeClass = "flow-time flow-time1";
			} else if (nodeType == 1) {
				liClass = "flow flow2";
				descClass = "flow-text";
				timeClass = "flow-time";
				if (nodeStatus == 1) {
					descClass = descClass + " T-active";
				} else if (nodeStatus == 0) {
					liClass = liClass + " T-active2";

				}
			} else if (nodeType == 2) {
				liClass = "flow flow3";
				descClass = "flow-text";
				timeClass = "flow-time";
				if (nodeStatus == 1 || nodeStatus == 2) {
					descClass = descClass + " T-active";
				} else if (nodeStatus == 0) {
					liClass = liClass + " T-active3";
				}
			}

			htmlBody = htmlBody + "<li class='" + liClass + "'>"
					+ "<span class='" + descClass + "'>" + nodeDesc + "</span>"
					+ "<span class='" + timeClass + "'>" + nodeTime
					+ "</span></li>"
		}
		htmlBody = htmlBody + "</div>";
		element.html(htmlBody);
	};

}