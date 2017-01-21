'use strict';

function CPSTypeListContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    
    this.activityStatusDropListResult= {};

    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;

    this.execute = function() {
    };
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.CPS_TYPE_LIST, angular
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
    
    this.goCPSTypeAdd = function () {
    	$state.go('main.cpsTypeAdd');
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    };
    
    this.updateSelectedCPSType = function (raw) {
    	$state.go('main.cpsTypeUpdate',{"data":{"cpstypeId":raw.cpstypeId,"cpstypeName":raw.cpstypeName}});
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo);
    };
    
    
    this.detailSelectedCPSType = function (raw) {
    	$state.go('main.cpsTypeDetail',{"data":{"cpstypeId":raw.cpstypeId,"cpstypeName":raw.cpstypeName}});
        var encourageManageInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(encourageManageInfo,{"data":{"cpstypeId":raw.cpstypeId,"cpstypeName":raw.cpstypeName}});
    };
    
    this.delConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.deleteSelectedCPSType = function (id) {
    	
    	  this.delConfirm.opened = true;
          // 确认回调
          this.delConfirm.ok = function() {
        	  this.queryModel.entityDTO.cpstypeId = id;
        		var promise = apiService.post(ApiDefines.CPS_TYPE_DELETE,
        				angular.extend( this.queryModel ));
        		promise.then(function(result) {
        			if ('1' == result.code) {
        				this.doPagingSearch(1);
        				 this.popAlert("删除成功", 'success');
        			} else {
        				// .....
        				this.popAlert(result.message, 'error');
        			}
        		}.bind(this));
          }.bind(this);
    };
    

}

CPSTypeListContext.extend(ContextSupport);
