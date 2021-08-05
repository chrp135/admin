layui.define(["jquery"], function (exports) {
  var $ = layui.jquery;
  var com_obj = {
    init: function () {
      this.common();
    },

    // 页面内部跳转
    common: function () {

      // 监听body-wrap页面高度
      var body_h = $(window).height() - 130
      $('.body-wrap').css('min-height', body_h)

      // 监听键盘输入后抬起
      $('body').on('keyup', '.J-reg-num', function () {
        $(this).val(this.value.replace(/\D/g, ''))
      })
      // 监听粘贴后
      $('body').on('afterpaste', '.J-reg-num', function () {
        $(this).val(this.value.replace(/\D/g, ''))
      })

    },
  };
  com_obj.init();
  exports('common', com_obj);
});