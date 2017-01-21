'use strict';

function ViewPictureContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    


    this.execute = function() {
    	this.picName = this.$parent.picName;
    	
    };
    
 
    this.checkedRows = [];

    this.checkAllRows = function(){
        if(this.checkedRows.length == this.$parent.piccArray.length){
            this.checkedRows = [];
        } else {
            this.checkedRows = [].concat(this.$parent.piccArray);
        }
    }.bind(this);

    this.checkRow = function(row){
        var index = this.checkedRows.indexOf(row);
        if(index != -1){
            this.checkedRows.splice(index,1);
        } else {
            this.checkedRows.push(row);
        }
    };
    
    this.downloadPic = function () {
    	for(var i = 0;i < this.checkedRows.length; i++){
    		window.open('http://'+ window.location.host + ApiDefines.CPS_ORDER_DOWNLOAD_ERROR_FILE + this.checkedRows[i].url);
    		
		};
    };
    

	
    this.close = function () {
    	 this.$close();
    };

}

ViewPictureContext.extend(ContextSupport);
