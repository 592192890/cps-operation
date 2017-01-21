/***********************************************************************
 * 描述：比较元素内容指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ProductAttributeTreeViewComponent($compile, $parse, $log, $timeout,apiService) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};

	this.getHelpCenterViewType = function() {

	}.bind(this);
	/**
	 * 编译控件指令
	 */
	this.link = function(scope,element, attrs, controller) {
		var $scope=element.scope;
		var currentTreeView =  angular.element(element.children().eq(0));
		scope.getfaqtypedetails = function() {
	      	this.queryModel = {entityDTO:{}};      	  
	      	this.queryModel.entityDTO.faqTypeId = scope.faqTypeId;
	      		var promise = apiService.post(ApiDefines.HELP_CENTER_GET_FAQDETAILS,
	      				angular.extend( this.queryModel ));
	      		promise.then(function(result) {
	      			if ('1' == result.code) {
	      				scope.$parent.queryFaqTypeDetails = result.data;
	      			} else {
	      				this.popAlert(result.message, 'error');
	      			}
	      		}.bind(this));
		}
		scope.getfaqtypelist = function() {
	      	this.queryModel = {entityDTO:{}};      	  
	      	this.queryModel.entityDTO.faqTypeId = scope.faqTypeId;
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
					scope.$parent.queryQuestionListResult = result.data.records;
					scope.$parent.totalPages = result.data.pageDTO.totalCount;
					
				} else {
					// .....
					this.popAlert(result.message, 'error');
				}
			}.bind(this));
		}

		scope.getsummaryContent = function() {
			this.queryModel = {entityDTO:{}}; 
			var promise = apiService.post(ApiDefines.HELP_CENTER_GET_SUMMARYCONTENT,
	      				angular.extend( this.queryModel ));
      		promise.then(function(result) {
      			if ('1' == result.code) {
      				scope.$parent.queryModel.entityDTO.answer = result.data.answer;
      			} else {
      				this.popAlert(result.message, 'error');
      			}
      		}.bind(this));
		}

		var promise = apiService.post(ApiDefines.HELP_CENTER_TREEVIEW_NAME);
			promise.then(function(result) {
				if ('1' == result.code) {
					var selectedViewType =  result.data;
					scope.selectedViewTypescope = selectedViewType;
					currentTreeView.treeview({  
						  data:scope.selectedViewTypescope,     // data is not optional		 
						  backColor: 'none',
						  showBorder:false,
						  highlightSelected:true,
						  onNodeSelected: function(event, data) {
						  	if(data.parentId==undefined) {
						  		return;
						  	}
						  	if(data.parentId==0||data.text=='概述') {
						  		scope.$parent.notSummary = false;
						  		scope.getsummaryContent();
						  		scope.$parent.disableUDbuttom = true;
						  	} else {
						  		scope.$parent.notSummary = true;
						  		scope.$parent.disableUDbuttom = false;
						  		scope.faqTypeId=data.faqTypeId;
						  		scope.$parent.passfaqTypeName=data.text;
						  		// scope.$parent.id=123;
						  		scope.getfaqtypedetails();
						  		scope.getfaqtypelist();

						  	}
						  	scope.$apply();
						  }
					});
					currentTreeView.find('li').eq(1).trigger('click');
				}
		}.bind(this));
	}
}