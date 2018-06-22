

$(function () {
  function getHistory() {
    var reslut = localStorage.getItem("lt_history") || "[]";
    reslut = JSON.parse(reslut);
    // console.log(reslut);
    return reslut;
  };
  function render() {
    var history = getHistory();
    $(".lt_history").html(template("tpl", { rows: history }));
  }
  render();
  //  1. 清空数据
  $(".lt_history").on("click", ".btn_empty", function () {
    mui.confirm("你确定要清空所有的历史记录吗", "温馨提示", ["是", "否"], function (e) {
      // console.log(e);
      if (e.index === 0) {
        localStorage.removeItem("lt_history");
        render();
      }
      })
    })
    //2. 删除某一条数据
    $(".lt_history").on("click", ".btn_delete", function () {
      var id = $(this).data("id");
      mui.confirm("你确定要删除这条历史记录吗", "温馨提示", ["是", "否"],function(e){
        if(e.index===0){
          // 获取数组
          var history = getHistory();
          history.splice(id, 1);
          localStorage.setItem("lt_history", JSON.stringify(history));
          render();
        }
      })
    })
    // 3.增加功能
    $(".lt_search button").on("click", function () {
      var txt = $(".lt_search input").val();
      $(".lt_search input").val("");
      if (txt == "") {
        mui.toast('请输入搜索的内容');
        return;
      }
      var history = getHistory();
      var index = history.indexOf(txt);
      if (index > -1) {
        history.splice(index, 1);
      }
      if (history.length >= 10) {
        history.pop();
      }
      history.unshift(txt);
      localStorage.setItem("lt_history", JSON.stringify(history));
      render();
      location.herf="searchList.html?key="+txt;
    })
  })