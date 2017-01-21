'use strict';

function MemberAuditContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.queryMemberAuditListResult = {};
    
    this.accountTypeResult = {};
    
    this.memberTypeResult = {};
    
    this.memberApproveTypeResult = {};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.query = {entityDTO:{}};
    
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "up_regist_date",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};


    this.execute = function() {
    	
    	this.getAccountType();
    	
    	this.getMemberType();
    	
    	this.getMemberApproveType();
    	
    	this.queryModel.entityDTO.accountType = "0";
    	
    	this.queryModel.entityDTO.approveType = "0";
    	
    	this.roleCode = UserUtil.getUserRole();
    	
    	
    };
    
    this.memberAudit = function (raw) {
    	
    	$state.go('main.memberAuditInfo',{"data":{"memberId":raw.memberId,"approveType":raw.approveType}});

        var memberManageInfo =  {
                name: '会员管理',
                sref: 'main.promotionActive'
            };
            this.doActiveMenu(memberManageInfo);
    	


    }
    
	this.getAccountType = function() {
		this.accountTypeResult = webStorageCache.get(DropDownListDefines.ACCOUNT_TYPE);
		if (!this.accountTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACCOUNT_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.accountTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.ACCOUNT_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMemberType = function() {
		this.memberTypeResult = webStorageCache.get(DropDownListDefines.MEMBER_TYPE);
		if (!this.memberTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MEMBER_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.MEMBER_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getMemberApproveType = function() {
		this.memberApproveTypeResult = webStorageCache.get(DropDownListDefines.MEMBER_APPROVE_TYPE);
		if (!this.memberApproveTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MEMBER_APPROVE_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberApproveTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.MEMBER_APPROVE_TYPE,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
    
    
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.MEMBER_AUDIT_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryMemberAuditListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	
	this.exportReport = function()  {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.EXPORT_MEMBER_BANK_INFO, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				
				window.open(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.FILE_DOWN + '?downFileName=' + result.data.downFileName);
				
			} else {
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	
	
	
    this.approveConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
	
	this.batchApprovePass = function() {
		
		
		
		if(this.checkedRows.length == 0){
			
			this.popAlert("请选择需要审核的会员", 'error');
			
			return;
		}
		
		this.approveConfirm.opened = true;
		
		this.msg = "你已选择" + this.checkedRows.length + "个会员，确定审核通过？";
		
		this.approveConfirm.ok = function() {
			this.query.entityDTO.memberIdList = this.checkedRows;
			var promise = apiService.post(ApiDefines.BATCH_APPROVE, angular
					.extend(this.query));
			promise.then(function(result) {
				if ('1' == result.code) {
					this.popAlert("批量审核操作已完成", 'success');
					
					this.doPagingSearch();
				}else{
					
					this.popAlert(result.message, 'error');
			
				}
			}.bind(this));
			


	}.bind(this);
	
	}
	

	
    this.checkedRows = [];
    

    
    this.checkAllRows = function(){
        if(this.checkedRows.length == this.queryMemberAuditListResult.length){
            this.checkedRows = [];
        } else {
        	for(var i = 0; i<this.queryMemberAuditListResult.length;i++){
        		if(this.checkedRows.indexOf(this.queryMemberAuditListResult[i].memberId) == -1){
        			
        			this.checkedRows.push(this.queryMemberAuditListResult[i].memberId);
        		}
        		
        	}
//              this.checkedRows = [].concat(this.queryMemberAuditListResult);
        }

    }.bind(this);
    

    
    this.checkRow = function(row){
        var index = this.checkedRows.indexOf(row);
        if(index != -1){
            this.checkedRows.splice(index,1);
        } else {
            this.checkedRows.push(row);
        }

    };
    
    this.reset =function () {
   	 this.queryModel = {entityDTO:{}};
   };

}

MemberAuditContext.extend(ContextSupport);
