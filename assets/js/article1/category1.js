function renderCategory() {
    $.ajax({

        url: '/my/article/cates',
        success: function(res) {
            console.log(res);

            var str = template('tpl-category', res);
            $('tbody').html(str);

        }
    })
}


$(function() {
    renderCategory();


    // ---------------删除功能----------------



    // 因为删除按钮是动态生成 所以要用事件委派的方法 给body ，tbody加事件都可以
    $('body').on('click', '.delete', function() {

        // 获取按钮di根据id值服务器删除对应数据
        var id = $(this).attr('data-id');

        layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({

                // /my/article/deletecate/:id   这里的 ：id 要用数字代替 传过服务器 
                url: '/my/article/deletecate/' + id,

                success: function(res) {
                    // 弹出提示
                    layer.msg('删除成功');

                    if (res.status == 0) {
                        // 删除成功重新刷新页面
                        renderCategory();
                    }

                }


            })

            layer.close(index);
        });



    })

})