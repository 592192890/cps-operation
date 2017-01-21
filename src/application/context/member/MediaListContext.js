'use strict';

function MediaListContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

     this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
     this.pageIndex = PageConfig.INIT_PAGE_INDEX;
    
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
            if(results.code==1){
                 dfd.resolve(results.data);
            }else{
                var error=results.message;
                dfd.reject(error);
            }
        }.bind(this));

        return dfd;
    }.bind(this);
	
    this.getWebsiteType = function() {
        this.websiteTypeArr = webStorageCache.get(DropDownListDefines.SITE_TYPE);
        if(!this.websiteTypeResult){
            this.getDictionarys(DropDownListDefines.SITE_TYPE).then(function(results){
                this.websiteTypeArr=results;
                webStorageCache.set(DropDownListDefines.SITE_TYPE,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getMediaStatus = function() {
        this.mediaStatusArr = webStorageCache.get(DropDownListDefines.MEDIA_STATUS);
        if(!this.mediaStatusResult){
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

    this.getMediaType = function() {
        this.mediaTypeArr = webStorageCache.get(DropDownListDefines.MEDIA_TYPE);
        if(!this.mediaTypeResult){
            this.getDictionarys(DropDownListDefines.MEDIA_TYPE).then(function(results){
                this.mediaTypeArr=results;
                webStorageCache.set(DropDownListDefines.MEDIA_TYPE,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);

    this.getIsUse = function() {
        this.isUseArr = webStorageCache.get(DropDownListDefines.MEDIA_USE_STATUS);
        if(!this.isUseResult){
            this.getDictionarys(DropDownListDefines.MEDIA_USE_STATUS).then(function(results){
                this.isUseArr=results;
                webStorageCache.set(DropDownListDefines.MEDIA_USE_STATUS,
                            results, {
                                exp : Constants.EXP_TIME
                            });
            }.bind(this),function(error){
                this.popAlert(error,"error");
            }.bind(this));
        }
        
    }.bind(this);


    this.queryModel = {entityDTO:{}};
    
    this.pageUtil={
        pageDTO:{
            "pageSize": PageConfig.INIT_PAGE_SIZE,
            "pageNo": PageConfig.INIT_PAGE_INDEX
        }
    };
    
    this.orderUtil = {
        "orderDTOs": [
            {
                "propertyName": "createDate",
                "type": "desc"
            }
        ]
            
        };

    this.execute = function() {
        
        this.getWebsiteType();
        this.getMediaStatus();
        this.getMediaType();
        this.getIsUse();
    };
    
    this.viewMediaInfo = function (row) {

    	$state.go('main.mediaInfo',{"data":{"mediaInfo":row,"websiteTypeArr":this.websiteTypeArr,"mediaStatusArr":this.mediaStatusArr,"mediaTypeArr":this.mediaTypeArr,"isUseArr":this.isUseArr}});

        var mediaInfo =  {
                name: '媒体管理',
                sref: 'main.mediaPromotion'
            };
        this.doActiveMenu(mediaInfo);
    };

   
    //search medial
    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);

        var url=ApiDefines.MEDIA_LIST;
      
        var param=angular.extend({
                    pageDTO : {
                        pageSize :this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : this.orderUtil.orderDTOs
                }, this.queryModel);
        //set date's formate
    	if(param.entityDTO.endCreateDate!=undefined){
            param.entityDTO.endCreateDate=param.entityDTO.endCreateDate+" 23:59:00";
        }
        if(param.entityDTO.startCreateDate!=undefined){
            param.entityDTO.startCreateDate=param.entityDTO.startCreateDate+" 00:00:00";
        }
        apiService.post(url, param).then(function(results) {
            //recovery date's formate
            if(param.entityDTO.endCreateDate!=undefined){
                param.entityDTO.endCreateDate=param.entityDTO.endCreateDate.split(" ")[0];
            }
            if(param.entityDTO.startCreateDate!=undefined){
                param.entityDTO.startCreateDate=param.entityDTO.startCreateDate.split(" ")[0];
            }
           
            if(results.code==1){
                 this.searchedMediasList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
                
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.addBlackListConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //add black list
    this.addBlackList=function(mediaId){
          this.addBlackListConfirm.opened = true;
          // 确认回调
          this.addBlackListConfirm.ok = function() {
                var url=ApiDefines.ADD_BLACK_LIST;
      
                var param={
                    "entityDTO":{
                            "mediaId": mediaId
                   }
                };

                apiService.post(url, param).then(function(results) {
                   
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert('设置黑名单成功',"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                        
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);

        
    }.bind(this);


    this.repleaseBlackListConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //release black list
    this.repleaseBlackList=function(mediaId){
        this.repleaseBlackListConfirm.opened = true;
          // 确认回调
          this.repleaseBlackListConfirm.ok = function() {
                var url=ApiDefines.RELEASE_BLACK_LIST;
      
                var param={
                    "entityDTO":{
                            "mediaId": mediaId
                   }
                };

                apiService.post(url, param).then(function(results) {
              
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                        this.popAlert('解除黑名单成功',"success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);


        
    }.bind(this);

    this.freezeConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //freeze
    this.freeze=function(mediaId){
          this.freezeConfirm.opened = true;
          // 确认回调
          this.freezeConfirm.ok = function() {
                var url=ApiDefines.FEEZE;
      
                var param={
                    "entityDTO":{
                            "mediaId": mediaId
                   }
                };

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

     this.unFreezeConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //unfreeze
    this.unFreeze=function(mediaId){
        this.unFreezeConfirm.opened = true;
          // 确认回调
          this.unFreezeConfirm.ok = function() {
                var url=ApiDefines.UNFEEZE;
      
                var param={
                    "entityDTO":{
                            "mediaId": mediaId
                   }
                };

                apiService.post(url, param).then(function(results) {
                  
                    if(results.code==1){
                        this.doPagingSearch(this.pageIndex);
                         this.popAlert("已经解冻！","success");
                    }else if(results.code==0){
                        this.popAlert(results.message,"error");
                    }else{
                        this.popAlert(results.message,"error");
                    }
                    
                }.bind(this));
          }.bind(this);


        
    }.bind(this);

    this.recoverAuditConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //recover Audit
    this.recoverAudit=function(mediaId){
          this.recoverAuditConfirm.opened = true;
          // 确认回调
          this.recoverAuditConfirm.ok = function() {
                var url=ApiDefines.RECOVER_AUDIT;
      
                var param={
                    "entityDTO":{
                            "mediaId": mediaId
                   }
                };

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

    this.checkedRows = [];

     this.checkAllRows = function(){
        if(this.checkedRows.length == this.searchedMediasList.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.searchedMediasList);
        }
    }.bind(this);
    
    this.checkRow = function(row){
        var index = this.checkedRows.indexOf(row);
        if(index != -1){
            this.checkedRows.splice(index,1);
        } else {
            this.checkedRows.push(row.mediaId);
        }
    };

    //reset 
    // this.doResetMediaAudit=function(){
    //     this.queryModel = {entityDTO:{}};
    // };

    //reset 
    this.doResetMedia=function(){
        this.queryModel = {entityDTO:{}};
    	//this.queryModel.entityDTO=null;
    	//this.query.entityDTO=null;
    };
}

MediaListContext.extend(ContextSupport);
