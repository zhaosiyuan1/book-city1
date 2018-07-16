define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(tpl, data, target, isHtml) {
        var source = $(tpl).html();
        var template = handlebars.compile(source);
        var html = template(data);
        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }
    }
    return render;
})