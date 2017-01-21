'use strict';
/*******************************************************************************
 * 描述：动态分页指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function PagingComponent($compile, $parse, $log, $timeout, $window) {

	/**
	 * 设置控件环境上下文
	 */
	this.context = function(scope, element, attrs, transclude) {
	};
	/**
	 * 编译控件指令
	 */
	this.link = function(scope, element, attrs, controller) {

		//juedge whether use use specificsize attribute
		if(attrs.specificsize){
			var $size = new Number(attrs.specificsize);
		}else{
			var $size = new Number(PageConfig.INIT_PAGE_SIZE);
		}

		var total = attrs.total,index = attrs.index, searcher = attrs.searcher;
		var $index = $parse(index)(scope), $searcher = $parse(searcher)(scope);
		var $scope = element.scope();

		scope.$watch(total, function() {
			var $total = $parse(total)(scope);
			$scope.pages = [];
			for (var i = 0; i < Math.ceil($total / $size); i++) {
				$scope.pages.push({
					index : i + 1
				})
			}
            $scope.total = $total;
		});
        $scope.size = $size.toString();
        $scope.$watch("size", function() {
            $scope.pages = [];
            for (var i = 0; i < Math.ceil($scope.total / parseInt($scope.size)); i++) {
                $scope.pages.push({
                    index : i + 1
                })
            }
            $scope.index = 1;
            $scope.ceilingIndex = 5;
            $searcher($scope.index,$scope.size);
        });
		$scope.index = $index;
        $scope.myIndex = 1;
        $scope.ceilingIndex = 5;
        $scope.toFirst = function() {
            $scope.index = 1;
            $scope.ceilingIndex = 5;
            $searcher($scope.index,$scope.size);

            $scope.myIndex=1;
        };
        $scope.toLast = function() {
            $scope.index = $scope.pages.length;
            $scope.ceilingIndex = $scope.pages.length;
            $searcher($scope.index,$scope.size);

            $scope.myIndex = $scope.pages.length;
        };

		$scope.searchPrevious = function() {
            if(($scope.ceilingIndex == $scope.index + 4) && ($scope.index>1)){
                $scope.ceilingIndex--;
            }
			if ($scope.index > 1) {
				--$scope.index;
				$searcher($scope.index,$scope.size);
			}

			$scope.myIndex = $scope.index;

		};

		$scope.searchNext = function() {
            if(($scope.ceilingIndex == $scope.index) && ($scope.index<$scope.pages.length)){
                $scope.ceilingIndex++;
            }
			if ($scope.index < $scope.pages.length) {
				++$scope.index;
				$searcher($scope.index,$scope.size);
			}

			$scope.myIndex = $scope.index;
		};

		$scope.searchIndex = function(index) {
			$scope.index = index;
			$searcher($scope.index,$scope.size);

			$scope.myIndex = $scope.index;
		};

        $scope.toPage = function(myIndex){
        	if(myIndex>$scope.pages.length){

        	}else{
        		$scope.ceilingIndex = Math.min(Number(myIndex)+4,$scope.pages.length)
            	$scope.searchIndex(myIndex);
        	}
            
        }
	};

}