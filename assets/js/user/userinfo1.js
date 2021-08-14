// 加载form模块 调用form模块的方法 更好的回填数据
var form = layui.form;

function renderUser() {


    // 发送请求获取用户信息 回填页面数据
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status === 0) {
                // $('input[name=id]').val(res.data.id);
                // $('input[name=username]').val(res.data.username);
                // $('input[name=nickname]').val(res.data.nickname);
                // $('input[name=email]').val(res.data.email);
                // val方法第一个参数是 对应表单 属性 lay-filter 的值。 res。data对象的各项 键 要跟input表单里面name值一样
                form.val('abc', res.data);
            }

        },
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        complete: function(xhr) {
            console.log(xhr);
            // 如果token过期或者失败了跳转页面
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                // window表示当前窗口
                window.parent.location.href = '/login.html';
            }
        }
    })
}

$(function() {
    // 数据回填 渲染页面
    renderUser();


    // ------------------------监听表单提交事件 完成用户信息更新--------------------
    $('form').on('submit', function(e) {
        //    阻止默认行为
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            // 表单数据  serialize方法 收集不到 被禁用的表单val值
            data: $(this).serialize(),

            success: function(res) {

                if (res.status === 0) {
                    // 弹出提示
                    layer.msg(res.message);
                    // 更新父页面的欢迎语 调用父级窗口的 函数 getuserinfo方法
                    window.parent.getUserInfo();
                }

            },
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            complete: function(xhr) {
                console.log(xhr);
                // 如果token过期或者失败了跳转页面
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    localStorage.removeItem('token');
                    // window表示当前窗口
                    window.parent.location.href = '/login.html';
                }
            }

        })
    });


    // ----------------重置按钮 功能 恢复原来的信息---------------
    $('button[type="reset"]').on('click', function(e) {
        // 阻止清空表单的默认行为
        e.preventDefault();
        // 恢复默认的数据 调用渲染用户数据函数
        renderUser();
    })


})