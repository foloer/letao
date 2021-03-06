$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
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
  };
  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 5
      },
      success: function (info) {
        $(".dropdown-menu").html(template("tpl2", info));
      }
    })
  })
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".drop-text").text(txt);
    var id = $(this).data("id");
    $("[name='categoryId']").val(id);
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      console.log(data);
      $(".img_box img").attr("src", data.result.picAddr);

      $('[ name="brandLogo"]').val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")

    }


  });
  $("form").bootstrapValidator({
    excluded: [],
    //指定小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验的规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请选择二级分类的名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择二级分类的图片'
          }
        }
      }
    }
  });
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      success: function (info) {
        if(info.success){
          page = 1;
          render();
          $("form").data("bootstrapValidator").resetForm(true);
          $(".drop-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");
          $("#addModal").modal("hide");
        }
       
      }
    });
  })
})