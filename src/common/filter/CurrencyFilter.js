//货币转换
function ElCurrencyFilter() {

	this.doFilter = function(amt, currency) {
		//console.log("currency:"+currency);
		if ('CNY' == currency) {
			return amt+'人民币';
		} else if ('USD' == currency) {
			return amt+'美元';
		} else {
			return amt+'不支持的币种';
		}
	}
}