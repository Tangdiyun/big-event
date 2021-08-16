$(function() {
    // ----------------------表单验证-------------------
    // 加载模块
    let form = layui.form;
    // 调用模块的内置方法
    form.verify({
        // 1密码长度6-12
        len: [/^[\S]{6,12}$/, '密码长度不够'],
        // 2,新密码跟老密码不能一样 val 是使用这个歌正则表达式的表单里面的value值
        diff: function(val) {
            var odlpwd = $('.oldpwd').val();
            if (val === odlpwd) {
                return '新密码跟旧密码一样';
            }
        },
        // 重复密码跟新密码要一样
        same: function(val) {
            var rpwd = $('.rpwd').val();
            if (val !== rpwd) {
                return '两次密码不一样';
            }
        }
    });


    // --------------------------完成密码重置--------------------------
    $('form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(), //一定要查看name属性
            success: function(res) {
                // 给一个提示 弹出层
                layer.msg(res.message);
                // 判断状态码
                if (res.status === 0) {
                    // 把jq对象转dom对象调用reset方法
                    $('form')[0].reset();
                }
            }

        })
    })

})