'use strict';

function MediaAuditContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;

    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.queryModel = {entityDTO:{}};

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


    this.execute = function() {
        this.getWebsiteType();
        this.getMediaStatus();
        this.getMediaType();
        this.getIsUse();
    };
    
    this.viewMediaAuditInfo = function (mediaAudit) {
    	$state.go('main.mediaAuditInfo',{"data":{"mediaAuditInfo":mediaAudit,"websiteTypeArr":this.websiteTypeArr,"mediaStatusArr":this.mediaStatusArr,"mediaTypeArr":this.mediaTypeArr,"isUseArr":this.isUseArr}});
        var mediaAduditInfo =  {
                name: '媒体管理',
                sref: 'main.mediaPromotion'
            };
        this.doActiveMenu(mediaAduditInfo);
    }

    //search medial audit
    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);
        
    	var url=ApiDefines.MEDIA_AUDIT_LIST;
      
       var param=angular.extend({
                    pageDTO : {
                        pageSize : this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : []
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
                 this.searchedMediasAuditList=results.data.records;
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
        if(this.checkedRows.length == this.searchedMediasAuditList.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.searchedMediasAuditList);
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
    this.doResetMediaAudit=function(){
    	this.queryModel = {entityDTO:{}};
    };
}

MediaAuditContext.extend(ContextSupport);
