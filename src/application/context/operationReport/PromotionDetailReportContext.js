'use strict';

function PromotionDetailReportContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.orderStatusResult = {};
	
	this.payStatusResult = {};
	
	this.settlementStatusResult = {};
	
	this.doPagingSearch = function(index,pageSize) {
			(typeof index != 'undefined') && (this.pageIndex = index);
			(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
			var promise = apiService.post(ApiDefines.CHANNEL_MARKET_DETAILS, angular
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
		var promise = apiService.post(ApiDefines.CHANNEL_MARKET_DETAILS_EXPORT, angular
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

	this.reset =function () {
		 this.queryModel = {entityDTO:{}};
	};
	
	this.getOrderStatus = function() {
		this.orderStatusResult = webStorageCache.get(DropDownListDefines.ORDER_STATUS);
		if (!this.orderStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ORDER_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.orderStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.ORDER_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getPayStatus = function() {
		this.payStatusResult = webStorageCache.get(DropDownListDefines.ORDER_PAY_STATUS);
		if (!this.payStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ORDER_PAY_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.payStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.ORDER_PAY_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getSettlementStatus = function() {
		this.settlementStatusResult = webStorageCache.get(DropDownListDefines.ORDER_SETTLEMENT_STATUS);
		if (!this.settlementStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ORDER_SETTLEMENT_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.settlementStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.ORDER_SETTLEMENT_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	
	
    
    this.getEncourageTypeDropList = function () {
    	this.encourageTypeDropListResult = webStorageCache.get(DropDownListDefines.ENCOURAGE_TYPE);
		if (!this.encourageTypeDropListResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ENCOURAGE_TYPE);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.encourageTypeDropListResult = result.data;
					 webStorageCache.set(DropDownListDefines.ENCOURAGE_TYPE, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);


    this.getCategory = function() {
        // this.categoryArr = webStorageCache.get(DropDownListDefines.ENCOURAGE_TYPE);
        // if(!this.categoryArr){
        //     this.getDictionarys(DropDownListDefines.ENCOURAGE_TYPE).then(function(results){
        //         this.categoryArr=results;
        //         webStorageCache.set(DropDownListDefines.ENCOURAGE_TYPE,
        //                     results, {
        //                         exp : Constants.EXP_TIME
        //                     });
        //     }.bind(this));
        // }

        var url=ApiDefines.CPS_TYPE_LIST;
        var param={
            entityDTO:{},
            pageDTO : {
                        pageSize : this.pageSize,
                        pageNo : this.pageIndex
                    },
            orderDTOs : [ ]
        };
        apiService.post(url, param).then(function(results){
            this.categoryArr=results.data.records;
        }.bind(this));
        
        
    }.bind(this);

    this.execute = function() {
        this.getEncourageTypeDropList();
        
        this.getOrderStatus();
        
        this.getPayStatus();
        
        this.getSettlementStatus();

        this.getCategory();
    };
    

}

PromotionDetailReportContext.extend(ContextSupport);
