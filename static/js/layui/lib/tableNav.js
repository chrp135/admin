/**
 layui扩展插件 — 列表操作按钮
 **/
layui.define(["jquery"], function (exports) {
	var $ = layui.jquery;

	var tableNav = {
		init: function () {
			//$(".table").colResizable();//表格自由伸缩
			var ele_btn = $('.J_operation_list').length;
			if (ele_btn) {
				this.operationNav();
			} //按钮不未空时执行
		},

		//菜单操作
		operationNav: function () {
			var operation_content = $('.J_operation_list'),
				table = operation_content.parents('table'),
				tbody = operation_content.parents('tbody');

			$(document).on("click", function (e) {
				$("#J_tip_box").remove();
				table.find('tr').removeClass('on');
			});
			//  tbody.on("click", 'tr input[type="checkbox"], tr a, tr .layui-unselect', function(e){
			// 					e.stopImmediatePropagation();
			// 	});
			// tbody.on('click', 'tr a', function (e) {
			// 	e.stopPropagation();
			// 	var RUL = $(this).attr('lay-href');
			// 	var text = $(this).text();
			// 	// window.location.href = u
			// 	if (RUL == undefined) {
			// 		return false;
			// 	}
			// 	top.layui.index.openTabsPage(RUL, text);
			// })
			tbody.on("click", '.toolbar .btn-more', function (e) {
				e.stopImmediatePropagation();
				var that = $(this),
					tr_h = that.outerHeight(),
					tr_Y = that.offset().top + tr_h - 5,
					screen_x = e.pageX,
					screen_w = $(document.body).outerWidth() - 580,
					ele_tip = "<div id='J_tip_box' class='tips_box'><i class='J_tip_close'></i><ul>" + that.siblings('.J_operation_list').html() + "</ul></div>",
					tip_box = $("#J_tip_box");
					
				tip_box.remove();
				console.log(ele_tip);
				if ($(ele_tip).find('li').length > 0) {
					$("body").append(ele_tip);
				}
				var tip_li = $("#J_tip_box li:visible"),
					tip_li_len = tip_li.size(),
					tip_li_w = tip_li.outerWidth(),
					tip_box_w = tip_li_len * tip_li_w;
				if (tip_li_len > 5) {
					tip_box_w = tip_li_w * 5;
				}
				if (screen_x >= screen_w) {
					screen_x = screen_x - (tip_box_w + 30);
				}
				$("#J_tip_box").css({
					"position": "absolute",
					"top": tr_Y + "px",
					"left": screen_x + "px",
					"width": tip_box_w,
					"z-index": 999
				});

			});
			$(document.body).delegate("#J_tip_box", "click", function (e) {
				$('table tbody tr').removeClass('on');
				$("#J_tip_box").remove();
			});
		}
	};
	tableNav.init();
	exports('tableNav', null);
});