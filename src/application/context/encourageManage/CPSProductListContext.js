'use strict';

function CPSProductListContext($state,$cookieStore,$timeout, apiService,$modal,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.updateModel = {entityDTO:{}};
    
    this.productStatusDropListResult = {};
    
    this.hidden = false;

    this.queryResult = {};
    
    this.salesChannelsDropListResult = {};

    this.execute = function() {
    	
    	this.getSalesChannels();
    	
    	this.getProductStatus();

		this.getCategory();

    };

	this.getCategory = function() {
		var url=ApiDefines.CPS_TYPE_DROP_DOWN;
		var param={
		};
		apiService.post(url, param).then(function(results){
			this.categoryArr=results.data;
		}.bind(this));
	}.bind(this);
    
	this.getProductStatus = function() {
		this.productStatusDropListResult = webStorageCache.get(DropDownListDefines.PMS_SBOM_STATUS);
		if (!this.productStatusDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.PMS_SBOM_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.productStatusDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.PMS_SBOM_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getSalesChannels = function() {
		this.salesChannelsDropListResult = webStorageCache.get(DropDownListDefines.PMS_SALE_CHANNEL_CODE);
		if (!this.salesChannelsDropListResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.PMS_SALE_CHANNEL_CODE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.salesChannelsDropListResult = result.data;
					webStorageCache.set(DropDownListDefines.PMS_SALE_CHANNEL_CODE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    
    this.exportData = function (){

		var promise = apiService.post(ApiDefines.CPS_PRODUCT_EXPORT, angular
				.extend({
					pageDTO : {
						pageSize : 10000,
						pageNo : 1
					}
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				
				window.open(webStorageCache.get(Constants.FILE_SERVER_PATH) + ApiDefines.FILE_DOWN + '?downFileName=' + result.data.downFileName);
				
			} else {
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
    
    this.reset = function (){
    	this.queryModel = {entityDTO:{}};
    };
    
	this.resetProductType = function(){
		
		this.queryModel.entityDTO.productType = "";
	}
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_PRODUCT_LIST, angular
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
    
    
    this.selectProductBrand = function () {
    	  this.productBrand = ModalUtil.createModal($modal, ModalPath.SELECT_PRODDUCT_BRAND, this, "md");
    };
    
    this.selectProductType = function () {
    	  this.productType = ModalUtil.createModal($modal, ModalPath.SELECT_PRODDUCT_TYPE, this, "md");
    };
    
    this.editSelectedCPSType = function (raw) {
    	this.clearSelectedCPSType();
        this.updateModel.entityDTO.productSkuList = [];
    	if(raw){
    		this.updateModel.entityDTO.productSkuList.push({productSku:raw.productSku,productName:raw.productName});
    	} else {
    		if(this.checkedRows.length == 0) {
    			this.popAlert("请选择一条商品记录", 'error');
    			return false;
    		};
    		for(var i = 0;i < this.checkedRows.length; i++){
    			this.updateModel.entityDTO.productSkuList.push({productSku:this.checkedRows[i].productSku,productName:this.checkedRows[i].productName})
    		};
    	}
    	  this.productCPS = ModalUtil.createModal($modal, ModalPath.EDIT_PRODDUCT_CPS, this, "md");
    	  this.productCPS.result.then(function () { 
    			var modalElement = document.querySelector('.modal-dialog [ng-controller]');
    			var $modalElement = angular.element(modalElement);
    			var modalScope = $modalElement.scope();
    			if(modalScope.selectedCPSTypeArray.length != 0 ) {
    				modalScope.updateModel.entityDTO.cpstypeId = modalScope.selectedCPSTypeArray[0].cpstypeId;
    				modalScope.updateModel.entityDTO.cpstypeName = modalScope.selectedCPSTypeArray[0].cpstypeName;
    				var promise = apiService.post(ApiDefines.CPS_PRODUCT_UPDATR,
    						angular.extend( modalScope.updateModel ));
    				promise.then(function(result) {
    					if ('1' == result.code) {
    						modalScope.popAlert('修改成功', 'success');	
    						modalScope.$parent.doPagingSearch(1);
    					} else {
    						// .....
    						modalScope.popAlert(result.message, 'error');
    					}
    				}.bind(this));
    			}
    			
    	 });
    };
    
    this.editAllCPSType = function (){
    	this.clearSelectedCPSType();
    	this.checkAllRows();
        this.updateModel.entityDTO.productSkuList = [];
		for(var i = 0;i < this.checkedRows.length; i++){
			this.updateModel.entityDTO.productSkuList.push({productSku:this.checkedRows[i].productSku,productName:this.checkedRows[i].productName})
		};
    	  this.productCPS = ModalUtil.createModal($modal, ModalPath.EDIT_PRODDUCT_CPS, this, "md");
    	  this.productCPS.result.then(function () { 
    			var modalElement = document.querySelector('.modal-dialog [ng-controller]');
    			var $modalElement = angular.element(modalElement);
    			var modalScope = $modalElement.scope();
    			if(modalScope.selectedCPSTypeArray.length != 0 ) {
    				modalScope.updateModel.entityDTO.cpstypeId = modalScope.selectedCPSTypeArray[0].cpstypeId;
    				modalScope.updateModel.entityDTO.cpstypeName = modalScope.selectedCPSTypeArray[0].cpstypeName;
    				var promise = apiService.post(ApiDefines.CPS_PRODUCT_UPDATR,
    						angular.extend( modalScope.updateModel ));
    				promise.then(function(result) {
    					if ('1' == result.code) {
    						modalScope.popAlert('修改成功', 'success');	
    						modalScope.$parent.doPagingSearch(1);
    					} else {
    						// .....
    						modalScope.popAlert(result.message, 'error');
    					}
    				}.bind(this));
    			}
    			
    	 });
    	  this.checkedRows = [];
    };
    
	this.selectedCPSTypeArray = [];

	this.clearSelectedCPSType = function () {
		this.selectedCPSTypeArray = [];
	};
    
    this.delConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.deleteSelectedCPSType = function (raw) {
    	  this.delConfirm.opened = true;
    	  this.delConfirm.ok = function() {
          // 确认回调
        	  this.clearSelectedCPSType();
              this.updateModel.entityDTO.productSkuList = [];
          	if(raw){
          		this.updateModel.entityDTO.productSkuList.push({productSku:raw.productSku,productName:raw.productName});
          	} else {
          		if(this.checkedRows.length == 0) {
          			this.popAlert("请选择一条商品记录", 'error');
          			return false;
          		};
          		for(var i = 0;i < this.checkedRows.length; i++){
          			this.updateModel.entityDTO.productSkuList.push({productSku:this.checkedRows[i].productSku,productName:this.checkedRows[i].productName})
          		};
          	}
			var promise = apiService.post(ApiDefines.CPS_PRODUCT_DELETE,
					angular.extend( this.updateModel ));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.popAlert('删除成功', 'success');
					this.doPagingSearch(1);
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
          			
          }.bind(this);
    };
    
    this.checkedRows = [];

    this.checkAllRows = function(){
        if(this.checkedRows.length == this.queryResult.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.queryResult);
        }
    }.bind(this);

    this.checkRow = function(row){
        var index = this.checkedRows.indexOf(row);
        if(index != -1){
            this.checkedRows.splice(index,1);
        } else {
            this.checkedRows.push(row);
        }
    };
}

CPSProductListContext.extend(ContextSupport);
