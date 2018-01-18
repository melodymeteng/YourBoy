/**
 * Created by 腾 on 2017/12/9.
 */
//焦点事件开始
$(
    function () {
        $('.input_test').bind(
            {
                focus:function () {           //获取焦点函数
                    if(this.value==this.defaultValue){
                        this.value="";
                    }
                },blur:function () {		  //失去焦点函数
                if(this.value==""){
                    this.value=this.defaultValue;
                }
            }
            });
    })
//焦点事件结束
//导航菜单鼠标滑过事件

$('#nav li').hover(function () {
    $(this).find('.jnNav').show();
},function () {
    $(this).find('.jnNav').hide();
});
//导航菜单鼠标滑过事件结束
//轮播图开始
var prevIdx=0;
$('#jnBtn a').on('mouseover',function () {
    $this=$(this);
    $this.addClass('chos').siblings().removeChild('chos');
    if($this.index()>prevIdx){
        $('#JS_imgWrap')
    }
})

































//最新动态开始
$('.tooltip').on('mouseover',function (e) {
    this.currtitle=this.title;
    $('<div id="tip">'+this.currtitle+'</div>').appendTo('body').offset({
        left:e.pageX+20,
        top:e.pageY+20
    });
    $(this).attr('title','')
}).on('mousemove',function (e) {
    $('#tip').offset({
        left:e.pageX+20,
        top:e.pageY+20
    });
}).on('mouseout',function () {
    $('#tip').remove();
    $(this).attr('title',this.currtitle);
});












//最新动态结束