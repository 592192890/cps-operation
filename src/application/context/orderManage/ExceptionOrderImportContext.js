'use strict';

function ExceptionOrderImportContext($state,$cookieStore,$timeout,apiService,webStorageCache,FileUploader) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.execute = function() {
    	this.getApproveStatus();
    };
    
    this.exceptionOrderUploader = UploaderUtil.create(
			FileUploader,
			{
				url :  'http://'+ window.location.host + ApiDefines.CPS_ORDER_IMPORT,
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				filters : [ 'xslFilter' ],
				success : function(result) {
					if ('1' == result.code) {
						// this.popAlert('文件上传成功', 'success');
						if(result.data.importResult) {
							this.resultMessage ="导入数据成功";
						} else {
							this.resultStatus = true;
							this.resultMessage ="导入数据失败,下载文件查看失败原因，";
							this.errorReasonFilePath= result.data.fileUrl;
						}
						
					}
					else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this)
	});
    
    this.downloadTemp =function () {
    	window.open('http://'+ window.location.host + ApiDefines.CPS_ORDER_DOWNLOAD_TEMP);
    };
    
    this.downErrorReasonFile = function () {
    	window.open('http://'+ window.location.host + ApiDefines.CPS_ORDER_DOWNLOAD_ERROR_FILE + this.errorReasonFilePath);
    };
    

   	this.getApproveStatus = function() {
		this.approveStatusDropListResult = webStorageCache.get(DropDownListDefines.ORDER_IMPORT_RESULT);
		if (!this.approveStatusDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ORDER_IMPORT_RESULT);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.approveStatusDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.ORDER_IMPORT_RESULT,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_ORDER_IMPORT_HIS, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : [ ]
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
  

}

ExceptionOrderImportContext.extend(ContextSupport);
