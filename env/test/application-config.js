'use strict';
/***********************************************************************
 * 描述：框架核心配置<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var appConfig = {
	// 容器引擎
	container: 'angular',
	// 环境选项['develop', 'testing', 'production']
	environment: 'develop',
	// api请求路径
	//
	//apiPath: 'http://16.178.114.16:8186/',
	 apiPath: 'http://' + window.location.host,
	// 模块配置
	modules: [
		// 模板模块
		{
			name: 'cps_common',
			requires: ['ngResource', 'ngMessages', 'ngCookies', 'ngClipboard', 'angularFileUpload', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngNotify','ui.select','webStorageCache']
		},
		{
			name: 'cps_context',
			requires: ['cps_common']
		},
		{
			name: 'cps_component',
			requires: ['cps_common']
		}
	],
	// 跨越设置
	security: {
		moduleName: 'cps_common',
		urlWhites: {
			develop: ['http://192.168.1.131/**'],
			testing: [''],
			production: ['']
		},
		credentials: true
	},
	// 路由设置
	router: {
		moduleName: 'cps_common',
		states: [
			{
				name: 'roleSelect',
				url: '/roleSelect.html',
				templateUrl: './src/web/page/roleSelect.html'
			},
			{
				name: 'checkLogin',
				url: '/checkLogin.html',
				templateUrl: './src/web/page/checkLogin.html'
			},
			{
				name: 'main',
				url: '/main.html',
				templateUrl: './src/web/page/main.html'
			},
			{
				name: 'main.memberList',
				url: '/memberList.html',
				templateUrl: './src/web/page/member/member_list.html'
			},
			{
				name: 'main.mediaAudit',
				url: '/mediaAudit.html',
				templateUrl: './src/web/page/member/media_audit.html'
			},
			{
				name: 'main.mediaBlackList',
				url: '/mediaBlackList.html',
				templateUrl: './src/web/page/member/media_black_list.html'
			},
			{
				name: 'main.memberDetail',
				url: '/memberDetail.html',
				templateUrl: './src/web/page/member/member_detail.html'
			},
			
			{
				name: 'main.messageDetail',
				url: '/messageDetail.html',
				templateUrl: './src/web/page/member/message_detail.html'
			},
			
			{
				name: 'main.messageView',
				url: '/messageView.html',
				templateUrl: './src/web/page/member/message_view.html'
			},
						
			
			{
				name: 'main.mediaAuditInfo',
				url: '/mediaAuditInfo.html',
				templateUrl: './src/web/page/member/media_audit_info.html'
			},
			
			{
				name: 'main.messageEdit',
				url: '/messageEdit.html',
				templateUrl: './src/web/page/member/message_edit.html'
			},
			
			
			{
				name: 'main.memberAuditInfo',
				url: '/memberAuditInfo.html',
				templateUrl: './src/web/page/member/member_audit_info.html'
			},
			
			{
				name: 'main.mediaInfo',
				url: '/mediaInfo.html',
				templateUrl: './src/web/page/member/media_info.html'
			},
						
			
			{
				name: 'main.messageList',
				url: '/messageList.html',
				templateUrl: './src/web/page/member/message_list.html'
			},
			{
				name: 'main.memberMessage',
				url: '/memberMessage.html',
				templateUrl: './src/web/page/member/member_message.html'
			},
			{
				name: 'main.memberInfo',
				url: '/memberInfo.html',
				templateUrl: './src/web/page/member/member_info.html'
			},
			
			{
				name: 'main.home',
				url: '/home.html',
				templateUrl: './src/web/page/home.html'
			},
			
			{
				name: 'main.configManagement',
				url: '/configManagement.html',
				templateUrl: './src/web/page/config/configMgt.html'
			},
			
			{
				name: 'main.createConfig',
				url: '/createConfig.html',
				templateUrl: './src/web/page/config/createConfig.html'
			},
			
			{
				name: 'main.editConfig',
				url: '/editConfig.html',
				templateUrl: './src/web/page/config/editConfig.html'
			},
			
			{
				name: 'main.memberAudit',
				url: '/memberAudit.html',
				templateUrl: './src/web/page/member/member_audit.html'
			},
			
			{
				name: 'main.blackMedia',
				url: '/blackMedia.html',
				templateUrl: './src/web/page/member/black_media.html'
			},
			
			{
				name: 'main.messageCreate',
				url: '/messageCreate.html',
				templateUrl: './src/web/page/member/message_create.html'
			},
			
						
			{
				name: 'main.mediaList',
				url: '/mediaList.html',
				templateUrl: './src/web/page/member/media_list.html'
			},
			{
				name: 'main.adActiveList',
				url: '/adActiveList.html',
				templateUrl: './src/web/page/promotionManage/ad_activities_list.html'
			},
			{
				name: 'main.adActivityAdd',
				url: '/adActiveAdd.html',
				templateUrl: './src/web/page/promotionManage/ad_activities_add.html'
				
			},
			{
				name: 'main.adActivityView',
				url: '/adActiveView.html',
				templateUrl: './src/web/page/promotionManage/ad_activities_view.html'
				
			},
			{
				name: 'main.adActivityUpdate',
				url: '/adActiveUpdate.html',
				templateUrl: './src/web/page/promotionManage/ad_activities_update.html'
				
			},
			{
				name: 'main.adActivityAudit',
				url: '/adActiveAudit.html',
				templateUrl: './src/web/page/promotionManage/ad_activities_audit.html'
				
			},
			{
				name: 'main.cpsTypeManage',
				url: '/cpsTypeManage.html',
				templateUrl: './src/web/page/encourageManage/cps_type_list.html'
				
			},
			{
				name:'main.cpsTypeAdd',
				url: '/cpsTypeAdd.html',
				templateUrl: './src/web/page/encourageManage/cps_type_add.html'
			},
			{
				name:'main.cpsTypeUpdate',
				url: '/cpsTypeUpdate.html',
				templateUrl: './src/web/page/encourageManage/cps_type_update.html'
			},
			{
				name:'main.cpsTypeDetail',
				url: '/cpsTypeDetail.html',
				templateUrl: './src/web/page/encourageManage/cps_type_detail.html'
			},
			{
				name:'main.cpsTypeAddEncourage',
				url: '/cpsTypeAddEncourage.html',
				templateUrl: './src/web/page/encourageManage/cps_type_encourage_add.html'
			},
			{
				name:'main.cpsTypeUpdateEncourage',
				url: '/cpsTypeUpdateEncourage.html',
				templateUrl: './src/web/page/encourageManage/cps_type_encourage_update.html'
			},
			{
				name:'main.cpsTypeViewEncourage',
				url: '/cpsTypeViewEncourage.html',
				templateUrl: './src/web/page/encourageManage/cps_type_encourage_view.html'
			},
			{
				name:'main.cpsProductManage',
				url: '/cpsProductManage.html',
				templateUrl: './src/web/page/encourageManage/cps_product_list.html'
			},{
				name:'main.cpsActivityEncourageManage',
				url: '/cpsActivityEncourageManage.html',
				templateUrl: './src/web/page/encourageManage/activity_encourage_list.html'
			},
			{
				name:'main.cpsActivityEncourageAdd',
				url: '/cpsActivityEncourageAdd.html',
				templateUrl: './src/web/page/encourageManage/activity_encourage_add.html'
			},
			{
				name:'main.cpsActivityEncourageUpdate',
				url: '/cpsActivityEncourageUpdate.html',
				templateUrl: './src/web/page/encourageManage/activity_encourage_update.html'
			},
			{
				name:'main.cpsActivityEncourageView',
				url: '/cpsActivityEncourageView.html',
				templateUrl: './src/web/page/encourageManage/activity_encourage_view.html'
			},
			{
				name:'main.cpsActivityEncourageAudit',
				url: '/cpsActivityEncourageAudit.html',
				templateUrl: './src/web/page/encourageManage/activity_encourage_audit.html'
			},
			{
				name: 'main.memberBillQuery',
				url: '/memberBillQuery.html',
				templateUrl: './src/web/page/finance/member_bill_query.html'
				
			},
			{
				name: 'main.memberDailySummary',
				url: '/memberDailySummary.html',
				templateUrl: './src/web/page/finance/member_daily_summary.html'
				
			},
			{
				name: 'main.applyPurchase',
				url: '/applyPurchase.html',
				templateUrl: './src/web/page/finance/apply_purchase.html'
				
			},
			{
				name: 'main.accountQuery',
				url: '/accountQuery.html',
				templateUrl: './src/web/page/finance/member_account_query.html'
				
			},
			{
				name: 'main.configItem',
				url: '/configItem.html',
				templateUrl: './src/web/page/finance/config.html'
				
			},
			{
				name: 'main.memberSetlementDetail',
				url: '/memberSetlementDetail.html',
				templateUrl: './src/web/page/finance/member_setlement_detail.html'
				
			},
			{
				name: 'main.submitBusinessAudit',
				url: '/submitBusinessAudit.html',
				templateUrl: './src/web/page/finance/submit_business_audit.html'
				
			},
			{
				name: 'main.promotionDetailReport',
				url: '/promotionDetailReport.html',
				templateUrl: './src/web/page/operationReport/promotion_detail_report.html'
				
			},
			{
				name: 'main.promotionEffectReport',
				url: '/promotionEffectReport.html',
				templateUrl: './src/web/page/operationReport/promotion_effect_report.html'
				
			},
			{
				name: 'main.cpsOrderManage',
				url: '/cpsOrderManage.html',
				templateUrl: './src/web/page/orderManage/cps_order_list.html'
				
			},
			{
				name: 'main.additionalOrderSettle',
				url: '/additionalOrderSettle.html',
				templateUrl: './src/web/page/orderManage/additional_order_settle.html'
				
			},
			{
				name: 'main.exceptionOrderImport',
				url: '/exceptionOrderImport.html',
				templateUrl: './src/web/page/orderManage/exception_order_import.html'
				
			},
			{
				name: 'main.notificationList',
				url: '/notificationList.html',
				templateUrl: './src/web/page/pageManage/notification_list.html'
				
			},
			{
				name: 'main.templateList',
				url: '/templateList.html',
				templateUrl: './src/web/page/pageManage/template_list.html'
				
			},
			{
				name: 'main.addTemplate',
				url: '/addTemplate.html',
				templateUrl: './src/web/page/pageManage/add_template.html'
				
			},
			{
				name: 'main.addNotification',
				url: '/addNotification.html',
				templateUrl: './src/web/page/pageManage/add_notification.html'
				
			},
			{
				name: 'main.allTemplate',
				url: '/templateList.html',
				templateUrl: './src/web/page/pageManage/template_list.html'
				
			},
			{
				name: 'main.updateNotification',
				url: '/updateNotification.html',
				templateUrl: './src/web/page/pageManage/update_notification.html'
				
			},
			{
				name: 'main.viewNotification',
				url: '/viewNotification.html',
				templateUrl: './src/web/page/pageManage/view_notification.html'

			},
			{
				name: 'main.approveNotification',
				url: '/approveNotification.html',
				templateUrl: './src/web/page/pageManage/approve_notification.html'
				
			},
			{
				name: 'main.systemTemplate',
				url: '/systemTemplate.html',
				templateUrl: './src/web/page/pageManage/system_template_list.html'
				
			},
			{
				name: 'main.userTemplate',
				url: '/userTemplate.html',
				templateUrl: './src/web/page/pageManage/user_template_list.html'
				
			},
			{
				name: 'main.helpCenterList',
				url: '/helpCenterList.html',
				templateUrl: './src/web/page/pageManage/help_center_list.html'
				
			},
			{
				name: 'main.updateHelpCenter',
				url: '/updateHelpCenter.html',
				templateUrl: './src/web/page/pageManage/help_center_update.html'
				
			},
			{
				name: 'main.helpCenterAdd',
				url: '/helpCenterAdd.html',
				templateUrl: './src/web/page/pageManage/help_center_add.html'
				
			},
			{
				name: 'main.editTemplate',
				url: '/editTemplate.html',
				templateUrl: './src/web/page/pageManage/edit_template.html'
				
			},
			{
				name: 'main.checkHotQuestion',
				url: '/checkHotQuestion.html',
				templateUrl: './src/web/page/pageManage/help_center_hotquestioncheck.html'
				
			},
			{
				name:'main.addHelpCategory',
				url:'/addHelpCategory.html',
				templateUrl:'./src/web/page/pageManage/help_center_addcategory.html'
			},
			{
				name:'main.updateHelpCategory',
				url:'/updateHelpCategory.html',
				templateUrl:'./src/web/page/pageManage/help_center_updatecategory.html'
			}
		],
otherwise: '/checkLogin.html'
	
	}
};
