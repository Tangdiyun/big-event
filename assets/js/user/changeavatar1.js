$(function() {
    // 1实现剪裁效果  使用插件cropper
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);


    // 2点击上传能够选择图片 选择内容为上传的 按钮
    $('button:contains("上传")').on('click', function() {
        // 触发file input标签的点击事件
        // $('#file').click();

        $("#file").trigger('click');
    })


    //3 切换图片之后更换剪裁区的图片
    // 当文件内容改变的时候，更换剪裁区的图片
    $('#file').change(function() {
        // 我们 选择的url地址是？
        // 3.1找到文件对象
        var fileobj = this.files[0];
        // 调用js内置对象url的createobjecturl方法为文件添加临时路径url
        var url = URL.createObjectURL(fileobj);
        // 3.3更换剪裁区的图片（销毁之前的剪裁区--更换图片--重新生成剪裁区）
        $image.cropper('destroy').attr('src', url).cropper(options);
    })

    // 4点击确定 剪裁图片 同时更改头像
    $('button:contains("确定")').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(dataURL);
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/update/avatar',
            data: {
                avatar: dataURL
            },
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            success: function(res) {
                // 弹出提示
                layer.msg(res.message);

                if (res.status === 0) {
                    // 更换成功 调用父页面的方法 更新用户信息
                    window.parent.getUserInfo();
                }
            },
            complete: function(xhr) {

                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    localStorage.removeItem('token');
                    // window表示当前窗口
                    window.parent.location.href = '/login.html';
                }
            }
        })
    })
})