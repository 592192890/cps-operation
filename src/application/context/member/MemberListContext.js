'use strict';

function MemberListContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryMemberListResult = {};
	
	this.memberTypeResult = {};
	
	this.accountTypeResult = {};
	
	this.memberApproveStatusResult = {};
	
	this.accountStatusResult = {};
	
	this.memberApproveTypeResult = {};
    
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};


    this.execute = function() {
    	
    	this.getMemberType();
    	
    	this.getAccountType();
    	
    	this.getMemberApproveStatus();
    	
    	this.getAccountStatus();
    	
    	this.getMemberApproveType();

    };
    
    this.viewMemberInfo = function (raw) {
    	$state.go('main.memberDetail',{"data":{"memberId":raw.memberId,"approveType":raw.approveType}});

        var memberManageInfo =  {
                name: '会员管理',
                sref: 'main.promotionActive'
            };
            this.doActiveMenu(memberManageInfo);

    }
    
    this.doPagingSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		var promise = apiService.post(ApiDefines.MEMBER_LIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryMemberListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
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
	
	this.getMemberApproveStatus = function() {
		this.memberApproveStatusResult = webStorageCache.get(DropDownListDefines.MEMBER_APPROVE_STATUS);
		if (!this.memberApproveStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MEMBER_APPROVE_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberApproveStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.MEMBER_APPROVE_STATUS,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getAccountStatus = function() {
		this.accountStatusResult = webStorageCache.get(DropDownListDefines.ACCOUNT_STATUS);
		if (!this.accountStatusResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.ACCOUNT_STATUS);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.accountStatusResult = result.data;
					webStorageCache.set(DropDownListDefines.ACCOUNT_STATUS,
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
	
    this.reset =function () {
      	 this.queryModel = {entityDTO:{}};
      };
      
      this.setBlacklistConfirm = {
              opened: false,
              ok: undefined,
              cancel: undefined
      };
      
      
  	
  	this.setBlacklist = function(memberId) {
  		this.setBlacklistConfirm.opened = true;
          // 确认回调
          this.setBlacklistConfirm.ok = function() {
  		this.queryModel.entityDTO.memberId = memberId;
  		var promise = apiService.post(ApiDefines.SET_BLACK_LIST, angular
  				.extend(this.queryModel));
  		promise.then(function(result) {
  			if ('1' == result.code) {
  				this.popAlert("设置黑名单成功", 'success');
                  this.doPagingSearch();
  			} else {
  				// .....
  				this.popAlert(result.message, 'error');
  			}
  		}.bind(this));
  	}.bind(this);
  	}
  	
    this.removeBlacklistConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	
	this.removeBlacklist = function(memberId) {
		this.removeBlacklistConfirm.opened = true;
        // 确认回调
        this.removeBlacklistConfirm.ok = function() {
		this.queryModel.entityDTO.memberId = memberId;
		var promise = apiService.post(ApiDefines.REMOVE_BLACK_LIST, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("解除黑名单成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
	
    this.freezeConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	
	this.freeze = function(memberId) {
		this.freezeConfirm.opened = true;
        // 确认回调
        this.freezeConfirm.ok = function() {
		this.queryModel.entityDTO.memberId = memberId;
		var promise = apiService.post(ApiDefines.FREEZE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("冻结成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
	
    this.unfreezeConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	
	this.unfreeze = function(memberId) {
		this.unfreezeConfirm.opened = true;
        // 确认回调
        this.unfreezeConfirm.ok = function() {
		this.queryModel.entityDTO.memberId = memberId;
		var promise = apiService.post(ApiDefines.UN_FREEZE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("解冻成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
	
    this.recoverApproveConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    
	
	this.recoverApprove = function(memberId) {
		this.recoverApproveConfirm.opened = true;
        // 确认回调
        this.recoverApproveConfirm.ok = function() {
		this.queryModel.entityDTO.memberId = memberId;
		var promise = apiService.post(ApiDefines.RECOVER_APPROVE, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("恢复审核成功", 'success');
                this.doPagingSearch();
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	}
	
	

}

MemberListContext.extend(ContextSupport);
