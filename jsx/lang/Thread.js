'use strict';
/***********************************************************************
 * 描述：线程管理类<br>
 * 作者：亿量前端-Boleer<br>
 * 日期：2015-07-16<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function Thread(_task, _delay, _args) {
	this.runFlag = false;
	this.busyFlag = false;
	this.taskArgs = _args;
	this.times = 1;

	var _point = this;

	this.timerID = -1;

	this.start = function() {
		if (this.runFlag == false) {
			this.timerID = window.setInterval(_point.run, _delay);
			this.runFlag = true;
		}
	}

	this.run = function() {
		if (_point.busyFlag) {
			return;
		}
		if (_point.times == -1) {// 无限循环
			_task(_point.taskArgs);
		} else if (_point.times > 0) {
			_task(_point.taskArgs);
			_point.times -= 1;
			if (_point.times == 0) {
				window.clearInterval(this.timerID);
			}
		}
	}

	this.sleep = function() {
		this.busyFlag = true;
	}

	this.resume = function() {
		this.busyFlag = false;
	}

	this.abort = function() {
		window.clearInterval(this.timerID);
	}
}