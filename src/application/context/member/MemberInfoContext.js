'use strict';

function MemberInfoContext($state, $cookieStore, $timeout, apiService,
		webStorageCache, FileUploader,$modal) {

	this.queryModel = {
		entityDTO : {}
	};
	
	
	this.query = {
			entityDTO : {}
		};
	
	this.viewModel = {entityDTO:{}};
	
	this.taxTypeResult = {};
	
	this.businessLicense = "0";
	
	this.taxRegistration = "0";

	this.corporateIdentityCard = "0";

	this.contactIdentityCard = "0";

	this.supplierBankConfirm = "0";
	

	this.execute = function() {
		
		this.getBankNameList();
		
		this.getTaxType();

	};
	
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
	
    this.createMember = function(valid) {
    	this.sumbmited = true;
    	
    	if(valid){
    		
    		this.queryModel.entityDTO.memberType = 1;
    		
    		this.queryModel.entityDTO.accountType = 2;
    		
    		var promise = apiService.post(ApiDefines.CREATE_MEMBER, angular
    				.extend(this.queryModel));
    		promise.then(function(result) {
    			if ('1' == result.code) {
    				this.popAlert("用户创建成功", 'success');			
    			} else {
    				// .....
    				this.popAlert(result.message, 'error');
    			}
    		}.bind(this));
    		
    	}
    	

	}.bind(this);
	
	this.getBankNameList = function() {
		var promise = apiService.post(ApiDefines.BANK_NAME_LIST, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.bankNameListResult = result.data;
			}
		}.bind(this));		
	}.bind(this);
	
	this.getProvinceNameList = function(bankName) {
		this.query.entityDTO = {
				"bankName" : bankName
			};
		var promise = apiService.post(ApiDefines.PROVINCE_NAME_LIST, angular
				.extend(this.query));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.provinceNameListResult = result.data;
			}
		}.bind(this));
	}.bind(this);
	
	this.getCityNameList = function(bankName,bankProvinceName) {
		this.query.entityDTO = {
				"bankName" : bankName,
				"bankProvinceName" : bankProvinceName
			};
		var promise = apiService.post(ApiDefines.CITY_NAME_LIST, angular
				.extend(this.query));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.cityNameListResult = result.data;
				if(this.localCity != bankProvinceName){
					this.queryModel.entityDTO.recipientBankProvince = this.cityNameListResult[0].bankCityName;
					this.getBranchBankList(bankName,bankProvinceName,this.cityNameListResult[0].bankCityName);
				}
				
			}
		}.bind(this));
	}.bind(this);
	
	this.getBranchBankList = function(bankName,bankProvinceName,bankCityName) {
		this.query.entityDTO = {
				"bankName" : bankName,
				"bankProvinceName" : bankProvinceName,
				"bankCityName" : bankCityName
			};
		var promise = apiService.post(ApiDefines.BRANCH_BANK_INFO_LIST, angular
				.extend(this.query));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.branchBankListResult = result.data;
			}
		}.bind(this));
	}.bind(this);
	
	
	this.queryBankByBranchBankName = function(bankName,bankProvinceName,bankCityName,bankBranchName) {
		this.query.entityDTO = {
				"bankName" : bankName,
				"bankProvinceName" : bankProvinceName,
				"bankCityName" : bankCityName,
				"bankBranchName" : bankBranchName
			};
		var promise = apiService.post(ApiDefines.QUERY_BRANCH_BANK_INFO_LIST, angular
				.extend(this.query));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.branchBankListResult = result.data;
				this.queryCompanyAccInfoResult.recipientBankBranch = result.data[0].bankBranchName + ',' + result.data[0].bankBranchNum;
				this.queryModel.entityDTO.recipientBankBranch = result.data[0].bankBranchName + ',' + result.data[0].bankBranchNum;
			}
		}.bind(this));
	}.bind(this);

	this.enBusLicenBackUpUploaderBusinessLicenseUrl = UploaderUtil
			.create(
					FileUploader,
					{
						url : webStorageCache.get('FILE_SERVER_PATH')
								+ ApiDefines.UPLOAD_IMG_FILE,
						formData : [ {
							bFileType : 'business_license'
						} ],
						alias : 'file',
						autoUpload : true,
						filters : [ 'imgFilter' ],
						success : function(result) {
							if ('1' == result.code) {
								this.businessLicense = "1";
								this.queryModel.entityDTO.businessLicenseUrl = result.fileUrl;
								this.businessLicenseTemp = result.fileUrl;
								this.popAlert('文件上传成功', 'success');
							} else {
								// .....
								this.popAlert(result.message, 'error');
							}
						}.bind(this)
					});

	this.enBusLicenBackUpUploaderTaxRegistrationUrl = UploaderUtil
			.create(
					FileUploader,
					{
						url : webStorageCache.get('FILE_SERVER_PATH')
								+ ApiDefines.UPLOAD_IMG_FILE,
						formData : [ {
							bFileType : 'tax_registration'
						} ],
						alias : 'file',
						autoUpload : true,
						filters : [ 'imgFilter' ],
						success : function(result) {
							if ('1' == result.code) {
								this.taxRegistration = "1";
								this.queryModel.entityDTO.taxRegistrationUrl = result.fileUrl;
								this.taxRegistrationTemp = result.fileUrl;
								this.popAlert('文件上传成功', 'success');
							} else {
								// .....
								this.popAlert(result.message, 'error');
							}
						}.bind(this)
					});

	this.enBusLicenBackUpUploaderCorporateIdentityCardUrl = UploaderUtil
			.create(
					FileUploader,
					{
						url : webStorageCache.get('FILE_SERVER_PATH')
								+ ApiDefines.UPLOAD_IMG_FILE,
						formData : [ {
							bFileType : 'corporate_identity_card'
						} ],
						alias : 'file',
						autoUpload : true,
						filters : [ 'imgFilter' ],
						success : function(result) {
							if ('1' == result.code) {
								this.corporateIdentityCard = "1";
								this.queryModel.entityDTO.corporateIdentityCardUrl = result.fileUrl;
								this.corporateIdentityCardTemp = result.fileUrl;
								this.popAlert('文件上传成功', 'success');
							} else {
								// .....
								this.popAlert(result.message, 'error');
							}
						}.bind(this)
					});

	this.enBusLicenBackUpUploaderContactIdentityCardUrl = UploaderUtil
			.create(
					FileUploader,
					{
						url : webStorageCache.get('FILE_SERVER_PATH')
								+ ApiDefines.UPLOAD_IMG_FILE,
						formData : [ {
							bFileType : 'contact_identity_card'
						} ],
						alias : 'file',
						autoUpload : true,
						filters : [ 'imgFilter' ],
						success : function(result) {
							if ('1' == result.code) {
								this.contactIdentityCard = "1";
								this.queryModel.entityDTO.contactIdentityCardUrl = result.fileUrl;
								this.contactIdentityCardTemp = result.fileUrl;
								this.popAlert('文件上传成功', 'success');
							} else {
								// .....
								this.popAlert(result.message, 'error');
							}
						}.bind(this)
					});

	this.enBusLicenBackUpUploaderSupplierBankConfirmUrl = UploaderUtil
			.create(
					FileUploader,
					{
						url : webStorageCache.get('FILE_SERVER_PATH')
								+ ApiDefines.UPLOAD_IMG_FILE,
						formData : [ {
							bFileType : 'supplier_bank_confirm'
						} ],
						alias : 'file',
						autoUpload : true,
						filters : [ 'imgFilter' ],
						success : function(result) {
							if ('1' == result.code) {
								this.supplierBankConfirm = "1";
								this.queryModel.entityDTO.supplierBankConfirmUrl = result.fileUrl;
								this.supplierBankConfirmTemp = result.fileUrl;
								this.popAlert('文件上传成功', 'success');
							} else {
								// .....
								this.popAlert(result.message, 'error');
							}
						}.bind(this)
					});
	
	this.preview = function(type) {
		
		if(type == "business_license") {
			this.viewModel.entityDTO = {
					"isTmpPic" : true,"picUrl":this.businessLicenseTemp
			};
		} else if (type == "tax_registration") {
			this.viewModel.entityDTO = {
					"isTmpPic" : true,"picUrl":this.taxRegistrationTemp
			};
		} else if (type == "corporate_identity_card") {
			this.viewModel.entityDTO = {
					"isTmpPic" : true,"picUrl":this.corporateIdentityCardTemp
			};
		} else if (type == "contact_identity_card") {
			this.viewModel.entityDTO = {
					"isTmpPic" : true,"picUrl":this.contactIdentityCardTemp
			};
		} else if (type == "supplier_bank_confirm") {
			this.viewModel.entityDTO = {
					"isTmpPic" : true,"picUrl":this.supplierBankConfirmTemp
			};		
		}
		


		var promise = apiService.post(webStorageCache.get('FILE_SERVER_PATH') + ApiDefines.PREVIEW_IMAGE, angular
				.extend(this.viewModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.viewPicture = ModalUtil.createModal($modal,
						ModalPath.VIEW_PICTURE, this, "md");
				this.src = result.data.pictureData;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));

	}.bind(this);
	
    this.reset =function () {
     	 this.queryModel = {entityDTO:{}};
     };
     
 	this.modify = function(type) {

		if ('1' == type) {
			this.businessLicense = "0";
		}
		if ('2' == type) {
			this.taxRegistration = "0";
		}
		if ('3' == type) {
			this.corporateIdentityCard = "0";
		}
		if ('4' == type) {
			this.contactIdentityCard = "0";
		}
		if ('5' == type) {
			this.supplierBankConfirm = "0";
		}

	}.bind(this);

}

MemberInfoContext.extend(ContextSupport);
