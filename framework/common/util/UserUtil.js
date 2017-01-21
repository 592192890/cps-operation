
function UserUtil() {}

UserUtil.saveLoginInfo = function(loginInfo) {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	$cookieStore.remove('current.loginInfo');
	$cookieStore.put('current.loginInfo', loginInfo);
};

UserUtil.getLoginInfo = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	return $cookieStore.get('current.loginInfo');
};

UserUtil.removeLoginInfo = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	$cookieStore.remove('current.loginInfo');
};

UserUtil.getUserId = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	var loginInfo = $cookieStore.get('current.loginInfo').id;
	if (loginInfo) {
		return loginInfo.id;
	}
	return null;
};

UserUtil.getUserRole = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	var loginInfo = $cookieStore.get('current.loginInfo');
	if (loginInfo) {
		return loginInfo.role;
	}
	return null;
};

UserUtil.saveToken = function(token) {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	$cookieStore.remove('current.userToken');
	$cookieStore.put('current.userToken', token);
};

UserUtil.getToken = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	return $cookieStore.get('current.userToken');
};

UserUtil.removeToken = function() {
	var manager = ManagerFactory.newInstance();
	var $cookieStore = manager.getCookieStore();
	$cookieStore.remove('current.userToken');
};

UserUtil.getGuide = function(guideKey) {
    var manager = ManagerFactory.newInstance();
    var $cookieStore = manager.getCookieStore();
    return $cookieStore.get(guideKey);
};

UserUtil.setGuide = function(guideKey) {
    var manager = ManagerFactory.newInstance();
    var $cookieStore = manager.getCookieStore();
    return $cookieStore.put(guideKey,'1');
};

UserUtil.saveMenus=function(menus){
    localStorage.setItem("user_menus",menus);
};
UserUtil.saveMenuBtn=function(menuBtn){
    localStorage.setItem("user_menus_btns",menuBtn);
};
UserUtil.checkHasMenu=function(currentName){
    var menusTemp=localStorage.getItem("user_menus");
    if(currentName && currentName!="" && menusTemp && menusTemp!=""){
        var menus=JSON.parse(menusTemp);
        for(var i=0;i<menus.length;i++){
            if(menus[i].resCode==currentName){
                return true;
            }
        }
    }
    return false;
};
UserUtil.getViewAllProgram=function(currentName){
    var hasBtn={};
    var menusTemp=localStorage.getItem("user_menus");
    var menusBtnTemp=localStorage.getItem("user_menus_btns");
    if(currentName && currentName!="" && menusTemp && menusBtnTemp && menusBtnTemp!="" && menusTemp!=""){
        var menusBtn=JSON.parse(menusBtnTemp);
        if(menusBtn[currentName]){
            menusBtn[currentName].forEach(function(item,i){
                hasBtn[item.resCode]=item;
            });
        }
    }
    return hasBtn;
};


