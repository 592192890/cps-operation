'use strict';

function ApplyPurchaseContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

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

    this.getApplyStatus = function() {
        this.applyStatusArr = webStorageCache.get(DropDownListDefines.COMMISSION_APPLY_STATUS);
        if(!this.applyStatusArr){
            this.getDictionarys(DropDownListDefines.COMMISSION_APPLY_STATUS).then(function(results){
                this.applyStatusArr=results;
                webStorageCache.set(DropDownListDefines.COMMISSION_APPLY_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getIsNeedInvoice = function() {
        this.isNeedInvoiceArr = webStorageCache.get(DropDownListDefines.IS_NEED_INVOICE);
        if(!this.isNeedInvoiceArr){
            this.getDictionarys(DropDownListDefines.IS_NEED_INVOICE).then(function(results){
                this.isNeedInvoiceArr=results;
                webStorageCache.set(DropDownListDefines.IS_NEED_INVOICE,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);


    this.execute = function() {
    	this.getApplyStatus();
        this.getIsNeedInvoice();
        this.roleCode = UserUtil.getUserRole();
        if($stateParams.data) {
    		this.queryModel.entityDTO.status = $stateParams.data.status;
    	}
    };
    
    
    this.doPagingSearch=function(index,pageSize){
        this.checkedRows=[];
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.APPLY_PURCHASE;
      
        var param=angular.extend({
                    pageDTO : {
                        pageSize :this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : [
                    	
                    ]
                }, this.queryModel);

        //set date's format
    	if(this.queryModel.entityDTO.createStartDate!=undefined){
            this.queryModel.entityDTO.createStartDat=this.queryModel.entityDTO.createStartDat+" 00:00:00";
        }
        if(this.queryModel.entityDTO.createEndDate!=undefined){
            this.queryModel.entityDTO.createEndDate=this.queryModel.entityDTO.createEndDate+" 23:59:59";
        }
        apiService.post(url, param).then(function(results) {
             //recovery date's format
            if(this.queryModel.entityDTO.createStartDate!=undefined){
                this.queryModel.entityDTO.createStartDat=this.queryModel.entityDTO.createStartDat.split(" ")[0];
            }
            if(this.queryModel.entityDTO.createEndDate!=undefined){
                this.queryModel.entityDTO.createEndDate=this.queryModel.entityDTO.createEndDate.split(" ")[0];
            }
           
            if(results.code==1){
                 this.applyPurchaseList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.exports=function(){
        var commissionApplyIds=[];

        //得到所有可以进行业务审核的数据
        for(var i=0;i<this.checkedRows.length;i++){
            commissionApplyIds.push(this.checkedRows[i].commissionApplyId);
        }
        
        if(commissionApplyIds.length==0){
            this.popAlert("请选择要导出的数据","warning");
            return;
        }

        var url=ApiDefines.FINANCE_EXPORTS;
        var param={
                    "entityDTO": {
                    "commissionApplyIds":commissionApplyIds
                    }
                };
        apiService.post(url, param).then(function(results) {
            
            if(results.code==1){
                window.open(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.FILE_DOWN + '?downFileName=' + results.data.downFileName);
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));
    }.bind(this);

    //批量
    this.applyPurchaseItendifyBatch=function(){

        var commissionApplyIds=[];

        //得到所有可以进行业务审核的数据
        for(var i=0;i<this.checkedRows.length;i++){
            if(this.checkedRows[i].status==2 ){
                commissionApplyIds.push(this.checkedRows[i].commissionApplyId);
            }
           
        }
        
        if(commissionApplyIds.length==0){
            this.popAlert("请选择可以进行确认已付款的数据","warning");
            return;
        }

         this.applyPurchaseConfirm.opened=true;
          // 确认回调
          this.applyPurchaseConfirm.ok = function() {
                
                var url=ApiDefines.FINANCE_PURCHASE_CONFIRM;
          
                var param={
                            "entityDTO": 
                                {
                                  "commissionApplyIds": commissionApplyIds
                                }
                            }


                apiService.post(url, param).then(function(results) {
                   
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
               
                
          }.bind(this);
    }.bind(this);

    this.applyAuditBatch=function(applyPurchase){
        
        var commissionApplyIds=[];

        //得到所有可以进行业务审核的数据
        for(var i=0;i<this.checkedRows.length;i++){
            if(this.checkedRows[i].status==0 || this.checkedRows[i].status==1){
                commissionApplyIds.push(this.checkedRows[i].commissionApplyId);
            }
           
        }
        
        if(commissionApplyIds.length==0){
            this.popAlert("请选择可以进行审核的数据","warning");
            return;
        }
        this.applyAuditConfirm.opened=true;
        //确认回调
        this.applyAuditConfirm.ok = function(content) {
            if(content==undefined){
                //pass
                var url=ApiDefines.FINANCE_APPLY_AUDIT;
      
                var param={
                            "entityDTO": {
                            "commissionApplyIds":commissionApplyIds,
                            "isPass" : true
                            }
                        }

                apiService.post(url, param).then(function(results) {

                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));

            }else{
                //no pass
                var url=ApiDefines.FINANCE_APPLY_AUDIT;
      
                var param={
                            "entityDTO": {
                                "commissionApplyIds":commissionApplyIds,
                                "isPass" : "false",
                                "remark":content
                            }
                        }

                apiService.post(url, param).then(function(results) {
                  
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
            }
        }.bind(this);
    }.bind(this);

    //单个
    this.applyPurchaseConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.applyPurchaseItendify=function(applyPurchase){
         this.applyPurchaseConfirm.opened=true;
          // 确认回调
          this.applyPurchaseConfirm.ok = function() {
                
                var url=ApiDefines.FINANCE_PURCHASE_CONFIRM;
          
                var param={
                            "entityDTO": 
                                {
                                  "commissionApplyIds": [applyPurchase.commissionApplyId]
                                }
                            }


                apiService.post(url, param).then(function(results) {
                   
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this)); 
          }.bind(this);
    }.bind(this);

    this.applyAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.applyAudit=function(applyPurchase){
        this.applyAuditConfirm.opened=true;
        //确认回调
        this.applyAuditConfirm.ok = function(content) {
            if(content==undefined){
                //pass
                var url=ApiDefines.FINANCE_APPLY_AUDIT;
      
                var param={
                            "entityDTO": {
                            "commissionApplyIds":[applyPurchase.commissionApplyId],
                            "isPass" : true
                            }
                        }

                apiService.post(url, param).then(function(results) {
                  
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));

            }else{
                //no pass
                var url=ApiDefines.FINANCE_APPLY_AUDIT;
      
                var param={
                            "entityDTO": {
                                "commissionApplyIds":[applyPurchase.commissionApplyId],
                                "isPass" : "false",
                                "remark":content
                            }
                        }

                apiService.post(url, param).then(function(results) {
                   
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert("审核操作已完成","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
            }
        }.bind(this);
    }.bind(this);

    this.reAudit =function (applyPurchase) {
        var promise = apiService.post(ApiDefines.FINANCE_REAUDIT,
            angular.extend({entityDTO:{commissionApplyIds:[applyPurchase.commissionApplyId]}}));
        promise.then(function(result) {
            if ('1' == result.code) {
                this.doPagingSearch(this.pageIndex);
                this.popAlert("重新审核操作已完成","success");
            } else {
                // .....
                this.popAlert(result.message, 'error');
            }
        }.bind(this));
    };

    this.checkedRows = [];

    this.checkAllRows = function(){
        if(this.checkedRows.length == this.applyPurchaseList.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.applyPurchaseList);
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

ApplyPurchaseContext.extend(ContextSupport);

