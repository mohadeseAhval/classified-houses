!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function () {
    "use strict";

    function e(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var i = e.ownerDocument.defaultView.getComputedStyle(e, null);
        return t ? i[t] : i
    }

    function i(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case"HTML":
            case"BODY":
                return e.ownerDocument.body;
            case"#document":
                return e.body
        }
        var s = t(e), a = s.overflow, r = s.overflowX, o = s.overflowY;
        return /(auto|scroll|overlay)/.test(a + o + r) ? e : n(i(e))
    }

    function s(e) {
        return 11 === e ? G : 10 === e ? U : G || U
    }

    function a(e) {
        if (!e) return document.documentElement;
        for (var i = s(10) ? document.body : null, n = e.offsetParent || null; n === i && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var r = n && n.nodeName;
        return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position") ? a(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function r(e) {
        return null === e.parentNode ? e : r(e.parentNode)
    }

    function o(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = i ? e : t, s = i ? t : e,
            l = document.createRange();
        l.setStart(n, 0), l.setEnd(s, 0);
        var d = l.commonAncestorContainer;
        if (e !== d && t !== d || n.contains(s)) return function (e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || a(e.firstElementChild) === e)
        }(d) ? d : a(d);
        var h = r(e);
        return h.host ? o(h.host, t) : o(e, r(t).host)
    }

    function l(e) {
        var t = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            i = e.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var n = e.ownerDocument.documentElement;
            return (e.ownerDocument.scrollingElement || n)[t]
        }
        return e[t]
    }

    function d(e, t) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], n = l(t, "top"), s = l(t, "left"),
            a = i ? -1 : 1;
        return e.top += n * a, e.bottom += n * a, e.left += s * a, e.right += s * a, e
    }

    function h(e, t) {
        var i = "x" === t ? "Left" : "Top", n = "Left" == i ? "Right" : "Bottom";
        return parseFloat(e["border" + i + "Width"], 10) + parseFloat(e["border" + n + "Width"], 10)
    }

    function c(e, t, i, n) {
        return j(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], s(10) ? parseInt(i["offset" + e]) + parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
    }

    function u(e) {
        var t = e.body, i = e.documentElement, n = s(10) && getComputedStyle(i);
        return {height: c("Height", t, i, n), width: c("Width", t, i, n)}
    }

    function p(e) {
        return Z({}, e, {right: e.left + e.width, bottom: e.top + e.height})
    }

    function f(e) {
        var i = {};
        try {
            if (s(10)) {
                i = e.getBoundingClientRect();
                var n = l(e, "top"), a = l(e, "left");
                i.top += n, i.left += a, i.bottom += n, i.right += a
            } else i = e.getBoundingClientRect()
        } catch (e) {
        }
        var r = {left: i.left, top: i.top, width: i.right - i.left, height: i.bottom - i.top},
            o = "HTML" === e.nodeName ? u(e.ownerDocument) : {}, d = o.width || e.clientWidth || r.right - r.left,
            c = o.height || e.clientHeight || r.bottom - r.top, f = e.offsetWidth - d, m = e.offsetHeight - c;
        if (f || m) {
            var g = t(e);
            f -= h(g, "x"), m -= h(g, "y"), r.width -= f, r.height -= m
        }
        return p(r)
    }

    function m(e, i) {
        var a = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], r = s(10), o = "HTML" === i.nodeName,
            l = f(e), h = f(i), c = n(e), u = t(i), m = parseFloat(u.borderTopWidth, 10),
            g = parseFloat(u.borderLeftWidth, 10);
        a && o && (h.top = j(h.top, 0), h.left = j(h.left, 0));
        var v = p({top: l.top - h.top - m, left: l.left - h.left - g, width: l.width, height: l.height});
        if (v.marginTop = 0, v.marginLeft = 0, !r && o) {
            var b = parseFloat(u.marginTop, 10), y = parseFloat(u.marginLeft, 10);
            v.top -= m - b, v.bottom -= m - b, v.left -= g - y, v.right -= g - y, v.marginTop = b, v.marginLeft = y
        }
        return (r && !a ? i.contains(c) : i === c && "BODY" !== c.nodeName) && (v = d(v, i)), v
    }

    function g(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], i = e.ownerDocument.documentElement,
            n = m(e, i), s = j(i.clientWidth, window.innerWidth || 0), a = j(i.clientHeight, window.innerHeight || 0),
            r = t ? 0 : l(i), o = t ? 0 : l(i, "left");
        return p({top: r - n.top + n.marginTop, left: o - n.left + n.marginLeft, width: s, height: a})
    }

    function v(e) {
        var n = e.nodeName;
        if ("BODY" === n || "HTML" === n) return !1;
        if ("fixed" === t(e, "position")) return !0;
        var s = i(e);
        return !!s && v(s)
    }

    function b(e) {
        if (!e || !e.parentElement || s()) return document.documentElement;
        for (var i = e.parentElement; i && "none" === t(i, "transform");) i = i.parentElement;
        return i || document.documentElement
    }

    function y(e, t, s, a) {
        var r = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], l = {top: 0, left: 0},
            d = r ? b(e) : o(e, t);
        if ("viewport" === a) l = g(d, r); else {
            var h;
            "scrollParent" === a ? "BODY" === (h = n(i(t))).nodeName && (h = e.ownerDocument.documentElement) : h = "window" === a ? e.ownerDocument.documentElement : a;
            var c = m(h, d, r);
            if ("HTML" !== h.nodeName || v(d)) l = c; else {
                var p = u(e.ownerDocument), f = p.height, y = p.width;
                l.top += c.top - c.marginTop, l.bottom = f + c.top, l.left += c.left - c.marginLeft, l.right = y + c.left
            }
        }
        var w = "number" == typeof (s = s || 0);
        return l.left += w ? s : s.left || 0, l.top += w ? s : s.top || 0, l.right -= w ? s : s.right || 0, l.bottom -= w ? s : s.bottom || 0, l
    }

    function w(e) {
        return e.width * e.height
    }

    function x(e, t, i, n, s) {
        var a = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var r = y(i, n, a, s), o = {
            top: {width: r.width, height: t.top - r.top},
            right: {width: r.right - t.right, height: r.height},
            bottom: {width: r.width, height: r.bottom - t.bottom},
            left: {width: t.left - r.left, height: r.height}
        }, l = Object.keys(o).map(function (e) {
            return Z({key: e}, o[e], {area: w(o[e])})
        }).sort(function (e, t) {
            return t.area - e.area
        }), d = l.filter(function (e) {
            var t = e.width, n = e.height;
            return t >= i.clientWidth && n >= i.clientHeight
        }), h = 0 < d.length ? d[0].key : l[0].key, c = e.split("-")[1];
        return h + (c ? "-" + c : "")
    }

    function E(e, t, i) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return m(i, n ? b(t) : o(t, i), n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            n = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
        return {width: e.offsetWidth + n, height: e.offsetHeight + i}
    }

    function C(e) {
        var t = {left: "right", right: "left", bottom: "top", top: "bottom"};
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e]
        })
    }

    function T(e, t, i) {
        i = i.split("-")[0];
        var n = S(e), s = {width: n.width, height: n.height}, a = -1 !== ["right", "left"].indexOf(i),
            r = a ? "top" : "left", o = a ? "left" : "top", l = a ? "height" : "width", d = a ? "width" : "height";
        return s[r] = t[r] + t[l] / 2 - n[l] / 2, s[o] = i === o ? t[o] - n[d] : t[C(o)], s
    }

    function k(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function I(t, i, n) {
        return (void 0 === n ? t : t.slice(0, function (e, t, i) {
            if (Array.prototype.findIndex) return e.findIndex(function (e) {
                return e[t] === i
            });
            var n = k(e, function (e) {
                return e[t] === i
            });
            return e.indexOf(n)
        }(t, "name", n))).forEach(function (t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && e(n) && (i.offsets.popper = p(i.offsets.popper), i.offsets.reference = p(i.offsets.reference), i = n(i, t))
        }), i
    }

    function _(e, t) {
        return e.some(function (e) {
            var i = e.name;
            return e.enabled && i === t
        })
    }

    function M(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var s = t[n], a = s ? "" + s + i : e;
            if (void 0 !== document.body.style[a]) return a
        }
        return null
    }

    function P(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function A(e, t, i, s) {
        i.updateBound = s, P(e).addEventListener("resize", i.updateBound, {passive: !0});
        var a = n(e);
        return function e(t, i, s, a) {
            var r = "BODY" === t.nodeName, o = r ? t.ownerDocument.defaultView : t;
            o.addEventListener(i, s, {passive: !0}), r || e(n(o.parentNode), i, s, a), a.push(o)
        }(a, "scroll", i.updateBound, i.scrollParents), i.scrollElement = a, i.eventsEnabled = !0, i
    }

    function D() {
        var e, t;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, P(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
    }

    function O(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function L(e, t) {
        Object.keys(t).forEach(function (i) {
            var n = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && O(t[i]) && (n = "px"), e.style[i] = t[i] + n
        })
    }

    function N(e, t, i) {
        var n = k(e, function (e) {
            return e.name === t
        }), s = !!n && e.some(function (e) {
            return e.name === i && e.enabled && e.order < n.order
        });
        if (!s) {
            var a = "`" + t + "`";
            console.warn("`" + i + "` modifier is required by " + a + " modifier in order to work, be sure to include it before " + a + "!")
        }
        return s
    }

    function z(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], i = te.indexOf(e),
            n = te.slice(i + 1).concat(te.slice(0, i));
        return t ? n.reverse() : n
    }

    function $(e, t, i, n) {
        var s = [0, 0], a = -1 !== ["right", "left"].indexOf(n), r = e.split(/(\+|\-)/).map(function (e) {
            return e.trim()
        }), o = r.indexOf(k(r, function (e) {
            return -1 !== e.search(/,|\s/)
        }));
        r[o] && -1 === r[o].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            d = -1 === o ? [r] : [r.slice(0, o).concat([r[o].split(l)[0]]), [r[o].split(l)[1]].concat(r.slice(o + 1))];
        return (d = d.map(function (e, n) {
            var s = (1 === n ? !a : a) ? "height" : "width", r = !1;
            return e.reduce(function (e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, r = !0, e) : r ? (e[e.length - 1] += t, r = !1, e) : e.concat(t)
            }, []).map(function (e) {
                return function (e, t, i, n) {
                    var s = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), a = +s[1], r = s[2];
                    if (!a) return e;
                    if (0 === r.indexOf("%")) {
                        var o;
                        switch (r) {
                            case"%p":
                                o = i;
                                break;
                            case"%":
                            case"%r":
                            default:
                                o = n
                        }
                        return p(o)[t] / 100 * a
                    }
                    return "vh" === r || "vw" === r ? ("vh" === r ? j(document.documentElement.clientHeight, window.innerHeight || 0) : j(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * a : a
                }(e, s, t, i)
            })
        })).forEach(function (e, t) {
            e.forEach(function (i, n) {
                O(i) && (s[t] += i * ("-" === e[n - 1] ? -1 : 1))
            })
        }), s
    }

    for (var B = Math.min, H = Math.floor, V = Math.round, j = Math.max, F = "undefined" != typeof window && "undefined" != typeof document, R = ["Edge", "Trident", "Firefox"], W = 0, q = 0; q < R.length; q += 1) if (F && 0 <= navigator.userAgent.indexOf(R[q])) {
        W = 1;
        break
    }
    var Y = F && window.Promise ? function (e) {
            var t = !1;
            return function () {
                t || (t = !0, window.Promise.resolve().then(function () {
                    t = !1, e()
                }))
            }
        } : function (e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout(function () {
                    t = !1, e()
                }, W))
            }
        }, G = F && !(!window.MSInputMethodContext || !document.documentMode), U = F && /MSIE 10/.test(navigator.userAgent),
        X = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }, K = function () {
            function e(e, t) {
                for (var i, n = 0; n < t.length; n++) (i = t[n]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }

            return function (t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(), Q = function (e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }, Z = Object.assign || function (e) {
            for (var t, i = 1; i < arguments.length; i++) for (var n in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }, J = F && /Firefox/i.test(navigator.userAgent),
        ee = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        te = ee.slice(3), ie = "flip", ne = "clockwise", se = "counterclockwise", ae = function () {
            function t(i, n) {
                var s = this, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                X(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(s.update)
                }, this.update = Y(this.update.bind(this)), this.options = Z({}, t.Defaults, a), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = i && i.jquery ? i[0] : i, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Z({}, t.Defaults.modifiers, a.modifiers)).forEach(function (e) {
                    s.options.modifiers[e] = Z({}, t.Defaults.modifiers[e] || {}, a.modifiers ? a.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                    return Z({name: e}, s.options.modifiers[e])
                }).sort(function (e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function (t) {
                    t.enabled && e(t.onLoad) && t.onLoad(s.reference, s.popper, s.options, t, s.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }

            return K(t, [{
                key: "update", value: function () {
                    return function () {
                        if (!this.state.isDestroyed) {
                            var e = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
                            e.offsets.reference = E(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = x(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = T(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = I(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy", value: function () {
                    return function () {
                        return this.state.isDestroyed = !0, _(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[M("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners", value: function () {
                    return function () {
                        this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners", value: function () {
                    return D.call(this)
                }
            }]), t
        }();
    return ae.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ae.placements = ee, ae.Defaults = {
        placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
        }, onUpdate: function () {
        }, modifiers: {
            shift: {
                order: 100, enabled: !0, fn: function (e) {
                    var t = e.placement, i = t.split("-")[0], n = t.split("-")[1];
                    if (n) {
                        var s = e.offsets, a = s.reference, r = s.popper, o = -1 !== ["bottom", "top"].indexOf(i),
                            l = o ? "left" : "top", d = o ? "width" : "height",
                            h = {start: Q({}, l, a[l]), end: Q({}, l, a[l] + a[d] - r[d])};
                        e.offsets.popper = Z({}, r, h[n])
                    }
                    return e
                }
            }, offset: {
                order: 200, enabled: !0, fn: function (e, t) {
                    var i, n = t.offset, s = e.placement, a = e.offsets, r = a.popper, o = a.reference,
                        l = s.split("-")[0];
                    return i = O(+n) ? [+n, 0] : $(n, r, o, l), "left" === l ? (r.top += i[0], r.left -= i[1]) : "right" === l ? (r.top += i[0], r.left += i[1]) : "top" === l ? (r.left += i[0], r.top -= i[1]) : "bottom" === l && (r.left += i[0], r.top += i[1]), e.popper = r, e
                }, offset: 0
            }, preventOverflow: {
                order: 300, enabled: !0, fn: function (e, t) {
                    var i = t.boundariesElement || a(e.instance.popper);
                    e.instance.reference === i && (i = a(i));
                    var n = M("transform"), s = e.instance.popper.style, r = s.top, o = s.left, l = s[n];
                    s.top = "", s.left = "", s[n] = "";
                    var d = y(e.instance.popper, e.instance.reference, t.padding, i, e.positionFixed);
                    s.top = r, s.left = o, s[n] = l, t.boundaries = d;
                    var h = t.priority, c = e.offsets.popper, u = {
                        primary: function (e) {
                            var i = c[e];
                            return c[e] < d[e] && !t.escapeWithReference && (i = j(c[e], d[e])), Q({}, e, i)
                        }, secondary: function (e) {
                            var i = "right" === e ? "left" : "top", n = c[i];
                            return c[e] > d[e] && !t.escapeWithReference && (n = B(c[i], d[e] - ("right" === e ? c.width : c.height))), Q({}, i, n)
                        }
                    };
                    return h.forEach(function (e) {
                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                        c = Z({}, c, u[t](e))
                    }), e.offsets.popper = c, e
                }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
            }, keepTogether: {
                order: 400, enabled: !0, fn: function (e) {
                    var t = e.offsets, i = t.popper, n = t.reference, s = e.placement.split("-")[0], a = H,
                        r = -1 !== ["top", "bottom"].indexOf(s), o = r ? "right" : "bottom", l = r ? "left" : "top",
                        d = r ? "width" : "height";
                    return i[o] < a(n[l]) && (e.offsets.popper[l] = a(n[l]) - i[d]), i[l] > a(n[o]) && (e.offsets.popper[l] = a(n[o])), e
                }
            }, arrow: {
                order: 500, enabled: !0, fn: function (e, i) {
                    var n;
                    if (!N(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var s = i.element;
                    if ("string" == typeof s) {
                        if (!(s = e.instance.popper.querySelector(s))) return e
                    } else if (!e.instance.popper.contains(s)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var a = e.placement.split("-")[0], r = e.offsets, o = r.popper, l = r.reference,
                        d = -1 !== ["left", "right"].indexOf(a), h = d ? "height" : "width", c = d ? "Top" : "Left",
                        u = c.toLowerCase(), f = d ? "left" : "top", m = d ? "bottom" : "right", g = S(s)[h];
                    l[m] - g < o[u] && (e.offsets.popper[u] -= o[u] - (l[m] - g)), l[u] + g > o[m] && (e.offsets.popper[u] += l[u] + g - o[m]), e.offsets.popper = p(e.offsets.popper);
                    var v = l[u] + l[h] / 2 - g / 2, b = t(e.instance.popper), y = parseFloat(b["margin" + c], 10),
                        w = parseFloat(b["border" + c + "Width"], 10), x = v - e.offsets.popper[u] - y - w;
                    return x = j(B(o[h] - g, x), 0), e.arrowElement = s, e.offsets.arrow = (Q(n = {}, u, V(x)), Q(n, f, ""), n), e
                }, element: "[x-arrow]"
            }, flip: {
                order: 600, enabled: !0, fn: function (e, t) {
                    if (_(e.instance.modifiers, "inner")) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var i = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split("-")[0], s = C(n), a = e.placement.split("-")[1] || "", r = [];
                    switch (t.behavior) {
                        case ie:
                            r = [n, s];
                            break;
                        case ne:
                            r = z(n);
                            break;
                        case se:
                            r = z(n, !0);
                            break;
                        default:
                            r = t.behavior
                    }
                    return r.forEach(function (o, l) {
                        if (n !== o || r.length === l + 1) return e;
                        n = e.placement.split("-")[0], s = C(n);
                        var d = e.offsets.popper, h = e.offsets.reference, c = H,
                            u = "left" === n && c(d.right) > c(h.left) || "right" === n && c(d.left) < c(h.right) || "top" === n && c(d.bottom) > c(h.top) || "bottom" === n && c(d.top) < c(h.bottom),
                            p = c(d.left) < c(i.left), f = c(d.right) > c(i.right), m = c(d.top) < c(i.top),
                            g = c(d.bottom) > c(i.bottom),
                            v = "left" === n && p || "right" === n && f || "top" === n && m || "bottom" === n && g,
                            b = -1 !== ["top", "bottom"].indexOf(n),
                            y = !!t.flipVariations && (b && "start" === a && p || b && "end" === a && f || !b && "start" === a && m || !b && "end" === a && g);
                        (u || v || y) && (e.flipped = !0, (u || v) && (n = r[l + 1]), y && (a = function (e) {
                            return "end" === e ? "start" : "start" === e ? "end" : e
                        }(a)), e.placement = n + (a ? "-" + a : ""), e.offsets.popper = Z({}, e.offsets.popper, T(e.instance.popper, e.offsets.reference, e.placement)), e = I(e.instance.modifiers, e, "flip"))
                    }), e
                }, behavior: "flip", padding: 5, boundariesElement: "viewport"
            }, inner: {
                order: 700, enabled: !1, fn: function (e) {
                    var t = e.placement, i = t.split("-")[0], n = e.offsets, s = n.popper, a = n.reference,
                        r = -1 !== ["left", "right"].indexOf(i), o = -1 === ["top", "left"].indexOf(i);
                    return s[r ? "left" : "top"] = a[i] - (o ? s[r ? "width" : "height"] : 0), e.placement = C(t), e.offsets.popper = p(s), e
                }
            }, hide: {
                order: 800, enabled: !0, fn: function (e) {
                    if (!N(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference, i = k(e.instance.modifiers, function (e) {
                        return "preventOverflow" === e.name
                    }).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            }, computeStyle: {
                order: 850, enabled: !0, fn: function (e, t) {
                    var i = t.x, n = t.y, s = e.offsets.popper, r = k(e.instance.modifiers, function (e) {
                        return "applyStyle" === e.name
                    }).gpuAcceleration;
                    void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var o, l, d = void 0 === r ? t.gpuAcceleration : r, h = a(e.instance.popper), c = f(h),
                        u = {position: s.position}, p = function (e, t) {
                            var i = e.offsets, n = i.popper, s = i.reference, a = V, r = function (e) {
                                    return e
                                }, o = a(s.width), l = a(n.width), d = -1 !== ["left", "right"].indexOf(e.placement),
                                h = -1 !== e.placement.indexOf("-"), c = t ? d || h || o % 2 == l % 2 ? a : H : r,
                                u = t ? a : r;
                            return {
                                left: c(1 == o % 2 && 1 == l % 2 && !h && t ? n.left - 1 : n.left),
                                top: u(n.top),
                                bottom: u(n.bottom),
                                right: c(n.right)
                            }
                        }(e, 2 > window.devicePixelRatio || !J), m = "bottom" === i ? "top" : "bottom",
                        g = "right" === n ? "left" : "right", v = M("transform");
                    if (l = "bottom" == m ? "HTML" === h.nodeName ? -h.clientHeight + p.bottom : -c.height + p.bottom : p.top, o = "right" == g ? "HTML" === h.nodeName ? -h.clientWidth + p.right : -c.width + p.right : p.left, d && v) u[v] = "translate3d(" + o + "px, " + l + "px, 0)", u[m] = 0, u[g] = 0, u.willChange = "transform"; else {
                        var b = "bottom" == m ? -1 : 1, y = "right" == g ? -1 : 1;
                        u[m] = l * b, u[g] = o * y, u.willChange = m + ", " + g
                    }
                    var w = {"x-placement": e.placement};
                    return e.attributes = Z({}, w, e.attributes), e.styles = Z({}, u, e.styles), e.arrowStyles = Z({}, e.offsets.arrow, e.arrowStyles), e
                }, gpuAcceleration: !0, x: "bottom", y: "right"
            }, applyStyle: {
                order: 900, enabled: !0, fn: function (e) {
                    return L(e.instance.popper, e.styles), function (e, t) {
                        Object.keys(t).forEach(function (i) {
                            !1 === t[i] ? e.removeAttribute(i) : e.setAttribute(i, t[i])
                        })
                    }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && L(e.arrowElement, e.arrowStyles), e
                }, onLoad: function (e, t, i, n, s) {
                    var a = E(s, t, e, i.positionFixed),
                        r = x(i.placement, a, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return t.setAttribute("x-placement", r), L(t, {position: i.positionFixed ? "fixed" : "absolute"}), i
                }, gpuAcceleration: void 0
            }
        }
    }, ae
}), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = e || self).bootstrap = {}, e.jQuery, e.Popper)
}(this, function (e, t, i) {
    "use strict";

    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function s(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }

    function a(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function r(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {}, n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function (e) {
                return Object.getOwnPropertyDescriptor(i, e).enumerable
            }))), n.forEach(function (t) {
                a(e, t, i[t])
            })
        }
        return e
    }

    t = t && t.hasOwnProperty("default") ? t.default : t, i = i && i.hasOwnProperty("default") ? i.default : i;
    var o = "transitionend";

    function l(e) {
        var i = this, n = !1;
        return t(this).one(d.TRANSITION_END, function () {
            n = !0
        }), setTimeout(function () {
            n || d.triggerTransitionEnd(i)
        }, e), this
    }

    var d = {
        TRANSITION_END: "bsTransitionEnd", getUID: function (e) {
            do {
                e += ~~(1e6 * Math.random())
            } while (document.getElementById(e));
            return e
        }, getSelectorFromElement: function (e) {
            var t = e.getAttribute("data-target");
            if (!t || "#" === t) {
                var i = e.getAttribute("href");
                t = i && "#" !== i ? i.trim() : ""
            }
            try {
                return document.querySelector(t) ? t : null
            } catch (e) {
                return null
            }
        }, getTransitionDurationFromElement: function (e) {
            if (!e) return 0;
            var i = t(e).css("transition-duration"), n = t(e).css("transition-delay"), s = parseFloat(i),
                a = parseFloat(n);
            return s || a ? (i = i.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(i) + parseFloat(n))) : 0
        }, reflow: function (e) {
            return e.offsetHeight
        }, triggerTransitionEnd: function (e) {
            t(e).trigger(o)
        }, supportsTransitionEnd: function () {
            return Boolean(o)
        }, isElement: function (e) {
            return (e[0] || e).nodeType
        }, typeCheckConfig: function (e, t, i) {
            for (var n in i) if (Object.prototype.hasOwnProperty.call(i, n)) {
                var s = i[n], a = t[n],
                    r = a && d.isElement(a) ? "element" : (o = a, {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase());
                if (!new RegExp(s).test(r)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + r + '" but expected type "' + s + '".')
            }
            var o
        }, findShadowRoot: function (e) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof e.getRootNode) {
                var t = e.getRootNode();
                return t instanceof ShadowRoot ? t : null
            }
            return e instanceof ShadowRoot ? e : e.parentNode ? d.findShadowRoot(e.parentNode) : null
        }
    };
    t.fn.emulateTransitionEnd = l, t.event.special[d.TRANSITION_END] = {
        bindType: o,
        delegateType: o,
        handle: function (e) {
            if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
    };
    var h = t.fn.modal, c = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
        u = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, p = {
            HIDE: "hide.bs.modal",
            HIDDEN: "hidden.bs.modal",
            SHOW: "show.bs.modal",
            SHOWN: "shown.bs.modal",
            FOCUSIN: "focusin.bs.modal",
            RESIZE: "resize.bs.modal",
            CLICK_DISMISS: "click.dismiss.bs.modal",
            KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
            MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
            MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
            CLICK_DATA_API: "click.bs.modal.data-api"
        }, f = "modal-dialog-scrollable", m = "modal-scrollbar-measure", g = "modal-backdrop", v = "modal-open", b = "fade",
        y = "show", w = {
            DIALOG: ".modal-dialog",
            MODAL_BODY: ".modal-body",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top"
        }, x = function () {
            function e(e, t) {
                this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(w.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }

            var i = e.prototype;
            return i.toggle = function (e) {
                return this._isShown ? this.hide() : this.show(e)
            }, i.show = function (e) {
                var i = this;
                if (!this._isShown && !this._isTransitioning) {
                    t(this._element).hasClass(b) && (this._isTransitioning = !0);
                    var n = t.Event(p.SHOW, {relatedTarget: e});
                    t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(p.CLICK_DISMISS, w.DATA_DISMISS, function (e) {
                        return i.hide(e)
                    }), t(this._dialog).on(p.MOUSEDOWN_DISMISS, function () {
                        t(i._element).one(p.MOUSEUP_DISMISS, function (e) {
                            t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return i._showElement(e)
                    }))
                }
            }, i.hide = function (e) {
                var i = this;
                if (e && e.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = t.Event(p.HIDE);
                    if (t(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var s = t(this._element).hasClass(b);
                        if (s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(p.FOCUSIN), t(this._element).removeClass(y), t(this._element).off(p.CLICK_DISMISS), t(this._dialog).off(p.MOUSEDOWN_DISMISS), s) {
                            var a = d.getTransitionDurationFromElement(this._element);
                            t(this._element).one(d.TRANSITION_END, function (e) {
                                return i._hideModal(e)
                            }).emulateTransitionEnd(a)
                        } else this._hideModal()
                    }
                }
            }, i.dispose = function () {
                [window, this._element, this._dialog].forEach(function (e) {
                    return t(e).off(".bs.modal")
                }), t(document).off(p.FOCUSIN), t.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, i.handleUpdate = function () {
                this._adjustDialog()
            }, i._getConfig = function (e) {
                return e = r({}, c, e), d.typeCheckConfig("modal", e, u), e
            }, i._showElement = function (e) {
                var i = this, n = t(this._element).hasClass(b);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), t(this._dialog).hasClass(f) ? this._dialog.querySelector(w.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, n && d.reflow(this._element), t(this._element).addClass(y), this._config.focus && this._enforceFocus();
                var s = t.Event(p.SHOWN, {relatedTarget: e}), a = function () {
                    i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(s)
                };
                if (n) {
                    var r = d.getTransitionDurationFromElement(this._dialog);
                    t(this._dialog).one(d.TRANSITION_END, a).emulateTransitionEnd(r)
                } else a()
            }, i._enforceFocus = function () {
                var e = this;
                t(document).off(p.FOCUSIN).on(p.FOCUSIN, function (i) {
                    document !== i.target && e._element !== i.target && 0 === t(e._element).has(i.target).length && e._element.focus()
                })
            }, i._setEscapeEvent = function () {
                var e = this;
                this._isShown && this._config.keyboard ? t(this._element).on(p.KEYDOWN_DISMISS, function (t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || t(this._element).off(p.KEYDOWN_DISMISS)
            }, i._setResizeEvent = function () {
                var e = this;
                this._isShown ? t(window).on(p.RESIZE, function (t) {
                    return e.handleUpdate(t)
                }) : t(window).off(p.RESIZE)
            }, i._hideModal = function () {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                    t(document.body).removeClass(v), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(p.HIDDEN)
                })
            }, i._removeBackdrop = function () {
                this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
            }, i._showBackdrop = function (e) {
                var i = this, n = t(this._element).hasClass(b) ? b : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = g, n && this._backdrop.classList.add(n), t(this._backdrop).appendTo(document.body), t(this._element).on(p.CLICK_DISMISS, function (e) {
                        i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                    }), n && d.reflow(this._backdrop), t(this._backdrop).addClass(y), !e) return;
                    if (!n) return void e();
                    var s = d.getTransitionDurationFromElement(this._backdrop);
                    t(this._backdrop).one(d.TRANSITION_END, e).emulateTransitionEnd(s)
                } else if (!this._isShown && this._backdrop) {
                    t(this._backdrop).removeClass(y);
                    var a = function () {
                        i._removeBackdrop(), e && e()
                    };
                    if (t(this._element).hasClass(b)) {
                        var r = d.getTransitionDurationFromElement(this._backdrop);
                        t(this._backdrop).one(d.TRANSITION_END, a).emulateTransitionEnd(r)
                    } else a()
                } else e && e()
            }, i._adjustDialog = function () {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, i._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, i._checkScrollbar = function () {
                var e = document.body.getBoundingClientRect();
                this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, i._setScrollbar = function () {
                var e = this;
                if (this._isBodyOverflowing) {
                    var i = [].slice.call(document.querySelectorAll(w.FIXED_CONTENT)),
                        n = [].slice.call(document.querySelectorAll(w.STICKY_CONTENT));
                    t(i).each(function (i, n) {
                        var s = n.style.paddingRight, a = t(n).css("padding-right");
                        t(n).data("padding-right", s).css("padding-right", parseFloat(a) + e._scrollbarWidth + "px")
                    }), t(n).each(function (i, n) {
                        var s = n.style.marginRight, a = t(n).css("margin-right");
                        t(n).data("margin-right", s).css("margin-right", parseFloat(a) - e._scrollbarWidth + "px")
                    });
                    var s = document.body.style.paddingRight, a = t(document.body).css("padding-right");
                    t(document.body).data("padding-right", s).css("padding-right", parseFloat(a) + this._scrollbarWidth + "px")
                }
                t(document.body).addClass(v)
            }, i._resetScrollbar = function () {
                var e = [].slice.call(document.querySelectorAll(w.FIXED_CONTENT));
                t(e).each(function (e, i) {
                    var n = t(i).data("padding-right");
                    t(i).removeData("padding-right"), i.style.paddingRight = n || ""
                });
                var i = [].slice.call(document.querySelectorAll("" + w.STICKY_CONTENT));
                t(i).each(function (e, i) {
                    var n = t(i).data("margin-right");
                    void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
                });
                var n = t(document.body).data("padding-right");
                t(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, i._getScrollbarWidth = function () {
                var e = document.createElement("div");
                e.className = m, document.body.appendChild(e);
                var t = e.getBoundingClientRect().width - e.clientWidth;
                return document.body.removeChild(e), t
            }, e._jQueryInterface = function (i, n) {
                return this.each(function () {
                    var s = t(this).data("bs.modal"), a = r({}, c, t(this).data(), "object" == typeof i && i ? i : {});
                    if (s || (s = new e(this, a), t(this).data("bs.modal", s)), "string" == typeof i) {
                        if (void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
                        s[i](n)
                    } else a.show && s.show(n)
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return c
                }
            }]), e
        }();
    t(document).on(p.CLICK_DATA_API, w.DATA_TOGGLE, function (e) {
        var i, n = this, s = d.getSelectorFromElement(this);
        s && (i = document.querySelector(s));
        var a = t(i).data("bs.modal") ? "toggle" : r({}, t(i).data(), t(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
        var o = t(i).one(p.SHOW, function (e) {
            e.isDefaultPrevented() || o.one(p.HIDDEN, function () {
                t(n).is(":visible") && n.focus()
            })
        });
        x._jQueryInterface.call(t(i), a, this)
    }), t.fn.modal = x._jQueryInterface, t.fn.modal.Constructor = x, t.fn.modal.noConflict = function () {
        return t.fn.modal = h, x._jQueryInterface
    };
    var E = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"], S = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }, C = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        T = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

    function k(e, t, i) {
        if (0 === e.length) return e;
        if (i && "function" == typeof i) return i(e);
        for (var n = (new window.DOMParser).parseFromString(e, "text/html"), s = Object.keys(t), a = [].slice.call(n.body.querySelectorAll("*")), r = function (e, i) {
            var n = a[e], r = n.nodeName.toLowerCase();
            if (-1 === s.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
            var o = [].slice.call(n.attributes), l = [].concat(t["*"] || [], t[r] || []);
            o.forEach(function (e) {
                (function (e, t) {
                    var i = e.nodeName.toLowerCase();
                    if (-1 !== t.indexOf(i)) return -1 === E.indexOf(i) || Boolean(e.nodeValue.match(C) || e.nodeValue.match(T));
                    for (var n = t.filter(function (e) {
                        return e instanceof RegExp
                    }), s = 0, a = n.length; s < a; s++) if (i.match(n[s])) return !0;
                    return !1
                })(e, l) || n.removeAttribute(e.nodeName)
            })
        }, o = 0, l = a.length; o < l; o++) r(o);
        return n.body.innerHTML
    }

    var I = "tooltip", _ = t.fn.tooltip, M = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        P = ["sanitize", "whiteList", "sanitizeFn"], A = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        }, D = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, O = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: S
        }, L = "show", N = "out", z = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        }, $ = "fade", B = "show", H = ".tooltip-inner", V = ".arrow", j = "hover", F = "focus", R = "click", W = "manual",
        q = function () {
            function e(e, t) {
                if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
            }

            var n = e.prototype;
            return n.enable = function () {
                this._isEnabled = !0
            }, n.disable = function () {
                this._isEnabled = !1
            }, n.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, n.toggle = function (e) {
                if (this._isEnabled) if (e) {
                    var i = this.constructor.DATA_KEY, n = t(e.currentTarget).data(i);
                    n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                } else {
                    if (t(this.getTipElement()).hasClass(B)) return void this._leave(null, this);
                    this._enter(null, this)
                }
            }, n.dispose = function () {
                clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, n.show = function () {
                var e = this;
                if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                var n = t.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    t(this.element).trigger(n);
                    var s = d.findShadowRoot(this.element),
                        a = t.contains(null !== s ? s : this.element.ownerDocument.documentElement, this.element);
                    if (n.isDefaultPrevented() || !a) return;
                    var r = this.getTipElement(), o = d.getUID(this.constructor.NAME);
                    r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass($);
                    var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        h = this._getAttachment(l);
                    this.addAttachmentClass(h);
                    var c = this._getContainer();
                    t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new i(this.element, r, {
                        placement: h,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {behavior: this.config.fallbackPlacement},
                            arrow: {element: V},
                            preventOverflow: {boundariesElement: this.config.boundary}
                        },
                        onCreate: function (t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function (t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), t(r).addClass(B), "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
                    var u = function () {
                        e.config.animation && e._fixTransition();
                        var i = e._hoverState;
                        e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), i === N && e._leave(null, e)
                    };
                    if (t(this.tip).hasClass($)) {
                        var p = d.getTransitionDurationFromElement(this.tip);
                        t(this.tip).one(d.TRANSITION_END, u).emulateTransitionEnd(p)
                    } else u()
                }
            }, n.hide = function (e) {
                var i = this, n = this.getTipElement(), s = t.Event(this.constructor.Event.HIDE), a = function () {
                    i._hoverState !== L && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e()
                };
                if (t(this.element).trigger(s), !s.isDefaultPrevented()) {
                    if (t(n).removeClass(B), "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), this._activeTrigger[R] = !1, this._activeTrigger[F] = !1, this._activeTrigger[j] = !1, t(this.tip).hasClass($)) {
                        var r = d.getTransitionDurationFromElement(n);
                        t(n).one(d.TRANSITION_END, a).emulateTransitionEnd(r)
                    } else a();
                    this._hoverState = ""
                }
            }, n.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, n.isWithContent = function () {
                return Boolean(this.getTitle())
            }, n.addAttachmentClass = function (e) {
                t(this.getTipElement()).addClass("bs-tooltip-" + e)
            }, n.getTipElement = function () {
                return this.tip = this.tip || t(this.config.template)[0], this.tip
            }, n.setContent = function () {
                var e = this.getTipElement();
                this.setElementContent(t(e.querySelectorAll(H)), this.getTitle()), t(e).removeClass($ + " " + B)
            }, n.setElementContent = function (e, i) {
                "object" != typeof i || !i.nodeType && !i.jquery ? this.config.html ? (this.config.sanitize && (i = k(i, this.config.whiteList, this.config.sanitizeFn)), e.html(i)) : e.text(i) : this.config.html ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text())
            }, n.getTitle = function () {
                var e = this.element.getAttribute("data-original-title");
                return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
            }, n._getOffset = function () {
                var e = this, t = {};
                return "function" == typeof this.config.offset ? t.fn = function (t) {
                    return t.offsets = r({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, n._getContainer = function () {
                return !1 === this.config.container ? document.body : d.isElement(this.config.container) ? t(this.config.container) : t(document).find(this.config.container)
            }, n._getAttachment = function (e) {
                return D[e.toUpperCase()]
            }, n._setListeners = function () {
                var e = this;
                this.config.trigger.split(" ").forEach(function (i) {
                    if ("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                        return e.toggle(t)
                    }); else if (i !== W) {
                        var n = i === j ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                            s = i === j ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                        t(e.element).on(n, e.config.selector, function (t) {
                            return e._enter(t)
                        }).on(s, e.config.selector, function (t) {
                            return e._leave(t)
                        })
                    }
                }), t(this.element).closest(".modal").on("hide.bs.modal", function () {
                    e.element && e.hide()
                }), this.config.selector ? this.config = r({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, n._fixTitle = function () {
                var e = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, n._enter = function (e, i) {
                var n = this.constructor.DATA_KEY;
                (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? F : j] = !0), t(i.getTipElement()).hasClass(B) || i._hoverState === L ? i._hoverState = L : (clearTimeout(i._timeout), i._hoverState = L, i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function () {
                    i._hoverState === L && i.show()
                }, i.config.delay.show) : i.show())
            }, n._leave = function (e, i) {
                var n = this.constructor.DATA_KEY;
                (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? F : j] = !1), i._isWithActiveTrigger() || (clearTimeout(i._timeout), i._hoverState = N, i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function () {
                    i._hoverState === N && i.hide()
                }, i.config.delay.hide) : i.hide())
            }, n._isWithActiveTrigger = function () {
                for (var e in this._activeTrigger) if (this._activeTrigger[e]) return !0;
                return !1
            }, n._getConfig = function (e) {
                var i = t(this.element).data();
                return Object.keys(i).forEach(function (e) {
                    -1 !== P.indexOf(e) && delete i[e]
                }), "number" == typeof (e = r({}, this.constructor.Default, i, "object" == typeof e && e ? e : {})).delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), d.typeCheckConfig(I, e, this.constructor.DefaultType), e.sanitize && (e.template = k(e.template, e.whiteList, e.sanitizeFn)), e
            }, n._getDelegateConfig = function () {
                var e = {};
                if (this.config) for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                return e
            }, n._cleanTipClass = function () {
                var e = t(this.getTipElement()), i = e.attr("class").match(M);
                null !== i && i.length && e.removeClass(i.join(""))
            }, n._handlePopperPlacementChange = function (e) {
                var t = e.instance;
                this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
            }, n._fixTransition = function () {
                var e = this.getTipElement(), i = this.config.animation;
                null === e.getAttribute("x-placement") && (t(e).removeClass($), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
            }, e._jQueryInterface = function (i) {
                return this.each(function () {
                    var n = t(this).data("bs.tooltip"), s = "object" == typeof i && i;
                    if ((n || !/dispose|hide/.test(i)) && (n || (n = new e(this, s), t(this).data("bs.tooltip", n)), "string" == typeof i)) {
                        if (void 0 === n[i]) throw new TypeError('No method named "' + i + '"');
                        n[i]()
                    }
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return O
                }
            }, {
                key: "NAME", get: function () {
                    return I
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return "bs.tooltip"
                }
            }, {
                key: "Event", get: function () {
                    return z
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType", get: function () {
                    return A
                }
            }]), e
        }();
    t.fn.tooltip = q._jQueryInterface, t.fn.tooltip.Constructor = q, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = _, q._jQueryInterface
    };
    var Y = "popover", G = t.fn.popover, U = new RegExp("(^|\\s)bs-popover\\S+", "g"), X = r({}, q.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), K = r({}, q.DefaultType, {content: "(string|element|function)"}), Q = "fade", Z = "show", J = ".popover-header",
        ee = ".popover-body", te = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        }, ie = function (e) {
            var i, n;

            function a() {
                return e.apply(this, arguments) || this
            }

            n = e, (i = a).prototype = Object.create(n.prototype), i.prototype.constructor = i, i.__proto__ = n;
            var r = a.prototype;
            return r.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function (e) {
                t(this.getTipElement()).addClass("bs-popover-" + e)
            }, r.getTipElement = function () {
                return this.tip = this.tip || t(this.config.template)[0], this.tip
            }, r.setContent = function () {
                var e = t(this.getTipElement());
                this.setElementContent(e.find(J), this.getTitle());
                var i = this._getContent();
                "function" == typeof i && (i = i.call(this.element)), this.setElementContent(e.find(ee), i), e.removeClass(Q + " " + Z)
            }, r._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function () {
                var e = t(this.getTipElement()), i = e.attr("class").match(U);
                null !== i && i.length > 0 && e.removeClass(i.join(""))
            }, a._jQueryInterface = function (e) {
                return this.each(function () {
                    var i = t(this).data("bs.popover"), n = "object" == typeof e ? e : null;
                    if ((i || !/dispose|hide/.test(e)) && (i || (i = new a(this, n), t(this).data("bs.popover", i)), "string" == typeof e)) {
                        if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return X
                }
            }, {
                key: "NAME", get: function () {
                    return Y
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return "bs.popover"
                }
            }, {
                key: "Event", get: function () {
                    return te
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType", get: function () {
                    return K
                }
            }]), a
        }(q);
    t.fn.popover = ie._jQueryInterface, t.fn.popover.Constructor = ie, t.fn.popover.noConflict = function () {
        return t.fn.popover = G, ie._jQueryInterface
    };
    var ne = t.fn.tab, se = {
            HIDE: "hide.bs.tab",
            HIDDEN: "hidden.bs.tab",
            SHOW: "show.bs.tab",
            SHOWN: "shown.bs.tab",
            CLICK_DATA_API: "click.bs.tab.data-api"
        }, ae = "dropdown-menu", re = "active", oe = "disabled", le = "fade", de = "show", he = ".dropdown",
        ce = ".nav, .list-group", ue = ".active", pe = "> li > .active",
        fe = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', me = ".dropdown-toggle",
        ge = "> .dropdown-menu .active", ve = function () {
            function e(e) {
                this._element = e
            }

            var i = e.prototype;
            return i.show = function () {
                var e = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(re) || t(this._element).hasClass(oe))) {
                    var i, n, s = t(this._element).closest(ce)[0], a = d.getSelectorFromElement(this._element);
                    if (s) {
                        var r = "UL" === s.nodeName || "OL" === s.nodeName ? pe : ue;
                        n = (n = t.makeArray(t(s).find(r)))[n.length - 1]
                    }
                    var o = t.Event(se.HIDE, {relatedTarget: this._element}), l = t.Event(se.SHOW, {relatedTarget: n});
                    if (n && t(n).trigger(o), t(this._element).trigger(l), !l.isDefaultPrevented() && !o.isDefaultPrevented()) {
                        a && (i = document.querySelector(a)), this._activate(this._element, s);
                        var h = function () {
                            var i = t.Event(se.HIDDEN, {relatedTarget: e._element}),
                                s = t.Event(se.SHOWN, {relatedTarget: n});
                            t(n).trigger(i), t(e._element).trigger(s)
                        };
                        i ? this._activate(i, i.parentNode, h) : h()
                    }
                }
            }, i.dispose = function () {
                t.removeData(this._element, "bs.tab"), this._element = null
            }, i._activate = function (e, i, n) {
                var s = this, a = (!i || "UL" !== i.nodeName && "OL" !== i.nodeName ? t(i).children(ue) : t(i).find(pe))[0],
                    r = n && a && t(a).hasClass(le), o = function () {
                        return s._transitionComplete(e, a, n)
                    };
                if (a && r) {
                    var l = d.getTransitionDurationFromElement(a);
                    t(a).removeClass(de).one(d.TRANSITION_END, o).emulateTransitionEnd(l)
                } else o()
            }, i._transitionComplete = function (e, i, n) {
                if (i) {
                    t(i).removeClass(re);
                    var s = t(i.parentNode).find(ge)[0];
                    s && t(s).removeClass(re), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
                }
                if (t(e).addClass(re), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), d.reflow(e), e.classList.contains(le) && e.classList.add(de), e.parentNode && t(e.parentNode).hasClass(ae)) {
                    var a = t(e).closest(he)[0];
                    if (a) {
                        var r = [].slice.call(a.querySelectorAll(me));
                        t(r).addClass(re)
                    }
                    e.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, e._jQueryInterface = function (i) {
                return this.each(function () {
                    var n = t(this), s = n.data("bs.tab");
                    if (s || (s = new e(this), n.data("bs.tab", s)), "string" == typeof i) {
                        if (void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
                        s[i]()
                    }
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), e
        }();
    t(document).on(se.CLICK_DATA_API, fe, function (e) {
        e.preventDefault(), ve._jQueryInterface.call(t(this), "show")
    }), t.fn.tab = ve._jQueryInterface, t.fn.tab.Constructor = ve, t.fn.tab.noConflict = function () {
        return t.fn.tab = ne, ve._jQueryInterface
    };
    var be = t.fn.toast, ye = {
            CLICK_DISMISS: "click.dismiss.bs.toast",
            HIDE: "hide.bs.toast",
            HIDDEN: "hidden.bs.toast",
            SHOW: "show.bs.toast",
            SHOWN: "shown.bs.toast"
        }, we = "fade", xe = "hide", Ee = "show", Se = "showing",
        Ce = {animation: "boolean", autohide: "boolean", delay: "number"},
        Te = {animation: !0, autohide: !0, delay: 500}, ke = '[data-dismiss="toast"]', Ie = function () {
            function e(e, t) {
                this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
            }

            var i = e.prototype;
            return i.show = function () {
                var e = this;
                t(this._element).trigger(ye.SHOW), this._config.animation && this._element.classList.add(we);
                var i = function () {
                    e._element.classList.remove(Se), e._element.classList.add(Ee), t(e._element).trigger(ye.SHOWN), e._config.autohide && e.hide()
                };
                if (this._element.classList.remove(xe), this._element.classList.add(Se), this._config.animation) {
                    var n = d.getTransitionDurationFromElement(this._element);
                    t(this._element).one(d.TRANSITION_END, i).emulateTransitionEnd(n)
                } else i()
            }, i.hide = function (e) {
                var i = this;
                this._element.classList.contains(Ee) && (t(this._element).trigger(ye.HIDE), e ? this._close() : this._timeout = setTimeout(function () {
                    i._close()
                }, this._config.delay))
            }, i.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Ee) && this._element.classList.remove(Ee), t(this._element).off(ye.CLICK_DISMISS), t.removeData(this._element, "bs.toast"), this._element = null, this._config = null
            }, i._getConfig = function (e) {
                return e = r({}, Te, t(this._element).data(), "object" == typeof e && e ? e : {}), d.typeCheckConfig("toast", e, this.constructor.DefaultType), e
            }, i._setListeners = function () {
                var e = this;
                t(this._element).on(ye.CLICK_DISMISS, ke, function () {
                    return e.hide(!0)
                })
            }, i._close = function () {
                var e = this, i = function () {
                    e._element.classList.add(xe), t(e._element).trigger(ye.HIDDEN)
                };
                if (this._element.classList.remove(Ee), this._config.animation) {
                    var n = d.getTransitionDurationFromElement(this._element);
                    t(this._element).one(d.TRANSITION_END, i).emulateTransitionEnd(n)
                } else i()
            }, e._jQueryInterface = function (i) {
                return this.each(function () {
                    var n = t(this), s = n.data("bs.toast");
                    if (s || (s = new e(this, "object" == typeof i && i), n.data("bs.toast", s)), "string" == typeof i) {
                        if (void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
                        s[i](this)
                    }
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType", get: function () {
                    return Ce
                }
            }, {
                key: "Default", get: function () {
                    return Te
                }
            }]), e
        }();
    t.fn.toast = Ie._jQueryInterface, t.fn.toast.Constructor = Ie, t.fn.toast.noConflict = function () {
        return t.fn.toast = be, Ie._jQueryInterface
    };
    var _e = "collapse", Me = t.fn[_e], Pe = {toggle: !0, parent: ""},
        Ae = {toggle: "boolean", parent: "(string|element)"}, De = {
            SHOW: "show.bs.collapse",
            SHOWN: "shown.bs.collapse",
            HIDE: "hide.bs.collapse",
            HIDDEN: "hidden.bs.collapse",
            CLICK_DATA_API: "click.bs.collapse.data-api"
        }, Oe = "show", Le = "collapse", Ne = "collapsing", ze = "collapsed", $e = "width", Be = "height",
        He = {ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'}, Ve = function () {
            function e(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var i = [].slice.call(document.querySelectorAll(He.DATA_TOGGLE)), n = 0, s = i.length; n < s; n++) {
                    var a = i[n], r = d.getSelectorFromElement(a),
                        o = [].slice.call(document.querySelectorAll(r)).filter(function (t) {
                            return t === e
                        });
                    null !== r && o.length > 0 && (this._selector = r, this._triggerArray.push(a))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }

            var i = e.prototype;
            return i.toggle = function () {
                t(this._element).hasClass(Oe) ? this.hide() : this.show()
            }, i.show = function () {
                var i, n, s = this;
                if (!this._isTransitioning && !t(this._element).hasClass(Oe) && (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(He.ACTIVES)).filter(function (e) {
                    return "string" == typeof s._config.parent ? e.getAttribute("data-parent") === s._config.parent : e.classList.contains(Le)
                })).length && (i = null), !(i && (n = t(i).not(this._selector).data("bs.collapse")) && n._isTransitioning))) {
                    var a = t.Event(De.SHOW);
                    if (t(this._element).trigger(a), !a.isDefaultPrevented()) {
                        i && (e._jQueryInterface.call(t(i).not(this._selector), "hide"), n || t(i).data("bs.collapse", null));
                        var r = this._getDimension();
                        t(this._element).removeClass(Le).addClass(Ne), this._element.style[r] = 0, this._triggerArray.length && t(this._triggerArray).removeClass(ze).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var o = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            l = d.getTransitionDurationFromElement(this._element);
                        t(this._element).one(d.TRANSITION_END, function () {
                            t(s._element).removeClass(Ne).addClass(Le).addClass(Oe), s._element.style[r] = "", s.setTransitioning(!1), t(s._element).trigger(De.SHOWN)
                        }).emulateTransitionEnd(l), this._element.style[r] = this._element[o] + "px"
                    }
                }
            }, i.hide = function () {
                var e = this;
                if (!this._isTransitioning && t(this._element).hasClass(Oe)) {
                    var i = t.Event(De.HIDE);
                    if (t(this._element).trigger(i), !i.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", d.reflow(this._element), t(this._element).addClass(Ne).removeClass(Le).removeClass(Oe);
                        var s = this._triggerArray.length;
                        if (s > 0) for (var a = 0; a < s; a++) {
                            var r = this._triggerArray[a], o = d.getSelectorFromElement(r);
                            if (null !== o) t([].slice.call(document.querySelectorAll(o))).hasClass(Oe) || t(r).addClass(ze).attr("aria-expanded", !1)
                        }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var l = d.getTransitionDurationFromElement(this._element);
                        t(this._element).one(d.TRANSITION_END, function () {
                            e.setTransitioning(!1), t(e._element).removeClass(Ne).addClass(Le).trigger(De.HIDDEN)
                        }).emulateTransitionEnd(l)
                    }
                }
            }, i.setTransitioning = function (e) {
                this._isTransitioning = e
            }, i.dispose = function () {
                t.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, i._getConfig = function (e) {
                return (e = r({}, Pe, e)).toggle = Boolean(e.toggle), d.typeCheckConfig(_e, e, Ae), e
            }, i._getDimension = function () {
                return t(this._element).hasClass($e) ? $e : Be
            }, i._getParent = function () {
                var i, n = this;
                d.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = document.querySelector(this._config.parent);
                var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    a = [].slice.call(i.querySelectorAll(s));
                return t(a).each(function (t, i) {
                    n._addAriaAndCollapsedClass(e._getTargetFromElement(i), [i])
                }), i
            }, i._addAriaAndCollapsedClass = function (e, i) {
                var n = t(e).hasClass(Oe);
                i.length && t(i).toggleClass(ze, !n).attr("aria-expanded", n)
            }, e._getTargetFromElement = function (e) {
                var t = d.getSelectorFromElement(e);
                return t ? document.querySelector(t) : null
            }, e._jQueryInterface = function (i) {
                return this.each(function () {
                    var n = t(this), s = n.data("bs.collapse"), a = r({}, Pe, n.data(), "object" == typeof i && i ? i : {});
                    if (!s && a.toggle && /show|hide/.test(i) && (a.toggle = !1), s || (s = new e(this, a), n.data("bs.collapse", s)), "string" == typeof i) {
                        if (void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
                        s[i]()
                    }
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Pe
                }
            }]), e
        }();
    t(document).on(De.CLICK_DATA_API, He.DATA_TOGGLE, function (e) {
        "A" === e.currentTarget.tagName && e.preventDefault();
        var i = t(this), n = d.getSelectorFromElement(this), s = [].slice.call(document.querySelectorAll(n));
        t(s).each(function () {
            var e = t(this), n = e.data("bs.collapse") ? "toggle" : i.data();
            Ve._jQueryInterface.call(e, n)
        })
    }), t.fn[_e] = Ve._jQueryInterface, t.fn[_e].Constructor = Ve, t.fn[_e].noConflict = function () {
        return t.fn[_e] = Me, Ve._jQueryInterface
    }, function () {
        if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(), e.Util = d, e.Collapse = Ve, e.Modal = x, e.Popover = ie, e.Tab = ve, e.Toast = Ie, e.Tooltip = q, Object.defineProperty(e, "__esModule", {value: !0})
}), function (e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : e.lightbox = t(e.jQuery)
}(this, function (e) {
    function t(t) {
        this.album = [], this.currentImageIndex = void 0, this.init(), this.options = e.extend({}, this.constructor.defaults), this.option(t)
    }

    return t.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
    }, t.prototype.option = function (t) {
        e.extend(this.options, t)
    }, t.prototype.imageCountLabel = function (e, t) {
        return this.options.albumLabel.replace(/%1/g, e).replace(/%2/g, t)
    }, t.prototype.init = function () {
        var t = this;
        e(document).ready(function () {
            t.enable(), t.build()
        })
    }, t.prototype.enable = function () {
        var t = this;
        e("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (i) {
            return t.start(e(i.currentTarget)), !1
        })
    }, t.prototype.build = function () {
        if (!(e("#lightbox").length > 0)) {
            var t = this;
            e('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(e("body")), this.$lightbox = e("#lightbox"), this.$overlay = e("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = {
                top: parseInt(this.$container.css("padding-top"), 10),
                right: parseInt(this.$container.css("padding-right"), 10),
                bottom: parseInt(this.$container.css("padding-bottom"), 10),
                left: parseInt(this.$container.css("padding-left"), 10)
            }, this.imageBorderWidth = {
                top: parseInt(this.$image.css("border-top-width"), 10),
                right: parseInt(this.$image.css("border-right-width"), 10),
                bottom: parseInt(this.$image.css("border-bottom-width"), 10),
                left: parseInt(this.$image.css("border-left-width"), 10)
            }, this.$overlay.hide().on("click", function () {
                return t.end(), !1
            }), this.$lightbox.hide().on("click", function (i) {
                "lightbox" === e(i.target).attr("id") && t.end()
            }), this.$outerContainer.on("click", function (i) {
                return "lightbox" === e(i.target).attr("id") && t.end(), !1
            }), this.$lightbox.find(".lb-prev").on("click", function () {
                return 0 === t.currentImageIndex ? t.changeImage(t.album.length - 1) : t.changeImage(t.currentImageIndex - 1), !1
            }), this.$lightbox.find(".lb-next").on("click", function () {
                return t.currentImageIndex === t.album.length - 1 ? t.changeImage(0) : t.changeImage(t.currentImageIndex + 1), !1
            }), this.$nav.on("mousedown", function (e) {
                3 === e.which && (t.$nav.css("pointer-events", "none"), t.$lightbox.one("contextmenu", function () {
                    setTimeout(function () {
                        this.$nav.css("pointer-events", "auto")
                    }.bind(t), 0)
                }))
            }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
                return t.end(), !1
            })
        }
    }, t.prototype.start = function (t) {
        var i = this, n = e(window);
        n.on("resize", e.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
        var s = 0;

        function a(e) {
            i.album.push({
                alt: e.attr("data-alt"),
                link: e.attr("href"),
                title: e.attr("data-title") || e.attr("title")
            })
        }

        var r, o = t.attr("data-lightbox");
        if (o) {
            r = e(t.prop("tagName") + '[data-lightbox="' + o + '"]');
            for (var l = 0; l < r.length; l = ++l) a(e(r[l])), r[l] === t[0] && (s = l)
        } else if ("lightbox" === t.attr("rel")) a(t); else {
            r = e(t.prop("tagName") + '[rel="' + t.attr("rel") + '"]');
            for (var d = 0; d < r.length; d = ++d) a(e(r[d])), r[d] === t[0] && (s = d)
        }
        var h = n.scrollTop() + this.options.positionFromTop, c = n.scrollLeft();
        this.$lightbox.css({
            top: h + "px",
            left: c + "px"
        }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && e("body").addClass("lb-disable-scrolling"), this.changeImage(s)
    }, t.prototype.changeImage = function (t) {
        var i = this, n = this.album[t].link, s = n.split(".").slice(-1)[0], a = this.$lightbox.find(".lb-image");
        this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), e(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var r = new Image;
        r.onload = function () {
            var o, l, d, h, c, u;
            a.attr({
                alt: i.album[t].alt,
                src: n
            }), e(r), a.width(r.width), a.height(r.height), u = e(window).width(), c = e(window).height(), h = u - i.containerPadding.left - i.containerPadding.right - i.imageBorderWidth.left - i.imageBorderWidth.right - 20, d = c - i.containerPadding.top - i.containerPadding.bottom - i.imageBorderWidth.top - i.imageBorderWidth.bottom - i.options.positionFromTop - 70, "svg" === s && (0 !== r.width && 0 !== r.height || (a.width(h), a.height(d))), i.options.fitImagesInViewport && (i.options.maxWidth && i.options.maxWidth < h && (h = i.options.maxWidth), i.options.maxHeight && i.options.maxHeight < h && (d = i.options.maxHeight), (r.width > h || r.height > d) && (r.width / h > r.height / d ? (l = h, o = parseInt(r.height / (r.width / l), 10), a.width(l), a.height(o)) : (o = d, l = parseInt(r.width / (r.height / o), 10), a.width(l), a.height(o)))), i.sizeContainer(a.width(), a.height())
        }, r.src = this.album[t].link, this.currentImageIndex = t
    }, t.prototype.sizeOverlay = function () {
        var t = this;
        setTimeout(function () {
            t.$overlay.width(e(document).width()).height(e(document).height())
        }, 0)
    }, t.prototype.sizeContainer = function (e, t) {
        var i = this, n = this.$outerContainer.outerWidth(), s = this.$outerContainer.outerHeight(),
            a = e + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
            r = t + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

        function o() {
            i.$lightbox.find(".lb-dataContainer").width(a), i.$lightbox.find(".lb-prevLink").height(r), i.$lightbox.find(".lb-nextLink").height(r), i.showImage()
        }

        n !== a || s !== r ? this.$outerContainer.animate({
            width: a,
            height: r
        }, this.options.resizeDuration, "swing", function () {
            o()
        }) : o()
    }, t.prototype.showImage = function () {
        this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
    }, t.prototype.updateNav = function () {
        var e = !1;
        try {
            document.createEvent("TouchEvent"), e = !!this.options.alwaysShowNavOnTouchDevices
        } catch (e) {
        }
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (e && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), e && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), e && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, t.prototype.updateDetails = function () {
        var e = this;
        if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var t = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? t.text(this.album[this.currentImageIndex].title) : t.html(this.album[this.currentImageIndex].title), t.fadeIn("fast")
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var i = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(i).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
            return e.sizeOverlay()
        })
    }, t.prototype.preloadNeighboringImages = function () {
        this.album.length > this.currentImageIndex + 1 && ((new Image).src = this.album[this.currentImageIndex + 1].link);
        this.currentImageIndex > 0 && ((new Image).src = this.album[this.currentImageIndex - 1].link)
    }, t.prototype.enableKeyboardNav = function () {
        e(document).on("keyup.keyboard", e.proxy(this.keyboardAction, this))
    }, t.prototype.disableKeyboardNav = function () {
        e(document).off(".keyboard")
    }, t.prototype.keyboardAction = function (e) {
        var t = e.keyCode;
        27 === t ? this.end() : 37 === t ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === t && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, t.prototype.end = function () {
        this.disableKeyboardNav(), e(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && e("body").removeClass("lb-disable-scrolling")
    }, new t
}), function (e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : window.noUiSlider = e()
}(function () {
    "use strict";
    var e = "13.1.5";

    function t(e) {
        e.parentElement.removeChild(e)
    }

    function i(e) {
        return null != e
    }

    function n(e) {
        e.preventDefault()
    }

    function s(e) {
        return "number" == typeof e && !isNaN(e) && isFinite(e)
    }

    function a(e, t, i) {
        i > 0 && (d(e, t), setTimeout(function () {
            h(e, t)
        }, i))
    }

    function r(e) {
        return Math.max(Math.min(e, 100), 0)
    }

    function o(e) {
        return Array.isArray(e) ? e : [e]
    }

    function l(e) {
        var t = (e = String(e)).split(".");
        return t.length > 1 ? t[1].length : 0
    }

    function d(e, t) {
        e.classList ? e.classList.add(t) : e.className += " " + t
    }

    function h(e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }

    function c(e) {
        var t = void 0 !== window.pageXOffset, i = "CSS1Compat" === (e.compatMode || "");
        return {
            x: t ? window.pageXOffset : i ? e.documentElement.scrollLeft : e.body.scrollLeft,
            y: t ? window.pageYOffset : i ? e.documentElement.scrollTop : e.body.scrollTop
        }
    }

    function u(e, t) {
        return 100 / (t - e)
    }

    function p(e, t) {
        return 100 * t / (e[1] - e[0])
    }

    function f(e, t) {
        for (var i = 1; e >= t[i];) i += 1;
        return i
    }

    function m(e, t, i) {
        if (i >= e.slice(-1)[0]) return 100;
        var n = f(i, e), s = e[n - 1], a = e[n], r = t[n - 1], o = t[n];
        return r + function (e, t) {
            return p(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0])
        }([s, a], i) / u(r, o)
    }

    function g(e, t, i, n) {
        if (100 === n) return n;
        var s = f(n, e), a = e[s - 1], r = e[s];
        return i ? n - a > (r - a) / 2 ? r : a : t[s - 1] ? e[s - 1] + function (e, t) {
            return Math.round(e / t) * t
        }(n - e[s - 1], t[s - 1]) : n
    }

    function v(t, i, n) {
        var a;
        if ("number" == typeof i && (i = [i]), !Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'range' contains invalid value.");
        if (!s(a = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !s(i[0])) throw new Error("noUiSlider (" + e + "): 'range' value isn't numeric.");
        n.xPct.push(a), n.xVal.push(i[0]), a ? n.xSteps.push(!isNaN(i[1]) && i[1]) : isNaN(i[1]) || (n.xSteps[0] = i[1]), n.xHighestCompleteStep.push(0)
    }

    function b(e, t, i) {
        if (t) if (i.xVal[e] !== i.xVal[e + 1]) {
            i.xSteps[e] = p([i.xVal[e], i.xVal[e + 1]], t) / u(i.xPct[e], i.xPct[e + 1]);
            var n = (i.xVal[e + 1] - i.xVal[e]) / i.xNumSteps[e], s = Math.ceil(Number(n.toFixed(3)) - 1),
                a = i.xVal[e] + i.xNumSteps[e] * s;
            i.xHighestCompleteStep[e] = a
        } else i.xSteps[e] = i.xHighestCompleteStep[e] = i.xVal[e]
    }

    function y(e, t, i) {
        var n;
        this.xPct = [], this.xVal = [], this.xSteps = [i || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = t;
        var s = [];
        for (n in e) e.hasOwnProperty(n) && s.push([e[n], n]);
        for (s.length && "object" == typeof s[0][0] ? s.sort(function (e, t) {
            return e[0][0] - t[0][0]
        }) : s.sort(function (e, t) {
            return e[0] - t[0]
        }), n = 0; n < s.length; n++) v(s[n][1], s[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) b(n, this.xNumSteps[n], this)
    }

    y.prototype.getMargin = function (t) {
        var i = this.xNumSteps[0];
        if (i && t / i % 1 != 0) throw new Error("noUiSlider (" + e + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        return 2 === this.xPct.length && p(this.xVal, t)
    }, y.prototype.toStepping = function (e) {
        return e = m(this.xVal, this.xPct, e)
    }, y.prototype.fromStepping = function (e) {
        return function (e, t, i) {
            if (i >= 100) return e.slice(-1)[0];
            var n = f(i, t), s = e[n - 1], a = e[n], r = t[n - 1];
            return function (e, t) {
                return t * (e[1] - e[0]) / 100 + e[0]
            }([s, a], (i - r) * u(r, t[n]))
        }(this.xVal, this.xPct, e)
    }, y.prototype.getStep = function (e) {
        return e = g(this.xPct, this.xSteps, this.snap, e)
    }, y.prototype.getDefaultStep = function (e, t, i) {
        var n = f(e, this.xPct);
        return (100 === e || t && e === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / i
    }, y.prototype.getNearbySteps = function (e) {
        var t = f(e, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[t - 2],
                step: this.xNumSteps[t - 2],
                highestStep: this.xHighestCompleteStep[t - 2]
            },
            thisStep: {
                startValue: this.xVal[t - 1],
                step: this.xNumSteps[t - 1],
                highestStep: this.xHighestCompleteStep[t - 1]
            },
            stepAfter: {startValue: this.xVal[t], step: this.xNumSteps[t], highestStep: this.xHighestCompleteStep[t]}
        }
    }, y.prototype.countStepDecimals = function () {
        var e = this.xNumSteps.map(l);
        return Math.max.apply(null, e)
    }, y.prototype.convert = function (e) {
        return this.getStep(this.toStepping(e))
    };
    var w = {
        to: function (e) {
            return void 0 !== e && e.toFixed(2)
        }, from: Number
    };

    function x(t) {
        if (function (e) {
            return "object" == typeof e && "function" == typeof e.to && "function" == typeof e.from
        }(t)) return !0;
        throw new Error("noUiSlider (" + e + "): 'format' requires 'to' and 'from' methods.")
    }

    function E(t, i) {
        if (!s(i)) throw new Error("noUiSlider (" + e + "): 'step' is not numeric.");
        t.singleStep = i
    }

    function S(t, i) {
        if ("object" != typeof i || Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'range' is not an object.");
        if (void 0 === i.min || void 0 === i.max) throw new Error("noUiSlider (" + e + "): Missing 'min' or 'max' in 'range'.");
        if (i.min === i.max) throw new Error("noUiSlider (" + e + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new y(i, t.snap, t.singleStep)
    }

    function C(t, i) {
        if (i = o(i), !Array.isArray(i) || !i.length) throw new Error("noUiSlider (" + e + "): 'start' option is incorrect.");
        t.handles = i.length, t.start = i
    }

    function T(t, i) {
        if (t.snap = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'snap' option must be a boolean.")
    }

    function k(t, i) {
        if (t.animate = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'animate' option must be a boolean.")
    }

    function I(t, i) {
        if (t.animationDuration = i, "number" != typeof i) throw new Error("noUiSlider (" + e + "): 'animationDuration' option must be a number.")
    }

    function _(t, i) {
        var n, s = [!1];
        if ("lower" === i ? i = [!0, !1] : "upper" === i && (i = [!1, !0]), !0 === i || !1 === i) {
            for (n = 1; n < t.handles; n++) s.push(i);
            s.push(!1)
        } else {
            if (!Array.isArray(i) || !i.length || i.length !== t.handles + 1) throw new Error("noUiSlider (" + e + "): 'connect' option doesn't match handle count.");
            s = i
        }
        t.connect = s
    }

    function M(t, i) {
        switch (i) {
            case"horizontal":
                t.ort = 0;
                break;
            case"vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + e + "): 'orientation' option is invalid.")
        }
    }

    function P(t, i) {
        if (!s(i)) throw new Error("noUiSlider (" + e + "): 'margin' option must be numeric.");
        if (0 !== i && (t.margin = t.spectrum.getMargin(i), !t.margin)) throw new Error("noUiSlider (" + e + "): 'margin' option is only supported on linear sliders.")
    }

    function A(t, i) {
        if (!s(i)) throw new Error("noUiSlider (" + e + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getMargin(i), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + e + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
    }

    function D(t, i) {
        if (!s(i) && !Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(i) && 2 !== i.length && !s(i[0]) && !s(i[1])) throw new Error("noUiSlider (" + e + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (0 !== i) {
            if (Array.isArray(i) || (i = [i, i]), t.padding = [t.spectrum.getMargin(i[0]), t.spectrum.getMargin(i[1])], !1 === t.padding[0] || !1 === t.padding[1]) throw new Error("noUiSlider (" + e + "): 'padding' option is only supported on linear sliders.");
            if (t.padding[0] < 0 || t.padding[1] < 0) throw new Error("noUiSlider (" + e + "): 'padding' option must be a positive number(s).");
            if (t.padding[0] + t.padding[1] > 100) throw new Error("noUiSlider (" + e + "): 'padding' option must not exceed 100% of the range.")
        }
    }

    function O(t, i) {
        switch (i) {
            case"ltr":
                t.dir = 0;
                break;
            case"rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + e + "): 'direction' option was not recognized.")
        }
    }

    function L(t, i) {
        if ("string" != typeof i) throw new Error("noUiSlider (" + e + "): 'behaviour' must be a string containing options.");
        var n = i.indexOf("tap") >= 0, s = i.indexOf("drag") >= 0, a = i.indexOf("fixed") >= 0,
            r = i.indexOf("snap") >= 0, o = i.indexOf("hover") >= 0, l = i.indexOf("unconstrained") >= 0;
        if (a) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + e + "): 'fixed' behaviour must be used with 2 handles");
            P(t, t.start[1] - t.start[0])
        }
        if (l && (t.margin || t.limit)) throw new Error("noUiSlider (" + e + "): 'unconstrained' behaviour cannot be used with margin or limit");
        t.events = {tap: n || r, drag: s, fixed: a, snap: r, hover: o, unconstrained: l}
    }

    function N(t, i) {
        if (!1 !== i) if (!0 === i) {
            t.tooltips = [];
            for (var n = 0; n < t.handles; n++) t.tooltips.push(!0)
        } else {
            if (t.tooltips = o(i), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + e + "): must pass a formatter for all handles.");
            t.tooltips.forEach(function (t) {
                if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + e + "): 'tooltips' must be passed a formatter or 'false'.")
            })
        }
    }

    function z(e, t) {
        e.ariaFormat = t, x(t)
    }

    function $(e, t) {
        e.format = t, x(t)
    }

    function B(t, i) {
        if (t.keyboardSupport = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'keyboardSupport' option must be a boolean.")
    }

    function H(e, t) {
        e.documentElement = t
    }

    function V(t, i) {
        if ("string" != typeof i && !1 !== i) throw new Error("noUiSlider (" + e + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = i
    }

    function j(t, i) {
        if ("object" != typeof i) throw new Error("noUiSlider (" + e + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix) for (var n in t.cssClasses = {}, i) i.hasOwnProperty(n) && (t.cssClasses[n] = t.cssPrefix + i[n]); else t.cssClasses = i
    }

    function F(t) {
        var n = {margin: 0, limit: 0, padding: 0, animate: !0, animationDuration: 300, ariaFormat: w, format: w}, s = {
            step: {r: !1, t: E},
            start: {r: !0, t: C},
            connect: {r: !0, t: _},
            direction: {r: !0, t: O},
            snap: {r: !1, t: T},
            animate: {r: !1, t: k},
            animationDuration: {r: !1, t: I},
            range: {r: !0, t: S},
            orientation: {r: !1, t: M},
            margin: {r: !1, t: P},
            limit: {r: !1, t: A},
            padding: {r: !1, t: D},
            behaviour: {r: !0, t: L},
            ariaFormat: {r: !1, t: z},
            format: {r: !1, t: $},
            tooltips: {r: !1, t: N},
            keyboardSupport: {r: !0, t: B},
            documentElement: {r: !1, t: H},
            cssPrefix: {r: !0, t: V},
            cssClasses: {r: !0, t: j}
        }, a = {
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: !0,
            cssPrefix: "noUi-",
            cssClasses: {
                target: "target",
                base: "base",
                origin: "origin",
                handle: "handle",
                handleLower: "handle-lower",
                handleUpper: "handle-upper",
                touchArea: "touch-area",
                horizontal: "horizontal",
                vertical: "vertical",
                background: "background",
                connect: "connect",
                connects: "connects",
                ltr: "ltr",
                rtl: "rtl",
                draggable: "draggable",
                drag: "state-drag",
                tap: "state-tap",
                active: "active",
                tooltip: "tooltip",
                pips: "pips",
                pipsHorizontal: "pips-horizontal",
                pipsVertical: "pips-vertical",
                marker: "marker",
                markerHorizontal: "marker-horizontal",
                markerVertical: "marker-vertical",
                markerNormal: "marker-normal",
                markerLarge: "marker-large",
                markerSub: "marker-sub",
                value: "value",
                valueHorizontal: "value-horizontal",
                valueVertical: "value-vertical",
                valueNormal: "value-normal",
                valueLarge: "value-large",
                valueSub: "value-sub"
            }
        };
        t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(s).forEach(function (r) {
            if (!i(t[r]) && void 0 === a[r]) {
                if (s[r].r) throw new Error("noUiSlider (" + e + "): '" + r + "' is required.");
                return !0
            }
            s[r].t(n, i(t[r]) ? t[r] : a[r])
        }), n.pips = t.pips;
        var r = document.createElement("div"), o = void 0 !== r.style.msTransform, l = void 0 !== r.style.transform;
        n.transformRule = l ? "transform" : o ? "msTransform" : "webkitTransform";
        return n.style = [["left", "top"], ["right", "bottom"]][n.dir][n.ort], n
    }

    function R(i, s, l) {
        var u, p, f, m, g, v, b, y, w = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend"},
            x = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0
                        }
                    });
                    window.addEventListener("test", null, t)
                } catch (e) {
                }
                return e
            }(), E = i, S = s.spectrum, C = [], T = [], k = [], I = 0, _ = {}, M = i.ownerDocument,
            P = s.documentElement || M.documentElement, A = M.body, D = -1, O = 0, L = 1, N = 2,
            z = "rtl" === M.dir || 1 === s.ort ? 0 : 100;

        function $(e, t) {
            var i = M.createElement("div");
            return t && d(i, t), e.appendChild(i), i
        }

        function B(e, t) {
            var i = $(e, s.cssClasses.origin), n = $(i, s.cssClasses.handle);
            return $(n, s.cssClasses.touchArea), n.setAttribute("data-handle", t), s.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function (e) {
                return function (e, t) {
                    if (j() || R(t)) return !1;
                    var i = ["Left", "Right"], n = ["Down", "Up"];
                    s.dir && !s.ort ? i.reverse() : s.ort && !s.dir && n.reverse();
                    var a = e.key.replace("Arrow", ""), r = a === n[0] || a === i[0], o = a === n[1] || a === i[1];
                    if (!r && !o) return !0;
                    e.preventDefault();
                    var l = r ? 0 : 1, d = be(t)[l];
                    if (null === d) return !1;
                    !1 === d && (d = S.getDefaultStep(T[t], r, 10));
                    return d = Math.max(d, 1e-7), d *= r ? -1 : 1, ge(t, C[t] + d, !0), !1
                }(e, t)
            })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", s.ort ? "vertical" : "horizontal"), 0 === t ? d(n, s.cssClasses.handleLower) : t === s.handles - 1 && d(n, s.cssClasses.handleUpper), i
        }

        function H(e, t) {
            return !!t && $(e, s.cssClasses.connect)
        }

        function V(e, t) {
            return !!s.tooltips[t] && $(e.firstChild, s.cssClasses.tooltip)
        }

        function j() {
            return E.hasAttribute("disabled")
        }

        function R(e) {
            return p[e].hasAttribute("disabled")
        }

        function W() {
            g && (ae("update.tooltips"), g.forEach(function (e) {
                e && t(e)
            }), g = null)
        }

        function q() {
            W(), g = p.map(V), se("update.tooltips", function (e, t, i) {
                if (g[t]) {
                    var n = e[t];
                    !0 !== s.tooltips[t] && (n = s.tooltips[t].to(i[t])), g[t].innerHTML = n
                }
            })
        }

        function Y(e, t, i) {
            var n = M.createElement("div"), a = [];
            a[O] = s.cssClasses.valueNormal, a[L] = s.cssClasses.valueLarge, a[N] = s.cssClasses.valueSub;
            var r = [];
            r[O] = s.cssClasses.markerNormal, r[L] = s.cssClasses.markerLarge, r[N] = s.cssClasses.markerSub;
            var o = [s.cssClasses.valueHorizontal, s.cssClasses.valueVertical],
                l = [s.cssClasses.markerHorizontal, s.cssClasses.markerVertical];

            function h(e, t) {
                var i = t === s.cssClasses.value, n = i ? a : r;
                return t + " " + (i ? o : l)[s.ort] + " " + n[e]
            }

            return d(n, s.cssClasses.pips), d(n, 0 === s.ort ? s.cssClasses.pipsHorizontal : s.cssClasses.pipsVertical), Object.keys(e).forEach(function (a) {
                !function (e, a, r) {
                    if ((r = t ? t(a, r) : r) !== D) {
                        var o = $(n, !1);
                        o.className = h(r, s.cssClasses.marker), o.style[s.style] = e + "%", r > O && ((o = $(n, !1)).className = h(r, s.cssClasses.value), o.setAttribute("data-value", a), o.style[s.style] = e + "%", o.innerHTML = i.to(a))
                    }
                }(a, e[a][0], e[a][1])
            }), n
        }

        function G() {
            m && (t(m), m = null)
        }

        function U(t) {
            G();
            var i = t.mode, n = t.density || 1, s = t.filter || !1, a = function (t, i, n) {
                if ("range" === t || "steps" === t) return S.xVal;
                if ("count" === t) {
                    if (i < 2) throw new Error("noUiSlider (" + e + "): 'values' (>= 2) required for mode 'count'.");
                    var s = i - 1, a = 100 / s;
                    for (i = []; s--;) i[s] = s * a;
                    i.push(100), t = "positions"
                }
                return "positions" === t ? i.map(function (e) {
                    return S.fromStepping(n ? S.getStep(e) : e)
                }) : "values" === t ? n ? i.map(function (e) {
                    return S.fromStepping(S.getStep(S.toStepping(e)))
                }) : i : void 0
            }(i, t.values || !1, t.stepped || !1), r = function (e, t, i) {
                var n, s = {}, a = S.xVal[0], r = S.xVal[S.xVal.length - 1], o = !1, l = !1, d = 0;
                return n = i.slice().sort(function (e, t) {
                    return e - t
                }), (i = n.filter(function (e) {
                    return !this[e] && (this[e] = !0)
                }, {}))[0] !== a && (i.unshift(a), o = !0), i[i.length - 1] !== r && (i.push(r), l = !0), i.forEach(function (n, a) {
                    var r, h, c, u, p, f, m, g, v, b, y = n, w = i[a + 1], x = "steps" === t;
                    if (x && (r = S.xNumSteps[a]), r || (r = w - y), !1 !== y && void 0 !== w) for (r = Math.max(r, 1e-7), h = y; h <= w; h = (h + r).toFixed(7) / 1) {
                        for (g = (p = (u = S.toStepping(h)) - d) / e, b = p / (v = Math.round(g)), c = 1; c <= v; c += 1) s[(f = d + c * b).toFixed(5)] = [S.fromStepping(f), 0];
                        m = i.indexOf(h) > -1 ? L : x ? N : O, !a && o && (m = 0), h === w && l || (s[u.toFixed(5)] = [h, m]), d = u
                    }
                }), s
            }(n, i, a), o = t.format || {to: Math.round};
            return m = E.appendChild(Y(r, s, o))
        }

        function X() {
            var e = u.getBoundingClientRect(), t = "offset" + ["Width", "Height"][s.ort];
            return 0 === s.ort ? e.width || u[t] : e.height || u[t]
        }

        function K(e, t, i, n) {
            var a = function (a) {
                return !!(a = function (e, t, i) {
                    var n, s, a = 0 === e.type.indexOf("touch"), r = 0 === e.type.indexOf("mouse"),
                        o = 0 === e.type.indexOf("pointer");
                    0 === e.type.indexOf("MSPointer") && (o = !0);
                    if (a) {
                        var l = function (e) {
                            return e.target === i || i.contains(e.target)
                        };
                        if ("touchstart" === e.type) {
                            var d = Array.prototype.filter.call(e.touches, l);
                            if (d.length > 1) return !1;
                            n = d[0].pageX, s = d[0].pageY
                        } else {
                            var h = Array.prototype.find.call(e.changedTouches, l);
                            if (!h) return !1;
                            n = h.pageX, s = h.pageY
                        }
                    }
                    t = t || c(M), (r || o) && (n = e.clientX + t.x, s = e.clientY + t.y);
                    return e.pageOffset = t, e.points = [n, s], e.cursor = r || o, e
                }(a, n.pageOffset, n.target || t)) && (!(j() && !n.doNotReject) && (r = E, o = s.cssClasses.tap, !((r.classList ? r.classList.contains(o) : new RegExp("\\b" + o + "\\b").test(r.className)) && !n.doNotReject) && (!(e === w.start && void 0 !== a.buttons && a.buttons > 1) && ((!n.hover || !a.buttons) && (x || a.preventDefault(), a.calcPoint = a.points[s.ort], void i(a, n))))));
                var r, o
            }, r = [];
            return e.split(" ").forEach(function (e) {
                t.addEventListener(e, a, !!x && {passive: !0}), r.push([e, a])
            }), r
        }

        function Q(e) {
            var t, i, n, a, o, l,
                d = 100 * (e - (t = u, i = s.ort, n = t.getBoundingClientRect(), a = t.ownerDocument, o = a.documentElement, l = c(a), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0), i ? n.top + l.y - o.clientTop : n.left + l.x - o.clientLeft)) / X();
            return d = r(d), s.dir ? 100 - d : d
        }

        function Z(e, t) {
            "mouseout" === e.type && "HTML" === e.target.nodeName && null === e.relatedTarget && ee(e, t)
        }

        function J(e, t) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === e.buttons && 0 !== t.buttonsProperty) return ee(e, t);
            var i = (s.dir ? -1 : 1) * (e.calcPoint - t.startCalcPoint);
            de(i > 0, 100 * i / t.baseSize, t.locations, t.handleNumbers)
        }

        function ee(e, t) {
            t.handle && (h(t.handle, s.cssClasses.active), I -= 1), t.listeners.forEach(function (e) {
                P.removeEventListener(e[0], e[1])
            }), 0 === I && (h(E, s.cssClasses.drag), ce(), e.cursor && (A.style.cursor = "", A.removeEventListener("selectstart", n))), t.handleNumbers.forEach(function (e) {
                re("change", e), re("set", e), re("end", e)
            })
        }

        function te(e, t) {
            if (t.handleNumbers.some(R)) return !1;
            var i;
            1 === t.handleNumbers.length && (i = p[t.handleNumbers[0]].children[0], I += 1, d(i, s.cssClasses.active));
            e.stopPropagation();
            var a = [], r = K(w.move, P, J, {
                target: e.target,
                handle: i,
                listeners: a,
                startCalcPoint: e.calcPoint,
                baseSize: X(),
                pageOffset: e.pageOffset,
                handleNumbers: t.handleNumbers,
                buttonsProperty: e.buttons,
                locations: T.slice()
            }), o = K(w.end, P, ee, {
                target: e.target,
                handle: i,
                listeners: a,
                doNotReject: !0,
                handleNumbers: t.handleNumbers
            }), l = K("mouseout", P, Z, {
                target: e.target,
                handle: i,
                listeners: a,
                doNotReject: !0,
                handleNumbers: t.handleNumbers
            });
            a.push.apply(a, r.concat(o, l)), e.cursor && (A.style.cursor = getComputedStyle(e.target).cursor, p.length > 1 && d(E, s.cssClasses.drag), A.addEventListener("selectstart", n, !1)), t.handleNumbers.forEach(function (e) {
                re("start", e)
            })
        }

        function ie(e) {
            e.stopPropagation();
            var t = Q(e.calcPoint), i = function (e) {
                var t = 100, i = !1;
                return p.forEach(function (n, s) {
                    if (!R(s)) {
                        var a = Math.abs(T[s] - e);
                        (a < t || 100 === a && 100 === t) && (i = s, t = a)
                    }
                }), i
            }(t);
            if (!1 === i) return !1;
            s.events.snap || a(E, s.cssClasses.tap, s.animationDuration), ue(i, t, !0, !0), ce(), re("slide", i, !0), re("update", i, !0), re("change", i, !0), re("set", i, !0), s.events.snap && te(e, {handleNumbers: [i]})
        }

        function ne(e) {
            var t = Q(e.calcPoint), i = S.getStep(t), n = S.fromStepping(i);
            Object.keys(_).forEach(function (e) {
                "hover" === e.split(".")[0] && _[e].forEach(function (e) {
                    e.call(v, n)
                })
            })
        }

        function se(e, t) {
            _[e] = _[e] || [], _[e].push(t), "update" === e.split(".")[0] && p.forEach(function (e, t) {
                re("update", t)
            })
        }

        function ae(e) {
            var t = e && e.split(".")[0], i = t && e.substring(t.length);
            Object.keys(_).forEach(function (e) {
                var n = e.split(".")[0], s = e.substring(n.length);
                t && t !== n || i && i !== s || delete _[e]
            })
        }

        function re(e, t, i) {
            Object.keys(_).forEach(function (n) {
                var a = n.split(".")[0];
                e === a && _[n].forEach(function (e) {
                    e.call(v, C.map(s.format.to), t, C.slice(), i || !1, T.slice())
                })
            })
        }

        function oe(e, t, i, n, a, o) {
            return p.length > 1 && !s.events.unconstrained && (n && t > 0 && (i = Math.max(i, e[t - 1] + s.margin)), a && t < p.length - 1 && (i = Math.min(i, e[t + 1] - s.margin))), p.length > 1 && s.limit && (n && t > 0 && (i = Math.min(i, e[t - 1] + s.limit)), a && t < p.length - 1 && (i = Math.max(i, e[t + 1] - s.limit))), s.padding && (0 === t && (i = Math.max(i, s.padding[0])), t === p.length - 1 && (i = Math.min(i, 100 - s.padding[1]))), !((i = r(i = S.getStep(i))) === e[t] && !o) && i
        }

        function le(e, t) {
            var i = s.ort;
            return (i ? t : e) + ", " + (i ? e : t)
        }

        function de(e, t, i, n) {
            var s = i.slice(), a = [!e, e], r = [e, !e];
            n = n.slice(), e && n.reverse(), n.length > 1 ? n.forEach(function (e, i) {
                var n = oe(s, e, s[e] + t, a[i], r[i], !1);
                !1 === n ? t = 0 : (t = n - s[e], s[e] = n)
            }) : a = r = [!0];
            var o = !1;
            n.forEach(function (e, n) {
                o = ue(e, i[e] + t, a[n], r[n]) || o
            }), o && n.forEach(function (e) {
                re("update", e), re("slide", e)
            })
        }

        function he(e, t) {
            return s.dir ? 100 - e - t : e
        }

        function ce() {
            k.forEach(function (e) {
                var t = T[e] > 50 ? -1 : 1, i = 3 + (p.length + t * e);
                p[e].style.zIndex = i
            })
        }

        function ue(e, t, i, n) {
            return !1 !== (t = oe(T, e, t, i, n, !1)) && (function (e, t) {
                T[e] = t, C[e] = S.fromStepping(t);
                var i = "translate(" + le(he(t, 0) - z + "%", "0") + ")";
                p[e].style[s.transformRule] = i, pe(e), pe(e + 1)
            }(e, t), !0)
        }

        function pe(e) {
            if (f[e]) {
                var t = 0, i = 100;
                0 !== e && (t = T[e - 1]), e !== f.length - 1 && (i = T[e]);
                var n = i - t, a = "translate(" + le(he(t, n) + "%", "0") + ")", r = "scale(" + le(n / 100, "1") + ")";
                f[e].style[s.transformRule] = a + " " + r
            }
        }

        function fe(e, t) {
            return null === e || !1 === e || void 0 === e ? T[t] : ("number" == typeof e && (e = String(e)), e = s.format.from(e), !1 === (e = S.toStepping(e)) || isNaN(e) ? T[t] : e)
        }

        function me(e, t) {
            var i = o(e), n = void 0 === T[0];
            t = void 0 === t || !!t, s.animate && !n && a(E, s.cssClasses.tap, s.animationDuration), k.forEach(function (e) {
                ue(e, fe(i[e], e), !0, !1)
            }), k.forEach(function (e) {
                ue(e, T[e], !0, !0)
            }), ce(), k.forEach(function (e) {
                re("update", e), null !== i[e] && t && re("set", e)
            })
        }

        function ge(t, i, n) {
            if (!((t = Number(t)) >= 0 && t < k.length)) throw new Error("noUiSlider (" + e + "): invalid handle number, got: " + t);
            ue(t, fe(i, t), !0, !0), re("update", t), n && re("set", t)
        }

        function ve() {
            var e = C.map(s.format.to);
            return 1 === e.length ? e[0] : e
        }

        function be(e) {
            var t = T[e], i = S.getNearbySteps(t), n = C[e], a = i.thisStep.step, r = null;
            if (s.snap) return [n - i.stepBefore.startValue || null, i.stepAfter.startValue - n || null];
            !1 !== a && n + a > i.stepAfter.startValue && (a = i.stepAfter.startValue - n), r = n > i.thisStep.startValue ? i.thisStep.step : !1 !== i.stepBefore.step && n - i.stepBefore.highestStep, 100 === t ? a = null : 0 === t && (r = null);
            var o = S.countStepDecimals();
            return null !== a && !1 !== a && (a = Number(a.toFixed(o))), null !== r && !1 !== r && (r = Number(r.toFixed(o))), [r, a]
        }

        return d(b = E, s.cssClasses.target), 0 === s.dir ? d(b, s.cssClasses.ltr) : d(b, s.cssClasses.rtl), 0 === s.ort ? d(b, s.cssClasses.horizontal) : d(b, s.cssClasses.vertical), u = $(b, s.cssClasses.base), function (e, t) {
            var i = $(t, s.cssClasses.connects);
            p = [], (f = []).push(H(i, e[0]));
            for (var n = 0; n < s.handles; n++) p.push(B(t, n)), k[n] = n, f.push(H(i, e[n + 1]))
        }(s.connect, u), (y = s.events).fixed || p.forEach(function (e, t) {
            K(w.start, e.children[0], te, {handleNumbers: [t]})
        }), y.tap && K(w.start, u, ie, {}), y.hover && K(w.move, u, ne, {hover: !0}), y.drag && f.forEach(function (e, t) {
            if (!1 !== e && 0 !== t && t !== f.length - 1) {
                var i = p[t - 1], n = p[t], a = [e];
                d(e, s.cssClasses.draggable), y.fixed && (a.push(i.children[0]), a.push(n.children[0])), a.forEach(function (e) {
                    K(w.start, e, te, {handles: [i, n], handleNumbers: [t - 1, t]})
                })
            }
        }), me(s.start), s.pips && U(s.pips), s.tooltips && q(), se("update", function (e, t, i, n, a) {
            k.forEach(function (e) {
                var t = p[e], n = oe(T, e, 0, !0, !0, !0), r = oe(T, e, 100, !0, !0, !0), o = a[e],
                    l = s.ariaFormat.to(i[e]);
                n = S.fromStepping(n).toFixed(1), r = S.fromStepping(r).toFixed(1), o = S.fromStepping(o).toFixed(1), t.children[0].setAttribute("aria-valuemin", n), t.children[0].setAttribute("aria-valuemax", r), t.children[0].setAttribute("aria-valuenow", o), t.children[0].setAttribute("aria-valuetext", l)
            })
        }), v = {
            destroy: function () {
                for (var e in s.cssClasses) s.cssClasses.hasOwnProperty(e) && h(E, s.cssClasses[e]);
                for (; E.firstChild;) E.removeChild(E.firstChild);
                delete E.noUiSlider
            }, steps: function () {
                return k.map(be)
            }, on: se, off: ae, get: ve, set: me, setHandle: ge, reset: function (e) {
                me(s.start, e)
            }, __moveHandles: function (e, t, i) {
                de(e, t, T, i)
            }, options: l, updateOptions: function (e, t) {
                var i = ve(),
                    n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                n.forEach(function (t) {
                    void 0 !== e[t] && (l[t] = e[t])
                });
                var a = F(l);
                n.forEach(function (t) {
                    void 0 !== e[t] && (s[t] = a[t])
                }), S = a.spectrum, s.margin = a.margin, s.limit = a.limit, s.padding = a.padding, s.pips ? U(s.pips) : G(), s.tooltips ? q() : W(), T = [], me(e.start || i, t)
            }, target: E, removePips: G, removeTooltips: W, pips: U
        }
    }

    return {
        __spectrum: y, version: e, create: function (t, i) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + e + "): create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider (" + e + "): Slider was already initialized.");
            var n = R(t, F(i), i);
            return t.noUiSlider = n, n
        }
    }
}), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function () {
    "use strict";
    var e = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            type: null,
            toast: !1,
            customClass: "",
            target: "body",
            backdrop: !0,
            animation: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: null,
            confirmButtonClass: null,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: null,
            cancelButtonClass: null,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonAriaLabel: "Close this dialog",
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: "",
            imageClass: null,
            timer: null,
            width: null,
            padding: null,
            background: null,
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: null,
            inputAttributes: {},
            inputValidator: null,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: null,
            onBeforeOpen: null,
            onOpen: null,
            onClose: null,
            useRejections: !1,
            expectRejections: !1
        }, t = ["useRejections", "expectRejections"], i = function (e) {
            var t = {};
            for (var i in e) t[e[i]] = "swal2-" + e[i];
            return t
        },
        n = i(["container", "shown", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "has-input", "file", "range", "select", "radio", "checkbox", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"]),
        s = i(["success", "warning", "info", "question", "error"]), a = "SweetAlert2:", r = function (e) {
            console.warn(a + " " + e)
        }, o = function (e) {
            console.error(a + " " + e)
        }, l = [], d = function (e) {
            -1 === l.indexOf(e) && (l.push(e), r(e))
        }, h = function (e) {
            return "function" == typeof e ? e() : e
        }, c = {previousActiveElement: null, previousBodyPadding: null}, u = function (e, t) {
            return !!e.classList && e.classList.contains(t)
        }, p = function (e) {
            if (e.focus(), "file" !== e.type) {
                var t = e.value;
                e.value = "", e.value = t
            }
        }, f = function (e, t, i) {
            e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)), t.forEach(function (t) {
                e.forEach ? e.forEach(function (e) {
                    i ? e.classList.add(t) : e.classList.remove(t)
                }) : i ? e.classList.add(t) : e.classList.remove(t)
            }))
        }, m = function (e, t) {
            f(e, t, !0)
        }, g = function (e, t) {
            f(e, t, !1)
        }, v = function (e, t) {
            for (var i = 0; i < e.childNodes.length; i++) if (u(e.childNodes[i], t)) return e.childNodes[i]
        }, b = function (e) {
            e.style.opacity = "", e.style.display = e.id === n.content ? "block" : "flex"
        }, y = function (e) {
            e.style.opacity = "", e.style.display = "none"
        }, w = function (e) {
            for (; e.firstChild;) e.removeChild(e.firstChild)
        }, x = function (e) {
            return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, E = function (e, t) {
            e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t)
        }, S = function () {
            return document.body.querySelector("." + n.container)
        }, C = function (e) {
            var t = S();
            return t ? t.querySelector("." + e) : null
        }, T = function () {
            return C(n.popup)
        }, k = function () {
            return T().querySelectorAll("." + n.icon)
        }, I = function () {
            return C(n.title)
        }, _ = function () {
            return C(n.content)
        }, M = function () {
            return C(n.image)
        }, P = function () {
            return C(n.progresssteps)
        }, A = function () {
            return C(n.confirm)
        }, D = function () {
            return C(n.cancel)
        }, O = function () {
            return C(n.actions)
        }, L = function () {
            return C(n.footer)
        }, N = function () {
            return C(n.close)
        }, z = function () {
            var e = Array.prototype.slice.call(T().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (e, t) {
                    return (e = parseInt(e.getAttribute("tabindex"))) > (t = parseInt(t.getAttribute("tabindex"))) ? 1 : e < t ? -1 : 0
                }),
                t = Array.prototype.slice.call(T().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));
            return function (e) {
                for (var t = [], i = 0; i < e.length; i++) -1 === t.indexOf(e[i]) && t.push(e[i]);
                return t
            }(e.concat(t))
        }, $ = function () {
            return !document.body.classList.contains(n["toast-shown"])
        }, B = function () {
            return "undefined" == typeof window || "undefined" == typeof document
        },
        H = ('\n <div aria-labelledby="' + n.title + '" aria-describedby="' + n.content + '" class="' + n.popup + '" tabindex="-1">\n   <div class="' + n.header + '">\n     <ul class="' + n.progresssteps + '"></ul>\n     <div class="' + n.icon + " " + s.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + n.icon + " " + s.question + '">\n       <span class="' + n["icon-text"] + '">?</span>\n      </div>\n     <div class="' + n.icon + " " + s.warning + '">\n       <span class="' + n["icon-text"] + '">!</span>\n      </div>\n     <div class="' + n.icon + " " + s.info + '">\n       <span class="' + n["icon-text"] + '">i</span>\n      </div>\n     <div class="' + n.icon + " " + s.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + n.image + '" />\n     <h2 class="' + n.title + '" id="' + n.title + '"></h2>\n     <button type="button" class="' + n.close + '">×</button>\n   </div>\n   <div class="' + n.content + '">\n     <div id="' + n.content + '"></div>\n     <input class="' + n.input + '" />\n     <input type="file" class="' + n.file + '" />\n     <div class="' + n.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + n.select + '"></select>\n     <div class="' + n.radio + '"></div>\n     <label for="' + n.checkbox + '" class="' + n.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + n.textarea + '"></textarea>\n     <div class="' + n.validationerror + '" id="' + n.validationerror + '"></div>\n   </div>\n   <div class="' + n.actions + '">\n     <button type="button" class="' + n.confirm + '">OK</button>\n     <button type="button" class="' + n.cancel + '">Cancel</button>\n   </div>\n   <div class="' + n.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
        V = function (e) {
            var t = S();
            if (t && (t.parentNode.removeChild(t), g([document.documentElement, document.body], [n["no-backdrop"], n["has-input"], n["toast-shown"]])), !B()) {
                var i = document.createElement("div");
                i.className = n.container, i.innerHTML = H, ("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(i);
                var s = T(), a = _(), r = v(a, n.input), l = v(a, n.file),
                    d = a.querySelector("." + n.range + " input"), h = a.querySelector("." + n.range + " output"),
                    c = v(a, n.select), u = a.querySelector("." + n.checkbox + " input"), p = v(a, n.textarea);
                s.setAttribute("role", e.toast ? "alert" : "dialog"), s.setAttribute("aria-live", e.toast ? "polite" : "assertive"), e.toast || s.setAttribute("aria-modal", "true");
                var f = function () {
                    ne.isVisible() && ne.resetValidationError()
                };
                return r.oninput = f, l.onchange = f, c.onchange = f, u.onchange = f, p.oninput = f, d.oninput = function () {
                    f(), h.value = d.value
                }, d.onchange = function () {
                    f(), d.nextSibling.value = d.value
                }, s
            }
            o("SweetAlert2 requires document to initialize")
        }, j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, F = function (e, t) {
            if (!e) return y(t);
            if ("object" === (void 0 === e ? "undefined" : j(e))) if (t.innerHTML = "", 0 in e) for (var i = 0; i in e; i++) t.appendChild(e[i].cloneNode(!0)); else t.appendChild(e.cloneNode(!0)); else e && (t.innerHTML = e);
            b(t)
        }, R = function () {
            if (B()) return !1;
            var e = document.createElement("div"), t = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd oanimationend",
                animation: "animationend"
            };
            for (var i in t) if (t.hasOwnProperty(i) && void 0 !== e.style[i]) return t[i];
            return !1
        }(), W = {
            email: function (e) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.reject("Invalid email address")
            }, url: function (e) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/\/=]*)$/.test(e) ? Promise.resolve() : Promise.reject("Invalid URL")
            }
        };

    function q(e) {
        e.inputValidator || Object.keys(W).forEach(function (t) {
            e.input === t && (e.inputValidator = e.expectRejections ? W[t] : ne.adaptInputValidator(W[t]))
        }), (!e.target || "string" == typeof e.target && !document.querySelector(e.target) || "string" != typeof e.target && !e.target.appendChild) && (r('Target parameter is not valid, defaulting to "body"'), e.target = "body");
        var t = void 0, i = T(), a = "string" == typeof e.target ? document.querySelector(e.target) : e.target;
        t = i && a && i.parentNode !== a.parentNode ? V(e) : i || V(e), e.width && (t.style.width = "number" == typeof e.width ? e.width + "px" : e.width), e.padding && (t.style.padding = "number" == typeof e.padding ? e.padding + "px" : e.padding), e.background && (t.style.background = e.background);
        for (var l = window.getComputedStyle(t).getPropertyValue("background-color"), d = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), h = 0; h < d.length; h++) d[h].style.backgroundColor = l;
        var c = S(), u = I(), p = _().querySelector("#" + n.content), f = O(), v = A(), x = D(), C = N(), z = L();
        if (e.titleText ? u.innerText = e.titleText : e.title && (u.innerHTML = e.title.split("\n").join("<br />")), "string" == typeof e.backdrop ? S().style.background = e.backdrop : e.backdrop || m([document.documentElement, document.body], n["no-backdrop"]), e.html ? F(e.html, p) : e.text ? (p.textContent = e.text, b(p)) : y(p), e.position in n ? m(c, n[e.position]) : (r('The "position" parameter is not valid, defaulting to "center"'), m(c, n.center)), e.grow && "string" == typeof e.grow) {
            var $ = "grow-" + e.grow;
            $ in n && m(c, n[$])
        }
        "function" == typeof e.animation && (e.animation = e.animation.call()), e.showCloseButton ? (C.setAttribute("aria-label", e.closeButtonAriaLabel), b(C)) : y(C), t.className = n.popup, e.toast ? (m([document.documentElement, document.body], n["toast-shown"]), m(t, n.toast)) : m(t, n.modal), e.customClass && m(t, e.customClass);
        var B = P(), H = parseInt(null === e.currentProgressStep ? ne.getQueueStep() : e.currentProgressStep, 10);
        e.progressSteps && e.progressSteps.length ? (b(B), w(B), H >= e.progressSteps.length && r("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), e.progressSteps.forEach(function (t, i) {
            var s = document.createElement("li");
            if (m(s, n.progresscircle), s.innerHTML = t, i === H && m(s, n.activeprogressstep), B.appendChild(s), i !== e.progressSteps.length - 1) {
                var a = document.createElement("li");
                m(a, n.progressline), e.progressStepsDistance && (a.style.width = e.progressStepsDistance), B.appendChild(a)
            }
        })) : y(B);
        for (var j = k(), R = 0; R < j.length; R++) y(j[R]);
        if (e.type) {
            var q = !1;
            for (var Y in s) if (e.type === Y) {
                q = !0;
                break
            }
            if (!q) return o("Unknown alert type: " + e.type), !1;
            var G = t.querySelector("." + n.icon + "." + s[e.type]);
            b(G), e.animation && m(G, "swal2-animate-" + e.type + "-icon")
        }
        var U = M();
        if (e.imageUrl ? (U.setAttribute("src", e.imageUrl), U.setAttribute("alt", e.imageAlt), b(U), e.imageWidth ? U.setAttribute("width", e.imageWidth) : U.removeAttribute("width"), e.imageHeight ? U.setAttribute("height", e.imageHeight) : U.removeAttribute("height"), U.className = n.image, e.imageClass && m(U, e.imageClass)) : y(U), e.showCancelButton ? x.style.display = "inline-block" : y(x), e.showConfirmButton ? E(v, "display") : y(v), e.showConfirmButton || e.showCancelButton ? b(f) : y(f), v.innerHTML = e.confirmButtonText, x.innerHTML = e.cancelButtonText, v.setAttribute("aria-label", e.confirmButtonAriaLabel), x.setAttribute("aria-label", e.cancelButtonAriaLabel), v.className = n.confirm, m(v, e.confirmButtonClass), x.className = n.cancel, m(x, e.cancelButtonClass), e.buttonsStyling) {
            m([v, x], n.styled), e.confirmButtonColor && (v.style.backgroundColor = e.confirmButtonColor), e.cancelButtonColor && (x.style.backgroundColor = e.cancelButtonColor);
            var X = window.getComputedStyle(v).getPropertyValue("background-color");
            v.style.borderLeftColor = X, v.style.borderRightColor = X
        } else g([v, x], n.styled), v.style.backgroundColor = v.style.borderLeftColor = v.style.borderRightColor = "", x.style.backgroundColor = x.style.borderLeftColor = x.style.borderRightColor = "";
        F(e.footer, z), !0 === e.animation ? g(t, n.noanimation) : m(t, n.noanimation), e.showLoaderOnConfirm && !e.preConfirm && r("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
    }

    var Y = Object.freeze({cancel: "cancel", backdrop: "overlay", close: "close", esc: "esc", timer: "timer"}),
        G = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, U = function (e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function (e, t) {
                var i = [], n = !0, s = !1, a = void 0;
                try {
                    for (var r, o = e[Symbol.iterator](); !(n = (r = o.next()).done) && (i.push(r.value), !t || i.length !== t); n = !0) ;
                } catch (e) {
                    s = !0, a = e
                } finally {
                    try {
                        !n && o.return && o.return()
                    } finally {
                        if (s) throw a
                    }
                }
                return i
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }, X = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }, K = X({}, e), Q = [], Z = void 0, J = void 0, ee = void 0, te = function (e) {
            for (var t in e) ne.isValidParameter(t) || r('Unknown parameter "' + t + '"'), ne.isDeprecatedParameter(t) && d('The parameter "' + t + '" is deprecated and will be removed in the next major release.')
        }, ie = function (e, t, i) {
            var s = S(), a = T();
            null !== t && "function" == typeof t && t(a), e ? (m(a, n.show), m(s, n.fade), g(a, n.hide)) : g(a, n.fade), b(a), s.style.overflowY = "hidden", R && !u(a, n.noanimation) ? a.addEventListener(R, function e() {
                a.removeEventListener(R, e), s.style.overflowY = "auto"
            }) : s.style.overflowY = "auto", m([document.documentElement, document.body, s], n.shown), $() && (null === c.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (c.previousBodyPadding = document.body.style.paddingRight, document.body.style.paddingRight = function () {
                if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;
                var e = document.createElement("div");
                e.style.width = "50px", e.style.height = "50px", e.style.overflow = "scroll", document.body.appendChild(e);
                var t = e.offsetWidth - e.clientWidth;
                return document.body.removeChild(e), t
            }() + "px"), function () {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !u(document.body, n.iosfix)) {
                    var e = document.body.scrollTop;
                    document.body.style.top = -1 * e + "px", m(document.body, n.iosfix)
                }
            }()), c.previousActiveElement = document.activeElement, null !== i && "function" == typeof i && setTimeout(function () {
                i(a)
            })
        }, ne = function e() {
            for (var t = arguments.length, i = Array(t), s = 0; s < t; s++) i[s] = arguments[s];
            if ("undefined" != typeof window) {
                if ("undefined" == typeof Promise && o("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"), void 0 === i[0]) return o("SweetAlert2 expects at least 1 attribute!"), !1;
                var a = Z = {}, r = a.params = X({}, K, e.argsToParams(i));
                q(r);
                var l = a.domCache = {
                    popup: T(),
                    container: S(),
                    content: _(),
                    actions: O(),
                    confirmButton: A(),
                    cancelButton: D(),
                    closeButton: N(),
                    validationError: C(n.validationerror),
                    progressSteps: P()
                };
                return new Promise(function (t, i) {
                    var s = function (i) {
                        e.closePopup(r.onClose), r.useRejections ? t(i) : t({value: i})
                    }, a = function (n) {
                        e.closePopup(r.onClose), r.useRejections ? i(n) : t({dismiss: n})
                    }, d = function (t) {
                        e.closePopup(r.onClose), i(t)
                    };
                    r.timer && (l.popup.timeout = setTimeout(function () {
                        return a("timer")
                    }, r.timer)), r.input && setTimeout(function () {
                        var t = e.getInput();
                        t && p(t)
                    }, 0);
                    for (var c = function (t) {
                        if (r.showLoaderOnConfirm && e.showLoading(), r.preConfirm) {
                            e.resetValidationError();
                            var i = Promise.resolve().then(function () {
                                return r.preConfirm(t, r.extraParams)
                            });
                            r.expectRejections ? i.then(function (e) {
                                return s(e || t)
                            }, function (t) {
                                e.hideLoading(), t && e.showValidationError(t)
                            }) : i.then(function (i) {
                                x(l.validationError) || !1 === i ? e.hideLoading() : s(i || t)
                            }, function (e) {
                                return d(e)
                            })
                        } else s(t)
                    }, u = function (t) {
                        var i = t || window.event, n = i.target || i.srcElement, s = l.confirmButton, o = l.cancelButton,
                            h = s && (s === n || s.contains(n)), u = o && (o === n || o.contains(n));
                        switch (i.type) {
                            case"click":
                                if (h && e.isVisible()) if (e.disableButtons(), r.input) {
                                    var p = function () {
                                        var t = e.getInput();
                                        if (!t) return null;
                                        switch (r.input) {
                                            case"checkbox":
                                                return t.checked ? 1 : 0;
                                            case"radio":
                                                return t.checked ? t.value : null;
                                            case"file":
                                                return t.files.length ? t.files[0] : null;
                                            default:
                                                return r.inputAutoTrim ? t.value.trim() : t.value
                                        }
                                    }();
                                    if (r.inputValidator) {
                                        e.disableInput();
                                        var f = Promise.resolve().then(function () {
                                            return r.inputValidator(p, r.extraParams)
                                        });
                                        r.expectRejections ? f.then(function () {
                                            e.enableButtons(), e.enableInput(), c(p)
                                        }, function (t) {
                                            e.enableButtons(), e.enableInput(), t && e.showValidationError(t)
                                        }) : f.then(function (t) {
                                            e.enableButtons(), e.enableInput(), t ? e.showValidationError(t) : c(p)
                                        }, function (e) {
                                            return d(e)
                                        })
                                    } else c(p)
                                } else c(!0); else u && e.isVisible() && (e.disableButtons(), a(e.DismissReason.cancel))
                        }
                    }, f = l.popup.querySelectorAll("button"), g = 0; g < f.length; g++) f[g].onclick = u, f[g].onmouseover = u, f[g].onmouseout = u, f[g].onmousedown = u;
                    if (l.closeButton.onclick = function () {
                        a(e.DismissReason.close)
                    }, r.toast) l.popup.onclick = function (t) {
                        r.showConfirmButton || r.showCancelButton || r.showCloseButton || r.input || (e.closePopup(r.onClose), a(e.DismissReason.close))
                    }; else {
                        var w = !1;
                        l.popup.onmousedown = function () {
                            l.container.onmouseup = function (e) {
                                l.container.onmouseup = void 0, e.target === l.container && (w = !0)
                            }
                        }, l.container.onmousedown = function () {
                            l.popup.onmouseup = function (e) {
                                l.popup.onmouseup = void 0, (e.target === l.popup || l.popup.contains(e.target)) && (w = !0)
                            }
                        }, l.container.onclick = function (t) {
                            w ? w = !1 : t.target === l.container && h(r.allowOutsideClick) && a(e.DismissReason.backdrop)
                        }
                    }
                    r.reverseButtons ? l.confirmButton.parentNode.insertBefore(l.cancelButton, l.confirmButton) : l.confirmButton.parentNode.insertBefore(l.confirmButton, l.cancelButton);
                    var E = function (e, t) {
                        for (var i = z(r.focusCancel), n = 0; n < i.length; n++) {
                            (e += t) === i.length ? e = 0 : -1 === e && (e = i.length - 1);
                            var s = i[e];
                            if (x(s)) return s.focus()
                        }
                    };
                    r.toast && ee && (window.onkeydown = J, ee = !1), r.toast || ee || (J = window.onkeydown, ee = !0, window.onkeydown = function (t) {
                        var i = t || window.event;
                        if ("Enter" !== i.key || i.isComposing) if ("Tab" === i.key) {
                            for (var n = i.target || i.srcElement, s = z(r.focusCancel), o = -1, d = 0; d < s.length; d++) if (n === s[d]) {
                                o = d;
                                break
                            }
                            i.shiftKey ? E(o, -1) : E(o, 1), i.stopPropagation(), i.preventDefault()
                        } else -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(i.key) ? document.activeElement === l.confirmButton && x(l.cancelButton) ? l.cancelButton.focus() : document.activeElement === l.cancelButton && x(l.confirmButton) && l.confirmButton.focus() : "Escape" !== i.key && "Esc" !== i.key || !0 !== h(r.allowEscapeKey) || a(e.DismissReason.esc); else if (i.target === e.getInput()) {
                            if (-1 !== ["textarea", "file"].indexOf(r.input)) return;
                            e.clickConfirm(), i.preventDefault()
                        }
                    }), e.enableButtons(), e.hideLoading(), e.resetValidationError(), r.input && m(document.body, n["has-input"]);
                    for (var S = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], C = void 0, T = 0; T < S.length; T++) {
                        var k = n[S[T]], I = v(l.content, k);
                        if (C = e.getInput(S[T])) {
                            for (var _ in C.attributes) if (C.attributes.hasOwnProperty(_)) {
                                var M = C.attributes[_].name;
                                "type" !== M && "value" !== M && C.removeAttribute(M)
                            }
                            for (var P in r.inputAttributes) C.setAttribute(P, r.inputAttributes[P])
                        }
                        I.className = k, r.inputClass && m(I, r.inputClass), y(I)
                    }
                    var A = void 0;
                    switch (r.input) {
                        case"text":
                        case"email":
                        case"password":
                        case"number":
                        case"tel":
                        case"url":
                            (C = v(l.content, n.input)).value = r.inputValue, C.placeholder = r.inputPlaceholder, C.type = r.input, b(C);
                            break;
                        case"file":
                            (C = v(l.content, n.file)).placeholder = r.inputPlaceholder, C.type = r.input, b(C);
                            break;
                        case"range":
                            var D = v(l.content, n.range), O = D.querySelector("input"), L = D.querySelector("output");
                            O.value = r.inputValue, O.type = r.input, L.value = r.inputValue, b(D);
                            break;
                        case"select":
                            var N = v(l.content, n.select);
                            if (N.innerHTML = "", r.inputPlaceholder) {
                                var $ = document.createElement("option");
                                $.innerHTML = r.inputPlaceholder, $.value = "", $.disabled = !0, $.selected = !0, N.appendChild($)
                            }
                            A = function (e) {
                                e.forEach(function (e) {
                                    var t = U(e, 2), i = t[0], n = t[1], s = document.createElement("option");
                                    s.value = i, s.innerHTML = n, r.inputValue.toString() === i.toString() && (s.selected = !0), N.appendChild(s)
                                }), b(N), N.focus()
                            };
                            break;
                        case"radio":
                            var B = v(l.content, n.radio);
                            B.innerHTML = "", A = function (e) {
                                e.forEach(function (e) {
                                    var t = U(e, 2), i = t[0], s = t[1], a = document.createElement("input"),
                                        o = document.createElement("label");
                                    a.type = "radio", a.name = n.radio, a.value = i, r.inputValue.toString() === i.toString() && (a.checked = !0), o.innerHTML = s, o.insertBefore(a, o.firstChild), B.appendChild(o)
                                }), b(B);
                                var t = B.querySelectorAll("input");
                                t.length && t[0].focus()
                            };
                            break;
                        case"checkbox":
                            var H = v(l.content, n.checkbox), V = e.getInput("checkbox");
                            V.type = "checkbox", V.value = 1, V.id = n.checkbox, V.checked = Boolean(r.inputValue);
                            var j = H.getElementsByTagName("span");
                            j.length && H.removeChild(j[0]), (j = document.createElement("span")).innerHTML = r.inputPlaceholder, H.appendChild(j), b(H);
                            break;
                        case"textarea":
                            var F = v(l.content, n.textarea);
                            F.value = r.inputValue, F.placeholder = r.inputPlaceholder, b(F);
                            break;
                        case null:
                            break;
                        default:
                            o('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + r.input + '"')
                    }
                    if ("select" === r.input || "radio" === r.input) {
                        var R = function (e) {
                            return A((i = [], (t = e) instanceof Map ? t.forEach(function (e, t) {
                                i.push([t, e])
                            }) : Object.keys(t).forEach(function (e) {
                                i.push([e, t[e]])
                            }), i));
                            var t, i
                        };
                        r.inputOptions instanceof Promise ? (e.showLoading(), r.inputOptions.then(function (t) {
                            e.hideLoading(), R(t)
                        })) : "object" === G(r.inputOptions) ? R(r.inputOptions) : o("Unexpected type of inputOptions! Expected object, Map or Promise, got " + G(r.inputOptions))
                    }
                    ie(r.animation, r.onBeforeOpen, r.onOpen), r.toast || (h(r.allowEnterKey) ? r.focusCancel && x(l.cancelButton) ? l.cancelButton.focus() : r.focusConfirm && x(l.confirmButton) ? l.confirmButton.focus() : E(-1, 1) : document.activeElement && document.activeElement.blur()), l.container.scrollTop = 0
                })
            }
        };
    return ne.isVisible = function () {
        return !!T()
    }, ne.queue = function (e) {
        Q = e;
        var t = function () {
            Q = [], document.body.removeAttribute("data-swal2-queue-step")
        }, i = [];
        return new Promise(function (e, n) {
            !function n(s, a) {
                s < Q.length ? (document.body.setAttribute("data-swal2-queue-step", s), ne(Q[s]).then(function (r) {
                    void 0 !== r.value ? (i.push(r.value), n(s + 1, a)) : (t(), e({dismiss: r.dismiss}))
                })) : (t(), e({value: i}))
            }(0)
        })
    }, ne.getQueueStep = function () {
        return document.body.getAttribute("data-swal2-queue-step")
    }, ne.insertQueueStep = function (e, t) {
        return t && t < Q.length ? Q.splice(t, 0, e) : Q.push(e)
    }, ne.deleteQueueStep = function (e) {
        void 0 !== Q[e] && Q.splice(e, 1)
    }, ne.close = ne.closePopup = ne.closeModal = ne.closeToast = function (e) {
        var t = S(), i = T();
        if (i) {
            g(i, n.show), m(i, n.hide), clearTimeout(i.timeout), document.body.classList.contains(n["toast-shown"]) || (function () {
                if (c.previousActiveElement && c.previousActiveElement.focus) {
                    var e = window.scrollX, t = window.scrollY;
                    c.previousActiveElement.focus(), void 0 !== e && void 0 !== t && window.scrollTo(e, t)
                }
            }(), window.onkeydown = J, ee = !1);
            var s = function () {
                t.parentNode && t.parentNode.removeChild(t), g([document.documentElement, document.body], [n.shown, n["no-backdrop"], n["has-input"], n["toast-shown"]]), $() && (null !== c.previousBodyPadding && (document.body.style.paddingRight = c.previousBodyPadding, c.previousBodyPadding = null), function () {
                    if (u(document.body, n.iosfix)) {
                        var e = parseInt(document.body.style.top, 10);
                        g(document.body, n.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * e
                    }
                }())
            };
            R && !u(i, n.noanimation) ? i.addEventListener(R, function e() {
                i.removeEventListener(R, e), u(i, n.hide) && s()
            }) : s(), null !== e && "function" == typeof e && setTimeout(function () {
                e(i)
            })
        }
    }, ne.clickConfirm = function () {
        return A().click()
    }, ne.clickCancel = function () {
        return D().click()
    }, ne.showLoading = ne.enableLoading = function () {
        var e = T();
        e || ne(""), e = T();
        var t = O(), i = A(), s = D();
        b(t), b(i), m([e, t], n.loading), i.disabled = !0, s.disabled = !0, e.setAttribute("data-loading", !0), e.setAttribute("aria-busy", !0), e.focus()
    }, ne.isValidParameter = function (t) {
        return e.hasOwnProperty(t) || "extraParams" === t
    }, ne.isDeprecatedParameter = function (e) {
        return -1 !== t.indexOf(e)
    }, ne.setDefaults = function (e) {
        if (!e || "object" !== (void 0 === e ? "undefined" : G(e))) return o("the argument for setDefaults() is required and has to be a object");
        for (var t in te(e), e) ne.isValidParameter(t) && (K[t] = e[t])
    }, ne.resetDefaults = function () {
        K = X({}, e)
    }, ne.adaptInputValidator = function (e) {
        return function (t, i) {
            return e.call(this, t, i).then(function () {
            }, function (e) {
                return e
            })
        }
    }, ne.getTitle = function () {
        return I()
    }, ne.getContent = function () {
        return _()
    }, ne.getImage = function () {
        return M()
    }, ne.getButtonsWrapper = function () {
        return d("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"), C(n.actions)
    }, ne.getActions = function () {
        return O()
    }, ne.getConfirmButton = function () {
        return A()
    }, ne.getCancelButton = function () {
        return D()
    }, ne.getFooter = function () {
        return L()
    }, ne.isLoading = function () {
        return T().hasAttribute("data-loading")
    }, ne.hideLoading = ne.disableLoading = function () {
        if (Z) {
            var e = Z, t = e.params, i = e.domCache;
            t.showConfirmButton || (y(i.confirmButton), t.showCancelButton || y(i.actions)), g([i.popup, i.actions], n.loading), i.popup.removeAttribute("aria-busy"), i.popup.removeAttribute("data-loading"), i.confirmButton.disabled = !1, i.cancelButton.disabled = !1
        }
    }, ne.getInput = function (e) {
        if (Z) {
            var t = Z, i = t.params, s = t.domCache;
            if (!(e = e || i.input)) return null;
            switch (e) {
                case"select":
                case"textarea":
                case"file":
                    return v(s.content, n[e]);
                case"checkbox":
                    return s.popup.querySelector("." + n.checkbox + " input");
                case"radio":
                    return s.popup.querySelector("." + n.radio + " input:checked") || s.popup.querySelector("." + n.radio + " input:first-child");
                case"range":
                    return s.popup.querySelector("." + n.range + " input");
                default:
                    return v(s.content, n.input)
            }
        }
    }, ne.enableButtons = function () {
        if (Z) {
            var e = Z.domCache;
            e.confirmButton.disabled = !1, e.cancelButton.disabled = !1
        }
    }, ne.disableButtons = function () {
        if (Z) {
            var e = Z.domCache;
            e.confirmButton.disabled = !0, e.cancelButton.disabled = !0
        }
    }, ne.enableConfirmButton = function () {
        Z && (Z.domCache.confirmButton.disabled = !1)
    }, ne.disableConfirmButton = function () {
        Z && (Z.domCache.confirmButton.disabled = !0)
    }, ne.enableInput = function () {
        if (Z) {
            var e = ne.getInput();
            if (!e) return !1;
            if ("radio" === e.type) for (var t = e.parentNode.parentNode.querySelectorAll("input"), i = 0; i < t.length; i++) t[i].disabled = !1; else e.disabled = !1
        }
    }, ne.disableInput = function () {
        if (Z) {
            var e = ne.getInput();
            if (!e) return !1;
            if (e && "radio" === e.type) for (var t = e.parentNode.parentNode.querySelectorAll("input"), i = 0; i < t.length; i++) t[i].disabled = !0; else e.disabled = !0
        }
    }, ne.showValidationError = function (e) {
        if (Z) {
            var t = Z.domCache;
            t.validationError.innerHTML = e;
            var i = window.getComputedStyle(t.popup);
            t.validationError.style.marginLeft = "-" + i.getPropertyValue("padding-left"), t.validationError.style.marginRight = "-" + i.getPropertyValue("padding-right"), b(t.validationError);
            var s = ne.getInput();
            s && (s.setAttribute("aria-invalid", !0), s.setAttribute("aria-describedBy", n.validationerror), p(s), m(s, n.inputerror))
        }
    }, ne.resetValidationError = function () {
        if (Z) {
            var e = Z.domCache;
            e.validationError && y(e.validationError);
            var t = ne.getInput();
            t && (t.removeAttribute("aria-invalid"), t.removeAttribute("aria-describedBy"), g(t, n.inputerror))
        }
    }, ne.getProgressSteps = function () {
        if (Z) return Z.params.progressSteps
    }, ne.setProgressSteps = function (e) {
        if (Z) {
            var t = Z.params;
            t.progressSteps = e, q(t)
        }
    }, ne.showProgressSteps = function () {
        if (Z) {
            var e = Z.domCache;
            b(e.progressSteps)
        }
    }, ne.hideProgressSteps = function () {
        if (Z) {
            var e = Z.domCache;
            y(e.progressSteps)
        }
    }, ne.argsToParams = function (e) {
        var t = {};
        switch (G(e[0])) {
            case"string":
                ["title", "html", "type"].forEach(function (i, n) {
                    void 0 !== e[n] && (t[i] = e[n])
                });
                break;
            case"object":
                te(e[0]), X(t, e[0]);
                break;
            default:
                return o('Unexpected type of argument! Expected "string" or "object", got ' + G(e[0])), !1
        }
        return t
    }, ne.DismissReason = Y, ne.noop = function () {
    }, ne.version = "7.15.1", ne.default = ne, "undefined" != typeof window && "object" === G(window._swalDefaults) && ne.setDefaults(window._swalDefaults), ne
}), "undefined" != typeof window && window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function () {
    "use strict";
    var e = "undefined" == typeof document ? {
        body: {}, addEventListener: function () {
        }, removeEventListener: function () {
        }, activeElement: {
            blur: function () {
            }, nodeName: ""
        }, querySelector: function () {
            return null
        }, querySelectorAll: function () {
            return []
        }, getElementById: function () {
            return null
        }, createEvent: function () {
            return {
                initEvent: function () {
                }
            }
        }, createElement: function () {
            return {
                children: [], childNodes: [], style: {}, setAttribute: function () {
                }, getElementsByTagName: function () {
                    return []
                }
            }
        }, location: {hash: ""}
    } : document, t = "undefined" == typeof window ? {
        document: e,
        navigator: {userAgent: ""},
        location: {},
        history: {},
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {
        },
        removeEventListener: function () {
        },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {
        },
        Date: function () {
        },
        screen: {},
        setTimeout: function () {
        },
        clearTimeout: function () {
        }
    } : window, i = function (e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this
    };

    function n(n, s) {
        var a = [], r = 0;
        if (n && !s && n instanceof i) return n;
        if (n) if ("string" == typeof n) {
            var o, l, d = n.trim();
            if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                var h = "div";
                for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, r = 0; r < l.childNodes.length; r += 1) a.push(l.childNodes[r])
            } else for (o = s || "#" !== n[0] || n.match(/[ .<>:~]/) ? (s || e).querySelectorAll(n.trim()) : [e.getElementById(n.trim().split("#")[1])], r = 0; r < o.length; r += 1) o[r] && a.push(o[r])
        } else if (n.nodeType || n === t || n === e) a.push(n); else if (n.length > 0 && n[0].nodeType) for (r = 0; r < n.length; r += 1) a.push(n[r]);
        return new i(a)
    }

    function s(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }

    n.fn = i.prototype, n.Class = i, n.Dom7 = i;
    var a = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.add(t[i]);
            return this
        }, removeClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.remove(t[i]);
            return this
        }, hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        }, toggleClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
            return this
        }, attr: function (e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var n = 0; n < this.length; n += 1) if (2 === i.length) this[n].setAttribute(e, t); else for (var s in e) this[n][s] = e[s], this[n].setAttribute(s, e[s]);
            return this
        }, removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        }, data: function (e, t) {
            var i;
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n += 1) (i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var s = i.getAttribute("data-" + e);
                return s || void 0
            }
        }, transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        }, transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        }, on: function () {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var s = t[0], a = t[1], r = t[2], o = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), n(t).is(a)) r.apply(t, i); else for (var s = n(t).parents(), o = 0; o < s.length; o += 1) n(s[o]).is(a) && r.apply(s[o], i)
                }
            }

            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }

            "function" == typeof t[1] && (s = (e = t)[0], r = e[1], o = e[2], a = void 0), o || (o = !1);
            for (var h, c = s.split(" "), u = 0; u < this.length; u += 1) {
                var p = this[u];
                if (a) for (h = 0; h < c.length; h += 1) {
                    var f = c[h];
                    p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[f] || (p.dom7LiveListeners[f] = []), p.dom7LiveListeners[f].push({
                        listener: r,
                        proxyListener: l
                    }), p.addEventListener(f, l, o)
                } else for (h = 0; h < c.length; h += 1) {
                    var m = c[h];
                    p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[m] || (p.dom7Listeners[m] = []), p.dom7Listeners[m].push({
                        listener: r,
                        proxyListener: d
                    }), p.addEventListener(m, d, o)
                }
            }
            return this
        }, off: function () {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var n = t[0], s = t[1], a = t[2], r = t[3];
            "function" == typeof t[1] && (n = (e = t)[0], a = e[1], r = e[2], s = void 0), r || (r = !1);
            for (var o = n.split(" "), l = 0; l < o.length; l += 1) for (var d = o[l], h = 0; h < this.length; h += 1) {
                var c = this[h], u = void 0;
                if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length) for (var p = u.length - 1; p >= 0; p -= 1) {
                    var f = u[p];
                    a && f.listener === a ? (c.removeEventListener(d, f.proxyListener, r), u.splice(p, 1)) : a && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === a ? (c.removeEventListener(d, f.proxyListener, r), u.splice(p, 1)) : a || (c.removeEventListener(d, f.proxyListener, r), u.splice(p, 1))
                }
            }
            return this
        }, trigger: function () {
            for (var i = [], n = arguments.length; n--;) i[n] = arguments[n];
            for (var s = i[0].split(" "), a = i[1], r = 0; r < s.length; r += 1) for (var o = s[r], l = 0; l < this.length; l += 1) {
                var d = this[l], h = void 0;
                try {
                    h = new t.CustomEvent(o, {detail: a, bubbles: !0, cancelable: !0})
                } catch (t) {
                    (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = a
                }
                d.dom7EventData = i.filter(function (e, t) {
                    return t > 0
                }), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData
            }
            return this
        }, transitionEnd: function (e) {
            var t, i = ["webkitTransitionEnd", "transitionend"], n = this;

            function s(a) {
                if (a.target === this) for (e.call(this, a), t = 0; t < i.length; t += 1) n.off(i[t], s)
            }

            if (e) for (t = 0; t < i.length; t += 1) n.on(i[t], s);
            return this
        }, outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        }, outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        }, offset: function () {
            if (this.length > 0) {
                var i = this[0], n = i.getBoundingClientRect(), s = e.body, a = i.clientTop || s.clientTop || 0,
                    r = i.clientLeft || s.clientLeft || 0, o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return {top: n.top + o - a, left: n.left + l - r}
            }
            return null
        }, css: function (e, i) {
            var n;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (n = 0; n < this.length; n += 1) for (var s in e) this[n].style[s] = e[s];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (n = 0; n < this.length; n += 1) this[n].style[e] = i;
                return this
            }
            return this
        }, each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        }, html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        }, text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        }, is: function (s) {
            var a, r, o = this[0];
            if (!o || void 0 === s) return !1;
            if ("string" == typeof s) {
                if (o.matches) return o.matches(s);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(s);
                if (o.msMatchesSelector) return o.msMatchesSelector(s);
                for (a = n(s), r = 0; r < a.length; r += 1) if (a[r] === o) return !0;
                return !1
            }
            if (s === e) return o === e;
            if (s === t) return o === t;
            if (s.nodeType || s instanceof i) {
                for (a = s.nodeType ? [s] : s, r = 0; r < a.length; r += 1) if (a[r] === o) return !0;
                return !1
            }
            return !1
        }, index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        }, eq: function (e) {
            if (void 0 === e) return this;
            var t, n = this.length;
            return new i(e > n - 1 ? [] : e < 0 ? (t = n + e) < 0 ? [] : [this[t]] : [this[e]])
        }, append: function () {
            for (var t, n = [], s = arguments.length; s--;) n[s] = arguments[s];
            for (var a = 0; a < n.length; a += 1) {
                t = n[a];
                for (var r = 0; r < this.length; r += 1) if ("string" == typeof t) {
                    var o = e.createElement("div");
                    for (o.innerHTML = t; o.firstChild;) this[r].appendChild(o.firstChild)
                } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[r].appendChild(t[l]); else this[r].appendChild(t)
            }
            return this
        }, prepend: function (t) {
            var n, s;
            for (n = 0; n < this.length; n += 1) if ("string" == typeof t) {
                var a = e.createElement("div");
                for (a.innerHTML = t, s = a.childNodes.length - 1; s >= 0; s -= 1) this[n].insertBefore(a.childNodes[s], this[n].childNodes[0])
            } else if (t instanceof i) for (s = 0; s < t.length; s += 1) this[n].insertBefore(t[s], this[n].childNodes[0]); else this[n].insertBefore(t, this[n].childNodes[0]);
            return this
        }, next: function (e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        }, nextAll: function (e) {
            var t = [], s = this[0];
            if (!s) return new i([]);
            for (; s.nextElementSibling;) {
                var a = s.nextElementSibling;
                e ? n(a).is(e) && t.push(a) : t.push(a), s = a
            }
            return new i(t)
        }, prev: function (e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && n(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        }, prevAll: function (e) {
            var t = [], s = this[0];
            if (!s) return new i([]);
            for (; s.previousElementSibling;) {
                var a = s.previousElementSibling;
                e ? n(a).is(e) && t.push(a) : t.push(a), s = a
            }
            return new i(t)
        }, parent: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? n(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return n(s(t))
        }, parents: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var a = this[i].parentNode; a;) e ? n(a).is(e) && t.push(a) : t.push(a), a = a.parentNode;
            return n(s(t))
        }, closest: function (e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        }, find: function (e) {
            for (var t = [], n = 0; n < this.length; n += 1) for (var s = this[n].querySelectorAll(e), a = 0; a < s.length; a += 1) t.push(s[a]);
            return new i(t)
        }, children: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) for (var r = this[a].childNodes, o = 0; o < r.length; o += 1) e ? 1 === r[o].nodeType && n(r[o]).is(e) && t.push(r[o]) : 1 === r[o].nodeType && t.push(r[o]);
            return new i(s(t))
        }, remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }, add: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, s;
            for (i = 0; i < e.length; i += 1) {
                var a = n(e[i]);
                for (s = 0; s < a.length; s += 1) this[this.length] = a[s], this.length += 1
            }
            return this
        }, styles: function () {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(a).forEach(function (e) {
        n.fn[e] = a[e]
    });
    var r, o, l = {
        deleteProps: function (e) {
            var t = e;
            Object.keys(t).forEach(function (e) {
                try {
                    t[e] = null
                } catch (e) {
                }
                try {
                    delete t[e]
                } catch (e) {
                }
            })
        }, nextTick: function (e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }, now: function () {
            return Date.now()
        }, getTranslate: function (e, i) {
            var n, s, a;
            void 0 === i && (i = "x");
            var r = t.getComputedStyle(e, null);
            return t.WebKitCSSMatrix ? ((s = r.transform || r.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function (e) {
                return e.replace(",", ".")
            }).join(", ")), a = new t.WebKitCSSMatrix("none" === s ? "" : s)) : n = (a = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (s = t.WebKitCSSMatrix ? a.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), "y" === i && (s = t.WebKitCSSMatrix ? a.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])), s || 0
        }, parseUrlQuery: function (e) {
            var i, n, s, a, r = {}, o = e || t.location.href;
            if ("string" == typeof o && o.length) for (a = (n = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                return "" !== e
            })).length, i = 0; i < a; i += 1) s = n[i].replace(/#\S+/g, "").split("="), r[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
            return r
        }, isObject: function (e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }, extend: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                var s = e[n];
                if (null != s) for (var a = Object.keys(Object(s)), r = 0, o = a.length; r < o; r += 1) {
                    var d = a[r], h = Object.getOwnPropertyDescriptor(s, d);
                    void 0 !== h && h.enumerable && (l.isObject(i[d]) && l.isObject(s[d]) ? l.extend(i[d], s[d]) : !l.isObject(i[d]) && l.isObject(s[d]) ? (i[d] = {}, l.extend(i[d], s[d])) : i[d] = s[d])
                }
            }
            return i
        }
    }, d = (o = e.createElement("div"), {
        touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        pointerEvents: !!(t.navigator.pointerEnabled || t.PointerEvent || "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0),
        prefixedPointerEvents: !!t.navigator.msPointerEnabled,
        transition: (r = o.style, "transition" in r || "webkitTransition" in r || "MozTransition" in r),
        transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || function () {
            var e = o.style;
            return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
        }(),
        flexbox: function () {
            for (var e = o.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return !0;
            return !1
        }(),
        observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
        passiveListener: function () {
            var e = !1;
            try {
                var i = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, i)
            } catch (e) {
            }
            return e
        }(),
        gestures: "ongesturestart" in t
    }), h = function () {
        return {
            isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        };
        var e
    }(), c = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e])
        })
    }, u = {components: {configurable: !0}};
    c.prototype.on = function (e, t, i) {
        var n = this;
        if ("function" != typeof t) return n;
        var s = i ? "unshift" : "push";
        return e.split(" ").forEach(function (e) {
            n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][s](t)
        }), n
    }, c.prototype.once = function (e, t, i) {
        var n = this;
        if ("function" != typeof t) return n;

        function s() {
            for (var i = [], a = arguments.length; a--;) i[a] = arguments[a];
            t.apply(n, i), n.off(e, s), s.f7proxy && delete s.f7proxy
        }

        return s.f7proxy = t, n.on(e, s, i)
    }, c.prototype.off = function (e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach(function (e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach(function (n, s) {
                (n === t || n.f7proxy && n.f7proxy === t) && i.eventsListeners[e].splice(s, 1)
            })
        }), i) : i
    }, c.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, n, s, a = this;
        return a.eventsListeners ? ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], n = e.slice(1, e.length), s = a) : (i = e[0].events, n = e[0].data, s = e[0].context || a), (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
            if (a.eventsListeners && a.eventsListeners[e]) {
                var t = [];
                a.eventsListeners[e].forEach(function (e) {
                    t.push(e)
                }), t.forEach(function (e) {
                    e.apply(s, n)
                })
            }
        }), a) : a
    }, c.prototype.useModulesParams = function (e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function (i) {
            var n = t.modules[i];
            n.params && l.extend(e, n.params)
        })
    }, c.prototype.useModules = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function (i) {
            var n = t.modules[i], s = e[i] || {};
            n.instance && Object.keys(n.instance).forEach(function (e) {
                var i = n.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }), n.on && t.on && Object.keys(n.on).forEach(function (e) {
                t.on(e, n.on[e])
            }), n.create && n.create.bind(t)(s)
        })
    }, u.components.set = function (e) {
        this.use && this.use(e)
    }, c.installModule = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var n = this;
        n.prototype.modules || (n.prototype.modules = {});
        var s = e.name || Object.keys(n.prototype.modules).length + "_" + l.now();
        return n.prototype.modules[s] = e, e.proto && Object.keys(e.proto).forEach(function (t) {
            n.prototype[t] = e.proto[t]
        }), e.static && Object.keys(e.static).forEach(function (t) {
            n[t] = e.static[t]
        }), e.install && e.install.apply(n, t), n
    }, c.use = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var n = this;
        return Array.isArray(e) ? (e.forEach(function (e) {
            return n.installModule(e)
        }), n) : n.installModule.apply(n, [e].concat(t))
    }, Object.defineProperties(c, u);
    var p = {
        updateSize: function () {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), l.extend(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t
            }))
        }, updateSlides: function () {
            var e = this.params, i = this.$wrapperEl, n = this.size, s = this.rtlTranslate, a = this.wrongRTL,
                r = this.virtual && e.virtual.enabled, o = r ? this.virtual.slides.length : this.slides.length,
                h = i.children("." + this.params.slideClass), c = r ? this.virtual.slides.length : h.length, u = [],
                p = [], f = [], m = e.slidesOffsetBefore;
            "function" == typeof m && (m = e.slidesOffsetBefore.call(this));
            var g = e.slidesOffsetAfter;
            "function" == typeof g && (g = e.slidesOffsetAfter.call(this));
            var v = this.snapGrid.length, b = this.snapGrid.length, y = e.spaceBetween, w = -m, x = 0, E = 0;
            if (void 0 !== n) {
                var S, C;
                "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * n), this.virtualSize = -y, s ? h.css({
                    marginLeft: "",
                    marginTop: ""
                }) : h.css({
                    marginRight: "",
                    marginBottom: ""
                }), e.slidesPerColumn > 1 && (S = Math.floor(c / e.slidesPerColumn) === c / this.params.slidesPerColumn ? c : Math.ceil(c / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (S = Math.max(S, e.slidesPerView * e.slidesPerColumn)));
                for (var T, k = e.slidesPerColumn, I = S / k, _ = Math.floor(c / e.slidesPerColumn), M = 0; M < c; M += 1) {
                    C = 0;
                    var P = h.eq(M);
                    if (e.slidesPerColumn > 1) {
                        var A = void 0, D = void 0, O = void 0;
                        "column" === e.slidesPerColumnFill ? (O = M - (D = Math.floor(M / k)) * k, (D > _ || D === _ && O === k - 1) && (O += 1) >= k && (O = 0, D += 1), A = D + O * S / k, P.css({
                            "-webkit-box-ordinal-group": A,
                            "-moz-box-ordinal-group": A,
                            "-ms-flex-order": A,
                            "-webkit-order": A,
                            order: A
                        })) : D = M - (O = Math.floor(M / I)) * I, P.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== O && e.spaceBetween && e.spaceBetween + "px").attr("data-swiper-column", D).attr("data-swiper-row", O)
                    }
                    if ("none" !== P.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var L = t.getComputedStyle(P[0], null), N = P[0].style.transform,
                                z = P[0].style.webkitTransform;
                            if (N && (P[0].style.transform = "none"), z && (P[0].style.webkitTransform = "none"), e.roundLengths) C = this.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0); else if (this.isHorizontal()) {
                                var $ = parseFloat(L.getPropertyValue("width")),
                                    B = parseFloat(L.getPropertyValue("padding-left")),
                                    H = parseFloat(L.getPropertyValue("padding-right")),
                                    V = parseFloat(L.getPropertyValue("margin-left")),
                                    j = parseFloat(L.getPropertyValue("margin-right")),
                                    F = L.getPropertyValue("box-sizing");
                                C = F && "border-box" === F ? $ + V + j : $ + B + H + V + j
                            } else {
                                var R = parseFloat(L.getPropertyValue("height")),
                                    W = parseFloat(L.getPropertyValue("padding-top")),
                                    q = parseFloat(L.getPropertyValue("padding-bottom")),
                                    Y = parseFloat(L.getPropertyValue("margin-top")),
                                    G = parseFloat(L.getPropertyValue("margin-bottom")),
                                    U = L.getPropertyValue("box-sizing");
                                C = U && "border-box" === U ? R + Y + G : R + W + q + Y + G
                            }
                            N && (P[0].style.transform = N), z && (P[0].style.webkitTransform = z), e.roundLengths && (C = Math.floor(C))
                        } else C = (n - (e.slidesPerView - 1) * y) / e.slidesPerView, e.roundLengths && (C = Math.floor(C)), h[M] && (this.isHorizontal() ? h[M].style.width = C + "px" : h[M].style.height = C + "px");
                        h[M] && (h[M].swiperSlideSize = C), f.push(C), e.centeredSlides ? (w = w + C / 2 + x / 2 + y, 0 === x && 0 !== M && (w = w - n / 2 - y), 0 === M && (w = w - n / 2 - y), Math.abs(w) < .001 && (w = 0), e.roundLengths && (w = Math.floor(w)), E % e.slidesPerGroup == 0 && u.push(w), p.push(w)) : (e.roundLengths && (w = Math.floor(w)), E % e.slidesPerGroup == 0 && u.push(w), p.push(w), w = w + C + y), this.virtualSize += C + y, x = C, E += 1
                    }
                }
                if (this.virtualSize = Math.max(this.virtualSize, n) + g, s && a && ("slide" === e.effect || "coverflow" === e.effect) && i.css({width: this.virtualSize + e.spaceBetween + "px"}), d.flexbox && !e.setWrapperSize || (this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (C + e.spaceBetween) * S, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
                    T = [];
                    for (var X = 0; X < u.length; X += 1) {
                        var K = u[X];
                        e.roundLengths && (K = Math.floor(K)), u[X] < this.virtualSize + u[0] && T.push(K)
                    }
                    u = T
                }
                if (!e.centeredSlides) {
                    T = [];
                    for (var Q = 0; Q < u.length; Q += 1) {
                        var Z = u[Q];
                        e.roundLengths && (Z = Math.floor(Z)), u[Q] <= this.virtualSize - n && T.push(Z)
                    }
                    u = T, Math.floor(this.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 && u.push(this.virtualSize - n)
                }
                if (0 === u.length && (u = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? s ? h.css({marginLeft: y + "px"}) : h.css({marginRight: y + "px"}) : h.css({marginBottom: y + "px"})), e.centerInsufficientSlides) {
                    var J = 0;
                    if (f.forEach(function (t) {
                        J += t + (e.spaceBetween ? e.spaceBetween : 0)
                    }), (J -= e.spaceBetween) < n) {
                        var ee = (n - J) / 2;
                        u.forEach(function (e, t) {
                            u[t] = e - ee
                        }), p.forEach(function (e, t) {
                            p[t] = e + ee
                        })
                    }
                }
                l.extend(this, {
                    slides: h,
                    snapGrid: u,
                    slidesGrid: p,
                    slidesSizesGrid: f
                }), c !== o && this.emit("slidesLengthChange"), u.length !== v && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), p.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        }, updateAutoHeight: function (e) {
            var t, i = [], n = 0;
            if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                var s = this.activeIndex + t;
                if (s > this.slides.length) break;
                i.push(this.slides.eq(s)[0])
            } else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1) if (void 0 !== i[t]) {
                var a = i[t].offsetHeight;
                n = a > n ? a : n
            }
            n && this.$wrapperEl.css("height", n + "px")
        }, updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        }, updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params, i = this.slides, s = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var a = -e;
                s && (a = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
                for (var r = 0; r < i.length; r += 1) {
                    var o = i[r],
                        l = (a + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var d = -(a - o.swiperSlideOffset), h = d + this.slidesSizesGrid[r];
                        (d >= 0 && d < this.size || h > 0 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(r), i.eq(r).addClass(t.slideVisibleClass))
                    }
                    o.progress = s ? -l : l
                }
                this.visibleSlides = n(this.visibleSlides)
            }
        }, updateProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params, i = this.maxTranslate() - this.minTranslate(), n = this.progress, s = this.isBeginning,
                a = this.isEnd, r = s, o = a;
            0 === i ? (n = 0, s = !0, a = !0) : (s = (n = (e - this.minTranslate()) / i) <= 0, a = n >= 1), l.extend(this, {
                progress: n,
                isBeginning: s,
                isEnd: a
            }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), s && !r && this.emit("reachBeginning toEdge"), a && !o && this.emit("reachEnd toEdge"), (r && !s || o && !a) && this.emit("fromEdge"), this.emit("progress", n)
        }, updateSlidesClasses: function () {
            var e, t = this.slides, i = this.params, n = this.$wrapperEl, s = this.activeIndex, a = this.realIndex,
                r = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = r ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + s + '"]') : t.eq(s)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? n.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass) : n.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? n.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : n.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? n.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : n.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        }, updateActiveIndex: function (e) {
            var t, i = this.rtlTranslate ? this.translate : -this.translate, n = this.slidesGrid, s = this.snapGrid,
                a = this.params, r = this.activeIndex, o = this.realIndex, d = this.snapIndex, h = e;
            if (void 0 === h) {
                for (var c = 0; c < n.length; c += 1) void 0 !== n[c + 1] ? i >= n[c] && i < n[c + 1] - (n[c + 1] - n[c]) / 2 ? h = c : i >= n[c] && i < n[c + 1] && (h = c + 1) : i >= n[c] && (h = c);
                a.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if ((t = s.indexOf(i) >= 0 ? s.indexOf(i) : Math.floor(h / a.slidesPerGroup)) >= s.length && (t = s.length - 1), h !== r) {
                var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                l.extend(this, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: r,
                    activeIndex: h
                }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== u && this.emit("realIndexChange"), this.emit("slideChange")
            } else t !== d && (this.snapIndex = t, this.emit("snapIndexChange"))
        }, updateClickedSlide: function (e) {
            var t = this.params, i = n(e.target).closest("." + t.slideClass)[0], s = !1;
            if (i) for (var a = 0; a < this.slides.length; a += 1) this.slides[a] === i && (s = !0);
            if (!i || !s) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
            this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(n(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = n(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    };
    var f = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params, i = this.rtlTranslate, n = this.translate, s = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -n : n;
            var a = l.getTranslate(s[0], e);
            return i && (a = -a), a || 0
        }, setTranslate: function (e, t) {
            var i = this.rtlTranslate, n = this.params, s = this.$wrapperEl, a = this.progress, r = 0, o = 0;
            this.isHorizontal() ? r = i ? -e : e : o = e, n.roundLengths && (r = Math.floor(r), o = Math.floor(o)), n.virtualTranslate || (d.transforms3d ? s.transform("translate3d(" + r + "px, " + o + "px, 0px)") : s.transform("translate(" + r + "px, " + o + "px)")), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? r : o;
            var l = this.maxTranslate() - this.minTranslate();
            (0 === l ? 0 : (e - this.minTranslate()) / l) !== a && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
        }, minTranslate: function () {
            return -this.snapGrid[0]
        }, maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var m = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        }, transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex, n = this.params, s = this.previousIndex;
            n.autoHeight && this.updateAutoHeight();
            var a = t;
            if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionStart"), e && i !== s) {
                if ("reset" === a) return void this.emit("slideResetTransitionStart");
                this.emit("slideChangeTransitionStart"), "next" === a ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
            }
        }, transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex, n = this.previousIndex;
            this.animating = !1, this.setTransition(0);
            var s = t;
            if (s || (s = i > n ? "next" : i < n ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== n) {
                if ("reset" === s) return void this.emit("slideResetTransitionEnd");
                this.emit("slideChangeTransitionEnd"), "next" === s ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
            }
        }
    };
    var g = {
        slideTo: function (e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var s = this, a = e;
            a < 0 && (a = 0);
            var r = s.params, o = s.snapGrid, l = s.slidesGrid, h = s.previousIndex, c = s.activeIndex,
                u = s.rtlTranslate;
            if (s.animating && r.preventInteractionOnTransition) return !1;
            var p = Math.floor(a / r.slidesPerGroup);
            p >= o.length && (p = o.length - 1), (c || r.initialSlide || 0) === (h || 0) && i && s.emit("beforeSlideChangeStart");
            var f, m = -o[p];
            if (s.updateProgress(m), r.normalizeSlideIndex) for (var g = 0; g < l.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (a = g);
            if (s.initialized && a !== c) {
                if (!s.allowSlideNext && m < s.translate && m < s.minTranslate()) return !1;
                if (!s.allowSlidePrev && m > s.translate && m > s.maxTranslate() && (c || 0) !== a) return !1
            }
            return f = a > c ? "next" : a < c ? "prev" : "reset", u && -m === s.translate || !u && m === s.translate ? (s.updateActiveIndex(a), r.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== r.effect && s.setTranslate(m), "reset" !== f && (s.transitionStart(i, f), s.transitionEnd(i, f)), !1) : (0 !== t && d.transition ? (s.setTransition(t), s.setTranslate(m), s.updateActiveIndex(a), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, n), s.transitionStart(i, f), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(i, f))
            }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(m), s.updateActiveIndex(a), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, n), s.transitionStart(i, f), s.transitionEnd(i, f)), !0)
        }, slideToLoop: function (e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, i, n)
        }, slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this.params, s = this.animating;
            return n.loop ? !s && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)
        }, slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this.params, s = this.animating, a = this.snapGrid, r = this.slidesGrid, o = this.rtlTranslate;
            if (n.loop) {
                if (s) return !1;
                this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
            }

            function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }

            var d, h = l(o ? this.translate : -this.translate), c = a.map(function (e) {
                return l(e)
            }), u = (r.map(function (e) {
                return l(e)
            }), a[c.indexOf(h)], a[c.indexOf(h) - 1]);
            return void 0 !== u && (d = r.indexOf(u)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i)
        }, slideReset: function (e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
        }, slideToClosest: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this.activeIndex, s = Math.floor(n / this.params.slidesPerGroup);
            if (s < this.snapGrid.length - 1) {
                var a = this.rtlTranslate ? this.translate : -this.translate, r = this.snapGrid[s];
                a - r > (this.snapGrid[s + 1] - r) / 2 && (n = this.params.slidesPerGroup)
            }
            return this.slideTo(n, e, t, i)
        }, slideToClickedSlide: function () {
            var e, t = this, i = t.params, s = t.$wrapperEl,
                a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, r = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? r < t.loopedSlides - a / 2 || r > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(), r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), l.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r) : r > t.slides.length - a ? (t.loopFix(), r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), l.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r)
            } else t.slideTo(r)
        }
    };
    var v = {
        loopCreate: function () {
            var t = this, i = t.params, s = t.$wrapperEl;
            s.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var a = s.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var r = i.slidesPerGroup - a.length % i.slidesPerGroup;
                if (r !== i.slidesPerGroup) {
                    for (var o = 0; o < r; o += 1) {
                        var l = n(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        s.append(l)
                    }
                    a = s.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = a.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > a.length && (t.loopedSlides = a.length);
            var d = [], h = [];
            a.each(function (e, i) {
                var s = n(i);
                e < t.loopedSlides && h.push(i), e < a.length && e >= a.length - t.loopedSlides && d.push(i), s.attr("data-swiper-slide-index", e)
            });
            for (var c = 0; c < h.length; c += 1) s.append(n(h[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var u = d.length - 1; u >= 0; u -= 1) s.prepend(n(d[u].cloneNode(!0)).addClass(i.slideDuplicateClass))
        }, loopFix: function () {
            var e, t = this.params, i = this.activeIndex, n = this.slides, s = this.loopedSlides,
                a = this.allowSlidePrev, r = this.allowSlideNext, o = this.snapGrid, l = this.rtlTranslate;
            this.allowSlidePrev = !0, this.allowSlideNext = !0;
            var d = -o[i] - this.getTranslate();
            i < s ? (e = n.length - 3 * s + i, e += s, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d)) : ("auto" === t.slidesPerView && i >= 2 * s || i >= n.length - s) && (e = -n.length + i + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d));
            this.allowSlidePrev = a, this.allowSlideNext = r
        }, loopDestroy: function () {
            var e = this.$wrapperEl, t = this.params, i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    };
    var b = {
        setGrabCursor: function (e) {
            if (!(d.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        }, unsetGrabCursor: function () {
            d.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var y = {
        appendSlide: function (e) {
            var t = this.$wrapperEl, i = this.params;
            if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var n = 0; n < e.length; n += 1) e[n] && t.append(e[n]); else t.append(e);
            i.loop && this.loopCreate(), i.observer && d.observer || this.update()
        }, prependSlide: function (e) {
            var t = this.params, i = this.$wrapperEl, n = this.activeIndex;
            t.loop && this.loopDestroy();
            var s = n + 1;
            if ("object" == typeof e && "length" in e) {
                for (var a = 0; a < e.length; a += 1) e[a] && i.prepend(e[a]);
                s = n + e.length
            } else i.prepend(e);
            t.loop && this.loopCreate(), t.observer && d.observer || this.update(), this.slideTo(s, 0, !1)
        }, addSlide: function (e, t) {
            var i = this.$wrapperEl, n = this.params, s = this.activeIndex;
            n.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + n.slideClass));
            var a = this.slides.length;
            if (e <= 0) this.prependSlide(t); else if (e >= a) this.appendSlide(t); else {
                for (var r = s > e ? s + 1 : s, o = [], l = a - 1; l >= e; l -= 1) {
                    var h = this.slides.eq(l);
                    h.remove(), o.unshift(h)
                }
                if ("object" == typeof t && "length" in t) {
                    for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                    r = s > e ? s + t.length : s
                } else i.append(t);
                for (var u = 0; u < o.length; u += 1) i.append(o[u]);
                n.loop && this.loopCreate(), n.observer && d.observer || this.update(), n.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
            }
        }, removeSlide: function (e) {
            var t = this.params, i = this.$wrapperEl, n = this.activeIndex;
            t.loop && (n -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
            var s, a = n;
            if ("object" == typeof e && "length" in e) {
                for (var r = 0; r < e.length; r += 1) s = e[r], this.slides[s] && this.slides.eq(s).remove(), s < a && (a -= 1);
                a = Math.max(a, 0)
            } else s = e, this.slides[s] && this.slides.eq(s).remove(), s < a && (a -= 1), a = Math.max(a, 0);
            t.loop && this.loopCreate(), t.observer && d.observer || this.update(), t.loop ? this.slideTo(a + this.loopedSlides, 0, !1) : this.slideTo(a, 0, !1)
        }, removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e)
        }
    }, w = function () {
        var i = t.navigator.userAgent, n = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                windows: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                cordova: t.cordova || t.phonegap,
                phonegap: t.cordova || t.phonegap
            }, s = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), a = i.match(/(Android);?[\s\/]+([\d.]+)?/),
            r = i.match(/(iPad).*OS\s([\d_]+)/), o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            l = !r && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (s && (n.os = "windows", n.osVersion = s[2], n.windows = !0), a && !s && (n.os = "android", n.osVersion = a[2], n.android = !0, n.androidChrome = i.toLowerCase().indexOf("chrome") >= 0), (r || l || o) && (n.os = "ios", n.ios = !0), l && !o && (n.osVersion = l[2].replace(/_/g, "."), n.iphone = !0), r && (n.osVersion = r[2].replace(/_/g, "."), n.ipad = !0), o && (n.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, n.iphone = !0), n.ios && n.osVersion && i.indexOf("Version/") >= 0 && "10" === n.osVersion.split(".")[0] && (n.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]), n.desktop = !(n.os || n.android || n.webView), n.webView = (l || r || o) && i.match(/.*AppleWebKit(?!.*Safari)/i), n.os && "ios" === n.os) {
            var d = n.osVersion.split("."), h = e.querySelector('meta[name="viewport"]');
            n.minimalUi = !n.webView && (o || l) && (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) && h && h.getAttribute("content").indexOf("minimal-ui") >= 0
        }
        return n.pixelRatio = t.devicePixelRatio || 1, n
    }();

    function x() {
        var e = this.params, t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext, n = this.allowSlidePrev, s = this.snapGrid;
            if (this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), e.freeMode) {
                var a = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
                this.setTranslate(a), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight()
            } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
            this.allowSlidePrev = n, this.allowSlideNext = i, this.params.watchOverflow && s !== this.snapGrid && this.checkOverflow()
        }
    }

    var E = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsInverse: !1,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        }, S = {
            update: p, translate: f, transition: m, slide: g, loop: v, grabCursor: b, manipulation: y, events: {
                attachEvents: function () {
                    var i = this.params, s = this.touchEvents, a = this.el, r = this.wrapperEl;
                    this.onTouchStart = function (i) {
                        var s = this.touchEventsData, a = this.params, r = this.touches;
                        if (!this.animating || !a.preventInteractionOnTransition) {
                            var o = i;
                            if (o.originalEvent && (o = o.originalEvent), s.isTouchEvent = "touchstart" === o.type, (s.isTouchEvent || !("which" in o) || 3 !== o.which) && !(!s.isTouchEvent && "button" in o && o.button > 0 || s.isTouched && s.isMoved)) if (a.noSwiping && n(o.target).closest(a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass)[0]) this.allowClick = !0; else if (!a.swipeHandler || n(o).closest(a.swipeHandler)[0]) {
                                r.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, r.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
                                var d = r.currentX, h = r.currentY, c = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                                    u = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                                if (!c || !(d <= u || d >= t.screen.width - u)) {
                                    if (l.extend(s, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0
                                    }), r.startX = d, r.startY = h, s.touchStartTime = l.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, a.threshold > 0 && (s.allowThresholdMove = !1), "touchstart" !== o.type) {
                                        var p = !0;
                                        n(o.target).is(s.formElements) && (p = !1), e.activeElement && n(e.activeElement).is(s.formElements) && e.activeElement !== o.target && e.activeElement.blur();
                                        var f = p && this.allowTouchMove && a.touchStartPreventDefault;
                                        (a.touchStartForcePreventDefault || f) && o.preventDefault()
                                    }
                                    this.emit("touchStart", o)
                                }
                            }
                        }
                    }.bind(this), this.onTouchMove = function (t) {
                        var i = this.touchEventsData, s = this.params, a = this.touches, r = this.rtlTranslate, o = t;
                        if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
                            if (!i.isTouchEvent || "mousemove" !== o.type) {
                                var d = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                                    h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
                                if (o.preventedByNestedSwiper) return a.startX = d, void (a.startY = h);
                                if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (l.extend(a, {
                                    startX: d,
                                    startY: h,
                                    currentX: d,
                                    currentY: h
                                }), i.touchStartTime = l.now()));
                                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop) if (this.isVertical()) {
                                    if (h < a.startY && this.translate <= this.maxTranslate() || h > a.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
                                } else if (d < a.startX && this.translate <= this.maxTranslate() || d > a.startX && this.translate >= this.minTranslate()) return;
                                if (i.isTouchEvent && e.activeElement && o.target === e.activeElement && n(o.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);
                                if (i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                                    a.currentX = d, a.currentY = h;
                                    var c, u = a.currentX - a.startX, p = a.currentY - a.startY;
                                    if (!(this.params.threshold && Math.sqrt(Math.pow(u, 2) + Math.pow(p, 2)) < this.params.threshold)) if (void 0 === i.isScrolling && (this.isHorizontal() && a.currentY === a.startY || this.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : u * u + p * p >= 25 && (c = 180 * Math.atan2(Math.abs(p), Math.abs(u)) / Math.PI, i.isScrolling = this.isHorizontal() ? c > s.touchAngle : 90 - c > s.touchAngle)), i.isScrolling && this.emit("touchMoveOpposite", o), void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                                        this.allowClick = !1, o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), i.isMoved || (s.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), i.isMoved = !0;
                                        var f = this.isHorizontal() ? u : p;
                                        a.diff = f, f *= s.touchRatio, r && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
                                        var m = !0, g = s.resistanceRatio;
                                        if (s.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1, s.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1, s.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))), m && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.threshold > 0) {
                                            if (!(Math.abs(f) > s.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                                            if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, i.currentTranslate = i.startTranslate, void (a.diff = this.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                                        }
                                        s.followFinger && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                            position: a[this.isHorizontal() ? "startX" : "startY"],
                                            time: i.touchStartTime
                                        }), i.velocities.push({
                                            position: a[this.isHorizontal() ? "currentX" : "currentY"],
                                            time: l.now()
                                        })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                                    }
                                }
                            }
                        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o)
                    }.bind(this), this.onTouchEnd = function (e) {
                        var t = this, i = t.touchEventsData, n = t.params, s = t.touches, a = t.rtlTranslate,
                            r = t.$wrapperEl, o = t.slidesGrid, d = t.snapGrid, h = e;
                        if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
                        n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var c, u = l.now(), p = u - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap", h), p < 300 && u - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = l.nextTick(function () {
                            t && !t.destroyed && t.emit("click", h)
                        }, 300)), p < 300 && u - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", h))), i.lastClickTime = l.now(), l.nextTick(function () {
                            t.destroyed || (t.allowClick = !0)
                        }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === s.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
                        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, c = n.followFinger ? a ? t.translate : -t.translate : -i.currentTranslate, n.freeMode) {
                            if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                            if (c > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                            if (n.freeModeMomentum) {
                                if (i.velocities.length > 1) {
                                    var f = i.velocities.pop(), m = i.velocities.pop(), g = f.position - m.position,
                                        v = f.time - m.time;
                                    t.velocity = g / v, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), (v > 150 || l.now() - f.time > 300) && (t.velocity = 0)
                                } else t.velocity = 0;
                                t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                var b = 1e3 * n.freeModeMomentumRatio, y = t.velocity * b, w = t.translate + y;
                                a && (w = -w);
                                var x, E, S = !1, C = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                                if (w < t.maxTranslate()) n.freeModeMomentumBounce ? (w + t.maxTranslate() < -C && (w = t.maxTranslate() - C), x = t.maxTranslate(), S = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), n.loop && n.centeredSlides && (E = !0); else if (w > t.minTranslate()) n.freeModeMomentumBounce ? (w - t.minTranslate() > C && (w = t.minTranslate() + C), x = t.minTranslate(), S = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), n.loop && n.centeredSlides && (E = !0); else if (n.freeModeSticky) {
                                    for (var T, k = 0; k < d.length; k += 1) if (d[k] > -w) {
                                        T = k;
                                        break
                                    }
                                    w = -(w = Math.abs(d[T] - w) < Math.abs(d[T - 1] - w) || "next" === t.swipeDirection ? d[T] : d[T - 1])
                                }
                                if (E && t.once("transitionEnd", function () {
                                    t.loopFix()
                                }), 0 !== t.velocity) b = a ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity); else if (n.freeModeSticky) return void t.slideToClosest();
                                n.freeModeMomentumBounce && S ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, r.transitionEnd(function () {
                                    t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), t.setTranslate(x), r.transitionEnd(function () {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))
                                })) : t.velocity ? (t.updateProgress(w), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, r.transitionEnd(function () {
                                    t && !t.destroyed && t.transitionEnd()
                                }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                            } else if (n.freeModeSticky) return void t.slideToClosest();
                            (!n.freeModeMomentum || p >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                        } else {
                            for (var I = 0, _ = t.slidesSizesGrid[0], M = 0; M < o.length; M += n.slidesPerGroup) void 0 !== o[M + n.slidesPerGroup] ? c >= o[M] && c < o[M + n.slidesPerGroup] && (I = M, _ = o[M + n.slidesPerGroup] - o[M]) : c >= o[M] && (I = M, _ = o[o.length - 1] - o[o.length - 2]);
                            var P = (c - o[I]) / _;
                            if (p > n.longSwipesMs) {
                                if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && (P >= n.longSwipesRatio ? t.slideTo(I + n.slidesPerGroup) : t.slideTo(I)), "prev" === t.swipeDirection && (P > 1 - n.longSwipesRatio ? t.slideTo(I + n.slidesPerGroup) : t.slideTo(I))
                            } else {
                                if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && t.slideTo(I + n.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(I)
                            }
                        }
                    }.bind(this), this.onClick = function (e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }.bind(this);
                    var o = "container" === i.touchEventsTarget ? a : r, h = !!i.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            var c = !("touchstart" !== s.start || !d.passiveListener || !i.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            o.addEventListener(s.start, this.onTouchStart, c), o.addEventListener(s.move, this.onTouchMove, d.passiveListener ? {
                                passive: !1,
                                capture: h
                            } : h), o.addEventListener(s.end, this.onTouchEnd, c)
                        }
                        (i.simulateTouch && !w.ios && !w.android || i.simulateTouch && !d.touch && w.ios) && (o.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, h), e.addEventListener("mouseup", this.onTouchEnd, !1))
                    } else o.addEventListener(s.start, this.onTouchStart, !1), e.addEventListener(s.move, this.onTouchMove, h), e.addEventListener(s.end, this.onTouchEnd, !1);
                    (i.preventClicks || i.preventClicksPropagation) && o.addEventListener("click", this.onClick, !0), this.on(w.ios || w.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x, !0)
                }, detachEvents: function () {
                    var t = this.params, i = this.touchEvents, n = this.el, s = this.wrapperEl,
                        a = "container" === t.touchEventsTarget ? n : s, r = !!t.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            var o = !("onTouchStart" !== i.start || !d.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            a.removeEventListener(i.start, this.onTouchStart, o), a.removeEventListener(i.move, this.onTouchMove, r), a.removeEventListener(i.end, this.onTouchEnd, o)
                        }
                        (t.simulateTouch && !w.ios && !w.android || t.simulateTouch && !d.touch && w.ios) && (a.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1))
                    } else a.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && a.removeEventListener("click", this.onClick, !0), this.off(w.ios || w.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x)
                }
            }, breakpoints: {
                setBreakpoint: function () {
                    var e = this.activeIndex, t = this.initialized, i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var n = this.params, s = n.breakpoints;
                    if (s && (!s || 0 !== Object.keys(s).length)) {
                        var a = this.getBreakpoint(s);
                        if (a && this.currentBreakpoint !== a) {
                            var r = a in s ? s[a] : void 0;
                            r && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function (e) {
                                var t = r[e];
                                void 0 !== t && (r[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var o = r || this.originalParams, d = o.direction && o.direction !== n.direction,
                                h = n.loop && (o.slidesPerView !== n.slidesPerView || d);
                            d && t && this.changeDirection(), l.extend(this.params, o), l.extend(this, {
                                allowTouchMove: this.params.allowTouchMove,
                                allowSlideNext: this.params.allowSlideNext,
                                allowSlidePrev: this.params.allowSlidePrev
                            }), this.currentBreakpoint = a, h && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", o)
                        }
                    }
                }, getBreakpoint: function (e) {
                    if (e) {
                        var i = !1, n = [];
                        Object.keys(e).forEach(function (e) {
                            n.push(e)
                        }), n.sort(function (e, t) {
                            return parseInt(e, 10) - parseInt(t, 10)
                        });
                        for (var s = 0; s < n.length; s += 1) {
                            var a = n[s];
                            this.params.breakpointsInverse ? a <= t.innerWidth && (i = a) : a >= t.innerWidth && !i && (i = a)
                        }
                        return i || "max"
                    }
                }
            }, checkOverflow: {
                checkOverflow: function () {
                    var e = this.isLocked;
                    this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, e !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), e && e !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            }, classes: {
                addClasses: function () {
                    var e = this.classNames, t = this.params, i = this.rtl, n = this.$el, s = [];
                    s.push("initialized"), s.push(t.direction), t.freeMode && s.push("free-mode"), d.flexbox || s.push("no-flexbox"), t.autoHeight && s.push("autoheight"), i && s.push("rtl"), t.slidesPerColumn > 1 && s.push("multirow"), w.android && s.push("android"), w.ios && s.push("ios"), (h.isIE || h.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && s.push("wp8-" + t.direction), s.forEach(function (i) {
                        e.push(t.containerModifierClass + i)
                    }), n.addClass(e.join(" "))
                }, removeClasses: function () {
                    var e = this.$el, t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            }, images: {
                loadImage: function (e, i, n, s, a, r) {
                    var o;

                    function l() {
                        r && r()
                    }

                    e.complete && a ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, s && (o.sizes = s), n && (o.srcset = n), i && (o.src = i)) : l()
                }, preloadImages: function () {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }

                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var n = e.imagesToLoad[i];
                        e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }, C = {}, T = function (e) {
            function t() {
                for (var i, s, a, r = [], o = arguments.length; o--;) r[o] = arguments[o];
                1 === r.length && r[0].constructor && r[0].constructor === Object ? a = r[0] : (s = (i = r)[0], a = i[1]), a || (a = {}), a = l.extend({}, a), s && !a.el && (a.el = s), e.call(this, a), Object.keys(S).forEach(function (e) {
                    Object.keys(S[e]).forEach(function (i) {
                        t.prototype[i] || (t.prototype[i] = S[e][i])
                    })
                });
                var h = this;
                void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach(function (e) {
                    var t = h.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0], n = t.params[i];
                        if ("object" != typeof n || null === n) return;
                        if (!(i in a && "enabled" in n)) return;
                        !0 === a[i] && (a[i] = {enabled: !0}), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {enabled: !1})
                    }
                });
                var c = l.extend({}, E);
                h.useModulesParams(c), h.params = l.extend({}, c, C, a), h.originalParams = l.extend({}, h.params), h.passedParams = l.extend({}, a), h.$ = n;
                var u = n(h.params.el);
                if (s = u[0]) {
                    if (u.length > 1) {
                        var p = [];
                        return u.each(function (e, i) {
                            var n = l.extend({}, a, {el: i});
                            p.push(new t(n))
                        }), p
                    }
                    s.swiper = h, u.data("swiper", h);
                    var f, m, g = u.children("." + h.params.wrapperClass);
                    return l.extend(h, {
                        $el: u,
                        el: s,
                        $wrapperEl: g,
                        wrapperEl: g[0],
                        classNames: [],
                        slides: n(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === h.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === h.params.direction
                        },
                        rtl: "rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction"),
                        rtlTranslate: "horizontal" === h.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction")),
                        wrongRTL: "-webkit-box" === g.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: h.params.allowSlideNext,
                        allowSlidePrev: h.params.allowSlidePrev,
                        touchEvents: (f = ["touchstart", "touchmove", "touchend"], m = ["mousedown", "mousemove", "mouseup"], d.pointerEvents ? m = ["pointerdown", "pointermove", "pointerup"] : d.prefixedPointerEvents && (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), h.touchEventsTouch = {
                            start: f[0],
                            move: f[1],
                            end: f[2]
                        }, h.touchEventsDesktop = {
                            start: m[0],
                            move: m[1],
                            end: m[2]
                        }, d.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: l.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: h.params.allowTouchMove,
                        touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), h.useModules(), h.params.init && h.init(), h
                }
            }

            e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
            var i = {
                extendedDefaults: {configurable: !0},
                defaults: {configurable: !0},
                Class: {configurable: !0},
                $: {configurable: !0}
            };
            return t.prototype.slidesPerViewDynamic = function () {
                var e = this.params, t = this.slides, i = this.slidesGrid, n = this.size, s = this.activeIndex, a = 1;
                if (e.centeredSlides) {
                    for (var r, o = t[s].swiperSlideSize, l = s + 1; l < t.length; l += 1) t[l] && !r && (a += 1, (o += t[l].swiperSlideSize) > n && (r = !0));
                    for (var d = s - 1; d >= 0; d -= 1) t[d] && !r && (a += 1, (o += t[d].swiperSlideSize) > n && (r = !0))
                } else for (var h = s + 1; h < t.length; h += 1) i[h] - i[s] < n && (a += 1);
                return a
            }, t.prototype.update = function () {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid, i = e.params;
                    i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (n(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || n(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function n() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.changeDirection = function (e, t) {
                void 0 === t && (t = !0);
                var i = this.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e ? this : ("vertical" === i && (this.$el.removeClass(this.params.containerModifierClass + "vertical wp8-vertical").addClass("" + this.params.containerModifierClass + e), (h.isIE || h.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && this.$el.addClass(this.params.containerModifierClass + "wp8-" + e)), "horizontal" === i && (this.$el.removeClass(this.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + this.params.containerModifierClass + e), (h.isIE || h.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && this.$el.addClass(this.params.containerModifierClass + "wp8-" + e)), this.params.direction = e, this.slides.each(function (t, i) {
                    "vertical" === e ? i.style.width = "" : i.style.height = ""
                }), this.emit("changeDirection"), t && this.update(), this)
            }, t.prototype.init = function () {
                this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
            }, t.prototype.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this, n = i.params, s = i.$el, a = i.$wrapperEl, r = i.slides;
                return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), s.removeAttr("style"), a.removeAttr("style"), r && r.length && r.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (e) {
                    i.off(e)
                }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), l.deleteProps(i)), i.destroyed = !0, null)
            }, t.extendDefaults = function (e) {
                l.extend(C, e)
            }, i.extendedDefaults.get = function () {
                return C
            }, i.defaults.get = function () {
                return E
            }, i.Class.get = function () {
                return e
            }, i.$.get = function () {
                return n
            }, Object.defineProperties(t, i), t
        }(c), k = {name: "device", proto: {device: w}, static: {device: w}},
        I = {name: "support", proto: {support: d}, static: {support: d}},
        _ = {name: "browser", proto: {browser: h}, static: {browser: h}}, M = {
            name: "resize", create: function () {
                var e = this;
                l.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        }, orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            }, on: {
                init: function () {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                }, destroy: function () {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, P = {
            func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, i) {
                void 0 === i && (i = {});
                var n = this, s = new (0, P.func)(function (e) {
                    if (1 !== e.length) {
                        var i = function () {
                            n.emit("observerUpdate", e[0])
                        };
                        t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                    } else n.emit("observerUpdate", e[0])
                });
                s.observe(e, {
                    attributes: void 0 === i.attributes || i.attributes,
                    childList: void 0 === i.childList || i.childList,
                    characterData: void 0 === i.characterData || i.characterData
                }), n.observer.observers.push(s)
            }, init: function () {
                if (d.observer && this.params.observer) {
                    if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {childList: this.params.observeSlideChildren}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
                }
            }, destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        }, A = {
            name: "observer",
            params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
            create: function () {
                l.extend(this, {
                    observer: {
                        init: P.init.bind(this),
                        attach: P.attach.bind(this),
                        destroy: P.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                }, destroy: function () {
                    this.observer.destroy()
                }
            }
        }, D = {
            update: function (e) {
                var t = this, i = t.params, n = i.slidesPerView, s = i.slidesPerGroup, a = i.centeredSlides,
                    r = t.params.virtual, o = r.addSlidesBefore, d = r.addSlidesAfter, h = t.virtual, c = h.from, u = h.to,
                    p = h.slides, f = h.slidesGrid, m = h.renderSlide, g = h.offset;
                t.updateActiveIndex();
                var v, b, y, w = t.activeIndex || 0;
                v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", a ? (b = Math.floor(n / 2) + s + o, y = Math.floor(n / 2) + s + d) : (b = n + (s - 1) + o, y = s + d);
                var x = Math.max((w || 0) - y, 0), E = Math.min((w || 0) + b, p.length - 1),
                    S = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

                function C() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }

                if (l.extend(t.virtual, {
                    from: x,
                    to: E,
                    offset: S,
                    slidesGrid: t.slidesGrid
                }), c === x && u === E && !e) return t.slidesGrid !== f && S !== g && t.slides.css(v, S + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: S,
                    from: x,
                    to: E,
                    slides: function () {
                        for (var e = [], t = x; t <= E; t += 1) e.push(p[t]);
                        return e
                    }()
                }), void C();
                var T = [], k = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var I = c; I <= u; I += 1) (I < x || I > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + I + '"]').remove();
                for (var _ = 0; _ < p.length; _ += 1) _ >= x && _ <= E && (void 0 === u || e ? k.push(_) : (_ > u && k.push(_), _ < c && T.push(_)));
                k.forEach(function (e) {
                    t.$wrapperEl.append(m(p[e], e))
                }), T.sort(function (e, t) {
                    return t - e
                }).forEach(function (e) {
                    t.$wrapperEl.prepend(m(p[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(v, S + "px"), C()
            }, renderSlide: function (e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var s = i.renderSlide ? n(i.renderSlide.call(this, e, t)) : n('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = s), s
            }, appendSlide: function (e) {
                if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
                this.virtual.update(!0)
            }, prependSlide: function (e) {
                var t = this.activeIndex, i = t + 1, n = 1;
                if (Array.isArray(e)) {
                    for (var s = 0; s < e.length; s += 1) e[s] && this.virtual.slides.unshift(e[s]);
                    i = t + e.length, n = e.length
                } else this.virtual.slides.unshift(e);
                if (this.params.virtual.cache) {
                    var a = this.virtual.cache, r = {};
                    Object.keys(a).forEach(function (e) {
                        r[parseInt(e, 10) + n] = a[e]
                    }), this.virtual.cache = r
                }
                this.virtual.update(!0), this.slideTo(i, 0)
            }, removeSlide: function (e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0); else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                    this.virtual.update(!0), this.slideTo(t, 0)
                }
            }, removeAllSlides: function () {
                this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
            }
        }, O = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                l.extend(this, {
                    virtual: {
                        update: D.update.bind(this),
                        appendSlide: D.appendSlide.bind(this),
                        prependSlide: D.prependSlide.bind(this),
                        removeSlide: D.removeSlide.bind(this),
                        removeAllSlides: D.removeAllSlides.bind(this),
                        renderSlide: D.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = {watchSlidesProgress: !0};
                        l.extend(this.params, e), l.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
                    }
                }, setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, L = {
            handle: function (i) {
                var n = this.rtlTranslate, s = i;
                s.originalEvent && (s = s.originalEvent);
                var a = s.keyCode || s.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === a || this.isVertical() && 40 === a)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === a || this.isVertical() && 38 === a)) return !1;
                if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (37 === a || 39 === a || 38 === a || 40 === a)) {
                        var r = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = t.innerWidth, l = t.innerHeight, d = this.$el.offset();
                        n && (d.left -= this.$el[0].scrollLeft);
                        for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], c = 0; c < h.length; c += 1) {
                            var u = h[c];
                            u[0] >= 0 && u[0] <= o && u[1] >= 0 && u[1] <= l && (r = !0)
                        }
                        if (!r) return
                    }
                    this.isHorizontal() ? (37 !== a && 39 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (39 === a && !n || 37 === a && n) && this.slideNext(), (37 === a && !n || 39 === a && n) && this.slidePrev()) : (38 !== a && 40 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 40 === a && this.slideNext(), 38 === a && this.slidePrev()), this.emit("keyPress", a)
                }
            }, enable: function () {
                this.keyboard.enabled || (n(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            }, disable: function () {
                this.keyboard.enabled && (n(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }, N = {
            name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
                l.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: L.enable.bind(this),
                        disable: L.disable.bind(this),
                        handle: L.handle.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                }, destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var z = {
        lastScrollTime: l.now(), event: t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
            var t = "onwheel" in e;
            if (!t) {
                var i = e.createElement("div");
                i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
            }
            return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
        }() ? "wheel" : "mousewheel", normalize: function (e) {
            var t = 0, i = 0, n = 0, s = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, s = 10 * i, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || s) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, s *= 40) : (n *= 800, s *= 800)), n && !t && (t = n < 1 ? -1 : 1), s && !i && (i = s < 1 ? -1 : 1), {
                spinX: t,
                spinY: i,
                pixelX: n,
                pixelY: s
            }
        }, handleMouseEnter: function () {
            this.mouseEntered = !0
        }, handleMouseLeave: function () {
            this.mouseEntered = !1
        }, handle: function (e) {
            var i = e, n = this, s = n.params.mousewheel;
            if (!n.mouseEntered && !s.releaseOnEdges) return !0;
            i.originalEvent && (i = i.originalEvent);
            var a = 0, r = n.rtlTranslate ? -1 : 1, o = z.normalize(i);
            if (s.forceToAxis) if (n.isHorizontal()) {
                if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                a = o.pixelX * r
            } else {
                if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                a = o.pixelY
            } else a = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * r : -o.pixelY;
            if (0 === a) return !0;
            if (s.invert && (a = -a), n.params.freeMode) {
                n.params.loop && n.loopFix();
                var d = n.getTranslate() + a * s.sensitivity, h = n.isBeginning, c = n.isEnd;
                if (d >= n.minTranslate() && (d = n.minTranslate()), d <= n.maxTranslate() && (d = n.maxTranslate()), n.setTransition(0), n.setTranslate(d), n.updateProgress(), n.updateActiveIndex(), n.updateSlidesClasses(), (!h && n.isBeginning || !c && n.isEnd) && n.updateSlidesClasses(), n.params.freeModeSticky && (clearTimeout(n.mousewheel.timeout), n.mousewheel.timeout = l.nextTick(function () {
                    n.slideToClosest()
                }, 300)), n.emit("scroll", i), n.params.autoplay && n.params.autoplayDisableOnInteraction && n.autoplay.stop(), d === n.minTranslate() || d === n.maxTranslate()) return !0
            } else {
                if (l.now() - n.mousewheel.lastScrollTime > 60) if (a < 0) if (n.isEnd && !n.params.loop || n.animating) {
                    if (s.releaseOnEdges) return !0
                } else n.slideNext(), n.emit("scroll", i); else if (n.isBeginning && !n.params.loop || n.animating) {
                    if (s.releaseOnEdges) return !0
                } else n.slidePrev(), n.emit("scroll", i);
                n.mousewheel.lastScrollTime = (new t.Date).getTime()
            }
            return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
        }, enable: function () {
            if (!z.event) return !1;
            if (this.mousewheel.enabled) return !1;
            var e = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (e = n(this.params.mousewheel.eventsTarged)), e.on("mouseenter", this.mousewheel.handleMouseEnter), e.on("mouseleave", this.mousewheel.handleMouseLeave), e.on(z.event, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
        }, disable: function () {
            if (!z.event) return !1;
            if (!this.mousewheel.enabled) return !1;
            var e = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (e = n(this.params.mousewheel.eventsTarged)), e.off(z.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
        }
    }, $ = {
        update: function () {
            var e = this.params.navigation;
            if (!this.params.loop) {
                var t = this.navigation, i = t.$nextEl, n = t.$prevEl;
                n && n.length > 0 && (this.isBeginning ? n.addClass(e.disabledClass) : n.removeClass(e.disabledClass), n[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
            }
        }, onPrevClick: function (e) {
            e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
        }, onNextClick: function (e) {
            e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
        }, init: function () {
            var e, t, i = this.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = n(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = n(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), l.extend(this.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        }, destroy: function () {
            var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
            t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
        }
    }, B = {
        update: function () {
            var e = this.rtl, t = this.params.pagination;
            if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var i,
                    s = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                    a = this.pagination.$el,
                    r = this.params.loop ? Math.ceil((s - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > s - 1 - 2 * this.loopedSlides && (i -= s - 2 * this.loopedSlides), i > r - 1 && (i -= r), i < 0 && "bullets" !== this.params.paginationType && (i = r + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                    var o, l, d, h = this.pagination.bullets;
                    if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), a.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), a.length > 1) h.each(function (e, s) {
                        var a = n(s), r = a.index();
                        r === i && a.addClass(t.bulletActiveClass), t.dynamicBullets && (r >= o && r <= l && a.addClass(t.bulletActiveClass + "-main"), r === o && a.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), r === l && a.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                    }); else if (h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets) {
                        for (var c = h.eq(o), u = h.eq(l), p = o; p <= l; p += 1) h.eq(p).addClass(t.bulletActiveClass + "-main");
                        c.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), u.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                    }
                    if (t.dynamicBullets) {
                        var f = Math.min(h.length, t.dynamicMainBullets + 4),
                            m = (this.pagination.bulletSize * f - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                            g = e ? "right" : "left";
                        h.css(this.isHorizontal() ? g : "top", m + "px")
                    }
                }
                if ("fraction" === t.type && (a.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), a.find("." + t.totalClass).text(t.formatFractionTotal(r))), "progressbar" === t.type) {
                    var v;
                    v = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                    var b = (i + 1) / r, y = 1, w = 1;
                    "horizontal" === v ? y = b : w = b, a.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + y + ") scaleY(" + w + ")").transition(this.params.speed)
                }
                "custom" === t.type && t.renderCustom ? (a.html(t.renderCustom(this, i + 1, r)), this.emit("paginationRender", this, a[0])) : this.emit("paginationUpdate", this, a[0]), a[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
            }
        }, render: function () {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                    i = this.pagination.$el, n = "";
                if ("bullets" === e.type) {
                    for (var s = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, a = 0; a < s; a += 1) e.renderBullet ? n += e.renderBullet.call(this, a, e.bulletClass) : n += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                    i.html(n), this.pagination.bullets = i.find("." + e.bulletClass)
                }
                "fraction" === e.type && (n = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(n)), "progressbar" === e.type && (n = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(n)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
            }
        }, init: function () {
            var e = this, t = e.params.pagination;
            if (t.el) {
                var i = n(t.el);
                0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, function (t) {
                    t.preventDefault();
                    var i = n(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                }), l.extend(e.pagination, {$el: i, el: i[0]}))
            }
        }, destroy: function () {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.pagination.$el;
                t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
            }
        }
    }, H = {
        setTranslate: function () {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar, t = this.rtlTranslate, i = this.progress, n = e.dragSize, s = e.trackSize,
                    a = e.$dragEl, r = e.$el, o = this.params.scrollbar, l = n, h = (s - n) * i;
                t ? (h = -h) > 0 ? (l = n - h, h = 0) : -h + n > s && (l = s + h) : h < 0 ? (l = n + h, h = 0) : h + n > s && (l = s - h), this.isHorizontal() ? (d.transforms3d ? a.transform("translate3d(" + h + "px, 0, 0)") : a.transform("translateX(" + h + "px)"), a[0].style.width = l + "px") : (d.transforms3d ? a.transform("translate3d(0px, " + h + "px, 0)") : a.transform("translateY(" + h + "px)"), a[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), r[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
                    r[0].style.opacity = 0, r.transition(400)
                }, 1e3))
            }
        }, setTransition: function (e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        }, updateSize: function () {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar, t = e.$dragEl, i = e.$el;
                t[0].style.width = "", t[0].style.height = "";
                var n, s = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, a = this.size / this.virtualSize,
                    r = a * (s / this.size);
                n = "auto" === this.params.scrollbar.dragSize ? s * a : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = n + "px" : t[0].style.height = n + "px", i[0].style.display = a >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), l.extend(e, {
                    trackSize: s,
                    divider: a,
                    moveDivider: r,
                    dragSize: n
                }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
            }
        }, setDragPosition: function (e) {
            var t, i = this.scrollbar, n = this.rtlTranslate, s = i.$el, a = i.dragSize, r = i.trackSize;
            t = ((this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - s.offset()[this.isHorizontal() ? "left" : "top"] - a / 2) / (r - a), t = Math.max(Math.min(t, 1), 0), n && (t = 1 - t);
            var o = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
            this.updateProgress(o), this.setTranslate(o), this.updateActiveIndex(), this.updateSlidesClasses()
        }, onDragStart: function (e) {
            var t = this.params.scrollbar, i = this.scrollbar, n = this.$wrapperEl, s = i.$el, a = i.$dragEl;
            this.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), n.transition(100), a.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), s.transition(0), t.hide && s.css("opacity", 1), this.emit("scrollbarDragStart", e)
        }, onDragMove: function (e) {
            var t = this.scrollbar, i = this.$wrapperEl, n = t.$el, s = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
        }, onDragEnd: function (e) {
            var t = this.params.scrollbar, i = this.scrollbar.$el;
            this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = l.nextTick(function () {
                i.css("opacity", 0), i.transition(400)
            }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
        }, enableDraggable: function () {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar, i = this.touchEventsTouch, n = this.touchEventsDesktop, s = this.params,
                    a = t.$el[0], r = !(!d.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                    o = !(!d.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                d.touch ? (a.addEventListener(i.start, this.scrollbar.onDragStart, r), a.addEventListener(i.move, this.scrollbar.onDragMove, r), a.addEventListener(i.end, this.scrollbar.onDragEnd, o)) : (a.addEventListener(n.start, this.scrollbar.onDragStart, r), e.addEventListener(n.move, this.scrollbar.onDragMove, r), e.addEventListener(n.end, this.scrollbar.onDragEnd, o))
            }
        }, disableDraggable: function () {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar, i = this.touchEventsTouch, n = this.touchEventsDesktop, s = this.params,
                    a = t.$el[0], r = !(!d.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                    o = !(!d.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                d.touch ? (a.removeEventListener(i.start, this.scrollbar.onDragStart, r), a.removeEventListener(i.move, this.scrollbar.onDragMove, r), a.removeEventListener(i.end, this.scrollbar.onDragEnd, o)) : (a.removeEventListener(n.start, this.scrollbar.onDragStart, r), e.removeEventListener(n.move, this.scrollbar.onDragMove, r), e.removeEventListener(n.end, this.scrollbar.onDragEnd, o))
            }
        }, init: function () {
            if (this.params.scrollbar.el) {
                var e = this.scrollbar, t = this.$el, i = this.params.scrollbar, s = n(i.el);
                this.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === t.find(i.el).length && (s = t.find(i.el));
                var a = s.find("." + this.params.scrollbar.dragClass);
                0 === a.length && (a = n('<div class="' + this.params.scrollbar.dragClass + '"></div>'), s.append(a)), l.extend(e, {
                    $el: s,
                    el: s[0],
                    $dragEl: a,
                    dragEl: a[0]
                }), i.draggable && e.enableDraggable()
            }
        }, destroy: function () {
            this.scrollbar.disableDraggable()
        }
    }, V = {
        setTransform: function (e, t) {
            var i = this.rtl, s = n(e), a = i ? -1 : 1, r = s.attr("data-swiper-parallax") || "0",
                o = s.attr("data-swiper-parallax-x"), l = s.attr("data-swiper-parallax-y"),
                d = s.attr("data-swiper-parallax-scale"), h = s.attr("data-swiper-parallax-opacity");
            if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = r, l = "0") : (l = r, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * a + "%" : o * t * a + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
                var c = h - (h - 1) * (1 - Math.abs(t));
                s[0].style.opacity = c
            }
            if (null == d) s.transform("translate3d(" + o + ", " + l + ", 0px)"); else {
                var u = d - (d - 1) * (1 - Math.abs(t));
                s.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + u + ")")
            }
        }, setTranslate: function () {
            var e = this, t = e.$el, i = e.slides, s = e.progress, a = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                e.parallax.setTransform(i, s)
            }), i.each(function (t, i) {
                var r = i.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(t / 2) - s * (a.length - 1)), r = Math.min(Math.max(r, -1), 1), n(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                    e.parallax.setTransform(i, r)
                })
            })
        }, setTransition: function (e) {
            void 0 === e && (e = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                var s = n(i), a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (a = 0), s.transition(a)
            })
        }
    }, j = {
        getDistanceBetweenTouches: function (e) {
            if (e.targetTouches.length < 2) return 1;
            var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX,
                s = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(n - t, 2) + Math.pow(s - i, 2))
        }, onGestureStart: function (e) {
            var t = this.params.zoom, i = this.zoom, s = i.gesture;
            if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !d.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureTouched = !0, s.scaleStart = j.getDistanceBetweenTouches(e)
            }
            s.$slideEl && s.$slideEl.length || (s.$slideEl = n(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = this.slides.eq(this.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + t.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), this.zoom.isScaling = !0) : s.$imageEl = void 0
        }, onGestureChange: function (e) {
            var t = this.params.zoom, i = this.zoom, n = i.gesture;
            if (!d.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureMoved = !0, n.scaleMove = j.getDistanceBetweenTouches(e)
            }
            n.$imageEl && 0 !== n.$imageEl.length && (d.gestures ? i.scale = e.scale * i.currentScale : i.scale = n.scaleMove / n.scaleStart * i.currentScale, i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
        }, onGestureEnd: function (e) {
            var t = this.params.zoom, i = this.zoom, n = i.gesture;
            if (!d.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !w.android) return;
                i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
            }
            n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0))
        }, onTouchStart: function (e) {
            var t = this.zoom, i = t.gesture, n = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (n.isTouched || (w.android && e.preventDefault(), n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        }, onTouchMove: function (e) {
            var t = this.zoom, i = t.gesture, n = t.image, s = t.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, n.isTouched && i.$slideEl)) {
                n.isMoved || (n.width = i.$imageEl[0].offsetWidth, n.height = i.$imageEl[0].offsetHeight, n.startX = l.getTranslate(i.$imageWrapEl[0], "x") || 0, n.startY = l.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (n.startX = -n.startX, n.startY = -n.startY));
                var a = n.width * t.scale, r = n.height * t.scale;
                if (!(a < i.slideWidth && r < i.slideHeight)) {
                    if (n.minX = Math.min(i.slideWidth / 2 - a / 2, 0), n.maxX = -n.minX, n.minY = Math.min(i.slideHeight / 2 - r / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !n.isMoved && !t.isScaling) {
                        if (this.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x)) return void (n.isTouched = !1);
                        if (!this.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y)) return void (n.isTouched = !1)
                    }
                    e.preventDefault(), e.stopPropagation(), n.isMoved = !0, n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX, n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY, n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)), n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)), n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)), n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)), s.prevPositionX || (s.prevPositionX = n.touchesCurrent.x), s.prevPositionY || (s.prevPositionY = n.touchesCurrent.y), s.prevTime || (s.prevTime = Date.now()), s.x = (n.touchesCurrent.x - s.prevPositionX) / (Date.now() - s.prevTime) / 2, s.y = (n.touchesCurrent.y - s.prevPositionY) / (Date.now() - s.prevTime) / 2, Math.abs(n.touchesCurrent.x - s.prevPositionX) < 2 && (s.x = 0), Math.abs(n.touchesCurrent.y - s.prevPositionY) < 2 && (s.y = 0), s.prevPositionX = n.touchesCurrent.x, s.prevPositionY = n.touchesCurrent.y, s.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)")
                }
            }
        }, onTouchEnd: function () {
            var e = this.zoom, t = e.gesture, i = e.image, n = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
                i.isTouched = !1, i.isMoved = !1;
                var s = 300, a = 300, r = n.x * s, o = i.currentX + r, l = n.y * a, d = i.currentY + l;
                0 !== n.x && (s = Math.abs((o - i.currentX) / n.x)), 0 !== n.y && (a = Math.abs((d - i.currentY) / n.y));
                var h = Math.max(s, a);
                i.currentX = o, i.currentY = d;
                var c = i.width * e.scale, u = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - c / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - u / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        }, onTransitionEnd: function () {
            var e = this.zoom, t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
        }, toggle: function (e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        }, in: function (e) {
            var t, i, s, a, r, o, l, d, h, c, u, p, f, m, g, v, b = this.zoom, y = this.params.zoom, w = b.gesture,
                x = b.image;
            (w.$slideEl || (w.$slideEl = this.clickedSlide ? n(this.clickedSlide) : this.slides.eq(this.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas"), w.$imageWrapEl = w.$imageEl.parent("." + y.containerClass)), w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + y.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, i = x.touchesStart.y), b.scale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio, b.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio, e ? (g = w.$slideEl[0].offsetWidth, v = w.$slideEl[0].offsetHeight, s = w.$slideEl.offset().left + g / 2 - t, a = w.$slideEl.offset().top + v / 2 - i, l = w.$imageEl[0].offsetWidth, d = w.$imageEl[0].offsetHeight, h = l * b.scale, c = d * b.scale, f = -(u = Math.min(g / 2 - h / 2, 0)), m = -(p = Math.min(v / 2 - c / 2, 0)), (r = s * b.scale) < u && (r = u), r > f && (r = f), (o = a * b.scale) < p && (o = p), o > m && (o = m)) : (r = 0, o = 0), w.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + o + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        }, out: function () {
            var e = this.zoom, t = this.params.zoom, i = e.gesture;
            i.$slideEl || (i.$slideEl = this.clickedSlide ? n(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
        }, enable: function () {
            var e = this.zoom;
            if (!e.enabled) {
                e.enabled = !0;
                var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                d.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
            }
        }, disable: function () {
            var e = this.zoom;
            if (e.enabled) {
                this.zoom.enabled = !1;
                var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                d.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
            }
        }
    }, F = {
        loadInSlide: function (e, t) {
            void 0 === t && (t = !0);
            var i = this, s = i.params.lazy;
            if (void 0 !== e && 0 !== i.slides.length) {
                var a = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                    r = a.find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")");
                !a.hasClass(s.elementClass) || a.hasClass(s.loadedClass) || a.hasClass(s.loadingClass) || (r = r.add(a[0])), 0 !== r.length && r.each(function (e, r) {
                    var o = n(r);
                    o.addClass(s.loadingClass);
                    var l = o.attr("data-background"), d = o.attr("data-src"), h = o.attr("data-srcset"),
                        c = o.attr("data-sizes");
                    i.loadImage(o[0], d || l, h, c, !1, function () {
                        if (null != i && i && (!i || i.params) && !i.destroyed) {
                            if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), c && (o.attr("sizes", c), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(s.loadedClass).removeClass(s.loadingClass), a.find("." + s.preloaderClass).remove(), i.params.loop && t) {
                                var e = a.attr("data-swiper-slide-index");
                                if (a.hasClass(i.params.slideDuplicateClass)) {
                                    var n = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                    i.lazy.loadInSlide(n.index(), !1)
                                } else {
                                    var r = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    i.lazy.loadInSlide(r.index(), !1)
                                }
                            }
                            i.emit("lazyImageReady", a[0], o[0])
                        }
                    }), i.emit("lazyImageLoad", a[0], o[0])
                })
            }
        }, load: function () {
            var e = this, t = e.$wrapperEl, i = e.params, s = e.slides, a = e.activeIndex,
                r = e.virtual && i.virtual.enabled, o = i.lazy, l = i.slidesPerView;

            function d(e) {
                if (r) {
                    if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                } else if (s[e]) return !0;
                return !1
            }

            function h(e) {
                return r ? n(e).attr("data-swiper-slide-index") : n(e).index()
            }

            if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function (t, i) {
                var s = r ? n(i).attr("data-swiper-slide-index") : n(i).index();
                e.lazy.loadInSlide(s)
            }); else if (l > 1) for (var c = a; c < a + l; c += 1) d(c) && e.lazy.loadInSlide(c); else e.lazy.loadInSlide(a);
            if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                for (var u = o.loadPrevNextAmount, p = l, f = Math.min(a + p + Math.max(u, p), s.length), m = Math.max(a - Math.max(p, u), 0), g = a + l; g < f; g += 1) d(g) && e.lazy.loadInSlide(g);
                for (var v = m; v < a; v += 1) d(v) && e.lazy.loadInSlide(v)
            } else {
                var b = t.children("." + i.slideNextClass);
                b.length > 0 && e.lazy.loadInSlide(h(b));
                var y = t.children("." + i.slidePrevClass);
                y.length > 0 && e.lazy.loadInSlide(h(y))
            }
        }
    }, R = {
        LinearSpline: function (e, t) {
            var i, n, s, a, r, o = function (e, t) {
                for (n = -1, i = e.length; i - n > 1;) e[s = i + n >> 1] <= t ? n = s : i = s;
                return i
            };
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                return e ? (r = o(this.x, e), a = r - 1, (e - this.x[a]) * (this.y[r] - this.y[a]) / (this.x[r] - this.x[a]) + this.y[a]) : 0
            }, this
        }, getInterpolateFunction: function (e) {
            this.controller.spline || (this.controller.spline = this.params.loop ? new R.LinearSpline(this.slidesGrid, e.slidesGrid) : new R.LinearSpline(this.snapGrid, e.snapGrid))
        }, setTranslate: function (e, t) {
            var i, n, s = this, a = s.controller.control;

            function r(e) {
                var t = s.rtlTranslate ? -s.translate : s.translate;
                "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), n = -s.controller.spline.interpolate(-t)), n && "container" !== s.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), n = (t - s.minTranslate()) * i + e.minTranslate()), s.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, s), e.updateActiveIndex(), e.updateSlidesClasses()
            }

            if (Array.isArray(a)) for (var o = 0; o < a.length; o += 1) a[o] !== t && a[o] instanceof T && r(a[o]); else a instanceof T && t !== a && r(a)
        }, setTransition: function (e, t) {
            var i, n = this, s = n.controller.control;

            function a(t) {
                t.setTransition(e, n), 0 !== e && (t.transitionStart(), t.params.autoHeight && l.nextTick(function () {
                    t.updateAutoHeight()
                }), t.$wrapperEl.transitionEnd(function () {
                    s && (t.params.loop && "slide" === n.params.controller.by && t.loopFix(), t.transitionEnd())
                }))
            }

            if (Array.isArray(s)) for (i = 0; i < s.length; i += 1) s[i] !== t && s[i] instanceof T && a(s[i]); else s instanceof T && t !== s && a(s)
        }
    }, W = {
        makeElFocusable: function (e) {
            return e.attr("tabIndex", "0"), e
        }, addElRole: function (e, t) {
            return e.attr("role", t), e
        }, addElLabel: function (e, t) {
            return e.attr("aria-label", t), e
        }, disableEl: function (e) {
            return e.attr("aria-disabled", !0), e
        }, enableEl: function (e) {
            return e.attr("aria-disabled", !1), e
        }, onEnterKey: function (e) {
            var t = this.params.a11y;
            if (13 === e.keyCode) {
                var i = n(e.target);
                this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
            }
        }, notify: function (e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e))
        }, updateNavigation: function () {
            if (!this.params.loop) {
                var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
                i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
            }
        }, updatePagination: function () {
            var e = this, t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function (i, s) {
                var a = n(s);
                e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, t.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
            })
        }, init: function () {
            this.$el.append(this.a11y.liveRegion);
            var e, t, i = this.params.a11y;
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }, destroy: function () {
            var e, t;
            this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }
    }, q = {
        init: function () {
            if (this.params.history) {
                if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
                var e = this.history;
                e.initialized = !0, e.paths = q.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
            }
        }, destroy: function () {
            this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
        }, setHistoryPopState: function () {
            this.history.paths = q.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        }, getPathValues: function () {
            var e = t.location.pathname.slice(1).split("/").filter(function (e) {
                return "" !== e
            }), i = e.length;
            return {key: e[i - 2], value: e[i - 1]}
        }, setHistory: function (e, i) {
            if (this.history.initialized && this.params.history.enabled) {
                var n = this.slides.eq(i), s = q.slugify(n.attr("data-history"));
                t.location.pathname.includes(e) || (s = e + "/" + s);
                var a = t.history.state;
                a && a.value === s || (this.params.history.replaceState ? t.history.replaceState({value: s}, null, s) : t.history.pushState({value: s}, null, s))
            }
        }, slugify: function (e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        }, scrollToSlide: function (e, t, i) {
            if (t) for (var n = 0, s = this.slides.length; n < s; n += 1) {
                var a = this.slides.eq(n);
                if (q.slugify(a.attr("data-history")) === t && !a.hasClass(this.params.slideDuplicateClass)) {
                    var r = a.index();
                    this.slideTo(r, e, i)
                }
            } else this.slideTo(0, e, i)
        }
    }, Y = {
        onHashCange: function () {
            var t = e.location.hash.replace("#", "");
            if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i) return;
                this.slideTo(i)
            }
        }, setHash: function () {
            if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
                var i = this.slides.eq(this.activeIndex), n = i.attr("data-hash") || i.attr("data-history");
                e.location.hash = n || ""
            }
        }, init: function () {
            if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                this.hashNavigation.initialized = !0;
                var i = e.location.hash.replace("#", "");
                if (i) for (var s = 0, a = this.slides.length; s < a; s += 1) {
                    var r = this.slides.eq(s);
                    if ((r.attr("data-hash") || r.attr("data-history")) === i && !r.hasClass(this.params.slideDuplicateClass)) {
                        var o = r.index();
                        this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                    }
                }
                this.params.hashNavigation.watchState && n(t).on("hashchange", this.hashNavigation.onHashCange)
            }
        }, destroy: function () {
            this.params.hashNavigation.watchState && n(t).off("hashchange", this.hashNavigation.onHashCange)
        }
    }, G = {
        run: function () {
            var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = l.nextTick(function () {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
            }, i)
        }, start: function () {
            return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0))
        }, stop: function () {
            return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0))
        }, pause: function (e) {
            this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
        }
    }, U = {
        setTranslate: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = this.slides.eq(t), n = -i[0].swiperSlideOffset;
                this.params.virtualTranslate || (n -= this.translate);
                var s = 0;
                this.isHorizontal() || (s = n, n = 0);
                var a = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({opacity: a}).transform("translate3d(" + n + "px, " + s + "px, 0px)")
            }
        }, setTransition: function (e) {
            var t = this, i = t.slides, n = t.$wrapperEl;
            if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                var s = !1;
                i.transitionEnd(function () {
                    if (!s && t && !t.destroyed) {
                        s = !0, t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
                    }
                })
            }
        }
    }, X = {
        setTranslate: function () {
            var e, t = this.$el, i = this.$wrapperEl, s = this.slides, a = this.width, r = this.height,
                o = this.rtlTranslate, l = this.size, d = this.params.cubeEffect, c = this.isHorizontal(),
                u = this.virtual && this.params.virtual.enabled, p = 0;
            d.shadow && (c ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({height: a + "px"})) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), t.append(e)));
            for (var f = 0; f < s.length; f += 1) {
                var m = s.eq(f), g = f;
                u && (g = parseInt(m.attr("data-swiper-slide-index"), 10));
                var v = 90 * g, b = Math.floor(v / 360);
                o && (v = -v, b = Math.floor(-v / 360));
                var y = Math.max(Math.min(m[0].progress, 1), -1), w = 0, x = 0, E = 0;
                g % 4 == 0 ? (w = 4 * -b * l, E = 0) : (g - 1) % 4 == 0 ? (w = 0, E = 4 * -b * l) : (g - 2) % 4 == 0 ? (w = l + 4 * b * l, E = l) : (g - 3) % 4 == 0 && (w = -l, E = 3 * l + 4 * l * b), o && (w = -w), c || (x = w, w = 0);
                var S = "rotateX(" + (c ? 0 : -v) + "deg) rotateY(" + (c ? v : 0) + "deg) translate3d(" + w + "px, " + x + "px, " + E + "px)";
                if (y <= 1 && y > -1 && (p = 90 * g + 90 * y, o && (p = 90 * -g - 90 * y)), m.transform(S), d.slideShadows) {
                    var C = c ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
                        T = c ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = n('<div class="swiper-slide-shadow-' + (c ? "left" : "top") + '"></div>'), m.append(C)), 0 === T.length && (T = n('<div class="swiper-slide-shadow-' + (c ? "right" : "bottom") + '"></div>'), m.append(T)), C.length && (C[0].style.opacity = Math.max(-y, 0)), T.length && (T[0].style.opacity = Math.max(y, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }), d.shadow) if (c) e.transform("translate3d(0px, " + (a / 2 + d.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
                var k = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
                    I = 1.5 - (Math.sin(2 * k * Math.PI / 360) / 2 + Math.cos(2 * k * Math.PI / 360) / 2),
                    _ = d.shadowScale, M = d.shadowScale / I, P = d.shadowOffset;
                e.transform("scale3d(" + _ + ", 1, " + M + ") translate3d(0px, " + (r / 2 + P) + "px, " + -r / 2 / M + "px) rotateX(-90deg)")
            }
            var A = h.isSafari || h.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + A + "px) rotateX(" + (this.isHorizontal() ? 0 : p) + "deg) rotateY(" + (this.isHorizontal() ? -p : 0) + "deg)")
        }, setTransition: function (e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }, K = {
        setTranslate: function () {
            for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                var s = e.eq(i), a = s[0].progress;
                this.params.flipEffect.limitRotation && (a = Math.max(Math.min(s[0].progress, 1), -1));
                var r = -180 * a, o = 0, l = -s[0].swiperSlideOffset, d = 0;
                if (this.isHorizontal() ? t && (r = -r) : (d = l, l = 0, o = -r, r = 0), s[0].style.zIndex = -Math.abs(Math.round(a)) + e.length, this.params.flipEffect.slideShadows) {
                    var h = this.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                        c = this.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                    0 === h.length && (h = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), s.append(h)), 0 === c.length && (c = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), h.length && (h[0].style.opacity = Math.max(-a, 0)), c.length && (c[0].style.opacity = Math.max(a, 0))
                }
                s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + r + "deg)")
            }
        }, setTransition: function (e) {
            var t = this, i = t.slides, n = t.activeIndex, s = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                var a = !1;
                i.eq(n).transitionEnd(function () {
                    if (!a && t && !t.destroyed) {
                        a = !0, t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
                    }
                })
            }
        }
    }, Q = {
        setTranslate: function () {
            for (var e = this.width, t = this.height, i = this.slides, s = this.$wrapperEl, a = this.slidesSizesGrid, r = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, h = o ? e / 2 - l : t / 2 - l, c = o ? r.rotate : -r.rotate, u = r.depth, p = 0, f = i.length; p < f; p += 1) {
                var m = i.eq(p), g = a[p], v = (h - m[0].swiperSlideOffset - g / 2) / g * r.modifier, b = o ? c * v : 0,
                    y = o ? 0 : c * v, w = -u * Math.abs(v), x = o ? 0 : r.stretch * v, E = o ? r.stretch * v : 0;
                Math.abs(E) < .001 && (E = 0), Math.abs(x) < .001 && (x = 0), Math.abs(w) < .001 && (w = 0), Math.abs(b) < .001 && (b = 0), Math.abs(y) < .001 && (y = 0);
                var S = "translate3d(" + E + "px," + x + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + b + "deg)";
                if (m.transform(S), m[0].style.zIndex = 1 - Math.abs(Math.round(v)), r.slideShadows) {
                    var C = o ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
                        T = o ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = n('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), m.append(C)), 0 === T.length && (T = n('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), m.append(T)), C.length && (C[0].style.opacity = v > 0 ? v : 0), T.length && (T[0].style.opacity = -v > 0 ? -v : 0)
                }
            }
            (d.pointerEvents || d.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = h + "px 50%")
        }, setTransition: function (e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }, Z = {
        init: function () {
            var e = this.params.thumbs, t = this.constructor;
            e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, l.extend(this.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), l.extend(this.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : l.isObject(e.swiper) && (this.thumbs.swiper = new t(l.extend({}, e.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
        }, onThumbClick: function () {
            var e = this.thumbs.swiper;
            if (e) {
                var t = e.clickedIndex, i = e.clickedSlide;
                if (!(i && n(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                    var s;
                    if (s = e.params.loop ? parseInt(n(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
                        var a = this.activeIndex;
                        this.slides.eq(a).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, a = this.activeIndex);
                        var r = this.slides.eq(a).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                            o = this.slides.eq(a).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                        s = void 0 === r ? o : void 0 === o ? r : o - a < a - r ? o : r
                    }
                    this.slideTo(s)
                }
            }
        }, update: function (e) {
            var t = this.thumbs.swiper;
            if (t) {
                var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                if (this.realIndex !== t.realIndex) {
                    var n, s = t.activeIndex;
                    if (t.params.loop) {
                        t.slides.eq(s).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, s = t.activeIndex);
                        var a = t.slides.eq(s).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                            r = t.slides.eq(s).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                        n = void 0 === a ? r : void 0 === r ? a : r - s == s - a ? s : r - s < s - a ? r : a
                    } else n = this.realIndex;
                    t.visibleSlidesIndexes.indexOf(n) < 0 && (t.params.centeredSlides ? n = n > s ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > s && (n = n - i + 1), t.slideTo(n, e ? 0 : void 0))
                }
                var o = 1, l = this.params.thumbs.slideThumbActiveClass;
                if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), t.slides.removeClass(l), t.params.loop) for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l); else for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l)
            }
        }
    }, J = [k, I, _, M, A, O, N, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function () {
            l.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: z.enable.bind(this),
                    disable: z.disable.bind(this),
                    handle: z.handle.bind(this),
                    handleMouseEnter: z.handleMouseEnter.bind(this),
                    handleMouseLeave: z.handleMouseLeave.bind(this),
                    lastScrollTime: l.now()
                }
            })
        },
        on: {
            init: function () {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            }, destroy: function () {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function () {
            l.extend(this, {
                navigation: {
                    init: $.init.bind(this),
                    update: $.update.bind(this),
                    destroy: $.destroy.bind(this),
                    onNextClick: $.onNextClick.bind(this),
                    onPrevClick: $.onPrevClick.bind(this)
                }
            })
        },
        on: {
            init: function () {
                this.navigation.init(), this.navigation.update()
            }, toEdge: function () {
                this.navigation.update()
            }, fromEdge: function () {
                this.navigation.update()
            }, destroy: function () {
                this.navigation.destroy()
            }, click: function (e) {
                var t, i = this.navigation, s = i.$nextEl, a = i.$prevEl;
                !this.params.navigation.hideOnClick || n(e.target).is(a) || n(e.target).is(s) || (s ? t = s.hasClass(this.params.navigation.hiddenClass) : a && (t = a.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), s && s.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function (e) {
                    return e
                },
                formatFractionTotal: function (e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function () {
            l.extend(this, {
                pagination: {
                    init: B.init.bind(this),
                    render: B.render.bind(this),
                    update: B.update.bind(this),
                    destroy: B.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function () {
                this.pagination.init(), this.pagination.render(), this.pagination.update()
            }, activeIndexChange: function () {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            }, snapIndexChange: function () {
                this.params.loop || this.pagination.update()
            }, slidesLengthChange: function () {
                this.params.loop && (this.pagination.render(), this.pagination.update())
            }, snapGridLengthChange: function () {
                this.params.loop || (this.pagination.render(), this.pagination.update())
            }, destroy: function () {
                this.pagination.destroy()
            }, click: function (e) {
                this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !n(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function () {
            l.extend(this, {
                scrollbar: {
                    init: H.init.bind(this),
                    destroy: H.destroy.bind(this),
                    updateSize: H.updateSize.bind(this),
                    setTranslate: H.setTranslate.bind(this),
                    setTransition: H.setTransition.bind(this),
                    enableDraggable: H.enableDraggable.bind(this),
                    disableDraggable: H.disableDraggable.bind(this),
                    setDragPosition: H.setDragPosition.bind(this),
                    onDragStart: H.onDragStart.bind(this),
                    onDragMove: H.onDragMove.bind(this),
                    onDragEnd: H.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function () {
                this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
            }, update: function () {
                this.scrollbar.updateSize()
            }, resize: function () {
                this.scrollbar.updateSize()
            }, observerUpdate: function () {
                this.scrollbar.updateSize()
            }, setTranslate: function () {
                this.scrollbar.setTranslate()
            }, setTransition: function (e) {
                this.scrollbar.setTransition(e)
            }, destroy: function () {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
            l.extend(this, {
                parallax: {
                    setTransform: V.setTransform.bind(this),
                    setTranslate: V.setTranslate.bind(this),
                    setTransition: V.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            }, init: function () {
                this.params.parallax.enabled && this.parallax.setTranslate()
            }, setTranslate: function () {
                this.params.parallax.enabled && this.parallax.setTranslate()
            }, setTransition: function (e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function () {
            var e = this, t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
                t[i] = j[i].bind(e)
            }), l.extend(e, {zoom: t});
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function () {
                    return i
                }, set: function (t) {
                    if (i !== t) {
                        var n = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                            s = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, n, s)
                    }
                    i = t
                }
            })
        },
        on: {
            init: function () {
                this.params.zoom.enabled && this.zoom.enable()
            }, destroy: function () {
                this.zoom.disable()
            }, touchStart: function (e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            }, touchEnd: function (e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            }, doubleTap: function (e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            }, transitionEnd: function () {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function () {
            l.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: F.load.bind(this),
                    loadInSlide: F.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            }, init: function () {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            }, scroll: function () {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            }, resize: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, scrollbarDragMove: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, transitionStart: function () {
                this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
            }, transitionEnd: function () {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
            l.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: R.getInterpolateFunction.bind(this),
                    setTranslate: R.setTranslate.bind(this),
                    setTransition: R.setTransition.bind(this)
                }
            })
        }, on: {
            update: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, resize: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, observerUpdate: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, setTranslate: function (e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            }, setTransition: function (e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function () {
            var e = this;
            l.extend(e, {a11y: {liveRegion: n('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(W).forEach(function (t) {
                e.a11y[t] = W[t].bind(e)
            })
        },
        on: {
            init: function () {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
            }, toEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, fromEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, paginationUpdate: function () {
                this.params.a11y.enabled && this.a11y.updatePagination()
            }, destroy: function () {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
            l.extend(this, {
                history: {
                    init: q.init.bind(this),
                    setHistory: q.setHistory.bind(this),
                    setHistoryPopState: q.setHistoryPopState.bind(this),
                    scrollToSlide: q.scrollToSlide.bind(this),
                    destroy: q.destroy.bind(this)
                }
            })
        }, on: {
            init: function () {
                this.params.history.enabled && this.history.init()
            }, destroy: function () {
                this.params.history.enabled && this.history.destroy()
            }, transitionEnd: function () {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
        create: function () {
            l.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: Y.init.bind(this),
                    destroy: Y.destroy.bind(this),
                    setHash: Y.setHash.bind(this),
                    onHashCange: Y.onHashCange.bind(this)
                }
            })
        },
        on: {
            init: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            }, destroy: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            }, transitionEnd: function () {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function () {
            var e = this;
            l.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: G.run.bind(e),
                    start: G.start.bind(e),
                    stop: G.stop.bind(e),
                    pause: G.pause.bind(e),
                    onTransitionEnd: function (t) {
                        e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function () {
                this.params.autoplay.enabled && this.autoplay.start()
            }, beforeTransitionStart: function (e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            }, sliderFirstMove: function () {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            }, destroy: function () {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
            l.extend(this, {
                fadeEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                if ("fade" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "fade");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    l.extend(this.params, e), l.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            }, setTransition: function (e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
        create: function () {
            l.extend(this, {
                cubeEffect: {
                    setTranslate: X.setTranslate.bind(this),
                    setTransition: X.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                if ("cube" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    l.extend(this.params, e), l.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            }, setTransition: function (e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
            l.extend(this, {
                flipEffect: {
                    setTranslate: K.setTranslate.bind(this),
                    setTransition: K.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                if ("flip" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    l.extend(this.params, e), l.extend(this.originalParams, e)
                }
            }, setTranslate: function () {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            }, setTransition: function (e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
        create: function () {
            l.extend(this, {
                coverflowEffect: {
                    setTranslate: Q.setTranslate.bind(this),
                    setTransition: Q.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            }, setTranslate: function () {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            }, setTransition: function (e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function () {
            l.extend(this, {
                thumbs: {
                    swiper: null,
                    init: Z.init.bind(this),
                    update: Z.update.bind(this),
                    onThumbClick: Z.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
            }, slideChange: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, update: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, resize: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, observerUpdate: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, setTransition: function (e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            }, beforeDestroy: function () {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === T.use && (T.use = T.Class.use, T.installModule = T.Class.installModule), T.use(J), T
});
