$(function () {
    // ---------------------------- 切换登录和注册的盒子 ------------------------------------
    $('#goto-reg').click(function () {
        $('#login').hide().next().show();
    });

    $('#goto-login').click(function () {
        $('#login').show().next().hide();
    });

    // ---------------------------- 完成注册功能 --------------------------------
    // 1 监听注册表单的提交事件
    $('#register form').on('submit', function (e) {

        // 2 阻止默认行为
        e.preventDefault();
        // 3 获取输入的账号和密码
        var data = $(this).serialize(); // serialize是根据表单项的name属性获取值的，所以这里一定要检查表单项的name属性是否存在，值是否正确
        // console.log(data); // username=xxxx&password=yyy
        // 通过serialize得到的结果是一个字符串
        // 通过 new FormData() 得到的是一个对象，有文件上传的时候，才需要使用FormData
        // 4 ajax提交账号和密码到接口
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                // 5 根据接口返回的结果
                // 5.1 无论成功还是失败，都要给出一个提示
                // alert(res.message);
                layer.msg(res.message);
                // 5.2 成功了，显示登录的盒子，隐藏注册的盒子
                if (res.status === 0) {
                    $('#login').show().next().hide();
                }
            }
        });
        
    })

    // ---------------------------- 注册的表单验证 -------------------------------
    // 使用layui的内置模块，必须先加载
    // var layer = layui.layer;
    // var laypage = layui.laypage;
    var form = layui.form; // 加载表单模块，得到一个对象
    // console.log(form);
    // 调用form提供的方法
    form.verify({
        // 这里自定义验证规则
        // 键（验证规则）: 值（验证方法）
        // len: [/^[\S]{6,12}$/, '密码长度不对'],
        len: function (val) {
            // val 表示使用该验证规则的输入框的值
            // console.log(val);
            if (val.trim().length < 6 || val.trim().length > 12) {
                // return '提示'
                return '密码长度必须是6~12位';
            }
        },
        same: function (val) {
            // val 表示重复密码的值
            // 这里还需要一个密码框的值，获取方式如下
            var password = $('.pass').val();
            // 比较密码和重复密码
            if (val !== password) {
                return '两次密码不一致~~~';
            }
        }
    });

    // ------------------------------ 完成登录功能 --------------------------------
    // 1 监听登录表单的提交事件
    $('#login form').on('submit', function (e) {
        // 2 阻止默认行为
        e.preventDefault();
        // 3 ajax提交账号和密码
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(), // 必须检查表单项的name属性
            success: function (res) {
                // 4 根据服务器返回的结果
                    // 4.1 无论成功还是失败，都给出提示
                    // 4.2 如果登录成功，跳转到 /index.html页面（后台首页）
                // alert(res.message);
                layer.msg(res.message);
                if (res.status === 0) {
                    //  / 表示 big-event 根目录
                    // 登录成功，需要把token保存到 本地存储中
                    // localStorage.setItem(键, 值);
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        });
    })
    
});