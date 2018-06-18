//如果不是login页面,就需要发送ajax请求
if(location.href.indexOf("login.html")===-1){
  $.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    success:function(info){
  if(info.error){
  location.href="login.html";
  }
    }
  })
}


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
//退出功能
$(".icon_logout").on("click",function(){
  $("#logoutModal").modal('show');
})
$(".btn_logout").on("click",function(){
  $.ajax({
    type:'get',
    url:"/employee/employeeLogout",
    success:function(info){
if(info.success){
  location.href="login.html";
}
    }
  })
})

