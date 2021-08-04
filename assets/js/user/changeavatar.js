$(function () {
    // 一、实现剪裁的效果
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options);


    // 二、点击“上传”能够选择图片
    $('button:contains("上传")').click(function () {
        // alert(222);
        // 用代码的方式触发 上传控件（文件域）的单击事件
        // $('#file').click();
        $('#file').trigger('click');
    });

    // 三、切换图片之后，更换剪裁区的图片
    // 当文件域的内容改变的时候，更换剪裁区的图片
    $('#file').change(function () {
        // console.log(111);
        // 我们选择的图片的url地址是？
        // 3.1 找到文件对象
        var fileObj = this.files[0];
        // 3.2 调用JS内置对象URL的createObjectURL方法，为文件对象生成临时的url
        var url = URL.createObjectURL(fileObj);
        // console.log(url);
        // 3.3 更换剪裁区的图片（销毁之前的剪裁区 --> 更换图片 --> 重新生成剪裁区）
        $image.cropper('destroy').attr('src', url).cropper(options);
    });

    // 四、点击“确定”，剪裁图片，同时更改头像
    // 点击确定按钮的时候，剪裁图片，ajax提交图片到接口，实现头像更换
    $('button:contains("确定")').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 先剪裁，然后调用toDataURL方法，可以把图片转成base64格式。
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {avatar: dataURL},
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    // 更改成功，调用父页面的getUserInfo
                    window.parent.getUserInfo();
                }
            }
        });
    });
});