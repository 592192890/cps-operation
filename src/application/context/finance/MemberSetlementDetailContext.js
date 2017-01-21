'use strict';

function MemberSetlementDetailContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.hidden = false;
    

    this.execute = function() {
    	if($stateParams.data) {
          webStorageCache.set('billInfo',$stateParams.data.billInfo ,{exp:86400});

          webStorageCache.set('setlementStatusArr',$stateParams.data.setlementStatusArr ,{exp:86400});
          webStorageCache.set('mediaStatusArr',$stateParams.data.mediaStatusArr ,{exp:86400});
          webStorageCache.set('encourageTypeArr',$stateParams.data.encourageTypeArr ,{exp:86400});
        }
          
        this.billInfo =webStorageCache.get('billInfo');

        this.setlementStatusArr =webStorageCache.get('setlementStatusArr');
        this.mediaStatusArr =webStorageCache.get('mediaStatusArr');
        this.encourageTypeArr =webStorageCache.get('encourageTypeArr');

       
    };
    
    
    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.MEMBER_SETLLEMENT_DETAIL_AUDIT;
      
        var param={
					    "entityDTO": {
							"businessId":this.billInfo.memberId
					    },
					    "pageDTO": {
					        "pageSize": this.pageSize,
					        "pageNo": this.pageIndex
					    },
					    "orderDTOs": [
							{
								"propertyName":"createTime",
								"type":"desc"
							}
						]
					}
        apiService.post(url, param).then(function(results) {
          
            if(results.code==1){
                 this.auditList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;

               
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

   
}

MemberSetlementDetailContext.extend(ContextSupport);
