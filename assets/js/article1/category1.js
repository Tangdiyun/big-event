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
    // 创建变量用来保存弹层id
    var addindex;

    var editindex;
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


    // ----------------------添加功能 点击添加出现弹层-------------------------
    $('.layui-card-header button').on('click', function() {

        // 点击出现弹层 核心方法open  content内容可以自己更改复杂的款式
        addindex = layer.open({
            type: 1,
            title: '添加类别',
            area: ['500px', '250px'],
            // 因为内容content里放表单html码太过冗长。所以把表单写在html页面 写在script标签里面  
            // 因为在页面加载时 html页面不会显示script内容
            // 通过获取标签里面的内容放在content里面
            content: $('#tpl-add ').html()
        });
    })




    //  ----------------------   监听添加表单的提交行为---------------
    // 因为表单是一个模板 算是动态添加的 所以用事件委派
    $('body').on('submit', '.myform-add', function(e) {
        // 阻止默认行为 就是阻止跳转页面
        e.preventDefault();
        // alert(123);
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',

            data: $(this).serialize(),

            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    // 渲染页面
                    renderCategory();
                    // 关闭弹层
                    layer.close(addindex);
                }


            }
        })
    })



    // ----------------------编辑功能 点击编辑出现弹层-------------------------
    // 加载form模块
    var form = layui.form;

    // 按钮点击事件
    $('body').on('click', '.edit', function() {

        // 获取三个自定义属性
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var alias = $(this).attr('data-alias');


        // 点击出现弹层 核心方法open  content内容可以自己更改复杂的款式
        editindex = layer.open({
            type: 1,
            title: '编辑类别',
            area: ['500px', '250px'],
            // 因为内容content里放表单html码太过冗长。所以把表单写在html页面 写在script标签里面  
            // 因为在页面加载时 html页面不会显示script内容
            // 通过获取标签里面的内容放在content里面
            content: $('#tpl-edit ').html(),
            success: function() {

                // 弹出以后执行这个函数  这个函数给表单赋值
                // 快速给表单赋值， 加载layui.form 模块， 给表单添加lay-filter属性 赋值为edit-form 
                // 调用form模块中的val方法 参数1为lay - filter的值 edit - form, 参数2是一个对象， 对象里面的键的值对应表单name属性值
                form.val('edit-form', {
                    id: id,
                    name: name,
                    alias: alias
                })

            }
        });
    })


    // --------------------确认修改 提交请求 完成修改-----------------
    $('body').on('submit', '.myform-edit', function(e) {
        e.preventDefault();
        // alert(123);
        // 对比接口数据 是否一致 后台几口提示 Id的i是一个大写 我们的id是小写必须 把它变成大写的I
        // 修改字符串变成大写方法 3种
        // var mydata = $(this).serialize();
        // // 1. =可以区别后面是否有重复的表单值
        // mydata = mydata.replace('id=', 'Id=');
        // // 2. 截取字符串 重1开始  然后拼接一个大写I
        // mydata = 'I' + mydata.substr(1);

        // 3获取页面数据 用serializeArray方法得到是一个数组
        var data = $(this).serializeArray();
        // 对比接口数据 是否一致 后台几口提示 Id的i是一个大写 我们的id是小写必须 把它变成大写的I

        console.log(data);
        // 修改数组里面的name属性 为Id
        data[0].name = 'Id';
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory();

                    layer.close(editindex);
                }

            }
        })


    })
})