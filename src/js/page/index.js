require(['jquery', 'swiper', 'bscroll', 'render'], function($, swiper, bscroll, render) {
    $.ajax({
        url: '/api/detail',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.warn(err);
        }
    })
})