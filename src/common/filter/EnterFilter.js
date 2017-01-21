function EnterFilter($sce){



	this.doFilter = function(input) {

		return $sce.trustAsHtml(input);
	}
}