
$(function () {
  var page = 1;
  var pageSize = 4;
  var key = getSearch().key;
  $(".lt_search input").val(key);
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          page = 1;
          render(function (info) {
            $(".product").html(template("tpl", info));
            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            mui(".mui-scroll-wrapper").pullRefresh().refresh(true);
          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        callback: function () {
          page++;
          render(function (info) {
            $(".product").append(template("tpl", info));
            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(info.data.length === 0);

          });
        }
      }
    }
  });

  function render(callback) {
    // $(".product").html('<div class="loading"></div>');
    var obj = {
      proName: key,
      page: page,
      pageSize: pageSize
    };
    var $select = $(".sort li.now");
    if ($select.length > 0) {
      var type = $select.data("type");
      var value = $select.find("span").hasClass("fa-angle-down") ? 2 : 1;
      obj[type] = value;
    }

    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (info) {
        console.log(info);
        setTimeout(function () {
          callback(info);
        }, 1000)
      }
    })
  }
  $(".lt_search button").on("click", function () {
    $(".sort li").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    key = $(".lt_search input").val();
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

  })
  $(".sort li[data-type]").on("tap", function () {
    // console.log(111);
    var $this = $(this);
    if (!$this.hasClass("now")) {
      $(this).addClass("now").siblings().removeClass("now");
      $(".sort li span").addClass(" fa-angle-down").removeClass("fa-angle-up");
    } else {
      $(this).find("span").toggleClass(" fa-angle-down").toggleClass(" fa-angle-up");
    }
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
  })
})