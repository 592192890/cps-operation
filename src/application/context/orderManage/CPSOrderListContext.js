'use strict';

function CPSOrderListContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.orderStatusDropList = {};
	
	this.orderObtanWayDropList = {};
	
	this.orderPayStatusDropList = {};
	
	this.reset =function () {
		  this.queryModel = {entityDTO:{}};
	};
	
	this.getOrderStatusDropList = function () {
		this.orderStatusDropList = webStorageCache.get(DropDownListDefines.ORDER_STATUS);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ORDER_STATUS);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.orderStatusDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ORDER_STATUS, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);

	this.getOrderObtanWayDropList = function () {
		this.orderObtanWayDropList = webStorageCache.get(DropDownListDefines.ORDER_OBTAN_WAY);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ORDER_OBTAN_WAY);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.orderObtanWayDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ORDER_OBTAN_WAY, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);
	
	this.getOrderPayStatusDropList = function () {
		this.orderPayStatusDropList = webStorageCache.get(DropDownListDefines.ORDER_PAY_STATUS);
		if (!this.mediaTypeResult) {
			 var promise = apiService.getDropDownList(DropDownListDefines.ORDER_PAY_STATUS);
			 promise.then(function(result) {
				 if ('1' == result.code) {
					 this.orderPayStatusDropList = result.data;
					 webStorageCache.set(DropDownListDefines.ORDER_PAY_STATUS, result.data ,{exp : Constants.EXP_TIME });
				 }
			 }.bind(this));
	   }
     }.bind(this);

    this.execute = function() {
    	this.getOrderStatusDropList();
    	this.getOrderObtanWayDropList();
    	this.getOrderPayStatusDropList();
    };
    
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_ORDER_LIST, angular
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

}

CPSOrderListContext.extend(ContextSupport);
