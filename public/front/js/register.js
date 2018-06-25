$(function () {


  $(".getCode").on("click", function () {
    var mobile = $('[name="mobile"]').val();
    if (mobile === "") {
      mui.toast("手机号不能为空");
      return;
    };
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast("手机格式有误");
      return;
    }

    $(this).text("发送中....").prop("disabled", true).addClass("disabled");
    $.ajax({
      type: 'get',
      url: '/user/vCode',
      success: function (info) {
        console.log(info);
        var count = 5;
        var timeId = setInterval(function () {
          count--;
          $(".getCode").text(count + "秒后发送");
          if (count <= 0) {
            clearInterval(timeId);
            $(".getCode").text("再次发送").prop("disabled", false).removeClass("disabled");
          }
        }, 1000)

      }
    })
  })
  $(".btn_register").on('click', function () {
    var username = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    var mobile = $('[name="mobile"]').val();
    var vCode = $('[name="vCode"]').val();
    var regpass = $("#regpass").val();
    if (!username) {
      mui.toast("用户名不能为空");
      return;
    }
    if (!password) {
      mui.toast("密码不能为空");
      return;
    }
    if (password != regpass) {
      mui.toast("密码与确认密码不一致");
      return;
    }
    if (mobile === "") {
      mui.toast("手机号不能为空");
      return;
    };
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast("手机格式有误");
      return;
    }
    if (!/^\d{6}$/.test(vCode)) {
      mui.toast("验证码格式错误");
      return;
    }
    $.ajax({
      type: 'post',
      url: "/user/register",
      data: $("form").serialize(),
      success: function (info) {
        console.log(info);
        if (info.error) {
          mui.toast(info.message);
        }
        if (info.success) {
          mui.toast("恭喜你,注册成功3秒后跳转到登录页 ");
          setTimeout(function () {
            location.href = "login.html";
          }, 3000)
        }
      }
    })
  })


})