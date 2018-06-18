
//发送ajax请求产生进度条
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
 
})

//二级分类的显示和隐藏
$(".child").prev().on("click",function(){
  $(this).next().slideToggle();
})
//显示和隐藏侧边栏
$(".icon_menu").on("click",function(){
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
})
//退除功能

