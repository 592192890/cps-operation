'use strict';

function MemberAuditInfoContext($state,$stateParams,$cookieStore,$timeout, apiService,webStorageCache,$modal) {

    this.queryModel = {entityDTO:{}};
    
    this.query = {entityDTO:{}};
    
    this.approveModel = {entityDTO:{}};
    
    this.viewModel = {entityDTO:{}};
    
    this.memberDetailResult = {};
    
    this.approve = {entityDTO:{}};
    
    this.hidden = false;
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryMemberAuditListResult = {};
	
	this.memberTypeResult = {};
	
	this.accountTypeResult = {};
	
	this.memberApproveStatusResult = {};
	
	this.accountStatusResult = {};
	
	this.memberApproveTypeResult = {};
	
	this.taxTypeResult = {};
	
	this.memberApproveRemarkResult = {};
	
	this.memberApproveResult = {};
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createTime",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};
    
    this.execute = function() {
    	
    	if($stateParams.data) {
			webStorageCache.set('memberId',$stateParams.data.memberId ,{exp:86400});
			webStorageCache.set('approveType',$stateParams.data.approveType ,{exp:86400});
		}
    	
		this.queryModel.entityDTO.memberId = webStorageCache.get('memberId');
		this.queryModel.entityDTO.approveType = webStorageCache.get('approveType');
		
		this.query.entityDTO.businessId = webStorageCache.get('memberId');
		
		this.approveModel.entityDTO.memberId = webStorageCache.get('memberId');
		
		this.getMemberDetail();
		
    	this.getMemberType();
    	
    	this.getAccountType();
    	
    	this.getMemberApproveStatus();
    	
    	this.getAccountStatus();
    	
    	this.getMemberApproveType();
		
        this.getTaxType();
        
        this.getMemberApproveRemark();
        
    	this.roleCode = UserUtil.getUserRole();
    	
    	this.getMemberApproveResult();
		
    	
    	
    };
    
	this.getMemberDetail = function() {

		var promise = apiService.post(ApiDefines.MEMBER_DETAIL, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.memberDetailResult = result.data;
				this.businessLicenseTemp = result.data.businessLicenseUrl;
				this.taxRegistrationTemp = result.data.taxRegistrationUrl;
				this.corporateIdentityCardTemp = result.data.corporateIdentityCardUrl;
				this.contactIdentityCardTemp = result.data.contactIdentityCardUrl;
				this.supplierBankConfirmTemp = result.data.supplierBankConfirmUrl;
				var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
						.extend({entityDTO:{"isTmpPic" : false,"picUrl":this.businessLicenseTemp}}));
				promise.then(function(result) {
					if ('1' == result.code) {
						this.picName = '企业营业执照副本复印件加盖公章';
						this.piccArray[0] = {picName:this.picName,src:result.data.pictureData,url:this.businessLicenseTemp};
					} else {
						this.popAlert(result.message, 'error');
					}
				}.bind(this));
				
			
				
				var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
						.extend({entityDTO:{"isTmpPic" : false,"picUrl":this.taxRegistrationTemp}}));
				promise.then(function(result) {
					if ('1' == result.code) {
						this.picName = '企业税务登记证副本复印件加盖公章';
						this.piccArray[1] = {picName:this.picName,src:result.data.pictureData,url:this.taxRegistrationTemp};
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this));
			
				var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
						.extend({entityDTO:{"isTmpPic" : false,"picUrl":this.corporateIdentityCardTemp}}));
				promise.then(function(result) {
					if ('1' == result.code) {
						this.picName = '企业法人身份证正反面复印件加盖公章';
						this.piccArray[2] = {picName:this.picName,src:result.data.pictureData,url:this.corporateIdentityCardTemp};
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this));
				
				var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
						.extend({entityDTO:{"isTmpPic" : false,"picUrl":this.contactIdentityCardTemp}}));
				promise.then(function(result) {
					if ('1' == result.code) {
						this.picName = '联系人身份证正反面复印件加盖公章';
						this.piccArray[3] = {picName:this.picName,src:result.data.pictureData,url:this.contactIdentityCardTemp};
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this));
			
				var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
						.extend({entityDTO:{"isTmpPic" : false,"picUrl":this.supplierBankConfirmTemp}}));
				promise.then(function(result) {
					if ('1' == result.code) {
						this.picName = '供应商银行信息确认函';
						this.piccArray[4] = {picName:this.picName,src:result.data.pictureData,url:this.supplierBankConfirmTemp};
					} else {
						// .....
						this.popAlert(result.message, 'error');
					}
				}.bind(this));
				var updateColumns=result.data.updateColumns;
				if(updateColumns!=undefined&&updateColumns.length>0){
					updateColumns.forEach(function(content,index){
						$("."+content).css("color","red");
					});
				}
			}
		}.bind(this));
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
	
	this.getTaxType = function() {
		this.taxTypeResult = webStorageCache.get(DropDownListDefines.TAX_TYPE);
		if (!this.taxTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.TAX_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.taxTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.TAX_TYPE,
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
	
	this.getMemberApproveResult = function() {
		this.memberApproveResult = webStorageCache.get(DropDownListDefines.APPROVE_RESULT);
		if (!this.memberApproveResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.APPROVE_RESULT);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberApproveResult = result.data;
					webStorageCache.set(DropDownListDefines.APPROVE_RESULT,
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
	
	this.getMemberApproveRemark = function() {
		this.memberApproveRemarkResult = webStorageCache.get(DropDownListDefines.MEMBER_APPROVE_REMARK);
		if (!this.memberApproveRemarkResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.MEMBER_APPROVE_REMARK);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.memberApproveRemarkResult = result.data;
					webStorageCache.set('memberApproveRemarkResult',this.memberApproveRemarkResult ,{exp:86400});
					webStorageCache.set(DropDownListDefines.MEMBER_APPROVE_REMARK,
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
		var promise = apiService.post(ApiDefines.MEMBER_AUDIT_INFO, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs : this.orderUtil.orderDTOs
				}, this.query));
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
	
    this.noPassReason = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.approveNotPass = function(approveType){

        this.noPassReason.opened = true;
          // 确认回调
          this.noPassReason.ok = function(content) {
        	  
      	  this.approveModel.entityDTO.approveResult = approveType;
      	  
      	  this.approveModel.entityDTO.failedReason = content;
      	  
    		var promise = apiService.post(ApiDefines.APPROVE_MEMBER_INFO, angular
    				.extend(this.approveModel));
                
      		promise.then(function(result) {
    			if ('1' == result.code) {
    				this.popAlert("审核操作已完成", 'success');
    				$state.go('main.memberAudit');
    			} else {
    				// .....
    				this.popAlert(result.message, 'error');
    			}
    		}.bind(this));
          }.bind(this);

    };
    
	this.approvePass = function(approveType) {
		
		this.approveModel.entityDTO.approveResult = approveType;
		
		var promise = apiService.post(ApiDefines.APPROVE_MEMBER_INFO, angular
				.extend(this.approveModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("审核操作已完成", 'success');
				$state.go('main.memberAudit');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
	
	  this.piccArray = new Array(5);
	
	this.preview = function(type) {
		
		if(type == "business_license") {
			this.viewModel.entityDTO = {
					"isTmpPic" : false,"picUrl":this.businessLicenseTemp
			};
			this.picName = '企业营业执照副本复印件加盖公章';
		} else if (type == "tax_registration") {
			this.viewModel.entityDTO = {
					"isTmpPic" : false,"picUrl":this.taxRegistrationTemp
			};
			this.picName = '企业税务登记证副本复印件加盖公章';
		} else if (type == "corporate_identity_card") {
			this.viewModel.entityDTO = {
					"isTmpPic" : false,"picUrl":this.corporateIdentityCardTemp
			};
			this.picName = '企业法人身份证正反面复印件加盖公章';
		} else if (type == "contact_identity_card") {
			this.viewModel.entityDTO = {
					"isTmpPic" : false,"picUrl":this.contactIdentityCardTemp
			};
			this.picName = '联系人身份证正反面复印件加盖公章';
		} else if (type == "supplier_bank_confirm") {
			this.viewModel.entityDTO = {
					"isTmpPic" : false,"picUrl":this.supplierBankConfirmTemp
			};
			 this.picName = '供应商银行信息确认函';
		}
		var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
				.extend(this.viewModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.src = result.data.pictureData;
				this.viewPicture = ModalUtil.createModal($modal,
						ModalPath.MEMBER_VIEW_PICTURE, this, "lg");
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
    


}

MemberAuditInfoContext.extend(ContextSupport);
