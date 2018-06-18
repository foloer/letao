$(function () {
  $("form").bootstrapValidator({
  
    fields: {
      username: {
        //配置用户名的具体的校验规则
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            message: "用户名长度是3-9位",
            min: 3,
            max: 9
          },
          callback: {
            message: '用户名不正确'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户名密码不能为空"
          },
          stringLength: {
            message: "用户名密码长度是6-12位",
            min: 6,
            max: 12
          },
          callback:{
            message:"密码不正确"
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }

  })
  $("form").on("success.form.bv",function(e){
e.preventDefault();
$.ajax({
  type:"post",
  url:"/employee/employeeLogin",
  data:$("form").serialize(),
  success:function(info){
if(info.success){
  location.href="index.html";
}
if(info.error===1000){
  $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
}
if(info.error===1001){
  $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
}
  }
})
  })
$("[type='reset']").on("click",function(){
$("form").data("bootstrapValidator").resetForm(true);

})
})