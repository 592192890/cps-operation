'use strict';

function MediaBlackListContext($state,$cookieStore,$timeout, apiService) {
    
    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
    this.pageIndex=PageConfig.INIT_PAGE_INDEX;

    //black_media.html
    this.websiteDomain="";

    this.execute = function() {
    };
    
    this.createBlackMedia = function () {
    	$state.go('main.blackMedia');
        var blackMediaInfo =  {
                name: '媒体管理',
                sref: 'main.mediaPromotion'
            };
        this.doActiveMenu(blackMediaInfo);
    }

    //add black list manual
    this.addBlackListManual=function(){
        var url=ApiDefines.ADD_BLACK_LIST_MANUAL;
      
        var param={
            "entityDTO":{
                    "websiteDomain": this.websiteDomain
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
            
        }.bind(this),function(err){
            this.popAlert(err.statusText,"error");
        	
        });
    }.bind(this);

    this.releaseConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    //release black list
    this.repleaseBlackList=function(mediaId){

          this.releaseConfirm.opened = true;
          // 确认回调
          this.releaseConfirm.ok = function() {
                var url=ApiDefines.RELEASE_BLACK_LIST;
          
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
                    
                }.bind(this),function(err){
                    this.popAlert(err,"error");
                });
          }.bind(this);

        
    }.bind(this);

    //search medial
    this.doPagingSearch=function(index,pageSize){
    	(typeof index != 'undefined') && (this.pageIndex = index);
        (typeof pageSize != 'undefined') && (this.pageSize = pageSize);
        var url=ApiDefines.BLACK_LIST;
      
        var param=angular.extend({
                    pageDTO : {
                        pageSize : this.pageSize,
                        pageNo : this.pageIndex
                    },
                    orderDTOs : []
                }, this.queryModel);
    	
        apiService.post(url, param).then(function(results) {
           
            if(results.code==1){
                 this.searchedBlackList=results.data.records;
                 this.totalPages=results.data.pageDTO.totalCount;
                //  this.pageIndex=results.data.pageDTO.pageNo;
               
            }else if(results.code==0){
                this.popAlert(results.message,"error");
            }else{
                this.popAlert(results.message,"error");
            }
            
        }.bind(this));

        
    }.bind(this);

    this.goBack=function(){
        $state.go("main.mediaBlackList");
    };
    this.cancel=function(){
        $state.go("main.mediaBlackList");
    };
    this.resetBlackList=function(){
        this.queryModel = {entityDTO:{}};
    }
}

MediaBlackListContext.extend(ContextSupport);
