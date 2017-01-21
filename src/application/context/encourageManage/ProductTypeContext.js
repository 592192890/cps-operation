'use strict';

function ProductTypeContext($state,$cookieStore,$timeout, apiService) {
    
    this.queryPmsTypeListResult = {};
    
    this.query = {entityDTO:{}};


    this.execute = function() {
    	
    	this.doPagingSearch();
    };
    
    this.selectedProductType = function (raw) {
        this.queryModel.entityDTO.productType = raw.name;
		this.close();
	};
	
    this.doPagingSearch = function() {

		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.PMS_TYPE_LIST, angular
			.extend({
				pageDTO : {
					pageSize : this.pageSize,
					pageNo : this.pageIndex
				},
				orderDTOs : [ ]
			}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryPmsTypeListResult = result.data;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
    
    this.close = function () {
    	 this.$close();
    };

}

ProductTypeContext.extend(ContextSupport);
