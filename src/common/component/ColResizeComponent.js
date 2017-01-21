'use strict';
/***********************************************************************
 * 描述：表尺寸适应指令<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function ColResizeComponent($compile, $parse, $log, $timeout, $window) {

    /**
     * 设置控件环境上下文
     */
    this.context = function(scope, element, attrs, transclude) {
    };

    /**
     * 编译控件指令
     */
    this.link = function(scope, element, attrs, controller) {
        setTimeout(function() {
            element.colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                onDrag: function() {
                    //trigger a resize event, so width dependent stuff will be updated
                    $(window).trigger('resize');
                }
            });

            var orderUtil = attrs.elColResize,$orderUtil = $parse(orderUtil)(scope),
                trigger = $orderUtil.trigger,orderDTOs = $orderUtil.orderDTOs,order = $orderUtil.order;

            for(var i = 0;i<order.length;i++){
                var item=order[i], th = element.find('th[col='+item+']'),orderIcon = th.find('.orderIcon');
                if(!orderIcon.length){
                    orderIcon = $('<a class="orderIcon" />').appendTo(th).data("order","");
                    var onclick = function(e){
                        var myOrderDTO = $(e.target).data('order');
                        $('th .orderIcon',element).removeClass("desc").removeClass("asc")
                        if(myOrderDTO == ''){
                            myOrderDTO = 'desc';
                        } else if(myOrderDTO == 'desc'){
                            myOrderDTO = 'asc';
                        } else if (myOrderDTO == 'asc'){
                            myOrderDTO = '';
                        }
                        $(e.target).addClass(myOrderDTO).data("order",myOrderDTO);
                        if(myOrderDTO){
                            $orderUtil.orderDTOs = [{propertyName: this,dir: myOrderDTO}];
                        } else {
                            $orderUtil.orderDTOs = [];
                        }

                        trigger();
                    }.bind(order[i])
                    //orderIcon
                    orderIcon.click(onclick);
                }
            }
        });
    };

}