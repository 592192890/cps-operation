'use strict';

function MediaAuditInfoContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.hidden = false;

    this.pageSize = PageConfig.INIT_PAGE_SIZE;

    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.auditInfo={};

    //get Dictionary by type
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

    this.getNoPassAuditReason = function() {
            this.getDictionarys(DropDownListDefines.MEDIA_APPROVE_REMARK).then(function(results){
                this.noPassAuditReasonArr=results;
                 webStorageCache.set('noPassAuditReasonArr',this.noPassAuditReasonArr ,{exp:86400});
                
                webStorageCache.set(DropDownListDefines.MEDIA_APPROVE_REMARK,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this));
    }.bind(this);

    this.execute = function() {

        this.getNoPassAuditReason();

        if($stateParams.data) {
          webStorageCache.set('mediaAuditInfo',$stateParams.data.mediaAuditInfo ,{exp:86400});

          webStorageCache.set('websiteTypeArr',$stateParams.data.websiteTypeArr ,{exp:86400});
          webStorageCache.set('mediaStatusArr',$stateParams.data.mediaStatusArr ,{exp:86400});
          webStorageCache.set('mediaTypeArr',$stateParams.data.mediaTypeArr ,{exp:86400});
          webStorageCache.set('isUseArr',$stateParams.data.isUseArr ,{exp:86400});
        }
          
        this.auditInfo =webStorageCache.get('mediaAuditInfo');

        this.memberId =this.auditInfo.memberId;

        this.websiteTypeArr =webStorageCache.get('websiteTypeArr');
        this.mediaStatusArr =webStorageCache.get('mediaStatusArr');
        this.mediaTypeArr =webStorageCache.get('mediaTypeArr');
        this.isUseArr =webStorageCache.get('isUseArr');

        this.getMediaDetail();
    };

    this.getMediaDetail = function() {

        var promise = apiService.post(ApiDefines.MEDIA_DETAIL, angular
            .extend({entityDTO: {mediaId: this.auditInfo.mediaId}}));
        promise.then(function(result) {
            if ('1' == result.code) {
                this.auditInfo = result.data;
            }
        }.bind(this));
    }.bind(this);

    this.doPagingSearch=function(index,pageSize){
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);
        
        var url=ApiDefines.MEDIA_AUDIT_DETAIL;
      
        var param={
                    "entityDTO": {
                    "businessId":this.auditInfo.mediaId
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
                 this.searchedMediasAuditList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
                 //this.totalCount=results.data.pageDTO.totalCount;
                 
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
                
            }
            
        }.bind(this));

        
    }.bind(this);


    this.auditPass=function(auditInfo){
        var mediaId=auditInfo.mediaId;

        var url=ApiDefines.AUDIT_PASS_OR_NOPASS;
      
        var param={
            "entityDTO": {
                "businessId": mediaId,
                "result":1
             }

        };
        
        apiService.post(url, param).then(function(results) {
          
            if(results.code==1){
                 this.popAlert("审核通过成功","success");
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));
    };

    this.noPassReason = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    this.auditNoPass=function(auditInfo){

        this.noPassReason.opened = true;
          // 确认回调
          this.noPassReason.ok = function(content) {
                var mediaId=auditInfo.mediaId;

                var url=ApiDefines.AUDIT_PASS_OR_NOPASS;
              
                var param={
                    "entityDTO": {
                        "businessId": mediaId,
                    "result":0,
                    "remark": content
                    }

                };
                
                apiService.post(url, param).then(function(results) {
                  
                    if(results.code==1){
                         this.popAlert("审核不通过成功","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);

    };
    this.goBack=function(){
        $state.go("main.mediaAudit");
    }

}

MediaAuditInfoContext.extend(ContextSupport);
