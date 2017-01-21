'use strict';

function EditTemplateContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    this.error_message = 0;
    this.execute = function() {
    	if($stateParams.data) {
            webStorageCache.set('tempInfo',$stateParams.data.tempInfo ,{exp:86400});

         
            
        }
        this.tempInfo=webStorageCache.get("tempInfo");
        
       
    };
    
   

   
    this.editTemplateInstance=function(tempInfo,valid){
        this.sumbmited=true;
        if(tempInfo.content == "" || tempInfo.content == null||tempInfo.content == undefined){
            
            this.error_message = 1;
            
            return;
        }
        if(valid){
            this.error_message = 0;
            var url=ApiDefines.TEMPLATE_EDIT;
      
            var param={
                       "entityDTO": {
                            "templateId":tempInfo.templateId,
                            "placeholder":tempInfo.placeholder,
                            "placeholderDesc":tempInfo.placeholderDesc,
                            "content":tempInfo.content
                        }
                    };
            apiService.post(url, param).then(function(results) {
               
              
                if(results.code==1){
                    this.popAlert("保存成功","success");
                    $state.go('main.allTemplate');
                }else if(results.code==0){
                    this.popAlert(results.message,"error");
                }else{
                    this.popAlert(results.message,"error");
                }
                
            }.bind(this));
        }
        
    }.bind(this);

    this.back=function(){
        $state.go("main.templateList");
    }
}

EditTemplateContext.extend(ContextSupport);

