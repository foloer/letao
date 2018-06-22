
$(function () {
  function getSearch() {
    var search = location.search;
    // 转回中文
    search = decodeURI(search);

    search = search.slice(1);
    // console.log(search)
    var arr = search.split("&");
    //  console.log(arr)

    var obj = {};
    arr.forEach(function (e, i) {
      var k = e.split("=")[0];
      var v = e.split("=")[1];
      obj[k] = v;
    })
    return obj;
  }
  function render() {
    $(".product").html('<div class="loading"></div>');
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
    } else {
      console.log("不需要");
    }
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (info) {
        setTimeout(function(){
          $(".product").html(template("tpl", info));
        },1000)
      }
    })
  }
  var page = 1;
  var pageSize = 10;
  var key = getSearch().key;

  $(".lt_search input").val(key);
  render();
  $(".lt_search button").on("click", function () {
    $(".sort li").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    key = $(".lt_search input").val();
    render();

  })
  $(".sort li[data-type]").on("click", function () {
    // console.log(111);
    var $this = $(this);
    if (!$this.hasClass("now")) {
      $(this).addClass("now").siblings().removeClass("now");
      $(".sort li span").addClass(" fa-angle-down").removeClass("fa-angle-up");
    } else {
      $(this).find("span").toggleClass(" fa-angle-down").toggleClass(" fa-angle-up");
    }
    render();
  })
})