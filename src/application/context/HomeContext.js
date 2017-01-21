'use strict';
/***********************************************************************

 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function HomeContext($state,$cookieStore,$timeout, apiService,ngNotify,webStorageCache) {

    this.queryModel = {entityDTO:{}};

    this.getAuditMenberNum = function () {
    	var promise = apiService.post(ApiDefines.AUDIT_MEMBER_NUMBER,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.auditMenberNum = result.data.count;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    
    this.goAuditMenberNum = function () {
    	$state.go('main.memberAudit');
        var memberAuditInfo =  {
            name: '会员管理',
            sref: 'main.memberAudit'
        };
        this.doActiveMenu(memberAuditInfo);
    };
    
    this.getAuditMediaNum = function () {
    	var promise = apiService.post(ApiDefines.AUDIT_MEDIA_NUMBER,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.auditMediaNum = result.data.count;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    
    this.goAuditMediaNum = function () {
    	$state.go('main.mediaAudit');
        var auditMediaNumInfo =  {
            name: '媒体管理',
            sref: 'main.mediaAudit'
        };
        this.doActiveMenu(auditMediaNumInfo);
    };
    
    this.getUnsendMessageNum = function () {
    	var promise = apiService.post(ApiDefines.UNSEND_MESSAGE_NUMBER,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.unsendMessageNum = result.data.count;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    
    this.goUnsendMessageNum = function () {
    	$state.go('main.messageList',{"data":{"status":'0'}});
        var UnsendMessageNumInfo =  {
            name: '消息管理',
            sref: 'main.messageList'
        };
        this.doActiveMenu(UnsendMessageNumInfo);
    };
    
    this.getActivityCountNums= function () {
    	var promise = apiService.post(ApiDefines.ACTIVITY_COUNT_NUMBERS,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.todoSubmitNum = result.data.todoSubmitCount;
				this.todoApproveNum = result.data.todoApproveCount;
				this.todoModifyNum = result.data.todoModifyCount;
				this.pauseNum = result.data.pauseCount;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    
    this.goTodoSubmitNum = function () {
    	$state.go('main.adActiveList',{"data":{"status":'0'}});
        var TodoSubmitNumInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(TodoSubmitNumInfo);
    };
    
    this.goTodoApproveNum = function () {
    	$state.go('main.adActiveList',{"data":{"status":'1'}});
        var TodoApproveNumInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(TodoApproveNumInfo);
    };
    
    this.goTodoModifyNum = function () {
    	$state.go('main.adActiveList',{"data":{"status":'7'}});
        var TodoModifyNumInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(TodoModifyNumInfo);
    };
    
    this.goPauseNum = function () {
    	$state.go('main.adActiveList',{"data":{"status":'5'}});
        var PauseNumInfo =  {
            name: '推广管理',
            sref: 'main.adActiveList'
        };
        this.doActiveMenu(PauseNumInfo);
    };
    
    this.getEncourageCountNums = function (){
    	var promise = apiService.post(ApiDefines.ENCOURAGE_COUNT_NUMBERS,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.waitApproveActiveEncourage = result.data.waitApproveActiveEncourage;
				this.waitApproveBaseEncourage = result.data.waitApproveBaseEncourage;
				this.waitModifyActiveEncourage = result.data.waitModifyActiveEncourage;
				this.waitModifyBaseEncourage = result.data.waitModifyBaseEncourage;
				this.waitSubmitActiveEncourage = result.data.waitSubmitActiveEncourage;
				this.waitSubmitBaseEncourage = result.data.waitSubmitBaseEncourage;
				this.stopBaseEncourage = result.data.stopBaseEncourage;
				this.stopActiveEncourage = result.data.stopActiveEncourage
				this.waitBizApproveBaseActiveEncourage=result.data.waitBizApproveBaseActiveEncourage;
				this.waitBizApproveAmountActiveEncourage = result.data.waitBizApproveAmountActiveEncourage;
				this.waitFinApproveBaseActiveEncourage = result.data.waitFinApproveBaseActiveEncourage;
				this.waitFinApproveAmountActiveEncourage =result.data.waitFinApproveAmountActiveEncourage;
				
				this.waitBizApproveBaseEncourage = result.data.waitBizApproveBaseEncourage;
				this.waitFinApproveBaseEncourage = result.data.waitFinApproveBaseEncourage;
				this.waitSubmitbaseActiveEncourage =result.data.waitSubmitbaseActiveEncourage;
				this.waitSubmitrAmountActiveEncourage =result.data.waitSubmitrAmountActiveEncourage;
				this.waitModifyBaseActiveEncourage =result.data.waitModifyBaseActiveEncourage;
				this.waitModifyAmountActiveEncourage =result.data.waitModifyAmountActiveEncourage;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    
    this.goWaitApproveActiveEncourage = function (type,status) {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":status,"type":type}});
        var waitApproveActiveEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitApproveActiveEncourageInfo);
    };
    
    this.goWaitApproveBaseEncourage = function (status) {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":status,"type":"1"}});
        var waitApproveBaseEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitApproveBaseEncourage);
    };
    
    this.goWaitModifyActiveEncourage = function (type) {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'4',"type":type}});
        var waitModifyActiveEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitModifyActiveEncourageInfo);
    };
    
    this.goWaitModifyBaseEncourage = function () {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'4',"type":"1"}});
        var waitModifyBaseEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitModifyBaseEncourageInfo);
    };
    
    this.goWaitSubmitActiveEncourage = function (type) {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'0',"type":type}});
        var waitSubmitActiveEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitSubmitActiveEncourageInfo);
    };
    
    this.goWaitSubmitBaseEncourage = function () {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'0',"type":"1"}});
        var waitSubmitBaseEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(waitSubmitBaseEncourageInfo);
    };
    
    this.goStopBaseEncourage = function () {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'7',"type":"1"}});
        var stopBaseEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(stopBaseEncourageInfo);
    };
    
    this.goStopActiveEncourage = function () {
    	$state.go('main.cpsActivityEncourageManage',{"data":{"status":'7',"type":"2"}});
        var stopActiveEncourageInfo =  {
            name: '推广管理',
            sref: 'main.cpsActivityEncourageManage'
        };
        this.doActiveMenu(stopActiveEncourageInfo);
    };
    
    this.getNotificationCountNums = function () {
    	var promise = apiService.post(ApiDefines.NOTICE_COUNT_NUMBERS,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.approveRefuse = result.data.approveRefuse;
				this.waitSubmit = result.data.waitSubmit;
				this.waitApprove = result.data.waitApprove;
				this.pause = result.data.pause;
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };
    this.getSettlementsStatics = function () {
        var promise = apiService.post(ApiDefines.SETTLESTATISTICS_COUNT_NUMBERS,
                angular.extend(this.queryModel));
        promise.then(function(result) {
            if ('1' == result.code) {
                this.settlementsStatics = result.data;
            } else {
                // .....
                this.popAlert(result.message, 'error');
            }
        }.bind(this));
    };  
    this.paymentApplyStatics = function () {
        var promise = apiService.post(ApiDefines.PAYMENTAPPLYSTATICS_COUNT_NUMBERS,
                angular.extend(this.queryModel));
        promise.then(function(result) {
            if ('1' == result.code) {
                this.paymentApplyStatics = result.data;
            } else {
                // .....
                this.popAlert(result.message, 'error');
            }
        }.bind(this));
    };
    this.goApproveRefuse = function () {
    	$state.go('main.notificationList',{"data":{"status":'2'}});
        var approveRefuse =  {
            name: '推广管理',
            sref: 'main.notificationList'
        };
        this.doActiveMenu(approveRefuse);
    };
    
    this.goWaitSubmit = function () {
    	$state.go('main.notificationList',{"data":{"status":'0'}});
        var waitSubmit =  {
            name: '推广管理',
            sref: 'main.notificationList'
        };
        this.doActiveMenu(waitSubmit);
    };
    
    this.goWaitApprove = function () {
    	$state.go('main.notificationList',{"data":{"status":'1'}});
        var waitApprove =  {
            name: '推广管理',
            sref: 'main.notificationList'
        };
        this.doActiveMenu(waitApprove);
    };
    
    this.goPause = function () {
    	$state.go('main.notificationList',{"data":{"status":'6'}});
        var pause =  {
            name: '推广管理',
            sref: 'main.notificationList'
        };
        this.doActiveMenu(pause);
    };
    
    this.goWaitBAudit = function () {
    	$state.go('main.memberBillQuery',{"data":{"status":'1'}});
        var pause =  {
            name: '财务管理',
            sref: 'main.memberBillQuery'
        };
        this.doActiveMenu(pause);
    };
	    
	this.goWaitFAudit = function () {
		$state.go('main.memberBillQuery',{"data":{"status":'2'}});
        var pause =  {
            name: '财务管理',
            sref: 'main.memberBillQuery'
        };
        this.doActiveMenu(pause);
    };
    
    this.goWaitUserConf = function () {
    	$state.go('main.memberBillQuery',{"data":{"status":'3'}});
        var pause =  {
            name: '财务管理',
            sref: 'main.memberBillQuery'
        };
        this.doActiveMenu(pause);
    };
    
    this.goWaitAuditPay = function () {
    	$state.go('main.applyPurchase',{"data":{"status":'0'}});
        var pause =  {
            name: '财务管理',
            sref: 'main.applyPurchase'
        };
        this.doActiveMenu(pause);
    };
    
    this.goWaitPay = function (){
    	$state.go('main.applyPurchase',{"data":{"status":'2'}});
        var pause =  {
            name: '财务管理',
            sref: 'main.applyPurchase'
        };
        this.doActiveMenu(pause);
    };

    
    this.execute = function() {
    	this.roleCode = UserUtil.getUserRole();
    	this.getAuditMenberNum();
    	this.getAuditMediaNum();
    	this.getUnsendMessageNum();
    	this.getActivityCountNums();
    	this.getEncourageCountNums();
    	this.getNotificationCountNums();
        this.getSettlementsStatics();
        this.paymentApplyStatics();
    };

}

HomeContext.extend(ContextSupport);
