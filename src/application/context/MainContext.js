'use strict';
/***********************************************************************
 * **********************************************************************
 */

function MainContext($state,$cookieStore,$timeout, apiService,ngNotify) {

    this.navLabel = '';

    this.helpCount = 24;

    this.msgCount = 0;

    this.notice = {show: false, content: '', sref: ''};

    this.menuInfoList = [];

    this.childMenuInfoList = [];

    this.activeMenu = {};

    this.activeSubMenu = {};

    this.userInfo = {};

    this.userPortrait = "";
    
    this.userName = "";
    

    
    this.execute = function() {
        this.userInfo = UserUtil.getLoginInfo();
    	this.parentContext.overflow = {overflow: 'hidden'};
        this.menuInfoList = MenuData.getMemberMenus();
        var currenctUrl = $state.current.url;
        if(currenctUrl == '/main.html') {
            $state.go('main.home');
            this.activeMenu =this.menuInfoList[0];
        } else {
        	var name = currenctUrl.split('/')[1].split('.')[0];
        	//特殊菜单
        	if(name =='home') {
        		name = 'memberList';
        	}
        	 for (var i in this.menuInfoList) {
                 if (name == this.menuInfoList[i].sref.split('.')[1]) {
                     this.activeMenu = this.menuInfoList[i];
                     for(var j in this.menuInfoList[i].subMenuList) {
                    	 if (name == this.menuInfoList[i].subMenuList[j].sref.split('.')[1]) {
                             this.activeSubMenu = this.menuInfoList[i].subMenuList[j];
                             break;
                         }
                     }
                     break;
                 } else {
                	 for(var j in this.menuInfoList[i].subMenuList) {
                         for(var k in this.menuInfoList[i].subMenuList[j].subMenuList) {
                             if (name == this.menuInfoList[i].subMenuList[j].subMenuList[k].sref.split('.')[1]) {
                                 this.activeMenu = this.menuInfoList[i];
                                 this.activeSubMenu = this.menuInfoList[i].subMenuList[j];
                                 break;
                             }
                         }
                     }
                 }
                
                
             }
        }
    };

    this.doActiveMenu = function(menuInfo) {
        if (menuInfo.parent) {
            for (var i in this.menuInfoList) {
                if (menuInfo.parent == this.menuInfoList[i].name) {
                    this.activeMenu = this.menuInfoList[i];
                    break;
                }
            }
            this.activeSubMenu = menuInfo;
        } else {
            for(var i in this.menuInfoList) {
                if (menuInfo.name == this.menuInfoList[i].name) {
                    this.activeMenu = this.menuInfoList[i];
                    break;
                }
            }
            if (this.activeMenu.subMenuList && 0 < this.activeMenu.subMenuList.length) {
                this.activeSubMenu = this.activeMenu.subMenuList[0]
            }
        }
    }.bind(this);

    this.openNotice = function(content, sref) {
        this.notice.show = true;
        this.notice.content = content;
        this.notice.sref = sref;
    };

    this.closeNotice = function() {
        this.notice.show = false;
        this.notice.content = '';
        this.notice.sref = '';
    };

    this.logout = function() {
        var promise = apiService.post(ApiDefines.LOGOUT);
        UserUtil.removeToken();
        UserUtil.removeLoginInfo();
        $state.go("login");
    };

    this.getChildMenu = function (menuInfo) {
        this.activeMenu = menuInfo;
    }.bind(this);

    this.goHome = function () {
    	   $state.go('main.home');
    	   var memberListInfo =  {
	            name: '会员管理',
	            sref: 'main.memberList'
	        };
	        this.doActiveMenu(memberListInfo);
    };
    
    this.goMenberAudit = function () {
 	   $state.go('main.memberAudit');
 	   var memberListInfo =  {
	            name: '会员管理',
	            sref: 'main.memberList'
	        };
	        this.doActiveMenu(memberListInfo);
    };
 
 this.goMenberList = function () {
	   $state.go('main.memberList');
	   var memberListInfo =  {
          name: '会员管理',
          sref: 'main.memberList'
      };
      this.doActiveMenu(memberListInfo);
 };
}

MainContext.extend(ContextSupport);
