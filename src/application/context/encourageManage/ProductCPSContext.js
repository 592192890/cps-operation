'use strict';

function ProductCPSContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.execute = function() {
    	
    };
    
    this.selectedCPSType = function (raw) {
		var flag=false;
		for(var i=0;i<this.selectedCPSTypeArray.length;i++){
			if((this.selectedCPSTypeArray)[i].cpstypeId==raw.cpstypeId){
				flag=true;
				break;
			}
		}
		if(flag==false){
			this.selectedCPSTypeArray.push(raw);
		}
		this.close();
	};
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_TYPE_SELECT_PAGE, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : [ ]
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.cpstypeResultList = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
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

ProductCPSContext.extend(ContextSupport);
