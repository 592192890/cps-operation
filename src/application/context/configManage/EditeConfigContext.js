'use strict';

function EditeConfigContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    this.pageIndex=PageConfig.INIT_PAGE_INDEX;
    this.pageSize=PageConfig.INIT_PAGE_SIZE;


    this.execute = function() {
    	 if($stateParams.data) {
            webStorageCache.set('configInfo',$stateParams.data.configInfo ,{exp:86400});

           
            
        }
        this.queryModel.entityDTO=webStorageCache.get("configInfo");
        
        
    };
    
   
    this.editeConfig=function(){
    	var url=ApiDefines.SYSTEM_CONFIG_EDITE;
      	
      	
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
    }.bind(this);

    this.back=function(){
    	$state.go("main.configManagement");
    }

}

EditeConfigContext.extend(ContextSupport);
