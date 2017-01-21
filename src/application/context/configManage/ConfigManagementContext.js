'use strict';

function ConfigManagementContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    this.pageIndex=PageConfig.INIT_PAGE_INDEX;
    this.pageSize=PageConfig.INIT_PAGE_SIZE;

    this.getDictionarys=function(type){
        var dfd=$.Deferred();
        var url=ApiDefines.DROP_DOWN_LIST;
        var param={
                    "entityDTO": {
                        "typeCode":type
                    }
                };

        apiService.post(url,param).then(function(results){
            dfd.resolve(results.data);
        }.bind(this));

        return dfd;
    }.bind(this);

    this.getTypeCodeArr = function() {
        this.typecodeArr = webStorageCache.get(DropDownListDefines.SETTLEMENT_STATUS);
        if(!this.typecodeArr){
            this.getDictionarys(DropDownListDefines.SETTLEMENT_STATUS).then(function(results){
                this.typecodeArr=results;
                webStorageCache.set(DropDownListDefines.SETTLEMENT_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this));
        }
        
    }.bind(this);

    this.execute = function() {
    	
    	this.getSystemSettings();
    };
    
    this.createConfig = function () {
    	$state.go('main.createConfig');
    	var createConfigInfo =  {
                name: '配置管理',
                sref: 'main.myIncome'
        };
        this.doActiveMenu(createConfigInfo);
    }
    

    this.editConfig = function (config) {
    	$state.go('main.editConfig',{data:{"configInfo":config}});
    	var createConfigInfo =  {
                name: '配置管理',
                sref: 'main.myIncome'
        };
        this.doActiveMenu(createConfigInfo);

    };

     this.deleteConfigConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.deleteConfig=function(config){
    	this.deleteConfigConfirm.opened = true;
          // 确认回调
          this.deleteConfigConfirm.ok = function() {
                var url=ApiDefines.SYSTEM_CONFIG_DELETE;
      
                var param={
                    "entityDTO":{
                            "dictionaryId": config.dictionaryId
                   }
                };

                apiService.post(url, param).then(function(results) {
                   
                    if(results.code==1){
                        this.popAlert(results.message,"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);
    }.bind(this);
    
	this.getSystemSettings = function() {
				
		var promise = apiService.post(ApiDefines.SYSTEM_INFO, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
               
				this.queryModel.entityDTO.marketingUrlInfo = result.data.marketingUrlInfo;
				this.queryModel.entityDTO.operationUrlInfo = result.data.operationUrlInfo;
				this.queryModel.entityDTO.systemEmail = result.data.systemEmail;
				this.queryModel.entityDTO.systemEmailPassword = result.data.systemEmailPassword;
				this.queryModel.entityDTO.systemEmailName = result.data.systemEmailName;
				this.queryModel.entityDTO.customerServiceEmail = result.data.customerServiceEmail;
				this.queryModel.entityDTO.repertoryEmail = result.data.repertoryEmail;
				this.queryModel.entityDTO.maintainEmail = result.data.maintainEmail;
				this.queryModel.entityDTO.smtphost = result.data.smtphost;
				this.queryModel.entityDTO.port = result.data.port;
				this.queryModel.entityDTO.tls = result.data.tls;
				this.queryModel.entityDTO.emailQueueRetainTime = result.data.emailQueueRetainTime;
				this.queryModel.entityDTO.threadPoolMaxAmount = result.data.threadPoolMaxAmount;
				this.queryModel.entityDTO.threadPoolMinAmount = result.data.threadPoolMinAmount;
				this.queryModel.entityDTO.threadIdleSurvivalTime = result.data.threadIdleSurvivalTime;
				this.queryModel.entityDTO.rdValidDate = result.data.rdValidDate;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
	
	this.updateSystemInfo = function() {
		
		var promise = apiService.post(ApiDefines.UPDATE_SYSTEM_INFO, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("配置项修改成功", 'success');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
	
    this.goBack = function () {
    	$state.go('main.configManagement');
        var promotionManageInfo =  {
            name: '配置项管理',
            sref: 'main.configManagement'
        };
        this.doActiveMenu(promotionManageInfo);
    }
	
	
    

    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.SYSTEM_CONFIG_QUERY;
      
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
                 this.searchedConfigList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                 this.pageIndex=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.reset=function(){
    	 this.queryModel = {entityDTO:{}};
    };

}

ConfigManagementContext.extend(ContextSupport);
