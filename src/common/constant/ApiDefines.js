'use strict';
/***********************************************************************
 * 描述：API定义常量<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var ApiDefines = {

		
	//获取角色
	SELECT_ROLE:'/system/v1/mockUserRole?role=',
	GET_USER_INFO:'/member/v1/queryUserInfo',
	
	//验证用户登录
	VALIDATE_USER_INFO:'/system/v1/validateSsoLoginInfo',
		
	//获取上传服务器地址
	GET_UPLOAD_SERVER_URL:'/system/v1/getUploadFileServerUrl',
	
	//文件上传地址
	UPLOAD_IMG_FILE:'/system/v1/uploadFile',
	//导入会员ID
	IMPORT_MEMBER_ID:'/message/v1/importMemberIds',	
	//审核信息列表通用接口
	GET_AUDIT_HIS_LIST:'/approve/v1/getApproves',	
	//获取会员列表
	MEMBER_LIST:'/member/v1/getAllMemberList',	
	//获取会员详情	
	MEMBER_DETAIL:'/member/v1/getMemberDetail',	
	//获取会员审核列表
	MEMBER_AUDIT_LIST:'/member/v1/getTodoMemberList',
	//设置会员黑名单
	SET_BLACK_LIST:'/member/v1/setBlacklist',
	//解除会员黑名单
	REMOVE_BLACK_LIST:'/member/v1/removeBlacklist',
	//冻结会员
	FREEZE:'/member/v1/freeze',
	//解冻会员
	UN_FREEZE:'/member/v1/unfreeze',
	//恢复会员审核
	RECOVER_APPROVE:'/member/v1/recoverApprove',
	//导出会员银行信息
	EXPORT_MEMBER_BANK_INFO:'/member/v1/exportMemberBankInfo',
	//获取会员审核信息记录
	MEMBER_AUDIT_INFO:'/approve/v1/getApproves',
	//批量审核通过
	BATCH_APPROVE:'/member/v1/batchApprovePass',
	//获取消息列表
	MESSAGE_LIST:'/message/v1/getMessages',
	//获取消息详情
	MESSAGE_DETAIL:'/message/v1/detail',
    //获取银行名称列表
    BANK_NAME_LIST:'/bank/v1/getAllBankNameList',
    //获取银行省名列表
    PROVINCE_NAME_LIST:'/bank/v1/getProvinceNameList',
    //获取银行地区列表
    CITY_NAME_LIST:'/bank/v1/getCityNameList',
    //获取银行支行信息
    BRANCH_BANK_INFO_LIST:'/bank/v1/getBranchBankList',
    //查询银行支行信息
    QUERY_BRANCH_BANK_INFO_LIST:'/bank/v1/queryBankByBranchBankName',
    //获取会员消息列表
    MEMBER_MESSAGE_LIST:'/message/v1/getUserMessages',
    //获取会员消息详情
    MEMBER_MESSAGE_DETAIL:'/message/v1/detailUserMessage',
    //会员审核
    APPROVE_MEMBER_INFO:'/member/v1/approveMemberInfo',
    //创建平台会员
    CREATE_MEMBER:'/member/v1/addPlatformMemberInfo',
    //图片预览
    PREVIEW_IMAGE:'/system/v1/viewPicture',
    //发送消息
    SEND_MESSAGE:'/message/v1/send',
    //删除消息
    DELETE_MESSAGE:'/message/v1/delete',
    //创建消息
    CREATE_MESSAGE:'/message/v1/add',
    //修改消息
    UPDATE_MESSAGE:'/message/v1/update',
    //保存并发送消息
    SAVE_SEND_MESSAGE:'/message/v1/saveAndSend',
    //文件下载
    FILE_DOWN:'/system/v1/downTmpFile',

	FILE_NORMRAL_DOWN:'/system/v1/downNormalFile',
    //文件删除
    FILE_DELETE:'/system/v1/deleteFile',
    //创建广告投放活动
    ADD_ACTIVITY:'/activity/v1/addActivity',
	
	//数字字典
	DROP_DOWN_LIST:'/system/v1/getDictionarys',
	
    //获取广告列表
	ADVERTISEMENT_LIST:'/activity/v1/getAllActivityList',
	
	//获取广告活动详情
	ACTIVITY_DETAIL:'/activity/v1/getActivityDetail',
	
	//广告活动提交审核
	SUMBIT_TO_AUDIT:'/activity/v1/submitActivity',
	
	//广告活动删除
	DELETE_ADACTIVITY:'/activity/v1/deleteActivity',
	
	//广告活动审核
	APPROVE_ACTIVITY_INFO:'/activity/v1/approveActivity',
	
	//发布广告活动
	PUBLISH_ACTIVITY:'/activity/v1/publishActivity',
	
	//暂停广告活动
	PUASE_ACTIVITY:'/activity/v1/pauseActivity',
	
	//获取素材列表
	ACTIVITY_MATERIAL_LIST:'/activity/v1/getActivityMaterialList',
	
	//删除活动素材
	DELETE_ADACTIVITY_MATERIAL:'/activity/v1/deleteActivityMaterial',
	
	//修改活动素材
	UPDATE_ACTIVITY_MATERIAL:'/activity/v1/modifyActivityMaterial',
	
	//广告活动修改
	UPDATE_ACTIVITY:'/activity/v1/modifyActivity',
	
	//获取公告列表
	NOTICE_LIST:'/notice/v1/queryNoticeList',
	
	//公告删除
	DELETE_NOTICE:'/notice/v1/deleteNotice',
	
	//创建公告
	CREATE_NOTICE:'/notice/v1/addNotice',
	
	//修改公告
	UPDATE_NOTICE:'/notice/v1/updateNotice',
	
	//公告下线
	OFF_LINE:'/notice/v1/offLine',
	
	//获取公告详情
	NOTICE_DETAIL:'/notice/v1/queryNotice',
	
	//上传活动素材
	ADD_ACTIVITY_MATERIAL:'/activity/v1/addActivityMaterial',
	
	//公告提交审核
	ASK_FOR_APPROVE:'/notice/v1/askForApprove',
	
	//公告审核
	NOTICE_APPROVE:'/notice/v1/goApprove',
	
	//公共保存并提交审核
	SAVE_AND_ASK_APPROVE:'/notice/v1/saveAndAskApprove',
	
	//公告排序
	SORT_NOTICE:'/notice/v1/sortNotice',
	
	//获取问题列表
	FAQ_LIST:'/faq/v1/getFaqList',
	
	//问题删除
	DELETE_QUESTION:'/faq/v1/deleteFaq',
	
	//问题创建
	CREATE_QUESTION:'/faq/v1/addFaq',
	
	//获取文件详情
	QUESTION_DETAIL:'/faq/v1/getFaqDetail',
	
	//问题修改
	UPDATE_QUESTION:'/faq/v1/modifyFaqDetail',
	
	//问题排序
	SORT_QUESTION:'/faq/v1/orderFaq',
	
	//获取系统配置
	SYSTEM_INFO:'/system/v1/getSystemSettings',
	
	//修改系统配置
	UPDATE_SYSTEM_INFO:'/system/v1/updateSystemSettings',
	
	//获取商品列表
	PRODUCT_LIST:'/product/v1/queryProductList',
	
	//获取PMS商品分类
	PMS_TYPE_LIST:'/cpstype/v1/queryCpstype',
	
	//首页统计
	AUDIT_MEMBER_NUMBER:'/member/v1/getTodoMemberCount',
	AUDIT_MEDIA_NUMBER:'/media/v1/getApproveCount',
	UNSEND_MESSAGE_NUMBER:'/message/v1/getUnSendCount',
	ACTIVITY_COUNT_NUMBERS:'/activity/v1/statisticsActivityCount',
	ENCOURAGE_COUNT_NUMBERS:'/encourage/v1/countEncourage',
	NOTICE_COUNT_NUMBERS:'/notice/v1/countNotice',
	SETTLESTATISTICS_COUNT_NUMBERS:'/financial/v1/settlementStatistics',
	PAYMENTAPPLYSTATICS_COUNT_NUMBERS:'/financial/v1/paymentApplyStatistics',
							
	//活动激励管理
	ENCOURAGE_ACTIVITY_LIST	:'/encourage/v1/queryEncourageRule',
	ENCOURAGE_ACTIVITY_ADD	:'/encourage/v1/addEncourageRule',
	ENCOURAGE_ACTIVITY_UPDATE	:'/encourage/v1/saveUpdate',
	ENCOURAGE_ACTIVITY_DATAIL:'/encourage/v1/queryRelationship',
	ENCOURAGE_ACTIVITY_ADD_AUDIT:'/encourage/v1/saveAndAskApprove',
	//CPS商品管理
	CPS_PRODUCT_LIST:'/product/v1/queryPmsProductlist',
	CPS_PRODUCT_UPDATR:'/product/v1/updateProductType',
	CPS_PRODUCT_DELETE:'/product/v1/deleteProductType',
	CPS_PRODUCT_EXPORT:'/product/v1/exportProductlist',
	CPS_TYPE_DROP_DOWN:'/cpstype/v1/getCpstypeIdAndName',
	CPS_TYPE_SELECT_PAGE:'/cpstype/v1/getCpstypeIdAndNameList',
	//CPS分类管理
	CPS_TYPE_LIST:'/cpstype/v1/queryCpstype',
	CPS_TYPE_ADD:'/cpstype/v1/addCpstype',
	CPS_TYPE_UPDATE:'/cpstype/v1/updateCpstype',
	CPS_TYPE_DETAIL:'/cpstype/v1/queryCpstypeDetail',
	CPS_NO_GET:'/cpstype/v1/createId',
	CPS_TYPE_DELETE:'/cpstype/v1/deleteCpstype',
	CPS_TYPE_ENCOURAGE_ACTIVITY_ADD:'/cpstype/v1/addBaseEncourageRule',
	CPS_TYPE_ENCOURAGE_ACTIVITY_UPDATE:'/cpstype/v1/updateBaseEncourageRule',
	CPS_TYPE_ENCOURAGE_ACTIVITY_DETAIL:'/encourage/v1/queryEncourageRuleDetail',
	CPS_TYPE_ENCOURAGE_ACTIVITY_DELETE:'/cpstype/v1/deleteBaseEncourageRule',
	CPS_TYPE_ENCOURAGE_ACTIVITY_PUBULISH:'/encourage/v1/publicEncourage',
	CPS_TYPE_ENCOURAGE_SUBMIT_AUDIT:'/cpstype/v1/saveAndAskApprove',
	ENCOURAGE_SUBMIT_AUDIT:'/encourage/v1/askForApprove',
	BISSNESS_ENCOURAGE_AUDIT:'/encourage/v1/bizApprove',
	FINANCE_ENCOURAGE_AUDIT:'/encourage/v1/finApprove',
	//CPS订单管理
	CPS_ORDER_LIST:'/order/v1/queryOrders',
	CPS_ORDER_SETTLEMENT:'/order/v1/doOrderSettlement',
	CPS_ORDER_IMPORT:'/order/v1/importOrder',
	CPS_ORDER_DOWNLOAD_TEMP:'/resources/exceptionOrderImport.xlsx',
	CPS_ORDER_DOWNLOAD_ERROR_FILE:'/system/v1/downNormalFile?fileUrl=',
	CPS_ORDER_IMPORT_HIS:'/order/v1/getOrderImportLogs',
	//媒体管理
	//media list
	MEDIA_LIST:'/media/v1/getMedias',
	//media detail
	MEDIA_DETAIL:'/media/v1/detail',
	//media audit list
	MEDIA_AUDIT_LIST:'/media/v1/getApproveMedias',
	//media audit detai
	MEDIA_AUDIT_DETAIL:'/approve/v1/getApproves',
	//add black list
	ADD_BLACK_LIST:'/media/v1/setBlackList',
	//release black list
	RELEASE_BLACK_LIST:'/media/v1/releaseBlackList',
	//feeze
	FEEZE:'/media/v1/feeeze',
	//unFeeze
	UNFEEZE:'/media/v1/unFreeze',
	//black list
	BLACK_LIST:'/media/v1/getBlackListMedias',
	//add black list manual
	ADD_BLACK_LIST_MANUAL:'/media/v1/setBlackListByDomain',
	//recover Audit
	RECOVER_AUDIT:'/media/v1/reApprove',
	//promotion list
	PROMOTION_LIST:'/media/v1/getPromotePositions',

	//audit pass
	AUDIT_PASS_OR_NOPASS:'/media/v1/approve',

	//财务管理
	MEMBER_BILL_QUERY:'/financial/v1/getSettlements',
	MEMBER_SETLLEMENT_DETAIL_AUDIT:'/financial/v1/getSettlementDetailApproves',
	MEMBER_SETLLEMENT_DETAIL:'/financial/v1/getSettlementItems',
	APPLY_PURCHASE:'/financial/v1/getCommissionApplys',
	ACCOUNT_QUERY:'/financial/v1/getCommissionAccounts',
	FINANCE_CONFIG_ITEM_LIST:'/financial/v1/getCommissionConfig',
	FINANCE_CINFIG_ITEM_SAVE:'/financial/v1/updateCommissionConfig',
	FINANCE_BUSINESS_AUDIT:'/financial/v1/approveBiz',
	FINANCE_MANAGER_AUDIT:'/financial/v1/approveDirector',
	FINANCE_SUBMIT_BUSINESS_AUDIT:'/financial/v1/approveSubmit',
	FINANCE_USER_CONFIRM:'/financial/v1/memberConfirm',
	FINANCE_PURCHASE_CONFIRM:'/financial/v1/commissionApplyPayed',
	FINANCE_APPLY_AUDIT:'/financial/v1/commissionApplyAudit',
	FINANCE_EXPORTS:'/financial/v1/commissionApplyExport',
	FINANCE_REAUDIT:'/financial/v1/commissionReApply',

	//系统管理
	SYSTEM_CONFIG_QUERY:'/setting/v1/queryAll',
	SYSTEM_CONFIG_CREATE:'/setting/v1/addNewSetting',
	SYSTEM_CONFIG_DELETE:'/setting/v1/deleteSetting',
	SYSTEM_CONFIG_EDITE:'/setting/v1/modifySetting',

	//模板管理
	TEMPLATE_QUERY:'/template/v1/getAllTemplateList',
	TEMPLATE_ADD:'/template/v1/insertTemplate',
	TEMPLATE_EDIT:'/template/v1/updateTemplate',
	TEMPLATE_DELETE:'/template/v1/deleteTemplate',
	
	//报表管理
	CHANNEL_MARKET_DETAILS:'/report/v1/getChannelMarketDetails',
	CHANNEL_MARKET_DETAILS_EXPORT:'/report/v1/getChannelMarketDetailsExport',
	CHANNEL_MARKET_EFFECT_TIME_VIEW:'/report/v1/getChannelMarketEffectTimeView',
	CHANNEL_MARKET_EFFECT_TIME_VIEW_EXPORT:'/report/v1/getChannelMarketEffectTimeViewExport',
	CHANNEL_MARKET_EFFECT_MEDIA_VIEW:'/report/v1/getChannelMarketEffectMediaView',
	CHANNEL_MARKET_EFFECT_MEDIA_VIEW_EXPORT:'/report/v1/getChannelMarketEffectMediaViewExport',

	//帮助中心
	HELP_CENTER_TREEVIEW_NAME:'/faq/v1/queryFaqTypeList',
	HELP_CENTER_ADD_CATEGORY:'/faq/v1/addFaqType',
	HELP_CENTER_UPDATE_CATEGORY:'/faq/v1/modifyFaqTypeDetail',
	HELP_CENTER_DELTER_CATEGORY:'/faq/v1/deleteFaqType',
	HELP_CENTER_GET_FAQDETAILS:'/faq/v1/getFaqTypeDetail',
	HELP_CENTER_GET_FAQlIST:'/faq/v1/getFaqList',
	HELP_CENTER_SORT_FAQlIST:'/faq/v1/orderTypeFaq',
	HELP_CENTER_GET_FAQHOTIST:'/faq/v1/getFaqHotList',
	HELP_CENTER_MODIFY_SUMMARYCONTENT:'/faq/v1/modifySummaryContent',
	HELP_CENTER_GET_SUMMARYCONTENT:'/faq/v1/getSummaryContent'
};

