
$(function () {
  var productId = getSearch().productId;
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    success: function (info) {
      // console.log(info);

      $(".mui-scroll").html(template("tpl", info));
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      $(".proSize span ").on("click", function () {
        $(this).addClass("now").siblings().removeClass('now');
      });
      mui(".mui-numbox").numbox()
    }
  });

  // 加入购物车
  $(".add_cart").on("click", function () {
    // console.log(1111);
    var size = $(".proSize span.now").text();
    var num = $(".mui-numbox-input").val();
    if (!size) {
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      type: "post",
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      success: function (info) {
        console.log(info);
        if (info.error) {
          location.href = "login.html";
        }
        if (info.success) {
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
            if(e.index===0){
              location.href = "cart.html";
            }
          })
          
        }

      }

    })
  })
})