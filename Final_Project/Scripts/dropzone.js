(function () {
    var e, t, i, n, r, s, o, l, a, u = [].slice, p = {}.hasOwnProperty;
    l = function () {
    }, t = function () {
        function e() {
        }

        return e.prototype.addEventListener = e.prototype.on, e.prototype.on = function (e, t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || (this._callbacks[e] = []), this._callbacks[e].push(t), this
        }, e.prototype.emit = function () {
            var e, t, i, n, r;
            if (i = arguments[0], e = 2 <= arguments.length ? u.call(arguments, 1) : [], this._callbacks = this._callbacks || {}, t = this._callbacks[i]) for (n = 0, r = t.length; n < r; n++) t[n].apply(this, e);
            return this
        }, e.prototype.removeListener = e.prototype.off, e.prototype.removeAllListeners = e.prototype.off, e.prototype.removeEventListener = e.prototype.off, e.prototype.off = function (e, t) {
            var i, n, r, s;
            if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
            if (!(i = this._callbacks[e])) return this;
            if (1 === arguments.length) return delete this._callbacks[e], this;
            for (n = r = 0, s = i.length; r < s; n = ++r) if (i[n] === t) {
                i.splice(n, 1);
                break
            }
            return this
        }, e
    }(), (e = function (e) {
        var n, r;

        function s(e, t) {
            var i, r, o, l;
            if (this.element = e, this.version = s.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
            if (this.element.dropzone) throw new Error("Dropzone already attached.");
            if (s.instances.push(this), this.element.dropzone = this, i = null != (o = s.optionsForElement(this.element)) ? o : {}, this.options = n({}, this.defaultOptions, i, null != t ? t : {}), this.options.forceFallback || !s.isBrowserSupported()) return this.options.fallback.call(this);
            if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), !this.options.url) throw new Error("No URL provided.");
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), null != this.options.renameFilename && (this.options.renameFile = (l = this, function (e) {
                return l.options.renameFilename.call(l, e.name, e)
            })), this.options.method = this.options.method.toUpperCase(), (r = this.getExistingFallback()) && r.parentNode && r.parentNode.removeChild(r), !1 !== this.options.previewsContainer && (this.options.previewsContainer ? this.previewsContainer = s.getElement(this.options.previewsContainer, "previewsContainer") : this.previewsContainer = this.element), this.options.clickable && (!0 === this.options.clickable ? this.clickableElements = [this.element] : this.clickableElements = s.getElements(this.options.clickable, "clickable")), this.init()
        }

        return function (e, t) {
            for (var i in t) p.call(t, i) && (e[i] = t[i]);

            function n() {
                this.constructor = e
            }

            n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype
        }(s, t), s.prototype.Emitter = t, s.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], s.prototype.defaultOptions = {
            url: null,
            method: "post",
            withCredentials: !1,
            timeout: 5e5,
            parallelUploads: 2,
            uploadMultiple: !1,
            maxFilesize: 256,
            paramName: "file",
            createImageThumbnails: !0,
            maxThumbnailFilesize: 10,
            thumbnailWidth: 120,
            thumbnailHeight: 120,
            thumbnailMethod: "crop",
            resizeWidth: null,
            resizeHeight: null,
            resizeMimeType: null,
            resizeQuality: .8,
            resizeMethod: "contain",
            filesizeBase: 1e3,
            maxFiles: null,
            params: {},
            headers: null,
            clickable: !0,
            ignoreHiddenFiles: !0,
            acceptedFiles: null,
            acceptedMimeTypes: null,
            autoProcessQueue: !0,
            autoQueue: !0,
            addRemoveLinks: !1,
            previewsContainer: null,
            hiddenInputContainer: "body",
            capture: null,
            renameFilename: null,
            renameFile: null,
            forceFallback: !1,
            dictDefaultMessage: "برای بارگذاری عکس را با موس اینجا بکشید",
            dictFallbackMessage: "مرورگر شما برای بارگذاری از این قابلیت پشتیبانی نمی کند",
            dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
            dictFileTooBig: "حجم فایل بسیار زیاد است ({{filesize}}MiB). حداکثر حجم مجاز: {{maxFilesize}}MiB.",
            dictInvalidFileType: "این فرمت پشتیبانی نمی شود",
            dictResponseError: "Server responded with {{statusCode}} code.",
            dictCancelUpload: "X",
            dictCancelUploadConfirmation: "آیا از لغو بارگزاری اطمینان دارید ?",
            dictRemoveFile: "Remove file",
            dictRemoveFileConfirmation: null,
            dictMaxFilesExceeded: "تعداد مجاز عکس های شما تمام شده است",
            dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
            init: function () {
                return l
            },
            accept: function (e, t) {
                return t()
            },
            fallback: function () {
                var e, t, i, n, r, o;
                for (this.element.className = this.element.className + " dz-browser-not-supported", t = 0, i = (r = this.element.getElementsByTagName("div")).length; t < i; t++) e = r[t], /(^| )dz-message($| )/.test(e.className) && (n = e, e.className = "dz-message");
                return n || (n = s.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(n)), (o = n.getElementsByTagName("span")[0]) && (null != o.textContent ? o.textContent = this.options.dictFallbackMessage : null != o.innerText && (o.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm())
            },
            resize: function (e, t, i, n) {
                var r, s, o;
                if (r = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: e.width,
                    srcHeight: e.height
                }, s = e.width / e.height, null == t && null == i ? (t = r.srcWidth, i = r.srcHeight) : null == t ? t = i * s : null == i && (i = t / s), o = (t = Math.min(t, r.srcWidth)) / (i = Math.min(i, r.srcHeight)), r.srcWidth > t || r.srcHeight > i) if ("crop" === n) s > o ? (r.srcHeight = e.height, r.srcWidth = r.srcHeight * o) : (r.srcWidth = e.width, r.srcHeight = r.srcWidth / o); else {
                    if ("contain" !== n) throw new Error("Unknown resizeMethod '" + n + "'");
                    s > o ? i = t / s : t = i * s
                }
                return r.srcX = (e.width - r.srcWidth) / 2, r.srcY = (e.height - r.srcHeight) / 2, r.trgWidth = t, r.trgHeight = i, r
            },
            transformFile: function (e, t) {
                return (this.options.resizeWidth || this.options.resizeHeight) && e.type.match(/image.*/) ? this.resizeImage(e, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, t) : t(e)
            },
            previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details hidden">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',
            drop: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragstart: l,
            dragend: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragenter: function (e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragover: function (e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragleave: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            paste: l,
            reset: function () {
                return this.element.classList.remove("dz-started")
            },
            addedfile: function (e) {
                var t, i, n, r, o, l, a, u, p, c, d, h, m;
                if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                    for (e.previewElement = s.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, this.previewsContainer.appendChild(e.previewElement), t = 0, r = (a = e.previewElement.querySelectorAll("[data-dz-name]")).length; t < r; t++) a[t].textContent = e.upload.filename;
                    for (i = 0, o = (u = e.previewElement.querySelectorAll("[data-dz-size]")).length; i < o; i++) u[i].innerHTML = this.filesize(e.size);
                    for (this.options.addRemoveLinks && (e._removeLink = s.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), e.previewElement.appendChild(e._removeLink)), m = this, c = function (t) {
                        return t.preventDefault(), t.stopPropagation(), e.status === s.UPLOADING ? s.confirm(m.options.dictCancelUploadConfirmation, function () {
                            return m.removeFile(e)
                    }) : m.options.dictRemoveFileConfirmation ? s.confirm(m.options.dictRemoveFileConfirmation, function () {
                            return m.removeFile(e)
                    }) : m.removeFile(e)
                    }, h = [], n = 0, l = (p = e.previewElement.querySelectorAll("[data-dz-remove]")).length; n < l; n++) d = p[n], h.push(d.addEventListener("click", c));
                    return h
                }
            },
            removedfile: function (e) {
                var t;
                return e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass()
            },
            thumbnail: function (e, t) {
                var i, n, r, s;
                if (e.previewElement) {
                    for (e.previewElement.classList.remove("dz-file-preview"), i = 0, n = (r = e.previewElement.querySelectorAll("[data-dz-thumbnail]")).length; i < n; i++) (s = r[i]).alt = e.name, s.src = t;
                    return setTimeout(function () {
                        return e.previewElement.classList.add("dz-image-preview")
                    }, 1)
                }
            },
            error: function (e, t) {
                var i, n, r, s, o;
                if (e.previewElement) {
                    for (e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error), o = [], i = 0, n = (s = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; i < n; i++) r = s[i], o.push(r.textContent = t);
                    return o
                }
            },
            errormultiple: l,
            processing: function (e) {
                if (e.previewElement && (e.previewElement.classList.add("dz-processing"), e._removeLink)) return e._removeLink.textContent = this.options.dictCancelUpload
            },
            processingmultiple: l,
            uploadprogress: function (e, t, i) {
                var n, r, s, o, l;
                if (e.previewElement) {
                    for (l = [], n = 0, r = (o = e.previewElement.querySelectorAll("[data-dz-uploadprogress]")).length; n < r; n++) "PROGRESS" === (s = o[n]).nodeName ? l.push(s.value = t) : l.push(s.style.width = t + "%");
                    return l
                }
            },
            totaluploadprogress: l,
            sending: l,
            sendingmultiple: l,
            success: function (e) {
                if (e.previewElement) return e.previewElement.classList.add("dz-success")
            },
            successmultiple: l,
            canceled: function (e) {
                return this.emit("error", e, "بارگزاری لغو شد .")
            },
            canceledmultiple: l,
            complete: function (e) {
                if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement) return e.previewElement.classList.add("dz-complete")
            },
            completemultiple: l,
            maxfilesexceeded: l,
            maxfilesreached: l,
            queuecomplete: l,
            addedfiles: l
        }, n = function () {
            var e, t, i, n, r, s, o;
            for (s = arguments[0], e = 0, i = (r = 2 <= arguments.length ? u.call(arguments, 1) : []).length; e < i; e++) for (t in n = r[e]) o = n[t], s[t] = o;
            return s
        }, s.prototype.getAcceptedFiles = function () {
            var e, t, i, n, r;
            for (r = [], t = 0, i = (n = this.files).length; t < i; t++) (e = n[t]).accepted && r.push(e);
            return r
        }, s.prototype.getRejectedFiles = function () {
            var e, t, i, n, r;
            for (r = [], t = 0, i = (n = this.files).length; t < i; t++) (e = n[t]).accepted || r.push(e);
            return r
        }, s.prototype.getFilesWithStatus = function (e) {
            var t, i, n, r, s;
            for (s = [], i = 0, n = (r = this.files).length; i < n; i++) (t = r[i]).status === e && s.push(t);
            return s
        }, s.prototype.getQueuedFiles = function () {
            return this.getFilesWithStatus(s.QUEUED)
        }, s.prototype.getUploadingFiles = function () {
            return this.getFilesWithStatus(s.UPLOADING)
        }, s.prototype.getAddedFiles = function () {
            return this.getFilesWithStatus(s.ADDED)
        }, s.prototype.getActiveFiles = function () {
            var e, t, i, n, r;
            for (r = [], t = 0, i = (n = this.files).length; t < i; t++) (e = n[t]).status !== s.UPLOADING && e.status !== s.QUEUED || r.push(e);
            return r
        }, s.prototype.init = function () {
            var e, t, i, n, r, o, l, a;
            for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(s.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (a = this, (l = function () {
                return a.hiddenFileInput && a.hiddenFileInput.parentNode.removeChild(a.hiddenFileInput), a.hiddenFileInput = document.createElement("input"), a.hiddenFileInput.setAttribute("type", "file"), (null == a.options.maxFiles || a.options.maxFiles > 1) && a.hiddenFileInput.setAttribute("multiple", "multiple"), a.hiddenFileInput.className = "dz-hidden-input", null != a.options.acceptedFiles && a.hiddenFileInput.setAttribute("accept", a.options.acceptedFiles), null != a.options.capture && a.hiddenFileInput.setAttribute("capture", a.options.capture), a.hiddenFileInput.style.visibility = "hidden", a.hiddenFileInput.style.position = "absolute", a.hiddenFileInput.style.top = "0", a.hiddenFileInput.style.right = "0", a.hiddenFileInput.style.height = "0", a.hiddenFileInput.style.width = "0", document.querySelector(a.options.hiddenInputContainer).appendChild(a.hiddenFileInput), a.hiddenFileInput.addEventListener("change", function () {
                    var e, t, i, n;
                    if ((t = a.hiddenFileInput.files).length) for (i = 0, n = t.length; i < n; i++) e = t[i], a.addFile(e);
                    return a.emit("addedfiles", t), l()
            })
            })()), this.URL = null != (r = window.URL) ? r : window.webkitURL, t = 0, i = (o = this.events).length; t < i; t++) e = o[t], this.on(e, this.options[e]);
            return this.on("uploadprogress", function (e) {
                return function () {
                    return e.updateTotalUploadProgress()
                }
            }(this)), this.on("removedfile", function (e) {
                return function () {
                    return e.updateTotalUploadProgress()
                }
            }(this)), this.on("canceled", function (e) {
                return function (t) {
                    return e.emit("complete", t)
                }
            }(this)), this.on("complete", function (e) {
                return function (t) {
                    if (0 === e.getAddedFiles().length && 0 === e.getUploadingFiles().length && 0 === e.getQueuedFiles().length) return setTimeout(function () {
                        return e.emit("queuecomplete")
                    }, 0)
                }
            }(this)), n = function (e) {
                return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, this.listeners = [{
                element: this.element, events: {
                    dragstart: function (e) {
                        return function (t) {
                            return e.emit("dragstart", t)
                        }
                    }(this), dragenter: function (e) {
                        return function (t) {
                            return n(t), e.emit("dragenter", t)
                        }
                    }(this), dragover: function (e) {
                        return function (t) {
                            var i;
                            try {
                                i = t.dataTransfer.effectAllowed
                            } catch (e) {
                            }
                            return t.dataTransfer.dropEffect = "move" === i || "linkMove" === i ? "move" : "copy", n(t), e.emit("dragover", t)
                        }
                    }(this), dragleave: function (e) {
                        return function (t) {
                            return e.emit("dragleave", t)
                        }
                    }(this), drop: function (e) {
                        return function (t) {
                            return n(t), e.drop(t)
                        }
                    }(this), dragend: function (e) {
                        return function (t) {
                            return e.emit("dragend", t)
                        }
                    }(this)
                }
            }], this.clickableElements.forEach(function (e) {
                return function (t) {
                    return e.listeners.push({
                        element: t, events: {
                            click: function (i) {
                                return (t !== e.element || i.target === e.element || s.elementInside(i.target, e.element.querySelector(".dz-message"))) && e.hiddenFileInput.click(), !0
                            }
                        }
                    })
                }
            }(this)), this.enable(), this.options.init.call(this)
        }, s.prototype.destroy = function () {
            var e;
            return this.disable(), this.removeAllFiles(!0), (null != (e = this.hiddenFileInput) ? e.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, s.instances.splice(s.instances.indexOf(this), 1)
        }, s.prototype.updateTotalUploadProgress = function () {
            var e, t, i, n, r, s, o;
            if (s = 0, r = 0, this.getActiveFiles().length) {
                for (t = 0, i = (n = this.getActiveFiles()).length; t < i; t++) s += (e = n[t]).upload.bytesSent, r += e.upload.total;
                o = 100 * s / r
            } else o = 100;
            return this.emit("totaluploadprogress", o, r, s)
        }, s.prototype._getParamName = function (e) {
            return "function" == typeof this.options.paramName ? this.options.paramName(e) : this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "")
        }, s.prototype._renameFile = function (e) {
            return "function" != typeof this.options.renameFile ? e.name : this.options.renameFile(e)
        }, s.prototype.getFallbackForm = function () {
            var e, t, i, n;
            return (e = this.getExistingFallback()) ? e : (i = '<div class="dz-fallback">', this.options.dictFallbackText && (i += "<p>" + this.options.dictFallbackText + "</p>"), i += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>', t = s.createElement(i), "FORM" !== this.element.tagName ? (n = s.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>')).appendChild(t) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != n ? n : t)
        }, s.prototype.getExistingFallback = function () {
            var e, t, i, n, r, s;
            for (t = function (e) {
                var t, i, n;
                for (i = 0, n = e.length; i < n; i++) if (t = e[i], /(^| )fallback($| )/.test(t.className)) return t
            }, i = 0, n = (r = ["div", "form"]).length; i < n; i++) if (s = r[i], e = t(this.element.getElementsByTagName(s))) return e
        }, s.prototype.setupEventListeners = function () {
            var e, t, i, n, r, s, o;
            for (o = [], i = 0, n = (s = this.listeners).length; i < n; i++) e = s[i], o.push(function () {
                var i, n;
                for (t in n = [], i = e.events) r = i[t], n.push(e.element.addEventListener(t, r, !1));
                return n
            }());
            return o
        }, s.prototype.removeEventListeners = function () {
            var e, t, i, n, r, s, o;
            for (o = [], i = 0, n = (s = this.listeners).length; i < n; i++) e = s[i], o.push(function () {
                var i, n;
                for (t in n = [], i = e.events) r = i[t], n.push(e.element.removeEventListener(t, r, !1));
                return n
            }());
            return o
        }, s.prototype.disable = function () {
            var e, t, i, n, r;
            for (this.clickableElements.forEach(function (e) {
                return e.classList.remove("dz-clickable")
            }), this.removeEventListeners(), r = [], t = 0, i = (n = this.files).length; t < i; t++) e = n[t], r.push(this.cancelUpload(e));
            return r
        }, s.prototype.enable = function () {
            return this.clickableElements.forEach(function (e) {
                return e.classList.add("dz-clickable")
            }), this.setupEventListeners()
        }, s.prototype.filesize = function (e) {
            var t, i, n, r, s, o, l;
            if (r = 0, s = "b", e > 0) {
                for (t = i = 0, n = (l = ["tb", "gb", "mb", "kb", "b"]).length; i < n; t = ++i) if (o = l[t], e >= Math.pow(this.options.filesizeBase, 4 - t) / 10) {
                    r = e / Math.pow(this.options.filesizeBase, 4 - t), s = o;
                    break
                }
                r = Math.round(10 * r) / 10
            }
            return "<strong>" + r + "</strong> " + this.options.dictFileSizeUnits[s]
        }, s.prototype._updateMaxFilesReachedClass = function () {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
        }, s.prototype.drop = function (e) {
            var t, i;
            e.dataTransfer && (this.emit("drop", e), t = e.dataTransfer.files, this.emit("addedfiles", t), t.length && ((i = e.dataTransfer.items) && i.length && null != i[0].webkitGetAsEntry ? this._addFilesFromItems(i) : this.handleFiles(t)))
        }, s.prototype.paste = function (e) {
            var t, i;
            if (null != (null != e && null != (i = e.clipboardData) ? i.items : void 0)) return this.emit("paste", e), (t = e.clipboardData.items).length ? this._addFilesFromItems(t) : void 0
        }, s.prototype.handleFiles = function (e) {
            var t, i, n, r;
            for (r = [], i = 0, n = e.length; i < n; i++) t = e[i], r.push(this.addFile(t));
            return r
        }, s.prototype._addFilesFromItems = function (e) {
            var t, i, n, r, s;
            for (s = [], n = 0, r = e.length; n < r; n++) null != (i = e[n]).webkitGetAsEntry && (t = i.webkitGetAsEntry()) ? t.isFile ? s.push(this.addFile(i.getAsFile())) : t.isDirectory ? s.push(this._addFilesFromDirectory(t, t.name)) : s.push(void 0) : null != i.getAsFile && (null == i.kind || "file" === i.kind) ? s.push(this.addFile(i.getAsFile())) : s.push(void 0);
            return s
        }, s.prototype._addFilesFromDirectory = function (e, t) {
            var i, n, r, s;
            return i = e.createReader(), n = function (e) {
                return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(e) : void 0
            }, s = this, (r = function () {
                return i.readEntries(function (e) {
                    var i, n, o;
                    if (e.length > 0) {
                        for (n = 0, o = e.length; n < o; n++) (i = e[n]).isFile ? i.file(function (e) {
                            if (!s.options.ignoreHiddenFiles || "." !== e.name.substring(0, 1)) return e.fullPath = t + "/" + e.name, s.addFile(e)
                        }) : i.isDirectory && s._addFilesFromDirectory(i, t + "/" + i.name);
                        r()
                    }
                    return null
                }, n)
            })()
        }, s.prototype.accept = function (e, t) {
            return e.size > 1024 * this.options.maxFilesize * 1024 ? t(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : s.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, t) : t(this.options.dictInvalidFileType)
        }, s.prototype.addFile = function (e) {
            return e.upload = {
                progress: 0,
                total: e.size,
                bytesSent: 0,
                filename: this._renameFile(e)
            }, this.files.push(e), e.status = s.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), this.accept(e, (t = this, function (i) {
                return i ? (e.accepted = !1, t._errorProcessing([e], i)) : (e.accepted = !0, t.options.autoQueue && t.enqueueFile(e)), t._updateMaxFilesReachedClass()
            }));
            var t
        }, s.prototype.enqueueFiles = function (e) {
            var t, i, n;
            for (i = 0, n = e.length; i < n; i++) t = e[i], this.enqueueFile(t);
            return null
        }, s.prototype.enqueueFile = function (e) {
            if (e.status !== s.ADDED || !0 !== e.accepted) throw new Error("This file can't be queued because it has already been processed or was rejected.");
            if (e.status = s.QUEUED, this.options.autoProcessQueue) return setTimeout((t = this, function () {
                return t.processQueue()
            }), 0);
            var t
        }, s.prototype._thumbnailQueue = [], s.prototype._processingThumbnail = !1, s.prototype._enqueueThumbnail = function (e) {
            if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024) return this._thumbnailQueue.push(e), setTimeout((t = this, function () {
                return t._processThumbnailQueue()
            }), 0);
            var t
        }, s.prototype._processThumbnailQueue = function () {
            var e, t;
            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) return this._processingThumbnail = !0, e = this._thumbnailQueue.shift(), this.createThumbnail(e, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, !0, (t = this, function (i) {
                return t.emit("thumbnail", e, i), t._processingThumbnail = !1, t._processThumbnailQueue()
            }))
        }, s.prototype.removeFile = function (e) {
            if (e.status === s.UPLOADING && this.cancelUpload(e), this.files = a(this.files, e), this.emit("removedfile", e), 0 === this.files.length) return this.emit("reset")
        }, s.prototype.removeAllFiles = function (e) {
            var t, i, n, r;
            for (null == e && (e = !1), i = 0, n = (r = this.files.slice()).length; i < n; i++) ((t = r[i]).status !== s.UPLOADING || e) && this.removeFile(t);
            return null
        }, s.prototype.resizeImage = function (e, t, n, r, o) {
            return this.createThumbnail(e, t, n, r, !1, (l = this, function (t, n) {
                var r, a;
                return null === n ? o(e) : (null == (r = l.options.resizeMimeType) && (r = e.type), a = n.toDataURL(r, l.options.resizeQuality), "image/jpeg" !== r && "image/jpg" !== r || (a = i.restore(e.dataURL, a)), o(s.dataURItoBlob(a)))
            }));
            var l
        }, s.prototype.createThumbnail = function (e, t, i, n, r, s) {
            var o, l;
            return (o = new FileReader).onload = (l = this, function () {
                if (e.dataURL = o.result, "image/svg+xml" !== e.type) return l.createThumbnailFromUrl(e, t, i, n, r, s);
                null != s && s(o.result)
            }), o.readAsDataURL(e)
        }, s.prototype.createThumbnailFromUrl = function (e, t, i, n, r, s, l) {
            var a, u;
            return a = document.createElement("img"), l && (a.crossOrigin = l), a.onload = (u = this, function () {
                var l;
                return l = function (e) {
                    return e(1)
                }, "undefined" != typeof EXIF && null !== EXIF && r && (l = function (e) {
                    return EXIF.getData(a, function () {
                        return e(EXIF.getTag(this, "Orientation"))
                    })
                }), l(function (r) {
                    var l, p, c, d, h, m, f, g;
                    switch (e.width = a.width, e.height = a.height, f = u.options.resize.call(u, e, t, i, n), p = (l = document.createElement("canvas")).getContext("2d"), l.width = f.trgWidth, l.height = f.trgHeight, r > 4 && (l.width = f.trgHeight, l.height = f.trgWidth), r) {
                        case 2:
                            p.translate(l.width, 0), p.scale(-1, 1);
                            break;
                        case 3:
                            p.translate(l.width, l.height), p.rotate(Math.PI);
                            break;
                        case 4:
                            p.translate(0, l.height), p.scale(1, -1);
                            break;
                        case 5:
                            p.rotate(.5 * Math.PI), p.scale(1, -1);
                            break;
                        case 6:
                            p.rotate(.5 * Math.PI), p.translate(0, -l.height);
                            break;
                        case 7:
                            p.rotate(.5 * Math.PI), p.translate(l.width, -l.height), p.scale(-1, 1);
                            break;
                        case 8:
                            p.rotate(-.5 * Math.PI), p.translate(-l.width, 0)
                    }
                    if (o(p, a, null != (c = f.srcX) ? c : 0, null != (d = f.srcY) ? d : 0, f.srcWidth, f.srcHeight, null != (h = f.trgX) ? h : 0, null != (m = f.trgY) ? m : 0, f.trgWidth, f.trgHeight), g = l.toDataURL("image/png"), null != s) return s(g, l)
                })
            }), null != s && (a.onerror = s), a.src = e.dataURL
        }, s.prototype.processQueue = function () {
            var e, t, i, n;
            if (t = this.options.parallelUploads, e = i = this.getUploadingFiles().length, !(i >= t) && (n = this.getQueuedFiles()).length > 0) {
                if (this.options.uploadMultiple) return this.processFiles(n.slice(0, t - i));
                for (; e < t;) {
                    if (!n.length) return;
                    this.processFile(n.shift()), e++
                }
            }
        }, s.prototype.processFile = function (e) {
            return this.processFiles([e])
        }, s.prototype.processFiles = function (e) {
            var t, i, n;
            for (i = 0, n = e.length; i < n; i++) (t = e[i]).processing = !0, t.status = s.UPLOADING, this.emit("processing", t);
            return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e)
        }, s.prototype._getFilesWithXhr = function (e) {
            var t;
            return function () {
                var i, n, r, s;
                for (s = [], i = 0, n = (r = this.files).length; i < n; i++) (t = r[i]).xhr === e && s.push(t);
                return s
            }.call(this)
        }, s.prototype.cancelUpload = function (e) {
            var t, i, n, r, o, l, a;
            if (e.status === s.UPLOADING) {
                for (n = 0, o = (i = this._getFilesWithXhr(e.xhr)).length; n < o; n++) (t = i[n]).status = s.CANCELED;
                for (e.xhr.abort(), r = 0, l = i.length; r < l; r++) t = i[r], this.emit("canceled", t);
                this.options.uploadMultiple && this.emit("canceledmultiple", i)
            } else (a = e.status) !== s.ADDED && a !== s.QUEUED || (e.status = s.CANCELED, this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [e]));
            if (this.options.autoProcessQueue) return this.processQueue()
        }, r = function () {
            var e, t;
            return t = arguments[0], e = 2 <= arguments.length ? u.call(arguments, 1) : [], "function" == typeof t ? t.apply(this, e) : t
        }, s.prototype.uploadFile = function (e) {
            return this.uploadFiles([e])
        }, s.prototype.uploadFiles = function (e) {
            var t, i, o, l, a, u, p, c, d, h, m, f, g, v, y, F, w, b, E, z, k, C, x, L, A, T, S, M, _, D, I, U, R, N, P,
                O, q;
            for (O = new XMLHttpRequest, g = 0, w = e.length; g < w; g++) (o = e[g]).xhr = O;
            for (u in C = r(this.options.method, e), N = r(this.options.url, e), O.open(C, N, !0), O.timeout = r(this.options.timeout, e), O.withCredentials = !!this.options.withCredentials, I = null, q = this, a = function () {
                var t, i, n;
                for (n = [], t = 0, i = e.length; t < i; t++) o = e[t], n.push(q._errorProcessing(e, I || q.options.dictResponseError.replace("{{statusCode}}", O.status), O));
                return n
            }, R = function (t) {
                return function (i) {
                    var n, r, s, l, a, u, p, c, d;
                    if (null != i) for (c = 100 * i.loaded / i.total, r = 0, l = e.length; r < l; r++) (o = e[r]).upload = {
                progress: c,
                total: i.total,
                bytesSent: i.loaded
            }; else {
                        for (n = !0, c = 100, s = 0, a = e.length; s < a; s++) 100 === (o = e[s]).upload.progress && o.upload.bytesSent === o.upload.total || (n = !1), o.upload.progress = c, o.upload.bytesSent = o.upload.total;
                        if (n) return
            }
                    for (d = [], p = 0, u = e.length; p < u; p++) o = e[p], d.push(t.emit("uploadprogress", o, c, o.upload.bytesSent));
                    return d
            }
            }(this), O.onload = function (t) {
                return function (i) {
                    var n, r;
                    if (e[0].status !== s.CANCELED && 4 === O.readyState) {
                        if (I = O.responseText, O.getResponseHeader("content-type") && ~O.getResponseHeader("content-type").indexOf("application/json")) try {
                            I = JSON.parse(I)
            } catch (n) {
                            i = n, I = "Invalid JSON response from server."
            }
                        return R(), 200 <= (r = O.status) && r < 300 ? t._finished(e, I, i) : a()
            }
            }
            }(this), O.onerror = function () {
                if (e[0].status !== s.CANCELED) return a()
            }, (null != (A = O.upload) ? A : O).onprogress = R, c = {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            }, this.options.headers && n(c, this.options.headers), c) (p = c[u]) && O.setRequestHeader(u, p);
            if (l = new FormData, this.options.params) for (y in T = this.options.params) P = T[y], l.append(y, P);
            for (v = 0, b = e.length; v < b; v++) o = e[v], this.emit("sending", o, O, l);
            if (this.options.uploadMultiple && this.emit("sendingmultiple", e, O, l), "FORM" === this.element.tagName) for (F = 0, E = (S = this.element.querySelectorAll("input, textarea, select, button")).length; F < E; F++) if (m = (h = S[F]).getAttribute("name"), f = h.getAttribute("type"), "SELECT" === h.tagName && h.hasAttribute("multiple")) for (k = 0, z = (M = h.options).length; k < z; k++) (L = M[k]).selected && l.append(m, L.value); else (!f || "checkbox" !== (_ = f.toLowerCase()) && "radio" !== _ || h.checked) && l.append(m, h.value);
            for (t = 0, U = [], d = x = 0, D = e.length - 1; 0 <= D ? x <= D : x >= D; d = 0 <= D ? ++x : --x) i = function (i) {
                return function (n, r, s) {
                    return function (n) {
                        if (l.append(r, n, s), ++t === e.length) return i.submitRequest(O, l, e)
                    }
                }
            }(this), U.push(this.options.transformFile.call(this, e[d], i(e[d], this._getParamName(d), e[d].upload.filename)));
            return U
        }, s.prototype.submitRequest = function (e, t, i) {
            return e.send(t)
        }, s.prototype._finished = function (e, t, i) {
            var n, r, o;
            for (r = 0, o = e.length; r < o; r++) (n = e[r]).status = s.SUCCESS, this.emit("success", n, t, i), this.emit("complete", n);
            if (this.options.uploadMultiple && (this.emit("successmultiple", e, t, i), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue()
        }, s.prototype._errorProcessing = function (e, t, i) {
            var n, r, o;
            for (r = 0, o = e.length; r < o; r++) (n = e[r]).status = s.ERROR, this.emit("error", n, t, i), this.emit("complete", n);
            if (this.options.uploadMultiple && (this.emit("errormultiple", e, t, i), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue()
        }, s
    }()).version = "5.1.0", e.options = {}, e.optionsForElement = function (t) {
        return t.getAttribute("id") ? e.options[n(t.getAttribute("id"))] : void 0
    }, e.instances = [], e.forElement = function (e) {
        if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return e.dropzone
    }, e.autoDiscover = !1, e.discover = function () {
        var t, i, n, r, s, o;
        for (document.querySelectorAll ? n = document.querySelectorAll(".dropzone") : (n = [], (t = function (e) {
            var t, i, r, s;
            for (s = [], i = 0, r = e.length; i < r; i++) t = e[i], /(^| )dropzone($| )/.test(t.className) ? s.push(n.push(t)) : s.push(void 0);
            return s
        })(document.getElementsByTagName("div")), t(document.getElementsByTagName("form"))), o = [], r = 0, s = n.length; r < s; r++) i = n[r], !1 !== e.optionsForElement(i) ? o.push(new e(i)) : o.push(void 0);
        return o
    }, e.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], e.isBrowserSupported = function () {
        var t, i, n, r;
        if (t = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) if ("classList" in document.createElement("a")) for (i = 0, n = (r = e.blacklistedBrowsers).length; i < n; i++) r[i].test(navigator.userAgent) && (t = !1); else t = !1; else t = !1;
        return t
    }, e.dataURItoBlob = function (e) {
        var t, i, n, r, s, o, l;
        for (i = atob(e.split(",")[1]), o = e.split(",")[0].split(":")[1].split(";")[0], t = new ArrayBuffer(i.length), r = new Uint8Array(t), n = s = 0, l = i.length; 0 <= l ? s <= l : s >= l; n = 0 <= l ? ++s : --s) r[n] = i.charCodeAt(n);
        return new Blob([t], { type: o })
    }, a = function (e, t) {
        var i, n, r, s;
        for (s = [], n = 0, r = e.length; n < r; n++) (i = e[n]) !== t && s.push(i);
        return s
    }, n = function (e) {
        return e.replace(/[\-_](\w)/g, function (e) {
            return e.charAt(1).toUpperCase()
        })
    }, e.createElement = function (e) {
        var t;
        return (t = document.createElement("div")).innerHTML = e, t.childNodes[0]
    }, e.elementInside = function (e, t) {
        if (e === t) return !0;
        for (; e = e.parentNode;) if (e === t) return !0;
        return !1
    }, e.getElement = function (e, t) {
        var i;
        if ("string" == typeof e ? i = document.querySelector(e) : null != e.nodeType && (i = e), null == i) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return i
    }, e.getElements = function (e, t) {
        var i, n, r, s, o, l, a, u;
        if (e instanceof Array) {
            n = [];
            try {
                for (s = 0, l = e.length; s < l; s++) i = e[s], n.push(this.getElement(i, t))
            } catch (r) {
                r, n = null
            }
        } else if ("string" == typeof e) for (n = [], o = 0, a = (u = document.querySelectorAll(e)).length; o < a; o++) i = u[o], n.push(i); else null != e.nodeType && (n = [e]);
        if (null == n || !n.length) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return n
    }, e.confirm = function (e, t, i) {
        return window.confirm(e) ? t() : null != i ? i() : void 0
    }, e.isValidFile = function (e, t) {
        var i, n, r, s, o;
        if (!t) return !0;
        for (t = t.split(","), i = (s = e.type).replace(/\/.*$/, ""), n = 0, r = t.length; n < r; n++) if ("." === (o = (o = t[n]).trim()).charAt(0)) {
            if (-1 !== e.name.toLowerCase().indexOf(o.toLowerCase(), e.name.length - o.length)) return !0
        } else if (/\/\*$/.test(o)) {
            if (i === o.replace(/\/.*$/, "")) return !0
        } else if (s === o) return !0;
        return !1
    }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (t) {
        return this.each(function () {
            return new e(this, t)
        })
    }), "undefined" != typeof module && null !== module ? module.exports = e : window.Dropzone = e, e.ADDED = "added", e.QUEUED = "queued", e.ACCEPTED = e.QUEUED, e.UPLOADING = "uploading", e.PROCESSING = e.UPLOADING, e.CANCELED = "canceled", e.ERROR = "error", e.SUCCESS = "success", s = function (e) {
        var t, i, n, r, s, o, l, a;
        for (e.naturalWidth, s = e.naturalHeight, (t = document.createElement("canvas")).width = 1, t.height = s, (i = t.getContext("2d")).drawImage(e, 0, 0), n = i.getImageData(1, 0, 1, s).data, a = 0, r = s, o = s; o > a;) 0 === n[4 * (o - 1) + 3] ? r = o : a = o, o = r + a >> 1;
        return 0 === (l = o / s) ? 1 : l
    }, o = function (e, t, i, n, r, o, l, a, u, p) {
        var c;
        return c = s(t), e.drawImage(t, i, n, r, o, l, a, u, p / c)
    }, i = function () {
        function e() {
        }

        return e.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", e.encode64 = function (e) {
            var t, i, n, r, s, o, l, a, u;
            for (u = "", t = void 0, i = void 0, n = "", r = void 0, s = void 0, o = void 0, l = "", a = 0; r = (t = e[a++]) >> 2, s = (3 & t) << 4 | (i = e[a++]) >> 4, o = (15 & i) << 2 | (n = e[a++]) >> 6, l = 63 & n, isNaN(i) ? o = l = 64 : isNaN(n) && (l = 64), u = u + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(s) + this.KEY_STR.charAt(o) + this.KEY_STR.charAt(l), t = i = n = "", r = s = o = l = "", a < e.length;);
            return u
        }, e.restore = function (e, t) {
            var i, n, r;
            return e.match("data:image/jpeg;base64,") ? (n = this.decode64(e.replace("data:image/jpeg;base64,", "")), r = this.slice2Segments(n), i = this.exifManipulation(t, r), "data:image/jpeg;base64," + this.encode64(i)) : t
        }, e.exifManipulation = function (e, t) {
            var i, n;
            return i = this.getExifArray(t), n = this.insertExif(e, i), new Uint8Array(n)
        }, e.getExifArray = function (e) {
            var t, i;
            for (t = void 0, i = 0; i < e.length;) {
                if (255 === (t = e[i])[0] & 225 === t[1]) return t;
                i++
            }
            return []
        }, e.insertExif = function (e, t) {
            var i, n, r, s, o;
            return r = e.replace("data:image/jpeg;base64,", ""), o = (n = this.decode64(r)).indexOf(255, 3), s = n.slice(0, o), i = n.slice(o), s.concat(t).concat(i)
        }, e.slice2Segments = function (e) {
            var t, i, n, r;
            for (i = 0, r = []; !(255 === e[i] & 218 === e[i + 1] || (255 === e[i] & 216 === e[i + 1] ? i += 2 : (t = i + (256 * e[i + 2] + e[i + 3]) + 2, n = e.slice(i, t), r.push(n), i = t), i > e.length)) ;);
            return r
        }, e.decode64 = function (e) {
            var t, i, n, r, s, o, l, a;
            for ("", i = void 0, n = void 0, r = "", void 0, s = void 0, o = void 0, l = "", a = 0, t = [], /[^A-Za-z0-9\+\/\=]/g.exec(e) && console.warning("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "") ; i = this.KEY_STR.indexOf(e.charAt(a++)) << 2 | (s = this.KEY_STR.indexOf(e.charAt(a++))) >> 4, n = (15 & s) << 4 | (o = this.KEY_STR.indexOf(e.charAt(a++))) >> 2, r = (3 & o) << 6 | (l = this.KEY_STR.indexOf(e.charAt(a++))), t.push(i), 64 !== o && t.push(n), 64 !== l && t.push(r), i = n = r = "", s = o = l = "", a < e.length;);
            return t
        }, e
    }(), r = function (e, t) {
        var i, n, r, s, o, l, a, u, p;
        if (r = !1, p = !0, n = e.document, u = n.documentElement, i = n.addEventListener ? "addEventListener" : "attachEvent", a = n.addEventListener ? "removeEventListener" : "detachEvent", l = n.addEventListener ? "" : "on", s = function (i) {
            if ("readystatechange" !== i.type || "complete" === n.readyState) return ("load" === i.type ? e : n)[a](l + i.type, s, !1), !r && (r = !0) ? t.call(e, i.type || i) : void 0
        }, o = function () {
            var e;
            try {
                u.doScroll("left")
        } catch (e) {
                return e, void setTimeout(o, 50)
        }
            return s("poll")
        }, "complete" !== n.readyState) {
            if (n.createEventObject && u.doScroll) {
                try {
                    p = !e.frameElement
                } catch (e) {
                }
                p && o()
            }
            return n[i](l + "DOMContentLoaded", s, !1), n[i](l + "readystatechange", s, !1), e[i](l + "load", s, !1)
        }
    }, e._autoDiscoverFunction = function () {
        if (e.autoDiscover) return e.discover()
    }, r(window, e._autoDiscoverFunction)
}).call(this);
