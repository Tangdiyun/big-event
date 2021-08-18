$(function() {
    // 每次发送的ajax请求都会被 $.ajaxPrefilter(function(option){})拦截，option就是ajax里面的参数对象
    // 它的作用是 可以获取 ajax的发送的参数  并且可以修改
    $.ajaxPrefilter(function(option) {
        console.log(option);
        // 修改原来ajax里面的url地址
        option.url = 'http://www.liulongbin.top:3007' + option.url;
        // 添加complete 跟 headers 优化ajax代码
        option.headers = {
            'Authorization': localStorage.getItem('token')
        }
        option.complete = function(xhr) {
            // 形参是异步对象

            if (xhr.responseJSON.status == 1 && xhr.responseJSON.massage == '身份认证失败！') {
                // 说明token没有 或者是假的
                // 删除本地token
                location.removeItem('token');
                // 父级页面跳转到login
                window.parent.location.href = '/login.html';
            }

        }

    })
})