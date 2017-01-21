'use strict';

function MemberDailySummaryContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.advanced_query=true;
    this.click_hidden=false;

    this.getDictionarys=function(type){
        var dfd=$.Deferred();
        var url=ApiDefines.DROP_DOWN_LIST;
        var param={
                        "entityDTO": {
                            "typeCode":type
                        }
                    };

        apiService.post(url,param).then(function(results){
            if(results.code==1){
                 dfd.resolve(results.data);
            }else{
                var error=results.message;
                dfd.reject(error);
            }
        }.bind(this));

        return dfd;
    }.bind(this);

    this.getOrderStatus = function() {
        this.orderStatusArr = webStorageCache.get(DropDownListDefines.ORDER_STATUS);
        if(!this.orderStatusArr){
            this.getDictionarys(DropDownListDefines.ORDER_STATUS).then(function(results){
                this.orderStatusArr=results;
                webStorageCache.set(DropDownListDefines.ORDER_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getEncougageType = function() {
        this.encourageTypeArr = webStorageCache.get(DropDownListDefines.ENCOURAGE_TYPE);
        if(!this.encourageTypeArr){
            this.getDictionarys(DropDownListDefines.ENCOURAGE_TYPE).then(function(results){
                this.encourageTypeArr=results;
                webStorageCache.set(DropDownListDefines.ENCOURAGE_TYPE,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getSettlementCondition = function() {
        this.settlementConditionArr = webStorageCache.get(DropDownListDefines.SETTLEMENT_CONDITION);
        if(!this.settlementConditionArr){
            this.getDictionarys(DropDownListDefines.SETTLEMENT_CONDITION).then(function(results){
                this.settlementConditionArr=results;
                this.queryModel.entityDTO.condition=results[0].optionKey;//set default value
                webStorageCache.set(DropDownListDefines.SETTLEMENT_CONDITION,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }else{
            this.queryModel.entityDTO.condition=this.settlementConditionArr[0].optionKey;//set default value
        }
        
    }.bind(this);

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

    this.execute = function() {
        this.getOrderStatus();
        this.getEncougageType();
        this.getSettlementCondition();
        this.getCategory();
    };

    this.doPagingSearch=function(index,pageSize){

        //var storeCondition=this.queryModel.entityDTO.condition;

        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.MEMBER_SETLLEMENT_DETAIL;

        var param=angular.extend({
                    pageDTO : {
                        pageSize :this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : [
                       
                    ]
                }, this.queryModel);
    
        
        // if(this.queryModel.entityDTO.conditionValue==""){
        //     this.queryModel.entityDTO.conditionValue=undefined;
        // }
        //set date's format
        if(this.queryModel.entityDTO.settlementStartDate!=undefined){
            this.queryModel.entityDTO.settlementStartDate=this.queryModel.entityDTO.settlementStartDate+" 00:00:00";
        }
        if(this.queryModel.entityDTO.settlementEndDate!=undefined){
            this.queryModel.entityDTO.settlementEndDate=this.queryModel.entityDTO.settlementEndDate+" 23:59:59";
        }

       

        apiService.post(url, param).then(function(results) {

            //this.queryModel.entityDTO.condition=storeCondition;

            //recovery data's dormat
            if(this.queryModel.entityDTO.settlementStartDate!=undefined){
                this.queryModel.entityDTO.settlementStartDate=this.queryModel.entityDTO.settlementStartDate.split(" ")[0];
            }
            if(this.queryModel.entityDTO.settlementEndDate!=undefined){
                this.queryModel.entityDTO.settlementEndDate=this.queryModel.entityDTO.settlementEndDate.split(" ")[0];
            }

            
           
            if(results.code==1){
                 this.searchedMemberSetlementDetailList=results.data.records;
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
        this.queryModel.entityDTO.condition=this.settlementConditionArr[0].optionKey;//set default value
    }
}

MemberDailySummaryContext.extend(ContextSupport);
