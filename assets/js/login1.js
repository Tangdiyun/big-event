$(function() {
    // 入口函数
    // 给注册登录盒子点击超链接 做一个切换
    $("#goto-reg").on('click', function() {
        $("#login").hide().next().show();
    })
    $('#goto-login').on('click', function() {
        $("#login").show().next().hide();
    })

    // 2给注册盒子的表单添加提交时间
    $("#register form").on("submit", function(e) {
        // 阻止默认行为
        e.preventDefault();
        var data = $(this).serialize(); //serialize是根据表单项的name属性获取值的，所以这里一定要检查表单项的name属性是否存在，值是否正确
        // console.log(data); // username=xxxx&password=yyy
        console.log(data);
        // 发送ajax请求
        $.ajax({
            type: "post",
            // 给线上的服务器发送请求
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function(res) {
                // 无论成功失败弹出提示
                alert(res.message);
                // 成功后显示登录盒子 隐藏注册盒子
                if (res.status == 0) {
                    $("#login").show().next().hide();
                }

            }

        })
    })

})