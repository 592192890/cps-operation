
//从input中高亮显示phrase中内容
// ng-bind-html="currentWork.description | elhighlight : "
 function ElHighlightFilter($sce){
	this.doFilter = function(input, phrase) {


		if('string' == (typeof input) ){
			if (phrase) {
                for(var i=0;i<phrase.length;i++){
                var relapceWord=phrase[i];
				input = input.replace(new RegExp('('+ relapceWord + ')', 'gi'), '<span class="highlight">$1</span>');
                }
			}else{
				input = '<span class="highlight">'+input+'</span>';
			}
			return $sce.trustAsHtml(input);	
		}else {
			return '';
		}

	}
     

}