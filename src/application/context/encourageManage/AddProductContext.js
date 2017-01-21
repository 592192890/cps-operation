'use strict';

function AddProductContext($state,$cookieStore,$timeout, apiService,$modal,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.productStatusDropListResult = {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryProductListResult = {};
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};

    this.execute = function() {
    	
    	this.getProductStatus();
		this.getCategory();
	};

	this.getCategory = function() {
		var url=ApiDefines.CPS_TYPE_LIST;
		var param={
			entityDTO:{},
			pageDTO : {
				pageSize : this.pageSize,
				pageNo : this.pageIndex
			},
			orderDTOs : [ ]
		};
		apiService.post(url, param).then(function(results){
			this.categoryArr=results.data.records;
		}.bind(this));
	}.bind(this);
    

    this.saveProductList = function() {

		this.close();
	};
	
	this.resetProductType = function(){
		
		this.queryModel.entityDTO.productType = "";
	}
    
	
    this.reset =function () {
     	 this.queryModel = {entityDTO:{}};
     };
    
    
    this.checkAllRows = function(){
        if(this.selectedProductArray.length == this.queryProductListResult.length){
            this.selectedProductArray = [];
        } else {
        	
        	for(var i = 0; i<this.queryProductListResult.length;i++){
        		
        		if(this.selectedProductArray.indexOf(this.queryProductListResult[i]) == -1){
        			
        		   this.selectedProductArray.push(this.queryProductListResult[i]);
        		}
        		
        		
        	}

//              this.selectedProductArray = [].concat(this.queryProductListResult);
        }

    }.bind(this);
    

    
    this.checkRow = function(row){
        var index = this.selectedProductArray.indexOf(row);
        if(index != -1){
            this.selectedProductArray.splice(index,1);
        } else {
            this.selectedProductArray.push(row);
        }

    };
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_PRODUCT_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryProductListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
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
    
    this.selectProductBrand = function () {
  	  this.productBrand = ModalUtil.createModal($modal, ModalPath.SELECT_PRODDUCT_BRAND, this, "md");
  };
  
  this.selectProductType = function () {
  	  this.productType = ModalUtil.createModal($modal, ModalPath.SELECT_PRODDUCT_TYPE, this, "md");
  };
  
  this.editSelectedCPSType = function () {
  	  this.productCPS = ModalUtil.createModal($modal, ModalPath.EDIT_PRODDUCT_CPS, this, "md");
  };
  
  this.editAllCPSType = function (){
  	 this.productCPS = ModalUtil.createModal($modal, ModalPath.EDIT_PRODDUCT_CPS, this, "md");
  };
    
    this.close = function () {
    	 this.$close();
    };

}

AddProductContext.extend(ContextSupport);
