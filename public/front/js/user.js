$(function () {


  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    success: function (info) {
      // console.log(info);
      if (info.error) {
        window.location.href = "login.html";
      }
      // =========坑=======成功了直接返回用户的信息 没有success属性
      $(".userinfo").html(template("tpl", info));

    }
  })
  // 退出功能
  $(".btn_logout").on("click", function () {
    // console.log(111)
    $.ajax({
      type: 'get',
      url: '/user/logout',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          location.href = "login.html"
        }

      }
    })
  })
})