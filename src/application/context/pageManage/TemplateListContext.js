'use strict';

function TemplateListContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    this.error_message = 0;
    this.execute = function() {
    };
    
    this.addTemplate = function () {
    	$state.go('main.addTemplate');
        var templateInfo =  {
                name: '模板管理',
                sref: 'main.templateList'
            };
        this.doActiveMenu(templateInfo);

    };
    this.goAllTemplate = function () {
    	$state.go('main.allTemplate');
        var templateInfo =  {
                name: '模板管理',
                sref: 'main.templateList'
            };
        this.doActiveMenu(templateInfo);
    };
    this.goSystemTemplate = function () {
    	$state.go('main.systemTemplate');
        var templateInfo =  {
                name: '模板管理',
                sref: 'main.templateList'
            };
        this.doActiveMenu(templateInfo);
    };
    this.goUserTemplate = function () {
    	$state.go('main.userTemplate');
        var templateInfo =  {
                name: '模板管理',
                sref: 'main.templateList'
            };
        this.doActiveMenu(templateInfo);
    };

    this.editTemplate = function (temp) {
        $state.go('main.editTemplate',{"data":{"tempInfo":temp}});
        var templateInfo =  {
                name: '模板管理',
                sref: 'main.templateList'
            };
        this.doActiveMenu(templateInfo);
    };

     this.deleteTemplateConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.deleteTemplate=function(temp){
        this.deleteTemplateConfirm.opened = true;
          // 确认回调
          this.deleteTemplateConfirm.ok = function() {
                var url=ApiDefines.TEMPLATE_DELETE;
      
                var param={
                           "entityDTO": {
                                "templateId":temp.templateId
                            
                            }
                        }



                
                apiService.post(url, param).then(function(results) {
                   
                   
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert(results.message,"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);
    }.bind(this);

    this.doPagingSearch=function(index,pageSize){
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.TEMPLATE_QUERY;
      
        var param={
                    "entityDTO": {
                      
                    },
                    "pageDTO": {
                        "pageSize": this.pageSize,
                        "pageNo":this.pageIndex
                    }
                }


        
        apiService.post(url, param).then(function(results) {
           
           
            if(results.code==1){
                 this.searchedTemplateList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                 this.pageIndex=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.doPagingSearchSystem=function(index,pageSize){
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.TEMPLATE_QUERY;
      
        var param={
                    "entityDTO": {
                      type:0
                    },
                    "pageDTO": {
                        "pageSize": this.pageSize,
                        "pageNo":this.pageIndex
                    }
                }


        
        apiService.post(url, param).then(function(results) {
           
          
            if(results.code==1){
                 this.searchedSystemTemplateList=results.data.records;
                 this.totalPagesSystem=results.data.pageDTO.totalCount;
                 this.pageIndexSystem=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.doPagingSearchUser=function(index,pageSize){
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.TEMPLATE_QUERY;
      
        var param={
                    "entityDTO": {
                      type:1
                    },
                    "pageDTO": {
                        "pageSize": this.pageSize,
                        "pageNo":this.pageIndex
                    }
                }


        
        apiService.post(url, param).then(function(results) {
           
           
            if(results.code==1){
                 this.searchedUserTemplateList=results.data.records;
                 this.totalPagesUser=results.data.pageDTO.totalCount;
                 this.pageIndexUser=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);


    this.addTemplateInstance=function(valid){
        this.sumbmited=true;
        if(this.queryModel.entityDTO.content == "" || this.queryModel.entityDTO.content == undefined || this.queryModel.entityDTO.content ==null){
            
            this.error_message = 1;
            
            return;
        }
        if(valid){
            this.error_message = 0;
            var url=ApiDefines.TEMPLATE_ADD;
      
            var param=this.queryModel;


            
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

TemplateListContext.extend(ContextSupport);

