layui.define(["form", "jquery"], function (exports) {
	var form = layui.form,
		$ = layui.jquery,
		AdvancedSearch = function () {};

	AdvancedSearch.prototype.search = function (pageUrl) {
		// var serializeArray = $('#search_form').serializeArray();
		// var hasValue = 0,
		// 		keword = '';
		// // console.log(serializeArray);
		// for (i in serializeArray) {
		// 	if (serializeArray[i].value !== 0 && serializeArray[i].value !== '' && serializeArray[i].value !== '-1') {
		// 		// console.log(i,serializeArray[i])
		// 		keword += '<span data-name="'+serializeArray[i].name+'" data-value="'+serializeArray[i].value+'">'+serializeArray[i].value+'<i class="layui-icon layui-icon-close"></i></span>';
		// 		hasValue += 1;
		// 	}
		// }
		// sessionStorage.setItem(pageUrl, keword)
		var goto = false;
		initSearch();


		// 高级搜索
		$('.J-advanced-btn').click(function () {
			var self = $(this);
			if (self.hasClass('open')) {
				self.removeClass('open');
				$('.advanced-con').slideUp();
			} else {
				self.addClass('open');
				$('.advanced-con').slideDown();
			}
		})
		// 取消高级搜索
		$('.J-cannel').click(function () {
			$('.J-advanced-btn').removeClass('open');
			$('.advanced-con').slideUp();
		})

		// 提交搜索
		$('body').on('click', '.J-advanced-submit', function () {
			var link = $('#search_form').serialize(),
				url = pageUrl + '?' + link;
			// $('input[name=type]').val(type);
			// console.log(sub_type, first_type, type, url);
			window.location.href = url;
			console.log(url)
			// top.layui.index.openTabsPage(url, '添加商品')
			// initSearch(pageUrl)
		})

		$('body').on('click', '.advanced-keyword span', function () {
			var self = $(this),
				// name = self.attr('data-name'),
				delname = self.attr('data-name');
			self.remove();
			goto = true;
			initSearch(delname);
		})

		function initSearch(delname) {
			var form_arr = $('#search_form').serializeArray(),
				urlArr = [],
				surl = pageUrl + '?',
				html = '';
			for (i in form_arr) {
				var name = form_arr[i].name,
					value = form_arr[i].value,
					elem = $('[name="' + name + '"]'),
					ele_type = elem[0].tagName,
					input_type = elem.attr('type'),
					text = elem.val();

				// console.log(elem,elem.attr('type'))
				if (form_arr[i].value !== 0 && form_arr[i].value !== '' && form_arr[i].name != delname && form_arr[i].value !== '-1') {
					// console.log(form_arr[i].value)
					// 获取input
					if (ele_type == 'INPUT') {
						if(input_type == 'checkbox'){
							text = elem.attr('title');
						}
						html += '<span data-name="' + name + '" data-value="' + value + '">' + text + '<i class="layui-icon layui-icon-close"></i></span>'
					}
					// select
					if (ele_type == 'SELECT') {
						$.each(elem.find('option'), function (o, p) {
							var v = $(this).attr('value');
							if (value == v) {
								text = $(this).text();
								html += '<span data-name="' + name + '" data-value="' + value + '">' + text + '<i class="layui-icon layui-icon-close"></i></span>'
							}
						})
					}
					urlArr.push(form_arr[i])
				}
			}

			console.log(html);

			for (i in urlArr) {
				surl += urlArr[i].name + '=' + urlArr[i].value + '&'
			}

			if(goto == true){
				window.location.href = surl;
			}else{
				$('.advanced-keyword').append(html);
			}
			if(html != ''){
				$('.advanced-filter').show()
			}
		}
	}

	var advancedSearch = new AdvancedSearch();
	exports("advancedSearch", function (pageUrl) {
		advancedSearch.search(pageUrl);
	});
})