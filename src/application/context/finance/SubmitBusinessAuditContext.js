'use strict';

function SubmitBusinessAuditContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

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

        //实际结算金额默认等于结算金额，并且实际结算金额必须小于结算金额
        if(this.billInfo.finalMoney !=null && this.billInfo.finalMoney !="") {
            this.finalMoney=this.billInfo.finalMoney;
        } else {
            this.finalMoney=this.billInfo.statisticsMoney;

        }
    };
    
    this.submitBusinessAudit=function(finalMoney){
      if(finalMoney==""){
          this.popAlert("你必须输入实际结算金额","warning");
        return;
      }else{
          var url=ApiDefines.FINANCE_SUBMIT_BUSINESS_AUDIT;
      
          var param={
                      "entityDTO": {
                        "settlementId" : this.billInfo.settlementId,
                        "finalMoney" : finalMoney,
                        "remark": "重新提交业务审核，修改原因"  
                        }
                    } 

          apiService.post(url, param).then(function(results) {
            
              if(results.code==1){

                  this.popAlert('审核操作成功',"success");
                  $state.go("main.memberBillQuery");
                  
              }else if(results.code==0){
                  this.popAlert(results.message,"error");
              }else{
                  this.popAlert(results.message,"error");
              }
              
          }.bind(this));
      }
    	

    }
   this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.MEMBER_SETLLEMENT_DETAIL_AUDIT;
      
        var param={
					    "entityDTO": {
							   "businessId":this.billInfo.settlementId
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

SubmitBusinessAuditContext.extend(ContextSupport);
