$(function () {
    var form = layui.form;
    // ----------------  表单验证 ----------------
    form.verify({
        len: [/^[\S]{6,12}$/, '长度必须在6~12位之间，且不能出现空格'], // {6,12}不要写成{6, 12}

        // 验证原密码和新密码不能相同。新密码使用这个验证规则
        diff: function (val) {
            // val 表示新密码，因为新密码使用这个验证规则
            // 获取原密码
            var oldPwd = $('.oldPwd').val();
            if (oldPwd === val) {
                return '新密码不能和原密码相同';
            }
        },
        // 验证新密码和确认密码必须一致，确认密码使用这个验证规则
        same: function (val) {
            // val 表示确认密码
            // 获取新密码
            var newPwd = $('.newPwd').val();
            if (val !== newPwd) {
                return '两次新密码不一致';
            }
        }
    });

    // ----------------  完成密码重置功能 ---------
    $('form').on('submit', function (e) { 
        e.preventDefault();
        // ajax提交原密码和新密码
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(), // 使用serialize的时候，一定要检查表单各项的name
            success: function (res) {
                // 给一个提示
                layer.msg(res.message);
                if (res.status === 0) {
                    // 更新成功，重置表单
                    // reset方法，可以重置表单，但是他是一个DOM方法，所以需要把jQuery对象转成DOM对象
                    $('form')[0].reset();
                }
            }
        });
    });
})