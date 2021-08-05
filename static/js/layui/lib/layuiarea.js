layui.define(["form", "jquery"], function (exports) {
    var form = layui.form,
        $ = layui.jquery,
        Layuiarea = function () {};

    Layuiarea.prototype.provinces = function () {
        //加载省数据
        var provHtml = '',
            that = this;
        var prov_default = $("select[name=prov_id]").attr('value');
        var city_default = $("select[name=city_id]").attr('value');
        var county_default = $("select[name=county_id]").attr('value');

        // console.log(prov_default, city_default, county_default);
        $.each(area_data, function (i, n) {
            // console.log(idx,item.val)
            if (prov_default == n.val) {
                provHtml += '<option value="' + n.val + '" selected="">' + i + '</option>';
            } else {
                provHtml += '<option value="' + n.val + '">' + i + '</option>';
            }
        });
        //初始化省数据
        $("select[name=prov_id]").append(provHtml);
        form.render(); //更新  所在容器内的全部表单状态
        //处理市默认值
        if (prov_default != "" && city_default != "") {
            var cityHtml = '';
            $.each(area_data, function (i, n) {
                if (prov_default == n.val) {
                    // console.log(n.items)
                    $.each(n.items, function (j, k) {
                        if(city_default == k.val){
                            cityHtml += '<option value="' + k.val + '" selected="">' + j + '</option>';
                        }else{
                            cityHtml += '<option value="' + k.val + '">' + j + '</option>';
                        }
                        // return false
                    })
                }
            });
            // console.log(provHtml)
            //加载市
            $("select[name=city_id]").append(cityHtml).removeAttr("disabled");
            form.render();
            if(city_default != ""){
            	//默认县/区
                var countyHtml = '';
                $.each(area_data, function (i, n) {
                    // console.log(i,n)
                    $.each(n.items, function (j, k) {
                        if (city_default == k.val) {
                            // console.log(county_default)
                        $.each(k.items, function (o, p) {
                            // console.log(county_default,p)
                                if(county_default == p){
                                    countyHtml += '<option value="' + p + '" selected="">' + o + '</option>';
                                }else{
                                    countyHtml += '<option value="' + p + '">' + o + '</option>';
                                }
                            })
                        }
                    })
                });
                //加载县区
                $("select[name=county_id]").append(countyHtml).removeAttr("disabled");
                form.render();
            }
        }
        form.on('select(prov_id)', function (proData) {
            $("select[name=city_id]").html('<option value="">请选择市</option>');
            $("select[name=county_id]").html('<option value="">请选择县/区</option>');
            var value = proData.value;
            if (value > 0) {
                // $.get(url+"?type=1&id="+value, function (data) {
                var cityHtml = '';
                var countyHtml = '';
                // var dataObj = eval(data);
                $.each(area_data, function (i, n) {
                    // console.log(n.val)
                    if (value == n.val) {
                        // console.log(n.items)
                        $.each(n.items, function (j, k) {
                            // console.log(m,n)
                            cityHtml += '<option value="' + k.val + '">' + j + '</option>';
                            $.each(k.items, function (o, p) {
                                countyHtml += '<option value="' + p + '">' + o + '</option>';
                            })
                        })
                        return false
                    }
                });
                //加载市
                $("select[name=city_id]").append(cityHtml).removeAttr("disabled");
                $("select[name=city_id]").val($("select[name=city_id]").find('option').eq(1).val())
                //加载县区
                $("select[name=county_id]").append(countyHtml).removeAttr("disabled");
                $("select[name=county_id]").val($("select[name=county_id]").find('option').eq(1).val())
                form.render();
                // });
            } else {
                $("select[name=city_id]").html('<option value="">请选择市</option>');
                $("select[name=city_id]").attr("disabled", "disabled");
                form.render();
            }
        });

        form.on('select(city_id)', function (cityData) {
            $("select[name=county_id]").html('<option value="">请选择县/区</option>');
            var value = cityData.value;
            console.log(value)
            if (value > 0) {
                // $.get(url+"?type=2&id="+value, function (data) {
                var countyHtml = '';
                // var dataObj = eval(data);
                $.each(area_data, function (i, n) {
                    // console.log(i,n)
                    $.each(n.items, function (j, k) {
                        if (value == k.val) {
                            // console.log(j, k)
                            $.each(k.items, function (o, p) {
                                countyHtml += '<option value="' + p + '">' + o + '</option>';
                            })
                            return false
                        }
                    })
                });
                //加载县区
                $("select[name=county_id]").append(countyHtml).removeAttr("disabled");
                $("select[name=county_id]").val($("select[name=county_id]").find('option').eq(1).val())
                form.render();
                // });
            } else {
                $("select[name=county_id]").html('<option value="">请选择县/区</option>');
                $("select[name=county_id]").attr("disabled", "disabled");
                form.render();
            }
        });

        form.on('select(county_id)', function (cityData) {
            console.log(cityData.value)
        })
        // })
    }

    var layuiarea = new Layuiarea();
    exports("layuiarea", function () {
        layuiarea.provinces();
    });
})