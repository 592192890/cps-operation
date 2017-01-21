'use strict';
/***********************************************************************
 * 描述：场景抽象类<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ContextSupport() {
	this.env = AppContext.getEnvironment();
	this.clearUploader = function(uploader, fileSelector) {
		UploadUtil.clear(uploader, fileSelector);
	};
}

ContextSupport.prototype.execute = function() {};
