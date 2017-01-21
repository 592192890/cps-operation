'use strict';

function MemberBillQueryContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

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

    this.getSetlementStatus = function() {
        this.setlementStatusArr = webStorageCache.get(DropDownListDefines.SETTLEMENT_STATUS);
        if(!this.setlementStatusArr){
            this.getDictionarys(DropDownListDefines.SETTLEMENT_STATUS).then(function(results){
                this.setlementStatusArr=results;
                webStorageCache.set(DropDownListDefines.SETTLEMENT_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getEncourageType=function(){
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

    this.getMediaStatus=function(){
        this.mediaStatusArr = webStorageCache.get(DropDownListDefines.MEDIA_STATUS);
        if(!this.mediaStatusArr){
            this.getDictionarys(DropDownListDefines.MEDIA_STATUS).then(function(results){
                this.mediaStatusArr=results;
                webStorageCache.set(DropDownListDefines.MEDIA_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getAccountStatus = function() {
        this.accountStatusArr = webStorageCache.get(DropDownListDefines.ACCOUNT_STATUS);
        if (!this.accountStatusArr) {
           this.getDictionarys(DropDownListDefines.ACCOUNT_STATUS).then(function(results){
                this.accountStatusArr=results;
                webStorageCache.set(DropDownListDefines.ACCOUNT_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
    }.bind(this);
    
    this.getCreateWay = function() {
        this.createWayArr = webStorageCache.get(DropDownListDefines.ORDER_OBTAN_WAY);
        if (!this.createWayArr) {
           this.getDictionarys(DropDownListDefines.ORDER_OBTAN_WAY).then(function(results){
                this.createWayArr=results;
                webStorageCache.set(DropDownListDefines.ORDER_OBTAN_WAY,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
    }.bind(this);
    
    

    this.execute = function() {
    	this.getSetlementStatus();
        this.getEncourageType();
        this.getMediaStatus();
        this.getAccountStatus();
        this.getCreateWay();
        this.roleCode = UserUtil.getUserRole();
        if($stateParams.data) {
    		this.queryModel.entityDTO.status = $stateParams.data.status;
    	}
    };
    
    this.viewSetlementDetail=function(bill){
        $state.go("main.memberSetlementDetail",{"data":{"billInfo":bill,"setlementStatusArr":this.setlementStatusArr,"mediaStatusArr":this.mediaStatusArr,"encourageTypeArr":this.encourageTypeArr}});

        var billInfo =  {
                name: '财务管理',
                sref: 'main.financeManagement'
            };
        this.doActiveMenu(billInfo);
    };
    this.viewDailySummary=function(){
        $state.go("main.memberDailySummary");
    };
    this.viewSubmitBusinessAudit=function(bill){
        $state.go("main.submitBusinessAudit",{"data":{"billInfo":bill,"setlementStatusArr":this.setlementStatusArr,"mediaStatusArr":this.mediaStatusArr,"encourageTypeArr":this.encourageTypeArr}});
        var billInfo =  {
                name: '财务管理',
                sref: 'main.financeManagement'
            };
        this.doActiveMenu(billInfo);
    };

    //批量审核
    this.businessAuditBatchConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.businessAuditBatch=function(){

        
        var settlementIdList=[];

        //得到所有可以进行业务审核的数据
        for(var i=0;i<this.checkedRows.length;i++){
            if(this.checkedRows[i].status==1 && this.checkedRows[i].accountStatus==2 &&  this.checkedRows[i].mediaStatus==4){
                settlementIdList.push(this.checkedRows[i].settlementId);
            }
           
        }
        
        if(settlementIdList.length==0){
            this.popAlert("请选择可以进行业务审核的数据","warning");
            return;
        }
        this.businessAuditBatchConfirm.opened = true;
        // 确认回调
        this.businessAuditBatchConfirm.ok = function(content) {
                if(content==undefined){
                    //pass
                    var url=ApiDefines.FINANCE_BUSINESS_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":settlementIdList, 
                                "isApproved":"true",
                                "remark":""
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                      
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }else{
                    // no pass
                    var url=ApiDefines.FINANCE_BUSINESS_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":settlementIdList, 
                                "isApproved":"false",
                                "remark":content
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                      
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }
                
        }.bind(this);    
    }.bind(this);

    this.managerAuditBatchConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.managerAuditBatch=function(){

        
        var settlementIdList=[];

        //得到所有可以进行主管审核的数据
        for(var i=0;i<this.checkedRows.length;i++){
            if(this.checkedRows[i].status==2 && this.checkedRows[i].accountStatus==2 &&  this.checkedRows[i].mediaStatus==4){
                settlementIdList.push(this.checkedRows[i].settlementId);
            }
           
        }
        
        if(settlementIdList.length==0){
            this.popAlert("请选择可以进行主管审核的数据","warning");
            return;
        }
          this.managerAuditBatchConfirm.opened=true;
          // 确认回调
          this.managerAuditBatchConfirm.ok = function(content) {
                if(content==undefined){
                    //pass
                    var url=ApiDefines.FINANCE_MANAGER_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":settlementIdList, 
                                "isApproved":"true",
                                "remark":""
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                      
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }else{
                    // no pass
                    var url=ApiDefines.FINANCE_MANAGER_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":settlementIdList, 
                                "isApproved":"false",
                                "remark":content
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                       
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }
                
          }.bind(this);
    }.bind(this);

    this.businessAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };

    //单个审核
    this.businessAudit=function(bill){
         this.businessAuditConfirm.opened = true;
          // 确认回调
          this.businessAuditConfirm.ok = function(content) {
                if(content==undefined){
                    //pass
                    var url=ApiDefines.FINANCE_BUSINESS_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":[bill.settlementId], 
                                "isApproved":"true"
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                      
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }else{
                    // no pass
                    var url=ApiDefines.FINANCE_BUSINESS_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":[bill.settlementId], 
                                "isApproved":"false",
                                "remark":content
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                       
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }
                
          }.bind(this);
    }.bind(this);

    this.managerAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.managerAudit=function(bill){
          this.managerAuditConfirm.opened=true;
          // 确认回调
          this.managerAuditConfirm.ok = function(content) {
                if(content==undefined){
                    //pass
                    var url=ApiDefines.FINANCE_MANAGER_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":[bill.settlementId], 
                                "isApproved":"true"
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                       
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }else{
                    // no pass
                    var url=ApiDefines.FINANCE_MANAGER_AUDIT;
              
                    var param={
                        "entityDTO": {
                        "settlementIdList":[bill.settlementId], 
                                "isApproved":"false",
                                "remark":content
                            }
                        }

                    apiService.post(url, param).then(function(results) {
                       
                        if(results.code==1){
                            this.doPagingSearch(this.pageIndex);
                            this.popAlert('操作成功',"success");
                        }else if(results.code==0){
                            this.popAlert(results.message,"error");
                        }else{
                            this.popAlert(results.message,"error");
                        }
                        
                    }.bind(this));
                }
                
          }.bind(this);
    }.bind(this);

    this.userAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.userAudit=function(bill){
        this.userAuditConfirm.opened=true;
         // 确认回调
        this.userAuditConfirm.ok = function(content) {
            if(content==undefined){
                //pass
                var url=ApiDefines.FINANCE_USER_CONFIRM;
              
                var param={
                    "entityDTO": {
                    "settlementId":bill.settlementId, 
                            "isConfirmed":"true",
                            "remark":""
                        }
                    }

                apiService.post(url, param).then(function(results) {
                  
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert('操作成功',"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
            }else{
                //no pass
                var url=ApiDefines.FINANCE_USER_CONFIRM;
              
                var param={
                    "entityDTO": {
                    "settlementId":bill.settlementId, 
                            "isConfirmed":"false",
                            "remark":content
                        }
                    }

                apiService.post(url, param).then(function(results) {
                 
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert('操作成功',"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
            }
        }.bind(this);
        
    }.bind(this);

    this.doPagingSearch=function(index,pageSize){
        this.checkedRows = [];
        
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.MEMBER_BILL_QUERY;
      
        var param=angular.extend({
                    pageDTO : {
                        pageSize :this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : [
                    	{
				            "propertyName": "status",
				            "type": "desc"
				        },
						{
				            "propertyName": "type",
				            "type": "desc"
				        }

                    ]
                }, this.queryModel);
        //set date's format
    	if(this.queryModel.entityDTO.createDateEnd!=undefined){
            this.queryModel.entityDTO.createDateEnd=this.queryModel.entityDTO.createDateEnd+" 00:00:00";
        }
        if(this.queryModel.entityDTO.createDateStart!=undefined){
            this.queryModel.entityDTO.createDateStart=this.queryModel.entityDTO.createDateStart+ " 23:59:59";
        }
        apiService.post(url, param).then(function(results) {
            //recovery date's format
            if(this.queryModel.entityDTO.createDateEnd!=undefined){
                this.queryModel.entityDTO.createDateEnd=this.queryModel.entityDTO.createDateEnd.split(" ")[0];
            }
            if(this.queryModel.entityDTO.createDateStart!=undefined){
                this.queryModel.entityDTO.createDateStart=this.queryModel.entityDTO.createDateStart.split(" ")[0];
            }
          
            if(results.code==1){
                 this.searchedMemberBillList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
               
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.checkedRows = [];

     this.checkAllRows = function(){
        if(this.checkedRows.length == this.searchedMemberBillList.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.searchedMemberBillList);
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

    this.reset=function(){
    	 this.queryModel = {entityDTO:{}};
    }
}

MemberBillQueryContext.extend(ContextSupport);
