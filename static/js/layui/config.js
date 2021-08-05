layui.config({
    base: 'static/js/layui/lib/' //静态资源所在路径
}).extend({
    common: 'common', //框架公用文件
    tableNav: 'tableNav' //列表弹出菜单
})
layui.use(['jquery', 'layer', 'common', 'tableNav'], function () {
    var $ = layui.jquery,
        jQuery = layui.jquery,
        layer = layui.layer

    $.fn.cncn_prompt = function (options) {
        var defaults = {
            position: 'left', //位置 默认内容在下面 left、right、center、
            width: 'auto', //宽度
            icon_position: 10 //小箭头偏离左边和上边的位置
        };
        var options = $.extend(defaults, options);
        var self = $(this);
        var $prompt = $("#prompt");
        if (!$prompt.length) {
            $("body").prepend('<div id="prompt"><i class="ico_t"></i><div class="prompt_con"></div></div>');
        }
        var offset, h, w, x, y, content;
        self.off().on("mouseenter mouseleave", function (e) {
            if (e.type == 'mouseenter') {
                var me = $(this);
                clearInterval(window.timer);
                offset = me.offset();
                h = me.height();
                w = me.width();
                // console.log(offset,h,w)
                var data_title = me.attr("data-title");
                if (!data_title) {
                    content = me.siblings('.layui-hide').html();
                } else {
                    content = me.attr("data-title");
                }
                $(".prompt_con").html(content);
                _w = $prompt.width();
                _h = $prompt.height();
                y = offset.top + h + 5;
                if (options.position == 'left') {
                    x = offset.left - Number(options.icon_position) / 2;
                    $(".ico_t").css(options.position, options.icon_position);
                } else if (options.position == 'center') {
                    x = offset.left - _w / 2 + w / 2 - options.icon_position;
                    $(".ico_t").css('left', _w / 2 + 5);
                } else if (options.position == 'right') {
                    x = offset.left - _w + w - options.icon_position - 5;
                    $(".ico_t").css({
                        right: options.icon_position,
                        left: 'unset'
                    });
                }
                $("#prompt").css({
                    "width": options.width,
                    "left": x,
                    "top": y
                }).show()
                // console.log($("#prompt").length);
            } else if (e.type == 'mouseleave') {
                window.timer = window.setTimeout(function () {
                    $prompt.attr('style', '');
                    $prompt.hide();
                }, 400);
            }
        });

        $('#prompt').on('mouseenter mouseleave', function (e) {
            console.log(e.type)
            if (e.type == 'mouseenter') {
                clearInterval(window.timer);
                $prompt.show();
            } else if (e.type == 'mouseleave') {
                window.timer = window.setTimeout(function () {
                    $prompt.attr('style', '');
                    $prompt.hide();
                }, 400);
            }
        })
    }

    $(function () {
        // 左侧菜单
        $('.scroll-con dl').each(function () {
            var self = $(this)
            if (self.hasClass('open')) {
                self.find('dd').slideDown()
            }
        })

        $('.left-con dt').click(function () {
            var self = $(this),
                dl = self.parents('dl'),
                dd = self.siblings('dd')
            if (dl.hasClass('open')) {
                dl.removeClass('open')
                dd.slideUp()
            } else {
                dl.addClass('open').siblings().removeClass('open').find('dd').slideUp()
                dd.slideDown()
            }
        })

        $('.J-btn-side').click(function () {
            var self = $(this),
                parents = self.parents('.left-con')
            if (parents.hasClass('close')) {
                parents.removeClass('close')
                self.find('i').removeClass('icon-right').addClass('icon-left')
            } else {
                parents.addClass('close')
                self.find('i').removeClass('icon-left').addClass('icon-right')
            }
        })


        $(".J-why-l").cncn_prompt({
            'position': 'left'
        });
        $(".J-why-r").cncn_prompt({
            'position': 'right'
        });
        $(".J-why-c").cncn_prompt({
            'position': 'center'
        });


    })

})