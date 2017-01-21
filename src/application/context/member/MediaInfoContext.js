'use strict';

function MediaInfoContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.hidden = false;
    
    this.hidden_audit = false;

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    
    this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.pageIndex_promotion=PageConfig.INIT_PAGE_INDEX;

    this.pageIndex_audit=PageConfig.INIT_PAGE_INDEX;

    this.aduit_totalCount=0;
    
    this.mediaInfo={};
    
    this.mediaDetailResult = {};

    this.execute = function() {
    
        if($stateParams.data) {
            webStorageCache.set('mediaInfo',$stateParams.data.mediaInfo ,{exp:86400});

            webStorageCache.set('websiteTypeArr',$stateParams.data.websiteTypeArr ,{exp:86400});
            webStorageCache.set('mediaStatusArr',$stateParams.data.mediaStatusArr ,{exp:86400});
            webStorageCache.set('mediaTypeArr',$stateParams.data.mediaTypeArr ,{exp:86400});
            webStorageCache.set('isUseArr',$stateParams.data.isUseArr ,{exp:86400});
            
        }
        this.mediaInfo=webStorageCache.get("mediaInfo");
        
        this.queryModel.entityDTO.mediaId = this.mediaInfo.mediaId;
        
        this.websiteTypeArr=webStorageCache.get("websiteTypeArr");
        this.mediaStatusArr=webStorageCache.get("mediaStatusArr");
        this.mediaTypeArr=webStorageCache.get("mediaTypeArr");
        this.isUseArr=webStorageCache.get("isUseArr");
        
        this.getMediaDetail();
    };
    
	this.getMediaDetail = function() {

		var promise = apiService.post(ApiDefines.MEDIA_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.mediaDetailResult = result.data;
			}
		}.bind(this));
	}.bind(this);
    

    this.doPagingSearch_promotion=function(index,pageSize) {
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);
        var url=ApiDefines.PROMOTION_LIST;

        var param={
                    "entityDTO": {
                            "mediaId": this.mediaInfo.mediaId
                    },
                    "pageDTO": {
                        "pageSize": this.pageSize,
                        "pageNo": this.pageIndex
                    },
                    "orderDTOs": []
                };

        apiService.post(url, param).then(function(results) {
               
                if(results.code==1){
                    this.promotionList=results.data.records;
                    this.totalPages_promotion=results.data.pageDTO.totalCount;
                    // this.pageIndex_promotion=  results.data.pageDTO.pageNo;
                }else if(results.code==0){
                    this.popAlert(results.message,"error");
                }else{
                    this.popAlert(results.message,"error");
                }
                
            }.bind(this));
    }.bind(this);

    this.doPagingSearch_audit=function(index,pageSize){
        (typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);
        var url=ApiDefines.MEDIA_AUDIT_DETAIL;

        var param={
            "entityDTO": {
                "businessId":this.mediaInfo.mediaId
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
                    this.auditList=results.data.records;
                    //this.aduit_totalCount=results.data.pageDTO.totalCount;
                    this.totalPages_audit=results.data.pageDTO.totalCount;
                    // this.pageIndex_audit=  results.data.pageDTO.pageNo;
                    
                }else if(results.code==0){
                    this.popAlert(results.message,"error");
                }else{
                    this.popAlert(results.message,"error");
                }
                
            }.bind(this));
    }.bind(this);

    this.goBack=function(){
        $state.go("main.mediaList");
    }
}

MediaInfoContext.extend(ContextSupport);
