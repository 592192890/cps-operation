'use strict';

function PromotionEffectReportContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.displayMethod = 1;
    
    this.mediaTypeDropListResult = {};
    
    this.memberTypeDropListResult ={};
    
    this.dropDownCodeListResult= {};
    
    this.getMediaType = function () {
    	this.mediaTypeDropListResult = webStorageCache.get(DropDownListDefines.MEDIA_TYPE);
		if (!this.mediaTypeDropListResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.MEDIA_TYPE);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.mediaTypeDropListResult = result.data;
					 webStorageCache.set(DropDownListDefines.MEDIA_TYPE, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
     
     this.getMemberType = function () {
     	this.memberTypeDropListResult = webStorageCache.get(DropDownListDefines.MEMBER_TYPE);
 		if (!this.memberTypeDropListResult) {
 			 var promise = apiService.getDropDownList(DropDownListDefines.MEMBER_TYPE);
 			 promise.then(function(result) {
 				 if ('1' == result.code) {
 					 this.memberTypeDropListResult = result.data;
 					 webStorageCache.set(DropDownListDefines.MEMBER_TYPE, result.data ,{exp : Constants.EXP_TIME });
 				 }
 			 }.bind(this));
 	   }
      }.bind(this);
      
      this.getProductType = function () {
    	  
      }.bind(this);
      
      this.getCodeDropList = function () {
      	this.dropDownCodeListResult = webStorageCache.get(DropDownListDefines.DROP_DOWN_CODE);
  		if (!this.dropDownCodeListResult) {
  			 var promise = apiService.getDropDownList(DropDownListDefines.DROP_DOWN_CODE);
  			 promise.then(function(result) {
  				 if ('1' == result.code) {
  					 this.dropDownCodeListResult = result.data;
  					 webStorageCache.set(DropDownListDefines.DROP_DOWN_CODE, result.data ,{exp : Constants.EXP_TIME });
  				 }
  			 }.bind(this));
  	   }
       }.bind(this);

	this.reset = function () {
		this.queryModel = {entityDTO:{}};
		this.queryModel.entityDTO.dropDownCode ="1";
	};
	this.getProductType = function() {
        var url=ApiDefines.CPS_TYPE_LIST;
        var param={
            entityDTO:{},
            pageDTO : {
                        pageSize : PageConfig.INIT_PAGE_SIZE,
                        pageNo : PageConfig.INIT_PAGE_INDEX
                    },
            orderDTOs : [ ]
        };
        apiService.post(url, param).then(function(results){
        	if(results.code==1){
        		this.productTypeDropListResult=results.data.records;
        	}else{
        		this.popAlert(results.message,"error");
        	}
            
        }.bind(this));
        
        
    }.bind(this);
    this.execute = function() {
    	   this.getMediaType();
    	   this.getMemberType();
    	   this.getProductType(); 
    	   this.getCodeDropList();
    	   this.queryModel.entityDTO.dropDownCode ="1";

    	   this.getProductType();
    };
    

	this.doPagingSearch = function(index,pageSize) {
			(typeof index != 'undefined') && (this.pageIndex = index);
			(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
			var url = "";
			if (this.displayMethod == 1) {
				url = ApiDefines.CHANNEL_MARKET_EFFECT_TIME_VIEW;
			}else {
				url = ApiDefines.CHANNEL_MARKET_EFFECT_MEDIA_VIEW;
			}
			var promise = apiService.post(url, angular
					.extend({
						pageDTO : {
							pageSize : this.pageSize,
							pageNo : this.pageIndex
						},
						orderDTOs : [ ]
					}, this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.queryResult = result.data.records;
					this.totalPages = result.data.pageDTO.totalCount;
					
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
		}.bind(this);
    
	this.reportExport = function () {
		var url = ""
			if ( this.displayMethod == 1) {
				url = ApiDefines.CHANNEL_MARKET_EFFECT_TIME_VIEW_EXPORT;
			}else {
				url = ApiDefines.CHANNEL_MARKET_EFFECT_MEDIA_VIEW_EXPORT;
			}
			var promise = apiService.post(url, angular
					.extend(this.queryModel));
			promise.then(function(result) {
				if ('1' == result.code) {
					window.open(webStorageCache.get(Constants.FILE_SERVER_PATH) + ApiDefines.FILE_DOWN + '?downFileName=' + result.data.downFileName);
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
		}.bind(this);

}

PromotionEffectReportContext.extend(ContextSupport);
