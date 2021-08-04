// 全局变量，加载layui的form模块
var form = layui.form;

function renderUser () {
    // 获取用户信息，获取之后，为表单赋值
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                // 获取数据成功，数据是 res.data
                // 为表单赋值（id、username、nickname、email）
                // $('input[name="id"]').val(res.data.id);
                // $('input[name="username"]').val(res.data.username);
                // $('input[name="nickname"]').val(res.data.nickname);
                // $('input[name="email"]').val(res.data.email);

                // 使用layui提供的快速为表单赋值
                // form.val('abc', {
                //     id: 2232,
                //     username: 'laotang12345',
                //     nickname: 'aaaa',
                //     email: 'xxx'
                // });
                form.val('abc', res.data);
            }
        }
    });
}

$(function () {
    // ----------------  设置input的value值（数据回填、为表单赋值） ----
    renderUser();


    // ---------------- 监听表单提交事件，完成信息更新 ----------------
    $('form').on('submit', function (e) {  
        // 1、阻止表单提交行为
        e.preventDefault();
        // 2、收集表单各项的值
        var data = $(this).serialize(); // serialize方法不能收集 禁用元素的值
        // console.log(data);
        // return;
        // 3、Ajax提交给接口
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                // 4、完成更新之后—？
                // 4.1 提示一下
                layer.msg(res.message);
                // 4.2 更新欢迎语，调用父页面的一个函数 getUserInfo();
                window.parent.getUserInfo();
            }
        });
        
    })

    // ---------------- 重置 -------------------------------------
    $('button[type="reset"]').click(function (e) {
        // 阻止默认清空表单行为
        e.preventDefault();
        // 恢复成和没改之前一样
        renderUser();
    });
});