$(function() {
    // 进入到index页面后立即给接口  发ajax请求 获取用户基本信息 调用函数
    getUserInfo();

    //    ------------------- 退出功能------------
    $("#logout").on('click', function() {
        // 弹出询问页面（layui中的弹出层中的询问 不用加载）
        layer.confirm('是否要退出', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 删除本地token
            localStorage.removeItem('token');
            // 跳转页面到login
            location.href = '/login.html';
            // 关闭弹出层
            layer.close(index);
        });
    })

})

// 封装一个得到用户信息的函数 以便以后调用 而且是放在入口函数外边 做一个全局函数
function getUserInfo() {
    $.ajax({
        type: 'get',
        //   http://www.liulongbin.top:3007  这个共同的内容已经在 ajaxprefilter 里面添加 所以ajax不用再添加
        url: '/my/userinfo',
        // 访问my文件需要token令牌 要设置请求头 ajax 里面有一个属性headers 用来设置请求头 根据文档需求设置请求头
        //这个共同的内容以及在 ajaxprefilter 里面添加 所以ajax不用再添加
        // headers: {
        //     'Authorization': localStorage.getItem('token')
        // },
        success: function(res) {
            console.log(res);
            if (res.status === 0) {
                // 1设置欢迎语

                // 优先使用Nickname 没有在使用username
                var name = res.data.nickname || res.data.username;

                // 把名字放入span盒子里面
                $('.myname').text(name);


                //2 设置头像（有图片用图片做头像，没有图片用用户名第一个字母大写做头像）
                if (res.data.user_pic) {
                    // 使用图片显示
                    $(".layui-nav-img").attr('src', res.data.user_pic).show();
                    // 文字头像隐藏
                    $('.text-avatar').hide();
                } else {
                    // 截取用户第一个字 并大写
                    var t = name.substr(0, 1).toUpperCase();
                    // 放入文字头像框 显示 jq 里面的show方法 默认设置元素样式为 display inline -block  不然css样式中文字头像display 添加 !important
                    // 我们可以用 css 属性自己设置 这样就不会改变文字头像的样式
                    $('.text-avatar').text(t).css('display', 'inline-block');
                    // 隐藏图片头像
                    $(".layui-nav-img").hide();
                }
            }

        },

        // // 请求发送完成后
        //这个共同的内容以及在 ajaxprefilter 里面添加 所以ajax不用再添加
        // complete: function(xhr) {
        //     // 形参是异步对象

        //     if (xhr.responseJSON.status == 1 && res.responseJSON.massage == '身份认证失败！') {
        //         // 说明token没有 或者是假的
        //         // 删除本地token
        //         location.removeItem('token');
        //         // 跳转页面到login
        //         location.href = '/login.html';
        //     }

        // }
    })
}