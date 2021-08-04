$(function () {
    // 进入到index页面之后，马上发送ajax请求，获取用户的信息，并渲染到页面中
    getUserInfo();


    // -----------------  退出功能 ---------------------
    $('#logout').click(function () {
        // 询问是否要删除
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1 删除token
            localStorage.removeItem('token');
            // 2 跳转到 /login.html
            location.href = '/login.html';
            // 下面的代码是关闭弹出层的意思
            layer.close(index);
        });
    });

});

// 入库函数外面封装，全局函数，方便在其他位置调用
function getUserInfo() {
    $.ajax({
        // type: 'GET', // type不填，默认就是GET
        url: '/my/userinfo',
        // success函数，在ajax请求成功之后触发
        success: function (res) {
            if (res.status === 0) {
                // 1、设置欢迎语（有昵称，就使用昵称，没有昵称，使用用户名）
                var myname = res.data.nickname || res.data.username;
                $('.myname').text(myname);
                // 2、设置头像（有图片，使用图片；没有图片，使用名字的首字母）
                if (res.data.user_pic) {
                    // 使用图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    var t = myname.substr(0, 1).toUpperCase();
                    // jQuery中的show方法，会设置元素 display:inline;
                    $('.text-avatar').text(t).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        }
    });
}


// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');