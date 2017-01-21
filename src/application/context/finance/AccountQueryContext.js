'use strict';

function AccountQueryContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.execute = function() {
    };
    
    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.ACCOUNT_QUERY;
      
        var param=angular.extend({
                    pageDTO : {
                        pageSize :this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : [
                    	
                    ]
                }, this.queryModel);
    	
        apiService.post(url, param).then(function(results) {
           
            if(results.code==1){
                 this.searchedAccountList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.reset=function(){
    	 this.queryModel = {entityDTO:{}};
    }

}

AccountQueryContext.extend(ContextSupport);