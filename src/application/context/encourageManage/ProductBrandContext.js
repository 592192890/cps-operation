'use strict';

function ProductBrandContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.execute = function() {
    };
    
    this.selectedProductBrand = function (raw) {
		var flag=false;
		for(var i=0;i<this.selectedProductBrandArray.length;i++){
			if((this.selectedProductBrandArray)[i].productbrandId==raw.productbrandId){
				flag=true;
				break;
			}
		}
		if(flag==false){
			this.selectedProductBrandArray.push(raw);
		}
		this.close();
	};
    
    this.close = function () {
    	 this.$close();
    };

}

ProductBrandContext.extend(ContextSupport);
