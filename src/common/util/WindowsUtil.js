'use strict';

function WindowsUtil() {
    this.caseId = '';
    this.caseArray = [];
}

WindowsUtil.getCaseId = function() {

    if(window.caseId != null) {
        this.caseId = window.caseId;
    }else{
        this.caseId =  window.location.search.substring(1).split('=')[1].split('&')[0];
    }
    return  this.caseId;
};

WindowsUtil.getHistoryCaseId = function() {

    if(window.historyId != null) {
        this.historyId = window.historyId;
    }else{
        if(window.location.search.substring(1).split('historyId').length==2){
            this.historyId =  window.location.search.substring(1).split('=')[2].split('&')[0];
        }else{
            return null;
        }
    }
    return  this.historyId;
};
WindowsUtil.getNextCaseId = function (caseId,codeKey,index) {
    var webStorageCache = new WebStorageCache();

    var listJson =  webStorageCache.get(codeKey);
    var quicklyList = JSON.parse(listJson);
    var nextIndex = Number(index)+1;
    if(nextIndex <= quicklyList.length) {
        window.location.search = "?caseId="+quicklyList[nextIndex-1].caseId+"&keyCode=" +codeKey +"&keyIndex=" +nextIndex,"_blank";
    } else {
        return false;
    }

  //  var caseQueryMode = window.location.search.split('&')[1].split('=')[1];
  //
  //
  //  caseQueryMode =  decodeURI(caseQueryMode);
  //
  //  var objModel =  JSON.parse(caseQueryMode);
  //  objModel.entityDTO.caseIndex = objModel.entityDTO.caseIndex +1;
  //  caseQueryMode =    JSON.stringify(objModel);
  ////  alert(caseQueryMode);
  //  window.location.search = "?caseId="+caseId+"&caseQueryMode=" +caseQueryMode,"_blank";
};

WindowsUtil.getUpCaseId = function (caseId,codeKey,index) {
    var webStorageCache = new WebStorageCache();

    var listJson =  webStorageCache.get(codeKey);
    var quicklyList = JSON.parse(listJson);
    var upIndex = Number(index)-1;
    if(upIndex >= 1) {
        window.location.search = "?caseId="+quicklyList[upIndex-1].caseId+"&keyCode=" +codeKey +"&keyIndex=" +upIndex,"_blank";
    } else {
        return false;
    }

    //var caseQueryMode = window.location.search.split('&')[1].split('=')[1];
    //
    //
    //caseQueryMode =  decodeURI(caseQueryMode);
    //
    //var objModel =  JSON.parse(caseQueryMode);
    //objModel.entityDTO.caseIndex = objModel.entityDTO.caseIndex -1;
    //caseQueryMode =    JSON.stringify(objModel);
    ////  alert(caseQueryMode);
    //window.location.search = "?caseId="+caseId+"&caseQueryMode=" +caseQueryMode,"_blank";
};
WindowsUtil.getQueryModel = function() {
    if(window.location.search.split('&').length==1) {
        return null;
    }
    var caseQueryString = window.location.search.split('&')[1].split('=')[1];

    return  caseQueryString;
};

WindowsUtil.getKeyIndex = function() {
    if(window.location.search.split('&').length==1) {
        return null;
    }
    var caseQueryString = window.location.search.split('&')[2].split('=')[1];

    return  caseQueryString;
};


WindowsUtil.getFuzzyPara = function() {

    if(window.fuzzyPara != null) {
        this.fuzzyPara = window.fuzzyPara;
    }else{
        this.fuzzyPara =  window.location.search.substring(1).split('=')[1]
    }

    return  decodeURI(this.fuzzyPara);
};


