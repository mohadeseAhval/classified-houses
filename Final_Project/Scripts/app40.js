$.ajaxSetup({ cache: !1, headers: { "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content") } });
var isMobile = !1;
$(".mobile-layout").length && (isMobile = !0);
var announceswiper, requests = {
    ajax: !1, post: function (e, a, t, n) {
        var o = new FormData;
        for (var s in a) o.append(s, a[s]);
        $.ajax({
            url: e, type: "POST", data: o, contentType: !1, processData: !1, success: function (e) {
                t(e)
            }, error: function (e) {
                n(e)
            }
        })
    }, delete: function (e, a, t, n) {
        $.ajax({
            url: e + "/" + a, type: "DELETE", dataType: "JSON", success: function (e) {
                t(e)
            }, error: function (e) {
                n(e)
            }
        })
    }, get: function (e, a, t, n) {
        requests.ajax && requests.ajax.abort(), requests.ajax = $.get(e, a).done(function (e) {
            t(e)
        }).fail(function (e) {
            n && n(e)
        })
    }, confirm: function (e, a, t, n) {
        swal({
            title: e,
            text: a,
            type: t,
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله !",
            cancelButtonText: "خیر"
        }).then(function (e) {
            e.value ? n(!0) : n(!1)
        })
    }
}, globals = {};
globals.types = {
    sale: "خرید-فروش",
    rent: "رهن-اجاره",
    administrative: "اداری",
    apartment: "آپارتمان",
    commercial: "تجاری",
    estate: "مستغلات",
    land: "زمین",
    old: "کلنگی",
    garden: "باغ-باغچه",
    niches: "انبار-سوله",
    villa: "ویلا"
}, globals.numberToString = function (e, a) {
    if (null === e) return "";
    if (e < 0) return e *= -1, "منفی " + this.numberToString(e, a);
    if (0 === e) return 0 === a ? "صفر" : "";
    var t = "";
    return a > 0 && (t += " و ", a -= 1), e < 10 ? t += ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"][e - 1] : e < 20 ? t += ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هیجده", "نوزده"][e - 10] : e < 100 ? t += ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"][parseInt((e / 10).toString(), 10) - 2] + this.numberToString(e % 10, a + 1) : e < 1e3 ? t += ["یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"][parseInt((e / 100).toString(), 10) - 1] + this.numberToString(e % 100, a + 1) : e < 1e6 ? t += this.numberToString(parseInt((e / 1e3).toString(), 10), a) + " هزار " + this.numberToString(e % 1e3, a + 1) : e < 1e9 ? t += this.numberToString(parseInt((e / 1e6).toString(), 10), a) + " میلیون " + this.numberToString(e % 1e6, a + 1) : e < 1e12 ? t += this.numberToString(parseInt((e / 1e9).toString(), 10), a) + " میلیارد " + this.numberToString(e % 1e9, a + 1) : e < 1e15 && (t += this.numberToString(parseInt((e / 1e12).toString(), 10), a) + " تریلیارد " + this.numberToString(e % 1e12, a + 1)), t
}, globals.parseArabic = function (e) {
    return e.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (e) {
        return e.charCodeAt(0) - 1632
    }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (e) {
        return e.charCodeAt(0) - 1776
    })
}, globals.commaFormatted = function (e) {
    for (val = e.replace(/[^\d.]/g, ""), arr = val.split("."), lftsde = arr[0], rghtsde = arr[1], result = "", lng = lftsde.length, j = 0, i = lng; i > 0; i--) j++, j % 3 == 1 && 1 != j ? result = lftsde.substr(i - 1, 1) + "،" + result : result = lftsde.substr(i - 1, 1) + result;
    return null == rghtsde ? result : result + "." + arr[1]
}, globals.removeImage = function (e) {
    requests.delete("upload", e, function (e) {
        swal({ text: "تصویر مورد نظر با موفقیت حذف شد .", type: "success", confirmButtonText: "تایید" })
    }, function (e) {
    })
}, globals.showLoadingBtn = function (e) {
    e.attr("disabled", !0), e.attr("data-text", e.html()), e.addClass("in-load"), e.html('<span class="loading-text"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>بارگزاری ...</span>')
}, globals.hideLoadingBtn = function (e) {
    e.html(e.data("text")), e.removeAttr("data-text"), e.removeAttr("disabled"), e.removeClass("in-load")
};
var timer_timeout_auto, automateHover = {
    start: function (e) {
        var a = e.offset(), t = a.top - $(window).scrollTop(), n = a.left - $(window).scrollLeft();
        $(".agency-hover").css({ display: "block", top: t - 160, left: n - 147 })
    }, putImg: function () {
        var e = $(".coop-image"), a = $(".topagency-img");
        $.each(e, function () {
            $(this).attr("src", "../uploads/agencies.jpg"), $(this).css({ "object-position": "0px " + parseInt(0 == $(this).data("coop-index") ? 0 : -54 * $(this).data("coop-index")) + "px" })
        }), $.each(a, function () {
            $(this).attr("src", "../uploads/topagencies.jpg"), $(this).css({ "object-position": "0px " + parseInt(0 == $(this).data("top-agency") ? 0 : -99 * $(this).data("top-agency")) + "px" })
        })
    }
}, app = {};
app.filterProps = function (e) {
    var a = {
        administrative: "pool,sauna_jacuzzi",
        commercial: "pool,sauna_jacuzzi,yard,sport_hall,lobby,janitor,balcony",
        land: "parking,balcony,elevator,lobby,warehouse,yard,sport_hall,pool,sauna_jacuzzi",
        old: "sport_hall,lobby,elevator",
        niches: "balcony,lobby,pool,sauna_jacuzzi,yard,sport_hall",
        apartment: "",
        villa: "",
        garden: "lobby,balcony,elevator",
        estate: "",
        "": ""
    };
    $("input[type=checkbox][name=props]").each(function () {
        a[e].indexOf($(this).val()) > -1 ? ($(this).parent().addClass("hidden"), $(this).is(":checked") && ($(this).prop("checked", !1), $(this).trigger("change"))) : $(this).parent().removeClass("hidden")
    })
}, app.convertFormValues = function (e) {
    var a = [], t = $("#searchContent").data("form"), n = "";
    switch (t) {
        case "map-view":
            return announcesMap.loadData(null, e), !1;
        case "search":
            var o = { area: "ایران", sales_type: "همه", type: "املاک", size: null }, s = globals.types;
            typeCount = 0, $.each(e, function (e, t) {
                if (t.value) {
                    var n = t.name.replace("[]", "");
                    if ("min_price" != n && "max_price" != n && "min_rent" != n && "max_rent" != n || (t.value = t.value.replace(/،/g, "")), "location_ids" === n) {
                        var i = t.value.split(",");
                        "ایران" === o.area && (o.area = searchModule.results[0].slug), i.length > 1 && (a[n] = i.join(","))
                    } else "sales_type" == n ? s.hasOwnProperty(t.value) && (o[n] = s[t.value]) : "type" == n ? s.hasOwnProperty(t.value) && (typeCount++, 1 == typeCount && (o[n] = s[t.value]), typeCount > 1 && (a[n] = a[n] && t.value.indexOf(a[n]) ? a[n] + "," + t.value : t.value)) : a[n] = a[n] ? -1 == a[n].indexOf(t.value) ? a[n] + "," + t.value : a[n] : t.value
                }
            }), a.hasOwnProperty("min_size") && a.hasOwnProperty("max_size") && parseInt(a.max_size) - parseInt(a.min_size) == 9 && (o.size = a.min_size + "-متری", delete a.min_size, delete a.max_size), n = t + "/" + o.sales_type + "/" + o.type + "/" + o.area + (o.size ? "/" + o.size : "") + "?";
            break;
        case "agencies":
            o = { area: "ایران", agency_type: "آژانس-املاک" }, s = { agencies: "آژانس-املاک", agents: "مشاور-املاک" };
            $.each(e, function (e, t) {
                if (t.value) {
                    var n = t.name.replace("[]", "");
                    if ("location_ids" === n) {
                        var i = t.value.split(",");
                        "ایران" === o.area && (o.area = searchModule.results[0].slug), i.length > 1 && (a[n] = i.join(","))
                    } else "agency_type" === n ? s.hasOwnProperty(t.value) && (o[n] = s[t.value]) : a[n] = a[n] ? a[n] + "," + t.value : t.value
                }
            }), n = t + "/" + o.agency_type + "/" + o.area + "?";
            break;
        case "projects":
            o = { category: "" };
            $.each(e, function (e, t) {
                var n = t.name.replace("[]", "");
                t.value && ("category_id" === n ? o.category = t.value : a[n] = a[n] ? a[n] + "," + t.value : t.value)
            }), n = t + "/" + o.category + "?"
    }
    for (var i in a) a[i] && ("?" != n.slice(-1) ? n += "&" + i + "=" + a[i] : n += i + "=" + a[i]);
    return "?" == n.slice(-1) && (n = n.slice(0, -1)), "/" + n
}, app.ajaxGetForm = function (e) {
    var a = $("select[name=order_select]").length ? $("select[name=order_select]").val() : $("input[name=order_select]:checked").val();
    $(".modal-filters").modal("hide"), e.push({ name: "order", value: a });
    var t = decodeURI(location.href).replace(base_url, ""), n = app.convertFormValues(e);
    t.indexOf("#") > -1 && (t = t.substr(0, t.indexOf("#"))), n && t !== n && (app.loadWithAjax(n), $("html, body").animate({ scrollTop: 0 }, 500))
}, app.loadWithAjax = function (e) {
    app.showPlaceholder("#placeholder-result"), requests.get(e, function (a) {
        $("#request-result").html(a), window.history.pushState({ is_ajax: !0 }, "new Page", e), app.prepareSwipers()
    }, function (e) {
    })
}, app.showPlaceholder = function (e) {
    var a = $("#placeholder").clone();
    $(e).html(a.removeClass("hidden"), a.removeClass("hidden"), a.removeClass("hidden")), $(e).append(a.clone().removeClass("hidden")), $(e).append(a.clone().removeClass("hidden")), $(e).append(a.clone().removeClass("hidden"))
}, app.prepareSwipers = function () {
    app.swipers = new Swiper(".swiper-container-announce", {
        pagination: ".swiper-pagination-single-announce",
        paginationClickable: !0,
        spaceBetween: 0,
        preloadImages: !1,
        navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
        on: {
            slideChange: function () {
                var e = $(this.$el.find(".swiper-slide-next"));
                if ($(e.find("img")).data("src")) {
                    var a = $(e.find("img")).clone(), t = a.data("src"), n = e.find("a").length ? e.find("a") : e;
                    e.addClass("in-loading"), a.attr("src", t).removeAttr("data-src"), a.one("load", function () {
                        n.html(a[0]), e.removeClass("in-loading")
                    })
                }
            }
        }
    })
};
var searchModule = {};
searchModule.search_element = $(".search-location"), searchModule.searchBox = $(".search-box"), searchModule.resultBox = $(".result-box"), searchModule.searchInput = $(".search-input"), searchModule.activeResult = ".search-result-item.active", searchModule.timer_timeout = "", searchModule.results = [], searchModule.placeholder = "", searchModule.allowReload = !0, searchModule.search = function (e) {
    var a = !0 === e.data("area") ? "area-location/" : "search-location/", t = e.val();
    t.length > 1 ? (searchModule.searchBox.addClass("search-box-active"), searchModule.searchBox.html('<div class="p-2"><div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div></div>'), searchModule.timer_timeout && clearTimeout(searchModule.timer_timeout), searchModule.timer_timeout = setTimeout(function () {
        requests.get(a + t, {}, function (e) {
            searchModule.searchBox.html("");
            var a = e.object;
            a.length ? ($.each(a, function (e, a) {
                var t = "<div class='search-result-item' data-item='" + JSON.stringify(a) + "'><span class='area-name'>" + a.name + "</span><span class='area-name'>" + a.parents + "</span><i class='sh-pinl'></i></div>";
                searchModule.searchBox.append(t)
            }), searchModule.searchBox.children("div").first().addClass("active")) : searchModule.searchBox.removeClass("search-box-active")
        }, function (e) {
        })
    }.bind(searchModule), 600)) : searchModule.processView()
}, searchModule.moveOnResult = function (e) {
    switch (e) {
        case "up":
            $(searchModule.activeResult).prev().length ? $(searchModule.activeResult).removeClass("active").prev().addClass("active") : $(searchModule.activeResult).removeClass("active").parent().children().last().addClass("active");
            break;
        case "down":
            $(searchModule.activeResult).next().length ? $(searchModule.activeResult).removeClass("active").next().addClass("active") : $(searchModule.activeResult).removeClass("active").parent().children().first().addClass("active");
            break;
        case "select":
            $(searchModule.activeResult).trigger("click")
    }
}, searchModule.addResults = function (e, a) {
    var t = e.parent_ids.split(","), n = [], o = [];
    for (var s in searchModule.results.forEach(function (a, s) {
        a.parent_ids.split(",").forEach(function (t, s) {
            parseInt(t) === parseInt(e.id) && (o.push(parseInt(a.id)), n.push("." + a.type + "-" + a.id))
    }), a.id === e.id && (n.push(a.id), n.push("." + a.type + "-" + a.id)), t.forEach(function (e, t) {
            parseInt(e) === parseInt(a.id) && (o.push(parseInt(a.id)), n.push("." + a.type + "-" + a.id))
    })
    }), n) $(n[s]).remove();
    searchModule.results = searchModule.results.filter(function (e) {
        return -1 === o.indexOf(parseInt(e.id))
    }), searchModule.results.push(e), searchModule.resultBox.append('<div class="result-item ' + e.type + "-" + e.id + '" data-slug="' + e.slug + '"><i class="sh-quit  remove-search" data-id="' + e.id + '"></i><span>' + e.name + "</span></div>"), searchModule.searchBox.html(""), searchModule.searchBox.removeClass("search-box-active"), searchModule.search_element.val(""), a ? (searchModule.allowReload = !0, searchModule.search_element.focus()) : searchModule.allowReload = !1, searchModule.processView(), $(".area-input").trigger("change")
}, searchModule.clearItems = function () {
    searchModule.results.forEach(function (e, a) {
        $("." + e.type + "-" + e.id).remove()
    }), searchModule.results = [], searchModule.processView()
}, searchModule.processView = function () {
    searchModule.results.length ? (searchModule.searchInput.hasClass("filled") || searchModule.searchInput.addClass("filled"), searchModule.resultBox.each(function () {
        $(this).hasClass("single") ? $(this).parent().find(".searchtext").addClass("hidden") : $(this).parent().find(".searchtext").removeClass("hidden"), !searchModule.placeholder && searchModule.search_element.attr("placeholder") && (searchModule.placeholder = searchModule.search_element.attr("placeholder")), searchModule.search_element.attr("placeholder", "افزودن"), searchModule.search_element.removeClass("select-location")
    })) : (searchModule.searchInput.removeClass("filled"), searchModule.search_element.removeClass("hidden"), searchModule.search_element.attr("placeholder", searchModule.placeholder), searchModule.placeholder = "");
    var e = [];
    searchModule.results.forEach(function (a, t) {
        e.push(a.id)
    }), $("#location_ids").val(e.join(","))
}, searchModule.removeResult = function (e) {
    var a = -1;
    searchModule.results.forEach(function (t, n) {
        t.id == e && (a = n)
    }), searchModule.results.splice(a, 1), searchModule.processView(), changed = !0, $(".area-input").trigger("change")
}, searchModule.customSelectCheck = function (e) {
    $(".select-toggle").each(function () {
        var e = !1;
        $(this).find("input[type=text],input:checked").each(function () {
            var a = $(this).hasClass("number-only");
            if ($(this).val()) if (a) {
                var t = $(this).val().replace(/\D/g, "");
                $(this).val(t), e = !!t
            } else e = !0
        }), e ? $(this).addClass("has-value") : $(this).removeClass("has-value")
    }), searchModule.showParameters(e)
}, searchModule.showParameters = function (e) {
    var a = $(".filter_form").serializeArray(), t = a.reduce(function (e, a) {
        return a.value && (e[a.name] = e.hasOwnProperty(a.name) ? e[a.name] + "," + a.value : a.value), e
    }, {}), n = {
        min: "حداقل ",
        max: "حداکثر ",
        type: "",
        price: "قیمت ",
        rent: "اجاره ",
        size: "متراژ ",
        bedroom: "خواب ",
        priceEnd: " تومان",
        rentEnd: " تومان",
        sizeEnd: " متر",
        bedroomEnd: "",
        parking: "پارکینگ",
        balcony: "بالکن",
        elevator: "آسانسور",
        janitor: "سرایدار",
        lobby: "لابی",
        pool: "استخر",
        warehouse: "انباری",
        yard: "حیاط",
        sauna_jacuzzi: "سونا و جکوزی",
        sport_hall: "سالن ورزشی"
    }, o = [];
    $.each(t, function (e, a) {
        if (a) {
            var t = "";
            if (-1 === e.indexOf("min") && -1 === e.indexOf("max")) {
                switch (e) {
                    case "type":
                        t = globals.types[a].replace("-", " ");
                        break;
                    case "props":
                        var s = a.split(",");
                        $.each(s, function (e, a) {
                            o["check" + a] = n[a]
                        })
                }
                t && (o[e] = t)
            } else {
                var i = e.split("_");
                o[e] = n[i[0]] + n[i[1]] + globals.commaFormatted(a.toString()) + n[i[1] + "End"]
            }
        }
    });
    var s = Object.keys(o), i = $(".searched .container");
    if (s.length) for (var r in i.removeClass("hidden"), i.html(""), o) {
        var l = '<div class="search-params">' + o[r] + '<i class="remove-params sh-quit pr-2" data-remove="' + r + '"></i></div>';
        i.append(l)
    } else i.addClass("hidden");
    e && app.ajaxGetForm(a)
}, searchModule.removeCustomCheck = function (e) {
    "type" === e ? $("input[name='" + e + "']:checked").prop("checked", !1) : -1 !== e.indexOf("check") ? $("#" + e).prop("checked", !1) : $("input[name=" + e + "]").val(""), searchModule.customSelectCheck(!0)
}, $(document).ready(function () {
    $(document).on("click", ".remove-params", function () {
        searchModule.removeCustomCheck($(this).data("remove"))
    }), $(document).on("click", ".search-result-item", function () {
        $(".search-result-item").removeClass("active"), $(this).addClass("active"), searchModule.addResults($(searchModule.activeResult).data("item"), !0)
    }), searchModule.search_element.keydown(function (e) {
        if (13 === e.which) {
            if (!$(".search-box-active").length) return !0;
            searchModule.moveOnResult("select"), e.preventDefault()
        }
    }), searchModule.search_element.keyup(function (e) {
        switch (e.which) {
            case 38:
                searchModule.moveOnResult("up");
                break;
            case 40:
                searchModule.moveOnResult("down");
                break;
            default:
                var a = $(this);
                searchModule.search(a)
        }
    }), $(document).on("click", ".remove-search", function () {
        var e = $(this).data("id");
        $(".area-" + e).remove(), $(".sub-" + e).remove(), $(".province-" + e).remove(), $(".city-" + e).remove(), searchModule.removeResult(e)
    }), $(".reset-form").click(function () {
        $(".filter_form")[0].reset(), $(".multiple-select-box span").text("امکانات"), searchModule.clear()
    }), $(".select-toggle .select-value").click(function () {
        var e = $(this).parents(".select-toggle").hasClass("active");
        $(".select-toggle").removeClass("active"), e || $(this).parents(".select-toggle").addClass("active"), searchModule.customSelectCheck(!0)
    }), $(".select-wrapper select").change(function () {
        $(this).parent().find("span").html($(this).find(":selected").text() + '<i class="sh-narrow"></i>')
    }), $(".range-box span").click(function () {
        var e = $(this).data("value");
        $(this).parents(".search-box-input").find("input").val(e)
    }), $(".select-done").click(function () {
        $(this).parents(".select-toggle").removeClass("active"), searchModule.customSelectCheck(!0)
    }), $(window).on("popstate", function () {
        location.reload()
    }), $(document).on("change", ".live-reload , input[name=order_select] , select[name=order_select]", function () {
        var e = $(".filter_form_home").serializeArray();
        searchModule.allowReload ? app.ajaxGetForm(e) : searchModule.allowReload = !0
    }), $(document).on("click", ".live-paginate", function (e) {
        e.preventDefault();
        var a = $(this).attr("href");
        return "#" !== a && (app.loadWithAjax(a), $("html, body").animate({ scrollTop: 0 }, 500)), !1
    }), $(document).on("keyup input paste focus", ".live-text", function () {
        timer_timeout_auto && clearTimeout(timer_timeout_auto), timer_timeout_auto = setTimeout(function () {
            var e = $(".filter_form_home").serializeArray();
            app.ajaxGetForm(e)
        }, 500)
    }), app.prepareSwipers(), searchModule.customSelectCheck(!1)
});
var alert = {
    set: function () {
        if (searchModule.results.length) {
            $("#alertModal").modal("show");
            var e = $(".filter_form").serializeArray().reduce(function (e, a) {
                return a.value && (e[a.name] = e.hasOwnProperty(a.name) ? e[a.name] + "," + a.value : a.value), e
            }, {});
            console.log(e);
            var a = {
                sale: "خرید",
                rent: "رهن و اجاره",
                apartment: "آپارتمان",
                administrative: "اداری",
                commercial: "تجاری",
                villa: "ویلا",
                estate: "مستغلات",
                land: "زمین",
                old: "کلنگی",
                garden: "باغ و باغچه",
                niches: "انبار و سوله",
                price_of: " تومان ",
                bedroom_of: " خواب ",
                size_of: " متر ",
                rent_of: " اجاره "
            }, t = [];
            ["sales_type", "type"].forEach(function (n) {
                if (e.hasOwnProperty(n)) {
                    var o = a[e[n]];
                    t.push(o)
                }
            }), t.push(" در "), o = [], searchModule.results.forEach(function (e) {
                o.push(e.name)
            }), t.push(o.join(" ، ")), ["price", "size", "rent", "bedroom"].forEach(function (n) {
                if (e.hasOwnProperty("min_" + n)) {
                    var o = e["min_" + n];
                    t.push(" از " + o + a[n + "_of"])
                }
                if (e.hasOwnProperty("max_" + n)) {
                    var s = e["max_" + n];
                    t.push(" تا " + s + a[n + "_of"])
                }
            }), ["props"].forEach(function (a) {
                var n = [];
                e.hasOwnProperty(a) && (t.push(" دارای  "), console.log(e[a]), e[a].split(",").forEach(function (e) {
                    n.push(e), t.push($("input[value=" + e + "]~label").text().trim())
                }))
            });
            var n = "";
            t.forEach(function (e) {
                n += e + " "
            }), $(".search-sentence").text(globals.parseArabic(n));
            var o = [];
            for (var s in searchModule.results) o.push(searchModule.results[s].id);
            $("#alertModal input[name=areas]").val(o.join(",")), $("#alertModal input[name=sales_type]").val($(".main-search [name=sales_type]").val()), $("#alertModal input[name=json]").val(JSON.stringify(e)), $("#alertModal input[name=mobile]").val(member.mobile)
        } else swal("خطا", "لطفا حداقل یک محله را جزو معیار های خود قرار دهید .", "error")
    }
}, loginModule = {};
loginModule.loginChooseContainer = $(".login-chooser"), loginModule.loginContainer = $(".login-container"), loginModule.registerCode = $(".register-code"), loginModule.resetContainer = $(".reset-password"), loginModule.registerContainer = $(".register-container"), loginModule.baseContainer = $(".auth-container"), loginModule.timer = 90, loginModule.actionAfterLogin = "", loginModule.showMessage = function (e, a) {
    $(".login-message span").html(e), $(".login-message").removeClass("hidden login-error login-success").addClass("login-" + a)
}, loginModule.handleError = function (e) {
    if (422 == e.status) {
        var a = "";
        for (var t in e.responseJSON.errors) a += e.responseJSON.errors[t] + "<br>";
        loginModule.showMessage(a, "error")
    } else loginModule.showMessage("خطا در ارتباط", "error")
}, loginModule.setFavorites = function () {
    var e = member.favorites;
    if (e) {
        var a = e.split(",");
        $(".fav-count").html(a.length);
        var t = [];
        a.forEach(function (e, a) {
            parseInt(e) && t.push(e)
        }), (a = t).length && $(".favorite").each(function () {
            var e = $(this), t = e.data("post-id");
            "icon" == e.data("type") ? a.indexOf(t.toString()) > -1 ? e.removeClass("sh-heart0").addClass("sh-heart1 favorited").removeClass("sh-heart0") : e.removeClass("sh-heart1 favorited").addClass("sh-heart0") : a.indexOf(t.toString()) > -1 ? (e.addClass("favorited"), e.html("<i class='sh-heart1'></i>")) : (e.html("<i class='sh-heart0'></i>"), e.removeClass("favorited"))
        })
    } else $(".favorite").each(function () {
        "icon" == $(this).data("type") ? $(this).removeClass("sh-heart1").removeClass("fixed").addClass("sh-heart0") : $(this).find("i").removeClass("sh-heart1").removeClass("sh-checked").removeClass("fixed")
    }), $(".liked").removeClass("active"), $(".favorite").removeClass("favorited")
}, loginModule.new_favorite = function (e) {
    member.hasOwnProperty("id") ? loginModule.postData("manage/favorites", { favorite_id: e }) : (loginModule.actionAfterLogin = "fav" + e, $("#authModal").modal("show"))
}, loginModule.open_favorite = function () {
    member.hasOwnProperty("id") ? location.href = "/manage/favorites" : (loginModule.actionAfterLogin = "heart", $("#authModal").modal("show"))
}, loginModule.handleAction = function (e) {
    switch (loginModule.baseContainer.hide(), $(".auth-form").each(function () {
        this.reset()
    }), $(".modal-body .back").removeClass("hidden"), e) {
        case "login":
            loginModule.loginContainer.show();
            break;
        case "registerCode":
            loginModule.resetTimer(), loginModule.registerCode.show();
            break;
        case "resetPass":
            loginModule.resetContainer.show();
            break;
        case "back":
            $(".modal-body .back").addClass("hidden"), loginModule.loginChooseContainer.show();
            break;
        case "register":
            loginModule.registerContainer.show()
    }
}, loginModule.checkLogin = function () {
    member.hasOwnProperty("id") && loginModule.setFavorites()
}, loginModule.login = function (e) {
    if (member = e.object, loginModule.checkLogin(), requests.get("auth-menu", function (e) {
        $("#auth_content").html(e)
    }, function (e) {
    }), $("#authModal").modal("hide"), loginModule.actionAfterLogin.indexOf("fav") > -1) {
        var a = loginModule.actionAfterLogin.replace("fav", "");
        loginModule.new_favorite(a)
    }
    loginModule.actionAfterLogin.indexOf("alert") > -1 && $(".alert-save").trigger("click"), "submitForm" === loginModule.actionAfterLogin && $(".announce-form").submit(), "saved" === loginModule.actionAfterLogin && (location.href = "/manage/alerts"), "heart" === loginModule.actionAfterLogin && (location.href = "/manage/alerts")
}, loginModule.showLoading = function () {
    $(".submit-form").each(function () {
        globals.showLoadingBtn($(this))
    })
}, loginModule.hideLoading = function () {
    $(".submit-form").each(function () {
        globals.hideLoadingBtn($(this))
    })
}, loginModule.postData = function (e, a) {
    loginModule.showLoading(), $(".login-message").addClass("hidden"), requests.post(e, a, function (t) {
        if (loginModule.hideLoading(), !0 === t.success) switch (e) {
            case "checknumber":
                "login" == t.object.type ? (loginModule.handleAction("login"), $("#login_password").focus(), $("#login_mobile").val(t.object.mobile), $("#login_user_id").val(t.object.id)) : (loginModule.handleAction("registerCode"), $("#register_code").focus(), $("#register_mobile").val(t.object.mobile), $("#register_id").val(t.object.id));
                break;
            case "register/register":
            case "login":
                loginModule.login(t);
                break;
            case "newsletters":
                loginModule.showMessage("ایمیل شما در سیستم ثبت شد .", "success");
                break;
            case "package-request":
                swal("ثبت درخواست", "درخواست شما با موفقیت در سیستم ثبت شد . کارشناسان شابش به زودی با تماس خواهند گرفت .", "success"), $("#packageModal").modal("hide");
                break;
            case "forget-code":
                $(".reset-userid").val(t.object.id), loginModule.handleAction("resetPass"), $("#remember_token").focus();
                break;
            case "reset-pass":
                loginModule.showMessage("رمز عبور با موفقیت تغییر کرد .", "success"), loginModule.handleAction("login"), $("#login_password").focus(), $("#login_mobile").val(t.object.mobile), $("#login_user_id").val(t.object.id);
                break;
            case "manage/changepass":
                loginModule.showMessage("رمز عبور با موفقیت تغییر کرد .", "success"), loginModule.handleAction("login");
                break;
            case "register/confirm":
                loginModule.handleAction("register"), $("#reg_mobile").val(t.object.mobile), $("#reg_code").val(t.object.code), $("#reg_id").val(t.object.id);
                break;
            case "reports":
                swal("ثبت شد!", t.message, "success"), $("#report-announce").modal("hide");
                break;
            case "manage/deleted":
                var n = t.object.id;
                $("#announce-" + n).remove(), $("#delete-announce").modal("hide");
                break;
            case "import-confirm":
                $(".popover").popover("hide"), $("#status" + t.object.id).parent().parent().remove(), $(".action-buttons button").popover("hide"), $("#EditModal").modal("hide");
                break;
            case "register/resend":
            case "resend-publish":
            case "manage/resend-advisor":
                loginModule.resetTimer();
                break;
            case "publish":
                if (gtag("event", "Create", {
                    event_category: "Announce",
                    event_label: t.object.announce_id
                }), "panel" == t.object.type) {
                    $("#confirmAccount").modal("hide");
                    var o = $(".ajax-pagination li.active button").data("href");
                    $("#ajax-data").css("opacity", "0.5"), $.get(o, function (e) {
                        $("#ajax-data").removeAttr("style").html(e)
                    })
                } else window.location.href = "/manage/published/" + t.object.announce_id;
                break;
            case "manage/resend":
                loginModule.resetTimer();
                break;
            case "manage/favorites":
                member.favorites = t.object, loginModule.setFavorites();
                break;
            case "manage/update":
                t.object.changed ? ($("#mobile").val(t.object.mobile), loginModule.resetTimer(), $("#confirmAccount").modal({
                    backdrop: "static",
                    keyboard: !1
                })) : loginModule.showMessage(t.message, "success");
                break;
            case "manage/confirm":
                $("#confirmAccount").modal("hide"), loginModule.showMessage(t.message, "success");
                break;
            case "manage/alerts":
                $(".saved_modal").modal("hide"), swal("ذخیره شد!", "اطلاع رسانی شما ذخیره شد", "success");
                break;
            case "feedbacks":
                $(".feedback").removeClass("active"), $(".tanx-box").addClass("animated bounceInRight").show(100).delay(5e3).hide(100);
                break;
            case "comments":
                $(".modal").modal("hide"), swal("ارسال شد!", "نظر شما ثبت شد .", "success");
                break;
            case "send-sms":
                swal("ارسال شد!", "پیامک ارسال شد .", "success")
        } else switch (e) {
            case "newsletters":
                loginModule.showMessage("ایمیل شما در سیستم ثبت شد .", "success");
                break;
            case "manage/favorites":
                loginModule.actionAfterLogin = "fav" + a.id, $("#authModal").modal("show");
                break;
            case "send-sms":
                swal("ارسال پیامک", t.message, "warning");
                break;
            default:
                loginModule.showMessage(t.message, "error")
        }
    }, function (e) {
        loginModule.hideLoading(), loginModule.handleError(e)
    })
}, loginModule.logout = function () {
    swal({
        title: "خروج از سیستم ",
        text: "از سیستم خارج می شوید ؟",
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "بله ",
        cancelButtonText: "خیر"
    }).then(function (e) {
        e.value && (member = "", requests.get("logout", {}, function (e) {
            location.reload()
        }, function (e) {
        }), $(".modal_favorite").modal("hide"), loginModule.checkLogin())
    })
}, loginModule.resetTimer = function () {
    loginModule.timer = 90, $(".timer-span").html(loginModule.timer), $(".timer-span").removeClass("hidden"), $(".resend-span").addClass("hidden");
    var e = setInterval(function () {
        loginModule.timer > 0 ? (loginModule.timer--, $(".timer-span").html(loginModule.timer)) : ($(".timer-span").addClass("hidden"), clearInterval(e), $(".resend-span").removeClass("hidden"))
    }, 1e3)
}, $(document).ready(function () {
    $(".modal-body .back").click(function () {
        loginModule.handleAction("back")
    }), $(document).on("click", ".save-alert", function () {
        alert.set()
    }), $(document).on("click", ".close-swal", function () {
        swal.close()
    }), $(document).on("click", ".alert-panel", function () {
        member && member.hasOwnProperty("id") ? location.href = "/manage/alerts" : (loginModule.actionAfterLogin = "saved", $("#authModal").modal("show"))
    }), $(".favorites-page .remove-fave").on("click", function () {
        var e = $(this);
        swal({
            title: "تاییدیه حذف ",
            text: "آگهی  مورد نظر از علاقه مندی های شما حذف گردد ؟",
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله ",
            cancelButtonText: "خیر"
        }).then(function (a) {
            if (a.value) {
                var t = e.data("id");
                $("#announce-" + t).remove(), loginModule.new_favorite(t)
            }
        })
    }), $(document).on("click", ".saved_button", function (e) {
        member.hasOwnProperty("id") ? $(".saved_modal").modal("show") : (loginModule.actionAfterLogin = "alert", $("#authModal").modal("show"))
    }), $(document).on("click", ".favorite", function (e) {
        e.preventDefault();
        var a = $(this).data("post-id");
        loginModule.new_favorite(a)
    }), $(document).on("click", ".fav-show", function (e) {
        e.preventDefault(), loginModule.open_favorite()
    }), $(':radio[name="reg_type"]').change(function () {
        "User" == $(this).filter(":checked").val() ? ($(".agency-popover").css("display", "none"), $(".form-elements").removeClass("disabled"), $(".announce-form input[type='checkbox'], .announce-form textarea , .announce-form select , .announce-form button").removeAttr("disabled")) : ($(".agency-popover").css("display", "block"), $(".form-elements").addClass("disabled"), $(".announce-form input[type='checkbox'], .announce-form textarea , .announce-form select ,  .announce-form button").attr("disabled", !0))
    }), $(document).on("click", ".forget-pass", function () {
        var e = $("#login_user_id").val();
        e ? loginModule.postData("forget-code", { user_id: e }) : ($(".login-error span").html("لطف شماره تلفن را وارد نمایید ."), $(".login-error").removeClass("hidden"))
    }), $(document).on("click", ".login-error i , .login-success i", function () {
        $(".login-error , .login-success").addClass("hidden")
    }), $(document).on("click", ".resend-register", function () {
        loginModule.postData("register/resend", { reg_id: $("#reg_id").val() })
    }), $(document).on("click", ".resend-publish", function () {
        loginModule.postData("resend-publish", { announce_id: $("#announce_id").val() })
    }), $(document).on("click", ".resend-change", function () {
        loginModule.postData("manage/resend", { user_id: $("#user_id").val(), mobile: $("#mobile").val() })
    }), $(document).on("click", ".logout", function (e) {
        return loginModule.logout(), !1
    }), $(document).on("submit", ".auth-form", function (e) {
        e.preventDefault();
        var a = $(this).data("submit"), t = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {});
        loginModule.postData(a, t)
    }), $("#authModal").on("shown.bs.modal", function () {
        loginModule.actionAfterLogin.indexOf("fav") > -1 && ($("#authModal").addClass("favorite-modal-open"), $(".fav-text span").html("برای افزودن  علاقه مندی ها، ابتدا وارد سیستم شوید")), (loginModule.actionAfterLogin.indexOf("alert") > -1 || loginModule.actionAfterLogin.indexOf("saved") > -1) && ($("#authModal").addClass("alarm-open"), $(".alarm-text span").html("برای دریافت آخرین آگهی ها، ابتدا وارد سیستم شوید")), $("#mobile1").focus()
    }), $("#authModal").on("hidden.bs.modal", function () {
        loginModule.actionAfterLogin = "", $("#authModal").removeClass("favorite-modal-open alarm-open"), $(".fav-text span").html(""), $(".alarm-text span").html("")
    }), loginModule.handleAction("back"), loginModule.checkLogin()
});
var announceModule = {
    adminLoad: function () {
        var e = $(".ajax-pagination li.active button").data("href");
        e ? ($("#ajax-data").css("opacity", "0.5"), $.get(e, function (e) {
            $("#ajax-data").removeAttr("style").html(e)
        })) : location.reload()
    }, submitForm: function (e) {
        var a = {};
        for (var t in e) {
            var n = e[t].name.replace("[]", "");
            a.hasOwnProperty(n) ? a[n] += "," + e[t].value : a[n] = e[t].value
        }
        if (!a.location_ids) return $(".area-important").addClass("visible"), $("#searchtext").focus(), !1;
        if (a.area_id = a.location_ids, member.hasOwnProperty("id")) {
            var o = [];
            if (announceModule.myDropzone.length && announceModule.myDropzone[0].dropzone.files.length) for (var s in announceModule.myDropzone[0].dropzone.files) {
                var i = announceModule.myDropzone[0].dropzone.files[s];
                if ("success" == i.status) {
                    var r = JSON.parse(i.xhr.responseText);
                    r.success && o.push(r.object.id)
                }
            }
            $(".image-gallery.is-main").length && (a.selected_cover = $(".image-gallery.is-main").data("id")), $(".new-image").length && $(".new-image").each(function () {
                o.push($(this).data("id"))
            }), a.image_ids = o.join(",");
            var l = "announce";
            $("#edit_id").length && (a._method = "put", l += "/" + $("#edit_id").val()), loginModule.showLoading(), $(".login-message").addClass("hidden"), requests.post(l, a, function (e) {
                loginModule.hideLoading(), e.success ? e.object.verified ? (a.hasOwnProperty("_method") || gtag("event", "Create", {
                    event_category: "Announce",
                    event_label: e.object.id
                }), $("[name=special_type]:checked").val() && !e.object.special ? announceModule.goSpecial($("[name=special_type]:checked").val(), e.object.id, a.hasOwnProperty("_method") ? "updated" : "published") : window.location.href = "/manage/" + (a.hasOwnProperty("_method") ? "updated" : "published") + "/" + e.object.id) : ($("#announce_id").val(e.object.id), loginModule.resetTimer(), $("#confirmAccount").modal({
                    backdrop: "static",
                    keyboard: !1
                })) : swal("خطا در ثبت آگهی", e.message, "error")
            }, function (e) {
                loginModule.hideLoading(), loginModule.handleError(e)
            })
        } else loginModule.actionAfterLogin = "submitForm", $("#authModal").modal("show")
    }, updateAnnounceDate: function (e) {
        requests.confirm("به روز رسانی", "با به روز رسانی آگهی ، تاریخ انتشار آگهی شما به تاریخ امروز محاسبه خواهد شد .", "warning", function (a) {
            a && requests.post("update-announce", { id: e }, function (e) {
                e.success ? swal("به روز رسانی", e.message, "success").then(function () {
                    announceModule.adminLoad()
                }) : swal("به روز رسانی", e.message, "error")
            })
        })
    }, buyPackage: function (e, a, t) {
        swal({
            title: "خرید بسته",
            text: "از خرید بسته اطمینان دارید ؟",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله ",
            cancelButtonText: "خیر"
        }).then(function (n) {
            n.value && (loginModule.showLoading(), requests.post("/special-factor", {
                item_id: a,
                special_type: e,
                period: t
            }, function (e) {
                e.success && e.object ? window.location.href = "/transaction/" + e.object : swal("خرید بسته", e.message, "warning")
            }, function (e) {
                loginModule.hideLoading(), loginModule.handleError(error)
            }))
        })
    }, goSpecial: function (e, a, t) {
        loginModule.showLoading(), requests.post("/special-factor", { item_id: a, special_type: e }, function (n) {
            n.success && n.object ? window.location.href = "/transaction/" + n.object : swal("ویژه", "آگهی مورد نظر " + ("special" == e ? "ویژه" : "طلایی") + " شد .", "success").then(function (e) {
                t ? window.location.href = "/manage/" + t + "/" + a : announceModule.adminLoad()
            })
        }, function (e) {
            loginModule.hideLoading(), loginModule.handleError(error)
        })
    }
};
$("div#my-awesome-dropzone").length ? announceModule.myDropzone = $("div#my-awesome-dropzone").dropzone({
    url: "/upload",
    uploadMultiple: "",
    maxFilesize: 15,
    dictDefaultMessage: "<button type='button' class='clickable'><i class='sh-camera'></i> <span>افزودن تصاویر</span></button><span class='or-text d-none d-sm-block'>یا</span><div class='drop-text'><i class='sh-gallery d-none d-sm-block'></i><span class='d-none d-sm-block'>تصاویر را اینجا بکشید</span></div><span class='uploading hidden'>در حال بارگزاری تصویر</span>",
    dictRemoveFile: "X",
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    thumbnailWidth: 110,
    thumbnailHeight: 76,
    headers: { "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content") },
    addRemoveLinks: !0,
    sending: function (e, a, t) {
        t.append("type", "Announce"), t.append("target", "unregistered"), $(".uploading").removeClass("hidden"), $("input[type=submit]").attr("disabled")
    },
    complete: function (e) {
        if ($(".uploading").addClass("hidden"), $("input[type=submit]").removeAttr("disabled"), e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement) {
            var a = JSON.parse(e.xhr.response);
            return e.previewElement.setAttribute("data-id", a.object.id), e.previewElement.classList.add("image-gallery"), e.previewElement.classList.add("dz-complete")
        }
    },
    error: function (e, a) {
        var t;
        return swal("خطا در بارگزاری", a, "error"), e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass()
    },
    removedfile: function (e) {
        if ("success" == e.status) {
            var a = JSON.parse(e.xhr.response);
            globals.removeImage(a.object.id)
        }
        var t;
        return e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass()
    }
}) : announceModule.myDropzone = [], $(document).ready(function () {
    $(".announce-form").submit(function (e) {
        e.preventDefault();
        var a = $(this).serializeArray();
        announceModule.submitForm(a)
    }), $(document).on("click", ".image-gallery", function () {
        $(".image-gallery").removeClass("is-main"), $(this).addClass("is-main")
    })
}), $(document).ready(function () {
    $("#IranMap svg g path").hover(function () {
        var e = $(this).attr("class").replace("active", ""), a = $(this).parent("g").attr("class"),
            t = $("#IranMap .list ." + a + " ." + e + " a").html();
        t && ($("#IranMap .list ." + a + " ." + e + " a").addClass("hover"), $("#IranMap .show-title").html(t).css({ display: "block" }))
    }, function () {
        $("#IranMap .list a").removeClass("hover"), $("#IranMap .show-title").html("").css({ display: "none" })
    }), $("#IranMap").mousemove(function (e) {
        var a = 0, t = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY ? (a = e.pageX, t = e.pageY) : (e.clientX || e.clientY) && (a = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, t = e.clientY + document.body.scrollTop + document.documentElement.scrollTop), $("#IranMap .show-title").html()) {
            var n = $(this).offset(), o = a - n.left + 25 + "px", s = t - n.top - 5 + "px";
            $("#IranMap .show-title").css({ left: o, top: s })
        }
    }), $("#IranMap svg g path").click(function () {
        var e = $(this).data("href");
        window.location.replace("search/خرید-فروش/املاک/" + {
            1: "تهران",
            2: "البرز",
            3: "مازندران",
            4: "گیلان",
            5: "خراسان",
            6: "اصفهان",
            7: "آذربایجان-شرقی",
            8: "هرمزگان",
            9: "آذربایجان-غربی",
            10: "اردبیل",
            11: "ایلام",
            12: "بوشهر",
            13: "چهارمحال-و-بختیاری",
            14: "خراسان-جنوبی",
            15: "خراسان-شمالی",
            16: "خوزستان",
            17: "زنجان",
            18: "سمنان",
            19: "سیستان-و-بلوچستان",
            20: "فارس",
            21: "قزوین",
            22: "قم",
            23: "کردستان",
            24: "کرمان",
            25: "کهگیلویه-و-بویر-احمد",
            26: "کرمانشاه",
            27: "گلستان",
            28: "لرستان",
            29: "مرکزی",
            30: "همدان",
            31: "یزد"
        }[e])
    }), $("#IranMap .map .province path").click(function () {
        var e = $(this).attr("class"), a = $("#IranMap .list>ul>li>ul>li." + e + " a").html();
        a && $("#IranMap .city").html("نمایش شهرهای استان " + a)
    }), $("#IranMap .list li.province>ul>li>a").click(function (e) {
        var a = $(this).html();
        a && $("#IranMap .city").html("نمایش شهرهای استان " + a), e.preventDefault()
    })
}), $(document).ready(function () {
    $(document).on("click", ".banner-request", function () {
        $("#selected-package").val("banner"), $("#packageModal").modal("show")
    }), $(document).on("click", ".package-request", function () {
        $("#selected-package").val($(this).data("type")), $("#packageModal").modal("show")
    }), $("#remove-alert-form").submit(function (e) {
        e.preventDefault();
        var a = $(this).find("button");
        globals.showLoadingBtn(a);
        var t = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {});
        requests.post("email/remove-alert", t, function (e) {
            e.success ? swal("", e.message, "success").then(function () {
                window.location = "/"
            }) : swal("خطا!", e.message, "error")
        })
    }), $("#email-alert-form").submit(function (e) {
        e.preventDefault();
        var a = $(this);
        a.find("button"), globals.showLoadingBtn(a.find("button"));
        var t = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {});
        requests.post("alerts", t, function (e) {
            globals.hideLoadingBtn(a.find("button")), e.success ? swal("ثبت شد", "اطلاع رسانی با موفقیت ثبت شد .", "success").then(function () {
                $("#alertModal").modal("hide")
            }) : swal("خطا!", e.message, "error")
        })
    }), $("#agent-register-form").submit(function (e) {
        e.preventDefault();
        var a = $(this).find("button");
        if (globals.showLoadingBtn(a), $("#agent-main-password").val() != $("#agent-re-password").val()) return swal("خطا!", "تکرار رمز عبور صحیح نمی باشد .", "error"), globals.hideLoadingBtn(a), !1;
        var t = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {});
        requests.post("register-agent", t, function (e) {
            globals.hideLoadingBtn(a), e.success ? window.location.href = "/manage/dashboard" : swal("خطا!", e.message, "error")
        }, function (e) {
            globals.hideLoadingBtn(a)
        })
    }), $(document).on("submit", "#send-mail-to-agents", function (e) {
        e.preventDefault();
        var a = $(this).find("button");
        globals.showLoadingBtn(a);
        var t = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {});
        requests.post("email/email-to-agents", t, function (e) {
            globals.hideLoadingBtn(a), e.success ? swal("ثبت شد", "ارسال ایمیل به آگهی دهنده با موفقیت انجام شد .", "success").then(function () {
                $("#email-alert-modal").modal("hide")
            }) : swal("خطا!", e.message, "error")
        })
    }), $(document).on("click", ".update-announce", function () {
        var e = $(this).data("id");
        announceModule.updateAnnounceDate(e)
    }), $(document).on("click", ".phone-process", function (e) {
        e.stopPropagation(), e.preventDefault();
        var a = { item_id: $(this).data("id"), type: $(this).data("type"), view: $(this).data("view") };
        switch ($(this).data("view")) {
            case "sms":
                gtag("event", $(this).data("type"), {
                    event_category: "Sms",
                    event_label: $(this).data("id")
                }), a.contact = "sms";
                break;
            case "whatsapp":
                gtag("event", $(this).data("type"), {
                    event_category: "WhatsApp",
                    event_label: $(this).data("id")
                }), a.contact = "whatsapp";
                break;
            default:
                gtag("event", $(this).data("type"), {
                    event_category: "Call",
                    event_label: $(this).data("id")
                }), a.contact = "call"
        }
        $("#call-modal-result").html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'), $("#call-modal").modal("show"), requests.post("calls", a, function (e) {
            $("#call-modal-result").html(e)
        })
    }), $(document).on("click", ".email-process", function (e) {
        e.stopPropagation(), e.preventDefault();
        var a = $(this).data("id"), t = $(this).data("name");
        $("#call-modal-result").html('<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'), $("#email-alert-modal").modal("show"), requests.get("announces-mail", { id: a }, function (e) {
            $("#email-modal-result").html(e), $("#agent-name").text(t)
        }, function (e) {
            console.log(e)
        })
    })
}), $(document).ready(function () {
    if (automateHover.putImg(), $(".agency-hover-show").hover(function () {
        automateHover.start($(this)), $(".agency-hover").find("h4").text($(this).data("name")), $(".agency-hover").find(".agency-address").text($(this).data("location")), $(".agency-hover").find(".agency-phone").text($(this).data("phone")), $(".agency-hover").find(".agency-mobile").text($(this).data("mobile")), $(".agency-hover").find(".agency-image").attr("src", $(this).data("img"))
    }, function () {
        $(".agency-hover").css("display", "none")
    }), $(document).on("click", ".feedback-button", function (e) {
        $(this).parent().toggleClass("active"), $(".feedback-form").removeClass("active"), $(".select-feedback").removeClass("active"), $("#feedbackType").val(""), $(".feedback .login-message").addClass("hidden")
    }), $(document).on("click", ".select-feedback", function (e) {
        $(".select-feedback").removeClass("active"), $(this).toggleClass("active"), $(".feedback-form").addClass("active"), $("#feedbackType").val($(this).data("type"))
    }), $(document).on("click", ".toggle-social", function () {
        $(this).toggleClass("active")
    }), $("#print").on("click", function () {
        window.print()
    }), $(".flex-label").on("keyup input propertychange paste focus", function () {
        $(this).val().length ? $(this).parent().find("label").addClass("fixed") : $(this).parent().find("label").removeClass("fixed")
    }), $(".to-string").on("keyup input propertychange paste focus", function () {
        var e = parseInt($(this).val());
        e > -1 ? ($(this).val(e), e > 0 ? $(this).parent().find(".price-text").html(globals.numberToString($(this).val(), 0) + " تومان") : "price" === $(this).attr("name") ? $(this).parent().find(".price-text").html("تماس بگیرید .") : $(this).parent().find(".price-text").html("رهن کامل")) : $(this).val("")
    }), $(".to-be-formatted").each(function () {
        $(this).on("keyup input propertychange paste focus", function () {
            $(this).val(globals.parseArabic($(this).val())), $(this).val(globals.commaFormatted($(this).val()))
    })
    }), $(".number-only").each(function () {
        $(this).on("keyup input propertychange paste focus", function () {
            $(this).val(globals.parseArabic($(this).val()))
    })
    }), $(function () {
        $(".phone-toggle").popover({ container: "body" })
    }), $(".announce-form").length && $("#typeselect").trigger("change"), $(".filter_form_home").length && $("input[type=hidden][name=type]").trigger("change"), $('[data-toggle="tooltip"]').tooltip(), $(".email-btn").click(function () {
        $(this).addClass("active");
        var e = $(this).data("id");
        $(this).find("span").text(e)
    }), $(".votes").click(function (e) {
        e.preventDefault();
        var a = $("#comment-profile-tab");
        a.length && ($("html, body").stop().animate({ scrollTop: a.offset().top }, 1e3), $(".nav-item").removeClass("active"), $("#comment-profile-tab").addClass("active"), $(".tab-pane").removeClass("active show"), $("#our-comment").addClass("active show"))
    }), $(".sh-print").click(function () {
        window.print()
    }), $(".blog-form-submit").click(function () {
        $("#blog-search").submit()
    }), $(".blog-input").keypress(function () {
        13 == e.which && $("#blog-search").submit()
    }), $(".landing-nav").click(function (e) {
        e.preventDefault();
        var a = $(this).attr("href");
        return $("html,body").animate({ scrollTop: $(a).offset().top }, 500), !1
    }), $("ul.column").length && $("ul.column >li").click(function () {
        $(this).toggleClass("selected-home-link"), $("ul.column >li").not(this).removeClass("selected-home-link"), $("ul.column >li").not(this).find("i.sh-dash").removeClass("sh-dash").addClass("sh-add"), $(this).hasClass("selected-home-link") ? $(this).find("i.sh-add").removeClass("sh-add").addClass("sh-dash") : $(this).find("i.sh-dash").removeClass("sh-dash").addClass("sh-add")
    }), $(".property-box").length && $(".see-more-property").click(function () {
        var e = $(".property-sec"), a = $(".property-box").data("link-number");
        $(this).toggleClass("active"), $(this).hasClass("active") ? $(this).children("span").html(' کمتر <i class="sh-up"></i>') : $(this).children("span").html(' بیشتر <i class="sh-down"></i>'), $.each(e, function () {
            $(this).index() > a && $(this).toggleClass("hidden")
    })
    }), $(document).on("click", ".menu-icon", function () {
        $(".mobile-right-side-bg").addClass("active"), $(".mobile-right-side-bar").addClass("active"), $("body").addClass("disable-scroll")
    }), $(document).on("click", ".user-menu", function () {
        $(".mobile-left-side-bg").addClass("active"), $(".mobile-left-side-bar").addClass("active"), $("body").addClass("disable-scroll")
    }), $(document).on("click", ".close-btn", function () {
        $(".mobile-right-side-bg,.panel-right-side-bg,.mobile-left-side-bg").removeClass("active"), $(".mobile-right-side-bar,.mobile-left-side-bar").removeClass("active"), $("body").removeClass("disable-scroll")
    }), $(document).on("click", ".mobile-right-side-bg,.mobile-left-side-bg ", function () {
        $(".mobile-right-side-bar").removeClass("active"), $(".mobile-left-side-bar").removeClass("active"), $(this).removeClass("active"), $("body").removeClass("disable-scroll")
    }), $(".more-btn-mobile").click(function () {
        $(".more-filters").toggleClass("d-none d-lg-block"), $(".more-filters").hasClass("d-none d-lg-block") ? $(this).html('<span>معیار های بیشتر</span><i class="sh-add"></i>') : $(this).html('<span>معیار های کمتر</span><i class="sh-dash"></i>')
    }), $(".package-section").length && ($(window.width < 768) && $(".package-section").addClass("toggle-off"), $(".package-section").click(function () {
        $(this).toggleClass("toggle-off"), $(this).parent(".package-holder").toggleClass("active")
    })), $(".demo-scroll").click(function () {
        $("html,body").animate({ scrollTop: $(".demo-from").offset().top }, 500)
    }), $(".single-package").click(function () {
        $(this).toggleClass("open")
    }), $(".share-announce").click(function (e) {
        e.preventDefault();
        var a = $(this).data("title"), t = $(this).data("url"), n = "whatsapp://send?text=" + a + ":" + t,
            o = "https://telegram.me/share/url?url=" + t + "&text=" + a,
            s = "http://www.linkedin.com/shareArticle?url=" + t + "&title=" + a + "&source=" + $(this).data("source"),
            i = "mailto:?subject=" + a + "&body=" + t;
        $(".whatsapp-link").attr("href", n), $(".telegram-link").attr("href", o), $(".linkdin-link").attr("href", s), $(".mailto").attr("href", i)
    }), $(".multiple-select-box span").click(function () {
        $(".multiple-select-box").toggleClass("active")
    }), $("input[type='checkbox'][name='props']").change(function () {
        var e = [];
        $.each($("input[type='checkbox'][name='props']:checked"), function () {
            e.push($(this).next("label").text())
    });
        var a = 0 === e.length ? "امکانات" : "", t = e.length > 3 ? " ..." : "";
        $(".multiple-select-box span").text(e.splice(0, 3).join(" ، ") + t + a)
    }), $("#project-read-more").click(function (e) {
        e.preventDefault(), $(".project-desc").toggleClass("open"), $(".project-desc").hasClass("open") ? $(this).find("i").removeClass("sh-down").addClass("sh-up") : $(this).find("i").removeClass("sh-up").addClass("sh-down")
    }), $("#project-category").change(function (e) {
        var a = $(this).val();
        a ? ($(".single-plan").addClass("hidden"), $(".cat-" + a).removeClass("hidden")) : $(".single-plan").removeClass("hidden")
    }), $("#contact-project-request").click(function (e) {
        e.preventDefault(), $(".form-container-mobile").toggleClass("open"), $(".form-container-mobile").hasClass("open") ? $(this).find("i").removeClass("sh-up").addClass("sh-down") : $(this).find("i").removeClass("sh-down").addClass("sh-up")
    }), $(".project-page").length) {
        $(".project-navs a").on("click", function (e) {
            var a = $(this).data("href"), t = $("#" + a).offset().top, n = $(document).scrollTop(),
                o = 2e3 * Math.abs(parseInt(n - t)) / $(document).height();
            $("html, body").animate({ scrollTop: parseInt($("#" + a).offset().top) - 80 }, o), e.preventDefault()
        });
        var a = $("#" + $(".project-navs a").eq(1).data("href")).offset().top,
            t = $("#" + $(".project-navs a").eq(2).data("href")).offset().top;
        $(document).on("scroll", function () {
            var e = $(document).scrollTop();
            $(".project-navs a").removeClass("active"), e > t - 100 ? $(".project-navs a").eq(2).addClass("active") : e > a - 100 ? $(".project-navs a").eq(1).addClass("active") : $(".project-navs a").eq(0).addClass("active")
        })
    }
}), $(document).ready(function () {
    $(".filter_form_home").submit(function (e) {
        e.preventDefault();
        var a = $(this).serializeArray(), t = app.convertFormValues(a);
        t && (globals.showLoadingBtn($(".home-search")), window.location.href = t, setTimeout(function () {
            globals.hideLoadingBtn($(".home-search"))
        }, 2e3))
    }), $(".sales_type").change(function () {
        "rent" == $(this).val() ? ($(".sale-price").find(".label-title").html("ودیعه :"), $(".mobile-create .sale-price").find("input").attr("placeholder", "ودیعه (تومان)"), $(".rent-price").removeClass("hidden")) : ($(".sale-price").find(".label-title").html("قیمت :"), $(".mobile-create .sale-price").find("input").attr("placeholder", "قیمت (تومان)"), $(".rent-price").addClass("hidden"))
    }), $(document).on("change", "#typeselect", function () {
        var e = $(this).val(), a = $("select[name='bedroom']"), t = $("select[name='build_year']"),
            n = $("input[name='floor']"), o = $("input[name='sum_floor']");
        ["apartment", "administrative", "commercial"].indexOf(e) > -1 || !e ? (n.parent().removeClass("hidden"), o.parent().removeClass("hidden")) : (n.val(""), o.val(""), n.parent().addClass("hidden"), o.parent().addClass("hidden")), ["apartment", "villa", "estate"].indexOf(e) > -1 || !e ? (a.parent().find("label").html("تعداد اتاق خواب *"), $(".mobile-create select[name='bedroom'] option:first-child").text("تعداد اتاق خواب"), a.parent().removeClass("hidden")) : "administrative" == e ? (a.parent().removeClass("hidden"), $(".mobile-create select[name='bedroom'] option:first-child").text("تعداد اتاق"), a.parent().find("label").html()) : (a.val(""), a.parent().addClass("hidden")), "land" != e ? t.parent().removeClass("hidden") : (t.val(""), t.parent().addClass("hidden")), app.filterProps(e)
    }), $(':radio[name="type"]').change(function () {
        var e = $(this).filter(":checked").val();
        "Agent" == e ? ($(".for-agent").removeClass("hidden"), $(".agent-required").attr("required", !0), $(".agency-required").removeAttr("required"), $(".agency-required").each(function () {
            this.setCustomValidity("")
        }), $(".for-agency").addClass("hidden")) : "Agency" == e ? ($(".for-agent").removeClass("hidden"), $(".for-agency").removeClass("hidden"), $(".agency-required").attr("required", !0), $(".agent-required").attr("required", !0)) : ($(".agency-required").removeAttr("required"), $(".agent-required").removeAttr("required"), $(".agency-required").each(function () {
            this.setCustomValidity("")
        }), $(".agent-required").each(function () {
            this.setCustomValidity("")
        }), $(".for-agency").addClass("hidden"), $(".for-agent").addClass("hidden"))
    }), $(document).on("focusout", "input , select , textarea", function () {
        $(this).addClass("dirty")
    }), $(".autocomplete").on("keyup", function () {
        timer_timeout_auto && clearTimeout(timer_timeout_auto), timer_timeout_auto = setTimeout(function () {
            var e = $(this).val(), a = $(this);
            a.parent().find(".results").remove(), e.length > 1 && requests.get("manage/advcomplete", { search: e }, function (e) {
                var t = e.object;
                if (a.parent().find(".results").remove(), t.length) {
                    var n = "<div class='results'>";
                    for (var o in t) n += "<div class='result select-result' data-name='" + t[o].name + "' data-mobile='" + t[o].mobile + "' data-whatsapp='" + t[o].whatsapp + "'>" + t[o].name + " ( " + t[o].mobile + " ) </div>";
                    n += "</div>", a.parent().append(n)
                }
            }, function (e) {
                console.log(e)
            })
        }.bind(this), 500)
    }), $(document).on("click", ".select-result", function () {
        $("#select_whatsapp").val($(this).data("whatsapp")), $("#select_mobile").val($(this).data("mobile")), $("#select_owner").val($(this).data("name")), $(this).parent().remove()
    }), $(document).on("click", ".remove-image", function () {
        var e = $(this), a = $(this).data("id");
        swal({
            title: "تاییدیه حذف ",
            text: "تصویر مورد نظر حذف گردد ؟",
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله . حذف کن!",
            cancelButtonText: "خیر"
        }).then(function (t) {
            t.value && (globals.removeImage(a), e.parent().remove())
        })
    }), $(".submit-form").on("click", function () {
        $(this).closest("form").find("input, select, textarea").addClass("submitted")
    }), $("input, select, textarea").on("invalid", function (e) {
        e.preventDefault(), $(this).focus()
    }), $(document).on("click", ".remove-announce", function () {
        var e = $(this).data("id");
        $("#delete_announce_id").val(e), $("#delete-announce").modal("show")
    }), $(document).on("change", "[name=sales_type],[name=admin_sales_type]", function () {
        var e = $(this).val();
        $(".label-part").length && ($(".label-part label").removeClass("active"), $("label." + e).addClass("active")), "sale" == e ? ($(".search-rent").addClass("hidden"), $(".search-sale").removeClass("hidden"), $(".search-rent").each(function () {
            $(this).find("select").val("")
        })) : ($(".search-rent").removeClass("hidden"), $(".search-sale").addClass("hidden"), $(".search-sale").each(function () {
            $(this).find("select").val("")
        }))
    }), $("#blog-search").submit(function () {
        event.preventDefault();
        var e = $(this).find("[name=search]").val();
        return e && (window.location.href = "/blog/" + e), !1
    })
});
var mobileModule = {
    getCountFilter: function () {
        var e = $(".filter_form_home").serializeArray();
        app.ajaxGetForm(e)
    }
};
$(document).ready(function () {
    $(document).on("click", ".filetr-btn-white", function () {
        $(".modal-backdrop").css("background-color", "#fff")
    }), $(".call-close").click(function () {
        $("#modal-number-span").text(" ")
    }), $("a#go-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow")
    }), $(document).on("click", ".employment-tab-holder", function () {
        $(this).find(".tab-content").toggleClass("hidden"), $(this).find(".tab-content").hasClass("hidden") ? ($(this).find(".employment-tab").css("background", "#fff"), $(this).find("i.sh-up").removeClass("sh-up").addClass("sh-down")) : ($(this).find("i.sh-down").removeClass("sh-down").addClass("sh-up"), $(this).find(".employment-tab").css("background", "#DADADA"))
    }), $(".announce-type-input").change(function () {
        $(".announce-create-desc").addClass("hidden"), $(this).is(":checked") ? $(this).nextAll("span.announce-create-desc").removeClass("hidden") : $(this).nextAll("span.announce-create-desc").addClass("hidden")
    }), $(".download-close").on("touch click", function () {
        $(".download-app").remove(), $(".dark-header").addClass("no-banner")
    }), $(".mobile-layout").length && ($("[name=bedroom]").on("change", function () {
        $("[name=min_bedroom]").prop("checked", !1)
    }), $("[name=min_bedroom]").on("change", function () {
        $("[name=bedroom]").prop("checked", !1)
    }))
}), $(document).ready(function () {
    $(document).on("change", "select[name=spacial_sales_type],select[name=order_agency]", function () {
        var e = $("input[name=agency_id]").val(), a = $("input[name=special_type]").val();
        if ($(this).parent().hasClass("mobile-agent-sort")) {
            $(this).parents(".modal").modal("hide");
            var t = $("select[name=spacial_sales_type]:checked").val(), n = $("select[name=order_agency]:checked").val()
        } else t = $("select[name=spacial_sales_type]").val(), n = $("select[name=order_agency]").val();
        $("#ajax-data").css("opacity", "0.5"), $.get("special-search?sales_type=" + t + "&order=" + n + "&id=" + e + "&type=" + a, function (e) {
            $("#ajax-data").removeAttr("style").html(e)
        })
    }), $(document).on("click", ".ajax-pagination button", function (e) {
        e.preventDefault();
        var a = $(this).data("href");
        $("#ajax-data").css("opacity", "0.5"), $.get(a, function (e) {
            $("#ajax-data").removeAttr("style").html(e)
        })
    })
}), $(document).ready(function () {
    $(".project-contact-form").submit(function (e) {
        e.preventDefault();
        var a = $(this).serializeArray().reduce(function (e, a) {
            return e[a.name] = a.value, e
        }, {}), t = $(this);
        return globals.showLoadingBtn(t.find("button")), requests.post("project-contact", a, function (e) {
            globals.hideLoadingBtn(t.find("button")), $(".contact-form").addClass("hidden"), $(".contact-number").html(e.object).removeClass("hidden"), console.log(e)
        }, function (e) {
            globals.hideLoadingBtn(t.find("button"))
        }), !1
    })
}), $(document).ready(function () {
    var e = document.getElementById("slider_size");
    if (e) {
        var a = [document.getElementById("slider_size_min_value"), document.getElementById("slider_size_max_value")],
            t = [$("#min_size"), $("#max_size")];
        noUiSlider.create(e, {
            connect: !0,
            behaviour: "tap",
            start: [$("#slider_size").data("min"), $("#slider_size").data("max")],
            tooltips: !0,
            direction: "rtl",
            range: { min: [0, 1], "25%": [100, 20], "50%": [400, 50], "80%": [1e3, 500], max: [10500] },
            format: {
                from: function (e) {
                    return Math.round(e)
                }, to: function (e) {
                    return Math.round(e)
                }
            }
        }), e.noUiSlider.on("update", function (e, n, o, s, i) {
            if (0 === i[n] || 100 === i[n]) {
                var r = 0 === n ? "حداقل" : "حداکثر";
                t[n].val(""), a[n].innerHTML = r
            } else t[n].val(e[n]), a[n].innerHTML = e[n] + " متر"
        })
    }
    var n = document.getElementById("slider_price");
    if (n) {
        var o = [document.getElementById("slider_price_min_value"), document.getElementById("slider_price_max_value")],
            s = [$("#min_price"), $("#max_price")];
        noUiSlider.create(n, {
            connect: !0,
            behaviour: "tap",
            start: [$("#slider_price").data("min"), $("#slider_price").data("max")],
            tooltips: !0,
            direction: "rtl",
            range: { min: [0, 50], "30%": [1e3, 500], "60%": [1e4, 5e3], "90%": [5e4, 5e4], max: [5e5] },
            format: {
                from: function (e) {
                    return Math.round(e)
                }, to: function (e) {
                    return Math.round(e)
                }
            }
        }), n.noUiSlider.on("update", function (e, a, t, n, i) {
            var r = $("[name=sales_type]:checked").val();
            if (0 === i[a] || 100 === i[a]) {
                var l = 0 === a ? "حداقل" : "حداکثر";
                "sale" === r && s[a].val(""), o[a].innerHTML = l
            } else "sale" === r && s[a].val(1e6 * e[a]), e[a] < 1e3 ? o[a].innerHTML = e[a] + " ملیون تومان" : o[a].innerHTML = e[a] / 1e3 + " میلیارد تومان"
        })
    }
    var i = document.getElementById("slider_price2");
    if (i) {
        var r = [document.getElementById("slider_price2_min_value"), document.getElementById("slider_price2_max_value")];
        noUiSlider.create(i, {
            connect: !0,
            behaviour: "tap",
            start: [$("#slider_price2").data("min"), $("#slider_price2").data("max")],
            tooltips: !0,
            direction: "rtl",
            range: { min: [0, 10], "25%": [100, 20], "50%": [500, 50], "70%": [1e3, 100], "85%": [2e3, 500], max: [1e4] },
            format: {
                from: function (e) {
                    return Math.round(e)
                }, to: function (e) {
                    return Math.round(e)
                }
            }
        }), i.noUiSlider.on("update", function (e, a, t, n, o) {
            var i = $("[name=sales_type]:checked").val();
            if (0 === o[a] || 100 === o[a]) {
                var l = 0 === a ? "حداقل" : "حداکثر";
                "rent" === i && s[a].val(""), r[a].innerHTML = l
            } else "rent" === i && s[a].val(1e6 * e[a]), e[a] < 1e3 ? r[a].innerHTML = e[a] + " ملیون تومان" : r[a].innerHTML = e[a] / 1e3 + " میلیارد تومان"
        })
    }
    var l = document.getElementById("slider_rent");
    if (l) {
        var c = [document.getElementById("slider_rent_min_value"), document.getElementById("slider_rent_max_value")],
            d = [$("#min_rent"), $("#max_rent")];
        noUiSlider.create(l, {
            connect: !0,
            behaviour: "tap",
            start: [$("#slider_rent").data("min"), $("#slider_rent").data("max")],
            tooltips: !0,
            direction: "rtl",
            range: { min: [0, 100], "20%": [1e3, 200], "40%": [3e3, 500], "70%": [1e4, 1e3], max: [5e4] },
            format: {
                from: function (e) {
                    return Math.round(e)
                }, to: function (e) {
                    return Math.round(e)
                }
            }
        }), l.noUiSlider.on("update", function (e, a, t, n, o) {
            var s = $("[name=sales_type]:checked").val();
            if (0 === o[a] || 100 === o[a]) {
                var i = 0 === a ? "حداقل" : "حداکثر";
                d[a].val(""), c[a].innerHTML = i
            } else "rent" === s && d[a].val(1e3 * e[a]), e[a] < 1e3 ? c[a].innerHTML = e[a] + " هزار تومان" : c[a].innerHTML = e[a] / 1e3 + " میلیون تومان"
        })
    }
    (i || n) && $("[name=sales_type]").on("change", function () {
        if ("sale" === $("[name=sales_type]:checked").val()) {
            var e = n.noUiSlider.get();
            n.noUiSlider.set(e), d[0].val(""), d[1].val("")
        } else {
            e = i.noUiSlider.get();
            i.noUiSlider.set(e);
            var a = l.noUiSlider.get();
            l.noUiSlider.set(a)
        }
    }), $(".search-button").click(function () {
        $("#item_" + $("[name=sales_type_home]:checked").val()).trigger("click"), $(".filter-modal").modal("show"), globals.hideLoadingBtn($(this))
    }), $(".live-search").click(function (e) {
        var a = $(".filter_form_home").serializeArray();
        app.ajaxGetForm(a), $(".filter-modal").modal("hide")
    })
});
var ratingStar = {
    rate: function (e) {
        var a = e.data("chose_rate");
        e.parent(".rating-stars").find('input[type="hidden"]').attr("value", a), e.addClass("rated"), e.children("i").hasClass("rated") && (e.prevAll().children("i").removeClass("sh-star-o").addClass("sh-star"), e.children("i").removeClass("sh-star-o").addClass("sh-star"), e.nextAll().children("i").removeClass("sh-star").addClass("sh-star-o"))
    }, show: function () {
        $(".rating-stars-show").each(function () {
            var e = $(this).data("rate"), a = $(this).children("span"), t = Math.floor(e);
            if (parseFloat(e) - t != 0) {
                if (parseFloat(e) - t >= .5) for (var n = 0; n < t + 1; n++) $(a[n]).children(n).removeClass("sh-star-o").addClass("sh-star"), n == t && $(a[n]).children(n).removeClass("sh-star").addClass("sh-starh");
                if (parseFloat(e) - t < .5) for (n = 0; n < t; n++) $(a[n]).children(n).removeClass("sh-star-o").addClass("sh-star")
            } else for (n = 0; n < parseInt(e) ; n++) $(a[n]).children(n).removeClass("sh-star-o").addClass("sh-star")
        })
    }
};
$(document).ready(function () {
    ratingStar.show(), $(".rating-stars label").hover(function () {
        $(this).prevAll().children("i").removeClass("sh-star-o").addClass("sh-star"), $(this).children("i").removeClass("sh-star-o").addClass("sh-star"), $(this).find("span").show()
    }, function () {
        $(this).find("span").hide(), $(this).prevAll().children("i").removeClass("sh-star").addClass("sh-star-o"), $(this).children("i").removeClass("sh-star").addClass("sh-star-o");
        var e = $(this).parent(".rating-stars").find(".rated");
        e.prevAll().children("i").removeClass("sh-star-o").addClass("sh-star"), e.children("i").removeClass("sh-star-o").addClass("sh-star"), e.nextAll().children("i").removeClass("sh-star").addClass("sh-star-o")
    }), $(".rating-stars label").on("click touchstart", function () {
        $(this).prevAll().removeClass("rated"), $(this).nextAll().removeClass("rated"), ratingStar.rate($(this));
        var e = $(this).parent(".rating-stars").find(".rated");
        e && e.nextAll().children("i").removeClass("sh-star").addClass("sh-star-o")
    })
});
var topAgencyActiveIndex = {
    init: function () {
        var e = $(".swiper-container-top-agency .swiper-slide-active").data("name"),
            a = $(".swiper-container-top-agency .swiper-slide-active").data("location"),
            t = $(".swiper-container-top-agency .swiper-slide-active").data("rent"),
            n = $(".swiper-container-top-agency .swiper-slide-active").data("sale");
        $(".agency-details .top-agency-name h4").text(e), $(".agency-details .location").text("(" + a + ")"), $(".agency-details .rent").text(t), $(".agency-details .sales").text(n)
    }
};
$(document).ready(function () {
    new Swiper(".swiper-container", {
        spaceBetween: 0,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        pagination: { el: ".swiper-pagination", clickable: !0 }
    });
    var e = {
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 4 },
        1199: { slidesPerView: 5 }
    };
    new Swiper(".swiper-container-top-agency", {
        spaceBetween: 20,
        slidesPerView: 5,
        breakpoints: { 767: { slidesPerView: 1 }, 991: { slidesPerView: 2 }, 1199: { slidesPerView: 3 } },
        loop: !0,
        centeredSlides: !0,
        navigation: { nextEl: ".swiper-top-agency-next", prevEl: ".swiper-top-agency-prev" },
        onSlideChangeStart: function () {
            topAgencyActiveIndex.init()
        }
    });
    topAgencyActiveIndex.init();
    new Swiper(".swiper-container-top-cooperation", {
        paginationClickable: !0,
        spaceBetween: 9,
        slidesPerView: 17,
        breakpoints: {
            600: { slidesPerView: 3 },
            768: { slidesPerView: 10 },
            991: { slidesPerView: 12 },
            1199: { slidesPerView: 14 }
        },
        slidesPerColumn: 3,
        navigation: { nextEl: ".swiper-top-cooperation-next", prevEl: ".swiper-top-cooperation-prev" }
    }), new Swiper(".swiper-container-more-announce", {
        slidesPerView: 3,
        breakpoints: { 767: { slidesPerView: 1 }, 991: { slidesPerView: 2 }, 1199: { slidesPerView: 2 } },
        spaceBetween: 15,
        pagination: { el: ".swiper-pagination-more-announce", clickable: !0 }
    }), new Swiper(".swiper-container-landing", {
        slidesPerView: 6,
        breakpoints: e,
        spaceBetween: 15
    }), new Swiper(".swiper-agent-landing", {
        slidesPerView: 1,
        spaceBetween: 1,
        navigation: { nextEl: ".swiper-agent-slide-next", prevEl: ".swiper-agent-slide-prev" },
        pagination: { el: ".swiper-pagination-agent", clickable: !0 }
    }), new Swiper(".swiper-container-news-top1", {
        slidesPerView: 1,
        spaceBetween: 15,
        preloadImages: !1,
        autoplay: 5e3,
        pagination: { el: ".swiper-pagination", clickable: !0 }
    }), new Swiper(".swiper-container-news-down", {
        direction: "vertical",
        slidesPerView: 8,
        spaceBetween: 15,
        preloadImages: !1,
        navigation: { nextEl: ".button-next", prevEl: ".button-prev" }
    }), new Swiper(".swiper-container-news-top", {
        direction: "vertical",
        slidesPerView: 5,
        spaceBetween: 5,
        preloadImages: !1,
        navigation: { nextEl: ".button-next", prevEl: ".button-prev" }
    }), new Swiper(".swiper-container-news-side", {
        direction: "vertical",
        slidesPerView: 5,
        preloadImages: !1,
        spaceBetween: 15,
        navigation: { nextEl: ".button-next", prevEl: ".button-prev" }
    }), new Swiper(".swiper-container-advise", {
        slidesPerView: 5,
        breakpoints: e,
        scrollbar: ".swiper-scrollbar",
        spaceBetween: 15,
        preloadImages: !1,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    }), new Swiper(".swiper-container-video", {
        slidesPerView: 5,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        preloadImages: !1,
        breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            767: { slidesPerView: 2 },
            448: { slidesPerView: 1 }
        },
        spaceBetween: 15
    }), new Swiper(".swiper-container-tops", {
        slidesPerView: 3,
        breakpoints: e,
        nextButton: ".button-next",
        prevButton: ".button-prev",
        spaceBetween: 0,
        navigation: { nextEl: ".button-next", prevEl: ".button-prev" }
    });
    $(".main-project-slide").click(function () {
        var e = $(this).data("slide");
        scrollthem.slideTo(e)
    })
});
var changeView = {
    one: function () {
        $(".single_announce").removeClass("grid-view  col-xl-4 col-md-6"), $(".single_announce").addClass("list-view col-12 pl-lg-5"), $(".banner-container").removeClass("hidden"), $(".announce_images").removeClass("col-12").addClass("col-5"), $(".announce_info").removeClass("col-12").addClass("col-7 px-4"), $(".items").removeClass("pl-lg-4"), $(".call-button").addClass("phone-toggle"), $(".date-holder").removeClass("pb-2"), $(".contacts").removeClass("pt-2"), $(".announce_attrs").each(function () {
            $(this).text().match(/^\s*$/) || $(this).insertBefore($(this).prev(".announce-title"))
        }), $.each(app.swipers, function (e, a) {
            a.update()
        })
    }, two: function () {
        $(".single_announce").addClass("grid-view col-xl-4 col-md-6"), $(".single_announce").removeClass("list-view col-12 pl-lg-5"), $(".banner-container").addClass("hidden"), $(".announce_info").removeClass("col-7 px-4").addClass("col-12"), $(".announce_images").removeClass("col-5").addClass("col-12"), $(".items").addClass("pl-lg-4"), $(".call-button").removeClass("phone-toggle"), $(".date-holder").addClass("pb-2"), $(".contacts").addClass("pt-2"), $(".announce-title").each(function () {
            $(this).text().match(/^\s*$/) || $(this).insertBefore($(this).prev(".announce_attrs"))
        }), $.each(app.swipers, function (e, a) {
            a.update()
        })
    }
};
$(document).ready(function () {
    $(document).on("click", ".view-port-1", function () {
        changeView.one(), $(".popup-map").removeClass("hidden"), $(this).addClass("active"), $(".view-port-2").removeClass("active")
    }), $(document).on("click", ".view-port-2", function () {
        changeView.two(), $(".popup-map").addClass("hidden"), $(this).addClass("active"), $(".view-port-1").removeClass("active")
    }), $(".project-call-btn").click(function () {
        $(this).html($(this).data("call"))
    }), !isMobile && window.location.href.indexOf("search") > 1 && ($(window).resize(function () {
        $(document).width() < 768 ? (changeView.two(), $(".view-port-2").addClass("active"), $(".view-port-1").removeClass("active").addClass("disabled")) : $(".view-port-1").removeClass("disabled")
    }), $(document).width() < 768 && (changeView.two(), $(".view-port-2").addClass("active"), $(".view-port-1").removeClass("active").addClass("disabled")))
});
