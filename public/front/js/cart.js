
$(function () {
  // 先下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        callback: function () {
          $.ajax({
            type: 'get',
            url: "/cart/queryCart",
            success: function (info) {
              console.log(info);

              setTimeout(function () {
                if (info.error) {
                  location.href = "login.html?back=" + location.href;
                }
                $("#OA_task_2").html(template("tpl", { rows: info }));
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000)
            }
          })
        }
      }
    }
  });
  // 删除功能
  $("#OA_task_2").on("tap", ".btn_delete", function () {
    // console.log(111);
    var id = $(this).data("id");
    mui.confirm("你确定要删除这件商品吗", "温馨提示",["是", "否"], function (e) {
      if (e.index === 0) {
        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: id
          },
          success: function (info) {
            console.log(info);
            if (info.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }

    })

  });
  // 计算总金额
  $("#OA_task_2").on("change", '.ck', function () {
    var total = 0
    $(".ck:checked").each(function () {
      total += $(this).data("price") * $(this).data("num");
      $(".lt_money span").text(total.toFixed(2));
    })

  });
  //   修改功能
 $("#OA_task_2").on("tap", ".btn_edit",function(){
   var data=this.dataset;
   var html=template("tpl2",data);
   html=html.replace(/\n/g,'');
   mui.confirm( html,"编辑商品",["确定","取消"],function(e){
    if(e.index===0){
      var id=data.id;
      var num=$(".mui-number-input").val();
      var size= $(".proSize span.now").text();
      $.ajax({
        type:'post',
        url:"/cart/updateCart",
        data:{
          id:id,
          size:size,
          num:num
        },
        success:function(info){
          console.log(info);
          if(info.success){
            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
          }
        }
      })
    }
   });
   mui(".mui-numbox").numbox();
   $(".proSize span").on("click",function(){
     $(this).addClass("now").siblings().removeClass("now");
   })
  
 }) 
})