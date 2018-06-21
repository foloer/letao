
$(function(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
      // console.log(info);
      $(".category_left ul").html(template("firstTpl",info));
      renderSecond(info.rows[0].id)
      
    }
  })
  $(".category_left ").on("click","li",function(){
    $(this).addClass("now").siblings().removeClass("now");
    var id=$(this).data("id");
    renderSecond(id);
  })
  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        // console.log(info);
        $(".category_right ul ").html(template("secondTpl",info))
      }
    })
  }
})