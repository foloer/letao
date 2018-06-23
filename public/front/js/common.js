
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
  });
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