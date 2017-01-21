'use strict';

function CreateConfigContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    this.pageIndex=PageConfig.INIT_PAGE_INDEX;
    this.pageSize=PageConfig.INIT_PAGE_SIZE;


    this.execute = function() {
    };
    
   
    this.addConfig=function(){
    	var url=ApiDefines.SYSTEM_CONFIG_CREATE;
      	
      	this.queryModel.entityDTO.typeCode="SYSTEM";
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

CreateConfigContext.extend(ContextSupport);
