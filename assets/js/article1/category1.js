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
})