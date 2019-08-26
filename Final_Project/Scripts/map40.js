if (void 0 !== window.L) {
    L.cedarmaps.accessToken = "27151d71c7191a7d8e0d712abad0053b4a0776b6";
    var tileJSONUrl = "https://api.cedarmaps.com/v1/tiles/cedarmaps.streets.json?access_token=" + L.cedarmaps.accessToken;
    !function (e) {
        if ("function" == typeof define && define.amd) define(["leaflet"], e); else if ("undefined" != typeof module) module.exports = e(require("leaflet")); else {
            if (void 0 === window.L) throw new Error("Leaflet must be loaded first");
            e(window.L)
        }
    }(function (e) {
        e.Control.Fullscreen = e.Control.extend({
            options: {
                position: "topleft",
                title: { false: "View Fullscreen", true: "Exit Fullscreen" }
            }, onAdd: function (t) {
                var n = e.DomUtil.create("div", "leaflet-control-fullscreen leaflet-bar leaflet-control");
                return this.link = e.DomUtil.create("a", "leaflet-control-fullscreen-button leaflet-bar-part", n), this.link.href = "#", this._map = t, this._map.on("fullscreenchange", this._toggleTitle, this), this._toggleTitle(), e.DomEvent.on(this.link, "click", this._click, this), n
            }, _click: function (t) {
                e.DomEvent.stopPropagation(t), e.DomEvent.preventDefault(t), this._map.toggleFullscreen(this.options)
            }, _toggleTitle: function () {
                this.link.title = this.options.title[this._map.isFullscreen()]
            }
        }), e.Map.include({
            isFullscreen: function () {
                return this._isFullscreen || !1
            }, toggleFullscreen: function (e) {
                var t = this.getContainer();
                this.isFullscreen() ? e && e.pseudoFullscreen ? this._disablePseudoFullscreen(t) : document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : this._disablePseudoFullscreen(t) : e && e.pseudoFullscreen ? this._enablePseudoFullscreen(t) : t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : t.msRequestFullscreen ? t.msRequestFullscreen() : this._enablePseudoFullscreen(t)
            }, _enablePseudoFullscreen: function (t) {
                e.DomUtil.addClass(t, "leaflet-pseudo-fullscreen"), this._setFullscreen(!0), this.fire("fullscreenchange")
            }, _disablePseudoFullscreen: function (t) {
                e.DomUtil.removeClass(t, "leaflet-pseudo-fullscreen"), this._setFullscreen(!1), this.fire("fullscreenchange")
            }, _setFullscreen: function (t) {
                this._isFullscreen = t;
                var n = this.getContainer();
                t ? e.DomUtil.addClass(n, "leaflet-fullscreen-on") : e.DomUtil.removeClass(n, "leaflet-fullscreen-on"), this.invalidateSize()
            }, _onFullscreenChange: function (e) {
                var t = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                t !== this.getContainer() || this._isFullscreen ? t !== this.getContainer() && this._isFullscreen && (this._setFullscreen(!1), this.fire("fullscreenchange")) : (this._setFullscreen(!0), this.fire("fullscreenchange"))
            }
        }), e.Map.mergeOptions({ fullscreenControl: !1 }), e.Map.addInitHook(function () {
            var t;
            if (this.options.fullscreenControl && (this.fullscreenControl = new e.Control.Fullscreen(this.options.fullscreenControl), this.addControl(this.fullscreenControl)), "onfullscreenchange" in document ? t = "fullscreenchange" : "onmozfullscreenchange" in document ? t = "mozfullscreenchange" : "onwebkitfullscreenchange" in document ? t = "webkitfullscreenchange" : "onmsfullscreenchange" in document && (t = "MSFullscreenChange"), t) {
                var n = e.bind(this._onFullscreenChange, this);
                this.whenReady(function () {
                    e.DomEvent.on(document, t, n)
                }), this.on("unload", function () {
                    e.DomEvent.off(document, t, n)
                })
            }
        }), e.control.fullscreen = function (t) {
            return new e.Control.Fullscreen(t)
        }
    }), function () {
        function e(e, t) {
            this.title = e.title, this.stateName = e.stateName ? e.stateName : "unnamed-state", this.icon = L.DomUtil.create("span", ""), L.DomUtil.addClass(this.icon, "button-state state-" + this.stateName.replace(/(^\s*|\s*$)/g, "")), this.icon.innerHTML = function (e) {
                var t;
                e.match(/[&;=<>"']/) ? t = e : (e = e.replace(/(^\s*|\s*$)/g, ""), t = L.DomUtil.create("span", ""), 0 === e.indexOf("fa-") ? L.DomUtil.addClass(t, "fa " + e) : 0 === e.indexOf("glyphicon-") ? L.DomUtil.addClass(t, "glyphicon " + e) : L.DomUtil.addClass(t, e), t = t.outerHTML);
                return t
            }(e.icon), this.onClick = L.Util.bind(e.onClick ? e.onClick : function () {
            }, t)
        }

        L.Control.EasyBar = L.Control.extend({
            options: { position: "topleft", id: null, leafletClasses: !0 }, initialize: function (e, t) {
                t && L.Util.setOptions(this, t), this._buildContainer(), this._buttons = [];
                for (var n = 0; n < e.length; n++) e[n]._bar = this, e[n]._container = e[n].button, this._buttons.push(e[n]), this.container.appendChild(e[n].button)
            }, _buildContainer: function () {
                this._container = this.container = L.DomUtil.create("div", ""), this.options.leafletClasses && L.DomUtil.addClass(this.container, "leaflet-bar easy-button-container leaflet-control"), this.options.id && (this.container.id = this.options.id)
            }, enable: function () {
                return L.DomUtil.addClass(this.container, "enabled"), L.DomUtil.removeClass(this.container, "disabled"), this.container.setAttribute("aria-hidden", "false"), this
            }, disable: function () {
                return L.DomUtil.addClass(this.container, "disabled"), L.DomUtil.removeClass(this.container, "enabled"), this.container.setAttribute("aria-hidden", "true"), this
            }, onAdd: function () {
                return this.container
            }, addTo: function (e) {
                this._map = e;
                for (var t = 0; t < this._buttons.length; t++) this._buttons[t]._map = e;
                var n = this._container = this.onAdd(e), a = this.getPosition(), s = e._controlCorners[a];
                return L.DomUtil.addClass(n, "leaflet-control"), -1 !== a.indexOf("bottom") ? s.insertBefore(n, s.firstChild) : s.appendChild(n), this
            }
        }), L.easyBar = function () {
            for (var e = [L.Control.EasyBar], t = 0; t < arguments.length; t++) e.push(arguments[t]);
            return new (Function.prototype.bind.apply(L.Control.EasyBar, e))
        }, L.Control.EasyButton = L.Control.extend({
            options: {
                position: "topleft",
                id: null,
                type: "replace",
                states: [],
                leafletClasses: !0,
                tagName: "button"
            },
            initialize: function (t, n, a, s) {
                this.options.states = [], null != s && (this.options.id = s), this.storage = {}, "object" == typeof arguments[arguments.length - 1] && L.Util.setOptions(this, arguments[arguments.length - 1]), 0 === this.options.states.length && "string" == typeof t && "function" == typeof n && this.options.states.push({
                    icon: t,
                    onClick: n,
                    title: "string" == typeof a ? a : ""
                }), this._states = [];
                for (var o = 0; o < this.options.states.length; o++) this._states.push(new e(this.options.states[o], this));
                this._buildButton(), this._activateState(this._states[0])
            },
            _buildButton: function () {
                if (this.button = L.DomUtil.create(this.options.tagName, ""), "button" === this.options.tagName && this.button.setAttribute("type", "button"), this.options.id && (this.button.id = this.options.id), this.options.leafletClasses && L.DomUtil.addClass(this.button, "easy-button-button leaflet-bar-part leaflet-interactive"), L.DomEvent.addListener(this.button, "dblclick", L.DomEvent.stop), L.DomEvent.addListener(this.button, "mousedown", L.DomEvent.stop), L.DomEvent.addListener(this.button, "mouseup", L.DomEvent.stop), L.DomEvent.addListener(this.button, "click", function (e) {
                    L.DomEvent.stop(e), this._currentState.onClick(this, this._map ? this._map : null), this._map && this._map.getContainer().focus()
                }, this), "replace" == this.options.type) this.button.appendChild(this._currentState.icon); else for (var e = 0; e < this._states.length; e++) this.button.appendChild(this._states[e].icon)
            },
            _currentState: { stateName: "unnamed", icon: document.createElement("span") },
            _states: null,
            state: function (e) {
                return "string" == typeof e ? this._activateStateNamed(e) : "number" == typeof e && this._activateState(this._states[e]), this
            },
            _activateStateNamed: function (e) {
                for (var t = 0; t < this._states.length; t++) this._states[t].stateName == e && this._activateState(this._states[t])
            },
            _activateState: function (e) {
                if (e !== this._currentState) {
                    "replace" == this.options.type && (this.button.appendChild(e.icon), this.button.removeChild(this._currentState.icon)), e.title ? this.button.title = e.title : this.button.removeAttribute("title");
                    for (var t = 0; t < this._states.length; t++) L.DomUtil.removeClass(this._states[t].icon, this._currentState.stateName + "-active"), L.DomUtil.addClass(this._states[t].icon, e.stateName + "-active");
                    L.DomUtil.removeClass(this.button, this._currentState.stateName + "-active"), L.DomUtil.addClass(this.button, e.stateName + "-active"), this._currentState = e
                }
            },
            enable: function () {
                return L.DomUtil.addClass(this.button, "enabled"), L.DomUtil.removeClass(this.button, "disabled"), this.button.setAttribute("aria-hidden", "false"), this
            },
            disable: function () {
                return L.DomUtil.addClass(this.button, "disabled"), L.DomUtil.removeClass(this.button, "enabled"), this.button.setAttribute("aria-hidden", "true"), this
            },
            onAdd: function (e) {
                var t = L.easyBar([this], {
                    position: this.options.position,
                    leafletClasses: this.options.leafletClasses
                });
                return this._anonymousBar = t, this._container = t.container, this._anonymousBar.container
            },
            removeFrom: function (e) {
                return this._map === e && this.remove(), this
            }
        }), L.easyButton = function () {
            var e = Array.prototype.concat.apply([L.Control.EasyButton], arguments);
            return new (Function.prototype.bind.apply(L.Control.EasyButton, e))
        }
    }(), L.HtmlIcon = L.Icon.extend({
        options: {}, initialize: function (e) {
            L.Util.setOptions(this, e)
        }, createIcon: function () {
            var e = document.createElement("div");
            return e.innerHTML = this.options.html, e
        }, createShadow: function () {
            return null
        }
    })
}
if (void 0 !== window.L) {
    var timer_timeout_map, announcesMap = {};
    announcesMap.map = null, announcesMap.announces = [], announcesMap.lastUrl = "", announcesMap.showLocations = function (e, t) {
        for (var n in announcesMap.announces.forEach(function (e, t) {
            e.marker.remove()
        }), announcesMap.announces = [], e) {
            var a = e[n];
            if (a.latitude) {
                var s = new L.LatLng(a.latitude, a.longitude);
                if (t) var o = new L.HtmlIcon({ html: isMobile ? "<div class='map-label-circle map-item map-mobile' data-map='" + a.id + "' id='map_label_" + a.id + "'></div>" : "<a href='" + a.url + "'  target='_blank'><div class='map-label-circle map-item' data-map='" + a.id + "' id='map_label_" + a.id + "'></div></a>" }); else o = new L.HtmlIcon({ html: isMobile ? "<div class='map-label map-item  map-mobile' id='map_label_" + a.id + "'  data-map='" + a.id + "'>" + a.size + " متر </div>" : "<a href='" + a.url + "' target='_blank'><div class='map-label map-item' id='map_label_" + a.id + "'  data-map='" + a.id + "'>" + a.size + " متر </div></a>" });
                var i = { marker: new L.Marker(s, { icon: o }) };
                i.marker.addTo(announcesMap.map), announcesMap.announces.push(i)
            }
        }
    }, announcesMap.init = function (e, t) {
        var n = $("#" + e), a = [35.750369, 51.407362];
        return n.data("lat") && n.data("lng") && (a = [n.data("lat"), n.data("lng")]), announcesMap.map = L.cedarmaps.map(e, tileJSONUrl, {
            scrollWheelZoom: !0,
            fullscreenControl: !0
        }), announcesMap.map.on("load", function () {
            announcesMap.loadData(t, !1)
        }).on("moveend", function (e) {
            timer_timeout_map && clearTimeout(timer_timeout_map), timer_timeout_map = setTimeout(function () {
                announcesMap.loadData(t, !1)
            }, 500)
        }.bind(timer_timeout_map)).setView(a, 15), announcesMap.map
    }, announcesMap.loadData = function (e, t) {
        var n = announcesMap.map.getBounds().getNorthEast(), a = announcesMap.map.getBounds().getSouthWest(), s = {
            ne: [n.lat, n.lng],
            sw: [a.lat, a.lng],
            order: $("select[name=order_select]").val(),
            sales_type: $("select[name=sales_type]").val(),
            _token: $("[name=_token]").val()
        };
        if (1 == e) $("#ajax-data").css("opacity", "0.5"), requests.get("agencies-locations", s, function (e) {
            $("#ajax-data").removeAttr("style").html(e)
        }, function (e) {
            console.log(e)
        }); else {
            if (t) {
                var o = t.reduce(function (e, t) {
                    return t.value && (e[t.name] = e.hasOwnProperty(t.name) ? e[t.name] + "," + t.value : t.value), e
                }, {});
                $.extend(s, o)
            }
            var i = JSON.stringify(s);
            i !== announcesMap.lastUrl && ($("#ajax-data").css("opacity", "0.5"), announcesMap.lastUrl = i, $.get({
                url: "announces-locations",
                data: s,
                success: function (e) {
                    $("#ajax-data").removeAttr("style").html(e)
                },
                error: function (e) {
                    console.log(e)
                }
            }))
        }
    }, announcesMap.showInBottom = function (e, t, n, a, s) {
        $(".bottom-show-map").remove();
        var o = "<a href='" + s + "' target='_blank'><div class='row bottom-show-map'>";
        o += "<div class='col-4'><img src='timthumb.php?h=210&w=290&src=" + e + "'></div>", o += "<div class='col-8 show-details'><span class='text1'>" + t + "</span><span class='text2'>" + n + "</span><span class='text2'>" + a + "</span></div>", o += "<i class='sh-quit'></i>", o += "</div></a>", $("body").append(o), setTimeout(function () {
            $(".bottom-show-map").addClass("active")
        }, 10)
    }
}
if (void 0 !== window.L) {
    var map, geocoder = L.cedarmaps.geocoder("cedarmaps.streets");
    $(document).ready(function () {
        if ($("#googleMap").length) {
            var e = L.cedarmaps.map("googleMap", tileJSONUrl, { scrollWheelZoom: !0 }).setView([$("#googleMap").data("lat"), $("#googleMap").data("lng")], 16),
                t = L.icon({ iconUrl: "../img/smarker.png", iconSize: [128, 85], iconAnchor: [65, 85] });
            new L.marker([$("#googleMap").data("lat"), $("#googleMap").data("lng")], { icon: t }).addTo(e)
        }
        if ($("#projectsMap").length) {
            e = L.cedarmaps.map("projectsMap", tileJSONUrl, {
                scrollWheelZoom: !0,
                zoomControl: !1,
                fullscreenControl: !0
            }).setView([$("#projectsMap").data("lat"), $("#projectsMap").data("lng")], 10), t = L.icon({
                iconUrl: "../img/smarker.png",
                iconSize: [64, 44],
                iconAnchor: [33, 44]
            });
            new L.marker([$("#projectsMap").data("lat"), $("#projectsMap").data("lng")], { icon: t }).addTo(e), e.on("click", function (t) {
                console.log("clicked"), e.isFullscreen() || e.toggleFullscreen()
            }), $("#show-project-map").click(function (t) {
                t.preventDefault(), e.isFullscreen() || e.toggleFullscreen()
            })
        }
        if ($("#publish-map").length) {
            var n = !1, a = [35.750369, 51.407362];
            $("#publish-map").data("lat") && (a = [$("#publish-map").data("lat"), $("#publish-map").data("lng")], n = !0);
            e = L.cedarmaps.map("publish-map", tileJSONUrl, {
                scrollWheelZoom: !0,
                fullscreenControl: !0
            }).setView(a, 14);
            var s = L.easyButton("<strong>انصراف</strong>", function (e, t) {
                $("[name=latitude]").val(""), $("[name=longitude]").val(""), $(".marker-locate").addClass("hidden"), $(".hover-area").removeClass("hidden"), $(".select-marker").removeClass("hidden"), $(this).addClass("hidden"), n = !1, s.remove(), t.isFullscreen() && (t.toggleFullscreen(), o.remove())
            });
            $(".publish-map").append('<img src="img/locationselect.png" class="marker-icon marker-locate" title="انتخاب محل آگهی" alt="انتخاب محل آگهی">');
            var o = L.easyButton("<strong>ذخیره</strong>", function (e, t) {
                t.isFullscreen() && t.toggleFullscreen()
            });
            $(".select-marker").length || (n = !0), n && ($(".select-marker").addClass("hidden"), $(".remove-marker").removeClass("hidden"), $(".area-important").removeClass("visible"), $(".marker-locate").removeClass("hidden"), $(".hover-area").addClass("hidden"), s.addTo(e)), $(document).on("click", ".select-marker", function () {
                if ($("#location_ids").val()) {
                    n = !0;
                    var t = e.getCenter();
                    $("[name=latitude]").val(t.lat), $("[name=longitude]").val(t.lng), $(this).addClass("hidden"), $(".remove-marker").removeClass("hidden"), $(".area-important").removeClass("visible"), $(".marker-locate").removeClass("hidden"), $(".hover-area").addClass("hidden"), s.addTo(e)
                } else swal("اخطار", "لطفا ابتدا محله مورد نظر را انتخاب نمایید .", "warning")
            }), e.on("fullscreenchange", function () {
                e.isFullscreen() ? o.addTo(e) : o.remove()
            }), e.on("movestart", function (e) {
                $(".marker-icon").addClass("small")
            }).on("moveend", function (t) {
                $(".marker-icon").removeClass("small");
                var a = e.getCenter();
                n && ($("[name=latitude]").val(a.lat), $("[name=longitude]").val(a.lng), $(".select-marker").addClass("hidden"), $(".remove-marker").removeClass("hidden"), $(".area-important").removeClass("visible"), $(".marker-locate").removeClass("hidden"), $(".hover-area").addClass("hidden"))
            }), $(document).on("change", ".area-input", function () {
                if (searchModule.results.length) {
                    var t = searchModule.results[0];
                    t.latitude && t.longitude ? e.setView(L.latLng(t.latitude, t.longitude)) : geocoder.query({
                        query: t.name + " " + t.city_name,
                        type: "street,freeway,expressway,boulevard"
                    }, function (t, n) {
                        (n.status = "OK") && n.results && n.results.length && e.setView(L.latLng(n.results[0].location.center.split(",")))
                    })
                } else s.button.click()
            })
        }
        if ($("#agenciesMap").length) {
            $(".main").addClass("h-100");
            e = announcesMap.init("agenciesMap", !0)
        }
        $(".map-toggler").on("click", function () {
            if ($("#location_ids").val()) {
                n = !0;
                var t = e.getCenter();
                $("[name=latitude]").val(t.lat), $("[name=longitude]").val(t.lng), $(".marker-locate").removeClass("hidden"), e.isFullscreen() || e.toggleFullscreen()
            } else swal({
                type: "warning",
                confirmButtonText: "تایید",
                text: "لطفا ابتدا محله مورد نظر را انتخاب نمایید ."
            })
        });
        var i = $("#locationsMap");
        if (locations.length && i.length) {
            e = announcesMap.init("locationsMap", !1);
            var l = i.data("zoom");
            l && e.setZoom(l)
        }
        $("#publish-full-map").length && ($(".main").addClass("h-100"), e = announcesMap.init("publish-full-map")), $(document).on("mouseenter", ".map-item", function () {
            $("#map_label_" + $(this).data("map")).addClass("hover"), isMobile || $("#map_item_" + $(this).data("map")).addClass("hover")
        }).on("mouseleave", ".map-item", function () {
            $("#map_label_" + $(this).data("map")).removeClass("hover"), isMobile || $("#map_item_" + $(this).data("map")).removeClass("hover")
        }), $(document).on("mouseenter", ".map-label-circle , .map-label", function () {
            isMobile || document.getElementById("map_item_" + $(this).data("map")).scrollIntoView(!0)
        }), isMobile && ($(document).on("click", ".map-label-circle , .map-label", function () {
            var e = $(this).data("map");
            locations.forEach(function (t) {
                t.id == e && ("Agency" == t.view ? announcesMap.showInBottom(t.image, t.name, "مناطق تخت پوشش :", t.areas, t.url) : announcesMap.showInBottom(t.image, t.title, t.sales_type_price + " : " + t.price + " تومان", "rent" == t.sales_type ? "اجاره : " + t.rent + " تومان" : "", t.url))
            })
        }), $(document).on("click", ".bottom-show-map i", function (e) {
            return e.preventDefault(), $(".bottom-show-map").removeClass("active"), !1
        }))
    })
}
