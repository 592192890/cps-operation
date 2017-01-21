'use strict';

function HelpCenterListContext($state,$cookieStore,$timeout, apiService,webStorageCache) {

    this.queryModel = {entityDTO:{}};
    
    this.pageSize = PageConfig.INIT_PAGE_SIZE;
	
	this.pageIndex = PageConfig.INIT_PAGE_INDEX;
	
	this.queryQuestionListResult = {};
	
	this.isHotquestionResult = {};

	this.isLeafResult = {};
	
	this.questionTypeResult = {};
	
	this.orderUtil = {
			orderDTOs : [ {
				"propertyName" : "createDate",
				"type" : "desc"
			} ],
			order : [],
			trigger : this.doPagingSearch
		};

    this.execute = function() {
    	
    	this.isHotQuestion();
    	
    	this.getQuestionType();
    };
    
    this.addHelpCenter = function (faqTypeName) {
    	var faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId;
    	$state.go('main.helpCenterAdd',{"data":{"faqTypeId":faqTypeId,"faqTypeName":faqTypeName}});

    	var hotQuestionInfo =  {
                name: '帮助中心',
                sref: 'main.helpCenterList'
            };
        this.doActiveMenu(hotQuestionInfo);
    }
    //
    
    
    this.addHelpCategory = function () {
    	$state.go('main.addHelpCategory',{"data":{"faqTypeId":null,"faqTypeName":null}});
    	var hotQuestionInfo =  {
                name: '帮助中心',
                sref: 'main.helpCenterList'
            };
        this.doActiveMenu(hotQuestionInfo);
    }

    this.checkHotQuestion = function () {
    	$state.go('main.checkHotQuestion');

    	var hotQuestionInfo =  {
                name: '帮助中心',
                sref: 'main.helpCenterList'
            };
        this.doActiveMenu(hotQuestionInfo);

    }
    this.updateHelpCategory = function () {
    	var faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId;
    	$state.go('main.updateHelpCategory',{"data":{"faqTypeId":faqTypeId}});

    	var hotQuestionInfo =  {
                name: '帮助中心',
                sref: 'main.helpCenterList'
            };
        this.doActiveMenu(hotQuestionInfo);
    }
	//
    this.updateHelpCenter = function (raw) {
    	$state.go('main.updateHelpCenter',{"data":{"faqId":raw.faqId,"faqTypeName":this.passfaqTypeName}});

    	var hotQuestionInfo =  {
                name: '帮助中心',
                sref: 'main.helpCenterList'
            };
        this.doActiveMenu(hotQuestionInfo);
    }

    this.reset = function() {
    	 this.queryModel = {entityDTO:{}};
	};

    this.saveMessage = function(valid) {    	
    	this.sumbmited = true;  
    	var valid = true;  	
    	if(this.queryModel.entityDTO.answer == "" || this.queryModel.entityDTO.answer == null){
    		
    		this.error_message_content = 1;
    		
            return;
    	}else{    		
    		this.error_message_content = 0;
    	}
    	
    	if(valid){
		var promise = apiService.post(ApiDefines.HELP_CENTER_MODIFY_SUMMARYCONTENT, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert("消息创建成功", 'success');
				// $state.go('main.messageList');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
    	}
	}.bind(this);

    
    this.goBack = function () {
    	$state.go('main.helpCenterList');
    };
    this.deleteQuestionConfirm = {
            opened: false,
            ok: undefined,
            cancel: undefined
    };
    
    this.deleteSeCategoryConfirm = {
    	   opened: false,
           ok: undefined,
           cancel: undefined
    };
    this.deleteCategory = function() {
    	this.deleteSeCategoryConfirm.opened = true;
    	//确认回调
    	 this.deleteSeCategoryConfirm.ok = function() {      	  
      	  this.queryModel = {entityDTO:{}};
      	  
      	  this.queryModel.entityDTO.faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId;;
      		var promise = apiService.post(ApiDefines.HELP_CENTER_DELTER_CATEGORY,
      				angular.extend( this.queryModel ));
      		promise.then(function(result) {
      			if ('1' == result.code) {
      				this.popAlert("删除操作完成", 'success');
      				$state.go($state.current, {}, {reload: true});
      			} else {
      				// .....
      				this.popAlert(result.message, 'error');
      			}
      		}.bind(this));
        }.bind(this);
    }
    
    this.deleteQuestion = function (raw) {
    	
  	  this.deleteQuestionConfirm.opened = true;
        // 确认回调
        this.deleteQuestionConfirm.ok = function() {
      	  
      	  this.queryModel = {entityDTO:{}};
      	  
      	  this.queryModel.entityDTO.faqId = raw.faqId;
      		var promise = apiService.post(ApiDefines.DELETE_QUESTION,
      				angular.extend( this.queryModel ));
      		promise.then(function(result) {
      			if ('1' == result.code) {
      				 this.doPagingSearch(1);
      				 this.popAlert("删除操作完成", 'success');
      			} else {
      				// .....
      				this.popAlert(result.message, 'error');
      			}
      		}.bind(this));
        }.bind(this);
  };
    
	this.isHotQuestion = function() {
		this.isHotquestionResult = webStorageCache.get(DropDownListDefines.FAQ_IS_HOT_QUESTION);
		this.isLeafResult = webStorageCache.get(DropDownListDefines.FAQ_IS_HOT_QUESTION);
		if (!this.isHotquestionResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.FAQ_IS_HOT_QUESTION);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.isHotquestionResult = result.data;
					this.isLeafResult = result.data;
					webStorageCache.set(DropDownListDefines.FAQ_IS_HOT_QUESTION,
							result.data, {
								exp : Constants.EXP_TIME
							});
				}
			}.bind(this));
		}
	}.bind(this);
	
	this.getQuestionType = function() {
		this.questionTypeResult = webStorageCache.get(DropDownListDefines.FAQ_TYPE);
		if (!this.questionTypeResult) {
			var promise = apiService
					.getDropDownList(DropDownListDefines.FAQ_TYPE);
			promise.then(function(result) {
				if ('1' == result.code) {
					this.questionTypeResult = result.data;
					webStorageCache.set(DropDownListDefines.FAQ_TYPE,
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
		 var faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId;
		 if(faqTypeId=='undefined') {
		 	return;
		 }
		 this.queryModel.entityDTO.faqTypeId = faqTypeId;
		var promise = apiService.post(ApiDefines.HELP_CENTER_GET_FAQlIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs :[{
						propertyName:'orderType',
					},{
						propertyName:'orderBy',
					}]
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryQuestionListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);
	
	this.doPagingHotQuestionSearch = function(index,pageSize) {
		(typeof index != 'undefined') && (this.pageIndex = index);
		(typeof pageSize != 'undefined') && (this.pageSize = pageSize);
		this.queryModel = {entityDTO:{}};  
		var promise = apiService.post(ApiDefines.HELP_CENTER_GET_FAQHOTIST, angular
				.extend({
					pageDTO : {
						pageSize : this.pageSize,
						pageNo : this.pageIndex
					},
					orderDTOs :[{
						propertyName:'orderType',
					},{
						propertyName:'orderBy',
					}]
				}, this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.queryQuestionListResult = result.data.records;
				this.totalPages = result.data.pageDTO.totalCount;
				
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
	}.bind(this);


	this.getTreeViewRefresh = function(orderAction) {
		var promise = apiService.post(ApiDefines.HELP_CENTER_TREEVIEW_NAME);
			promise.then(function(result) {
			if ('1' == result.code) {
				this.selectedViewTypescope = result.data;
				var childrenScopeView = angular.element(document.querySelector('.node-selected')).parent().parent();
				var childrenTreeScope = angular.element(document.querySelector('.node-selected')).scope();
				var previousSelctedval = childrenScopeView.find('.node-selected').attr('data-nodeid');
				if(orderAction=='up') {
					previousSelctedval = parseInt(previousSelctedval)-1;
				} else {
					previousSelctedval = parseInt(previousSelctedval)+1;
				}
				childrenScopeView.treeview({
					data:this.selectedViewTypescope,
				  	onNodeSelected: function(event, data) {
					  	if(data.parentId==undefined) {
					  		return;
					  	}
					  	if(data.parentId==0||data.text=='概述') {
					  		childrenTreeScope.$parent.notSummary = false;
					  		childrenTreeScope.getsummaryContent();
						  	childrenTreeScope.$parent.disableUDbuttom = true;
					  	} else {
					  		childrenTreeScope.$parent.notSummary = true;
					  		childrenTreeScope.$parent.disableUDbuttom = false;
					  		childrenTreeScope.faqTypeId=data.faqTypeId;
					  		// scope.$parent.id=123;
					  		childrenTreeScope.getfaqtypedetails();
					  		childrenTreeScope.getfaqtypelist();
					  	}
					  	childrenTreeScope.$apply();
				  	}
				});
				childrenScopeView.find("[data-nodeid="+previousSelctedval+"]").trigger('click');
				// this.popAlert("排序完成", 'success');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
	}.bind(this);



	this.sortCategoryQuestion = function(orderAction) {
		var faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId; 

		if(faqTypeId===undefined) {
			return;
		}
		this.queryModel = {entityDTO:{}};
	
		this.queryModel.entityDTO.orderAction = orderAction;
		
		this.queryModel.entityDTO.faqTypeId = faqTypeId;

		var promise = apiService.post(ApiDefines.HELP_CENTER_SORT_FAQlIST, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				//this.doPagingSearch(this.index);
				this.getTreeViewRefresh(orderAction);					
				//$state.go($state.current, {}, {reload: true});
				this.popAlert("排序完成", 'success');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
	}.bind(this);



	this.sortQuestion = function(orderAction,faqId) {
		var faqTypeId = angular.element(document.querySelector('.node-selected')).scope().faqTypeId; 

		this.queryModel = {entityDTO:{}};
		
		this.queryModel.entityDTO.faqId = faqId;

		this.queryModel.entityDTO.orderAction = orderAction;
		
		this.queryModel.entityDTO.faqTypeId = faqTypeId;

		var promise = apiService.post(ApiDefines.SORT_QUESTION, angular
				.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.doPagingSearch(this.index);
				this.popAlert("排序完成", 'success');
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
		
	}.bind(this);

	this.saveAddedCategory = function() {

    }	
}

HelpCenterListContext.extend(ContextSupport);
