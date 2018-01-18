/**
 * Created by 腾 on 2017/12/9.
 */


$('.color_change img').on('click',function () {
    $(this).addClass('hover').parent().siblings().find('img').removeClass('hover');
    var $src=$(this).attr('src');
    //'images/pro_img/green.jpg'==>'images/pro_img/green_one_small.jpg'     拼接
    var i=$src.indexOf('.');// 找到那个.的索引   21 substring
    var $path=$src.substring(0,i);
    var $format=$src.substring(i);
    $('#bigImg').attr('src',$path+"_one_small"+$format);

    var $color=$path.replace('images/pro_img/','');
    $('.imgList li').addClass('hide');
    $('.imgList_'+$color).removeClass('hide');
});
$('.imgList li img').on('click',function () {
    var $src=$(this).attr('src');
    var i=$src.indexOf('.');
    var $path=$src.substring(0,i);
    var $format=$src.substring(i);
    $('#bigImg').attr('src',$path+'_small'+$format);
});