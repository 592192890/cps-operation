'use strict';

function AdditionalOrderSettleContext($state,$cookieStore,$timeout, apiService) {

    this.queryModel = {entityDTO:{}};
    

    this.execute = function() {
    };
    
    this.settlement = function () {
    	var promise = apiService.post(ApiDefines.CPS_ORDER_SETTLEMENT,
				angular.extend(this.queryModel));
		promise.then(function(result) {
			if ('1' == result.code) {
				this.popAlert('结算成功', 'success');		
			} else {
				// .....
				this.popAlert(result.message, 'error');
			}
		}.bind(this));
    };

}

AdditionalOrderSettleContext.extend(ContextSupport);
