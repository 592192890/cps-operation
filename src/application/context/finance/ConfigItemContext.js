'use strict';

function ConfigItemContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.getMemberConfigItem=function(){
    	var url=ApiDefines.FINANCE_CONFIG_ITEM_LIST;
      
        var param={

        };
    	
        apiService.post(url, param).then(function(results) {
            
            if(results.code==1){
                this.queryModel.entityDTO=results.data;
                 
              
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));
    }.bind(this);

    this.execute = function() {
    	this.getMemberConfigItem();
    };
    
    this.saveConfigItem=function(valid){
        this.sumbmited=true;
        if(valid) {
        var url=ApiDefines.FINANCE_CINFIG_ITEM_SAVE;
        var param=this.queryModel;
        apiService.post(url, param).then(function(results) {
           
            if(results.code==1){
                this.popAlert(results.message,"success");
                 
               
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));
        }
    };
    

};

ConfigItemContext.extend(ContextSupport);