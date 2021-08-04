$(function () {

    // 编写$.ajaxPrefilter

    $.ajaxPrefilter(function (option) {
        // option就是ajax选项，形如：
        /**
         * option = {
         *    type: 'GET',
         *    url: 'http:xxxxxx',
         *    success: func...,
         *    complete: func....,
         *    headers: {},
         *    ...
         *    ...
         * }
         */
        // console.log(option);
        // 原来的url是这样的   option.url == '/my/userinfo'
        option.url = 'http://www.liulongbin.top:3007' + option.url;


        option.complete = function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 删除假token
                localStorage.removeItem('token');
                // 跳转到登录页面
                window.parent.location.href = '/login.html';
            }
        }

        
        option.headers = {
            'Authorization': localStorage.getItem('token')
        }
    });
});