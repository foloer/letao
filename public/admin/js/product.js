$(function () {
  var page = 1;
  var pageSize = 5;
  var imgs = [];
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info)
        $("tbody").html(template("tpl", info));
        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: "small",
          itemTexts: function (type, page) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          tooltipTitles: function (type, page) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          useBootstrapTooltip: true,
          useBootstrapTooltipOptions: {
            placement: "top",
          },
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  };
  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info)
        $(".dropdown-menu").html(template("tpl2", info));
      }
    })
  });
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".drop-text").text(txt);
    var id = $(this).data("id");
    $("[ name='brandId']").val(id);
    $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");

  });
  $("#fileupload").fileupload({

    done: function (e, data) {
      if (imgs.length >= 3) {
        return;
      }
      imgs.push(data.result);
      $(".img_box").append(' <img src="' + data.result.picAddr + '" width="100" alt="">')
      if (imgs.length === 3) {
        $("form").data("bootstrapValidator").updateStatus("tips", "VALID");
      } else {
        $("form").data("bootstrapValidator").updateStatus("tips", "INVALID");
      }
    }
  });
  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品的描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品的库存"
          },
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: "请输入正确的库存(1-9999)"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请选择商品的尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺码(33-50)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的现价"
          }
        }
      },
      tips: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    var param=$("form").serialize();
    param+="&picName1="+imgs[0].picName+"&&picAddr1="+imgs[0].picAddr;
    param+="&picName2="+imgs[1].picName+"&&picAddr2="+imgs[1].picAddr;
    param+="&picName3="+imgs[2].picName+"&&picAddr3="+imgs[2].picAddr;
  $.ajax({
    type:"post",
    url:"/product/addProduct",
    data:param,
    success:function(info){
      $("addModal").modal("hide");
      page=1;
      render();
      $("form").data("bootstrapValidator").resetForm(true);
      $(".drop-text").text("请选择二级分类");
      $(".img_box img").remove();
      imgs=[];
    }
  })
  })
})