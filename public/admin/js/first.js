$(function () {
  var page = 1;
  var pageSize = 5;
  render()
  function render() {
    $.ajax({
      type: "get",
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $("tbody").html(template("tpl", info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: "small",
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }
  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");
  })
  $("form").bootstrapValidator({
    //指定小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验的规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能空'
          }
        }
      }
    }
  });
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("form").serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          page = 1;
          render();
          $("#addModal").modal("hide");
          $("form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})