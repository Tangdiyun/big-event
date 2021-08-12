$(function() {
    // 入口函数
    // 给注册登录盒子点击超链接 做一个切换-------------
    $("#goto-reg").on('click', function() {
        $("#login").hide().next().show();
    })
    $('#goto-login').on('click', function() {
        $("#login").show().next().hide();
    })

    // 2给注册盒子的表单添加提交事件--------------------------
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
                // 解决跨域方案是 服务器设置了响应头 access-control-allow-origin 所以前端ajax里面不用jsonp

        })
    })


    // -----------------验证注册--------------
    // 先加载layui的内置对象 form 然后自定义 验证规则
    // 使用layui的内置模块，必须先加载
    // var layer = layui.layer;
    // var laypage = layui.laypage;
    var form = layui.form; // 加载表单模块，得到一个对象
    // 调用verify方法 参数是一个对象 键 是验证规则名 值是验证方法 （可以是数组跟函数）
    form.verify({
        // 如果值是一个数组，数组里面第一个值是一个正则表达式， 第二个值 是一个字符串 做一个提示
        // 这里自定义验证规则
        // 键（验证规则）: 值（验证方法）
        // len: [/^[\S]{6,12}$/, '密码长度不对'],
        len: function(val) {
            // val 表示使用该验证规则的输入框的值 trim()是去掉两边的空格
            // console.log(val);
            if (val.trim().length < 6 || val.trim().length > 12) {
                // return '提示'
                return '密码长度必须是6~12位';
            }
        },
        same: function(val) {
            // val 表示重复密码的值
            // 获取pass 表单的值
            var password = $(".pass").val();
            // 判断val 是否等于pass 表单里面的值 然后返回一个提示
            if (val !== password) {
                return "密码长度不一致~~";
            }
        }

    });

    // 完成登录功能----------------------------------
    // 1监听登录表单提交事件
    // 2阻止默认行为
    // 3ajax提交账号密码
    // 4根据服务器返回的结果
    // 4.1成功登录 跳转到index.html页面（后台首页）
    // 4.2失败 给一个提示
    $("#login form").on("submit", function(e) {
        e.preventDefault();
        // 获取所有表单值
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: data,
            success: function(res) {
                // 无论成功失败给一个提示
                console.log(res.message);
                if (res.status == 0) {
                    // 登录成功，需要把token保存到 本地存储中
                    // localStorage.setItem(键, 值);
                    localStorage.setItem('token', res.token);
                    // 跳转连接
                    location.href = '/index.html';
                }
            }
        })
    })
});