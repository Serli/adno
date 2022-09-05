//! openseadragon 3.1.0
//! Built on 2022-06-07
//! Git commit: v3.1.0-0-ee3fc2b
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/
function OpenSeadragon(e) {
    return new OpenSeadragon.Viewer(e);
}
_c = OpenSeadragon;
!function(n) {
    n.version = {
        versionStr: "3.1.0",
        major: parseInt("3", 10),
        minor: parseInt("1", 10),
        revision: parseInt("0", 10)
    };
    var t = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object"
    }, i = Object.prototype.toString, o = Object.prototype.hasOwnProperty;
    n.isFunction = function(e) {
        return "function" === n.type(e);
    };
    n.isArray = Array.isArray || function(e) {
        return "array" === n.type(e);
    };
    n.isWindow = function(e) {
        return e && "object" == typeof e && "setInterval" in e;
    };
    n.type = function(e) {
        return null == e ? String(e) : t[i.call(e)] || "object";
    };
    n.isPlainObject = function(e) {
        if (!e || "object" !== OpenSeadragon.type(e) || e.nodeType || n.isWindow(e)) return !1;
        if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        var t;
        for(var i in e)t = i;
        return void 0 === t || o.call(e, t);
    };
    n.isEmptyObject = function(e) {
        for(var t in e)return !1;
        return !0;
    };
    n.freezeObject = function(e) {
        Object.freeze ? n.freezeObject = Object.freeze : n.freezeObject = function(e) {
            return e;
        };
        return n.freezeObject(e);
    };
    n.supportsCanvas = (e = document.createElement("canvas"), !(!n.isFunction(e.getContext) || !e.getContext("2d")));
    var e;
    n.isCanvasTainted = function(e) {
        var t = !1;
        try {
            e.getContext("2d").getImageData(0, 0, 1, 1);
        } catch (e1) {
            t = !0;
        }
        return t;
    };
    n.supportsAddEventListener = !(!document.documentElement.addEventListener || !document.addEventListener);
    n.supportsRemoveEventListener = !(!document.documentElement.removeEventListener || !document.removeEventListener);
    n.supportsEventListenerOptions = function() {
        var t = 0;
        if (n.supportsAddEventListener) try {
            var e = {
                get capture () {
                    t++;
                    return !1;
                },
                get once () {
                    t++;
                    return !1;
                },
                get passive () {
                    t++;
                    return !1;
                }
            };
            window.addEventListener("test", null, e);
            window.removeEventListener("test", null, e);
        } catch (e1) {
            t = 0;
        }
        return 3 <= t;
    }();
    n.getCurrentPixelDensityRatio = function() {
        if (n.supportsCanvas) {
            var e = document.createElement("canvas").getContext("2d");
            var t = window.devicePixelRatio || 1;
            e = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
            return Math.max(t, 1) / e;
        }
        return 1;
    };
    n.pixelDensityRatio = n.getCurrentPixelDensityRatio();
}(OpenSeadragon);
!function(u) {
    u.extend = function() {
        var e, t, i, n, o, r, s = arguments[0] || {}, a = arguments.length, l = !1, h = 1;
        if ("boolean" == typeof s) {
            l = s;
            s = arguments[1] || {};
            h = 2;
        }
        "object" == typeof s || OpenSeadragon.isFunction(s) || (s = {});
        if (a === h) {
            s = this;
            --h;
        }
        for(; h < a; h++)if (null !== (e = arguments[h]) || void 0 !== e) for(t in e){
            i = s[t];
            if (s !== (n = e[t])) {
                if (l && n && (OpenSeadragon.isPlainObject(n) || (o = OpenSeadragon.isArray(n)))) {
                    if (o) {
                        o = !1;
                        r = i && OpenSeadragon.isArray(i) ? i : [];
                    } else r = i && OpenSeadragon.isPlainObject(i) ? i : {};
                    s[t] = OpenSeadragon.extend(l, r, n);
                } else void 0 !== n && (s[t] = n);
            }
        }
        return s;
    };
    u.extend(u, {
        DEFAULT_SETTINGS: {
            xmlPath: null,
            tileSources: null,
            tileHost: null,
            initialPage: 0,
            crossOriginPolicy: !1,
            ajaxWithCredentials: !1,
            loadTilesWithAjax: !1,
            ajaxHeaders: {},
            splitHashDataForPost: !1,
            panHorizontal: !0,
            panVertical: !0,
            constrainDuringPan: !1,
            wrapHorizontal: !1,
            wrapVertical: !1,
            visibilityRatio: .5,
            minPixelRatio: .5,
            defaultZoomLevel: 0,
            minZoomLevel: null,
            maxZoomLevel: null,
            homeFillsViewer: !1,
            clickTimeThreshold: 300,
            clickDistThreshold: 5,
            dblClickTimeThreshold: 300,
            dblClickDistThreshold: 20,
            springStiffness: 6.5,
            animationTime: 1.2,
            gestureSettingsMouse: {
                dragToPan: !0,
                scrollToZoom: !0,
                clickToZoom: !0,
                dblClickToZoom: !1,
                pinchToZoom: !1,
                zoomToRefPoint: !0,
                flickEnabled: !1,
                flickMinSpeed: 120,
                flickMomentum: .25,
                pinchRotate: !1
            },
            gestureSettingsTouch: {
                dragToPan: !0,
                scrollToZoom: !1,
                clickToZoom: !1,
                dblClickToZoom: !0,
                pinchToZoom: !0,
                zoomToRefPoint: !0,
                flickEnabled: !0,
                flickMinSpeed: 120,
                flickMomentum: .25,
                pinchRotate: !1
            },
            gestureSettingsPen: {
                dragToPan: !0,
                scrollToZoom: !1,
                clickToZoom: !0,
                dblClickToZoom: !1,
                pinchToZoom: !1,
                zoomToRefPoint: !0,
                flickEnabled: !1,
                flickMinSpeed: 120,
                flickMomentum: .25,
                pinchRotate: !1
            },
            gestureSettingsUnknown: {
                dragToPan: !0,
                scrollToZoom: !1,
                clickToZoom: !1,
                dblClickToZoom: !0,
                pinchToZoom: !0,
                zoomToRefPoint: !0,
                flickEnabled: !0,
                flickMinSpeed: 120,
                flickMomentum: .25,
                pinchRotate: !1
            },
            zoomPerClick: 2,
            zoomPerScroll: 1.2,
            zoomPerSecond: 1,
            blendTime: 0,
            alwaysBlend: !1,
            autoHideControls: !0,
            immediateRender: !1,
            minZoomImageRatio: .9,
            maxZoomPixelRatio: 1.1,
            smoothTileEdgesMinZoom: 1.1,
            iOSDevice: function() {
                if ("object" != typeof navigator) return !1;
                var e = navigator.userAgent;
                return "string" == typeof e && (-1 !== e.indexOf("iPhone") || -1 !== e.indexOf("iPad") || -1 !== e.indexOf("iPod"));
            }(),
            pixelsPerWheelLine: 40,
            pixelsPerArrowPress: 40,
            autoResize: !0,
            preserveImageSizeOnResize: !1,
            minScrollDeltaTime: 50,
            rotationIncrement: 90,
            showSequenceControl: !0,
            sequenceControlAnchor: null,
            preserveViewport: !1,
            preserveOverlays: !1,
            navPrevNextWrap: !1,
            showNavigationControl: !0,
            navigationControlAnchor: null,
            showZoomControl: !0,
            showHomeControl: !0,
            showFullPageControl: !0,
            showRotationControl: !1,
            showFlipControl: !1,
            controlsFadeDelay: 2e3,
            controlsFadeLength: 1500,
            mouseNavEnabled: !0,
            showNavigator: !1,
            navigatorId: null,
            navigatorPosition: null,
            navigatorSizeRatio: .2,
            navigatorMaintainSizeRatio: !1,
            navigatorTop: null,
            navigatorLeft: null,
            navigatorHeight: null,
            navigatorWidth: null,
            navigatorAutoResize: !0,
            navigatorAutoFade: !0,
            navigatorRotate: !0,
            navigatorBackground: "#000",
            navigatorOpacity: .8,
            navigatorBorderColor: "#555",
            navigatorDisplayRegionColor: "#900",
            degrees: 0,
            flipped: !1,
            opacity: 1,
            preload: !1,
            compositeOperation: null,
            imageSmoothingEnabled: !0,
            placeholderFillStyle: null,
            subPixelRoundingForTransparency: null,
            showReferenceStrip: !1,
            referenceStripScroll: "horizontal",
            referenceStripElement: null,
            referenceStripHeight: null,
            referenceStripWidth: null,
            referenceStripPosition: "BOTTOM_LEFT",
            referenceStripSizeRatio: .2,
            collectionRows: 3,
            collectionColumns: 0,
            collectionLayout: "horizontal",
            collectionMode: !1,
            collectionTileSize: 800,
            collectionTileMargin: 80,
            imageLoaderLimit: 0,
            maxImageCacheCount: 200,
            timeout: 3e4,
            useCanvas: !0,
            prefixUrl: "/images/",
            navImages: {
                zoomIn: {
                    REST: "zoomin_rest.png",
                    GROUP: "zoomin_grouphover.png",
                    HOVER: "zoomin_hover.png",
                    DOWN: "zoomin_pressed.png"
                },
                zoomOut: {
                    REST: "zoomout_rest.png",
                    GROUP: "zoomout_grouphover.png",
                    HOVER: "zoomout_hover.png",
                    DOWN: "zoomout_pressed.png"
                },
                home: {
                    REST: "home_rest.png",
                    GROUP: "home_grouphover.png",
                    HOVER: "home_hover.png",
                    DOWN: "home_pressed.png"
                },
                fullpage: {
                    REST: "fullpage_rest.png",
                    GROUP: "fullpage_grouphover.png",
                    HOVER: "fullpage_hover.png",
                    DOWN: "fullpage_pressed.png"
                },
                rotateleft: {
                    REST: "rotateleft_rest.png",
                    GROUP: "rotateleft_grouphover.png",
                    HOVER: "rotateleft_hover.png",
                    DOWN: "rotateleft_pressed.png"
                },
                rotateright: {
                    REST: "rotateright_rest.png",
                    GROUP: "rotateright_grouphover.png",
                    HOVER: "rotateright_hover.png",
                    DOWN: "rotateright_pressed.png"
                },
                flip: {
                    REST: "flip_rest.png",
                    GROUP: "flip_grouphover.png",
                    HOVER: "flip_hover.png",
                    DOWN: "flip_pressed.png"
                },
                previous: {
                    REST: "previous_rest.png",
                    GROUP: "previous_grouphover.png",
                    HOVER: "previous_hover.png",
                    DOWN: "previous_pressed.png"
                },
                next: {
                    REST: "next_rest.png",
                    GROUP: "next_grouphover.png",
                    HOVER: "next_hover.png",
                    DOWN: "next_pressed.png"
                }
            },
            debugMode: !1,
            debugGridColor: [
                "#437AB2",
                "#1B9E77",
                "#D95F02",
                "#7570B3",
                "#E7298A",
                "#66A61E",
                "#E6AB02",
                "#A6761D",
                "#666666"
            ],
            silenceMultiImageWarnings: !1
        },
        SIGNAL: "----seadragon----",
        delegate: function(t, i) {
            return function() {
                var e = arguments;
                return i.apply(t, e = void 0 === e ? [] : e);
            };
        },
        BROWSERS: {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5,
            EDGE: 6,
            CHROMEEDGE: 7
        },
        SUBPIXEL_ROUNDING_OCCURRENCES: {
            NEVER: 0,
            ONLY_AT_REST: 1,
            ALWAYS: 2
        },
        _viewers: new Map,
        getViewer: function(e) {
            return u._viewers.get(this.getElement(e));
        },
        getElement: function(e) {
            return e = "string" == typeof e ? document.getElementById(e) : e;
        },
        getElementPosition: function(e) {
            var t, i, n = new u.Point;
            i = o(e = u.getElement(e), t = "fixed" === u.getElementStyle(e).position);
            for(; i;){
                n.x += e.offsetLeft;
                n.y += e.offsetTop;
                t && (n = n.plus(u.getPageScroll()));
                i = o(e = i, t = "fixed" === u.getElementStyle(e).position);
            }
            return n;
        },
        getElementOffset: function(e) {
            var t, i = (e = u.getElement(e)) && e.ownerDocument, n = {
                top: 0,
                left: 0
            };
            if (!i) return new u.Point;
            t = i.documentElement;
            void 0 !== e.getBoundingClientRect && (n = e.getBoundingClientRect());
            i = i === i.window ? i : 9 === i.nodeType && (i.defaultView || i.parentWindow);
            return new u.Point(n.left + (i.pageXOffset || t.scrollLeft) - (t.clientLeft || 0), n.top + (i.pageYOffset || t.scrollTop) - (t.clientTop || 0));
        },
        getElementSize: function(e) {
            e = u.getElement(e);
            return new u.Point(e.clientWidth, e.clientHeight);
        },
        getElementStyle: document.documentElement.currentStyle ? function(e) {
            return (e = u.getElement(e)).currentStyle;
        } : function(e) {
            e = u.getElement(e);
            return window.getComputedStyle(e, "");
        },
        getCssPropertyWithVendorPrefix: function(e) {
            var a = {};
            u.getCssPropertyWithVendorPrefix = function(e) {
                if (void 0 !== a[e]) return a[e];
                var t = document.createElement("div").style;
                var i = null;
                if (void 0 !== t[e]) i = e;
                else {
                    var n = [
                        "Webkit",
                        "Moz",
                        "MS",
                        "O",
                        "webkit",
                        "moz",
                        "ms",
                        "o"
                    ];
                    var o = u.capitalizeFirstLetter(e);
                    for(var r = 0; r < n.length; r++){
                        var s = n[r] + o;
                        if (void 0 !== t[s]) {
                            i = s;
                            break;
                        }
                    }
                }
                return a[e] = i;
            };
            return u.getCssPropertyWithVendorPrefix(e);
        },
        capitalizeFirstLetter: function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        },
        positiveModulo: function(e, t) {
            e %= t;
            e < 0 && (e += t);
            return e;
        },
        pointInElement: function(e, t) {
            e = u.getElement(e);
            var i = u.getElementOffset(e), e = u.getElementSize(e);
            return t.x >= i.x && t.x < i.x + e.x && t.y < i.y + e.y && t.y >= i.y;
        },
        getMousePosition: function(e) {
            if ("number" == typeof e.pageX) u.getMousePosition = function(e) {
                var t = new u.Point;
                t.x = e.pageX;
                t.y = e.pageY;
                return t;
            };
            else {
                if ("number" != typeof e.clientX) throw new Error("Unknown event mouse position, no known technique.");
                u.getMousePosition = function(e) {
                    var t = new u.Point;
                    t.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    t.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    return t;
                };
            }
            return u.getMousePosition(e);
        },
        getPageScroll: function() {
            var e = document.documentElement || {}, t = document.body || {};
            if ("number" == typeof window.pageXOffset) u.getPageScroll = function() {
                return new u.Point(window.pageXOffset, window.pageYOffset);
            };
            else if (t.scrollLeft || t.scrollTop) u.getPageScroll = function() {
                return new u.Point(document.body.scrollLeft, document.body.scrollTop);
            };
            else {
                if (!e.scrollLeft && !e.scrollTop) return new u.Point(0, 0);
                u.getPageScroll = function() {
                    return new u.Point(document.documentElement.scrollLeft, document.documentElement.scrollTop);
                };
            }
            return u.getPageScroll();
        },
        setPageScroll: function(e) {
            if (void 0 !== window.scrollTo) u.setPageScroll = function(e) {
                window.scrollTo(e.x, e.y);
            };
            else {
                var t = u.getPageScroll();
                if (t.x === e.x && t.y === e.y) return;
                document.body.scrollLeft = e.x;
                document.body.scrollTop = e.y;
                var i = u.getPageScroll();
                if (i.x !== t.x && i.y !== t.y) {
                    u.setPageScroll = function(e) {
                        document.body.scrollLeft = e.x;
                        document.body.scrollTop = e.y;
                    };
                    return;
                }
                document.documentElement.scrollLeft = e.x;
                document.documentElement.scrollTop = e.y;
                if ((i = u.getPageScroll()).x !== t.x && i.y !== t.y) {
                    u.setPageScroll = function(e) {
                        document.documentElement.scrollLeft = e.x;
                        document.documentElement.scrollTop = e.y;
                    };
                    return;
                }
                u.setPageScroll = function(e) {};
            }
            u.setPageScroll(e);
        },
        getWindowSize: function() {
            var e = document.documentElement || {}, t = document.body || {};
            if ("number" == typeof window.innerWidth) u.getWindowSize = function() {
                return new u.Point(window.innerWidth, window.innerHeight);
            };
            else if (e.clientWidth || e.clientHeight) u.getWindowSize = function() {
                return new u.Point(document.documentElement.clientWidth, document.documentElement.clientHeight);
            };
            else {
                if (!t.clientWidth && !t.clientHeight) throw new Error("Unknown window size, no known technique.");
                u.getWindowSize = function() {
                    return new u.Point(document.body.clientWidth, document.body.clientHeight);
                };
            }
            return u.getWindowSize();
        },
        makeCenteredNode: function(e) {
            e = u.getElement(e);
            var t = [
                u.makeNeutralElement("div"),
                u.makeNeutralElement("div"),
                u.makeNeutralElement("div")
            ];
            u.extend(t[0].style, {
                display: "table",
                height: "100%",
                width: "100%"
            });
            u.extend(t[1].style, {
                display: "table-row"
            });
            u.extend(t[2].style, {
                display: "table-cell",
                verticalAlign: "middle",
                textAlign: "center"
            });
            t[0].appendChild(t[1]);
            t[1].appendChild(t[2]);
            t[2].appendChild(e);
            return t[0];
        },
        makeNeutralElement: function(e) {
            var t = document.createElement(e), e = t.style;
            e.background = "transparent none";
            e.border = "none";
            e.margin = "0px";
            e.padding = "0px";
            e.position = "static";
            return t;
        },
        now: function() {
            Date.now ? u.now = Date.now : u.now = function() {
                return (new Date).getTime();
            };
            return u.now();
        },
        makeTransparentImage: function(e) {
            var t = u.makeNeutralElement("img");
            t.src = e;
            return t;
        },
        setElementOpacity: function(e, t, i) {
            e = u.getElement(e);
            i && !u.Browser.alpha && (t = Math.round(t));
            if (u.Browser.opacity) e.style.opacity = t < 1 ? t : "";
            else if (t < 1) {
                t = Math.round(100 * t);
                e.style.filter = "alpha(opacity=" + t + ")";
            } else e.style.filter = "";
        },
        setElementTouchActionNone: function(e) {
            void 0 !== (e = u.getElement(e)).style.touchAction ? e.style.touchAction = "none" : void 0 !== e.style.msTouchAction && (e.style.msTouchAction = "none");
        },
        setElementPointerEvents: function(e, t) {
            void 0 !== (e = u.getElement(e)).style && void 0 !== e.style.pointerEvents && (e.style.pointerEvents = t);
        },
        setElementPointerEventsNone: function(e) {
            u.setElementPointerEvents(e, "none");
        },
        addClass: function(e, t) {
            (e = u.getElement(e)).className ? -1 === (" " + e.className + " ").indexOf(" " + t + " ") && (e.className += " " + t) : e.className = t;
        },
        indexOf: function(e, t, i) {
            Array.prototype.indexOf ? this.indexOf = function(e, t, i) {
                return e.indexOf(t, i);
            } : this.indexOf = function(e, t, i) {
                var n, o, i = i || 0;
                if (!e) throw new TypeError;
                if (0 === (o = e.length) || o <= i) return -1;
                for(n = i = i < 0 ? o - Math.abs(i) : i; n < o; n++)if (e[n] === t) return n;
                return -1;
            };
            return this.indexOf(e, t, i);
        },
        removeClass: function(e, t) {
            var i, n, o = [];
            i = (e = u.getElement(e)).className.split(/\s+/);
            for(n = 0; n < i.length; n++)i[n] && i[n] !== t && o.push(i[n]);
            e.className = o.join(" ");
        },
        normalizeEventListenerOptions: function(e) {
            return void 0 !== e ? "boolean" == typeof e ? u.supportsEventListenerOptions ? {
                capture: e
            } : e : u.supportsEventListenerOptions ? e : void 0 !== e.capture && e.capture : !!u.supportsEventListenerOptions && {
                capture: !1
            };
        },
        addEvent: function() {
            if (u.supportsAddEventListener) return function(e, t, i, n) {
                n = u.normalizeEventListenerOptions(n);
                (e = u.getElement(e)).addEventListener(t, i, n);
            };
            if (document.documentElement.attachEvent && document.attachEvent) return function(e, t, i) {
                (e = u.getElement(e)).attachEvent("on" + t, i);
            };
            throw new Error("No known event model.");
        }(),
        removeEvent: function() {
            if (u.supportsRemoveEventListener) return function(e, t, i, n) {
                n = u.normalizeEventListenerOptions(n);
                (e = u.getElement(e)).removeEventListener(t, i, n);
            };
            if (document.documentElement.detachEvent && document.detachEvent) return function(e, t, i) {
                (e = u.getElement(e)).detachEvent("on" + t, i);
            };
            throw new Error("No known event model.");
        }(),
        cancelEvent: function(e) {
            e.preventDefault();
        },
        eventIsCanceled: function(e) {
            return e.defaultPrevented;
        },
        stopEvent: function(e) {
            e.stopPropagation();
        },
        createCallback: function(i, n) {
            var e, o = [];
            for(e = 2; e < arguments.length; e++)o.push(arguments[e]);
            return function() {
                var e, t = o.concat([]);
                for(e = 0; e < arguments.length; e++)t.push(arguments[e]);
                return n.apply(i, t);
            };
        },
        getUrlParameter: function(e) {
            e = a[e];
            return e || null;
        },
        getUrlProtocol: function(e) {
            e = e.match(/^([a-z]+:)\/\//i);
            return null === e ? window.location.protocol : e[1].toLowerCase();
        },
        createAjaxRequest: function(e) {
            var t;
            try {
                t = (new ActiveXObject("Microsoft.XMLHTTP"), true);
            } catch (e1) {
                t = !1;
            }
            if (t) window.XMLHttpRequest ? u.createAjaxRequest = function(e) {
                return e ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
            } : u.createAjaxRequest = function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            };
            else {
                if (!window.XMLHttpRequest) throw new Error("Browser doesn't support XMLHttpRequest.");
                u.createAjaxRequest = function() {
                    return new XMLHttpRequest;
                };
            }
            return u.createAjaxRequest(e);
        },
        makeAjaxRequest: function(e, t, i) {
            var n;
            var o;
            var r;
            var s;
            if (u.isPlainObject(e)) {
                t = e.success;
                i = e.error;
                n = e.withCredentials;
                o = e.headers;
                r = e.responseType || null;
                s = e.postData || null;
                e = e.url;
            }
            var a = u.getUrlProtocol(e);
            var l = u.createAjaxRequest("file:" === a);
            if (!u.isFunction(t)) throw new Error("makeAjaxRequest requires a success callback");
            l.onreadystatechange = function() {
                if (4 === l.readyState) {
                    l.onreadystatechange = function() {};
                    200 <= l.status && l.status < 300 || 0 === l.status && "http:" !== a && "https:" !== a ? t(l) : u.isFunction(i) ? i(l) : u.console.error("AJAX request returned %d: %s", l.status, e);
                }
            };
            var h = s ? "POST" : "GET";
            try {
                l.open(h, e, !0);
                r && (l.responseType = r);
                if (o) for(var c in o)Object.prototype.hasOwnProperty.call(o, c) && o[c] && l.setRequestHeader(c, o[c]);
                n && (l.withCredentials = !0);
                l.send(s);
            } catch (e1) {
                u.console.error("%s while making AJAX request: %s", e1.name, e1.message);
                l.onreadystatechange = function() {};
                u.isFunction(i) && i(l, e1);
            }
            return l;
        },
        jsonp: function(e) {
            var i, t = e.url, n = document.head || document.getElementsByTagName("head")[0] || document.documentElement, o = e.callbackName || "openseadragon" + u.now(), r = window[o], s = e.param || "callback", a = e.callback;
            t = t.replace(/(=)\?(&|$)|\?\?/i, "$1" + o + "$2");
            t += (/\?/.test(t) ? "&" : "?") + s + "=" + o;
            window[o] = function(e) {
                if (r) window[o] = r;
                else try {
                    delete window[o];
                } catch (e1) {}
                a && u.isFunction(a) && a(e);
            };
            i = document.createElement("script");
            void 0 === e.async && !1 === e.async || (i.async = "async");
            e.scriptCharset && (i.charset = e.scriptCharset);
            i.src = t;
            i.onload = i.onreadystatechange = function(e, t) {
                if (t || !i.readyState || /loaded|complete/.test(i.readyState)) {
                    i.onload = i.onreadystatechange = null;
                    n && i.parentNode && n.removeChild(i);
                    i = void 0;
                }
            };
            n.insertBefore(i, n.firstChild);
        },
        createFromDZI: function() {
            throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
        },
        parseXml: function(e) {
            if (window.DOMParser) u.parseXml = function(e) {
                return (new DOMParser).parseFromString(e, "text/xml");
            };
            else {
                if (!window.ActiveXObject) throw new Error("Browser doesn't support XML DOM.");
                u.parseXml = function(e) {
                    var t = null;
                    (t = new ActiveXObject("Microsoft.XMLDOM")).async = !1;
                    t.loadXML(e);
                    return t;
                };
            }
            return u.parseXml(e);
        },
        parseJSON: function(e) {
            u.parseJSON = window.JSON.parse;
            return u.parseJSON(e);
        },
        imageFormatSupported: function(e) {
            return !!t[(e = e || "").toLowerCase()];
        },
        setImageFormatsSupported: function(e) {
            u.extend(t, e);
        }
    });
    function e(e) {}
    u.console = window.console || {
        log: e,
        debug: e,
        info: e,
        warn: e,
        error: e,
        assert: e
    };
    var t = {
        bmp: (u.Browser = {
            vendor: u.BROWSERS.UNKNOWN,
            version: 0,
            alpha: !0
        }, false),
        jpeg: !0,
        jpg: !0,
        png: !0,
        tif: !1,
        wdp: !1
    }, a = {};
    !function() {
        var e = navigator.appVersion, t = navigator.userAgent;
        switch(navigator.appName){
            case "Microsoft Internet Explorer":
                if (window.attachEvent && window.ActiveXObject) {
                    u.Browser.vendor = u.BROWSERS.IE;
                    u.Browser.version = parseFloat(t.substring(t.indexOf("MSIE") + 5, t.indexOf(";", t.indexOf("MSIE"))));
                }
                break;
            case "Netscape":
                if (window.addEventListener) {
                    if (0 <= t.indexOf("Edge")) {
                        u.Browser.vendor = u.BROWSERS.EDGE;
                        u.Browser.version = parseFloat(t.substring(t.indexOf("Edge") + 5));
                    } else if (0 <= t.indexOf("Edg")) {
                        u.Browser.vendor = u.BROWSERS.CHROMEEDGE;
                        u.Browser.version = parseFloat(t.substring(t.indexOf("Edg") + 4));
                    } else if (0 <= t.indexOf("Firefox")) {
                        u.Browser.vendor = u.BROWSERS.FIREFOX;
                        u.Browser.version = parseFloat(t.substring(t.indexOf("Firefox") + 8));
                    } else if (0 <= t.indexOf("Safari")) {
                        u.Browser.vendor = 0 <= t.indexOf("Chrome") ? u.BROWSERS.CHROME : u.BROWSERS.SAFARI;
                        u.Browser.version = parseFloat(t.substring(t.substring(0, t.indexOf("Safari")).lastIndexOf("/") + 1, t.indexOf("Safari")));
                    } else if (null !== new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(t)) {
                        u.Browser.vendor = u.BROWSERS.IE;
                        u.Browser.version = parseFloat(RegExp.$1);
                    }
                }
                break;
            case "Opera":
                u.Browser.vendor = u.BROWSERS.OPERA;
                u.Browser.version = parseFloat(e);
        }
        var i, n, o = window.location.search.substring(1).split("&");
        for(n = 0; n < o.length; n++)if (0 < (s = (i = o[n]).indexOf("="))) {
            var r = i.substring(0, s), s = i.substring(s + 1);
            try {
                a[r] = decodeURIComponent(s);
            } catch (e1) {
                u.console.error("Ignoring malformed URL parameter: %s=%s", r, s);
            }
        }
        u.Browser.alpha = !(u.Browser.vendor === u.BROWSERS.CHROME && u.Browser.version < 2);
        u.Browser.opacity = !0;
        u.Browser.vendor === u.BROWSERS.IE && u.Browser.version < 11 && u.console.error("Internet Explorer versions < 11 are not supported by OpenSeadragon");
    }();
    !function(e) {
        var t = e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame;
        var i = e.cancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelAnimationFrame || e.msCancelAnimationFrame;
        if (t && i) {
            u.requestAnimationFrame = function() {
                return t.apply(e, arguments);
            };
            u.cancelAnimationFrame = function() {
                return i.apply(e, arguments);
            };
        } else {
            var n, o = [], r = [], s = 0;
            u.requestAnimationFrame = function(e) {
                o.push([
                    ++s,
                    e
                ]);
                n = n || setInterval(function() {
                    if (o.length) {
                        var e = u.now();
                        var t = r;
                        r = o;
                        o = t;
                        for(; r.length;)r.shift()[1](e);
                    } else {
                        clearInterval(n);
                        n = void 0;
                    }
                }, 20);
                return s;
            };
            u.cancelAnimationFrame = function(e) {
                var t, i;
                for(t = 0, i = o.length; t < i; t += 1)if (o[t][0] === e) {
                    o.splice(t, 1);
                    return;
                }
                for(t = 0, i = r.length; t < i; t += 1)if (r[t][0] === e) {
                    r.splice(t, 1);
                    return;
                }
            };
        }
    }(window);
    function o(e, t) {
        return t && e !== document.body ? document.body : e.offsetParent;
    }
}(OpenSeadragon);
!function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : e.OpenSeadragon = t();
}(this, function() {
    return OpenSeadragon;
});
!function(e) {
    var t = {
        supportsFullScreen: !1,
        isFullScreen: function() {
            return !1;
        },
        getFullScreenElement: function() {
            return null;
        },
        requestFullScreen: function() {},
        exitFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: "",
        fullScreenErrorEventName: ""
    };
    if (document.exitFullscreen) {
        t.supportsFullScreen = !0;
        t.getFullScreenElement = function() {
            return document.fullscreenElement;
        };
        t.requestFullScreen = function(e) {
            return e.requestFullscreen();
        };
        t.exitFullScreen = function() {
            document.exitFullscreen();
        };
        t.fullScreenEventName = "fullscreenchange";
        t.fullScreenErrorEventName = "fullscreenerror";
    } else if (document.msExitFullscreen) {
        t.supportsFullScreen = !0;
        t.getFullScreenElement = function() {
            return document.msFullscreenElement;
        };
        t.requestFullScreen = function(e) {
            return e.msRequestFullscreen();
        };
        t.exitFullScreen = function() {
            document.msExitFullscreen();
        };
        t.fullScreenEventName = "MSFullscreenChange";
        t.fullScreenErrorEventName = "MSFullscreenError";
    } else if (document.webkitExitFullscreen) {
        t.supportsFullScreen = !0;
        t.getFullScreenElement = function() {
            return document.webkitFullscreenElement;
        };
        t.requestFullScreen = function(e) {
            return e.webkitRequestFullscreen();
        };
        t.exitFullScreen = function() {
            document.webkitExitFullscreen();
        };
        t.fullScreenEventName = "webkitfullscreenchange";
        t.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.webkitCancelFullScreen) {
        t.supportsFullScreen = !0;
        t.getFullScreenElement = function() {
            return document.webkitCurrentFullScreenElement;
        };
        t.requestFullScreen = function(e) {
            return e.webkitRequestFullScreen();
        };
        t.exitFullScreen = function() {
            document.webkitCancelFullScreen();
        };
        t.fullScreenEventName = "webkitfullscreenchange";
        t.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.mozCancelFullScreen) {
        t.supportsFullScreen = !0;
        t.getFullScreenElement = function() {
            return document.mozFullScreenElement;
        };
        t.requestFullScreen = function(e) {
            return e.mozRequestFullScreen();
        };
        t.exitFullScreen = function() {
            document.mozCancelFullScreen();
        };
        t.fullScreenEventName = "mozfullscreenchange";
        t.fullScreenErrorEventName = "mozfullscreenerror";
    }
    t.isFullScreen = function() {
        return null !== t.getFullScreenElement();
    };
    t.cancelFullScreen = function() {
        e.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");
        t.exitFullScreen();
    };
    e.extend(e, t);
}(OpenSeadragon);
!function(r) {
    r.EventSource = function() {
        this.events = {};
    };
    r.EventSource.prototype = {
        addOnceHandler: function(t, i, e, n) {
            var o = this;
            n = n || 1;
            var r = 0;
            function s(e) {
                ++r === n && o.removeHandler(t, s);
                i(e);
            }
            this.addHandler(t, s, e);
        },
        addHandler: function(e, t, i) {
            var n = this.events[e];
            n || (this.events[e] = n = []);
            t && r.isFunction(t) && (n[n.length] = {
                handler: t,
                userData: i || null
            });
        },
        removeHandler: function(e, t) {
            var i, n = this.events[e], o = [];
            if (n && r.isArray(n)) {
                for(i = 0; i < n.length; i++)n[i].handler !== t && o.push(n[i]);
                this.events[e] = o;
            }
        },
        numberOfHandlers: function(e) {
            e = this.events[e];
            return e ? e.length : 0;
        },
        removeAllHandlers: function(e) {
            if (e) this.events[e] = [];
            else for(var t in this.events)this.events[t] = [];
        },
        getHandler: function(e) {
            var o = this.events[e];
            if (!o || !o.length) return null;
            o = 1 === o.length ? [
                o[0]
            ] : Array.apply(null, o);
            return function(e, t) {
                var i, n = o.length;
                for(i = 0; i < n; i++)if (o[i]) {
                    t.eventSource = e;
                    t.userData = o[i].userData;
                    o[i].handler(t);
                }
            };
        },
        raiseEvent: function(e, t) {
            e = this.getHandler(e);
            e && e(this, t = t || {});
        }
    };
}(OpenSeadragon);
!function(c) {
    var n = [];
    var u = {};
    c.MouseTracker = function(e) {
        n.push(this);
        var t = arguments;
        c.isPlainObject(e) || (e = {
            element: t[0],
            clickTimeThreshold: t[1],
            clickDistThreshold: t[2]
        });
        this.hash = Math.random();
        this.element = c.getElement(e.element);
        this.clickTimeThreshold = e.clickTimeThreshold || c.DEFAULT_SETTINGS.clickTimeThreshold;
        this.clickDistThreshold = e.clickDistThreshold || c.DEFAULT_SETTINGS.clickDistThreshold;
        this.dblClickTimeThreshold = e.dblClickTimeThreshold || c.DEFAULT_SETTINGS.dblClickTimeThreshold;
        this.dblClickDistThreshold = e.dblClickDistThreshold || c.DEFAULT_SETTINGS.dblClickDistThreshold;
        this.userData = e.userData || null;
        this.stopDelay = e.stopDelay || 50;
        this.preProcessEventHandler = e.preProcessEventHandler || null;
        this.contextMenuHandler = e.contextMenuHandler || null;
        this.enterHandler = e.enterHandler || null;
        this.leaveHandler = e.leaveHandler || null;
        this.exitHandler = e.exitHandler || null;
        this.overHandler = e.overHandler || null;
        this.outHandler = e.outHandler || null;
        this.pressHandler = e.pressHandler || null;
        this.nonPrimaryPressHandler = e.nonPrimaryPressHandler || null;
        this.releaseHandler = e.releaseHandler || null;
        this.nonPrimaryReleaseHandler = e.nonPrimaryReleaseHandler || null;
        this.moveHandler = e.moveHandler || null;
        this.scrollHandler = e.scrollHandler || null;
        this.clickHandler = e.clickHandler || null;
        this.dblClickHandler = e.dblClickHandler || null;
        this.dragHandler = e.dragHandler || null;
        this.dragEndHandler = e.dragEndHandler || null;
        this.pinchHandler = e.pinchHandler || null;
        this.stopHandler = e.stopHandler || null;
        this.keyDownHandler = e.keyDownHandler || null;
        this.keyUpHandler = e.keyUpHandler || null;
        this.keyHandler = e.keyHandler || null;
        this.focusHandler = e.focusHandler || null;
        this.blurHandler = e.blurHandler || null;
        var i = this;
        u[this.hash] = {
            click: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "click",
                        pointerType: "mouse",
                        isEmulated: !1
                    };
                    z(e, i);
                    i.preventDefault && !i.defaultPrevented && c.cancelEvent(t);
                    i.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            dblclick: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "dblclick",
                        pointerType: "mouse",
                        isEmulated: !1
                    };
                    z(e, i);
                    i.preventDefault && !i.defaultPrevented && c.cancelEvent(t);
                    i.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            keydown: function(e) {
                !function(e, t) {
                    var i = null;
                    var n = {
                        originalEvent: t,
                        eventType: "keydown",
                        pointerType: "",
                        isEmulated: !1
                    };
                    z(e, n);
                    if (e.keyDownHandler && !n.preventGesture && !n.defaultPrevented) {
                        i = {
                            eventSource: e,
                            keyCode: t.keyCode || t.charCode,
                            ctrl: t.ctrlKey,
                            shift: t.shiftKey,
                            alt: t.altKey,
                            meta: t.metaKey,
                            originalEvent: t,
                            preventDefault: n.preventDefault || n.defaultPrevented,
                            userData: e.userData
                        };
                        e.keyDownHandler(i);
                    }
                    (i && i.preventDefault || n.preventDefault && !n.defaultPrevented) && c.cancelEvent(t);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            keyup: function(e) {
                !function(e, t) {
                    var i = null;
                    var n = {
                        originalEvent: t,
                        eventType: "keyup",
                        pointerType: "",
                        isEmulated: !1
                    };
                    z(e, n);
                    if (e.keyUpHandler && !n.preventGesture && !n.defaultPrevented) {
                        i = {
                            eventSource: e,
                            keyCode: t.keyCode || t.charCode,
                            ctrl: t.ctrlKey,
                            shift: t.shiftKey,
                            alt: t.altKey,
                            meta: t.metaKey,
                            originalEvent: t,
                            preventDefault: n.preventDefault || n.defaultPrevented,
                            userData: e.userData
                        };
                        e.keyUpHandler(i);
                    }
                    (i && i.preventDefault || n.preventDefault && !n.defaultPrevented) && c.cancelEvent(t);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            keypress: function(e) {
                !function(e, t) {
                    var i = null;
                    var n = {
                        originalEvent: t,
                        eventType: "keypress",
                        pointerType: "",
                        isEmulated: !1
                    };
                    z(e, n);
                    if (e.keyHandler && !n.preventGesture && !n.defaultPrevented) {
                        i = {
                            eventSource: e,
                            keyCode: t.keyCode || t.charCode,
                            ctrl: t.ctrlKey,
                            shift: t.shiftKey,
                            alt: t.altKey,
                            meta: t.metaKey,
                            originalEvent: t,
                            preventDefault: n.preventDefault || n.defaultPrevented,
                            userData: e.userData
                        };
                        e.keyHandler(i);
                    }
                    (i && i.preventDefault || n.preventDefault && !n.defaultPrevented) && c.cancelEvent(t);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            focus: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "focus",
                        pointerType: "",
                        isEmulated: !1
                    };
                    z(e, i);
                    e.focusHandler && !i.preventGesture && e.focusHandler({
                        eventSource: e,
                        originalEvent: t,
                        userData: e.userData
                    });
                }(i, e);
            },
            blur: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "blur",
                        pointerType: "",
                        isEmulated: !1
                    };
                    z(e, i);
                    e.blurHandler && !i.preventGesture && e.blurHandler({
                        eventSource: e,
                        originalEvent: t,
                        userData: e.userData
                    });
                }(i, e);
            },
            contextmenu: function(e) {
                !function(e, t) {
                    var i = null;
                    var n = {
                        originalEvent: t,
                        eventType: "contextmenu",
                        pointerType: "mouse",
                        isEmulated: !1
                    };
                    z(e, n);
                    if (e.contextMenuHandler && !n.preventGesture && !n.defaultPrevented) {
                        i = {
                            eventSource: e,
                            position: T(y(t), e.element),
                            originalEvent: n.originalEvent,
                            preventDefault: n.preventDefault || n.defaultPrevented,
                            userData: e.userData
                        };
                        e.contextMenuHandler(i);
                    }
                    (i && i.preventDefault || n.preventDefault && !n.defaultPrevented) && c.cancelEvent(t);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            wheel: function(e) {
                E(i, e, e);
            },
            mousewheel: function(e) {
                S(i, e);
            },
            DOMMouseScroll: function(e) {
                S(i, e);
            },
            MozMousePixelScroll: function(e) {
                S(i, e);
            },
            losecapture: function(e) {
                !function(e, t) {
                    var i = {
                        id: c.MouseTracker.mousePointerId,
                        type: "mouse"
                    };
                    var n = {
                        originalEvent: t,
                        eventType: "lostpointercapture",
                        pointerType: "mouse",
                        isEmulated: !1
                    };
                    z(e, n);
                    t.target === e.element && L(e, i, !1);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            mouseenter: function(e) {
                P(i, e);
            },
            mouseleave: function(e) {
                _(i, e);
            },
            mouseover: function(e) {
                R(i, e);
            },
            mouseout: function(e) {
                C(i, e);
            },
            mousedown: function(e) {
                b(i, e);
            },
            mouseup: function(e) {
                D(i, e);
            },
            mousemove: function(e) {
                O(i, e);
            },
            touchstart: function(e) {
                !function(e, t) {
                    var i, n, o, r = t.changedTouches.length, s = e.getActivePointersListByType("touch");
                    i = c.now();
                    s.getLength() > t.touches.length - r && c.console.warn("Tracked touch contact count doesn't match event.touches.length");
                    var a = {
                        originalEvent: t,
                        eventType: "pointerdown",
                        pointerType: "touch",
                        isEmulated: !1
                    };
                    z(e, a);
                    for(n = 0; n < r; n++){
                        o = {
                            id: t.changedTouches[n].identifier,
                            type: "touch",
                            isPrimary: 0 === s.getLength(),
                            currentPos: y(t.changedTouches[n]),
                            currentTime: i
                        };
                        F(e, a, o);
                        N(e, a, o, 0);
                        L(e, o, !0);
                    }
                    a.preventDefault && !a.defaultPrevented && c.cancelEvent(t);
                    a.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            touchend: function(e) {
                !function(e, t) {
                    var i, n, o, r = t.changedTouches.length;
                    i = c.now();
                    var s = {
                        originalEvent: t,
                        eventType: "pointerup",
                        pointerType: "touch",
                        isEmulated: !1
                    };
                    z(e, s);
                    for(n = 0; n < r; n++){
                        o = {
                            id: t.changedTouches[n].identifier,
                            type: "touch",
                            currentPos: y(t.changedTouches[n]),
                            currentTime: i
                        };
                        A(e, s, o, 0);
                        L(e, o, !1);
                        M(e, s, o);
                    }
                    s.preventDefault && !s.defaultPrevented && c.cancelEvent(t);
                    s.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            touchmove: function(e) {
                !function(e, t) {
                    var i, n, o, r = t.changedTouches.length;
                    i = c.now();
                    var s = {
                        originalEvent: t,
                        eventType: "pointermove",
                        pointerType: "touch",
                        isEmulated: !1
                    };
                    z(e, s);
                    for(n = 0; n < r; n++){
                        o = {
                            id: t.changedTouches[n].identifier,
                            type: "touch",
                            currentPos: y(t.changedTouches[n]),
                            currentTime: i
                        };
                        W(e, s, o);
                    }
                    s.preventDefault && !s.defaultPrevented && c.cancelEvent(t);
                    s.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            touchcancel: function(e) {
                !function(e, t) {
                    var i, n, o = t.changedTouches.length;
                    var r = {
                        originalEvent: t,
                        eventType: "pointercancel",
                        pointerType: "touch",
                        isEmulated: !1
                    };
                    z(e, r);
                    for(i = 0; i < o; i++){
                        n = {
                            id: t.changedTouches[i].identifier,
                            type: "touch"
                        };
                        U(e, 0, n);
                    }
                    r.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            gesturestart: function(e) {
                e, c.eventIsCanceled(e) || e.preventDefault();
            },
            gesturechange: function(e) {
                e, c.eventIsCanceled(e) || e.preventDefault();
            },
            gotpointercapture: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "gotpointercapture",
                        pointerType: v(t),
                        isEmulated: !1
                    };
                    z(e, i);
                    t.target === e.element && L(e, {
                        id: t.pointerId,
                        type: v(t)
                    }, !0);
                    i.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            lostpointercapture: function(e) {
                !function(e, t) {
                    var i = {
                        originalEvent: t,
                        eventType: "lostpointercapture",
                        pointerType: v(t),
                        isEmulated: !1
                    };
                    z(e, i);
                    t.target === e.element && L(e, {
                        id: t.pointerId,
                        type: v(t)
                    }, !1);
                    i.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            pointerenter: function(e) {
                P(i, e);
            },
            pointerleave: function(e) {
                _(i, e);
            },
            pointerover: function(e) {
                R(i, e);
            },
            pointerout: function(e) {
                C(i, e);
            },
            pointerdown: function(e) {
                b(i, e);
            },
            pointerup: function(e) {
                D(i, e);
            },
            pointermove: function(e) {
                O(i, e);
            },
            pointercancel: function(e) {
                !function(e, t) {
                    var i = {
                        id: t.pointerId,
                        type: v(t)
                    };
                    var n = {
                        originalEvent: t,
                        eventType: "pointercancel",
                        pointerType: i.type,
                        isEmulated: !1
                    };
                    z(e, n);
                    U(e, 0, i);
                    n.stopPropagation && c.stopEvent(t);
                }(i, e);
            },
            pointerupcaptured: function(e) {
                !function(e, t) {
                    e.getActivePointersListByType(v(t)).getById(t.pointerId) && I(e, t);
                    c.stopEvent(t);
                }(i, e);
            },
            pointermovecaptured: function(e) {
                !function(e, t) {
                    e.getActivePointersListByType(v(t)).getById(t.pointerId) && k(e, t);
                    c.stopEvent(t);
                }(i, e);
            },
            tracking: !1,
            activePointersLists: [],
            lastClickPos: null,
            dblClickTimeOut: null,
            pinchGPoints: [],
            lastPinchDist: 0,
            currentPinchDist: 0,
            lastPinchCenter: null,
            currentPinchCenter: null,
            sentDragEvent: !1
        };
        this.hasGestureHandlers = !!(this.pressHandler || this.nonPrimaryPressHandler || this.releaseHandler || this.nonPrimaryReleaseHandler || this.clickHandler || this.dblClickHandler || this.dragHandler || this.dragEndHandler || this.pinchHandler);
        this.hasScrollHandler = !!this.scrollHandler;
        c.MouseTracker.havePointerEvents && c.setElementPointerEvents(this.element, "auto");
        this.exitHandler && c.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead.");
        e.startDisabled || this.setTracking(!0);
    };
    c.MouseTracker.prototype = {
        destroy: function() {
            var e;
            t(this);
            this.element = null;
            for(e = 0; e < n.length; e++)if (n[e] === this) {
                n.splice(e, 1);
                break;
            }
            u[this.hash] = null;
            delete u[this.hash];
        },
        isTracking: function() {
            return u[this.hash].tracking;
        },
        setTracking: function(e) {
            (e ? function(e) {
                var t, i, n = u[e.hash];
                if (!n.tracking) {
                    for(i = 0; i < c.MouseTracker.subscribeEvents.length; i++){
                        t = c.MouseTracker.subscribeEvents[i];
                        c.addEvent(e.element, t, n[t], t === c.MouseTracker.wheelEventName && {
                            passive: !1,
                            capture: !1
                        });
                    }
                    o(e);
                    n.tracking = !0;
                }
            } : t)(this);
            return this;
        },
        getActivePointersListByType: function(e) {
            var t, i, n = u[this.hash], o = n.activePointersLists.length;
            for(t = 0; t < o; t++)if (n.activePointersLists[t].type === e) return n.activePointersLists[t];
            i = new c.MouseTracker.GesturePointList(e);
            n.activePointersLists.push(i);
            return i;
        },
        getActivePointerCount: function() {
            var e, t = u[this.hash], i = t.activePointersLists.length, n = 0;
            for(e = 0; e < i; e++)n += t.activePointersLists[e].getLength();
            return n;
        },
        preProcessEventHandler: function() {},
        contextMenuHandler: function() {},
        enterHandler: function() {},
        leaveHandler: function() {},
        exitHandler: function() {},
        overHandler: function() {},
        outHandler: function() {},
        pressHandler: function() {},
        nonPrimaryPressHandler: function() {},
        releaseHandler: function() {},
        nonPrimaryReleaseHandler: function() {},
        moveHandler: function() {},
        scrollHandler: function() {},
        clickHandler: function() {},
        dblClickHandler: function() {},
        dragHandler: function() {},
        dragEndHandler: function() {},
        pinchHandler: function() {},
        stopHandler: function() {},
        keyDownHandler: function() {},
        keyUpHandler: function() {},
        keyHandler: function() {},
        focusHandler: function() {},
        blurHandler: function() {}
    };
    var r = function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return !0;
        }
    }();
    function s(e) {
        try {
            return e.addEventListener && e.removeEventListener;
        } catch (e1) {
            return;
        }
    }
    c.MouseTracker.gesturePointVelocityTracker = (l = [], d = h = 0, {
        addPoint: function(e, t) {
            e = a(e, t);
            l.push({
                guid: e,
                gPoint: t,
                lastPos: t.currentPos
            });
            if (1 === l.length) {
                d = c.now();
                h = window.setInterval(i, 50);
            }
        },
        removePoint: function(e, t) {
            var i, n = a(e, t), o = l.length;
            for(i = 0; i < o; i++)if (l[i].guid === n) {
                l.splice(i, 1);
                0 === --o && window.clearInterval(h);
                break;
            }
        }
    });
    function a(e, t) {
        return e.hash.toString() + t.type + t.id.toString();
    }
    function i() {
        var e, t, i, n, o, r = l.length, s = c.now();
        n = s - d;
        d = s;
        for(e = 0; e < r; e++){
            (i = (t = l[e]).gPoint).direction = Math.atan2(i.currentPos.y - t.lastPos.y, i.currentPos.x - t.lastPos.x);
            o = t.lastPos.distanceTo(i.currentPos);
            t.lastPos = i.currentPos;
            i.speed = .75 * (1e3 * o / (1 + n)) + .25 * i.speed;
        }
    }
    var l, h, d;
    c.MouseTracker.captureElement = document;
    c.MouseTracker.wheelEventName = c.Browser.vendor === c.BROWSERS.IE && 8 < c.Browser.version || "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
    c.MouseTracker.subscribeEvents = [
        "click",
        "dblclick",
        "keydown",
        "keyup",
        "keypress",
        "focus",
        "blur",
        "contextmenu",
        c.MouseTracker.wheelEventName
    ];
    "DOMMouseScroll" === c.MouseTracker.wheelEventName && c.MouseTracker.subscribeEvents.push("MozMousePixelScroll");
    if (window.PointerEvent) {
        c.MouseTracker.havePointerEvents = !0;
        c.MouseTracker.subscribeEvents.push("pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel");
        c.MouseTracker.havePointerCapture = (e = document.createElement("div"), c.isFunction(e.setPointerCapture) && c.isFunction(e.releasePointerCapture));
        c.MouseTracker.havePointerCapture && c.MouseTracker.subscribeEvents.push("gotpointercapture", "lostpointercapture");
    } else {
        c.MouseTracker.havePointerEvents = !1;
        c.MouseTracker.subscribeEvents.push("mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove");
        c.MouseTracker.mousePointerId = "legacy-mouse";
        c.MouseTracker.havePointerCapture = (e = document.createElement("div"), c.isFunction(e.setCapture) && c.isFunction(e.releaseCapture));
        c.MouseTracker.havePointerCapture && c.MouseTracker.subscribeEvents.push("losecapture");
        "ontouchstart" in window && c.MouseTracker.subscribeEvents.push("touchstart", "touchend", "touchmove", "touchcancel");
        "ongesturestart" in window && c.MouseTracker.subscribeEvents.push("gesturestart", "gesturechange");
    }
    var e;
    c.MouseTracker.GesturePointList = function(e) {
        this._gPoints = [];
        this.type = e;
        this.buttons = 0;
        this.contacts = 0;
        this.clicks = 0;
        this.captureCount = 0;
    };
    c.MouseTracker.GesturePointList.prototype = {
        getLength: function() {
            return this._gPoints.length;
        },
        asArray: function() {
            return this._gPoints;
        },
        add: function(e) {
            return this._gPoints.push(e);
        },
        removeById: function(e) {
            var t, i = this._gPoints.length;
            for(t = 0; t < i; t++)if (this._gPoints[t].id === e) {
                this._gPoints.splice(t, 1);
                break;
            }
            return this._gPoints.length;
        },
        getByIndex: function(e) {
            return e < this._gPoints.length ? this._gPoints[e] : null;
        },
        getById: function(e) {
            var t, i = this._gPoints.length;
            for(t = 0; t < i; t++)if (this._gPoints[t].id === e) return this._gPoints[t];
            return null;
        },
        getPrimary: function(e) {
            var t, i = this._gPoints.length;
            for(t = 0; t < i; t++)if (this._gPoints[t].isPrimary) return this._gPoints[t];
            return null;
        },
        addContact: function() {
            ++this.contacts;
            if (1 < this.contacts && ("mouse" === this.type || "pen" === this.type)) {
                c.console.warn("GesturePointList.addContact() Implausible contacts value");
                this.contacts = 1;
            }
        },
        removeContact: function() {
            --this.contacts;
            this.contacts < 0 && (this.contacts = 0);
        }
    };
    function o(e) {
        var t, i, n, o, r, s = u[e.hash], a = s.activePointersLists.length;
        for(t = 0; t < a; t++)if (0 < (n = s.activePointersLists[t]).getLength()) {
            r = [];
            o = n.asArray();
            for(i = 0; i < o.length; i++)r.push(o[i]);
            for(i = 0; i < r.length; i++)H(e, n, r[i]);
        }
        for(t = 0; t < a; t++)s.activePointersLists.pop();
        s.sentDragEvent = !1;
    }
    function t(e) {
        var t, i, n = u[e.hash];
        if (n.tracking) {
            for(i = 0; i < c.MouseTracker.subscribeEvents.length; i++){
                t = c.MouseTracker.subscribeEvents[i];
                c.removeEvent(e.element, t, n[t], !1);
            }
            o(e);
            n.tracking = !1;
        }
    }
    function p(e, t) {
        e = u[e.hash];
        if ("pointerevent" === t) return {
            upName: "pointerup",
            upHandler: e.pointerupcaptured,
            moveName: "pointermove",
            moveHandler: e.pointermovecaptured
        };
        if ("mouse" === t) return {
            upName: "pointerup",
            upHandler: e.pointerupcaptured,
            moveName: "pointermove",
            moveHandler: e.pointermovecaptured
        };
        if ("touch" === t) return {
            upName: "touchend",
            upHandler: e.touchendcaptured,
            moveName: "touchmove",
            moveHandler: e.touchmovecaptured
        };
        throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.");
    }
    function g(e, t) {
        var i;
        if (c.MouseTracker.havePointerCapture) {
            if (c.MouseTracker.havePointerEvents) {
                if (!(i = e.getActivePointersListByType(t.type).getById(t.id)) || !i.captured) return;
                try {
                    e.element.releasePointerCapture(t.id);
                } catch (e1) {}
            } else e.element.releaseCapture();
        } else {
            i = p(e, c.MouseTracker.havePointerEvents ? "pointerevent" : t.type);
            r && s(window.top) && c.removeEvent(window.top, i.upName, i.upHandler, !0);
            c.removeEvent(c.MouseTracker.captureElement, i.moveName, i.moveHandler, !0);
            c.removeEvent(c.MouseTracker.captureElement, i.upName, i.upHandler, !0);
        }
        L(e, t, !1);
    }
    function m(e) {
        return c.MouseTracker.havePointerEvents ? e.pointerId : c.MouseTracker.mousePointerId;
    }
    function v(e) {
        return c.MouseTracker.havePointerEvents ? e.pointerType || (c.Browser.vendor === c.BROWSERS.IE ? "mouse" : "") : "mouse";
    }
    function f(e) {
        return !c.MouseTracker.havePointerEvents || e.isPrimary;
    }
    function y(e) {
        return c.getMousePosition(e);
    }
    function w(e, t) {
        return T(y(e), t);
    }
    function T(e, t) {
        t = c.getElementOffset(t);
        return e.minus(t);
    }
    function x(e, t) {
        return new c.Point((e.x + t.x) / 2, (e.y + t.y) / 2);
    }
    function S(e, t) {
        var i = {
            target: t.target || t.srcElement,
            type: "wheel",
            shiftKey: t.shiftKey || !1,
            clientX: t.clientX,
            clientY: t.clientY,
            pageX: t.pageX || t.clientX,
            pageY: t.pageY || t.clientY,
            deltaMode: "MozMousePixelScroll" === t.type ? 0 : 1,
            deltaX: 0,
            deltaZ: 0
        };
        "mousewheel" === c.MouseTracker.wheelEventName ? i.deltaY = -t.wheelDelta / c.DEFAULT_SETTINGS.pixelsPerWheelLine : i.deltaY = t.detail;
        E(e, i, t);
    }
    function E(e, t, i) {
        var n, o;
        var r = null;
        n = t.deltaY < 0 ? 1 : -1;
        z(e, o = {
            originalEvent: t,
            eventType: "wheel",
            pointerType: "mouse",
            isEmulated: t !== i
        });
        if (e.scrollHandler && !o.preventGesture && !o.defaultPrevented) {
            r = {
                eventSource: e,
                pointerType: "mouse",
                position: w(t, e.element),
                scroll: n,
                shift: t.shiftKey,
                isTouchEvent: !1,
                originalEvent: i,
                preventDefault: o.preventDefault || o.defaultPrevented,
                userData: e.userData
            };
            e.scrollHandler(r);
        }
        o.stopPropagation && c.stopEvent(i);
        (r && r.preventDefault || o.preventDefault && !o.defaultPrevented) && c.cancelEvent(i);
    }
    function P(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        t = {
            originalEvent: t,
            eventType: "pointerenter",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, t);
        F(e, t, i);
    }
    function _(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        t = {
            originalEvent: t,
            eventType: "pointerleave",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, t);
        M(e, t, i);
    }
    function R(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        var n = {
            originalEvent: t,
            eventType: "pointerover",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, n);
        !function(e, t, i) {
            var n, o;
            n = e.getActivePointersListByType(i.type);
            if (o = n.getById(i.id)) i = o;
            else {
                i.captured = !1;
                i.insideElementPressed = !1;
            }
            e.overHandler && e.overHandler({
                eventSource: e,
                pointerType: i.type,
                position: T(i.currentPos, e.element),
                buttons: n.buttons,
                pointers: e.getActivePointerCount(),
                insideElementPressed: i.insideElementPressed,
                buttonDownAny: 0 !== n.buttons,
                isTouchEvent: "touch" === i.type,
                originalEvent: t.originalEvent,
                userData: e.userData
            });
        }(e, n, i);
        n.preventDefault && !n.defaultPrevented && c.cancelEvent(t);
        n.stopPropagation && c.stopEvent(t);
    }
    function C(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        var n = {
            originalEvent: t,
            eventType: "pointerout",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, n);
        !function(e, t, i) {
            var n, o;
            n = e.getActivePointersListByType(i.type);
            if (o = n.getById(i.id)) i = o;
            else {
                i.captured = !1;
                i.insideElementPressed = !1;
            }
            e.outHandler && e.outHandler({
                eventSource: e,
                pointerType: i.type,
                position: i.currentPos && T(i.currentPos, e.element),
                buttons: n.buttons,
                pointers: e.getActivePointerCount(),
                insideElementPressed: i.insideElementPressed,
                buttonDownAny: 0 !== n.buttons,
                isTouchEvent: "touch" === i.type,
                originalEvent: t.originalEvent,
                userData: e.userData
            });
        }(e, n, i);
        n.preventDefault && !n.defaultPrevented && c.cancelEvent(t);
        n.stopPropagation && c.stopEvent(t);
    }
    function b(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        var n = c.MouseTracker.havePointerEvents && "touch" === i.type && c.Browser.vendor !== c.BROWSERS.IE;
        var o = {
            originalEvent: t,
            eventType: "pointerdown",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, o);
        N(e, o, i, t.button);
        o.preventDefault && !o.defaultPrevented && c.cancelEvent(t);
        o.stopPropagation && c.stopEvent(t);
        o.shouldCapture && (n ? L(e, i, !0) : function(e, t) {
            var i;
            if (c.MouseTracker.havePointerCapture) {
                if (c.MouseTracker.havePointerEvents) try {
                    e.element.setPointerCapture(t.id);
                } catch (e1) {
                    c.console.warn("setPointerCapture() called on invalid pointer ID");
                    return;
                }
                else e.element.setCapture(!0);
            } else {
                i = p(e, c.MouseTracker.havePointerEvents ? "pointerevent" : t.type);
                r && s(window.top) && c.addEvent(window.top, i.upName, i.upHandler, !0);
                c.addEvent(c.MouseTracker.captureElement, i.upName, i.upHandler, !0);
                c.addEvent(c.MouseTracker.captureElement, i.moveName, i.moveHandler, !0);
            }
            L(e, t, !0);
        }(e, i));
    }
    function D(e, t) {
        I(e, t);
    }
    function I(e, t) {
        var i;
        var n = {
            originalEvent: t,
            eventType: "pointerup",
            pointerType: (i = {
                id: m(t),
                type: v(t),
                isPrimary: f(t),
                currentPos: y(t),
                currentTime: c.now()
            }).type,
            isEmulated: !1
        };
        z(e, n);
        A(e, n, i, t.button);
        n.preventDefault && !n.defaultPrevented && c.cancelEvent(t);
        n.stopPropagation && c.stopEvent(t);
        n.shouldReleaseCapture && (t.target === e.element ? g(e, i) : L(e, i, !1));
    }
    function O(e, t) {
        k(e, t);
    }
    function k(e, t) {
        var i = {
            id: m(t),
            type: v(t),
            isPrimary: f(t),
            currentPos: y(t),
            currentTime: c.now()
        };
        var n = {
            originalEvent: t,
            eventType: "pointermove",
            pointerType: i.type,
            isEmulated: !1
        };
        z(e, n);
        W(e, n, i);
        n.preventDefault && !n.defaultPrevented && c.cancelEvent(t);
        n.stopPropagation && c.stopEvent(t);
    }
    function B(e, t) {
        t.speed = 0;
        t.direction = 0;
        t.contactPos = t.currentPos;
        t.contactTime = t.currentTime;
        t.lastPos = t.currentPos;
        t.lastTime = t.currentTime;
        return e.add(t);
    }
    function H(e, t, i) {
        var n;
        var o = t.getById(i.id);
        if (o) {
            if (o.captured) {
                c.console.warn("stopTrackingPointer() called on captured pointer");
                g(e, o);
            }
            t.removeContact();
            n = t.removeById(i.id);
        } else n = t.getLength();
        return n;
    }
    function z(e, t) {
        t.eventSource = e;
        t.eventPhase = t.originalEvent && void 0 !== t.originalEvent.eventPhase ? t.originalEvent.eventPhase : 0;
        t.defaultPrevented = c.eventIsCanceled(t.originalEvent);
        t.shouldCapture = !1;
        t.shouldReleaseCapture = !1;
        t.userData = e.userData;
        !function(e, t) {
            switch(t.eventType){
                case "pointermove":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !1;
                    t.preventGesture = !e.hasGestureHandlers;
                    t.stopPropagation = !1;
                    break;
                case "pointerover":
                case "pointerout":
                case "contextmenu":
                case "keydown":
                case "keyup":
                case "keypress":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !1;
                    t.preventGesture = !1;
                    t.stopPropagation = !1;
                    break;
                case "pointerdown":
                case "pointerup":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !1;
                    t.preventGesture = !e.hasGestureHandlers;
                    t.stopPropagation = !1;
                    break;
                case "wheel":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !1;
                    t.preventGesture = !e.hasScrollHandler;
                    t.stopPropagation = !1;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                    t.isStoppable = !0;
                    t.isCancelable = !1;
                    t.preventDefault = !1;
                    t.preventGesture = !1;
                    t.stopPropagation = !1;
                    break;
                case "click":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !!e.clickHandler;
                    t.preventGesture = !1;
                    t.stopPropagation = !1;
                    break;
                case "dblclick":
                    t.isStoppable = !0;
                    t.isCancelable = !0;
                    t.preventDefault = !!e.dblClickHandler;
                    t.preventGesture = !1;
                    t.stopPropagation = !1;
                    break;
                default:
                    t.isStoppable = !1;
                    t.isCancelable = !1;
                    t.preventDefault = !1;
                    t.preventGesture = !1;
                    t.stopPropagation = !1;
            }
        }(e, t);
        e.preProcessEventHandler && e.preProcessEventHandler(t);
    }
    function L(e, t, i) {
        e = e.getActivePointersListByType(t.type);
        t = e.getById(t.id);
        if (t) {
            if (i && !t.captured) {
                t.captured = !0;
                e.captureCount++;
            } else if (!i && t.captured) {
                t.captured = !1;
                e.captureCount--;
                if (e.captureCount < 0) {
                    e.captureCount = 0;
                    c.console.warn("updatePointerCaptured() - pointsList.captureCount went negative");
                }
            }
        } else c.console.warn("updatePointerCaptured() called on untracked pointer");
    }
    function F(e, t, i) {
        var n, o = e.getActivePointersListByType(i.type);
        if (n = o.getById(i.id)) {
            n.insideElement = !0;
            n.lastPos = n.currentPos;
            n.lastTime = n.currentTime;
            n.currentPos = i.currentPos;
            n.currentTime = i.currentTime;
            i = n;
        } else {
            i.captured = !1;
            i.insideElementPressed = !1;
            i.insideElement = !0;
            B(o, i);
        }
        e.enterHandler && e.enterHandler({
            eventSource: e,
            pointerType: i.type,
            position: T(i.currentPos, e.element),
            buttons: o.buttons,
            pointers: e.getActivePointerCount(),
            insideElementPressed: i.insideElementPressed,
            buttonDownAny: 0 !== o.buttons,
            isTouchEvent: "touch" === i.type,
            originalEvent: t.originalEvent,
            userData: e.userData
        });
    }
    function M(e, t, i) {
        var n, o = e.getActivePointersListByType(i.type);
        if (n = o.getById(i.id)) {
            if (n.captured) {
                n.insideElement = !1;
                n.lastPos = n.currentPos;
                n.lastTime = n.currentTime;
                n.currentPos = i.currentPos;
                n.currentTime = i.currentTime;
            } else H(e, o, n);
            i = n;
        } else {
            i.captured = !1;
            i.insideElementPressed = !1;
        }
        if (e.leaveHandler || e.exitHandler) {
            t = {
                eventSource: e,
                pointerType: i.type,
                position: i.currentPos && T(i.currentPos, e.element),
                buttons: o.buttons,
                pointers: e.getActivePointerCount(),
                insideElementPressed: i.insideElementPressed,
                buttonDownAny: 0 !== o.buttons,
                isTouchEvent: "touch" === i.type,
                originalEvent: t.originalEvent,
                userData: e.userData
            };
            e.leaveHandler && e.leaveHandler(t);
            e.exitHandler && e.exitHandler(t);
        }
    }
    function N(e, t, i, n) {
        var o, r = u[e.hash], s = e.getActivePointersListByType(i.type);
        void 0 !== t.originalEvent.buttons ? s.buttons = t.originalEvent.buttons : 0 === n ? s.buttons |= 1 : 1 === n ? s.buttons |= 4 : 2 === n ? s.buttons |= 2 : 3 === n ? s.buttons |= 8 : 4 === n ? s.buttons |= 16 : 5 === n && (s.buttons |= 32);
        if (0 === n) {
            if (o = s.getById(i.id)) {
                o.insideElementPressed = !0;
                o.insideElement = !0;
                o.originalTarget = t.originalEvent.target;
                o.contactPos = i.currentPos;
                o.contactTime = i.currentTime;
                o.lastPos = o.currentPos;
                o.lastTime = o.currentTime;
                o.currentPos = i.currentPos;
                o.currentTime = i.currentTime;
                i = o;
            } else {
                i.captured = !1;
                i.insideElementPressed = !0;
                i.insideElement = !0;
                i.originalTarget = t.originalEvent.target;
                B(s, i);
            }
            s.addContact();
            if (t.preventGesture || t.defaultPrevented) {
                t.shouldCapture = !1;
                t.shouldReleaseCapture = !1;
            } else {
                t.shouldCapture = !0;
                t.shouldReleaseCapture = !1;
                t.preventDefault = !0;
                (e.dragHandler || e.dragEndHandler || e.pinchHandler) && c.MouseTracker.gesturePointVelocityTracker.addPoint(e, i);
                if (1 === s.contacts) e.pressHandler && !t.preventGesture && e.pressHandler({
                    eventSource: e,
                    pointerType: i.type,
                    position: T(i.contactPos, e.element),
                    buttons: s.buttons,
                    isTouchEvent: "touch" === i.type,
                    originalEvent: t.originalEvent,
                    userData: e.userData
                });
                else if (2 === s.contacts && e.pinchHandler && "touch" === i.type) {
                    r.pinchGPoints = s.asArray();
                    r.lastPinchDist = r.currentPinchDist = r.pinchGPoints[0].currentPos.distanceTo(r.pinchGPoints[1].currentPos);
                    r.lastPinchCenter = r.currentPinchCenter = x(r.pinchGPoints[0].currentPos, r.pinchGPoints[1].currentPos);
                }
            }
        } else {
            t.shouldCapture = !1;
            t.shouldReleaseCapture = !1;
            if (e.nonPrimaryPressHandler && !t.preventGesture && !t.defaultPrevented) {
                t.preventDefault = !0;
                e.nonPrimaryPressHandler({
                    eventSource: e,
                    pointerType: i.type,
                    position: T(i.currentPos, e.element),
                    button: n,
                    buttons: s.buttons,
                    isTouchEvent: "touch" === i.type,
                    originalEvent: t.originalEvent,
                    userData: e.userData
                });
            }
        }
    }
    function A(e, t, i, n) {
        var o, r, s, a = u[e.hash], l = e.getActivePointersListByType(i.type), h = !1;
        void 0 !== t.originalEvent.buttons ? l.buttons = t.originalEvent.buttons : 0 === n ? l.buttons ^= -2 : 1 === n ? l.buttons ^= -5 : 2 === n ? l.buttons ^= -3 : 3 === n ? l.buttons ^= -9 : 4 === n ? l.buttons ^= -17 : 5 === n && (l.buttons ^= -33);
        t.shouldCapture = !1;
        if (0 === n) {
            if (r = l.getById(i.id)) {
                l.removeContact();
                r.captured && (h = !0);
                r.lastPos = r.currentPos;
                r.lastTime = r.currentTime;
                r.currentPos = i.currentPos;
                r.currentTime = i.currentTime;
                r.insideElement || H(e, l, r);
                o = r.currentPos;
                s = r.currentTime;
            } else {
                i.captured = !1;
                i.insideElementPressed = !1;
                i.insideElement = !0;
                B(l, i);
                r = i;
            }
            if (!t.preventGesture && !t.defaultPrevented) {
                if (h) {
                    t.shouldReleaseCapture = !0;
                    t.preventDefault = !0;
                    (e.dragHandler || e.dragEndHandler || e.pinchHandler) && c.MouseTracker.gesturePointVelocityTracker.removePoint(e, r);
                    if (0 === l.contacts) {
                        e.releaseHandler && o && e.releaseHandler({
                            eventSource: e,
                            pointerType: r.type,
                            position: T(o, e.element),
                            buttons: l.buttons,
                            insideElementPressed: r.insideElementPressed,
                            insideElementReleased: r.insideElement,
                            isTouchEvent: "touch" === r.type,
                            originalEvent: t.originalEvent,
                            userData: e.userData
                        });
                        e.dragEndHandler && a.sentDragEvent && e.dragEndHandler({
                            eventSource: e,
                            pointerType: r.type,
                            position: T(r.currentPos, e.element),
                            speed: r.speed,
                            direction: r.direction,
                            shift: t.originalEvent.shiftKey,
                            isTouchEvent: "touch" === r.type,
                            originalEvent: t.originalEvent,
                            userData: e.userData
                        });
                        a.sentDragEvent = !1;
                        if ((e.clickHandler || e.dblClickHandler) && r.insideElement) {
                            s = s - r.contactTime <= e.clickTimeThreshold && r.contactPos.distanceTo(o) <= e.clickDistThreshold;
                            e.clickHandler && e.clickHandler({
                                eventSource: e,
                                pointerType: r.type,
                                position: T(r.currentPos, e.element),
                                quick: s,
                                shift: t.originalEvent.shiftKey,
                                isTouchEvent: "touch" === r.type,
                                originalEvent: t.originalEvent,
                                originalTarget: r.originalTarget,
                                userData: e.userData
                            });
                            if (e.dblClickHandler && s) {
                                l.clicks++;
                                if (1 === l.clicks) {
                                    a.lastClickPos = o;
                                    a.dblClickTimeOut = setTimeout(function() {
                                        l.clicks = 0;
                                    }, e.dblClickTimeThreshold);
                                } else if (2 === l.clicks) {
                                    clearTimeout(a.dblClickTimeOut);
                                    l.clicks = 0;
                                    a.lastClickPos.distanceTo(o) <= e.dblClickDistThreshold && e.dblClickHandler({
                                        eventSource: e,
                                        pointerType: r.type,
                                        position: T(r.currentPos, e.element),
                                        shift: t.originalEvent.shiftKey,
                                        isTouchEvent: "touch" === r.type,
                                        originalEvent: t.originalEvent,
                                        userData: e.userData
                                    });
                                    a.lastClickPos = null;
                                }
                            }
                        }
                    } else if (2 === l.contacts && e.pinchHandler && "touch" === r.type) {
                        a.pinchGPoints = l.asArray();
                        a.lastPinchDist = a.currentPinchDist = a.pinchGPoints[0].currentPos.distanceTo(a.pinchGPoints[1].currentPos);
                        a.lastPinchCenter = a.currentPinchCenter = x(a.pinchGPoints[0].currentPos, a.pinchGPoints[1].currentPos);
                    }
                } else {
                    t.shouldReleaseCapture = !1;
                    if (e.releaseHandler && o) {
                        e.releaseHandler({
                            eventSource: e,
                            pointerType: r.type,
                            position: T(o, e.element),
                            buttons: l.buttons,
                            insideElementPressed: r.insideElementPressed,
                            insideElementReleased: r.insideElement,
                            isTouchEvent: "touch" === r.type,
                            originalEvent: t.originalEvent,
                            userData: e.userData
                        });
                        t.preventDefault = !0;
                    }
                }
            }
        } else {
            t.shouldReleaseCapture = !1;
            if (e.nonPrimaryReleaseHandler && !t.preventGesture && !t.defaultPrevented) {
                t.preventDefault = !0;
                e.nonPrimaryReleaseHandler({
                    eventSource: e,
                    pointerType: i.type,
                    position: T(i.currentPos, e.element),
                    button: n,
                    buttons: l.buttons,
                    isTouchEvent: "touch" === i.type,
                    originalEvent: t.originalEvent,
                    userData: e.userData
                });
            }
        }
    }
    function W(n, o, r) {
        var e, t, i = u[n.hash], s = n.getActivePointersListByType(r.type);
        void 0 !== o.originalEvent.buttons && (s.buttons = o.originalEvent.buttons);
        if (e = s.getById(r.id)) {
            e.lastPos = e.currentPos;
            e.lastTime = e.currentTime;
            e.currentPos = r.currentPos;
            e.currentTime = r.currentTime;
            o.shouldCapture = !1;
            o.shouldReleaseCapture = !1;
            if (n.stopHandler && "mouse" === r.type) {
                clearTimeout(n.stopTimeOut);
                n.stopTimeOut = setTimeout(function() {
                    e = n, t = o.originalEvent, i = r.type, e.stopHandler && e.stopHandler({
                        eventSource: e,
                        pointerType: i,
                        position: w(t, e.element),
                        buttons: e.getActivePointersListByType(i).buttons,
                        isTouchEvent: "touch" === i,
                        originalEvent: t,
                        userData: e.userData
                    });
                    var e, t, i;
                }, n.stopDelay);
            }
            if (0 === s.contacts) n.moveHandler && n.moveHandler({
                eventSource: n,
                pointerType: r.type,
                position: T(r.currentPos, n.element),
                buttons: s.buttons,
                isTouchEvent: "touch" === r.type,
                originalEvent: o.originalEvent,
                userData: n.userData
            });
            else if (1 === s.contacts) {
                if (n.moveHandler) {
                    e = s.asArray()[0];
                    n.moveHandler({
                        eventSource: n,
                        pointerType: e.type,
                        position: T(e.currentPos, n.element),
                        buttons: s.buttons,
                        isTouchEvent: "touch" === e.type,
                        originalEvent: o.originalEvent,
                        userData: n.userData
                    });
                }
                if (n.dragHandler && !o.preventGesture && !o.defaultPrevented) {
                    t = (e = s.asArray()[0]).currentPos.minus(e.lastPos);
                    n.dragHandler({
                        eventSource: n,
                        pointerType: e.type,
                        position: T(e.currentPos, n.element),
                        buttons: s.buttons,
                        delta: t,
                        speed: e.speed,
                        direction: e.direction,
                        shift: o.originalEvent.shiftKey,
                        isTouchEvent: "touch" === e.type,
                        originalEvent: o.originalEvent,
                        userData: n.userData
                    });
                    o.preventDefault = !0;
                    i.sentDragEvent = !0;
                }
            } else if (2 === s.contacts) {
                if (n.moveHandler) {
                    e = s.asArray();
                    n.moveHandler({
                        eventSource: n,
                        pointerType: e[0].type,
                        position: T(x(e[0].currentPos, e[1].currentPos), n.element),
                        buttons: s.buttons,
                        isTouchEvent: "touch" === e[0].type,
                        originalEvent: o.originalEvent,
                        userData: n.userData
                    });
                }
                if (n.pinchHandler && "touch" === r.type && !o.preventGesture && !o.defaultPrevented && (t = i.pinchGPoints[0].currentPos.distanceTo(i.pinchGPoints[1].currentPos)) !== i.currentPinchDist) {
                    i.lastPinchDist = i.currentPinchDist;
                    i.currentPinchDist = t;
                    i.lastPinchCenter = i.currentPinchCenter;
                    i.currentPinchCenter = x(i.pinchGPoints[0].currentPos, i.pinchGPoints[1].currentPos);
                    n.pinchHandler({
                        eventSource: n,
                        pointerType: "touch",
                        gesturePoints: i.pinchGPoints,
                        lastCenter: T(i.lastPinchCenter, n.element),
                        center: T(i.currentPinchCenter, n.element),
                        lastDistance: i.lastPinchDist,
                        distance: i.currentPinchDist,
                        shift: o.originalEvent.shiftKey,
                        originalEvent: o.originalEvent,
                        userData: n.userData
                    });
                    o.preventDefault = !0;
                }
            }
        }
    }
    function U(e, t, i) {
        var n = e.getActivePointersListByType(i.type);
        (i = n.getById(i.id)) && H(e, n, i);
    }
}(OpenSeadragon);
!function(o) {
    o.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4,
        ABSOLUTE: 5
    };
    o.Control = function(e, t, i) {
        var n = e.parentNode;
        if ("number" == typeof t) {
            o.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013");
            t = {
                anchor: t
            };
        }
        t.attachToViewer = void 0 === t.attachToViewer || t.attachToViewer;
        this.autoFade = void 0 === t.autoFade || t.autoFade;
        this.element = e;
        this.anchor = t.anchor;
        this.container = i;
        if (this.anchor === o.ControlAnchor.ABSOLUTE) {
            this.wrapper = o.makeNeutralElement("div");
            this.wrapper.style.position = "absolute";
            this.wrapper.style.top = "number" == typeof t.top ? t.top + "px" : t.top;
            this.wrapper.style.left = "number" == typeof t.left ? t.left + "px" : t.left;
            this.wrapper.style.height = "number" == typeof t.height ? t.height + "px" : t.height;
            this.wrapper.style.width = "number" == typeof t.width ? t.width + "px" : t.width;
            this.wrapper.style.margin = "0px";
            this.wrapper.style.padding = "0px";
            this.element.style.position = "relative";
            this.element.style.top = "0px";
            this.element.style.left = "0px";
            this.element.style.height = "100%";
            this.element.style.width = "100%";
        } else {
            this.wrapper = o.makeNeutralElement("div");
            this.wrapper.style.display = "inline-block";
            this.anchor === o.ControlAnchor.NONE && (this.wrapper.style.width = this.wrapper.style.height = "100%");
        }
        this.wrapper.appendChild(this.element);
        t.attachToViewer ? this.anchor === o.ControlAnchor.TOP_RIGHT || this.anchor === o.ControlAnchor.BOTTOM_RIGHT ? this.container.insertBefore(this.wrapper, this.container.firstChild) : this.container.appendChild(this.wrapper) : n.appendChild(this.wrapper);
    };
    o.Control.prototype = {
        destroy: function() {
            this.wrapper.removeChild(this.element);
            this.anchor !== o.ControlAnchor.NONE && this.container.removeChild(this.wrapper);
        },
        isVisible: function() {
            return "none" !== this.wrapper.style.display;
        },
        setVisible: function(e) {
            this.wrapper.style.display = e ? this.anchor === o.ControlAnchor.ABSOLUTE ? "block" : "inline-block" : "none";
        },
        setOpacity: function(e) {
            this.element[o.SIGNAL] && o.Browser.vendor === o.BROWSERS.IE ? o.setElementOpacity(this.element, e, !0) : o.setElementOpacity(this.wrapper, e, !0);
        }
    };
}(OpenSeadragon);
!function(o) {
    o.ControlDock = function(e) {
        var t, i, n = [
            "topleft",
            "topright",
            "bottomright",
            "bottomleft"
        ];
        o.extend(!0, this, {
            id: "controldock-" + o.now() + "-" + Math.floor(1e6 * Math.random()),
            container: o.makeNeutralElement("div"),
            controls: []
        }, e);
        this.container.onsubmit = function() {
            return !1;
        };
        if (this.element) {
            this.element = o.getElement(this.element);
            this.element.appendChild(this.container);
            this.element.style.position = "relative";
            this.container.style.width = "100%";
            this.container.style.height = "100%";
        }
        for(i = 0; i < n.length; i++){
            this.controls[t = n[i]] = o.makeNeutralElement("div");
            this.controls[t].style.position = "absolute";
            t.match("left") && (this.controls[t].style.left = "0px");
            t.match("right") && (this.controls[t].style.right = "0px");
            t.match("top") && (this.controls[t].style.top = "0px");
            t.match("bottom") && (this.controls[t].style.bottom = "0px");
        }
        this.container.appendChild(this.controls.topleft);
        this.container.appendChild(this.controls.topright);
        this.container.appendChild(this.controls.bottomright);
        this.container.appendChild(this.controls.bottomleft);
    };
    o.ControlDock.prototype = {
        addControl: function(e, t) {
            var i = null;
            if (!(0 <= n(this, e = o.getElement(e)))) {
                switch(t.anchor){
                    case o.ControlAnchor.TOP_RIGHT:
                        i = this.controls.topright;
                        e.style.position = "relative";
                        e.style.paddingRight = "0px";
                        e.style.paddingTop = "0px";
                        break;
                    case o.ControlAnchor.BOTTOM_RIGHT:
                        i = this.controls.bottomright;
                        e.style.position = "relative";
                        e.style.paddingRight = "0px";
                        e.style.paddingBottom = "0px";
                        break;
                    case o.ControlAnchor.BOTTOM_LEFT:
                        i = this.controls.bottomleft;
                        e.style.position = "relative";
                        e.style.paddingLeft = "0px";
                        e.style.paddingBottom = "0px";
                        break;
                    case o.ControlAnchor.TOP_LEFT:
                        i = this.controls.topleft;
                        e.style.position = "relative";
                        e.style.paddingLeft = "0px";
                        e.style.paddingTop = "0px";
                        break;
                    case o.ControlAnchor.ABSOLUTE:
                        i = this.container;
                        e.style.margin = "0px";
                        e.style.padding = "0px";
                        break;
                    default:
                    case o.ControlAnchor.NONE:
                        i = this.container;
                        e.style.margin = "0px";
                        e.style.padding = "0px";
                }
                this.controls.push(new o.Control(e, t, i));
                e.style.display = "inline-block";
            }
        },
        removeControl: function(e) {
            e = n(this, e = o.getElement(e));
            if (0 <= e) {
                this.controls[e].destroy();
                this.controls.splice(e, 1);
            }
            return this;
        },
        clearControls: function() {
            for(; 0 < this.controls.length;)this.controls.pop().destroy();
            return this;
        },
        areControlsEnabled: function() {
            var e;
            for(e = this.controls.length - 1; 0 <= e; e--)if (this.controls[e].isVisible()) return !0;
            return !1;
        },
        setControlsEnabled: function(e) {
            var t;
            for(t = this.controls.length - 1; 0 <= t; t--)this.controls[t].setVisible(e);
            return this;
        }
    };
    function n(e, t) {
        var i, n = e.controls;
        for(i = n.length - 1; 0 <= i; i--)if (n[i].element === t) return i;
        return -1;
    }
}(OpenSeadragon);
!function(e) {
    e.Placement = e.freezeObject({
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8,
        properties: {
            0: {
                isLeft: !1,
                isHorizontallyCentered: !0,
                isRight: !1,
                isTop: !1,
                isVerticallyCentered: !0,
                isBottom: !1
            },
            1: {
                isLeft: !0,
                isHorizontallyCentered: !1,
                isRight: !1,
                isTop: !0,
                isVerticallyCentered: !1,
                isBottom: !1
            },
            2: {
                isLeft: !1,
                isHorizontallyCentered: !0,
                isRight: !1,
                isTop: !0,
                isVerticallyCentered: !1,
                isBottom: !1
            },
            3: {
                isLeft: !1,
                isHorizontallyCentered: !1,
                isRight: !0,
                isTop: !0,
                isVerticallyCentered: !1,
                isBottom: !1
            },
            4: {
                isLeft: !1,
                isHorizontallyCentered: !1,
                isRight: !0,
                isTop: !1,
                isVerticallyCentered: !0,
                isBottom: !1
            },
            5: {
                isLeft: !1,
                isHorizontallyCentered: !1,
                isRight: !0,
                isTop: !1,
                isVerticallyCentered: !1,
                isBottom: !0
            },
            6: {
                isLeft: !1,
                isHorizontallyCentered: !0,
                isRight: !1,
                isTop: !1,
                isVerticallyCentered: !1,
                isBottom: !0
            },
            7: {
                isLeft: !0,
                isHorizontallyCentered: !1,
                isRight: !1,
                isTop: !1,
                isVerticallyCentered: !1,
                isBottom: !0
            },
            8: {
                isLeft: !0,
                isHorizontallyCentered: !1,
                isRight: !1,
                isTop: !1,
                isVerticallyCentered: !0,
                isBottom: !1
            }
        }
    });
}(OpenSeadragon);
!function(m) {
    var c = {};
    var o = 1;
    m.Viewer = function(e) {
        var t, i = arguments, n = this;
        if ((e = !m.isPlainObject(e) ? {
            id: i[0],
            xmlPath: 1 < i.length ? i[1] : void 0,
            prefixUrl: 2 < i.length ? i[2] : void 0,
            controls: 3 < i.length ? i[3] : void 0,
            overlays: 4 < i.length ? i[4] : void 0
        } : e).config) {
            m.extend(!0, e, e.config);
            delete e.config;
        }
        m.extend(!0, this, {
            id: e.id,
            hash: e.hash || o++,
            initialPage: 0,
            element: null,
            container: null,
            canvas: null,
            overlays: [],
            overlaysContainer: null,
            previousBody: [],
            customControls: [],
            source: null,
            drawer: null,
            world: null,
            viewport: null,
            navigator: null,
            collectionViewport: null,
            collectionDrawer: null,
            navImages: null,
            buttons: null,
            profiler: null
        }, m.DEFAULT_SETTINGS, e);
        if (void 0 === this.hash) throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
        void 0 !== c[this.hash] && m.console.warn("Hash " + this.hash + " has already been used.");
        c[this.hash] = {
            fsBoundsDelta: new m.Point(1, 1),
            prevContainerSize: null,
            animating: !1,
            forceRedraw: !1,
            mouseInside: !1,
            group: null,
            zooming: !1,
            zoomFactor: null,
            lastZoomTime: null,
            fullPage: !1,
            onfullscreenchange: null
        };
        this._sequenceIndex = 0;
        this._firstOpen = !0;
        this._updateRequestId = null;
        this._loadQueue = [];
        this.currentOverlays = [];
        this._updatePixelDensityRatioBind = null;
        this._lastScrollTime = m.now();
        m.EventSource.call(this);
        this.addHandler("open-failed", function(e) {
            e = m.getString("Errors.OpenFailed", e.eventSource, e.message);
            n._showMessage(e);
        });
        m.ControlDock.call(this, e);
        this.xmlPath && (this.tileSources = [
            this.xmlPath
        ]);
        this.element = this.element || document.getElementById(this.id);
        this.canvas = m.makeNeutralElement("div");
        this.canvas.className = "openseadragon-canvas";
        !function(e) {
            e.width = "100%";
            e.height = "100%";
            e.overflow = "hidden";
            e.position = "absolute";
            e.top = "0px";
            e.left = "0px";
        }(this.canvas.style);
        m.setElementTouchActionNone(this.canvas);
        "" !== e.tabIndex && (this.canvas.tabIndex = void 0 === e.tabIndex ? 0 : e.tabIndex);
        this.container.className = "openseadragon-container";
        !function(e) {
            e.width = "100%";
            e.height = "100%";
            e.position = "relative";
            e.overflow = "hidden";
            e.left = "0px";
            e.top = "0px";
            e.textAlign = "left";
        }(this.container.style);
        m.setElementTouchActionNone(this.container);
        this.container.insertBefore(this.canvas, this.container.firstChild);
        this.element.appendChild(this.container);
        this.bodyWidth = document.body.style.width;
        this.bodyHeight = document.body.style.height;
        this.bodyOverflow = document.body.style.overflow;
        this.docOverflow = document.documentElement.style.overflow;
        this.innerTracker = new m.MouseTracker({
            userData: "Viewer.innerTracker",
            element: this.canvas,
            startDisabled: !this.mouseNavEnabled,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            dblClickTimeThreshold: this.dblClickTimeThreshold,
            dblClickDistThreshold: this.dblClickDistThreshold,
            contextMenuHandler: m.delegate(this, p),
            keyDownHandler: m.delegate(this, g),
            keyHandler: m.delegate(this, y),
            clickHandler: m.delegate(this, w),
            dblClickHandler: m.delegate(this, T),
            dragHandler: m.delegate(this, x),
            dragEndHandler: m.delegate(this, S),
            enterHandler: m.delegate(this, E),
            leaveHandler: m.delegate(this, P),
            pressHandler: m.delegate(this, _),
            releaseHandler: m.delegate(this, R),
            nonPrimaryPressHandler: m.delegate(this, C),
            nonPrimaryReleaseHandler: m.delegate(this, b),
            scrollHandler: m.delegate(this, I),
            pinchHandler: m.delegate(this, D)
        });
        this.outerTracker = new m.MouseTracker({
            userData: "Viewer.outerTracker",
            element: this.container,
            startDisabled: !this.mouseNavEnabled,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            dblClickTimeThreshold: this.dblClickTimeThreshold,
            dblClickDistThreshold: this.dblClickDistThreshold,
            enterHandler: m.delegate(this, O),
            leaveHandler: m.delegate(this, k)
        });
        this.toolbar && (this.toolbar = new m.ControlDock({
            element: this.toolbar
        }));
        this.bindStandardControls();
        c[this.hash].prevContainerSize = s(this.container);
        this.world = new m.World({
            viewer: this
        });
        this.world.addHandler("add-item", function(e) {
            n.source = n.world.getItemAt(0).source;
            c[n.hash].forceRedraw = !0;
            n._updateRequestId || (n._updateRequestId = a(n, B));
        });
        this.world.addHandler("remove-item", function(e) {
            n.world.getItemCount() ? n.source = n.world.getItemAt(0).source : n.source = null;
            c[n.hash].forceRedraw = !0;
        });
        this.world.addHandler("metrics-change", function(e) {
            n.viewport && n.viewport._setContentBounds(n.world.getHomeBounds(), n.world.getContentFactor());
        });
        this.world.addHandler("item-index-change", function(e) {
            n.source = n.world.getItemAt(0).source;
        });
        this.viewport = new m.Viewport({
            containerSize: c[this.hash].prevContainerSize,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime,
            minZoomImageRatio: this.minZoomImageRatio,
            maxZoomPixelRatio: this.maxZoomPixelRatio,
            visibilityRatio: this.visibilityRatio,
            wrapHorizontal: this.wrapHorizontal,
            wrapVertical: this.wrapVertical,
            defaultZoomLevel: this.defaultZoomLevel,
            minZoomLevel: this.minZoomLevel,
            maxZoomLevel: this.maxZoomLevel,
            viewer: this,
            degrees: this.degrees,
            flipped: this.flipped,
            navigatorRotate: this.navigatorRotate,
            homeFillsViewer: this.homeFillsViewer,
            margins: this.viewportMargins,
            silenceMultiImageWarnings: this.silenceMultiImageWarnings
        });
        this.viewport._setContentBounds(this.world.getHomeBounds(), this.world.getContentFactor());
        this.imageLoader = new m.ImageLoader({
            jobLimit: this.imageLoaderLimit,
            timeout: e.timeout
        });
        this.tileCache = new m.TileCache({
            maxImageCacheCount: this.maxImageCacheCount
        });
        this.drawer = new m.Drawer({
            viewer: this,
            viewport: this.viewport,
            element: this.canvas,
            debugGridColor: this.debugGridColor
        });
        this.overlaysContainer = m.makeNeutralElement("div");
        this.canvas.appendChild(this.overlaysContainer);
        if (!this.drawer.canRotate()) {
            if (this.rotateLeft) {
                t = this.buttonGroup.buttons.indexOf(this.rotateLeft);
                this.buttonGroup.buttons.splice(t, 1);
                this.buttonGroup.element.removeChild(this.rotateLeft.element);
            }
            if (this.rotateRight) {
                t = this.buttonGroup.buttons.indexOf(this.rotateRight);
                this.buttonGroup.buttons.splice(t, 1);
                this.buttonGroup.element.removeChild(this.rotateRight.element);
            }
        }
        this._addUpdatePixelDensityRatioEvent();
        this.showNavigator && (this.navigator = new m.Navigator({
            id: this.navigatorId,
            position: this.navigatorPosition,
            sizeRatio: this.navigatorSizeRatio,
            maintainSizeRatio: this.navigatorMaintainSizeRatio,
            top: this.navigatorTop,
            left: this.navigatorLeft,
            width: this.navigatorWidth,
            height: this.navigatorHeight,
            autoResize: this.navigatorAutoResize,
            autoFade: this.navigatorAutoFade,
            prefixUrl: this.prefixUrl,
            viewer: this,
            navigatorRotate: this.navigatorRotate,
            background: this.navigatorBackground,
            opacity: this.navigatorOpacity,
            borderColor: this.navigatorBorderColor,
            displayRegionColor: this.navigatorDisplayRegionColor,
            crossOriginPolicy: this.crossOriginPolicy
        }));
        this.sequenceMode && this.bindSequenceControls();
        this.tileSources && this.open(this.tileSources);
        for(t = 0; t < this.customControls.length; t++)this.addControl(this.customControls[t].id, {
            anchor: this.customControls[t].anchor
        });
        m.requestAnimationFrame(function() {
            u(n);
        });
        void 0 === this.imageSmoothingEnabled || this.imageSmoothingEnabled || this.drawer.setImageSmoothingEnabled(this.imageSmoothingEnabled);
        m._viewers.set(this.element, this);
    };
    m.extend(m.Viewer.prototype, m.EventSource.prototype, m.ControlDock.prototype, {
        isOpen: function() {
            return !!this.world.getItemCount();
        },
        openDzi: function(e) {
            m.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead.");
            return this.open(e);
        },
        openTileSource: function(e) {
            m.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead.");
            return this.open(e);
        },
        get buttons () {
            m.console.warn("Viewer.buttons is deprecated; Please use Viewer.buttonGroup");
            return this.buttonGroup;
        },
        open: function(i, e) {
            var o = this;
            this.close();
            if (!i) return this;
            if (this.sequenceMode && m.isArray(i)) {
                if (this.referenceStrip) {
                    this.referenceStrip.destroy();
                    this.referenceStrip = null;
                }
                void 0 === e || isNaN(e) || (this.initialPage = e);
                this.tileSources = i;
                this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage));
                if (this.tileSources.length) {
                    this.open(this.tileSources[this._sequenceIndex]);
                    this.showReferenceStrip && this.addReferenceStrip();
                }
                this._updateSequenceButtons(this._sequenceIndex);
                return this;
            }
            if (!(i = !m.isArray(i) ? [
                i
            ] : i).length) return this;
            this._opening = !0;
            var n = i.length;
            var r = 0;
            var s = 0;
            var a;
            var l = function() {
                if (r + s === n) {
                    if (r) {
                        if (o._firstOpen || !o.preserveViewport) {
                            o.viewport.goHome(!0);
                            o.viewport.update();
                        }
                        o._firstOpen = !1;
                        var e = i[0];
                        e.tileSource && (e = e.tileSource);
                        if (o.overlays && !o.preserveOverlays) for(var t = 0; t < o.overlays.length; t++)o.currentOverlays[t] = h(o, o.overlays[t]);
                        o._drawOverlays();
                        o._opening = !1;
                        o.raiseEvent("open", {
                            source: e
                        });
                    } else {
                        o._opening = !1;
                        o.raiseEvent("open-failed", a);
                    }
                }
            };
            for(var t = 0; t < i.length; t++)!function(i) {
                if (void 0 !== (i = !m.isPlainObject(i) || !i.tileSource ? {
                    tileSource: i
                } : i).index) {
                    m.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead");
                    delete i.index;
                }
                void 0 === i.collectionImmediately && (i.collectionImmediately = !0);
                var n = i.success;
                i.success = function(e) {
                    r++;
                    if (i.tileSource.overlays) for(var t = 0; t < i.tileSource.overlays.length; t++)o.addOverlay(i.tileSource.overlays[t]);
                    n && n(e);
                    l();
                };
                var t = i.error;
                i.error = function(e) {
                    s++;
                    a = a || e;
                    t && t(e);
                    l();
                };
                o.addTiledImage(i);
            }(i[t]);
            return this;
        },
        close: function() {
            if (!c[this.hash]) return this;
            this._opening = !1;
            this.navigator && this.navigator.close();
            if (!this.preserveOverlays) {
                this.clearOverlays();
                this.overlaysContainer.innerHTML = "";
            }
            c[this.hash].animating = !1;
            this.world.removeAll();
            this.imageLoader.clear();
            this.raiseEvent("close");
            return this;
        },
        destroy: function() {
            if (c[this.hash]) {
                this._removeUpdatePixelDensityRatioEvent();
                this.close();
                this.clearOverlays();
                this.overlaysContainer.innerHTML = "";
                if (this.referenceStrip) {
                    this.referenceStrip.destroy();
                    this.referenceStrip = null;
                }
                if (null !== this._updateRequestId) {
                    m.cancelAnimationFrame(this._updateRequestId);
                    this._updateRequestId = null;
                }
                this.drawer && this.drawer.destroy();
                if (this.navigator) {
                    this.navigator.destroy();
                    c[this.navigator.hash] = null;
                    delete c[this.navigator.hash];
                    this.navigator = null;
                }
                this.removeAllHandlers();
                if (this.buttonGroup) this.buttonGroup.destroy();
                else if (this.customButtons) for(; this.customButtons.length;)this.customButtons.pop().destroy();
                this.paging && this.paging.destroy();
                if (this.element) for(; this.element.firstChild;)this.element.removeChild(this.element.firstChild);
                this.container.onsubmit = null;
                this.clearControls();
                this.innerTracker && this.innerTracker.destroy();
                this.outerTracker && this.outerTracker.destroy();
                c[this.hash] = null;
                delete c[this.hash];
                this.canvas = null;
                this.container = null;
                m._viewers.delete(this.element);
                this.element = null;
            }
        },
        isMouseNavEnabled: function() {
            return this.innerTracker.isTracking();
        },
        setMouseNavEnabled: function(e) {
            this.innerTracker.setTracking(e);
            this.outerTracker.setTracking(e);
            this.raiseEvent("mouse-enabled", {
                enabled: e
            });
            return this;
        },
        areControlsEnabled: function() {
            var e, t = this.controls.length;
            for(e = 0; e < this.controls.length; e++)t = t && this.controls[e].isVisible();
            return t;
        },
        setControlsEnabled: function(e) {
            (e ? d : u)(this);
            this.raiseEvent("controls-enabled", {
                enabled: e
            });
            return this;
        },
        setDebugMode: function(e) {
            for(var t = 0; t < this.world.getItemCount(); t++)this.world.getItemAt(t).debugMode = e;
            this.debugMode = e;
            this.forceRedraw();
        },
        isFullPage: function() {
            return c[this.hash].fullPage;
        },
        setFullPage: function(e) {
            var t, i, n = document.body, o = n.style, r = document.documentElement.style, s = this;
            if (e === this.isFullPage()) return this;
            var a = {
                fullPage: e,
                preventDefaultAction: !1
            };
            this.raiseEvent("pre-full-page", a);
            if (a.preventDefaultAction) return this;
            if (e) {
                this.elementSize = m.getElementSize(this.element);
                this.pageScroll = m.getPageScroll();
                this.elementMargin = this.element.style.margin;
                this.element.style.margin = "0";
                this.elementPadding = this.element.style.padding;
                this.element.style.padding = "0";
                this.bodyMargin = o.margin;
                this.docMargin = r.margin;
                o.margin = "0";
                r.margin = "0";
                this.bodyPadding = o.padding;
                this.docPadding = r.padding;
                o.padding = "0";
                r.padding = "0";
                this.bodyWidth = o.width;
                this.docWidth = r.width;
                o.width = "100%";
                r.width = "100%";
                this.bodyHeight = o.height;
                this.docHeight = r.height;
                o.height = "100%";
                r.height = "100%";
                this.bodyDisplay = o.display;
                o.display = "block";
                this.previousBody = [];
                c[this.hash].prevElementParent = this.element.parentNode;
                c[this.hash].prevNextSibling = this.element.nextSibling;
                c[this.hash].prevElementWidth = this.element.style.width;
                c[this.hash].prevElementHeight = this.element.style.height;
                t = n.childNodes.length;
                for(i = 0; i < t; i++){
                    this.previousBody.push(n.childNodes[0]);
                    n.removeChild(n.childNodes[0]);
                }
                if (this.toolbar && this.toolbar.element) {
                    this.toolbar.parentNode = this.toolbar.element.parentNode;
                    this.toolbar.nextSibling = this.toolbar.element.nextSibling;
                    n.appendChild(this.toolbar.element);
                    m.addClass(this.toolbar.element, "fullpage");
                }
                m.addClass(this.element, "fullpage");
                n.appendChild(this.element);
                this.element.style.height = "100vh";
                this.element.style.width = "100vw";
                this.toolbar && this.toolbar.element && (this.element.style.height = m.getElementSize(this.element).y - m.getElementSize(this.toolbar.element).y + "px");
                c[this.hash].fullPage = !0;
                m.delegate(this, O)({});
            } else {
                this.element.style.margin = this.elementMargin;
                this.element.style.padding = this.elementPadding;
                o.margin = this.bodyMargin;
                r.margin = this.docMargin;
                o.padding = this.bodyPadding;
                r.padding = this.docPadding;
                o.width = this.bodyWidth;
                r.width = this.docWidth;
                o.height = this.bodyHeight;
                r.height = this.docHeight;
                o.display = this.bodyDisplay;
                n.removeChild(this.element);
                t = this.previousBody.length;
                for(i = 0; i < t; i++)n.appendChild(this.previousBody.shift());
                m.removeClass(this.element, "fullpage");
                c[this.hash].prevElementParent.insertBefore(this.element, c[this.hash].prevNextSibling);
                if (this.toolbar && this.toolbar.element) {
                    n.removeChild(this.toolbar.element);
                    m.removeClass(this.toolbar.element, "fullpage");
                    this.toolbar.parentNode.insertBefore(this.toolbar.element, this.toolbar.nextSibling);
                    delete this.toolbar.parentNode;
                    delete this.toolbar.nextSibling;
                }
                this.element.style.width = c[this.hash].prevElementWidth;
                this.element.style.height = c[this.hash].prevElementHeight;
                var l = 0;
                var h = function() {
                    m.setPageScroll(s.pageScroll);
                    var e = m.getPageScroll();
                    ++l < 10 && (e.x !== s.pageScroll.x || e.y !== s.pageScroll.y) && m.requestAnimationFrame(h);
                };
                m.requestAnimationFrame(h);
                c[this.hash].fullPage = !1;
                m.delegate(this, k)({});
            }
            this.navigator && this.viewport && this.navigator.update(this.viewport);
            this.raiseEvent("full-page", {
                fullPage: e
            });
            return this;
        },
        setFullScreen: function(e) {
            var t = this;
            if (!m.supportsFullScreen) return this.setFullPage(e);
            if (m.isFullScreen() === e) return this;
            var i = {
                fullScreen: e,
                preventDefaultAction: !1
            };
            this.raiseEvent("pre-full-screen", i);
            if (i.preventDefaultAction) return this;
            if (e) {
                this.setFullPage(!0);
                if (!this.isFullPage()) return this;
                this.fullPageStyleWidth = this.element.style.width;
                this.fullPageStyleHeight = this.element.style.height;
                this.element.style.width = "100%";
                this.element.style.height = "100%";
                var n = function() {
                    var e = m.isFullScreen();
                    if (!e) {
                        m.removeEvent(document, m.fullScreenEventName, n);
                        m.removeEvent(document, m.fullScreenErrorEventName, n);
                        t.setFullPage(!1);
                        if (t.isFullPage()) {
                            t.element.style.width = t.fullPageStyleWidth;
                            t.element.style.height = t.fullPageStyleHeight;
                        }
                    }
                    t.navigator && t.viewport && setTimeout(function() {
                        t.navigator.update(t.viewport);
                    });
                    t.raiseEvent("full-screen", {
                        fullScreen: e
                    });
                };
                m.addEvent(document, m.fullScreenEventName, n);
                m.addEvent(document, m.fullScreenErrorEventName, n);
                m.requestFullScreen(document.body);
            } else m.exitFullScreen();
            return this;
        },
        isVisible: function() {
            return "hidden" !== this.container.style.visibility;
        },
        isFullScreen: function() {
            return m.isFullScreen() && this.isFullPage();
        },
        setVisible: function(e) {
            this.container.style.visibility = e ? "" : "hidden";
            this.raiseEvent("visible", {
                visible: e
            });
            return this;
        },
        addTiledImage: function(i) {
            m.console.assert(i, "[Viewer.addTiledImage] options is required");
            m.console.assert(i.tileSource, "[Viewer.addTiledImage] options.tileSource is required");
            m.console.assert(!i.replace || -1 < i.index && i.index < this.world.getItemCount(), "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");
            var n = this;
            i.replace && (i.replaceItem = n.world.getItemAt(i.index));
            this._hideMessage();
            void 0 === i.placeholderFillStyle && (i.placeholderFillStyle = this.placeholderFillStyle);
            void 0 === i.opacity && (i.opacity = this.opacity);
            void 0 === i.preload && (i.preload = this.preload);
            void 0 === i.compositeOperation && (i.compositeOperation = this.compositeOperation);
            void 0 === i.crossOriginPolicy && (i.crossOriginPolicy = (void 0 !== i.tileSource.crossOriginPolicy ? i.tileSource : this).crossOriginPolicy);
            void 0 === i.ajaxWithCredentials && (i.ajaxWithCredentials = this.ajaxWithCredentials);
            void 0 === i.loadTilesWithAjax && (i.loadTilesWithAjax = this.loadTilesWithAjax);
            void 0 === i.ajaxHeaders || null === i.ajaxHeaders ? i.ajaxHeaders = this.ajaxHeaders : m.isPlainObject(i.ajaxHeaders) && m.isPlainObject(this.ajaxHeaders) && (i.ajaxHeaders = m.extend({}, this.ajaxHeaders, i.ajaxHeaders));
            var o = {
                options: i
            };
            function t(e) {
                for(var t = 0; t < n._loadQueue.length; t++)if (n._loadQueue[t] === o) {
                    n._loadQueue.splice(t, 1);
                    break;
                }
                0 === n._loadQueue.length && r(o);
                n.raiseEvent("add-item-failed", e);
                i.error && i.error(e);
            }
            function r(e) {
                if (n.collectionMode) {
                    n.world.arrange({
                        immediately: e.options.collectionImmediately,
                        rows: n.collectionRows,
                        columns: n.collectionColumns,
                        layout: n.collectionLayout,
                        tileSize: n.collectionTileSize,
                        tileMargin: n.collectionTileMargin
                    });
                    n.world.setAutoRefigureSizes(!0);
                }
            }
            if (m.isArray(i.tileSource)) setTimeout(function() {
                t({
                    message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
                    source: i.tileSource,
                    options: i
                });
            });
            else {
                this._loadQueue.push(o);
                !function(i, n, o, r, s) {
                    var a = i;
                    if ("string" === m.type(n)) {
                        if (n.match(/^\s*<.*>\s*$/)) n = m.parseXml(n);
                        else if (n.match(/^\s*[{[].*[}\]]\s*$/)) try {
                            var e = m.parseJSON(n);
                            n = e;
                        } catch (e1) {}
                    }
                    function l(e, t) {
                        if (e.ready) r(e);
                        else {
                            e.addHandler("ready", function() {
                                r(e);
                            });
                            e.addHandler("open-failed", function(e) {
                                s({
                                    message: e.message,
                                    source: t
                                });
                            });
                        }
                    }
                    setTimeout(function() {
                        if ("string" === m.type(n)) (n = new m.TileSource({
                            url: n,
                            crossOriginPolicy: (void 0 !== o.crossOriginPolicy ? o : i).crossOriginPolicy,
                            ajaxWithCredentials: i.ajaxWithCredentials,
                            ajaxHeaders: o.ajaxHeaders || i.ajaxHeaders,
                            splitHashDataForPost: i.splitHashDataForPost,
                            useCanvas: i.useCanvas,
                            success: function(e) {
                                r(e.tileSource);
                            }
                        })).addHandler("open-failed", function(e) {
                            s(e);
                        });
                        else if (m.isPlainObject(n) || n.nodeType) {
                            void 0 !== n.crossOriginPolicy || void 0 === o.crossOriginPolicy && void 0 === i.crossOriginPolicy || (n.crossOriginPolicy = (void 0 !== o.crossOriginPolicy ? o : i).crossOriginPolicy);
                            void 0 === n.ajaxWithCredentials && (n.ajaxWithCredentials = i.ajaxWithCredentials);
                            void 0 === n.useCanvas && (n.useCanvas = i.useCanvas);
                            if (m.isFunction(n.getTileUrl)) {
                                var e = new m.TileSource(n);
                                e.getTileUrl = n.getTileUrl;
                                r(e);
                            } else {
                                var t = m.TileSource.determineType(a, n);
                                if (t) {
                                    e = t.prototype.configure.apply(a, [
                                        n
                                    ]);
                                    l(new t(e), n);
                                } else s({
                                    message: "Unable to load TileSource",
                                    source: n
                                });
                            }
                        } else l(n, n);
                    });
                }(this, i.tileSource, i, function(e) {
                    o.tileSource = e;
                    s();
                }, function(e) {
                    e.options = i;
                    t(e);
                    s();
                });
            }
            function s() {
                var e, t;
                for(; n._loadQueue.length && (e = n._loadQueue[0]).tileSource;){
                    n._loadQueue.splice(0, 1);
                    if (e.options.replace) {
                        var i = n.world.getIndexOfItem(e.options.replaceItem);
                        -1 !== i && (e.options.index = i);
                        n.world.removeItem(e.options.replaceItem);
                    }
                    t = new m.TiledImage({
                        viewer: n,
                        source: e.tileSource,
                        viewport: n.viewport,
                        drawer: n.drawer,
                        tileCache: n.tileCache,
                        imageLoader: n.imageLoader,
                        x: e.options.x,
                        y: e.options.y,
                        width: e.options.width,
                        height: e.options.height,
                        fitBounds: e.options.fitBounds,
                        fitBoundsPlacement: e.options.fitBoundsPlacement,
                        clip: e.options.clip,
                        placeholderFillStyle: e.options.placeholderFillStyle,
                        opacity: e.options.opacity,
                        preload: e.options.preload,
                        degrees: e.options.degrees,
                        flipped: e.options.flipped,
                        compositeOperation: e.options.compositeOperation,
                        springStiffness: n.springStiffness,
                        animationTime: n.animationTime,
                        minZoomImageRatio: n.minZoomImageRatio,
                        wrapHorizontal: n.wrapHorizontal,
                        wrapVertical: n.wrapVertical,
                        immediateRender: n.immediateRender,
                        blendTime: n.blendTime,
                        alwaysBlend: n.alwaysBlend,
                        minPixelRatio: n.minPixelRatio,
                        smoothTileEdgesMinZoom: n.smoothTileEdgesMinZoom,
                        iOSDevice: n.iOSDevice,
                        crossOriginPolicy: e.options.crossOriginPolicy,
                        ajaxWithCredentials: e.options.ajaxWithCredentials,
                        loadTilesWithAjax: e.options.loadTilesWithAjax,
                        ajaxHeaders: e.options.ajaxHeaders,
                        debugMode: n.debugMode,
                        subPixelRoundingForTransparency: n.subPixelRoundingForTransparency
                    });
                    n.collectionMode && n.world.setAutoRefigureSizes(!1);
                    if (n.navigator) {
                        i = m.extend({}, e.options, {
                            replace: !1,
                            originalTiledImage: t,
                            tileSource: e.tileSource
                        });
                        n.navigator.addTiledImage(i);
                    }
                    n.world.addItem(t, {
                        index: e.options.index
                    });
                    0 === n._loadQueue.length && r(e);
                    1 !== n.world.getItemCount() || n.preserveViewport || n.viewport.goHome(!0);
                    e.options.success && e.options.success({
                        item: t
                    });
                }
            }
        },
        addSimpleImage: function(e) {
            m.console.assert(e, "[Viewer.addSimpleImage] options is required");
            m.console.assert(e.url, "[Viewer.addSimpleImage] options.url is required");
            e = m.extend({}, e, {
                tileSource: {
                    type: "image",
                    url: e.url
                }
            });
            delete e.url;
            this.addTiledImage(e);
        },
        addLayer: function(t) {
            var i = this;
            m.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");
            var e = m.extend({}, t, {
                success: function(e) {
                    i.raiseEvent("add-layer", {
                        options: t,
                        drawer: e.item
                    });
                },
                error: function(e) {
                    i.raiseEvent("add-layer-failed", e);
                }
            });
            this.addTiledImage(e);
            return this;
        },
        getLayerAtLevel: function(e) {
            m.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead.");
            return this.world.getItemAt(e);
        },
        getLevelOfLayer: function(e) {
            m.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead.");
            return this.world.getIndexOfItem(e);
        },
        getLayersCount: function() {
            m.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead.");
            return this.world.getItemCount();
        },
        setLayerLevel: function(e, t) {
            m.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead.");
            return this.world.setItemIndex(e, t);
        },
        removeLayer: function(e) {
            m.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead.");
            return this.world.removeItem(e);
        },
        forceRedraw: function() {
            c[this.hash].forceRedraw = !0;
            return this;
        },
        bindSequenceControls: function() {
            var e = m.delegate(this, v), t = m.delegate(this, f), i = m.delegate(this, this.goToNextPage), n = m.delegate(this, this.goToPreviousPage), o = this.navImages, r = !0;
            if (this.showSequenceControl) {
                (this.previousButton || this.nextButton) && (r = !1);
                this.previousButton = new m.Button({
                    element: this.previousButton ? m.getElement(this.previousButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: m.getString("Tooltips.PreviousPage"),
                    srcRest: H(this.prefixUrl, o.previous.REST),
                    srcGroup: H(this.prefixUrl, o.previous.GROUP),
                    srcHover: H(this.prefixUrl, o.previous.HOVER),
                    srcDown: H(this.prefixUrl, o.previous.DOWN),
                    onRelease: n,
                    onFocus: e,
                    onBlur: t
                });
                this.nextButton = new m.Button({
                    element: this.nextButton ? m.getElement(this.nextButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: m.getString("Tooltips.NextPage"),
                    srcRest: H(this.prefixUrl, o.next.REST),
                    srcGroup: H(this.prefixUrl, o.next.GROUP),
                    srcHover: H(this.prefixUrl, o.next.HOVER),
                    srcDown: H(this.prefixUrl, o.next.DOWN),
                    onRelease: i,
                    onFocus: e,
                    onBlur: t
                });
                this.navPrevNextWrap || this.previousButton.disable();
                this.tileSources && this.tileSources.length || this.nextButton.disable();
                if (r) {
                    this.paging = new m.ButtonGroup({
                        buttons: [
                            this.previousButton,
                            this.nextButton
                        ],
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold
                    });
                    this.pagingControl = this.paging.element;
                    this.toolbar ? this.toolbar.addControl(this.pagingControl, {
                        anchor: m.ControlAnchor.BOTTOM_RIGHT
                    }) : this.addControl(this.pagingControl, {
                        anchor: this.sequenceControlAnchor || m.ControlAnchor.TOP_LEFT
                    });
                }
            }
            return this;
        },
        bindStandardControls: function() {
            var e = m.delegate(this, z), t = m.delegate(this, F), i = m.delegate(this, M), n = m.delegate(this, L), o = m.delegate(this, N), r = m.delegate(this, W), s = m.delegate(this, U), a = m.delegate(this, V), l = m.delegate(this, G), h = m.delegate(this, j), c = m.delegate(this, v), u = m.delegate(this, f), d = this.navImages, p = [], g = !0;
            if (this.showNavigationControl) {
                (this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton || this.rotateLeftButton || this.rotateRightButton || this.flipButton) && (g = !1);
                if (this.showZoomControl) {
                    p.push(this.zoomInButton = new m.Button({
                        element: this.zoomInButton ? m.getElement(this.zoomInButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: m.getString("Tooltips.ZoomIn"),
                        srcRest: H(this.prefixUrl, d.zoomIn.REST),
                        srcGroup: H(this.prefixUrl, d.zoomIn.GROUP),
                        srcHover: H(this.prefixUrl, d.zoomIn.HOVER),
                        srcDown: H(this.prefixUrl, d.zoomIn.DOWN),
                        onPress: e,
                        onRelease: t,
                        onClick: i,
                        onEnter: e,
                        onExit: t,
                        onFocus: c,
                        onBlur: u
                    }));
                    p.push(this.zoomOutButton = new m.Button({
                        element: this.zoomOutButton ? m.getElement(this.zoomOutButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: m.getString("Tooltips.ZoomOut"),
                        srcRest: H(this.prefixUrl, d.zoomOut.REST),
                        srcGroup: H(this.prefixUrl, d.zoomOut.GROUP),
                        srcHover: H(this.prefixUrl, d.zoomOut.HOVER),
                        srcDown: H(this.prefixUrl, d.zoomOut.DOWN),
                        onPress: n,
                        onRelease: t,
                        onClick: o,
                        onEnter: n,
                        onExit: t,
                        onFocus: c,
                        onBlur: u
                    }));
                }
                this.showHomeControl && p.push(this.homeButton = new m.Button({
                    element: this.homeButton ? m.getElement(this.homeButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: m.getString("Tooltips.Home"),
                    srcRest: H(this.prefixUrl, d.home.REST),
                    srcGroup: H(this.prefixUrl, d.home.GROUP),
                    srcHover: H(this.prefixUrl, d.home.HOVER),
                    srcDown: H(this.prefixUrl, d.home.DOWN),
                    onRelease: r,
                    onFocus: c,
                    onBlur: u
                }));
                this.showFullPageControl && p.push(this.fullPageButton = new m.Button({
                    element: this.fullPageButton ? m.getElement(this.fullPageButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: m.getString("Tooltips.FullPage"),
                    srcRest: H(this.prefixUrl, d.fullpage.REST),
                    srcGroup: H(this.prefixUrl, d.fullpage.GROUP),
                    srcHover: H(this.prefixUrl, d.fullpage.HOVER),
                    srcDown: H(this.prefixUrl, d.fullpage.DOWN),
                    onRelease: s,
                    onFocus: c,
                    onBlur: u
                }));
                if (this.showRotationControl) {
                    p.push(this.rotateLeftButton = new m.Button({
                        element: this.rotateLeftButton ? m.getElement(this.rotateLeftButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: m.getString("Tooltips.RotateLeft"),
                        srcRest: H(this.prefixUrl, d.rotateleft.REST),
                        srcGroup: H(this.prefixUrl, d.rotateleft.GROUP),
                        srcHover: H(this.prefixUrl, d.rotateleft.HOVER),
                        srcDown: H(this.prefixUrl, d.rotateleft.DOWN),
                        onRelease: a,
                        onFocus: c,
                        onBlur: u
                    }));
                    p.push(this.rotateRightButton = new m.Button({
                        element: this.rotateRightButton ? m.getElement(this.rotateRightButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: m.getString("Tooltips.RotateRight"),
                        srcRest: H(this.prefixUrl, d.rotateright.REST),
                        srcGroup: H(this.prefixUrl, d.rotateright.GROUP),
                        srcHover: H(this.prefixUrl, d.rotateright.HOVER),
                        srcDown: H(this.prefixUrl, d.rotateright.DOWN),
                        onRelease: l,
                        onFocus: c,
                        onBlur: u
                    }));
                }
                this.showFlipControl && p.push(this.flipButton = new m.Button({
                    element: this.flipButton ? m.getElement(this.flipButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: m.getString("Tooltips.Flip"),
                    srcRest: H(this.prefixUrl, d.flip.REST),
                    srcGroup: H(this.prefixUrl, d.flip.GROUP),
                    srcHover: H(this.prefixUrl, d.flip.HOVER),
                    srcDown: H(this.prefixUrl, d.flip.DOWN),
                    onRelease: h,
                    onFocus: c,
                    onBlur: u
                }));
                if (g) {
                    this.buttonGroup = new m.ButtonGroup({
                        buttons: p,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold
                    });
                    this.navControl = this.buttonGroup.element;
                    this.addHandler("open", m.delegate(this, A));
                    (this.toolbar || this).addControl(this.navControl, {
                        anchor: this.navigationControlAnchor || m.ControlAnchor.TOP_LEFT
                    });
                } else this.customButtons = p;
            }
            return this;
        },
        currentPage: function() {
            return this._sequenceIndex;
        },
        goToPage: function(e) {
            if (this.tileSources && 0 <= e && e < this.tileSources.length) {
                this._sequenceIndex = e;
                this._updateSequenceButtons(e);
                this.open(this.tileSources[e]);
                this.referenceStrip && this.referenceStrip.setFocus(e);
                this.raiseEvent("page", {
                    page: e
                });
            }
            return this;
        },
        addOverlay: function(e, t, i, n) {
            i = m.isPlainObject(e) ? e : {
                element: e,
                location: t,
                placement: i,
                onDraw: n
            };
            e = m.getElement(i.element);
            if (0 <= r(this.currentOverlays, e)) return this;
            n = h(this, i);
            this.currentOverlays.push(n);
            n.drawHTML(this.overlaysContainer, this.viewport);
            this.raiseEvent("add-overlay", {
                element: e,
                location: i.location,
                placement: i.placement
            });
            return this;
        },
        updateOverlay: function(e, t, i) {
            var n;
            e = m.getElement(e);
            if (0 <= (n = r(this.currentOverlays, e))) {
                this.currentOverlays[n].update(t, i);
                c[this.hash].forceRedraw = !0;
                this.raiseEvent("update-overlay", {
                    element: e,
                    location: t,
                    placement: i
                });
            }
            return this;
        },
        removeOverlay: function(e) {
            var t;
            e = m.getElement(e);
            if (0 <= (t = r(this.currentOverlays, e))) {
                this.currentOverlays[t].destroy();
                this.currentOverlays.splice(t, 1);
                c[this.hash].forceRedraw = !0;
                this.raiseEvent("remove-overlay", {
                    element: e
                });
            }
            return this;
        },
        clearOverlays: function() {
            for(; 0 < this.currentOverlays.length;)this.currentOverlays.pop().destroy();
            c[this.hash].forceRedraw = !0;
            this.raiseEvent("clear-overlay", {});
            return this;
        },
        getOverlayById: function(e) {
            e = m.getElement(e);
            return 0 <= (e = r(this.currentOverlays, e)) ? this.currentOverlays[e] : null;
        },
        _updateSequenceButtons: function(e) {
            this.nextButton && (this.tileSources && this.tileSources.length - 1 !== e ? this.nextButton.enable() : this.navPrevNextWrap || this.nextButton.disable());
            this.previousButton && (0 < e ? this.previousButton.enable() : this.navPrevNextWrap || this.previousButton.disable());
        },
        _showMessage: function(e) {
            this._hideMessage();
            var t = m.makeNeutralElement("div");
            t.appendChild(document.createTextNode(e));
            this.messageDiv = m.makeCenteredNode(t);
            m.addClass(this.messageDiv, "openseadragon-message");
            this.container.appendChild(this.messageDiv);
        },
        _hideMessage: function() {
            var e = this.messageDiv;
            if (e) {
                e.parentNode.removeChild(e);
                delete this.messageDiv;
            }
        },
        gestureSettingsByDeviceType: function(e) {
            switch(e){
                case "mouse":
                    return this.gestureSettingsMouse;
                case "touch":
                    return this.gestureSettingsTouch;
                case "pen":
                    return this.gestureSettingsPen;
                default:
                    return this.gestureSettingsUnknown;
            }
        },
        _drawOverlays: function() {
            var e, t = this.currentOverlays.length;
            for(e = 0; e < t; e++)this.currentOverlays[e].drawHTML(this.overlaysContainer, this.viewport);
        },
        _cancelPendingImages: function() {
            this._loadQueue = [];
        },
        removeReferenceStrip: function() {
            this.showReferenceStrip = !1;
            if (this.referenceStrip) {
                this.referenceStrip.destroy();
                this.referenceStrip = null;
            }
        },
        addReferenceStrip: function() {
            this.showReferenceStrip = !0;
            if (this.sequenceMode) {
                if (!this.referenceStrip && this.tileSources.length && 1 < this.tileSources.length) {
                    this.referenceStrip = new m.ReferenceStrip({
                        id: this.referenceStripElement,
                        position: this.referenceStripPosition,
                        sizeRatio: this.referenceStripSizeRatio,
                        scroll: this.referenceStripScroll,
                        height: this.referenceStripHeight,
                        width: this.referenceStripWidth,
                        tileSources: this.tileSources,
                        prefixUrl: this.prefixUrl,
                        useCanvas: this.useCanvas,
                        viewer: this
                    });
                    this.referenceStrip.setFocus(this._sequenceIndex);
                }
            } else m.console.warn('Attempting to display a reference strip while "sequenceMode" is off.');
        },
        _addUpdatePixelDensityRatioEvent: function() {
            this._updatePixelDensityRatioBind = this._updatePixelDensityRatio.bind(this);
            m.addEvent(window, "resize", this._updatePixelDensityRatioBind);
        },
        _removeUpdatePixelDensityRatioEvent: function() {
            m.removeEvent(window, "resize", this._updatePixelDensityRatioBind);
        },
        _updatePixelDensityRatio: function() {
            var e = m.pixelDensityRatio;
            var t = m.getCurrentPixelDensityRatio();
            if (e !== t) {
                m.pixelDensityRatio = t;
                this.world.resetItems();
                this.forceRedraw();
            }
        },
        goToPreviousPage: function() {
            var e = this._sequenceIndex - 1;
            this.navPrevNextWrap && e < 0 && (e += this.tileSources.length);
            this.goToPage(e);
        },
        goToNextPage: function() {
            var e = this._sequenceIndex + 1;
            this.navPrevNextWrap && e >= this.tileSources.length && (e = 0);
            this.goToPage(e);
        },
        isAnimating: function() {
            return c[this.hash].animating;
        }
    });
    function s(e) {
        e = m.getElement(e);
        return new m.Point(0 === e.clientWidth ? 1 : e.clientWidth, 0 === e.clientHeight ? 1 : e.clientHeight);
    }
    function h(e, t) {
        if (t instanceof m.Overlay) return t;
        var i = null;
        if (t.element) i = m.getElement(t.element);
        else {
            var n = t.id || "openseadragon-overlay-" + Math.floor(1e7 * Math.random());
            (i = m.getElement(t.id)) || ((i = document.createElement("a")).href = "#/overlay/" + n);
            i.id = n;
            m.addClass(i, t.className || "openseadragon-overlay");
        }
        var o = t.location;
        var r = t.width;
        var s = t.height;
        if (!o) {
            n = t.x;
            var a = t.y;
            if (void 0 !== t.px) {
                e = e.viewport.imageToViewportRectangle(new m.Rect(t.px, t.py, r || 0, s || 0));
                n = e.x;
                a = e.y;
                r = void 0 !== r ? e.width : void 0;
                s = void 0 !== s ? e.height : void 0;
            }
            o = new m.Point(n, a);
        }
        a = t.placement;
        a && "string" === m.type(a) && (a = m.Placement[t.placement.toUpperCase()]);
        return new m.Overlay({
            element: i,
            location: o,
            placement: a,
            onDraw: t.onDraw,
            checkResize: t.checkResize,
            width: r,
            height: s,
            rotationMode: t.rotationMode
        });
    }
    function r(e, t) {
        var i;
        for(i = e.length - 1; 0 <= i; i--)if (e[i].element === t) return i;
        return -1;
    }
    function a(e, t) {
        return m.requestAnimationFrame(function() {
            t(e);
        });
    }
    function l(e) {
        m.requestAnimationFrame(function() {
            !function(e) {
                var t, i, n;
                if (e.controlsShouldFade) {
                    t = m.now();
                    t = t - e.controlsFadeBeginTime;
                    i = 1 - t / e.controlsFadeLength;
                    i = Math.min(1, i);
                    i = Math.max(0, i);
                    for(n = e.controls.length - 1; 0 <= n; n--)e.controls[n].autoFade && e.controls[n].setOpacity(i);
                    0 < i && l(e);
                }
            }(e);
        });
    }
    function u(e) {
        if (e.autoHideControls) {
            e.controlsShouldFade = !0;
            e.controlsFadeBeginTime = m.now() + e.controlsFadeDelay;
            window.setTimeout(function() {
                l(e);
            }, e.controlsFadeDelay);
        }
    }
    function d(e) {
        var t;
        e.controlsShouldFade = !1;
        for(t = e.controls.length - 1; 0 <= t; t--)e.controls[t].setOpacity(1);
    }
    function v() {
        d(this);
    }
    function f() {
        u(this);
    }
    function p(e) {
        var t = {
            tracker: e.eventSource,
            position: e.position,
            originalEvent: e.originalEvent,
            preventDefault: e.preventDefault
        };
        this.raiseEvent("canvas-contextmenu", t);
        e.preventDefault = t.preventDefault;
    }
    function g(e) {
        var t = {
            originalEvent: e.originalEvent,
            preventDefaultAction: !1,
            preventVerticalPan: e.preventVerticalPan || !this.panVertical,
            preventHorizontalPan: e.preventHorizontalPan || !this.panHorizontal
        };
        this.raiseEvent("canvas-key", t);
        if (t.preventDefaultAction || e.ctrl || e.alt || e.meta) e.preventDefault = !1;
        else switch(e.keyCode){
            case 38:
                if (!t.preventVerticalPan) {
                    e.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(0, -this.pixelsPerArrowPress)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 40:
                if (!t.preventVerticalPan) {
                    e.shift ? this.viewport.zoomBy(.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(0, this.pixelsPerArrowPress)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 37:
                if (!t.preventHorizontalPan) {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(-this.pixelsPerArrowPress, 0)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 39:
                if (!t.preventHorizontalPan) {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(this.pixelsPerArrowPress, 0)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            default:
                e.preventDefault = !1;
        }
    }
    function y(e) {
        var t = {
            originalEvent: e.originalEvent,
            preventDefaultAction: !1,
            preventVerticalPan: e.preventVerticalPan || !this.panVertical,
            preventHorizontalPan: e.preventHorizontalPan || !this.panHorizontal
        };
        this.raiseEvent("canvas-key", t);
        if (t.preventDefaultAction || e.ctrl || e.alt || e.meta) e.preventDefault = !1;
        else switch(e.keyCode){
            case 43:
            case 61:
                this.viewport.zoomBy(1.1);
                this.viewport.applyConstraints();
                e.preventDefault = !0;
                break;
            case 45:
                this.viewport.zoomBy(.9);
                this.viewport.applyConstraints();
                e.preventDefault = !0;
                break;
            case 48:
                this.viewport.goHome();
                this.viewport.applyConstraints();
                e.preventDefault = !0;
                break;
            case 119:
            case 87:
                if (!t.preventVerticalPan) {
                    e.shift ? this.viewport.zoomBy(1.1) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(0, -40)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 115:
            case 83:
                if (!t.preventVerticalPan) {
                    e.shift ? this.viewport.zoomBy(.9) : this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(0, 40)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 97:
                if (!t.preventHorizontalPan) {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(-40, 0)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 100:
                if (!t.preventHorizontalPan) {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new m.Point(40, 0)));
                    this.viewport.applyConstraints();
                }
                e.preventDefault = !0;
                break;
            case 114:
                this.viewport.flipped ? this.viewport.setRotation(m.positiveModulo(this.viewport.degrees - this.rotationIncrement, 360)) : this.viewport.setRotation(m.positiveModulo(this.viewport.degrees + this.rotationIncrement, 360));
                this.viewport.applyConstraints();
                e.preventDefault = !0;
                break;
            case 82:
                this.viewport.flipped ? this.viewport.setRotation(m.positiveModulo(this.viewport.degrees + this.rotationIncrement, 360)) : this.viewport.setRotation(m.positiveModulo(this.viewport.degrees - this.rotationIncrement, 360));
                this.viewport.applyConstraints();
                e.preventDefault = !0;
                break;
            case 102:
                this.viewport.toggleFlip();
                e.preventDefault = !0;
                break;
            case 106:
                this.goToPreviousPage();
                break;
            case 107:
                this.goToNextPage();
                break;
            default:
                e.preventDefault = !1;
        }
    }
    function w(e) {
        var t;
        document.activeElement === this.canvas || this.canvas.focus();
        this.viewport.flipped && (e.position.x = this.viewport.getContainerSize().x - e.position.x);
        var i = {
            tracker: e.eventSource,
            position: e.position,
            quick: e.quick,
            shift: e.shift,
            originalEvent: e.originalEvent,
            originalTarget: e.originalTarget,
            preventDefaultAction: !1
        };
        this.raiseEvent("canvas-click", i);
        if (!i.preventDefaultAction && this.viewport && e.quick && (t = this.gestureSettingsByDeviceType(e.pointerType)).clickToZoom) {
            this.viewport.zoomBy(e.shift ? 1 / this.zoomPerClick : this.zoomPerClick, t.zoomToRefPoint ? this.viewport.pointFromPixel(e.position, !0) : null);
            this.viewport.applyConstraints();
        }
    }
    function T(e) {
        var t;
        var i = {
            tracker: e.eventSource,
            position: e.position,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultAction: !1
        };
        this.raiseEvent("canvas-double-click", i);
        if (!i.preventDefaultAction && this.viewport && (t = this.gestureSettingsByDeviceType(e.pointerType)).dblClickToZoom) {
            this.viewport.zoomBy(e.shift ? 1 / this.zoomPerClick : this.zoomPerClick, t.zoomToRefPoint ? this.viewport.pointFromPixel(e.position, !0) : null);
            this.viewport.applyConstraints();
        }
    }
    function x(e) {
        var t;
        var i = {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            delta: e.delta,
            speed: e.speed,
            direction: e.direction,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultAction: !1
        };
        this.raiseEvent("canvas-drag", i);
        if ((t = this.gestureSettingsByDeviceType(e.pointerType)).dragToPan && !i.preventDefaultAction && this.viewport) {
            this.panHorizontal || (e.delta.x = 0);
            this.panVertical || (e.delta.y = 0);
            this.viewport.flipped && (e.delta.x = -e.delta.x);
            if (this.constrainDuringPan) {
                var n = this.viewport.deltaPointsFromPixels(e.delta.negate());
                this.viewport.centerSpringX.target.value += n.x;
                this.viewport.centerSpringY.target.value += n.y;
                var o = this.viewport.getBounds();
                i = this.viewport.getConstrainedBounds();
                this.viewport.centerSpringX.target.value -= n.x;
                this.viewport.centerSpringY.target.value -= n.y;
                o.x !== i.x && (e.delta.x = 0);
                o.y !== i.y && (e.delta.y = 0);
            }
            this.viewport.panBy(this.viewport.deltaPointsFromPixels(e.delta.negate()), t.flickEnabled && !this.constrainDuringPan);
        }
    }
    function S(e) {
        var t = {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            speed: e.speed,
            direction: e.direction,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultAction: !1
        };
        this.raiseEvent("canvas-drag-end", t);
        if (!t.preventDefaultAction && this.viewport) {
            var i = this.gestureSettingsByDeviceType(e.pointerType);
            if (i.flickEnabled && e.speed >= i.flickMinSpeed) {
                var n = 0;
                this.panHorizontal && (n = i.flickMomentum * e.speed * Math.cos(e.direction));
                t = 0;
                this.panVertical && (t = i.flickMomentum * e.speed * Math.sin(e.direction));
                e = this.viewport.pixelFromPoint(this.viewport.getCenter(!0));
                t = this.viewport.pointFromPixel(new m.Point(e.x - n, e.y - t));
                this.viewport.panTo(t, !1);
            }
            this.viewport.applyConstraints();
        }
    }
    function E(e) {
        this.raiseEvent("canvas-enter", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            buttons: e.buttons,
            pointers: e.pointers,
            insideElementPressed: e.insideElementPressed,
            buttonDownAny: e.buttonDownAny,
            originalEvent: e.originalEvent
        });
    }
    function P(e) {
        this.raiseEvent("canvas-exit", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            buttons: e.buttons,
            pointers: e.pointers,
            insideElementPressed: e.insideElementPressed,
            buttonDownAny: e.buttonDownAny,
            originalEvent: e.originalEvent
        });
    }
    function _(e) {
        this.raiseEvent("canvas-press", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            insideElementPressed: e.insideElementPressed,
            insideElementReleased: e.insideElementReleased,
            originalEvent: e.originalEvent
        });
    }
    function R(e) {
        this.raiseEvent("canvas-release", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            insideElementPressed: e.insideElementPressed,
            insideElementReleased: e.insideElementReleased,
            originalEvent: e.originalEvent
        });
    }
    function C(e) {
        this.raiseEvent("canvas-nonprimary-press", {
            tracker: e.eventSource,
            position: e.position,
            pointerType: e.pointerType,
            button: e.button,
            buttons: e.buttons,
            originalEvent: e.originalEvent
        });
    }
    function b(e) {
        this.raiseEvent("canvas-nonprimary-release", {
            tracker: e.eventSource,
            position: e.position,
            pointerType: e.pointerType,
            button: e.button,
            buttons: e.buttons,
            originalEvent: e.originalEvent
        });
    }
    function D(e) {
        var t, i, n;
        var o = {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            gesturePoints: e.gesturePoints,
            lastCenter: e.lastCenter,
            center: e.center,
            lastDistance: e.lastDistance,
            distance: e.distance,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultPanAction: !1,
            preventDefaultZoomAction: !1,
            preventDefaultRotateAction: !1
        };
        this.raiseEvent("canvas-pinch", o);
        if (this.viewport) {
            if ((t = this.gestureSettingsByDeviceType(e.pointerType)).pinchToZoom && (!o.preventDefaultPanAction || !o.preventDefaultZoomAction)) {
                i = this.viewport.pointFromPixel(e.center, !0);
                if (t.zoomToRefPoint && !o.preventDefaultPanAction) {
                    n = this.viewport.pointFromPixel(e.lastCenter, !0).minus(i);
                    this.panHorizontal || (n.x = 0);
                    this.panVertical || (n.y = 0);
                    this.viewport.panBy(n, !0);
                }
                o.preventDefaultZoomAction || this.viewport.zoomBy(e.distance / e.lastDistance, i, !0);
                this.viewport.applyConstraints();
            }
            if (t.pinchRotate && !o.preventDefaultRotateAction) {
                o = Math.atan2(e.gesturePoints[0].currentPos.y - e.gesturePoints[1].currentPos.y, e.gesturePoints[0].currentPos.x - e.gesturePoints[1].currentPos.x);
                e = Math.atan2(e.gesturePoints[0].lastPos.y - e.gesturePoints[1].lastPos.y, e.gesturePoints[0].lastPos.x - e.gesturePoints[1].lastPos.x);
                this.viewport.setRotation(this.viewport.getRotation() + (o - e) * (180 / Math.PI));
            }
        }
    }
    function I(e) {
        var t, i, n;
        if ((n = m.now()) - this._lastScrollTime > this.minScrollDeltaTime) {
            this._lastScrollTime = n;
            t = {
                tracker: e.eventSource,
                position: e.position,
                scroll: e.scroll,
                shift: e.shift,
                originalEvent: e.originalEvent,
                preventDefaultAction: !1,
                preventDefault: !0
            };
            this.raiseEvent("canvas-scroll", t);
            if (!t.preventDefaultAction && this.viewport) {
                this.viewport.flipped && (e.position.x = this.viewport.getContainerSize().x - e.position.x);
                if ((i = this.gestureSettingsByDeviceType(e.pointerType)).scrollToZoom) {
                    n = Math.pow(this.zoomPerScroll, e.scroll);
                    this.viewport.zoomBy(n, i.zoomToRefPoint ? this.viewport.pointFromPixel(e.position, !0) : null);
                    this.viewport.applyConstraints();
                }
            }
            e.preventDefault = t.preventDefault;
        } else e.preventDefault = !0;
    }
    function O(e) {
        c[this.hash].mouseInside = !0;
        d(this);
        this.raiseEvent("container-enter", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            buttons: e.buttons,
            pointers: e.pointers,
            insideElementPressed: e.insideElementPressed,
            buttonDownAny: e.buttonDownAny,
            originalEvent: e.originalEvent
        });
    }
    function k(e) {
        if (e.pointers < 1) {
            c[this.hash].mouseInside = !1;
            c[this.hash].animating || u(this);
        }
        this.raiseEvent("container-exit", {
            tracker: e.eventSource,
            pointerType: e.pointerType,
            position: e.position,
            buttons: e.buttons,
            pointers: e.pointers,
            insideElementPressed: e.insideElementPressed,
            buttonDownAny: e.buttonDownAny,
            originalEvent: e.originalEvent
        });
    }
    function B(e) {
        !function(e) {
            if (!e._opening && c[e.hash]) {
                if (e.autoResize) {
                    var t = s(e.container);
                    var i = c[e.hash].prevContainerSize;
                    if (!t.equals(i)) {
                        var n = e.viewport;
                        if (e.preserveImageSizeOnResize) {
                            var o = i.x / t.x;
                            i = n.getZoom() * o;
                            o = n.getCenter();
                            n.resize(t, !1);
                            n.zoomTo(i, null, !0);
                            n.panTo(o, !0);
                        } else {
                            var r = n.getBounds();
                            n.resize(t, !0);
                            n.fitBoundsWithConstraints(r, !0);
                        }
                        c[e.hash].prevContainerSize = t;
                        c[e.hash].forceRedraw = !0;
                    }
                }
                r = e.viewport.update();
                t = e.world.update() || r;
                r && e.raiseEvent("viewport-change");
                e.referenceStrip && (t = e.referenceStrip.update(e.viewport) || t);
                r = c[e.hash].animating;
                if (!r && t) {
                    e.raiseEvent("animation-start");
                    d(e);
                }
                r = r && !t;
                r && (c[e.hash].animating = !1);
                if (t || r || c[e.hash].forceRedraw || e.world.needsDraw()) {
                    !function(e) {
                        e.imageLoader.clear();
                        e.drawer.clear();
                        e.world.draw();
                        e.raiseEvent("update-viewport", {});
                    }(e);
                    e._drawOverlays();
                    e.navigator && e.navigator.update(e.viewport);
                    c[e.hash].forceRedraw = !1;
                    t && e.raiseEvent("animation");
                }
                if (r) {
                    e.raiseEvent("animation-finish");
                    c[e.hash].mouseInside || u(e);
                }
                c[e.hash].animating = t;
            }
        }(e);
        e.isOpen() ? e._updateRequestId = a(e, B) : e._updateRequestId = !1;
    }
    function H(e, t) {
        return e ? e + t : t;
    }
    function z() {
        c[this.hash].lastZoomTime = m.now();
        c[this.hash].zoomFactor = this.zoomPerSecond;
        c[this.hash].zooming = !0;
        i(this);
    }
    function L() {
        c[this.hash].lastZoomTime = m.now();
        c[this.hash].zoomFactor = 1 / this.zoomPerSecond;
        c[this.hash].zooming = !0;
        i(this);
    }
    function F() {
        c[this.hash].zooming = !1;
    }
    function i(e) {
        m.requestAnimationFrame(m.delegate(e, t));
    }
    function t() {
        var e, t;
        if (c[this.hash].zooming && this.viewport) {
            t = (e = m.now()) - c[this.hash].lastZoomTime;
            t = Math.pow(c[this.hash].zoomFactor, t / 1e3);
            this.viewport.zoomBy(t);
            this.viewport.applyConstraints();
            c[this.hash].lastZoomTime = e;
            i(this);
        }
    }
    function M() {
        if (this.viewport) {
            c[this.hash].zooming = !1;
            this.viewport.zoomBy(+this.zoomPerClick);
            this.viewport.applyConstraints();
        }
    }
    function N() {
        if (this.viewport) {
            c[this.hash].zooming = !1;
            this.viewport.zoomBy(1 / this.zoomPerClick);
            this.viewport.applyConstraints();
        }
    }
    function A() {
        if (this.buttonGroup) {
            this.buttonGroup.emulateEnter();
            this.buttonGroup.emulateLeave();
        }
    }
    function W() {
        this.viewport && this.viewport.goHome();
    }
    function U() {
        this.isFullPage() && !m.isFullScreen() ? this.setFullPage(!1) : this.setFullScreen(!this.isFullPage());
        this.buttonGroup && this.buttonGroup.emulateLeave();
        this.fullPageButton.element.focus();
        this.viewport && this.viewport.applyConstraints();
    }
    function V() {
        if (this.viewport) {
            var e = this.viewport.getRotation();
            e = this.viewport.flipped ? m.positiveModulo(e + this.rotationIncrement, 360) : m.positiveModulo(e - this.rotationIncrement, 360);
            this.viewport.setRotation(e);
        }
    }
    function G() {
        if (this.viewport) {
            var e = this.viewport.getRotation();
            e = this.viewport.flipped ? m.positiveModulo(e - this.rotationIncrement, 360) : m.positiveModulo(e + this.rotationIncrement, 360);
            this.viewport.setRotation(e);
        }
    }
    function j() {
        this.viewport.toggleFlip();
    }
}(OpenSeadragon);
!function(r) {
    r.Navigator = function(i) {
        var e, t = i.viewer, n = this;
        if (i.id) {
            this.element = document.getElementById(i.id);
            i.controlOptions = {
                anchor: r.ControlAnchor.NONE,
                attachToViewer: !1,
                autoFade: !1
            };
        } else {
            i.id = "navigator-" + r.now();
            this.element = r.makeNeutralElement("div");
            i.controlOptions = {
                anchor: r.ControlAnchor.TOP_RIGHT,
                attachToViewer: !0,
                autoFade: i.autoFade
            };
            if (i.position) {
                if ("BOTTOM_RIGHT" === i.position) i.controlOptions.anchor = r.ControlAnchor.BOTTOM_RIGHT;
                else if ("BOTTOM_LEFT" === i.position) i.controlOptions.anchor = r.ControlAnchor.BOTTOM_LEFT;
                else if ("TOP_RIGHT" === i.position) i.controlOptions.anchor = r.ControlAnchor.TOP_RIGHT;
                else if ("TOP_LEFT" === i.position) i.controlOptions.anchor = r.ControlAnchor.TOP_LEFT;
                else if ("ABSOLUTE" === i.position) {
                    i.controlOptions.anchor = r.ControlAnchor.ABSOLUTE;
                    i.controlOptions.top = i.top;
                    i.controlOptions.left = i.left;
                    i.controlOptions.height = i.height;
                    i.controlOptions.width = i.width;
                }
            }
        }
        this.element.id = i.id;
        this.element.className += " navigator";
        (i = r.extend(!0, {
            sizeRatio: r.DEFAULT_SETTINGS.navigatorSizeRatio
        }, i, {
            element: this.element,
            tabIndex: -1,
            showNavigator: !1,
            mouseNavEnabled: !1,
            showNavigationControl: !1,
            showSequenceControl: !1,
            immediateRender: !0,
            blendTime: 0,
            animationTime: 0,
            autoResize: i.autoResize,
            minZoomImageRatio: 1,
            background: i.background,
            opacity: i.opacity,
            borderColor: i.borderColor,
            displayRegionColor: i.displayRegionColor
        })).minPixelRatio = this.minPixelRatio = t.minPixelRatio;
        r.setElementTouchActionNone(this.element);
        this.borderWidth = 2;
        this.fudge = new r.Point(1, 1);
        this.totalBorderWidths = new r.Point(2 * this.borderWidth, 2 * this.borderWidth).minus(this.fudge);
        i.controlOptions.anchor !== r.ControlAnchor.NONE && function(e, t) {
            e.margin = "0px";
            e.border = t + "px solid " + i.borderColor;
            e.padding = "0px";
            e.background = i.background;
            e.opacity = i.opacity;
            e.overflow = "hidden";
        }(this.element.style, this.borderWidth);
        this.displayRegion = r.makeNeutralElement("div");
        this.displayRegion.id = this.element.id + "-displayregion";
        this.displayRegion.className = "displayregion";
        !function(e, t) {
            e.position = "relative";
            e.top = "0px";
            e.left = "0px";
            e.fontSize = "0px";
            e.overflow = "hidden";
            e.border = t + "px solid " + i.displayRegionColor;
            e.margin = "0px";
            e.padding = "0px";
            e.background = "transparent";
            e.float = "left";
            e.cssFloat = "left";
            e.styleFloat = "left";
            e.zIndex = 999999999;
            e.cursor = "default";
        }(this.displayRegion.style, this.borderWidth);
        r.setElementPointerEventsNone(this.displayRegion);
        r.setElementTouchActionNone(this.displayRegion);
        this.displayRegionContainer = r.makeNeutralElement("div");
        this.displayRegionContainer.id = this.element.id + "-displayregioncontainer";
        this.displayRegionContainer.className = "displayregioncontainer";
        this.displayRegionContainer.style.width = "100%";
        this.displayRegionContainer.style.height = "100%";
        r.setElementPointerEventsNone(this.displayRegionContainer);
        r.setElementTouchActionNone(this.displayRegionContainer);
        t.addControl(this.element, i.controlOptions);
        this._resizeWithViewer = i.controlOptions.anchor !== r.ControlAnchor.ABSOLUTE && i.controlOptions.anchor !== r.ControlAnchor.NONE;
        if (i.width && i.height) {
            this.setWidth(i.width);
            this.setHeight(i.height);
        } else if (this._resizeWithViewer) {
            e = r.getElementSize(t.element);
            this.element.style.height = Math.round(e.y * i.sizeRatio) + "px";
            this.element.style.width = Math.round(e.x * i.sizeRatio) + "px";
            this.oldViewerSize = e;
            e = r.getElementSize(this.element);
            this.elementArea = e.x * e.y;
        }
        this.oldContainerSize = new r.Point(0, 0);
        r.Viewer.apply(this, [
            i
        ]);
        this.displayRegionContainer.appendChild(this.displayRegion);
        this.element.getElementsByTagName("div")[0].appendChild(this.displayRegionContainer);
        function o(e) {
            c(n.displayRegionContainer, e);
            c(n.displayRegion, -e);
            n.viewport.setRotation(e);
        }
        if (i.navigatorRotate) {
            o(i.viewer.viewport ? i.viewer.viewport.getRotation() : i.viewer.degrees || 0);
            i.viewer.addHandler("rotate", function(e) {
                o(e.degrees);
            });
        }
        this.innerTracker.destroy();
        this.innerTracker = new r.MouseTracker({
            userData: "Navigator.innerTracker",
            element: this.element,
            dragHandler: r.delegate(this, a),
            clickHandler: r.delegate(this, s),
            releaseHandler: r.delegate(this, l),
            scrollHandler: r.delegate(this, h),
            preProcessEventHandler: function(e) {
                "wheel" === e.eventType && (e.preventDefault = !0);
            }
        });
        this.outerTracker.userData = "Navigator.outerTracker";
        r.setElementPointerEventsNone(this.canvas);
        r.setElementPointerEventsNone(this.container);
        this.addHandler("reset-size", function() {
            n.viewport && n.viewport.goHome(!0);
        });
        t.world.addHandler("item-index-change", function(t) {
            window.setTimeout(function() {
                var e = n.world.getItemAt(t.previousIndex);
                n.world.setItemIndex(e, t.newIndex);
            }, 1);
        });
        t.world.addHandler("remove-item", function(e) {
            e = e.item;
            e = n._getMatchingItem(e);
            e && n.world.removeItem(e);
        });
        this.update(t.viewport);
    };
    r.extend(r.Navigator.prototype, r.EventSource.prototype, r.Viewer.prototype, {
        updateSize: function() {
            if (this.viewport) {
                var e = new r.Point(0 === this.container.clientWidth ? 1 : this.container.clientWidth, 0 === this.container.clientHeight ? 1 : this.container.clientHeight);
                if (!e.equals(this.oldContainerSize)) {
                    this.viewport.resize(e, !0);
                    this.viewport.goHome(!0);
                    this.oldContainerSize = e;
                    this.drawer.clear();
                    this.world.draw();
                }
            }
        },
        setWidth: function(e) {
            this.width = e;
            this.element.style.width = "number" == typeof e ? e + "px" : e;
            this._resizeWithViewer = !1;
        },
        setHeight: function(e) {
            this.height = e;
            this.element.style.height = "number" == typeof e ? e + "px" : e;
            this._resizeWithViewer = !1;
        },
        setFlip: function(e) {
            this.viewport.setFlip(e);
            this.setDisplayTransform(this.viewer.viewport.getFlip() ? "scale(-1,1)" : "scale(1,1)");
            return this;
        },
        setDisplayTransform: function(e) {
            i(this.displayRegion, e);
            i(this.canvas, e);
            i(this.element, e);
        },
        update: function(e) {
            var t;
            i = r.getElementSize(this.viewer.element);
            if (this._resizeWithViewer && i.x && i.y && !i.equals(this.oldViewerSize)) {
                this.oldViewerSize = i;
                if (this.maintainSizeRatio || !this.elementArea) {
                    t = i.x * this.sizeRatio;
                    n = i.y * this.sizeRatio;
                } else {
                    t = Math.sqrt(this.elementArea * (i.x / i.y));
                    n = this.elementArea / t;
                }
                this.element.style.width = Math.round(t) + "px";
                this.element.style.height = Math.round(n) + "px";
                this.elementArea || (this.elementArea = t * n);
                this.updateSize();
            }
            if (e && this.viewport) {
                i = e.getBoundsNoRotate(!0);
                t = this.viewport.pixelFromPointNoRotate(i.getTopLeft(), !1);
                n = this.viewport.pixelFromPointNoRotate(i.getBottomRight(), !1).minus(this.totalBorderWidths);
                e = this.displayRegion.style;
                e.display = this.world.getItemCount() ? "block" : "none";
                e.top = Math.round(t.y) + "px";
                e.left = Math.round(t.x) + "px";
                var i = Math.abs(t.x - n.x);
                var n = Math.abs(t.y - n.y);
                e.width = Math.round(Math.max(i, 0)) + "px";
                e.height = Math.round(Math.max(n, 0)) + "px";
            }
        },
        addTiledImage: function(e) {
            var n = this;
            var o = e.originalTiledImage;
            delete e.original;
            e = r.extend({}, e, {
                success: function(e) {
                    var t = e.item;
                    t._originalForNavigator = o;
                    n._matchBounds(t, o, !0);
                    n._matchOpacity(t, o);
                    n._matchCompositeOperation(t, o);
                    function i() {
                        n._matchBounds(t, o);
                    }
                    o.addHandler("bounds-change", i);
                    o.addHandler("clip-change", i);
                    o.addHandler("opacity-change", function() {
                        n._matchOpacity(t, o);
                    });
                    o.addHandler("composite-operation-change", function() {
                        n._matchCompositeOperation(t, o);
                    });
                }
            });
            return r.Viewer.prototype.addTiledImage.apply(this, [
                e
            ]);
        },
        destroy: function() {
            return r.Viewer.prototype.destroy.apply(this);
        },
        _getMatchingItem: function(e) {
            var t = this.world.getItemCount();
            var i;
            for(var n = 0; n < t; n++)if ((i = this.world.getItemAt(n))._originalForNavigator === e) return i;
            return null;
        },
        _matchBounds: function(e, t, i) {
            var n = t.getBoundsNoRotate();
            e.setPosition(n.getTopLeft(), i);
            e.setWidth(n.width, i);
            e.setRotation(t.getRotation(), i);
            e.setClip(t.getClip());
            e.setFlip(t.getFlip());
        },
        _matchOpacity: function(e, t) {
            e.setOpacity(t.opacity);
        },
        _matchCompositeOperation: function(e, t) {
            e.setCompositeOperation(t.compositeOperation);
        }
    });
    function s(e) {
        var t = {
            tracker: e.eventSource,
            position: e.position,
            quick: e.quick,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultAction: !1
        };
        this.viewer.raiseEvent("navigator-click", t);
        if (!t.preventDefaultAction && e.quick && this.viewer.viewport && (this.panVertical || this.panHorizontal)) {
            this.viewer.viewport.flipped && (e.position.x = this.viewport.getContainerSize().x - e.position.x);
            e = this.viewport.pointFromPixel(e.position);
            this.panVertical ? this.panHorizontal || (e.x = this.viewer.viewport.getCenter(!0).x) : e.y = this.viewer.viewport.getCenter(!0).y;
            this.viewer.viewport.panTo(e);
            this.viewer.viewport.applyConstraints();
        }
    }
    function a(e) {
        var t = {
            tracker: e.eventSource,
            position: e.position,
            delta: e.delta,
            speed: e.speed,
            direction: e.direction,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefaultAction: !1
        };
        this.viewer.raiseEvent("navigator-drag", t);
        if (!t.preventDefaultAction && this.viewer.viewport) {
            this.panHorizontal || (e.delta.x = 0);
            this.panVertical || (e.delta.y = 0);
            this.viewer.viewport.flipped && (e.delta.x = -e.delta.x);
            this.viewer.viewport.panBy(this.viewport.deltaPointsFromPixels(e.delta));
            this.viewer.constrainDuringPan && this.viewer.viewport.applyConstraints();
        }
    }
    function l(e) {
        e.insideElementPressed && this.viewer.viewport && this.viewer.viewport.applyConstraints();
    }
    function h(e) {
        var t = {
            tracker: e.eventSource,
            position: e.position,
            scroll: e.scroll,
            shift: e.shift,
            originalEvent: e.originalEvent,
            preventDefault: e.preventDefault
        };
        this.viewer.raiseEvent("navigator-scroll", t);
        e.preventDefault = t.preventDefault;
    }
    function c(e, t) {
        i(e, "rotate(" + t + "deg)");
    }
    function i(e, t) {
        e.style.webkitTransform = t;
        e.style.mozTransform = t;
        e.style.msTransform = t;
        e.style.oTransform = t;
        e.style.transform = t;
    }
}(OpenSeadragon);
!function(s) {
    var a = {
        Errors: {
            Dzc: "Sorry, we don't support Deep Zoom Collections!",
            Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
            Security: "It looks like a security restriction stopped us from loading this Deep Zoom Image.",
            Status: "This space unintentionally left blank ({0} {1}).",
            OpenFailed: "Unable to open {0}: {1}"
        },
        Tooltips: {
            FullPage: "Toggle full page",
            Home: "Go home",
            ZoomIn: "Zoom in",
            ZoomOut: "Zoom out",
            NextPage: "Next page",
            PreviousPage: "Previous page",
            RotateLeft: "Rotate left",
            RotateRight: "Rotate right",
            Flip: "Flip Horizontally"
        }
    };
    s.extend(s, {
        getString: function(e) {
            var t, i = e.split("."), n = null, o = arguments, r = a;
            for(t = 0; t < i.length - 1; t++)r = r[i[t]] || {};
            if ("string" != typeof (n = r[i[t]])) {
                s.console.error("Untranslated source string:", e);
                n = "";
            }
            return n.replace(/\{\d+\}/g, function(e) {
                e = parseInt(e.match(/\d+/), 10) + 1;
                return e < o.length ? o[e] : "";
            });
        },
        setString: function(e, t) {
            var i, n = e.split("."), o = a;
            for(i = 0; i < n.length - 1; i++){
                o[n[i]] || (o[n[i]] = {});
                o = o[n[i]];
            }
            o[n[i]] = t;
        }
    });
}(OpenSeadragon);
!function(r) {
    r.Point = function(e, t) {
        this.x = "number" == typeof e ? e : 0;
        this.y = "number" == typeof t ? t : 0;
    };
    r.Point.prototype = {
        clone: function() {
            return new r.Point(this.x, this.y);
        },
        plus: function(e) {
            return new r.Point(this.x + e.x, this.y + e.y);
        },
        minus: function(e) {
            return new r.Point(this.x - e.x, this.y - e.y);
        },
        times: function(e) {
            return new r.Point(this.x * e, this.y * e);
        },
        divide: function(e) {
            return new r.Point(this.x / e, this.y / e);
        },
        negate: function() {
            return new r.Point(-this.x, -this.y);
        },
        distanceTo: function(e) {
            return Math.sqrt(Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2));
        },
        squaredDistanceTo: function(e) {
            return Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2);
        },
        apply: function(e) {
            return new r.Point(e(this.x), e(this.y));
        },
        equals: function(e) {
            return e instanceof r.Point && this.x === e.x && this.y === e.y;
        },
        rotate: function(e, t) {
            t = t || new r.Point(0, 0);
            var i;
            var n;
            if (e % 90 == 0) switch(r.positiveModulo(e, 360)){
                case 0:
                    i = 1;
                    n = 0;
                    break;
                case 90:
                    i = 0;
                    n = 1;
                    break;
                case 180:
                    i = -1;
                    n = 0;
                    break;
                case 270:
                    i = 0;
                    n = -1;
            }
            else {
                var o = e * Math.PI / 180;
                i = Math.cos(o);
                n = Math.sin(o);
            }
            o = i * (this.x - t.x) - n * (this.y - t.y) + t.x;
            t = n * (this.x - t.x) + i * (this.y - t.y) + t.y;
            return new r.Point(o, t);
        },
        toString: function() {
            return "(" + Math.round(100 * this.x) / 100 + "," + Math.round(100 * this.y) / 100 + ")";
        }
    };
}(OpenSeadragon);
!function(h) {
    h.TileSource = function(e, t, i, n, o, r) {
        var s = this;
        var a, l = arguments;
        l = h.isPlainObject(e) ? e : {
            width: l[0],
            height: l[1],
            tileSize: l[2],
            tileOverlap: l[3],
            minLevel: l[4],
            maxLevel: l[5]
        };
        h.EventSource.call(this);
        h.extend(!0, this, l);
        if (!this.success) {
            for(a = 0; a < arguments.length; a++)if (h.isFunction(arguments[a])) {
                this.success = arguments[a];
                break;
            }
        }
        this.success && this.addHandler("ready", function(e) {
            s.success(e);
        });
        "string" === h.type(e) && (this.url = e);
        if (this.url) {
            this.aspectRatio = 1;
            this.dimensions = new h.Point(10, 10);
            this._tileWidth = 0;
            this._tileHeight = 0;
            this.tileOverlap = 0;
            this.minLevel = 0;
            this.maxLevel = 0;
            this.ready = !1;
            this.getImageInfo(this.url);
        } else {
            this.ready = !0;
            this.aspectRatio = l.width && l.height ? l.width / l.height : 1;
            this.dimensions = new h.Point(l.width, l.height);
            if (this.tileSize) {
                this._tileWidth = this._tileHeight = this.tileSize;
                delete this.tileSize;
            } else {
                if (this.tileWidth) {
                    this._tileWidth = this.tileWidth;
                    delete this.tileWidth;
                } else this._tileWidth = 0;
                if (this.tileHeight) {
                    this._tileHeight = this.tileHeight;
                    delete this.tileHeight;
                } else this._tileHeight = 0;
            }
            this.tileOverlap = l.tileOverlap || 0;
            this.minLevel = l.minLevel || 0;
            this.maxLevel = void 0 !== l.maxLevel && null !== l.maxLevel ? l.maxLevel : l.width && l.height ? Math.ceil(Math.log(Math.max(l.width, l.height)) / Math.log(2)) : 0;
            this.success && h.isFunction(this.success) && this.success(this);
        }
    };
    h.TileSource.prototype = {
        getTileSize: function(e) {
            h.console.error("[TileSource.getTileSize] is deprecated. Use TileSource.getTileWidth() and TileSource.getTileHeight() instead");
            return this._tileWidth;
        },
        getTileWidth: function(e) {
            return this._tileWidth || this.getTileSize(e);
        },
        getTileHeight: function(e) {
            return this._tileHeight || this.getTileSize(e);
        },
        setMaxLevel: function(e) {
            this.maxLevel = e;
            this._memoizeLevelScale();
        },
        getLevelScale: function(e) {
            this._memoizeLevelScale();
            return this.getLevelScale(e);
        },
        _memoizeLevelScale: function() {
            var e, t = {};
            for(e = 0; e <= this.maxLevel; e++)t[e] = 1 / Math.pow(2, this.maxLevel - e);
            this.getLevelScale = function(e) {
                return t[e];
            };
        },
        getNumTiles: function(e) {
            var t = this.getLevelScale(e), i = Math.ceil(t * this.dimensions.x / this.getTileWidth(e)), e = Math.ceil(t * this.dimensions.y / this.getTileHeight(e));
            return new h.Point(i, e);
        },
        getPixelRatio: function(e) {
            var t = this.dimensions.times(this.getLevelScale(e)), e = 1 / t.x * h.pixelDensityRatio, t = 1 / t.y * h.pixelDensityRatio;
            return new h.Point(e, t);
        },
        getClosestLevel: function() {
            var e, t;
            for(e = this.minLevel + 1; e <= this.maxLevel && !(1 < (t = this.getNumTiles(e)).x || 1 < t.y); e++);
            return e - 1;
        },
        getTileAtPoint: function(e, t) {
            var i = 0 <= t.x && t.x <= 1 && 0 <= t.y && t.y <= 1 / this.aspectRatio;
            h.console.assert(i, "[TileSource.getTileAtPoint] must be called with a valid point.");
            var n = this.dimensions.x * this.getLevelScale(e);
            i = t.x * n;
            n = t.y * n;
            i = Math.floor(i / this.getTileWidth(e));
            n = Math.floor(n / this.getTileHeight(e));
            1 <= t.x && (i = this.getNumTiles(e).x - 1);
            t.y >= 1 / this.aspectRatio - 1e-15 && (n = this.getNumTiles(e).y - 1);
            return new h.Point(i, n);
        },
        getTileBounds: function(e, t, i, n) {
            var o = this.dimensions.times(this.getLevelScale(e)), r = this.getTileWidth(e), s = this.getTileHeight(e), a = 0 === t ? 0 : r * t - this.tileOverlap, e = 0 === i ? 0 : s * i - this.tileOverlap, t = r + (0 === t ? 1 : 2) * this.tileOverlap, s = s + (0 === i ? 1 : 2) * this.tileOverlap, i = 1 / o.x;
            t = Math.min(t, o.x - a);
            s = Math.min(s, o.y - e);
            return n ? new h.Rect(0, 0, t, s) : new h.Rect(a * i, e * i, t * i, s * i);
        },
        getImageInfo: function(n) {
            var t, i, e, o, r, s = this;
            n && -1 < (r = (o = (e = n.split("/"))[e.length - 1]).lastIndexOf(".")) && (e[e.length - 1] = o.slice(0, r));
            var a = null;
            if (this.splitHashDataForPost) {
                var l = n.indexOf("#");
                if (-1 !== l) {
                    a = n.substring(l + 1);
                    n = n.substr(0, l);
                }
            }
            t = function(e) {
                "string" == typeof e && (e = h.parseXml(e));
                var t = h.TileSource.determineType(s, e, n);
                if (t) {
                    void 0 === (i = t.prototype.configure.apply(s, [
                        e,
                        n,
                        a
                    ])).ajaxWithCredentials && (i.ajaxWithCredentials = s.ajaxWithCredentials);
                    i = new t(i);
                    s.ready = !0;
                    s.raiseEvent("ready", {
                        tileSource: i
                    });
                } else s.raiseEvent("open-failed", {
                    message: "Unable to load TileSource",
                    source: n
                });
            };
            if (n.match(/\.js$/)) {
                l = n.split("/").pop().replace(".js", "");
                h.jsonp({
                    url: n,
                    async: !1,
                    callbackName: l,
                    callback: t
                });
            } else h.makeAjaxRequest({
                url: n,
                postData: a,
                withCredentials: this.ajaxWithCredentials,
                headers: this.ajaxHeaders,
                success: function(e) {
                    e = function(t) {
                        var e, i, n = t.responseText, o = t.status;
                        if (!t) throw new Error(h.getString("Errors.Security"));
                        if (200 !== t.status && 0 !== t.status) {
                            o = t.status;
                            e = 404 === o ? "Not Found" : t.statusText;
                            throw new Error(h.getString("Errors.Status", o, e));
                        }
                        if (n.match(/\s*<.*/)) try {
                            i = t.responseXML && t.responseXML.documentElement ? t.responseXML : h.parseXml(n);
                        } catch (e1) {
                            i = t.responseText;
                        }
                        else if (n.match(/\s*[{[].*/)) try {
                            i = h.parseJSON(n);
                        } catch (e2) {
                            i = n;
                        }
                        else i = n;
                        return i;
                    }(e);
                    t(e);
                },
                error: function(e, t) {
                    var i;
                    try {
                        i = "HTTP " + e.status + " attempting to load TileSource: " + n;
                    } catch (e1) {
                        i = (void 0 !== t && t.toString ? t.toString() : "Unknown error") + " attempting to load TileSource: " + n;
                    }
                    h.console.error(i);
                    s.raiseEvent("open-failed", {
                        message: i,
                        source: n,
                        postData: a
                    });
                }
            });
        },
        supports: function(e, t) {
            return !1;
        },
        configure: function(e, t, i) {
            throw new Error("Method not implemented.");
        },
        getTileUrl: function(e, t, i) {
            throw new Error("Method not implemented.");
        },
        getTilePostData: function(e, t, i) {
            return null;
        },
        getTileAjaxHeaders: function(e, t, i) {
            return {};
        },
        getTileHashKey: function(e, t, i, n, o, r) {
            return o ? n + "+" + JSON.stringify(o) : n;
        },
        tileExists: function(e, t, i) {
            var n = this.getNumTiles(e);
            return e >= this.minLevel && e <= this.maxLevel && 0 <= t && 0 <= i && t < n.x && i < n.y;
        }
    };
    h.extend(!0, h.TileSource.prototype, h.EventSource.prototype);
    h.TileSource.determineType = function(e, t, i) {
        for(var n in OpenSeadragon)if (n.match(/.+TileSource$/) && h.isFunction(OpenSeadragon[n]) && h.isFunction(OpenSeadragon[n].prototype.supports) && OpenSeadragon[n].prototype.supports.call(e, t, i)) return OpenSeadragon[n];
        h.console.error("No TileSource was able to open %s %s", i, t);
        return null;
    };
}(OpenSeadragon);
!function(p) {
    p.DziTileSource = function(e, t, i, n, o, r, s, a, l) {
        var h, c, u, d;
        d = p.isPlainObject(e) ? e : {
            width: e,
            height: t,
            tileSize: i,
            tileOverlap: n,
            tilesUrl: o,
            fileFormat: r,
            displayRects: s,
            minLevel: a,
            maxLevel: l
        };
        this._levelRects = {};
        this.tilesUrl = d.tilesUrl;
        this.fileFormat = d.fileFormat;
        this.displayRects = d.displayRects;
        if (this.displayRects) for(h = this.displayRects.length - 1; 0 <= h; h--)for(u = (c = this.displayRects[h]).minLevel; u <= c.maxLevel; u++){
            this._levelRects[u] || (this._levelRects[u] = []);
            this._levelRects[u].push(c);
        }
        p.TileSource.apply(this, [
            d
        ]);
    };
    p.extend(p.DziTileSource.prototype, p.TileSource.prototype, {
        supports: function(e, t) {
            var i;
            e.Image ? i = e.Image.xmlns : e.documentElement && ("Image" !== e.documentElement.localName && "Image" !== e.documentElement.tagName || (i = e.documentElement.namespaceURI));
            return -1 !== (i = (i || "").toLowerCase()).indexOf("schemas.microsoft.com/deepzoom/2008") || -1 !== i.indexOf("schemas.microsoft.com/deepzoom/2009");
        },
        configure: function(e, t, i) {
            e = (p.isPlainObject(e) ? u : function(e, t) {
                if (!t || !t.documentElement) throw new Error(p.getString("Errors.Xml"));
                var i, n, o, r, s, a = t.documentElement, l = a.localName || a.tagName, h = t.documentElement.namespaceURI, t = null, c = [];
                if ("Image" === l) try {
                    void 0 === (r = a.getElementsByTagName("Size")[0]) && (r = a.getElementsByTagNameNS(h, "Size")[0]);
                    t = {
                        Image: {
                            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                            Url: a.getAttribute("Url"),
                            Format: a.getAttribute("Format"),
                            DisplayRect: null,
                            Overlap: parseInt(a.getAttribute("Overlap"), 10),
                            TileSize: parseInt(a.getAttribute("TileSize"), 10),
                            Size: {
                                Height: parseInt(r.getAttribute("Height"), 10),
                                Width: parseInt(r.getAttribute("Width"), 10)
                            }
                        }
                    };
                    if (!p.imageFormatSupported(t.Image.Format)) throw new Error(p.getString("Errors.ImageFormat", t.Image.Format.toUpperCase()));
                    void 0 === (i = a.getElementsByTagName("DisplayRect")) && (i = a.getElementsByTagNameNS(h, "DisplayRect")[0]);
                    for(s = 0; s < i.length; s++){
                        n = i[s];
                        void 0 === (o = n.getElementsByTagName("Rect")[0]) && (o = n.getElementsByTagNameNS(h, "Rect")[0]);
                        c.push({
                            Rect: {
                                X: parseInt(o.getAttribute("X"), 10),
                                Y: parseInt(o.getAttribute("Y"), 10),
                                Width: parseInt(o.getAttribute("Width"), 10),
                                Height: parseInt(o.getAttribute("Height"), 10),
                                MinLevel: parseInt(n.getAttribute("MinLevel"), 10),
                                MaxLevel: parseInt(n.getAttribute("MaxLevel"), 10)
                            }
                        });
                    }
                    c.length && (t.Image.DisplayRect = c);
                    return u(0, t);
                } catch (e1) {
                    throw e1 instanceof Error ? e1 : new Error(p.getString("Errors.Dzi"));
                }
                else {
                    if ("Collection" === l) throw new Error(p.getString("Errors.Dzc"));
                    if ("Error" === l) {
                        a = a.getElementsByTagName("Message")[0].firstChild.nodeValue;
                        throw new Error(a);
                    }
                }
                throw new Error(p.getString("Errors.Dzi"));
            })(this, e);
            if (t && !e.tilesUrl) {
                e.tilesUrl = t.replace(/([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/, "$1_files/");
                -1 !== t.search(/\.(dzi|xml|js)\?/) ? e.queryParams = t.match(/\?.*/) : e.queryParams = "";
            }
            return e;
        },
        getTileUrl: function(e, t, i) {
            return [
                this.tilesUrl,
                e,
                "/",
                t,
                "_",
                i,
                ".",
                this.fileFormat,
                this.queryParams
            ].join("");
        },
        tileExists: function(e, t, i) {
            var n, o, r, s, a, l, h = this._levelRects[e];
            if (this.minLevel && e < this.minLevel || this.maxLevel && e > this.maxLevel) return !1;
            if (!h || !h.length) return !0;
            for(l = h.length - 1; 0 <= l; l--)if (!(e < (n = h[l]).minLevel || e > n.maxLevel)) {
                a = this.getLevelScale(e);
                o = n.x * a;
                r = n.y * a;
                s = o + n.width * a;
                a = r + n.height * a;
                o = Math.floor(o / this._tileWidth);
                r = Math.floor(r / this._tileWidth);
                s = Math.ceil(s / this._tileWidth);
                a = Math.ceil(a / this._tileWidth);
                if (o <= t && t < s && r <= i && i < a) return !0;
            }
            return !1;
        }
    });
    function u(e, t) {
        var i, n, o = t.Image, r = o.Url, s = o.Format, a = o.Size, l = o.DisplayRect || [], h = parseInt(a.Width, 10), c = parseInt(a.Height, 10), a = parseInt(o.TileSize, 10), o = parseInt(o.Overlap, 10), u = [];
        for(n = 0; n < l.length; n++){
            i = l[n].Rect;
            u.push(new p.DisplayRect(parseInt(i.X, 10), parseInt(i.Y, 10), parseInt(i.Width, 10), parseInt(i.Height, 10), parseInt(i.MinLevel, 10), parseInt(i.MaxLevel, 10)));
        }
        return p.extend(!0, {
            width: h,
            height: c,
            tileSize: a,
            tileOverlap: o,
            minLevel: null,
            maxLevel: null,
            tilesUrl: r,
            fileFormat: s,
            displayRects: u
        }, t);
    }
}(OpenSeadragon);
!function(h) {
    h.IIIFTileSource = function(e) {
        h.extend(!0, this, e);
        if (!(this.height && this.width && this["@id"])) throw new Error("IIIF required parameters not provided.");
        e.tileSizePerScaleFactor = {};
        this.tileFormat = this.tileFormat || "jpg";
        this.version = e.version;
        if (this.tile_width && this.tile_height) {
            e.tileWidth = this.tile_width;
            e.tileHeight = this.tile_height;
        } else if (this.tile_width) e.tileSize = this.tile_width;
        else if (this.tile_height) e.tileSize = this.tile_height;
        else if (this.tiles) {
            if (1 === this.tiles.length) {
                e.tileWidth = this.tiles[0].width;
                e.tileHeight = this.tiles[0].height || this.tiles[0].width;
                this.scale_factors = this.tiles[0].scaleFactors;
            } else {
                this.scale_factors = [];
                for(var t = 0; t < this.tiles.length; t++)for(var i = 0; i < this.tiles[t].scaleFactors.length; i++){
                    var n = this.tiles[t].scaleFactors[i];
                    this.scale_factors.push(n);
                    e.tileSizePerScaleFactor[n] = {
                        width: this.tiles[t].width,
                        height: this.tiles[t].height || this.tiles[t].width
                    };
                }
            }
        } else if (c(e)) {
            var o = Math.min(this.height, this.width), r = [
                256,
                512,
                1024
            ], s = [];
            for(var a = 0; a < r.length; a++)r[a] <= o && s.push(r[a]);
            0 < s.length ? e.tileSize = Math.max.apply(null, s) : e.tileSize = o;
        } else if (this.sizes && 0 < this.sizes.length) {
            this.emulateLegacyImagePyramid = !0;
            e.levels = u(this);
            h.extend(!0, e, {
                width: e.levels[e.levels.length - 1].width,
                height: e.levels[e.levels.length - 1].height,
                tileSize: Math.max(e.height, e.width),
                tileOverlap: 0,
                minLevel: 0,
                maxLevel: e.levels.length - 1
            });
            this.levels = e.levels;
        } else h.console.error("Nothing in the info.json to construct image pyramids from");
        if (!e.maxLevel && !this.emulateLegacyImagePyramid) {
            if (this.scale_factors) {
                var l = Math.max.apply(null, this.scale_factors);
                e.maxLevel = Math.round(Math.log(l) * Math.LOG2E);
            } else e.maxLevel = Number(Math.ceil(Math.log(Math.max(this.width, this.height), 2)));
        }
        h.TileSource.apply(this, [
            e
        ]);
    };
    h.extend(h.IIIFTileSource.prototype, h.TileSource.prototype, {
        supports: function(e, t) {
            return !(!e.protocol || "http://iiif.io/api/image" !== e.protocol) || !(!e["@context"] || "http://library.stanford.edu/iiif/image-api/1.1/context.json" !== e["@context"] && "http://iiif.io/api/image/1/context.json" !== e["@context"]) || !(!e.profile || 0 !== e.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html")) || !!(e.identifier && e.width && e.height) || !(!e.documentElement || "info" !== e.documentElement.tagName || "http://library.stanford.edu/iiif/image-api/ns/" !== e.documentElement.namespaceURI);
        },
        configure: function(e, t, i) {
            if (h.isPlainObject(e)) {
                if (e["@context"]) {
                    var n = e["@context"];
                    if (Array.isArray(n)) {
                        for(var o = 0; o < n.length; o++)if ("string" == typeof n[o] && (/^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(n[o]) || "http://library.stanford.edu/iiif/image-api/1.1/context.json" === n[o])) {
                            n = n[o];
                            break;
                        }
                    }
                    switch(n){
                        case "http://iiif.io/api/image/1/context.json":
                        case "http://library.stanford.edu/iiif/image-api/1.1/context.json":
                            e.version = 1;
                            break;
                        case "http://iiif.io/api/image/2/context.json":
                            e.version = 2;
                            break;
                        case "http://iiif.io/api/image/3/context.json":
                            e.version = 3;
                            break;
                        default:
                            h.console.error("Data has a @context property which contains no known IIIF context URI.");
                    }
                } else {
                    e["@context"] = "http://iiif.io/api/image/1.0/context.json";
                    e["@id"] = t.replace("/info.json", "");
                    e.version = 1;
                }
                !e["@id"] && e.id && (e["@id"] = e.id);
                if (e.preferredFormats) {
                    for(var r = 0; r < e.preferredFormats.length; r++)if (OpenSeadragon.imageFormatSupported(e.preferredFormats[r])) {
                        e.tileFormat = e.preferredFormats[r];
                        break;
                    }
                }
                return e;
            }
            var s = function(e) {
                if (!e || !e.documentElement) throw new Error(h.getString("Errors.Xml"));
                var t = e.documentElement, i = t.tagName, e = null;
                if ("info" === i) try {
                    !function e(t, i, n) {
                        var o, r;
                        if (3 === t.nodeType && n) {
                            (r = t.nodeValue.trim()).match(/^\d*$/) && (r = Number(r));
                            if (i[n]) {
                                h.isArray(i[n]) || (i[n] = [
                                    i[n]
                                ]);
                                i[n].push(r);
                            } else i[n] = r;
                        } else if (1 === t.nodeType) for(o = 0; o < t.childNodes.length; o++)e(t.childNodes[o], i, t.nodeName);
                    }(t, e = {});
                    return e;
                } catch (e1) {
                    throw e1 instanceof Error ? e1 : new Error(h.getString("Errors.IIIF"));
                }
                throw new Error(h.getString("Errors.IIIF"));
            }(e);
            s["@context"] = "http://iiif.io/api/image/1.0/context.json";
            s["@id"] = t.replace("/info.xml", "");
            s.version = 1;
            return s;
        },
        getTileWidth: function(e) {
            if (this.emulateLegacyImagePyramid) return h.TileSource.prototype.getTileWidth.call(this, e);
            e = Math.pow(2, this.maxLevel - e);
            return this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[e] ? this.tileSizePerScaleFactor[e].width : this._tileWidth;
        },
        getTileHeight: function(e) {
            if (this.emulateLegacyImagePyramid) return h.TileSource.prototype.getTileHeight.call(this, e);
            e = Math.pow(2, this.maxLevel - e);
            return this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[e] ? this.tileSizePerScaleFactor[e].height : this._tileHeight;
        },
        getLevelScale: function(e) {
            if (this.emulateLegacyImagePyramid) {
                var t = NaN;
                return t = 0 < this.levels.length && e >= this.minLevel && e <= this.maxLevel ? this.levels[e].width / this.levels[this.maxLevel].width : t;
            }
            return h.TileSource.prototype.getLevelScale.call(this, e);
        },
        getNumTiles: function(e) {
            if (this.emulateLegacyImagePyramid) return this.getLevelScale(e) ? new h.Point(1, 1) : new h.Point(0, 0);
            return h.TileSource.prototype.getNumTiles.call(this, e);
        },
        getTileAtPoint: function(e, t) {
            return this.emulateLegacyImagePyramid ? new h.Point(0, 0) : h.TileSource.prototype.getTileAtPoint.call(this, e, t);
        },
        getTileUrl: function(e, t, i) {
            if (this.emulateLegacyImagePyramid) {
                var n = null;
                return n = 0 < this.levels.length && e >= this.minLevel && e <= this.maxLevel ? this.levels[e].url : n;
            }
            var o, r, s, a, l, h = Math.pow(.5, this.maxLevel - e), c = Math.ceil(this.width * h), u = Math.ceil(this.height * h);
            o = this.getTileWidth(e);
            r = this.getTileHeight(e);
            l = Math.ceil(o / h);
            n = Math.ceil(r / h);
            e = 1 === this.version ? "native." + this.tileFormat : "default." + this.tileFormat;
            if (c < o && u < r) {
                a = 2 === this.version && c === this.width ? "full" : 3 === this.version && c === this.width && u === this.height ? "max" : 3 === this.version ? c + "," + u : c + ",";
                s = "full";
            } else {
                u = t * l;
                c = i * n;
                l = Math.min(l, this.width - u);
                n = Math.min(n, this.height - c);
                s = 0 === t && 0 === i && l === this.width && n === this.height ? "full" : [
                    u,
                    c,
                    l,
                    n
                ].join(",");
                l = Math.ceil(l * h);
                h = Math.ceil(n * h);
                a = 2 === this.version && l === this.width ? "full" : 3 === this.version && l === this.width && h === this.height ? "max" : 3 === this.version ? l + "," + h : l + ",";
            }
            return [
                this["@id"],
                s,
                a,
                "0",
                e
            ].join("/");
        },
        __testonly__: {
            canBeTiled: c,
            constructLevels: u
        }
    });
    function c(e) {
        var t = Array.isArray(e.profile) ? e.profile[0] : e.profile;
        var i = -1 !== [
            "http://library.stanford.edu/iiif/image-api/compliance.html#level0",
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",
            "http://iiif.io/api/image/2/level0.json",
            "level0",
            "https://iiif.io/api/image/3/level0.json"
        ].indexOf(t);
        t = !1;
        2 === e.version && 1 < e.profile.length && e.profile[1].supports && (t = -1 !== e.profile[1].supports.indexOf("sizeByW"));
        3 === e.version && e.extraFeatures && (t = -1 !== e.extraFeatures.indexOf("sizeByWh"));
        return !i || t;
    }
    function u(e) {
        var t = [];
        for(var i = 0; i < e.sizes.length; i++)t.push({
            url: e["@id"] + "/full/" + e.sizes[i].width + "," + (3 === e.version ? e.sizes[i].height : "") + "/0/default." + e.tileFormat,
            width: e.sizes[i].width,
            height: e.sizes[i].height
        });
        return t.sort(function(e, t) {
            return e.width - t.width;
        });
    }
}(OpenSeadragon);
!function(s) {
    s.OsmTileSource = function(e, t, i, n, o) {
        var r;
        if (!(r = s.isPlainObject(e) ? e : {
            width: e,
            height: t,
            tileSize: i,
            tileOverlap: n,
            tilesUrl: o
        }).width || !r.height) {
            r.width = 65572864;
            r.height = 65572864;
        }
        if (!r.tileSize) {
            r.tileSize = 256;
            r.tileOverlap = 0;
        }
        r.tilesUrl || (r.tilesUrl = "http://tile.openstreetmap.org/");
        r.minLevel = 8;
        s.TileSource.apply(this, [
            r
        ]);
    };
    s.extend(s.OsmTileSource.prototype, s.TileSource.prototype, {
        supports: function(e, t) {
            return e.type && "openstreetmaps" === e.type;
        },
        configure: function(e, t, i) {
            return e;
        },
        getTileUrl: function(e, t, i) {
            return this.tilesUrl + (e - 8) + "/" + t + "/" + i + ".png";
        }
    });
}(OpenSeadragon);
!function(h) {
    h.TmsTileSource = function(e, t, i, n, o) {
        var r;
        r = h.isPlainObject(e) ? e : {
            width: e,
            height: t,
            tileSize: i,
            tileOverlap: n,
            tilesUrl: o
        };
        var s, a = 256 * Math.ceil(r.width / 256), l = 256 * Math.ceil(r.height / 256);
        s = l < a ? a / 256 : l / 256;
        r.maxLevel = Math.ceil(Math.log(s) / Math.log(2)) - 1;
        r.tileSize = 256;
        r.width = a;
        r.height = l;
        h.TileSource.apply(this, [
            r
        ]);
    };
    h.extend(h.TmsTileSource.prototype, h.TileSource.prototype, {
        supports: function(e, t) {
            return e.type && "tiledmapservice" === e.type;
        },
        configure: function(e, t, i) {
            return e;
        },
        getTileUrl: function(e, t, i) {
            var n = this.getNumTiles(e).y - 1;
            return this.tilesUrl + e + "/" + t + "/" + (n - i) + ".png";
        }
    });
}(OpenSeadragon);
!function(e) {
    e.ZoomifyTileSource = function(e) {
        void 0 === e.tileSize && (e.tileSize = 256);
        if (void 0 === e.fileFormat) {
            e.fileFormat = "jpg";
            this.fileFormat = e.fileFormat;
        }
        var t = {
            x: e.width,
            y: e.height
        };
        e.imageSizes = [
            {
                x: e.width,
                y: e.height
            }
        ];
        e.gridSize = [
            this._getGridSize(e.width, e.height, e.tileSize)
        ];
        for(; parseInt(t.x, 10) > e.tileSize || parseInt(t.y, 10) > e.tileSize;){
            t.x = Math.floor(t.x / 2);
            t.y = Math.floor(t.y / 2);
            e.imageSizes.push({
                x: t.x,
                y: t.y
            });
            e.gridSize.push(this._getGridSize(t.x, t.y, e.tileSize));
        }
        e.imageSizes.reverse();
        e.gridSize.reverse();
        e.minLevel = 0;
        e.maxLevel = e.gridSize.length - 1;
        OpenSeadragon.TileSource.apply(this, [
            e
        ]);
    };
    e.extend(e.ZoomifyTileSource.prototype, e.TileSource.prototype, {
        _getGridSize: function(e, t, i) {
            return {
                x: Math.ceil(e / i),
                y: Math.ceil(t / i)
            };
        },
        _calculateAbsoluteTileNumber: function(e, t, i) {
            var n = 0;
            var o = {};
            for(var r = 0; r < e; r++)n += (o = this.gridSize[r]).x * o.y;
            return n += (o = this.gridSize[e]).x * i + t;
        },
        supports: function(e, t) {
            return e.type && "zoomifytileservice" === e.type;
        },
        configure: function(e, t, i) {
            return e;
        },
        getTileUrl: function(e, t, i) {
            var n = this._calculateAbsoluteTileNumber(e, t, i);
            n = Math.floor(n / 256);
            return this.tilesUrl + "TileGroup" + n + "/" + e + "-" + t + "-" + i + "." + this.fileFormat;
        }
    });
}(OpenSeadragon);
!function(a) {
    a.LegacyTileSource = function(e) {
        var t, i, n;
        (t = a.isArray(e) ? {
            type: "legacy-image-pyramid",
            levels: e
        } : t).levels = function(e) {
            var t, i, n = [];
            for(i = 0; i < e.length; i++)(t = e[i]).height && t.width && t.url ? n.push({
                url: t.url,
                width: Number(t.width),
                height: Number(t.height)
            }) : a.console.error("Unsupported image format: %s", t.url || "<no URL>");
            return n.sort(function(e, t) {
                return e.height - t.height;
            });
        }(t.levels);
        if (0 < t.levels.length) {
            i = t.levels[t.levels.length - 1].width;
            n = t.levels[t.levels.length - 1].height;
        } else {
            n = i = 0;
            a.console.error("No supported image formats found");
        }
        a.extend(!0, t, {
            width: i,
            height: n,
            tileSize: Math.max(n, i),
            tileOverlap: 0,
            minLevel: 0,
            maxLevel: 0 < t.levels.length ? t.levels.length - 1 : 0
        });
        a.TileSource.apply(this, [
            t
        ]);
        this.levels = t.levels;
    };
    a.extend(a.LegacyTileSource.prototype, a.TileSource.prototype, {
        supports: function(e, t) {
            return e.type && "legacy-image-pyramid" === e.type || e.documentElement && "legacy-image-pyramid" === e.documentElement.getAttribute("type");
        },
        configure: function(e, t, i) {
            return a.isPlainObject(e) ? e.levels : function(e) {
                if (!e || !e.documentElement) throw new Error(a.getString("Errors.Xml"));
                var t, i, n = e.documentElement, o = n.tagName, r = null, s = [];
                if ("image" === o) try {
                    r = {
                        type: n.getAttribute("type"),
                        levels: []
                    };
                    s = n.getElementsByTagName("level");
                    for(i = 0; i < s.length; i++){
                        t = s[i];
                        r.levels.push({
                            url: t.getAttribute("url"),
                            width: parseInt(t.getAttribute("width"), 10),
                            height: parseInt(t.getAttribute("height"), 10)
                        });
                    }
                    return r.levels;
                } catch (e1) {
                    throw e1 instanceof Error ? e1 : new Error("Unknown error parsing Legacy Image Pyramid XML.");
                }
                else {
                    if ("collection" === o) throw new Error("Legacy Image Pyramid Collections not yet supported.");
                    if ("error" === o) throw new Error("Error: " + e);
                }
                throw new Error("Unknown element " + o);
            }(e);
        },
        getLevelScale: function(e) {
            var t = NaN;
            return t = 0 < this.levels.length && e >= this.minLevel && e <= this.maxLevel ? this.levels[e].width / this.levels[this.maxLevel].width : t;
        },
        getNumTiles: function(e) {
            return this.getLevelScale(e) ? new a.Point(1, 1) : new a.Point(0, 0);
        },
        getTileUrl: function(e, t, i) {
            var n = null;
            return n = 0 < this.levels.length && e >= this.minLevel && e <= this.maxLevel ? this.levels[e].url : n;
        }
    });
}(OpenSeadragon);
!function(a) {
    a.ImageTileSource = function(e) {
        e = a.extend({
            buildPyramid: !0,
            crossOriginPolicy: !1,
            ajaxWithCredentials: !1,
            useCanvas: !0
        }, e);
        a.TileSource.apply(this, [
            e
        ]);
    };
    a.extend(a.ImageTileSource.prototype, a.TileSource.prototype, {
        supports: function(e, t) {
            return e.type && "image" === e.type;
        },
        configure: function(e, t, i) {
            return e;
        },
        getImageInfo: function(e) {
            var t = this._image = new Image;
            var i = this;
            this.crossOriginPolicy && (t.crossOrigin = this.crossOriginPolicy);
            this.ajaxWithCredentials && (t.useCredentials = this.ajaxWithCredentials);
            a.addEvent(t, "load", function() {
                i.width = t.naturalWidth;
                i.height = t.naturalHeight;
                i.aspectRatio = i.width / i.height;
                i.dimensions = new a.Point(i.width, i.height);
                i._tileWidth = i.width;
                i._tileHeight = i.height;
                i.tileOverlap = 0;
                i.minLevel = 0;
                i.levels = i._buildLevels();
                i.maxLevel = i.levels.length - 1;
                i.ready = !0;
                i.raiseEvent("ready", {
                    tileSource: i
                });
            });
            a.addEvent(t, "error", function() {
                i.raiseEvent("open-failed", {
                    message: "Error loading image at " + e,
                    source: e
                });
            });
            t.src = e;
        },
        getLevelScale: function(e) {
            var t = NaN;
            return t = e >= this.minLevel && e <= this.maxLevel ? this.levels[e].width / this.levels[this.maxLevel].width : t;
        },
        getNumTiles: function(e) {
            return this.getLevelScale(e) ? new a.Point(1, 1) : new a.Point(0, 0);
        },
        getTileUrl: function(e, t, i) {
            var n = null;
            return n = e >= this.minLevel && e <= this.maxLevel ? this.levels[e].url : n;
        },
        getContext2D: function(e, t, i) {
            var n = null;
            return n = e >= this.minLevel && e <= this.maxLevel ? this.levels[e].context2D : n;
        },
        destroy: function() {
            this._freeupCanvasMemory();
        },
        _buildLevels: function() {
            var e = [
                {
                    url: this._image.src,
                    width: this._image.naturalWidth,
                    height: this._image.naturalHeight
                }
            ];
            if (!this.buildPyramid || !a.supportsCanvas || !this.useCanvas) {
                delete this._image;
                return e;
            }
            var t = this._image.naturalWidth;
            var i = this._image.naturalHeight;
            var n = document.createElement("canvas");
            var o = n.getContext("2d");
            n.width = t;
            n.height = i;
            o.drawImage(this._image, 0, 0, t, i);
            e[0].context2D = o;
            delete this._image;
            if (a.isCanvasTainted(n)) return e;
            for(; 2 <= t && 2 <= i;){
                t = Math.floor(t / 2);
                i = Math.floor(i / 2);
                var r = document.createElement("canvas");
                var s = r.getContext("2d");
                r.width = t;
                r.height = i;
                s.drawImage(n, 0, 0, t, i);
                e.splice(0, 0, {
                    context2D: s,
                    width: t,
                    height: i
                });
                n = r;
                o = s;
            }
            return e;
        },
        _freeupCanvasMemory: function() {
            for(var e = 0; e < this.levels.length; e++)if (this.levels[e].context2D) {
                this.levels[e].context2D.canvas.height = 0;
                this.levels[e].context2D.canvas.width = 0;
            }
        }
    });
}(OpenSeadragon);
!function(o) {
    o.TileSourceCollection = function(e, t, i, n) {
        o.console.error("TileSourceCollection is deprecated; use World instead");
    };
}(OpenSeadragon);
!function(i) {
    i.ButtonState = {
        REST: 0,
        GROUP: 1,
        HOVER: 2,
        DOWN: 3
    };
    i.Button = function(e) {
        var t = this;
        i.EventSource.call(this);
        i.extend(!0, this, {
            tooltip: null,
            srcRest: null,
            srcGroup: null,
            srcHover: null,
            srcDown: null,
            clickTimeThreshold: i.DEFAULT_SETTINGS.clickTimeThreshold,
            clickDistThreshold: i.DEFAULT_SETTINGS.clickDistThreshold,
            fadeDelay: 0,
            fadeLength: 2e3,
            onPress: null,
            onRelease: null,
            onClick: null,
            onEnter: null,
            onExit: null,
            onFocus: null,
            onBlur: null,
            userData: null
        }, e);
        this.element = e.element || i.makeNeutralElement("div");
        if (!e.element) {
            this.imgRest = i.makeTransparentImage(this.srcRest);
            this.imgGroup = i.makeTransparentImage(this.srcGroup);
            this.imgHover = i.makeTransparentImage(this.srcHover);
            this.imgDown = i.makeTransparentImage(this.srcDown);
            this.imgRest.alt = this.imgGroup.alt = this.imgHover.alt = this.imgDown.alt = this.tooltip;
            i.setElementPointerEventsNone(this.imgRest);
            i.setElementPointerEventsNone(this.imgGroup);
            i.setElementPointerEventsNone(this.imgHover);
            i.setElementPointerEventsNone(this.imgDown);
            this.element.style.position = "relative";
            i.setElementTouchActionNone(this.element);
            this.imgGroup.style.position = this.imgHover.style.position = this.imgDown.style.position = "absolute";
            this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "0px";
            this.imgGroup.style.left = this.imgHover.style.left = this.imgDown.style.left = "0px";
            this.imgHover.style.visibility = this.imgDown.style.visibility = "hidden";
            i.Browser.vendor === i.BROWSERS.FIREFOX && i.Browser.version < 3 && (this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "");
            this.element.appendChild(this.imgRest);
            this.element.appendChild(this.imgGroup);
            this.element.appendChild(this.imgHover);
            this.element.appendChild(this.imgDown);
        }
        this.addHandler("press", this.onPress);
        this.addHandler("release", this.onRelease);
        this.addHandler("click", this.onClick);
        this.addHandler("enter", this.onEnter);
        this.addHandler("exit", this.onExit);
        this.addHandler("focus", this.onFocus);
        this.addHandler("blur", this.onBlur);
        this.currentState = i.ButtonState.GROUP;
        this.fadeBeginTime = null;
        this.shouldFade = !1;
        this.element.style.display = "inline-block";
        this.element.style.position = "relative";
        this.element.title = this.tooltip;
        this.tracker = new i.MouseTracker({
            userData: "Button.tracker",
            element: this.element,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            enterHandler: function(e) {
                if (e.insideElementPressed) {
                    o(t, i.ButtonState.DOWN);
                    t.raiseEvent("enter", {
                        originalEvent: e.originalEvent
                    });
                } else e.buttonDownAny || o(t, i.ButtonState.HOVER);
            },
            focusHandler: function(e) {
                t.tracker.enterHandler(e);
                t.raiseEvent("focus", {
                    originalEvent: e.originalEvent
                });
            },
            leaveHandler: function(e) {
                r(t, i.ButtonState.GROUP);
                e.insideElementPressed && t.raiseEvent("exit", {
                    originalEvent: e.originalEvent
                });
            },
            blurHandler: function(e) {
                t.tracker.leaveHandler(e);
                t.raiseEvent("blur", {
                    originalEvent: e.originalEvent
                });
            },
            pressHandler: function(e) {
                o(t, i.ButtonState.DOWN);
                t.raiseEvent("press", {
                    originalEvent: e.originalEvent
                });
            },
            releaseHandler: function(e) {
                if (e.insideElementPressed && e.insideElementReleased) {
                    r(t, i.ButtonState.HOVER);
                    t.raiseEvent("release", {
                        originalEvent: e.originalEvent
                    });
                } else e.insideElementPressed ? r(t, i.ButtonState.GROUP) : o(t, i.ButtonState.HOVER);
            },
            clickHandler: function(e) {
                e.quick && t.raiseEvent("click", {
                    originalEvent: e.originalEvent
                });
            },
            keyHandler: function(e) {
                if (13 === e.keyCode) {
                    t.raiseEvent("click", {
                        originalEvent: e.originalEvent
                    });
                    t.raiseEvent("release", {
                        originalEvent: e.originalEvent
                    });
                    e.preventDefault = !0;
                } else e.preventDefault = !1;
            }
        });
        r(this, i.ButtonState.REST);
    };
    i.extend(i.Button.prototype, i.EventSource.prototype, {
        notifyGroupEnter: function() {
            o(this, i.ButtonState.GROUP);
        },
        notifyGroupExit: function() {
            r(this, i.ButtonState.REST);
        },
        disable: function() {
            this.notifyGroupExit();
            this.element.disabled = !0;
            i.setElementOpacity(this.element, .2, !0);
        },
        enable: function() {
            this.element.disabled = !1;
            i.setElementOpacity(this.element, 1, !0);
            this.notifyGroupEnter();
        },
        destroy: function() {
            if (this.imgRest) {
                this.element.removeChild(this.imgRest);
                this.imgRest = null;
            }
            if (this.imgGroup) {
                this.element.removeChild(this.imgGroup);
                this.imgGroup = null;
            }
            if (this.imgHover) {
                this.element.removeChild(this.imgHover);
                this.imgHover = null;
            }
            if (this.imgDown) {
                this.element.removeChild(this.imgDown);
                this.imgDown = null;
            }
            this.removeAllHandlers();
            this.tracker.destroy();
            this.element = null;
        }
    });
    function n(e) {
        i.requestAnimationFrame(function() {
            !function(e) {
                var t;
                if (e.shouldFade) {
                    t = i.now();
                    t = t - e.fadeBeginTime;
                    t = 1 - t / e.fadeLength;
                    t = Math.min(1, t);
                    t = Math.max(0, t);
                    e.imgGroup && i.setElementOpacity(e.imgGroup, t, !0);
                    0 < t && n(e);
                }
            }(e);
        });
    }
    function o(e, t) {
        if (!e.element.disabled) {
            if (t >= i.ButtonState.GROUP && e.currentState === i.ButtonState.REST) {
                !function(e) {
                    e.shouldFade = !1;
                    e.imgGroup && i.setElementOpacity(e.imgGroup, 1, !0);
                }(e);
                e.currentState = i.ButtonState.GROUP;
            }
            if (t >= i.ButtonState.HOVER && e.currentState === i.ButtonState.GROUP) {
                e.imgHover && (e.imgHover.style.visibility = "");
                e.currentState = i.ButtonState.HOVER;
            }
            if (t >= i.ButtonState.DOWN && e.currentState === i.ButtonState.HOVER) {
                e.imgDown && (e.imgDown.style.visibility = "");
                e.currentState = i.ButtonState.DOWN;
            }
        }
    }
    function r(e, t) {
        if (!e.element.disabled) {
            if (t <= i.ButtonState.HOVER && e.currentState === i.ButtonState.DOWN) {
                e.imgDown && (e.imgDown.style.visibility = "hidden");
                e.currentState = i.ButtonState.HOVER;
            }
            if (t <= i.ButtonState.GROUP && e.currentState === i.ButtonState.HOVER) {
                e.imgHover && (e.imgHover.style.visibility = "hidden");
                e.currentState = i.ButtonState.GROUP;
            }
            if (t <= i.ButtonState.REST && e.currentState === i.ButtonState.GROUP) {
                !function(e) {
                    e.shouldFade = !0;
                    e.fadeBeginTime = i.now() + e.fadeDelay;
                    window.setTimeout(function() {
                        n(e);
                    }, e.fadeDelay);
                }(e);
                e.currentState = i.ButtonState.REST;
            }
        }
    }
}(OpenSeadragon);
!function(o) {
    o.ButtonGroup = function(e) {
        o.extend(!0, this, {
            buttons: [],
            clickTimeThreshold: o.DEFAULT_SETTINGS.clickTimeThreshold,
            clickDistThreshold: o.DEFAULT_SETTINGS.clickDistThreshold,
            labelText: ""
        }, e);
        var t, i = this.buttons.concat([]), n = this;
        this.element = e.element || o.makeNeutralElement("div");
        if (!e.group) {
            this.element.style.display = "inline-block";
            for(t = 0; t < i.length; t++)this.element.appendChild(i[t].element);
        }
        o.setElementTouchActionNone(this.element);
        this.tracker = new o.MouseTracker({
            userData: "ButtonGroup.tracker",
            element: this.element,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            enterHandler: function(e) {
                var t;
                for(t = 0; t < n.buttons.length; t++)n.buttons[t].notifyGroupEnter();
            },
            leaveHandler: function(e) {
                var t;
                if (!e.insideElementPressed) for(t = 0; t < n.buttons.length; t++)n.buttons[t].notifyGroupExit();
            }
        });
    };
    o.ButtonGroup.prototype = {
        emulateEnter: function() {
            this.tracker.enterHandler({
                eventSource: this.tracker
            });
        },
        emulateLeave: function() {
            this.tracker.leaveHandler({
                eventSource: this.tracker
            });
        },
        destroy: function() {
            for(; this.buttons.length;){
                var e = this.buttons.pop();
                this.element.removeChild(e.element);
                e.destroy();
            }
            this.tracker.destroy();
            this.element = null;
        }
    };
}(OpenSeadragon);
!function(v) {
    v.Rect = function(e, t, i, n, o) {
        this.x = "number" == typeof e ? e : 0;
        this.y = "number" == typeof t ? t : 0;
        this.width = "number" == typeof i ? i : 0;
        this.height = "number" == typeof n ? n : 0;
        this.degrees = "number" == typeof o ? o : 0;
        this.degrees = v.positiveModulo(this.degrees, 360);
        var r, s;
        if (270 <= this.degrees) {
            r = this.getTopRight();
            this.x = r.x;
            this.y = r.y;
            s = this.height;
            this.height = this.width;
            this.width = s;
            this.degrees -= 270;
        } else if (180 <= this.degrees) {
            r = this.getBottomRight();
            this.x = r.x;
            this.y = r.y;
            this.degrees -= 180;
        } else if (90 <= this.degrees) {
            r = this.getBottomLeft();
            this.x = r.x;
            this.y = r.y;
            s = this.height;
            this.height = this.width;
            this.width = s;
            this.degrees -= 90;
        }
    };
    v.Rect.fromSummits = function(e, t, i) {
        var n = e.distanceTo(t);
        var o = e.distanceTo(i);
        i = t.minus(e);
        t = Math.atan(i.y / i.x);
        i.x < 0 ? t += Math.PI : i.y < 0 && (t += 2 * Math.PI);
        return new v.Rect(e.x, e.y, n, o, t / Math.PI * 180);
    };
    v.Rect.prototype = {
        clone: function() {
            return new v.Rect(this.x, this.y, this.width, this.height, this.degrees);
        },
        getAspectRatio: function() {
            return this.width / this.height;
        },
        getTopLeft: function() {
            return new v.Point(this.x, this.y);
        },
        getBottomRight: function() {
            return new v.Point(this.x + this.width, this.y + this.height).rotate(this.degrees, this.getTopLeft());
        },
        getTopRight: function() {
            return new v.Point(this.x + this.width, this.y).rotate(this.degrees, this.getTopLeft());
        },
        getBottomLeft: function() {
            return new v.Point(this.x, this.y + this.height).rotate(this.degrees, this.getTopLeft());
        },
        getCenter: function() {
            return new v.Point(this.x + this.width / 2, this.y + this.height / 2).rotate(this.degrees, this.getTopLeft());
        },
        getSize: function() {
            return new v.Point(this.width, this.height);
        },
        equals: function(e) {
            return e instanceof v.Rect && this.x === e.x && this.y === e.y && this.width === e.width && this.height === e.height && this.degrees === e.degrees;
        },
        times: function(e) {
            return new v.Rect(this.x * e, this.y * e, this.width * e, this.height * e, this.degrees);
        },
        translate: function(e) {
            return new v.Rect(this.x + e.x, this.y + e.y, this.width, this.height, this.degrees);
        },
        union: function(e) {
            var t = this.getBoundingBox();
            var i = e.getBoundingBox();
            var n = Math.min(t.x, i.x);
            var o = Math.min(t.y, i.y);
            e = Math.max(t.x + t.width, i.x + i.width);
            i = Math.max(t.y + t.height, i.y + i.height);
            return new v.Rect(n, o, e - n, i - o);
        },
        intersection: function(e) {
            var s = 1e-10;
            var t = [];
            var i = this.getTopLeft();
            e.containsPoint(i, s) && t.push(i);
            i = this.getTopRight();
            e.containsPoint(i, s) && t.push(i);
            i = this.getBottomLeft();
            e.containsPoint(i, s) && t.push(i);
            i = this.getBottomRight();
            e.containsPoint(i, s) && t.push(i);
            i = e.getTopLeft();
            this.containsPoint(i, s) && t.push(i);
            i = e.getTopRight();
            this.containsPoint(i, s) && t.push(i);
            i = e.getBottomLeft();
            this.containsPoint(i, s) && t.push(i);
            i = e.getBottomRight();
            this.containsPoint(i, s) && t.push(i);
            var n = this._getSegments();
            var o = e._getSegments();
            for(var r = 0; r < n.length; r++){
                var a = n[r];
                for(var l = 0; l < o.length; l++){
                    var h = o[l];
                    h = function(e, t, i, n) {
                        var o = t.minus(e);
                        var r = n.minus(i);
                        t = -r.x * o.y + o.x * r.y;
                        if (0 == t) return null;
                        n = (o.x * (e.y - i.y) - o.y * (e.x - i.x)) / t;
                        t = (r.x * (e.y - i.y) - r.y * (e.x - i.x)) / t;
                        if (-s <= n && n <= 1 - s && -s <= t && t <= 1 - s) return new v.Point(e.x + t * o.x, e.y + t * o.y);
                        return null;
                    }(a[0], a[1], h[0], h[1]);
                    h && t.push(h);
                }
            }
            if (0 === t.length) return null;
            var c = t[0].x;
            var u = t[0].x;
            var d = t[0].y;
            var p = t[0].y;
            for(var g = 1; g < t.length; g++){
                var m = t[g];
                m.x < c && (c = m.x);
                m.x > u && (u = m.x);
                m.y < d && (d = m.y);
                m.y > p && (p = m.y);
            }
            return new v.Rect(c, d, u - c, p - d);
        },
        _getSegments: function() {
            var e = this.getTopLeft();
            var t = this.getTopRight();
            var i = this.getBottomLeft();
            var n = this.getBottomRight();
            return [
                [
                    e,
                    t
                ],
                [
                    t,
                    n
                ],
                [
                    n,
                    i
                ],
                [
                    i,
                    e
                ]
            ];
        },
        rotate: function(e, t) {
            if (0 === (e = v.positiveModulo(e, 360))) return this.clone();
            t = t || this.getCenter();
            var i = this.getTopLeft().rotate(e, t);
            e = this.getTopRight().rotate(e, t).minus(i);
            e = e.apply(function(e) {
                return Math.abs(e) < 1e-15 ? 0 : e;
            });
            t = Math.atan(e.y / e.x);
            e.x < 0 ? t += Math.PI : e.y < 0 && (t += 2 * Math.PI);
            return new v.Rect(i.x, i.y, this.width, this.height, t / Math.PI * 180);
        },
        getBoundingBox: function() {
            if (0 === this.degrees) return this.clone();
            var e = this.getTopLeft();
            var t = this.getTopRight();
            var i = this.getBottomLeft();
            var n = this.getBottomRight();
            var o = Math.min(e.x, t.x, i.x, n.x);
            var r = Math.max(e.x, t.x, i.x, n.x);
            var s = Math.min(e.y, t.y, i.y, n.y);
            n = Math.max(e.y, t.y, i.y, n.y);
            return new v.Rect(o, s, r - o, n - s);
        },
        getIntegerBoundingBox: function() {
            var e = this.getBoundingBox();
            var t = Math.floor(e.x);
            var i = Math.floor(e.y);
            var n = Math.ceil(e.width + e.x - t);
            e = Math.ceil(e.height + e.y - i);
            return new v.Rect(t, i, n, e);
        },
        containsPoint: function(e, t) {
            t = t || 0;
            var i = this.getTopLeft();
            var n = this.getTopRight();
            var o = this.getBottomLeft();
            var r = n.minus(i);
            var s = o.minus(i);
            return (e.x - i.x) * r.x + (e.y - i.y) * r.y >= -t && (e.x - n.x) * r.x + (e.y - n.y) * r.y <= t && (e.x - i.x) * s.x + (e.y - i.y) * s.y >= -t && (e.x - o.x) * s.x + (e.y - o.y) * s.y <= t;
        },
        toString: function() {
            return "[" + Math.round(100 * this.x) / 100 + ", " + Math.round(100 * this.y) / 100 + ", " + Math.round(100 * this.width) / 100 + "x" + Math.round(100 * this.height) / 100 + ", " + Math.round(100 * this.degrees) / 100 + "deg]";
        }
    };
}(OpenSeadragon);
!function(h) {
    var s = {};
    h.ReferenceStrip = function(e) {
        var t, i, n, o = e.viewer, r = h.getElementSize(o.element);
        if (!e.id) {
            e.id = "referencestrip-" + h.now();
            this.element = h.makeNeutralElement("div");
            this.element.id = e.id;
            this.element.className = "referencestrip";
        }
        e = h.extend(!0, {
            sizeRatio: h.DEFAULT_SETTINGS.referenceStripSizeRatio,
            position: h.DEFAULT_SETTINGS.referenceStripPosition,
            scroll: h.DEFAULT_SETTINGS.referenceStripScroll,
            clickTimeThreshold: h.DEFAULT_SETTINGS.clickTimeThreshold
        }, e, {
            element: this.element
        });
        h.extend(this, e);
        s[this.id] = {
            animating: !1
        };
        this.minPixelRatio = this.viewer.minPixelRatio;
        this.element.tabIndex = 0;
        (i = this.element.style).marginTop = "0px";
        i.marginRight = "0px";
        i.marginBottom = "0px";
        i.marginLeft = "0px";
        i.left = "0px";
        i.bottom = "0px";
        i.border = "0px";
        i.background = "#000";
        i.position = "relative";
        h.setElementTouchActionNone(this.element);
        h.setElementOpacity(this.element, .8);
        this.viewer = o;
        this.tracker = new h.MouseTracker({
            userData: "ReferenceStrip.tracker",
            element: this.element,
            clickHandler: h.delegate(this, a),
            dragHandler: h.delegate(this, l),
            scrollHandler: h.delegate(this, c),
            enterHandler: h.delegate(this, d),
            leaveHandler: h.delegate(this, p),
            keyDownHandler: h.delegate(this, g),
            keyHandler: h.delegate(this, m),
            preProcessEventHandler: function(e) {
                "wheel" === e.eventType && (e.preventDefault = !0);
            }
        });
        if (e.width && e.height) {
            this.element.style.width = e.width + "px";
            this.element.style.height = e.height + "px";
            o.addControl(this.element, {
                anchor: h.ControlAnchor.BOTTOM_LEFT
            });
        } else if ("horizontal" === e.scroll) {
            this.element.style.width = r.x * e.sizeRatio * o.tileSources.length + 12 * o.tileSources.length + "px";
            this.element.style.height = r.y * e.sizeRatio + "px";
            o.addControl(this.element, {
                anchor: h.ControlAnchor.BOTTOM_LEFT
            });
        } else {
            this.element.style.height = r.y * e.sizeRatio * o.tileSources.length + 12 * o.tileSources.length + "px";
            this.element.style.width = r.x * e.sizeRatio + "px";
            o.addControl(this.element, {
                anchor: h.ControlAnchor.TOP_LEFT
            });
        }
        this.panelWidth = r.x * this.sizeRatio + 8;
        this.panelHeight = r.y * this.sizeRatio + 8;
        this.panels = [];
        this.miniViewers = {};
        for(n = 0; n < o.tileSources.length; n++){
            (t = h.makeNeutralElement("div")).id = this.element.id + "-" + n;
            t.style.width = this.panelWidth + "px";
            t.style.height = this.panelHeight + "px";
            t.style.display = "inline";
            t.style.float = "left";
            t.style.cssFloat = "left";
            t.style.styleFloat = "left";
            t.style.padding = "2px";
            h.setElementTouchActionNone(t);
            h.setElementPointerEventsNone(t);
            this.element.appendChild(t);
            t.activePanel = !1;
            this.panels.push(t);
        }
        u(this, "vertical" === this.scroll ? r.y : r.x, 0);
        this.setFocus(0);
    };
    h.ReferenceStrip.prototype = {
        setFocus: function(e) {
            var t, i = this.element.querySelector("#" + this.element.id + "-" + e), n = h.getElementSize(this.viewer.canvas), o = Number(this.element.style.width.replace("px", "")), r = Number(this.element.style.height.replace("px", "")), s = -Number(this.element.style.marginLeft.replace("px", "")), a = -Number(this.element.style.marginTop.replace("px", ""));
            if (this.currentSelected !== i) {
                this.currentSelected && (this.currentSelected.style.background = "#000");
                this.currentSelected = i;
                this.currentSelected.style.background = "#999";
                if ("horizontal" === this.scroll) {
                    if ((t = Number(e) * (this.panelWidth + 3)) > s + n.x - this.panelWidth) {
                        t = Math.min(t, o - n.x);
                        this.element.style.marginLeft = -t + "px";
                        u(this, n.x, -t);
                    } else if (t < s) {
                        t = Math.max(0, t - n.x / 2);
                        this.element.style.marginLeft = -t + "px";
                        u(this, n.x, -t);
                    }
                } else if ((t = Number(e) * (this.panelHeight + 3)) > a + n.y - this.panelHeight) {
                    t = Math.min(t, r - n.y);
                    this.element.style.marginTop = -t + "px";
                    u(this, n.y, -t);
                } else if (t < a) {
                    t = Math.max(0, t - n.y / 2);
                    this.element.style.marginTop = -t + "px";
                    u(this, n.y, -t);
                }
                this.currentPage = e;
                d.call(this, {
                    eventSource: this.tracker
                });
            }
        },
        update: function() {
            return !!s[this.id].animating;
        },
        destroy: function() {
            if (this.miniViewers) for(var e in this.miniViewers)this.miniViewers[e].destroy();
            this.tracker.destroy();
            this.element && this.viewer.removeControl(this.element);
        }
    };
    function a(e) {
        if (e.quick) {
            e = "horizontal" === this.scroll ? Math.floor(e.position.x / this.panelWidth) : Math.floor(e.position.y / this.panelHeight);
            this.viewer.goToPage(e);
        }
        this.element.focus();
    }
    function l(e) {
        this.dragging = !0;
        if (this.element) {
            var t = Number(this.element.style.marginLeft.replace("px", "")), i = Number(this.element.style.marginTop.replace("px", "")), n = Number(this.element.style.width.replace("px", "")), o = Number(this.element.style.height.replace("px", "")), r = h.getElementSize(this.viewer.canvas);
            if ("horizontal" === this.scroll) {
                if (0 < -e.delta.x) {
                    if (t > -(n - r.x)) {
                        this.element.style.marginLeft = t + 2 * e.delta.x + "px";
                        u(this, r.x, t + 2 * e.delta.x);
                    }
                } else if (-e.delta.x < 0 && t < 0) {
                    this.element.style.marginLeft = t + 2 * e.delta.x + "px";
                    u(this, r.x, t + 2 * e.delta.x);
                }
            } else if (0 < -e.delta.y) {
                if (i > -(o - r.y)) {
                    this.element.style.marginTop = i + 2 * e.delta.y + "px";
                    u(this, r.y, i + 2 * e.delta.y);
                }
            } else if (-e.delta.y < 0 && i < 0) {
                this.element.style.marginTop = i + 2 * e.delta.y + "px";
                u(this, r.y, i + 2 * e.delta.y);
            }
        }
    }
    function c(e) {
        if (this.element) {
            var t = Number(this.element.style.marginLeft.replace("px", "")), i = Number(this.element.style.marginTop.replace("px", "")), n = Number(this.element.style.width.replace("px", "")), o = Number(this.element.style.height.replace("px", "")), r = h.getElementSize(this.viewer.canvas);
            if ("horizontal" === this.scroll) {
                if (0 < e.scroll) {
                    if (t > -(n - r.x)) {
                        this.element.style.marginLeft = t - 60 * e.scroll + "px";
                        u(this, r.x, t - 60 * e.scroll);
                    }
                } else if (e.scroll < 0 && t < 0) {
                    this.element.style.marginLeft = t - 60 * e.scroll + "px";
                    u(this, r.x, t - 60 * e.scroll);
                }
            } else if (e.scroll < 0) {
                if (i > r.y - o) {
                    this.element.style.marginTop = i + 60 * e.scroll + "px";
                    u(this, r.y, i + 60 * e.scroll);
                }
            } else if (0 < e.scroll && i < 0) {
                this.element.style.marginTop = i + 60 * e.scroll + "px";
                u(this, r.y, i + 60 * e.scroll);
            }
            e.preventDefault = !0;
        }
    }
    function u(e, t, i) {
        var n, o, r, s, a;
        n = "horizontal" === e.scroll ? e.panelWidth : e.panelHeight;
        o = Math.ceil(t / n) + 5;
        for(s = o = (o = (r = Math.ceil((Math.abs(i) + t) / n) + 1) - o) < 0 ? 0 : o; s < r && s < e.panels.length; s++)if (!(a = e.panels[s]).activePanel) {
            var l = e.viewer.tileSources[s];
            l = l.referenceStripThumbnailUrl ? {
                type: "image",
                url: l.referenceStripThumbnailUrl
            } : l;
            l = new h.Viewer({
                id: a.id,
                tileSources: [
                    l
                ],
                element: a,
                navigatorSizeRatio: e.sizeRatio,
                showNavigator: !1,
                mouseNavEnabled: !1,
                showNavigationControl: !1,
                showSequenceControl: !1,
                immediateRender: !0,
                blendTime: 0,
                animationTime: 0,
                loadTilesWithAjax: e.viewer.loadTilesWithAjax,
                ajaxHeaders: e.viewer.ajaxHeaders,
                useCanvas: e.useCanvas
            });
            h.setElementPointerEventsNone(l.canvas);
            h.setElementPointerEventsNone(l.container);
            l.innerTracker.setTracking(!1);
            l.outerTracker.setTracking(!1);
            e.miniViewers[a.id] = l;
            a.activePanel = !0;
        }
    }
    function d(e) {
        e = e.eventSource.element;
        "horizontal" === this.scroll ? e.style.marginBottom = "0px" : e.style.marginLeft = "0px";
    }
    function p(e) {
        e = e.eventSource.element;
        "horizontal" === this.scroll ? e.style.marginBottom = "-" + h.getElementSize(e).y / 2 + "px" : e.style.marginLeft = "-" + h.getElementSize(e).x / 2 + "px";
    }
    function g(e) {
        if (e.ctrl || e.alt || e.meta) e.preventDefault = !1;
        else switch(e.keyCode){
            case 38:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: 1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 40:
            case 37:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: -1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 39:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: 1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            default:
                e.preventDefault = !1;
        }
    }
    function m(e) {
        if (e.ctrl || e.alt || e.meta) e.preventDefault = !1;
        else switch(e.keyCode){
            case 61:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: 1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 45:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: -1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 48:
            case 119:
            case 87:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: 1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 115:
            case 83:
            case 97:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: -1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            case 100:
                c.call(this, {
                    eventSource: this.tracker,
                    position: null,
                    scroll: 1,
                    shift: null
                });
                e.preventDefault = !0;
                break;
            default:
                e.preventDefault = !1;
        }
    }
}(OpenSeadragon);
!function(s) {
    s.DisplayRect = function(e, t, i, n, o, r) {
        s.Rect.apply(this, [
            e,
            t,
            i,
            n
        ]);
        this.minLevel = o;
        this.maxLevel = r;
    };
    s.extend(s.DisplayRect.prototype, s.Rect.prototype);
}(OpenSeadragon);
!function(o) {
    o.Spring = function(e) {
        var t = arguments;
        "object" != typeof e && (e = {
            initial: t.length && "number" == typeof t[0] ? t[0] : void 0,
            springStiffness: 1 < t.length ? t[1].springStiffness : 5,
            animationTime: 1 < t.length ? t[1].animationTime : 1.5
        });
        o.console.assert("number" == typeof e.springStiffness && 0 !== e.springStiffness, "[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");
        o.console.assert("number" == typeof e.animationTime && 0 <= e.animationTime, "[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0");
        if (e.exponential) {
            this._exponential = !0;
            delete e.exponential;
        }
        o.extend(!0, this, e);
        this.current = {
            value: "number" == typeof this.initial ? this.initial : this._exponential ? 0 : 1,
            time: o.now()
        };
        o.console.assert(!this._exponential || 0 !== this.current.value, "[OpenSeadragon.Spring] value must be non-zero for exponential springs");
        this.start = {
            value: this.current.value,
            time: this.current.time
        };
        this.target = {
            value: this.current.value,
            time: this.current.time
        };
        if (this._exponential) {
            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
            this.current._logValue = Math.log(this.current.value);
        }
    };
    o.Spring.prototype = {
        resetTo: function(e) {
            o.console.assert(!this._exponential || 0 !== e, "[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");
            this.start.value = this.target.value = this.current.value = e;
            this.start.time = this.target.time = this.current.time = o.now();
            if (this._exponential) {
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
                this.current._logValue = Math.log(this.current.value);
            }
        },
        springTo: function(e) {
            o.console.assert(!this._exponential || 0 !== e, "[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");
            this.start.value = this.current.value;
            this.start.time = this.current.time;
            this.target.value = e;
            this.target.time = this.start.time + 1e3 * this.animationTime;
            if (this._exponential) {
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
            }
        },
        shiftBy: function(e) {
            this.start.value += e;
            this.target.value += e;
            if (this._exponential) {
                o.console.assert(0 !== this.target.value && 0 !== this.start.value, "[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
            }
        },
        setExponential: function(e) {
            this._exponential = e;
            if (this._exponential) {
                o.console.assert(0 !== this.current.value && 0 !== this.target.value && 0 !== this.start.value, "[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
                this.current._logValue = Math.log(this.current.value);
            }
        },
        update: function() {
            this.current.time = o.now();
            var e, t;
            if (this._exponential) {
                e = this.start._logValue;
                t = this.target._logValue;
            } else {
                e = this.start.value;
                t = this.target.value;
            }
            i = this.current.time >= this.target.time ? t : e + (t - e) * (n = this.springStiffness, i = (this.current.time - this.start.time) / (this.target.time - this.start.time), (1 - Math.exp(n * -i)) / (1 - Math.exp(-n)));
            var i;
            var n = this.current.value;
            this._exponential ? this.current.value = Math.exp(i) : this.current.value = i;
            return n !== this.current.value;
        },
        isAtTargetValue: function() {
            return this.current.value === this.target.value;
        }
    };
}(OpenSeadragon);
!function(t) {
    function n(e) {
        t.extend(!0, this, {
            timeout: t.DEFAULT_SETTINGS.timeout,
            jobId: null
        }, e);
        this.image = null;
    }
    n.prototype = {
        errorMsg: null,
        start: function() {
            var o = this;
            var e = this.abort;
            this.image = new Image;
            this.image.onload = function() {
                o.finish(!0);
            };
            this.image.onabort = this.image.onerror = function() {
                o.errorMsg = "Image load aborted";
                o.finish(!1);
            };
            this.jobId = window.setTimeout(function() {
                o.errorMsg = "Image load exceeded timeout (" + o.timeout + " ms)";
                o.finish(!1);
            }, this.timeout);
            if (this.loadWithAjax) {
                this.request = t.makeAjaxRequest({
                    url: this.src,
                    withCredentials: this.ajaxWithCredentials,
                    headers: this.ajaxHeaders,
                    responseType: "arraybuffer",
                    postData: this.postData,
                    success: function(t) {
                        try {
                            n = new window.Blob([
                                t.response
                            ]);
                        } catch (e) {
                            var i = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                            if ("TypeError" === e.name && i) {
                                i = new i;
                                i.append(t.response);
                                n = i.getBlob();
                            }
                        }
                        if (0 === n.size) {
                            o.errorMsg = "Empty image response.";
                            o.finish(!1);
                        }
                        var n = (window.URL || window.webkitURL).createObjectURL(n);
                        o.image.src = n;
                    },
                    error: function(e) {
                        o.errorMsg = "Image load aborted - XHR error: Ajax returned " + e.status;
                        o.finish(!1);
                    }
                });
                this.abort = function() {
                    o.request.abort();
                    "function" == typeof e && e();
                };
            } else {
                !1 !== this.crossOriginPolicy && (this.image.crossOrigin = this.crossOriginPolicy);
                this.image.src = this.src;
            }
        },
        finish: function(e) {
            this.image.onload = this.image.onerror = this.image.onabort = null;
            e || (this.image = null);
            this.jobId && window.clearTimeout(this.jobId);
            this.callback(this);
        }
    };
    t.ImageLoader = function(e) {
        t.extend(!0, this, {
            jobLimit: t.DEFAULT_SETTINGS.imageLoaderLimit,
            timeout: t.DEFAULT_SETTINGS.timeout,
            jobQueue: [],
            jobsInProgress: 0
        }, e);
    };
    t.ImageLoader.prototype = {
        addJob: function(t) {
            var i = this, e = new n({
                src: t.src,
                loadWithAjax: t.loadWithAjax,
                ajaxHeaders: t.loadWithAjax ? t.ajaxHeaders : null,
                crossOriginPolicy: t.crossOriginPolicy,
                ajaxWithCredentials: t.ajaxWithCredentials,
                postData: t.postData,
                callback: function(e) {
                    !function(e, t, i) {
                        e.jobsInProgress--;
                        if ((!e.jobLimit || e.jobsInProgress < e.jobLimit) && 0 < e.jobQueue.length) {
                            e.jobQueue.shift().start();
                            e.jobsInProgress++;
                        }
                        i(t.image, t.errorMsg, t.request);
                    }(i, e, t.callback);
                },
                abort: t.abort,
                timeout: this.timeout
            });
            if (!this.jobLimit || this.jobsInProgress < this.jobLimit) {
                e.start();
                this.jobsInProgress++;
            } else this.jobQueue.push(e);
        },
        clear: function() {
            for(var e = 0; e < this.jobQueue.length; e++){
                var t = this.jobQueue[e];
                "function" == typeof t.abort && t.abort();
            }
            this.jobQueue = [];
        }
    };
}(OpenSeadragon);
!function(d) {
    d.Tile = function(e, t, i, n, o, r, s, a, l, h, c, u) {
        this.level = e;
        this.x = t;
        this.y = i;
        this.bounds = n;
        this.sourceBounds = h;
        this.exists = o;
        this.url = r;
        this.postData = c;
        this.context2D = s;
        this.loadWithAjax = a;
        this.ajaxHeaders = l;
        if (void 0 === u) {
            d.console.error("Tile constructor needs 'cacheKey' variable: creation tile cache in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used.");
            u = d.TileSource.prototype.getTileHashKey(e, t, i, r, l, c);
        }
        this.cacheKey = u;
        this.loaded = !1;
        this.loading = !1;
        this.element = null;
        this.imgElement = null;
        this.image = null;
        this.style = null;
        this.position = null;
        this.size = null;
        this.flipped = !1;
        this.blendStart = null;
        this.opacity = null;
        this.squaredDistance = null;
        this.visibility = null;
        this.beingDrawn = !1;
        this.lastTouchTime = 0;
        this.isRightMost = !1;
        this.isBottomMost = !1;
    };
    d.Tile.prototype = {
        toString: function() {
            return this.level + "/" + this.x + "_" + this.y;
        },
        _hasTransparencyChannel: function() {
            return !!this.context2D || this.url.match(".png");
        },
        drawHTML: function(e) {
            if (this.cacheImageRecord) {
                if (this.loaded) {
                    if (!this.element) {
                        this.element = d.makeNeutralElement("div");
                        this.imgElement = this.cacheImageRecord.getImage().cloneNode();
                        this.imgElement.style.msInterpolationMode = "nearest-neighbor";
                        this.imgElement.style.width = "100%";
                        this.imgElement.style.height = "100%";
                        this.style = this.element.style;
                        this.style.position = "absolute";
                    }
                    this.element.parentNode !== e && e.appendChild(this.element);
                    this.imgElement.parentNode !== this.element && this.element.appendChild(this.imgElement);
                    this.style.top = this.position.y + "px";
                    this.style.left = this.position.x + "px";
                    this.style.height = this.size.y + "px";
                    this.style.width = this.size.x + "px";
                    this.flipped && (this.style.transform = "scaleX(-1)");
                    d.setElementOpacity(this.element, this.opacity);
                } else d.console.warn("Attempting to draw tile %s when it's not yet loaded.", this.toString());
            } else d.console.warn("[Tile.drawHTML] attempting to draw tile %s when it's not cached", this.toString());
        },
        drawCanvas: function(e, t, i, n, o) {
            var r, s = this.position.times(d.pixelDensityRatio), a = this.size.times(d.pixelDensityRatio);
            if (this.context2D || this.cacheImageRecord) {
                r = this.context2D || this.cacheImageRecord.getRenderedContext();
                if (this.loaded && r) {
                    e.save();
                    e.globalAlpha = this.opacity;
                    if ("number" == typeof i && 1 !== i) {
                        s = s.times(i);
                        a = a.times(i);
                    }
                    n instanceof d.Point && (s = s.plus(n));
                    if (1 === e.globalAlpha && this._hasTransparencyChannel()) {
                        if (o) {
                            s.x = Math.round(s.x);
                            s.y = Math.round(s.y);
                            a.x = Math.round(a.x);
                            a.y = Math.round(a.y);
                        }
                        e.clearRect(s.x, s.y, a.x, a.y);
                    }
                    t({
                        context: e,
                        tile: this,
                        rendered: r
                    });
                    var l, h;
                    if (this.sourceBounds) {
                        l = Math.min(this.sourceBounds.width, r.canvas.width);
                        h = Math.min(this.sourceBounds.height, r.canvas.height);
                    } else {
                        l = r.canvas.width;
                        h = r.canvas.height;
                    }
                    e.translate(s.x + a.x / 2, 0);
                    this.flipped && e.scale(-1, 1);
                    e.drawImage(r.canvas, 0, 0, l, h, -a.x / 2, s.y, a.x, a.y);
                    e.restore();
                } else d.console.warn("Attempting to draw tile %s when it's not yet loaded.", this.toString());
            } else d.console.warn("[Tile.drawCanvas] attempting to draw tile %s when it's not cached", this.toString());
        },
        getScaleForEdgeSmoothing: function() {
            var e;
            if (this.cacheImageRecord) e = this.cacheImageRecord.getRenderedContext();
            else {
                if (!this.context2D) {
                    d.console.warn("[Tile.drawCanvas] attempting to get tile scale %s when tile's not cached", this.toString());
                    return 1;
                }
                e = this.context2D;
            }
            return e.canvas.width / (this.size.x * d.pixelDensityRatio);
        },
        getTranslationForEdgeSmoothing: function(e, t, i) {
            var n = Math.max(1, Math.ceil((i.x - t.x) / 2));
            t = Math.max(1, Math.ceil((i.y - t.y) / 2));
            return new d.Point(n, t).minus(this.position.times(d.pixelDensityRatio).times(e || 1).apply(function(e) {
                return e % 1;
            }));
        },
        unload: function() {
            this.imgElement && this.imgElement.parentNode && this.imgElement.parentNode.removeChild(this.imgElement);
            this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element);
            this.element = null;
            this.imgElement = null;
            this.loaded = !1;
            this.loading = !1;
        }
    };
}(OpenSeadragon);
!function(r) {
    r.OverlayPlacement = r.Placement;
    r.OverlayRotationMode = r.freezeObject({
        NO_ROTATION: 1,
        EXACT: 2,
        BOUNDING_BOX: 3
    });
    r.Overlay = function(e, t, i) {
        i = r.isPlainObject(e) ? e : {
            element: e,
            location: t,
            placement: i
        };
        this.element = i.element;
        this.style = i.element.style;
        this._init(i);
    };
    r.Overlay.prototype = {
        _init: function(e) {
            this.location = e.location;
            this.placement = void 0 === e.placement ? r.Placement.TOP_LEFT : e.placement;
            this.onDraw = e.onDraw;
            this.checkResize = void 0 === e.checkResize || e.checkResize;
            this.width = void 0 === e.width ? null : e.width;
            this.height = void 0 === e.height ? null : e.height;
            this.rotationMode = e.rotationMode || r.OverlayRotationMode.EXACT;
            if (this.location instanceof r.Rect) {
                this.width = this.location.width;
                this.height = this.location.height;
                this.location = this.location.getTopLeft();
                this.placement = r.Placement.TOP_LEFT;
            }
            this.scales = null !== this.width && null !== this.height;
            this.bounds = new r.Rect(this.location.x, this.location.y, this.width, this.height);
            this.position = this.location;
        },
        adjust: function(e, t) {
            var i = r.Placement.properties[this.placement];
            if (i) {
                i.isHorizontallyCentered ? e.x -= t.x / 2 : i.isRight && (e.x -= t.x);
                i.isVerticallyCentered ? e.y -= t.y / 2 : i.isBottom && (e.y -= t.y);
            }
        },
        destroy: function() {
            var e = this.element;
            var t = this.style;
            if (e.parentNode) {
                e.parentNode.removeChild(e);
                if (e.prevElementParent) {
                    t.display = "none";
                    document.body.appendChild(e);
                }
            }
            this.onDraw = null;
            t.top = "";
            t.left = "";
            t.position = "";
            null !== this.width && (t.width = "");
            null !== this.height && (t.height = "");
            var i = r.getCssPropertyWithVendorPrefix("transformOrigin");
            e = r.getCssPropertyWithVendorPrefix("transform");
            if (i && e) {
                t[i] = "";
                t[e] = "";
            }
        },
        drawHTML: function(e, t) {
            var i = this.element;
            if (i.parentNode !== e) {
                i.prevElementParent = i.parentNode;
                i.prevNextSibling = i.nextSibling;
                e.appendChild(i);
                this.style.position = "absolute";
                this.size = r.getElementSize(i);
            }
            var n = this._getOverlayPositionAndSize(t);
            e = n.position;
            i = this.size = n.size;
            t = n.rotate;
            if (this.onDraw) this.onDraw(e, i, this.element);
            else {
                n = this.style;
                n.left = e.x + "px";
                n.top = e.y + "px";
                null !== this.width && (n.width = i.x + "px");
                null !== this.height && (n.height = i.y + "px");
                e = r.getCssPropertyWithVendorPrefix("transformOrigin");
                i = r.getCssPropertyWithVendorPrefix("transform");
                if (e && i) {
                    if (t) {
                        n[e] = this._getTransformOrigin();
                        n[i] = "rotate(" + t + "deg)";
                    } else {
                        n[e] = "";
                        n[i] = "";
                    }
                }
                n.display = "block";
            }
        },
        _getOverlayPositionAndSize: function(e) {
            var t = e.pixelFromPoint(this.location, !0);
            var i = this._getSizeInPixels(e);
            this.adjust(t, i);
            var n = 0;
            if (e.degrees && this.rotationMode !== r.OverlayRotationMode.NO_ROTATION) {
                if (this.rotationMode === r.OverlayRotationMode.BOUNDING_BOX && null !== this.width && null !== this.height) {
                    var o = new r.Rect(t.x, t.y, i.x, i.y);
                    o = this._getBoundingBox(o, e.degrees);
                    t = o.getTopLeft();
                    i = o.getSize();
                } else n = e.degrees;
            }
            return {
                position: t,
                size: i,
                rotate: n
            };
        },
        _getSizeInPixels: function(e) {
            var t = this.size.x;
            var i = this.size.y;
            if (null !== this.width || null !== this.height) {
                var n = e.deltaPixelsFromPointsNoRotate(new r.Point(this.width || 0, this.height || 0), !0);
                null !== this.width && (t = n.x);
                null !== this.height && (i = n.y);
            }
            if (this.checkResize && (null === this.width || null === this.height)) {
                n = this.size = r.getElementSize(this.element);
                null === this.width && (t = n.x);
                null === this.height && (i = n.y);
            }
            return new r.Point(t, i);
        },
        _getBoundingBox: function(e, t) {
            var i = this._getPlacementPoint(e);
            return e.rotate(t, i).getBoundingBox();
        },
        _getPlacementPoint: function(e) {
            var t = new r.Point(e.x, e.y);
            var i = r.Placement.properties[this.placement];
            if (i) {
                i.isHorizontallyCentered ? t.x += e.width / 2 : i.isRight && (t.x += e.width);
                i.isVerticallyCentered ? t.y += e.height / 2 : i.isBottom && (t.y += e.height);
            }
            return t;
        },
        _getTransformOrigin: function() {
            var e = "";
            var t = r.Placement.properties[this.placement];
            if (!t) return e;
            t.isLeft ? e = "left" : t.isRight && (e = "right");
            t.isTop ? e += " top" : t.isBottom && (e += " bottom");
            return e;
        },
        update: function(e, t) {
            t = r.isPlainObject(e) ? e : {
                location: e,
                placement: t
            };
            this._init({
                location: t.location || this.location,
                placement: (void 0 !== t.placement ? t : this).placement,
                onDraw: t.onDraw || this.onDraw,
                checkResize: t.checkResize || this.checkResize,
                width: (void 0 !== t.width ? t : this).width,
                height: (void 0 !== t.height ? t : this).height,
                rotationMode: t.rotationMode || this.rotationMode
            });
        },
        getBounds: function(e) {
            r.console.assert(e, "A viewport must now be passed to Overlay.getBounds.");
            var t = this.width;
            var i = this.height;
            if (null === t || null === i) {
                var n = e.deltaPointsFromPixelsNoRotate(this.size, !0);
                null === t && (t = n.x);
                null === i && (i = n.y);
            }
            n = this.location.clone();
            this.adjust(n, new r.Point(t, i));
            return this._adjustBoundsForRotation(e, new r.Rect(n.x, n.y, t, i));
        },
        _adjustBoundsForRotation: function(e, t) {
            if (!e || 0 === e.degrees || this.rotationMode === r.OverlayRotationMode.EXACT) return t;
            if (this.rotationMode !== r.OverlayRotationMode.BOUNDING_BOX) return t.rotate(-e.degrees, this._getPlacementPoint(t));
            if (null === this.width || null === this.height) return t;
            t = this._getOverlayPositionAndSize(e);
            return e.viewerElementToViewportRectangle(new r.Rect(t.position.x, t.position.y, t.size.x, t.size.y));
        }
    };
}(OpenSeadragon);
!function(a) {
    a.Drawer = function(e) {
        a.console.assert(e.viewer, "[Drawer] options.viewer is required");
        var t = arguments;
        a.isPlainObject(e) || (e = {
            source: t[0],
            viewport: t[1],
            element: t[2]
        });
        a.console.assert(e.viewport, "[Drawer] options.viewport is required");
        a.console.assert(e.element, "[Drawer] options.element is required");
        e.source && a.console.error("[Drawer] options.source is no longer accepted; use TiledImage instead");
        this.viewer = e.viewer;
        this.viewport = e.viewport;
        this.debugGridColor = "string" == typeof e.debugGridColor ? [
            e.debugGridColor
        ] : e.debugGridColor || a.DEFAULT_SETTINGS.debugGridColor;
        e.opacity && a.console.error("[Drawer] options.opacity is no longer accepted; set the opacity on the TiledImage instead");
        this.useCanvas = a.supportsCanvas && (!this.viewer || this.viewer.useCanvas);
        this.container = a.getElement(e.element);
        this.canvas = a.makeNeutralElement(this.useCanvas ? "canvas" : "div");
        this.context = this.useCanvas ? this.canvas.getContext("2d") : null;
        this.sketchCanvas = null;
        this.sketchContext = null;
        this.element = this.container;
        this.container.dir = "ltr";
        if (this.useCanvas) {
            t = this._calculateCanvasSize();
            this.canvas.width = t.x;
            this.canvas.height = t.y;
        }
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.position = "absolute";
        a.setElementOpacity(this.canvas, this.opacity, !0);
        a.setElementPointerEventsNone(this.canvas);
        a.setElementTouchActionNone(this.canvas);
        this.container.style.textAlign = "left";
        this.container.appendChild(this.canvas);
        this._imageSmoothingEnabled = !0;
    };
    a.Drawer.prototype = {
        addOverlay: function(e, t, i, n) {
            a.console.error("drawer.addOverlay is deprecated. Use viewer.addOverlay instead.");
            this.viewer.addOverlay(e, t, i, n);
            return this;
        },
        updateOverlay: function(e, t, i) {
            a.console.error("drawer.updateOverlay is deprecated. Use viewer.updateOverlay instead.");
            this.viewer.updateOverlay(e, t, i);
            return this;
        },
        removeOverlay: function(e) {
            a.console.error("drawer.removeOverlay is deprecated. Use viewer.removeOverlay instead.");
            this.viewer.removeOverlay(e);
            return this;
        },
        clearOverlays: function() {
            a.console.error("drawer.clearOverlays is deprecated. Use viewer.clearOverlays instead.");
            this.viewer.clearOverlays();
            return this;
        },
        viewportCoordToDrawerCoord: function(e) {
            e = this.viewport.pixelFromPointNoRotate(e, !0);
            return new a.Point(e.x * a.pixelDensityRatio, e.y * a.pixelDensityRatio);
        },
        clipWithPolygons: function(e, t) {
            if (this.useCanvas) {
                var i = this._getContext(t);
                i.beginPath();
                e.forEach(function(e) {
                    e.forEach(function(e, t) {
                        i[0 === t ? "moveTo" : "lineTo"](e.x, e.y);
                    });
                });
                i.clip();
            }
        },
        setOpacity: function(e) {
            a.console.error("drawer.setOpacity is deprecated. Use tiledImage.setOpacity instead.");
            var t = this.viewer.world;
            for(var i = 0; i < t.getItemCount(); i++)t.getItemAt(i).setOpacity(e);
            return this;
        },
        getOpacity: function() {
            a.console.error("drawer.getOpacity is deprecated. Use tiledImage.getOpacity instead.");
            var e = this.viewer.world;
            var t = 0;
            for(var i = 0; i < e.getItemCount(); i++){
                var n = e.getItemAt(i).getOpacity();
                t < n && (t = n);
            }
            return t;
        },
        needsUpdate: function() {
            a.console.error("[Drawer.needsUpdate] this function is deprecated. Use World.needsDraw instead.");
            return this.viewer.world.needsDraw();
        },
        numTilesLoaded: function() {
            a.console.error("[Drawer.numTilesLoaded] this function is deprecated. Use TileCache.numTilesLoaded instead.");
            return this.viewer.tileCache.numTilesLoaded();
        },
        reset: function() {
            a.console.error("[Drawer.reset] this function is deprecated. Use World.resetItems instead.");
            this.viewer.world.resetItems();
            return this;
        },
        update: function() {
            a.console.error("[Drawer.update] this function is deprecated. Use Drawer.clear and World.draw instead.");
            this.clear();
            this.viewer.world.draw();
            return this;
        },
        canRotate: function() {
            return this.useCanvas;
        },
        destroy: function() {
            this.canvas.width = 1;
            this.canvas.height = 1;
            this.sketchCanvas = null;
            this.sketchContext = null;
        },
        clear: function() {
            this.canvas.innerHTML = "";
            if (this.useCanvas) {
                var e = this._calculateCanvasSize();
                if (this.canvas.width !== e.x || this.canvas.height !== e.y) {
                    this.canvas.width = e.x;
                    this.canvas.height = e.y;
                    this._updateImageSmoothingEnabled(this.context);
                    if (null !== this.sketchCanvas) {
                        e = this._calculateSketchCanvasSize();
                        this.sketchCanvas.width = e.x;
                        this.sketchCanvas.height = e.y;
                        this._updateImageSmoothingEnabled(this.sketchContext);
                    }
                }
                this._clear();
            }
        },
        _clear: function(e, t) {
            if (this.useCanvas) {
                e = this._getContext(e);
                if (t) e.clearRect(t.x, t.y, t.width, t.height);
                else {
                    t = e.canvas;
                    e.clearRect(0, 0, t.width, t.height);
                }
            }
        },
        viewportToDrawerRectangle: function(e) {
            var t = this.viewport.pixelFromPointNoRotate(e.getTopLeft(), !0);
            e = this.viewport.deltaPixelsFromPointsNoRotate(e.getSize(), !0);
            return new a.Rect(t.x * a.pixelDensityRatio, t.y * a.pixelDensityRatio, e.x * a.pixelDensityRatio, e.y * a.pixelDensityRatio);
        },
        drawTile: function(e, t, i, n, o, r) {
            a.console.assert(e, "[Drawer.drawTile] tile is required");
            a.console.assert(t, "[Drawer.drawTile] drawingHandler is required");
            if (this.useCanvas) {
                i = this._getContext(i);
                e.drawCanvas(i, t, n = n || 1, o, r);
            } else e.drawHTML(this.canvas);
        },
        _getContext: function(e) {
            var t = this.context;
            if (e) {
                if (null === this.sketchCanvas) {
                    this.sketchCanvas = document.createElement("canvas");
                    e = this._calculateSketchCanvasSize();
                    this.sketchCanvas.width = e.x;
                    this.sketchCanvas.height = e.y;
                    this.sketchContext = this.sketchCanvas.getContext("2d");
                    if (0 === this.viewport.getRotation()) {
                        var i = this;
                        this.viewer.addHandler("rotate", function e() {
                            if (0 !== i.viewport.getRotation()) {
                                i.viewer.removeHandler("rotate", e);
                                var t = i._calculateSketchCanvasSize();
                                i.sketchCanvas.width = t.x;
                                i.sketchCanvas.height = t.y;
                            }
                        });
                    }
                    this._updateImageSmoothingEnabled(this.sketchContext);
                }
                t = this.sketchContext;
            }
            return t;
        },
        saveContext: function(e) {
            this.useCanvas && this._getContext(e).save();
        },
        restoreContext: function(e) {
            this.useCanvas && this._getContext(e).restore();
        },
        setClip: function(e, t) {
            if (this.useCanvas) {
                t = this._getContext(t);
                t.beginPath();
                t.rect(e.x, e.y, e.width, e.height);
                t.clip();
            }
        },
        drawRectangle: function(e, t, i) {
            if (this.useCanvas) {
                i = this._getContext(i);
                i.save();
                i.fillStyle = t;
                i.fillRect(e.x, e.y, e.width, e.height);
                i.restore();
            }
        },
        blendSketch: function(e, t, i, n) {
            var o = e;
            a.isPlainObject(o) || (o = {
                opacity: e,
                scale: t,
                translate: i,
                compositeOperation: n
            });
            if (this.useCanvas && this.sketchCanvas) {
                e = o.opacity;
                n = o.compositeOperation;
                var r = o.bounds;
                this.context.save();
                this.context.globalAlpha = e;
                n && (this.context.globalCompositeOperation = n);
                if (r) {
                    if (r.x < 0) {
                        r.width += r.x;
                        r.x = 0;
                    }
                    r.x + r.width > this.canvas.width && (r.width = this.canvas.width - r.x);
                    if (r.y < 0) {
                        r.height += r.y;
                        r.y = 0;
                    }
                    r.y + r.height > this.canvas.height && (r.height = this.canvas.height - r.y);
                    this.context.drawImage(this.sketchCanvas, r.x, r.y, r.width, r.height, r.x, r.y, r.width, r.height);
                } else {
                    t = o.scale || 1;
                    e = (i = o.translate) instanceof a.Point ? i : new a.Point(0, 0);
                    n = 0;
                    r = 0;
                    if (i) {
                        o = this.sketchCanvas.width - this.canvas.width;
                        i = this.sketchCanvas.height - this.canvas.height;
                        n = Math.round(o / 2);
                        r = Math.round(i / 2);
                    }
                    this.context.drawImage(this.sketchCanvas, e.x - n * t, e.y - r * t, (this.canvas.width + 2 * n) * t, (this.canvas.height + 2 * r) * t, -n, -r, this.canvas.width + 2 * n, this.canvas.height + 2 * r);
                }
                this.context.restore();
            }
        },
        drawDebugInfo: function(e, t, i, n) {
            if (this.useCanvas) {
                var o = this.viewer.world.getIndexOfItem(n) % this.debugGridColor.length;
                var r = this.context;
                r.save();
                r.lineWidth = 2 * a.pixelDensityRatio;
                r.font = "small-caps bold " + 13 * a.pixelDensityRatio + "px arial";
                r.strokeStyle = this.debugGridColor[o];
                r.fillStyle = this.debugGridColor[o];
                0 !== this.viewport.degrees && this._offsetForRotation({
                    degrees: this.viewport.degrees
                });
                n.getRotation(!0) % 360 != 0 && this._offsetForRotation({
                    degrees: n.getRotation(!0),
                    point: n.viewport.pixelFromPointNoRotate(n._getRotationPoint(!0), !0)
                });
                0 === n.viewport.degrees && n.getRotation(!0) % 360 == 0 && n._drawer.viewer.viewport.getFlip() && n._drawer._flip();
                r.strokeRect(e.position.x * a.pixelDensityRatio, e.position.y * a.pixelDensityRatio, e.size.x * a.pixelDensityRatio, e.size.y * a.pixelDensityRatio);
                var s = (e.position.x + e.size.x / 2) * a.pixelDensityRatio;
                o = (e.position.y + e.size.y / 2) * a.pixelDensityRatio;
                r.translate(s, o);
                r.rotate(Math.PI / 180 * -this.viewport.degrees);
                r.translate(-s, -o);
                if (0 === e.x && 0 === e.y) {
                    r.fillText("Zoom: " + this.viewport.getZoom(), e.position.x * a.pixelDensityRatio, (e.position.y - 30) * a.pixelDensityRatio);
                    r.fillText("Pan: " + this.viewport.getBounds().toString(), e.position.x * a.pixelDensityRatio, (e.position.y - 20) * a.pixelDensityRatio);
                }
                r.fillText("Level: " + e.level, (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 20) * a.pixelDensityRatio);
                r.fillText("Column: " + e.x, (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 30) * a.pixelDensityRatio);
                r.fillText("Row: " + e.y, (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 40) * a.pixelDensityRatio);
                r.fillText("Order: " + i + " of " + t, (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 50) * a.pixelDensityRatio);
                r.fillText("Size: " + e.size.toString(), (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 60) * a.pixelDensityRatio);
                r.fillText("Position: " + e.position.toString(), (e.position.x + 10) * a.pixelDensityRatio, (e.position.y + 70) * a.pixelDensityRatio);
                0 !== this.viewport.degrees && this._restoreRotationChanges();
                n.getRotation(!0) % 360 != 0 && this._restoreRotationChanges();
                0 === n.viewport.degrees && n.getRotation(!0) % 360 == 0 && n._drawer.viewer.viewport.getFlip() && n._drawer._flip();
                r.restore();
            }
        },
        debugRect: function(e) {
            if (this.useCanvas) {
                var t = this.context;
                t.save();
                t.lineWidth = 2 * a.pixelDensityRatio;
                t.strokeStyle = this.debugGridColor[0];
                t.fillStyle = this.debugGridColor[0];
                t.strokeRect(e.x * a.pixelDensityRatio, e.y * a.pixelDensityRatio, e.width * a.pixelDensityRatio, e.height * a.pixelDensityRatio);
                t.restore();
            }
        },
        setImageSmoothingEnabled: function(e) {
            if (this.useCanvas) {
                this._imageSmoothingEnabled = e;
                this._updateImageSmoothingEnabled(this.context);
                this.viewer.forceRedraw();
            }
        },
        _updateImageSmoothingEnabled: function(e) {
            e.msImageSmoothingEnabled = this._imageSmoothingEnabled;
            e.imageSmoothingEnabled = this._imageSmoothingEnabled;
        },
        getCanvasSize: function(e) {
            e = this._getContext(e).canvas;
            return new a.Point(e.width, e.height);
        },
        getCanvasCenter: function() {
            return new a.Point(this.canvas.width / 2, this.canvas.height / 2);
        },
        _offsetForRotation: function(e) {
            var t = e.point ? e.point.times(a.pixelDensityRatio) : this.getCanvasCenter();
            var i = this._getContext(e.useSketch);
            i.save();
            i.translate(t.x, t.y);
            if (this.viewer.viewport.flipped) {
                i.rotate(Math.PI / 180 * -e.degrees);
                i.scale(-1, 1);
            } else i.rotate(Math.PI / 180 * e.degrees);
            i.translate(-t.x, -t.y);
        },
        _flip: function(e) {
            var t = (e = e || {}).point ? e.point.times(a.pixelDensityRatio) : this.getCanvasCenter();
            e = this._getContext(e.useSketch);
            e.translate(t.x, 0);
            e.scale(-1, 1);
            e.translate(-t.x, 0);
        },
        _restoreRotationChanges: function(e) {
            this._getContext(e).restore();
        },
        _calculateCanvasSize: function() {
            var e = a.pixelDensityRatio;
            var t = this.viewport.getContainerSize();
            return {
                x: Math.round(t.x * e),
                y: Math.round(t.y * e)
            };
        },
        _calculateSketchCanvasSize: function() {
            var e = this._calculateCanvasSize();
            if (0 === this.viewport.getRotation()) return e;
            e = Math.ceil(Math.sqrt(e.x * e.x + e.y * e.y));
            return {
                x: e,
                y: e
            };
        }
    };
}(OpenSeadragon);
!function(a) {
    a.Viewport = function(e) {
        var t = arguments;
        if ((e = t.length && t[0] instanceof a.Point ? {
            containerSize: t[0],
            contentSize: t[1],
            config: t[2]
        } : e).config) {
            a.extend(!0, e, e.config);
            delete e.config;
        }
        this._margins = a.extend({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }, e.margins || {});
        delete e.margins;
        a.extend(!0, this, {
            containerSize: null,
            contentSize: null,
            zoomPoint: null,
            viewer: null,
            springStiffness: a.DEFAULT_SETTINGS.springStiffness,
            animationTime: a.DEFAULT_SETTINGS.animationTime,
            minZoomImageRatio: a.DEFAULT_SETTINGS.minZoomImageRatio,
            maxZoomPixelRatio: a.DEFAULT_SETTINGS.maxZoomPixelRatio,
            visibilityRatio: a.DEFAULT_SETTINGS.visibilityRatio,
            wrapHorizontal: a.DEFAULT_SETTINGS.wrapHorizontal,
            wrapVertical: a.DEFAULT_SETTINGS.wrapVertical,
            defaultZoomLevel: a.DEFAULT_SETTINGS.defaultZoomLevel,
            minZoomLevel: a.DEFAULT_SETTINGS.minZoomLevel,
            maxZoomLevel: a.DEFAULT_SETTINGS.maxZoomLevel,
            degrees: a.DEFAULT_SETTINGS.degrees,
            flipped: a.DEFAULT_SETTINGS.flipped,
            homeFillsViewer: a.DEFAULT_SETTINGS.homeFillsViewer,
            silenceMultiImageWarnings: a.DEFAULT_SETTINGS.silenceMultiImageWarnings
        }, e);
        this._updateContainerInnerSize();
        this.centerSpringX = new a.Spring({
            initial: 0,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this.centerSpringY = new a.Spring({
            initial: 0,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this.zoomSpring = new a.Spring({
            exponential: !0,
            initial: 1,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this._oldCenterX = this.centerSpringX.current.value;
        this._oldCenterY = this.centerSpringY.current.value;
        this._oldZoom = this.zoomSpring.current.value;
        this._setContentBounds(new a.Rect(0, 0, 1, 1), 1);
        this.goHome(!0);
        this.update();
    };
    a.Viewport.prototype = {
        resetContentSize: function(e) {
            a.console.assert(e, "[Viewport.resetContentSize] contentSize is required");
            a.console.assert(e instanceof a.Point, "[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");
            a.console.assert(0 < e.x, "[Viewport.resetContentSize] contentSize.x must be greater than 0");
            a.console.assert(0 < e.y, "[Viewport.resetContentSize] contentSize.y must be greater than 0");
            this._setContentBounds(new a.Rect(0, 0, 1, e.y / e.x), e.x);
            return this;
        },
        setHomeBounds: function(e, t) {
            a.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually.");
            this._setContentBounds(e, t);
        },
        _setContentBounds: function(e, t) {
            a.console.assert(e, "[Viewport._setContentBounds] bounds is required");
            a.console.assert(e instanceof a.Rect, "[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect");
            a.console.assert(0 < e.width, "[Viewport._setContentBounds] bounds.width must be greater than 0");
            a.console.assert(0 < e.height, "[Viewport._setContentBounds] bounds.height must be greater than 0");
            this._contentBoundsNoRotate = e.clone();
            this._contentSizeNoRotate = this._contentBoundsNoRotate.getSize().times(t);
            this._contentBounds = e.rotate(this.degrees).getBoundingBox();
            this._contentSize = this._contentBounds.getSize().times(t);
            this._contentAspectRatio = this._contentSize.x / this._contentSize.y;
            this.viewer && this.viewer.raiseEvent("reset-size", {
                contentSize: this._contentSizeNoRotate.clone(),
                contentFactor: t,
                homeBounds: this._contentBoundsNoRotate.clone(),
                contentBounds: this._contentBounds.clone()
            });
        },
        getHomeZoom: function() {
            if (this.defaultZoomLevel) return this.defaultZoomLevel;
            var e = this._contentAspectRatio / this.getAspectRatio();
            return (this.homeFillsViewer ? 1 <= e ? e : 1 : 1 <= e ? 1 : e) / this._contentBounds.width;
        },
        getHomeBounds: function() {
            return this.getHomeBoundsNoRotate().rotate(-this.getRotation());
        },
        getHomeBoundsNoRotate: function() {
            var e = this._contentBounds.getCenter();
            var t = 1 / this.getHomeZoom();
            var i = t / this.getAspectRatio();
            return new a.Rect(e.x - t / 2, e.y - i / 2, t, i);
        },
        goHome: function(e) {
            this.viewer && this.viewer.raiseEvent("home", {
                immediately: e
            });
            return this.fitBounds(this.getHomeBounds(), e);
        },
        getMinZoom: function() {
            var e = this.getHomeZoom();
            return this.minZoomLevel || this.minZoomImageRatio * e;
        },
        getMaxZoom: function() {
            var e = this.maxZoomLevel;
            if (!e) {
                e = this._contentSize.x * this.maxZoomPixelRatio / this._containerInnerSize.x;
                e /= this._contentBounds.width;
            }
            return Math.max(e, this.getHomeZoom());
        },
        getAspectRatio: function() {
            return this._containerInnerSize.x / this._containerInnerSize.y;
        },
        getContainerSize: function() {
            return new a.Point(this.containerSize.x, this.containerSize.y);
        },
        getMargins: function() {
            return a.extend({}, this._margins);
        },
        setMargins: function(e) {
            a.console.assert("object" === a.type(e), "[Viewport.setMargins] margins must be an object");
            this._margins = a.extend({
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }, e);
            this._updateContainerInnerSize();
            this.viewer && this.viewer.forceRedraw();
        },
        getBounds: function(e) {
            return this.getBoundsNoRotate(e).rotate(-this.getRotation());
        },
        getBoundsNoRotate: function(e) {
            var t = this.getCenter(e);
            var i = 1 / this.getZoom(e);
            e = i / this.getAspectRatio();
            return new a.Rect(t.x - i / 2, t.y - e / 2, i, e);
        },
        getBoundsWithMargins: function(e) {
            return this.getBoundsNoRotateWithMargins(e).rotate(-this.getRotation(), this.getCenter(e));
        },
        getBoundsNoRotateWithMargins: function(e) {
            var t = this.getBoundsNoRotate(e);
            e = this._containerInnerSize.x * this.getZoom(e);
            t.x -= this._margins.left / e;
            t.y -= this._margins.top / e;
            t.width += (this._margins.left + this._margins.right) / e;
            t.height += (this._margins.top + this._margins.bottom) / e;
            return t;
        },
        getCenter: function(e) {
            var t, i, n, o = new a.Point(this.centerSpringX.current.value, this.centerSpringY.current.value), r = new a.Point(this.centerSpringX.target.value, this.centerSpringY.target.value);
            if (e) return o;
            if (!this.zoomPoint) return r;
            t = this.pixelFromPoint(this.zoomPoint, !0);
            e = (i = 1 / (n = this.getZoom())) / this.getAspectRatio();
            e = new a.Rect(o.x - i / 2, o.y - e / 2, i, e);
            n = this._pixelFromPoint(this.zoomPoint, e).minus(t).divide(this._containerInnerSize.x * n);
            return r.plus(n);
        },
        getZoom: function(e) {
            return (e ? this.zoomSpring.current : this.zoomSpring.target).value;
        },
        _applyZoomConstraints: function(e) {
            return Math.max(Math.min(e, this.getMaxZoom()), this.getMinZoom());
        },
        _applyBoundaryConstraints: function(e) {
            e = new a.Rect(e.x, e.y, e.width, e.height);
            if (!this.wrapHorizontal) {
                var t = this.visibilityRatio * e.width;
                var i = e.x + e.width;
                var n = this._contentBoundsNoRotate.x + this._contentBoundsNoRotate.width;
                i = this._contentBoundsNoRotate.x - i + t;
                n = n - e.x - t;
                t > this._contentBoundsNoRotate.width ? e.x += (i + n) / 2 : n < 0 ? e.x += n : 0 < i && (e.x += i);
            }
            if (!this.wrapVertical) {
                t = this.visibilityRatio * e.height;
                n = e.y + e.height;
                i = this._contentBoundsNoRotate.y + this._contentBoundsNoRotate.height;
                n = this._contentBoundsNoRotate.y - n + t;
                i = i - e.y - t;
                t > this._contentBoundsNoRotate.height ? e.y += (n + i) / 2 : i < 0 ? e.y += i : 0 < n && (e.y += n);
            }
            return e;
        },
        _raiseConstraintsEvent: function(e) {
            this.viewer && this.viewer.raiseEvent("constrain", {
                immediately: e
            });
        },
        applyConstraints: function(e) {
            var t = this.getZoom();
            var i = this._applyZoomConstraints(t);
            t !== i && this.zoomTo(i, this.zoomPoint, e);
            t = this.getBoundsNoRotate();
            i = this._applyBoundaryConstraints(t);
            this._raiseConstraintsEvent(e);
            t.x === i.x && t.y === i.y && !e || this.fitBounds(i.rotate(-this.getRotation()), e);
            return this;
        },
        ensureVisible: function(e) {
            return this.applyConstraints(e);
        },
        _fitBounds: function(e, t) {
            var i = (t = t || {}).immediately || !1;
            var n = t.constraints || !1;
            var o = this.getAspectRatio();
            t = e.getCenter();
            e = new a.Rect(e.x, e.y, e.width, e.height, e.degrees + this.getRotation()).getBoundingBox();
            e.getAspectRatio() >= o ? e.height = e.width / o : e.width = e.height * o;
            e.x = t.x - e.width / 2;
            e.y = t.y - e.height / 2;
            o = 1 / e.width;
            if (n) {
                var r = e.getAspectRatio();
                var s = this._applyZoomConstraints(o);
                if (o !== s) {
                    e.width = 1 / (o = s);
                    e.x = t.x - e.width / 2;
                    e.height = e.width / r;
                    e.y = t.y - e.height / 2;
                }
                t = (e = this._applyBoundaryConstraints(e)).getCenter();
                this._raiseConstraintsEvent(i);
            }
            if (i) {
                this.panTo(t, !0);
                return this.zoomTo(o, null, !0);
            }
            this.panTo(this.getCenter(!0), !0);
            this.zoomTo(this.getZoom(!0), null, !0);
            s = this.getBounds();
            r = this.getZoom();
            if (0 === r || Math.abs(o / r - 1) < 1e-8) {
                this.zoomTo(o, !0);
                return this.panTo(t, i);
            }
            r = (e = e.rotate(-this.getRotation())).getTopLeft().times(o).minus(s.getTopLeft().times(r)).divide(o - r);
            return this.zoomTo(o, r, i);
        },
        fitBounds: function(e, t) {
            return this._fitBounds(e, {
                immediately: t,
                constraints: !1
            });
        },
        fitBoundsWithConstraints: function(e, t) {
            return this._fitBounds(e, {
                immediately: t,
                constraints: !0
            });
        },
        fitVertically: function(e) {
            var t = new a.Rect(this._contentBounds.x + this._contentBounds.width / 2, this._contentBounds.y, 0, this._contentBounds.height);
            return this.fitBounds(t, e);
        },
        fitHorizontally: function(e) {
            var t = new a.Rect(this._contentBounds.x, this._contentBounds.y + this._contentBounds.height / 2, this._contentBounds.width, 0);
            return this.fitBounds(t, e);
        },
        getConstrainedBounds: function(e) {
            e = this.getBounds(e);
            return this._applyBoundaryConstraints(e);
        },
        panBy: function(e, t) {
            var i = new a.Point(this.centerSpringX.target.value, this.centerSpringY.target.value);
            return this.panTo(i.plus(e), t);
        },
        panTo: function(e, t) {
            if (t) {
                this.centerSpringX.resetTo(e.x);
                this.centerSpringY.resetTo(e.y);
            } else {
                this.centerSpringX.springTo(e.x);
                this.centerSpringY.springTo(e.y);
            }
            this.viewer && this.viewer.raiseEvent("pan", {
                center: e,
                immediately: t
            });
            return this;
        },
        zoomBy: function(e, t, i) {
            return this.zoomTo(this.zoomSpring.target.value * e, t, i);
        },
        zoomTo: function(e, t, i) {
            var n = this;
            this.zoomPoint = t instanceof a.Point && !isNaN(t.x) && !isNaN(t.y) ? t : null;
            i ? this._adjustCenterSpringsForZoomPoint(function() {
                n.zoomSpring.resetTo(e);
            }) : this.zoomSpring.springTo(e);
            this.viewer && this.viewer.raiseEvent("zoom", {
                zoom: e,
                refPoint: t,
                immediately: i
            });
            return this;
        },
        setRotation: function(e) {
            if (!this.viewer || !this.viewer.drawer.canRotate()) return this;
            this.degrees = a.positiveModulo(e, 360);
            this._setContentBounds(this.viewer.world.getHomeBounds(), this.viewer.world.getContentFactor());
            this.viewer.forceRedraw();
            this.viewer.raiseEvent("rotate", {
                degrees: e
            });
            return this;
        },
        getRotation: function() {
            return this.degrees;
        },
        resize: function(e, t) {
            var i, n = this.getBoundsNoRotate(), o = n;
            this.containerSize.x = e.x;
            this.containerSize.y = e.y;
            this._updateContainerInnerSize();
            if (t) {
                i = e.x / this.containerSize.x;
                o.width = n.width * i;
                o.height = o.width / this.getAspectRatio();
            }
            this.viewer && this.viewer.raiseEvent("resize", {
                newContainerSize: e,
                maintain: t
            });
            return this.fitBounds(o, !0);
        },
        _updateContainerInnerSize: function() {
            this._containerInnerSize = new a.Point(Math.max(1, this.containerSize.x - (this._margins.left + this._margins.right)), Math.max(1, this.containerSize.y - (this._margins.top + this._margins.bottom)));
        },
        update: function() {
            var e = this;
            this._adjustCenterSpringsForZoomPoint(function() {
                e.zoomSpring.update();
            });
            this.centerSpringX.update();
            this.centerSpringY.update();
            var t = this.centerSpringX.current.value !== this._oldCenterX || this.centerSpringY.current.value !== this._oldCenterY || this.zoomSpring.current.value !== this._oldZoom;
            this._oldCenterX = this.centerSpringX.current.value;
            this._oldCenterY = this.centerSpringY.current.value;
            this._oldZoom = this.zoomSpring.current.value;
            return t;
        },
        _adjustCenterSpringsForZoomPoint: function(e) {
            if (this.zoomPoint) {
                var t = this.pixelFromPoint(this.zoomPoint, !0);
                e();
                t = this.pixelFromPoint(this.zoomPoint, !0).minus(t);
                t = this.deltaPointsFromPixels(t, !0);
                this.centerSpringX.shiftBy(t.x);
                this.centerSpringY.shiftBy(t.y);
                this.zoomSpring.isAtTargetValue() && (this.zoomPoint = null);
            } else e();
        },
        deltaPixelsFromPointsNoRotate: function(e, t) {
            return e.times(this._containerInnerSize.x * this.getZoom(t));
        },
        deltaPixelsFromPoints: function(e, t) {
            return this.deltaPixelsFromPointsNoRotate(e.rotate(this.getRotation()), t);
        },
        deltaPointsFromPixelsNoRotate: function(e, t) {
            return e.divide(this._containerInnerSize.x * this.getZoom(t));
        },
        deltaPointsFromPixels: function(e, t) {
            return this.deltaPointsFromPixelsNoRotate(e, t).rotate(-this.getRotation());
        },
        pixelFromPointNoRotate: function(e, t) {
            return this._pixelFromPointNoRotate(e, this.getBoundsNoRotate(t));
        },
        pixelFromPoint: function(e, t) {
            return this._pixelFromPoint(e, this.getBoundsNoRotate(t));
        },
        _pixelFromPointNoRotate: function(e, t) {
            return e.minus(t.getTopLeft()).times(this._containerInnerSize.x / t.width).plus(new a.Point(this._margins.left, this._margins.top));
        },
        _pixelFromPoint: function(e, t) {
            return this._pixelFromPointNoRotate(e.rotate(this.getRotation(), this.getCenter(!0)), t);
        },
        pointFromPixelNoRotate: function(e, t) {
            t = this.getBoundsNoRotate(t);
            return e.minus(new a.Point(this._margins.left, this._margins.top)).divide(this._containerInnerSize.x / t.width).plus(t.getTopLeft());
        },
        pointFromPixel: function(e, t) {
            return this.pointFromPixelNoRotate(e, t).rotate(-this.getRotation(), this.getCenter(!0));
        },
        _viewportToImageDelta: function(e, t) {
            var i = this._contentBoundsNoRotate.width;
            return new a.Point(e * this._contentSizeNoRotate.x / i, t * this._contentSizeNoRotate.x / i);
        },
        viewportToImageCoordinates: function(e, t) {
            if (e instanceof a.Point) return this.viewportToImageCoordinates(e.x, e.y);
            if (this.viewer) {
                var i = this.viewer.world.getItemCount();
                if (1 < i) this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageCoordinates] is not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.");
                else if (1 === i) return this.viewer.world.getItemAt(0).viewportToImageCoordinates(e, t, !0);
            }
            return this._viewportToImageDelta(e - this._contentBoundsNoRotate.x, t - this._contentBoundsNoRotate.y);
        },
        _imageToViewportDelta: function(e, t) {
            var i = this._contentBoundsNoRotate.width;
            return new a.Point(e / this._contentSizeNoRotate.x * i, t / this._contentSizeNoRotate.x * i);
        },
        imageToViewportCoordinates: function(e, t) {
            if (e instanceof a.Point) return this.imageToViewportCoordinates(e.x, e.y);
            if (this.viewer) {
                var i = this.viewer.world.getItemCount();
                if (1 < i) this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportCoordinates] is not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.");
                else if (1 === i) return this.viewer.world.getItemAt(0).imageToViewportCoordinates(e, t, !0);
            }
            t = this._imageToViewportDelta(e, t);
            t.x += this._contentBoundsNoRotate.x;
            t.y += this._contentBoundsNoRotate.y;
            return t;
        },
        imageToViewportRectangle: function(e, t, i, n) {
            var o = e;
            o instanceof a.Rect || (o = new a.Rect(e, t, i, n));
            if (this.viewer) {
                var r = this.viewer.world.getItemCount();
                if (1 < r) this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportRectangle] is not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.");
                else if (1 === r) return this.viewer.world.getItemAt(0).imageToViewportRectangle(e, t, i, n, !0);
            }
            i = this.imageToViewportCoordinates(o.x, o.y);
            n = this._imageToViewportDelta(o.width, o.height);
            return new a.Rect(i.x, i.y, n.x, n.y, o.degrees);
        },
        viewportToImageRectangle: function(e, t, i, n) {
            var o = e;
            o instanceof a.Rect || (o = new a.Rect(e, t, i, n));
            if (this.viewer) {
                var r = this.viewer.world.getItemCount();
                if (1 < r) this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageRectangle] is not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.");
                else if (1 === r) return this.viewer.world.getItemAt(0).viewportToImageRectangle(e, t, i, n, !0);
            }
            i = this.viewportToImageCoordinates(o.x, o.y);
            n = this._viewportToImageDelta(o.width, o.height);
            return new a.Rect(i.x, i.y, n.x, n.y, o.degrees);
        },
        viewerElementToImageCoordinates: function(e) {
            e = this.pointFromPixel(e, !0);
            return this.viewportToImageCoordinates(e);
        },
        imageToViewerElementCoordinates: function(e) {
            e = this.imageToViewportCoordinates(e);
            return this.pixelFromPoint(e, !0);
        },
        windowToImageCoordinates: function(e) {
            a.console.assert(this.viewer, "[Viewport.windowToImageCoordinates] the viewport must have a viewer.");
            e = e.minus(a.getElementPosition(this.viewer.element));
            return this.viewerElementToImageCoordinates(e);
        },
        imageToWindowCoordinates: function(e) {
            a.console.assert(this.viewer, "[Viewport.imageToWindowCoordinates] the viewport must have a viewer.");
            return this.imageToViewerElementCoordinates(e).plus(a.getElementPosition(this.viewer.element));
        },
        viewerElementToViewportCoordinates: function(e) {
            return this.pointFromPixel(e, !0);
        },
        viewportToViewerElementCoordinates: function(e) {
            return this.pixelFromPoint(e, !0);
        },
        viewerElementToViewportRectangle: function(e) {
            return a.Rect.fromSummits(this.pointFromPixel(e.getTopLeft(), !0), this.pointFromPixel(e.getTopRight(), !0), this.pointFromPixel(e.getBottomLeft(), !0));
        },
        viewportToViewerElementRectangle: function(e) {
            return a.Rect.fromSummits(this.pixelFromPoint(e.getTopLeft(), !0), this.pixelFromPoint(e.getTopRight(), !0), this.pixelFromPoint(e.getBottomLeft(), !0));
        },
        windowToViewportCoordinates: function(e) {
            a.console.assert(this.viewer, "[Viewport.windowToViewportCoordinates] the viewport must have a viewer.");
            e = e.minus(a.getElementPosition(this.viewer.element));
            return this.viewerElementToViewportCoordinates(e);
        },
        viewportToWindowCoordinates: function(e) {
            a.console.assert(this.viewer, "[Viewport.viewportToWindowCoordinates] the viewport must have a viewer.");
            return this.viewportToViewerElementCoordinates(e).plus(a.getElementPosition(this.viewer.element));
        },
        viewportToImageZoom: function(e) {
            if (this.viewer) {
                var t = this.viewer.world.getItemCount();
                if (1 < t) this.silenceMultiImageWarnings || a.console.error("[Viewport.viewportToImageZoom] is not accurate with multi-image.");
                else if (1 === t) return this.viewer.world.getItemAt(0).viewportToImageZoom(e);
            }
            t = this._contentSizeNoRotate.x;
            return e * (this._containerInnerSize.x / t * this._contentBoundsNoRotate.width);
        },
        imageToViewportZoom: function(e) {
            if (this.viewer) {
                var t = this.viewer.world.getItemCount();
                if (1 < t) this.silenceMultiImageWarnings || a.console.error("[Viewport.imageToViewportZoom] is not accurate with multi-image.");
                else if (1 === t) return this.viewer.world.getItemAt(0).imageToViewportZoom(e);
            }
            return e * (this._contentSizeNoRotate.x / this._containerInnerSize.x / this._contentBoundsNoRotate.width);
        },
        toggleFlip: function() {
            this.setFlip(!this.getFlip());
            return this;
        },
        getFlip: function() {
            return this.flipped;
        },
        setFlip: function(e) {
            if (this.flipped === e) return this;
            this.flipped = e;
            this.viewer.navigator && this.viewer.navigator.setFlip(this.getFlip());
            this.viewer.forceRedraw();
            this.viewer.raiseEvent("flip", {
                flipped: e
            });
            return this;
        }
    };
}(OpenSeadragon);
!function(y) {
    y.TiledImage = function(e) {
        var t = this;
        y.console.assert(e.tileCache, "[TiledImage] options.tileCache is required");
        y.console.assert(e.drawer, "[TiledImage] options.drawer is required");
        y.console.assert(e.viewer, "[TiledImage] options.viewer is required");
        y.console.assert(e.imageLoader, "[TiledImage] options.imageLoader is required");
        y.console.assert(e.source, "[TiledImage] options.source is required");
        y.console.assert(!e.clip || e.clip instanceof y.Rect, "[TiledImage] options.clip must be an OpenSeadragon.Rect if present");
        y.EventSource.call(this);
        this._tileCache = e.tileCache;
        delete e.tileCache;
        this._drawer = e.drawer;
        delete e.drawer;
        this._imageLoader = e.imageLoader;
        delete e.imageLoader;
        e.clip instanceof y.Rect && (this._clip = e.clip.clone());
        delete e.clip;
        var i = e.x || 0;
        delete e.x;
        var n = e.y || 0;
        delete e.y;
        this.normHeight = e.source.dimensions.y / e.source.dimensions.x;
        this.contentAspectX = e.source.dimensions.x / e.source.dimensions.y;
        var o = 1;
        if (e.width) {
            o = e.width;
            delete e.width;
            if (e.height) {
                y.console.error("specifying both width and height to a tiledImage is not supported");
                delete e.height;
            }
        } else if (e.height) {
            o = e.height / this.normHeight;
            delete e.height;
        }
        var r = e.fitBounds;
        delete e.fitBounds;
        var s = e.fitBoundsPlacement || OpenSeadragon.Placement.CENTER;
        delete e.fitBoundsPlacement;
        var a = e.degrees || 0;
        delete e.degrees;
        y.extend(!0, this, {
            viewer: null,
            tilesMatrix: {},
            coverage: {},
            loadingCoverage: {},
            lastDrawn: [],
            lastResetTime: 0,
            _midDraw: !1,
            _needsDraw: !0,
            _hasOpaqueTile: !1,
            _tilesLoading: 0,
            springStiffness: y.DEFAULT_SETTINGS.springStiffness,
            animationTime: y.DEFAULT_SETTINGS.animationTime,
            minZoomImageRatio: y.DEFAULT_SETTINGS.minZoomImageRatio,
            wrapHorizontal: y.DEFAULT_SETTINGS.wrapHorizontal,
            wrapVertical: y.DEFAULT_SETTINGS.wrapVertical,
            immediateRender: y.DEFAULT_SETTINGS.immediateRender,
            blendTime: y.DEFAULT_SETTINGS.blendTime,
            alwaysBlend: y.DEFAULT_SETTINGS.alwaysBlend,
            minPixelRatio: y.DEFAULT_SETTINGS.minPixelRatio,
            smoothTileEdgesMinZoom: y.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,
            iOSDevice: y.DEFAULT_SETTINGS.iOSDevice,
            debugMode: y.DEFAULT_SETTINGS.debugMode,
            crossOriginPolicy: y.DEFAULT_SETTINGS.crossOriginPolicy,
            ajaxWithCredentials: y.DEFAULT_SETTINGS.ajaxWithCredentials,
            placeholderFillStyle: y.DEFAULT_SETTINGS.placeholderFillStyle,
            opacity: y.DEFAULT_SETTINGS.opacity,
            preload: y.DEFAULT_SETTINGS.preload,
            compositeOperation: y.DEFAULT_SETTINGS.compositeOperation,
            subPixelRoundingForTransparency: y.DEFAULT_SETTINGS.subPixelRoundingForTransparency
        }, e);
        this._preload = this.preload;
        delete this.preload;
        this._fullyLoaded = !1;
        this._xSpring = new y.Spring({
            initial: i,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this._ySpring = new y.Spring({
            initial: n,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this._scaleSpring = new y.Spring({
            initial: o,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this._degreesSpring = new y.Spring({
            initial: a,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this._updateForScale();
        r && this.fitBounds(r, s, !0);
        this._drawingHandler = function(e) {
            t.viewer.raiseEvent("tile-drawing", y.extend({
                tiledImage: t
            }, e));
        };
    };
    y.extend(y.TiledImage.prototype, y.EventSource.prototype, {
        needsDraw: function() {
            return this._needsDraw;
        },
        getFullyLoaded: function() {
            return this._fullyLoaded;
        },
        _setFullyLoaded: function(e) {
            if (e !== this._fullyLoaded) {
                this._fullyLoaded = e;
                this.raiseEvent("fully-loaded-change", {
                    fullyLoaded: this._fullyLoaded
                });
            }
        },
        reset: function() {
            this._tileCache.clearTilesFor(this);
            this.lastResetTime = y.now();
            this._needsDraw = !0;
        },
        update: function() {
            var e = this._xSpring.update();
            var t = this._ySpring.update();
            var i = this._scaleSpring.update();
            var n = this._degreesSpring.update();
            if (e || t || i || n) {
                this._updateForScale();
                return this._needsDraw = !0;
            }
            return !1;
        },
        draw: function() {
            if (0 !== this.opacity || this._preload) {
                this._midDraw = !0;
                this._updateViewport();
                this._midDraw = !1;
            } else this._needsDraw = !1;
        },
        destroy: function() {
            this.reset();
            this.source.destroy && this.source.destroy();
        },
        getBounds: function(e) {
            return this.getBoundsNoRotate(e).rotate(this.getRotation(e), this._getRotationPoint(e));
        },
        getBoundsNoRotate: function(e) {
            return e ? new y.Rect(this._xSpring.current.value, this._ySpring.current.value, this._worldWidthCurrent, this._worldHeightCurrent) : new y.Rect(this._xSpring.target.value, this._ySpring.target.value, this._worldWidthTarget, this._worldHeightTarget);
        },
        getWorldBounds: function() {
            y.console.error("[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead");
            return this.getBounds();
        },
        getClippedBounds: function(e) {
            var t = this.getBoundsNoRotate(e);
            if (this._clip) {
                var i = (e ? this._worldWidthCurrent : this._worldWidthTarget) / this.source.dimensions.x;
                i = this._clip.times(i);
                t = new y.Rect(t.x + i.x, t.y + i.y, i.width, i.height);
            }
            return t.rotate(this.getRotation(e), this._getRotationPoint(e));
        },
        getTileBounds: function(e, t, i) {
            var n = this.source.getNumTiles(e);
            var o = (n.x + t % n.x) % n.x;
            var r = (n.y + i % n.y) % n.y;
            e = this.source.getTileBounds(e, o, r);
            this.getFlip() && (e.x = 1 - e.x - e.width);
            e.x += (t - o) / n.x;
            e.y += this._worldHeightCurrent / this._worldWidthCurrent * ((i - r) / n.y);
            return e;
        },
        getContentSize: function() {
            return new y.Point(this.source.dimensions.x, this.source.dimensions.y);
        },
        getSizeInWindowCoordinates: function() {
            var e = this.imageToWindowCoordinates(new y.Point(0, 0));
            var t = this.imageToWindowCoordinates(this.getContentSize());
            return new y.Point(t.x - e.x, t.y - e.y);
        },
        _viewportToImageDelta: function(e, t, i) {
            i = (i ? this._scaleSpring.current : this._scaleSpring.target).value;
            return new y.Point(e * (this.source.dimensions.x / i), t * (this.source.dimensions.y * this.contentAspectX / i));
        },
        viewportToImageCoordinates: function(e, t, i) {
            var n;
            if (e instanceof y.Point) {
                i = t;
                n = e;
            } else n = new y.Point(e, t);
            n = n.rotate(-this.getRotation(i), this._getRotationPoint(i));
            return i ? this._viewportToImageDelta(n.x - this._xSpring.current.value, n.y - this._ySpring.current.value) : this._viewportToImageDelta(n.x - this._xSpring.target.value, n.y - this._ySpring.target.value);
        },
        _imageToViewportDelta: function(e, t, i) {
            i = (i ? this._scaleSpring.current : this._scaleSpring.target).value;
            return new y.Point(e / this.source.dimensions.x * i, t / this.source.dimensions.y / this.contentAspectX * i);
        },
        imageToViewportCoordinates: function(e, t, i) {
            if (e instanceof y.Point) {
                i = t;
                t = e.y;
                e = e.x;
            }
            t = this._imageToViewportDelta(e, t);
            if (i) {
                t.x += this._xSpring.current.value;
                t.y += this._ySpring.current.value;
            } else {
                t.x += this._xSpring.target.value;
                t.y += this._ySpring.target.value;
            }
            return t.rotate(this.getRotation(i), this._getRotationPoint(i));
        },
        imageToViewportRectangle: function(e, t, i, n, o) {
            var r = e;
            r instanceof y.Rect ? o = t : r = new y.Rect(e, t, i, n);
            i = this.imageToViewportCoordinates(r.getTopLeft(), o);
            n = this._imageToViewportDelta(r.width, r.height, o);
            return new y.Rect(i.x, i.y, n.x, n.y, r.degrees + this.getRotation(o));
        },
        viewportToImageRectangle: function(e, t, i, n, o) {
            var r = e;
            e instanceof y.Rect ? o = t : r = new y.Rect(e, t, i, n);
            i = this.viewportToImageCoordinates(r.getTopLeft(), o);
            n = this._viewportToImageDelta(r.width, r.height, o);
            return new y.Rect(i.x, i.y, n.x, n.y, r.degrees - this.getRotation(o));
        },
        viewerElementToImageCoordinates: function(e) {
            e = this.viewport.pointFromPixel(e, !0);
            return this.viewportToImageCoordinates(e);
        },
        imageToViewerElementCoordinates: function(e) {
            e = this.imageToViewportCoordinates(e);
            return this.viewport.pixelFromPoint(e, !0);
        },
        windowToImageCoordinates: function(e) {
            e = e.minus(OpenSeadragon.getElementPosition(this.viewer.element));
            return this.viewerElementToImageCoordinates(e);
        },
        imageToWindowCoordinates: function(e) {
            return this.imageToViewerElementCoordinates(e).plus(OpenSeadragon.getElementPosition(this.viewer.element));
        },
        _viewportToTiledImageRectangle: function(e) {
            var t = this._scaleSpring.current.value;
            e = e.rotate(-this.getRotation(!0), this._getRotationPoint(!0));
            return new y.Rect((e.x - this._xSpring.current.value) / t, (e.y - this._ySpring.current.value) / t, e.width / t, e.height / t, e.degrees);
        },
        viewportToImageZoom: function(e) {
            return this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x * e;
        },
        imageToViewportZoom: function(e) {
            return e / (this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x);
        },
        setPosition: function(e, t) {
            var i = this._xSpring.target.value === e.x && this._ySpring.target.value === e.y;
            if (t) {
                if (i && this._xSpring.current.value === e.x && this._ySpring.current.value === e.y) return;
                this._xSpring.resetTo(e.x);
                this._ySpring.resetTo(e.y);
                this._needsDraw = !0;
            } else {
                if (i) return;
                this._xSpring.springTo(e.x);
                this._ySpring.springTo(e.y);
                this._needsDraw = !0;
            }
            i || this._raiseBoundsChange();
        },
        setWidth: function(e, t) {
            this._setScale(e, t);
        },
        setHeight: function(e, t) {
            this._setScale(e / this.normHeight, t);
        },
        setCroppingPolygons: function(e) {
            var t = function(e) {
                return e instanceof y.Point || "number" == typeof e.x && "number" == typeof e.y;
            };
            try {
                if (!y.isArray(e)) throw new Error("Provided cropping polygon is not an array");
                this._croppingPolygons = e.map(function(e) {
                    return e.map(function(e) {
                        try {
                            if (t(e)) return {
                                x: e.x,
                                y: e.y
                            };
                            throw new Error;
                        } catch (e1) {
                            throw new Error("A Provided cropping polygon point is not supported");
                        }
                    });
                });
            } catch (e1) {
                y.console.error("[TiledImage.setCroppingPolygons] Cropping polygon format not supported");
                y.console.error(e1);
                this._croppingPolygons = null;
            }
        },
        resetCroppingPolygons: function() {
            this._croppingPolygons = null;
        },
        fitBounds: function(e, t, i) {
            t = t || y.Placement.CENTER;
            var n = y.Placement.properties[t];
            var o = this.contentAspectX;
            var r = 0;
            var s = 0;
            var a = 1;
            t = 1;
            if (this._clip) {
                o = this._clip.getAspectRatio();
                a = this._clip.width / this.source.dimensions.x;
                t = this._clip.height / this.source.dimensions.y;
                if (e.getAspectRatio() > o) {
                    r = this._clip.x / this._clip.height * e.height;
                    s = this._clip.y / this._clip.height * e.height;
                } else {
                    r = this._clip.x / this._clip.width * e.width;
                    s = this._clip.y / this._clip.width * e.width;
                }
            }
            if (e.getAspectRatio() > o) {
                var l = e.height / t;
                t = 0;
                n.isHorizontallyCentered ? t = (e.width - e.height * o) / 2 : n.isRight && (t = e.width - e.height * o);
                this.setPosition(new y.Point(e.x - r + t, e.y - s), i);
                this.setHeight(l, i);
            } else {
                l = e.width / a;
                a = 0;
                n.isVerticallyCentered ? a = (e.height - e.width / o) / 2 : n.isBottom && (a = e.height - e.width / o);
                this.setPosition(new y.Point(e.x - r, e.y - s + a), i);
                this.setWidth(l, i);
            }
        },
        getClip: function() {
            return this._clip ? this._clip.clone() : null;
        },
        setClip: function(e) {
            y.console.assert(!e || e instanceof y.Rect, "[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");
            e instanceof y.Rect ? this._clip = e.clone() : this._clip = null;
            this._needsDraw = !0;
            this.raiseEvent("clip-change");
        },
        getFlip: function() {
            return !!this.flipped;
        },
        setFlip: function(e) {
            this.flipped = !!e;
            this._needsDraw = !0;
            this._raiseBoundsChange();
        },
        getOpacity: function() {
            return this.opacity;
        },
        setOpacity: function(e) {
            if (e !== this.opacity) {
                this.opacity = e;
                this._needsDraw = !0;
                this.raiseEvent("opacity-change", {
                    opacity: this.opacity
                });
            }
        },
        getPreload: function() {
            return this._preload;
        },
        setPreload: function(e) {
            this._preload = !!e;
            this._needsDraw = !0;
        },
        getRotation: function(e) {
            return (e ? this._degreesSpring.current : this._degreesSpring.target).value;
        },
        setRotation: function(e, t) {
            if (this._degreesSpring.target.value !== e || !this._degreesSpring.isAtTargetValue()) {
                t ? this._degreesSpring.resetTo(e) : this._degreesSpring.springTo(e);
                this._needsDraw = !0;
                this._raiseBoundsChange();
            }
        },
        _getRotationPoint: function(e) {
            return this.getBoundsNoRotate(e).getCenter();
        },
        getCompositeOperation: function() {
            return this.compositeOperation;
        },
        setCompositeOperation: function(e) {
            if (e !== this.compositeOperation) {
                this.compositeOperation = e;
                this._needsDraw = !0;
                this.raiseEvent("composite-operation-change", {
                    compositeOperation: this.compositeOperation
                });
            }
        },
        _setScale: function(e, t) {
            var i = this._scaleSpring.target.value === e;
            if (t) {
                if (i && this._scaleSpring.current.value === e) return;
                this._scaleSpring.resetTo(e);
                this._updateForScale();
                this._needsDraw = !0;
            } else {
                if (i) return;
                this._scaleSpring.springTo(e);
                this._updateForScale();
                this._needsDraw = !0;
            }
            i || this._raiseBoundsChange();
        },
        _updateForScale: function() {
            this._worldWidthTarget = this._scaleSpring.target.value;
            this._worldHeightTarget = this.normHeight * this._scaleSpring.target.value;
            this._worldWidthCurrent = this._scaleSpring.current.value;
            this._worldHeightCurrent = this.normHeight * this._scaleSpring.current.value;
        },
        _raiseBoundsChange: function() {
            this.raiseEvent("bounds-change");
        },
        _isBottomItem: function() {
            return this.viewer.world.getItemAt(0) === this;
        },
        _getLevelsInterval: function() {
            var e = Math.max(this.source.minLevel, Math.floor(Math.log(this.minZoomImageRatio) / Math.log(2)));
            var t = this.viewport.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(0), !0).x * this._scaleSpring.current.value;
            t = Math.min(Math.abs(this.source.maxLevel), Math.abs(Math.floor(Math.log(t / this.minPixelRatio) / Math.log(2))));
            t = Math.max(t, this.source.minLevel || 0);
            return {
                lowestLevel: Math.min(e, t),
                highestLevel: t
            };
        },
        _updateViewport: function() {
            this._needsDraw = !1;
            this._tilesLoading = 0;
            this.loadingCoverage = {};
            for(; 0 < this.lastDrawn.length;)this.lastDrawn.pop().beingDrawn = !1;
            var e = this.viewport;
            var t = this._viewportToTiledImageRectangle(e.getBoundsWithMargins(!0));
            if (!this.wrapHorizontal && !this.wrapVertical) {
                var i = this._viewportToTiledImageRectangle(this.getClippedBounds(!0));
                if (null === (t = t.intersection(i))) return;
            }
            i = this._getLevelsInterval();
            var n = i.lowestLevel;
            i = i.highestLevel;
            var o = null;
            var r = !1;
            var s = y.now();
            for(var a = i; n <= a; a--){
                var l = !1;
                var h = e.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(a), !0).x * this._scaleSpring.current.value;
                if (a === n || !r && h >= this.minPixelRatio) r = l = !0;
                else if (!r) continue;
                var c = e.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(a), !1).x * this._scaleSpring.current.value;
                var u = e.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(Math.max(this.source.getClosestLevel(), 0)), !1).x * this._scaleSpring.current.value;
                u = this.immediateRender ? 1 : u;
                h = Math.min(1, (h - .5) / .5);
                c = u / Math.abs(u - c);
                o = this._updateLevel(r, l, a, h, c, t, s, o);
                if (this._providesCoverage(this.coverage, a)) break;
            }
            this._drawTiles(this.lastDrawn);
            if (o && !o.context2D) {
                this._loadTile(o, s);
                this._needsDraw = !0;
                this._setFullyLoaded(!1);
            } else this._setFullyLoaded(0 === this._tilesLoading);
        },
        _getCornerTiles: function(e, t, i) {
            var n;
            var o;
            if (this.wrapHorizontal) {
                n = y.positiveModulo(t.x, 1);
                o = y.positiveModulo(i.x, 1);
            } else {
                n = Math.max(0, t.x);
                o = Math.min(1, i.x);
            }
            var r = 1 / this.source.aspectRatio;
            if (this.wrapVertical) {
                s = y.positiveModulo(t.y, r);
                a = y.positiveModulo(i.y, r);
            } else {
                s = Math.max(0, t.y);
                a = Math.min(r, i.y);
            }
            var s = this.source.getTileAtPoint(e, new y.Point(n, s));
            var a = this.source.getTileAtPoint(e, new y.Point(o, a));
            e = this.source.getNumTiles(e);
            if (this.wrapHorizontal) {
                s.x += e.x * Math.floor(t.x);
                a.x += e.x * Math.floor(i.x);
            }
            if (this.wrapVertical) {
                s.y += e.y * Math.floor(t.y / r);
                a.y += e.y * Math.floor(i.y / r);
            }
            return {
                topLeft: s,
                bottomRight: a
            };
        },
        _updateLevel: function(e, t, i, n, o, r, s, a) {
            var l = r.getBoundingBox().getTopLeft();
            var h = r.getBoundingBox().getBottomRight();
            this.viewer && this.viewer.raiseEvent("update-level", {
                tiledImage: this,
                havedrawn: e,
                level: i,
                opacity: n,
                visibility: o,
                drawArea: r,
                topleft: l,
                bottomright: h,
                currenttime: s,
                best: a
            });
            this._resetCoverage(this.coverage, i);
            this._resetCoverage(this.loadingCoverage, i);
            h = this._getCornerTiles(i, l, h);
            var c = h.topLeft;
            var u = h.bottomRight;
            var d = this.source.getNumTiles(i);
            var p = this.viewport.pixelFromPoint(this.viewport.getCenter());
            if (this.getFlip()) {
                u.x += 1;
                this.wrapHorizontal || (u.x = Math.min(u.x, d.x - 1));
            }
            for(var g = c.x; g <= u.x; g++)for(var m = c.y; m <= u.y; m++){
                if (this.getFlip()) {
                    var v = (d.x + g % d.x) % d.x;
                    v = g + d.x - v - v - 1;
                } else v = g;
                null !== r.intersection(this.getTileBounds(i, v, m)) && (a = this._updateTile(t, e, v, m, i, n, o, p, d, s, a));
            }
            return a;
        },
        _updateTile: function(e, t, i, n, o, r, s, a, l, h, c) {
            var u = this._getTile(i, n, o, h, l, this._worldWidthCurrent, this._worldHeightCurrent), l = t;
            this.viewer && this.viewer.raiseEvent("update-tile", {
                tiledImage: this,
                tile: u
            });
            this._setCoverage(this.coverage, o, i, n, !1);
            t = u.loaded || u.loading || this._isCovered(this.loadingCoverage, o, i, n);
            this._setCoverage(this.loadingCoverage, o, i, n, t);
            if (!u.exists) return c;
            e && !l && (this._isCovered(this.coverage, o, i, n) ? this._setCoverage(this.coverage, o, i, n, !0) : l = !0);
            if (!l) return c;
            this._positionTile(u, this.source.tileOverlap, this.viewport, a, s);
            if (!u.loaded) {
                if (u.context2D) this._setTileLoaded(u);
                else {
                    s = this._tileCache.getImageRecord(u.cacheKey);
                    if (s) {
                        s = s.getImage();
                        this._setTileLoaded(u, s);
                    }
                }
            }
            u.loaded ? this._blendTile(u, i, n, o, r, h) && (this._needsDraw = !0) : u.loading ? this._tilesLoading++ : t || (c = this._compareTiles(c, u));
            return c;
        },
        _getTile: function(e, t, i, n, o, r, s) {
            var a, l, h, c, u, d, p, g, m, v = this.tilesMatrix, f = this.source;
            v[i] || (v[i] = {});
            v[i][e] || (v[i][e] = {});
            if (!v[i][e][t] || !v[i][e][t].flipped != !this.flipped) {
                a = (o.x + e % o.x) % o.x;
                l = (o.y + t % o.y) % o.y;
                h = this.getTileBounds(i, e, t);
                c = f.getTileBounds(i, a, l, !0);
                u = f.tileExists(i, a, l);
                d = f.getTileUrl(i, a, l);
                m = f.getTilePostData(i, a, l);
                if (this.loadTilesWithAjax) {
                    p = f.getTileAjaxHeaders(i, a, l);
                    y.isPlainObject(this.ajaxHeaders) && (p = y.extend({}, this.ajaxHeaders, p));
                } else p = null;
                g = f.getContext2D ? f.getContext2D(i, a, l) : void 0;
                m = new y.Tile(i, e, t, h, u, d, g, this.loadTilesWithAjax, p, c, m, f.getTileHashKey(i, a, l, d, p, m));
                this.getFlip() ? 0 == a && (m.isRightMost = !0) : a == o.x - 1 && (m.isRightMost = !0);
                l == o.y - 1 && (m.isBottomMost = !0);
                m.flipped = this.flipped;
                v[i][e][t] = m;
            }
            (m = v[i][e][t]).lastTouchTime = n;
            return m;
        },
        _loadTile: function(n, o) {
            var r = this;
            n.loading = !0;
            this._imageLoader.addJob({
                src: n.url,
                postData: n.postData,
                loadWithAjax: n.loadWithAjax,
                ajaxHeaders: n.ajaxHeaders,
                crossOriginPolicy: this.crossOriginPolicy,
                ajaxWithCredentials: this.ajaxWithCredentials,
                callback: function(e, t, i) {
                    r._onTileLoad(n, o, e, t, i);
                },
                abort: function() {
                    n.loading = !1;
                }
            });
        },
        _onTileLoad: function(t, e, i, n, o) {
            if (i) {
                if (e < this.lastResetTime) {
                    y.console.warn("Ignoring tile %s loaded before reset: %s", t, t.url);
                    t.loading = !1;
                } else {
                    function r() {
                        var e = s.source.getClosestLevel();
                        s._setTileLoaded(t, i, e, o);
                    }
                    var s = this;
                    this._midDraw ? window.setTimeout(r, 1) : r();
                }
            } else {
                y.console.error("Tile %s failed to load: %s - error: %s", t, t.url, n);
                this.viewer.raiseEvent("tile-load-failed", {
                    tile: t,
                    tiledImage: this,
                    time: e,
                    message: n,
                    tileRequest: o
                });
                t.loading = !1;
                t.exists = !1;
            }
        },
        _setTileLoaded: function(e, t, i, n) {
            var o = 0, r = this;
            function s() {
                o++;
                return a;
            }
            function a() {
                if (0 === --o) {
                    e.loading = !1;
                    e.loaded = !0;
                    e.context2D || r._tileCache.cacheTile({
                        image: t,
                        tile: e,
                        cutoff: i,
                        tiledImage: r
                    });
                    r._needsDraw = !0;
                }
            }
            this.viewer.raiseEvent("tile-loaded", {
                tile: e,
                tiledImage: this,
                tileRequest: n,
                image: t,
                getCompletionCallback: s
            });
            s()();
        },
        _positionTile: function(e, t, i, n, o) {
            var r = e.bounds.getTopLeft();
            r.x *= this._scaleSpring.current.value;
            r.y *= this._scaleSpring.current.value;
            r.x += this._xSpring.current.value;
            r.y += this._ySpring.current.value;
            var s = e.bounds.getSize();
            s.x *= this._scaleSpring.current.value;
            s.y *= this._scaleSpring.current.value;
            var a = i.pixelFromPointNoRotate(r, !0), l = i.pixelFromPointNoRotate(r, !1), r = i.deltaPixelsFromPointsNoRotate(s, !0), s = i.deltaPixelsFromPointsNoRotate(s, !1), s = l.plus(s.divide(2)), s = n.squaredDistanceTo(s);
            t || (r = r.plus(new y.Point(1, 1)));
            e.isRightMost && this.wrapHorizontal && (r.x += .75);
            e.isBottomMost && this.wrapVertical && (r.y += .75);
            e.position = a;
            e.size = r;
            e.squaredDistance = s;
            e.visibility = o;
        },
        _blendTile: function(e, t, i, n, o, r) {
            var s, a = 1e3 * this.blendTime;
            e.blendStart || (e.blendStart = r);
            s = r - e.blendStart;
            r = a ? Math.min(1, s / a) : 1;
            this.alwaysBlend && (r *= o);
            e.opacity = r;
            this.lastDrawn.push(e);
            if (1 === r) {
                this._setCoverage(this.coverage, n, t, i, !0);
                this._hasOpaqueTile = !0;
            } else if (s < a) return !0;
            return !1;
        },
        _compareTiles: function(e, t) {
            return !e || t.visibility > e.visibility || t.visibility === e.visibility && t.squaredDistance < e.squaredDistance ? t : e;
        },
        _drawTiles: function(e) {
            if (0 !== this.opacity && (0 !== e.length || this.placeholderFillStyle)) {
                var t = e[0];
                var i;
                t && (i = this.opacity < 1 || this.compositeOperation && "source-over" !== this.compositeOperation || !this._isBottomItem() && t._hasTransparencyChannel());
                var n;
                var o;
                var r = this.viewport.getZoom(!0);
                var s = this.viewportToImageZoom(r);
                if (1 < e.length && s > this.smoothTileEdgesMinZoom && !this.iOSDevice && this.getRotation(!0) % 360 == 0 && y.supportsCanvas && this.viewer.useCanvas) {
                    i = !0;
                    n = t.getScaleForEdgeSmoothing();
                    o = t.getTranslationForEdgeSmoothing(n, this._drawer.getCanvasSize(!1), this._drawer.getCanvasSize(!0));
                }
                var a;
                if (i) {
                    if (!n) {
                        a = this.viewport.viewportToViewerElementRectangle(this.getClippedBounds(!0)).getIntegerBoundingBox();
                        this._drawer.viewer.viewport.getFlip() && (0 === this.viewport.degrees && this.getRotation(!0) % 360 == 0 || (a.x = this._drawer.viewer.container.clientWidth - (a.x + a.width)));
                        a = a.times(y.pixelDensityRatio);
                    }
                    this._drawer._clear(!0, a);
                }
                if (!n) {
                    0 !== this.viewport.degrees && this._drawer._offsetForRotation({
                        degrees: this.viewport.degrees,
                        useSketch: i
                    });
                    this.getRotation(!0) % 360 != 0 && this._drawer._offsetForRotation({
                        degrees: this.getRotation(!0),
                        point: this.viewport.pixelFromPointNoRotate(this._getRotationPoint(!0), !0),
                        useSketch: i
                    });
                    0 === this.viewport.degrees && this.getRotation(!0) % 360 == 0 && this._drawer.viewer.viewport.getFlip() && this._drawer._flip();
                }
                r = !1;
                if (this._clip) {
                    this._drawer.saveContext(i);
                    s = this.imageToViewportRectangle(this._clip, !0);
                    s = s.rotate(-this.getRotation(!0), this._getRotationPoint(!0));
                    s = this._drawer.viewportToDrawerRectangle(s);
                    n && (s = s.times(n));
                    o && (s = s.translate(o));
                    this._drawer.setClip(s, i);
                    r = !0;
                }
                if (this._croppingPolygons) {
                    this._drawer.saveContext(i);
                    try {
                        var l = this._croppingPolygons.map(function(e) {
                            return e.map(function(e) {
                                e = this.imageToViewportCoordinates(e.x, e.y, !0).rotate(-this.getRotation(!0), this._getRotationPoint(!0));
                                e = this._drawer.viewportCoordToDrawerCoord(e);
                                return e = n ? e.times(n) : e;
                            });
                        });
                        this._drawer.clipWithPolygons(l, i);
                    } catch (e1) {
                        y.console.error(e1);
                    }
                    r = !0;
                }
                if (this.placeholderFillStyle && !1 === this._hasOpaqueTile) {
                    l = this._drawer.viewportToDrawerRectangle(this.getBounds(!0));
                    n && (l = l.times(n));
                    o && (l = l.translate(o));
                    var h = null;
                    h = "function" == typeof this.placeholderFillStyle ? this.placeholderFillStyle(this, this._drawer.context) : this.placeholderFillStyle;
                    this._drawer.drawRectangle(l, h, i);
                }
                h = function(e) {
                    if ("number" == typeof e) return g(e);
                    if (!e || !y.Browser) return d;
                    var t = e[y.Browser.vendor];
                    p(t) && (t = e["*"]);
                    return g(t);
                }(this.subPixelRoundingForTransparency);
                var c = !1;
                h === y.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS ? c = !0 : h === y.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST && (c = !(this.viewer && this.viewer.isAnimating()));
                for(var u = e.length - 1; 0 <= u; u--){
                    t = e[u];
                    this._drawer.drawTile(t, this._drawingHandler, i, n, o, c);
                    t.beingDrawn = !0;
                    this.viewer && this.viewer.raiseEvent("tile-drawn", {
                        tiledImage: this,
                        tile: t
                    });
                }
                r && this._drawer.restoreContext(i);
                if (!n) {
                    this.getRotation(!0) % 360 != 0 && this._drawer._restoreRotationChanges(i);
                    0 !== this.viewport.degrees && this._drawer._restoreRotationChanges(i);
                }
                if (i) {
                    if (n) {
                        0 !== this.viewport.degrees && this._drawer._offsetForRotation({
                            degrees: this.viewport.degrees,
                            useSketch: !1
                        });
                        this.getRotation(!0) % 360 != 0 && this._drawer._offsetForRotation({
                            degrees: this.getRotation(!0),
                            point: this.viewport.pixelFromPointNoRotate(this._getRotationPoint(!0), !0),
                            useSketch: !1
                        });
                    }
                    this._drawer.blendSketch({
                        opacity: this.opacity,
                        scale: n,
                        translate: o,
                        compositeOperation: this.compositeOperation,
                        bounds: a
                    });
                    if (n) {
                        this.getRotation(!0) % 360 != 0 && this._drawer._restoreRotationChanges(!1);
                        0 !== this.viewport.degrees && this._drawer._restoreRotationChanges(!1);
                    }
                }
                n || 0 === this.viewport.degrees && this.getRotation(!0) % 360 == 0 && this._drawer.viewer.viewport.getFlip() && this._drawer._flip();
                this._drawDebugInfo(e);
            }
        },
        _drawDebugInfo: function(e) {
            if (this.debugMode) for(var t = e.length - 1; 0 <= t; t--){
                var i = e[t];
                try {
                    this._drawer.drawDebugInfo(i, e.length, t, this);
                } catch (e1) {
                    y.console.error(e1);
                }
            }
        },
        _providesCoverage: function(e, t, i, n) {
            var o, r, s, a;
            if (!e[t]) return !1;
            if (void 0 !== i && void 0 !== n) return void 0 === e[t][i] || void 0 === e[t][i][n] || !0 === e[t][i][n];
            for(s in o = e[t])if (Object.prototype.hasOwnProperty.call(o, s)) {
                for(a in r = o[s])if (Object.prototype.hasOwnProperty.call(r, a) && !r[a]) return !1;
            }
            return !0;
        },
        _isCovered: function(e, t, i, n) {
            return void 0 === i || void 0 === n ? this._providesCoverage(e, t + 1) : this._providesCoverage(e, t + 1, 2 * i, 2 * n) && this._providesCoverage(e, t + 1, 2 * i, 2 * n + 1) && this._providesCoverage(e, t + 1, 2 * i + 1, 2 * n) && this._providesCoverage(e, t + 1, 2 * i + 1, 2 * n + 1);
        },
        _setCoverage: function(e, t, i, n, o) {
            if (e[t]) {
                e[t][i] || (e[t][i] = {});
                e[t][i][n] = o;
            } else y.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s", t);
        },
        _resetCoverage: function(e, t) {
            e[t] = {};
        }
    });
    var d = y.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
    function p(e) {
        return e !== y.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS && e !== y.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST && e !== y.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
    }
    function g(e) {
        return p(e) ? d : e;
    }
}(OpenSeadragon);
!function(g) {
    function m(e) {
        g.console.assert(e, "[TileCache.cacheTile] options is required");
        g.console.assert(e.tile, "[TileCache.cacheTile] options.tile is required");
        g.console.assert(e.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
        this.tile = e.tile;
        this.tiledImage = e.tiledImage;
    }
    function v(e) {
        g.console.assert(e, "[ImageRecord] options is required");
        g.console.assert(e.image, "[ImageRecord] options.image is required");
        this._image = e.image;
        this._tiles = [];
    }
    v.prototype = {
        destroy: function() {
            this._image = null;
            this._renderedContext = null;
            this._tiles = null;
        },
        getImage: function() {
            return this._image;
        },
        getRenderedContext: function() {
            if (!this._renderedContext) {
                var e = document.createElement("canvas");
                e.width = this._image.width;
                e.height = this._image.height;
                this._renderedContext = e.getContext("2d");
                this._renderedContext.drawImage(this._image, 0, 0);
                this._image = null;
            }
            return this._renderedContext;
        },
        setRenderedContext: function(e) {
            g.console.error("ImageRecord.setRenderedContext is deprecated. The rendered context should be created by the ImageRecord itself when calling ImageRecord.getRenderedContext.");
            this._renderedContext = e;
        },
        addTile: function(e) {
            g.console.assert(e, "[ImageRecord.addTile] tile is required");
            this._tiles.push(e);
        },
        removeTile: function(e) {
            for(var t = 0; t < this._tiles.length; t++)if (this._tiles[t] === e) {
                this._tiles.splice(t, 1);
                return;
            }
            g.console.warn("[ImageRecord.removeTile] trying to remove unknown tile", e);
        },
        getTileCount: function() {
            return this._tiles.length;
        }
    };
    g.TileCache = function(e) {
        this._maxImageCacheCount = (e = e || {}).maxImageCacheCount || g.DEFAULT_SETTINGS.maxImageCacheCount;
        this._tilesLoaded = [];
        this._imagesLoaded = [];
        this._imagesLoadedCount = 0;
    };
    g.TileCache.prototype = {
        numTilesLoaded: function() {
            return this._tilesLoaded.length;
        },
        cacheTile: function(e) {
            g.console.assert(e, "[TileCache.cacheTile] options is required");
            g.console.assert(e.tile, "[TileCache.cacheTile] options.tile is required");
            g.console.assert(e.tile.cacheKey, "[TileCache.cacheTile] options.tile.cacheKey is required");
            g.console.assert(e.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
            var t = e.cutoff || 0;
            var i = this._tilesLoaded.length;
            var n = this._imagesLoaded[e.tile.cacheKey];
            if (!n) {
                g.console.assert(e.image, "[TileCache.cacheTile] options.image is required to create an ImageRecord");
                n = this._imagesLoaded[e.tile.cacheKey] = new v({
                    image: e.image
                });
                this._imagesLoadedCount++;
            }
            n.addTile(e.tile);
            e.tile.cacheImageRecord = n;
            if (this._imagesLoadedCount > this._maxImageCacheCount) {
                var o = null;
                var r = -1;
                var s = null;
                var a, l, h, c, u, d;
                for(var p = this._tilesLoaded.length - 1; 0 <= p; p--)if (!((a = (d = this._tilesLoaded[p]).tile).level <= t || a.beingDrawn)) {
                    if (o) {
                        c = a.lastTouchTime;
                        l = o.lastTouchTime;
                        u = a.level;
                        h = o.level;
                        if (c < l || c === l && h < u) {
                            o = a;
                            r = p;
                            s = d;
                        }
                    } else {
                        o = a;
                        r = p;
                        s = d;
                    }
                }
                if (o && 0 <= r) {
                    this._unloadTile(s);
                    i = r;
                }
            }
            this._tilesLoaded[i] = new m({
                tile: e.tile,
                tiledImage: e.tiledImage
            });
        },
        clearTilesFor: function(e) {
            g.console.assert(e, "[TileCache.clearTilesFor] tiledImage is required");
            var t;
            for(var i = 0; i < this._tilesLoaded.length; ++i)if ((t = this._tilesLoaded[i]).tiledImage === e) {
                this._unloadTile(t);
                this._tilesLoaded.splice(i, 1);
                i--;
            }
        },
        getImageRecord: function(e) {
            g.console.assert(e, "[TileCache.getImageRecord] cacheKey is required");
            return this._imagesLoaded[e];
        },
        _unloadTile: function(e) {
            g.console.assert(e, "[TileCache._unloadTile] tileRecord is required");
            var t = e.tile;
            var i = e.tiledImage;
            t.unload();
            t.cacheImageRecord = null;
            e = this._imagesLoaded[t.cacheKey];
            e.removeTile(t);
            if (!e.getTileCount()) {
                e.destroy();
                delete this._imagesLoaded[t.cacheKey];
                this._imagesLoadedCount--;
            }
            i.viewer.raiseEvent("tile-unloaded", {
                tile: t,
                tiledImage: i
            });
        }
    };
}(OpenSeadragon);
!function(g) {
    g.World = function(e) {
        var t = this;
        g.console.assert(e.viewer, "[World] options.viewer is required");
        g.EventSource.call(this);
        this.viewer = e.viewer;
        this._items = [];
        this._needsDraw = !1;
        this._autoRefigureSizes = !0;
        this._needsSizesFigured = !1;
        this._delegatedFigureSizes = function(e) {
            t._autoRefigureSizes ? t._figureSizes() : t._needsSizesFigured = !0;
        };
        this._figureSizes();
    };
    g.extend(g.World.prototype, g.EventSource.prototype, {
        addItem: function(e, t) {
            g.console.assert(e, "[World.addItem] item is required");
            g.console.assert(e instanceof g.TiledImage, "[World.addItem] only TiledImages supported at this time");
            if (void 0 !== (t = t || {}).index) {
                t = Math.max(0, Math.min(this._items.length, t.index));
                this._items.splice(t, 0, e);
            } else this._items.push(e);
            this._autoRefigureSizes ? this._figureSizes() : this._needsSizesFigured = !0;
            this._needsDraw = !0;
            e.addHandler("bounds-change", this._delegatedFigureSizes);
            e.addHandler("clip-change", this._delegatedFigureSizes);
            this.raiseEvent("add-item", {
                item: e
            });
        },
        getItemAt: function(e) {
            g.console.assert(void 0 !== e, "[World.getItemAt] index is required");
            return this._items[e];
        },
        getIndexOfItem: function(e) {
            g.console.assert(e, "[World.getIndexOfItem] item is required");
            return g.indexOf(this._items, e);
        },
        getItemCount: function() {
            return this._items.length;
        },
        setItemIndex: function(e, t) {
            g.console.assert(e, "[World.setItemIndex] item is required");
            g.console.assert(void 0 !== t, "[World.setItemIndex] index is required");
            var i = this.getIndexOfItem(e);
            if (t >= this._items.length) throw new Error("Index bigger than number of layers.");
            if (t !== i && -1 !== i) {
                this._items.splice(i, 1);
                this._items.splice(t, 0, e);
                this._needsDraw = !0;
                this.raiseEvent("item-index-change", {
                    item: e,
                    previousIndex: i,
                    newIndex: t
                });
            }
        },
        removeItem: function(e) {
            g.console.assert(e, "[World.removeItem] item is required");
            var t = g.indexOf(this._items, e);
            if (-1 !== t) {
                e.removeHandler("bounds-change", this._delegatedFigureSizes);
                e.removeHandler("clip-change", this._delegatedFigureSizes);
                e.destroy();
                this._items.splice(t, 1);
                this._figureSizes();
                this._needsDraw = !0;
                this._raiseRemoveItem(e);
            }
        },
        removeAll: function() {
            this.viewer._cancelPendingImages();
            var e;
            var t;
            for(t = 0; t < this._items.length; t++){
                (e = this._items[t]).removeHandler("bounds-change", this._delegatedFigureSizes);
                e.removeHandler("clip-change", this._delegatedFigureSizes);
                e.destroy();
            }
            var i = this._items;
            this._items = [];
            this._figureSizes();
            this._needsDraw = !0;
            for(t = 0; t < i.length; t++){
                e = i[t];
                this._raiseRemoveItem(e);
            }
        },
        resetItems: function() {
            for(var e = 0; e < this._items.length; e++)this._items[e].reset();
        },
        update: function() {
            var e = !1;
            for(var t = 0; t < this._items.length; t++)e = this._items[t].update() || e;
            return e;
        },
        draw: function() {
            for(var e = 0; e < this._items.length; e++)this._items[e].draw();
            this._needsDraw = !1;
        },
        needsDraw: function() {
            for(var e = 0; e < this._items.length; e++)if (this._items[e].needsDraw()) return !0;
            return this._needsDraw;
        },
        getHomeBounds: function() {
            return this._homeBounds.clone();
        },
        getContentFactor: function() {
            return this._contentFactor;
        },
        setAutoRefigureSizes: function(e) {
            if ((this._autoRefigureSizes = e) & this._needsSizesFigured) {
                this._figureSizes();
                this._needsSizesFigured = !1;
            }
        },
        arrange: function(e) {
            var t = (e = e || {}).immediately || !1;
            var i = e.layout || g.DEFAULT_SETTINGS.collectionLayout;
            var n = e.rows || g.DEFAULT_SETTINGS.collectionRows;
            var o = e.columns || g.DEFAULT_SETTINGS.collectionColumns;
            var r = e.tileSize || g.DEFAULT_SETTINGS.collectionTileSize;
            var s = r + (e.tileMargin || g.DEFAULT_SETTINGS.collectionTileMargin);
            var a;
            a = !e.rows && o ? o : Math.ceil(this._items.length / n);
            var l = 0;
            var h = 0;
            var c, u, d;
            this.setAutoRefigureSizes(!1);
            for(var p = 0; p < this._items.length; p++){
                if (p && p % a == 0) {
                    if ("horizontal" === i) {
                        h += s;
                        l = 0;
                    } else {
                        l += s;
                        h = 0;
                    }
                }
                d = (u = (d = (c = this._items[p]).getBounds()).width > d.height ? r : r * (d.width / d.height)) * (d.height / d.width);
                d = new g.Point(l + (r - u) / 2, h + (r - d) / 2);
                c.setPosition(d, t);
                c.setWidth(u, t);
                "horizontal" === i ? l += s : h += s;
            }
            this.setAutoRefigureSizes(!0);
        },
        _figureSizes: function() {
            var e = this._homeBounds ? this._homeBounds.clone() : null;
            var t = this._contentSize ? this._contentSize.clone() : null;
            var i = this._contentFactor || 0;
            if (this._items.length) {
                var n = this._items[0];
                var o = n.getBounds();
                this._contentFactor = n.getContentSize().x / o.width;
                var r = n.getClippedBounds().getBoundingBox();
                var s = r.x;
                var a = r.y;
                var l = r.x + r.width;
                var h = r.y + r.height;
                for(var c = 1; c < this._items.length; c++){
                    o = (n = this._items[c]).getBounds();
                    this._contentFactor = Math.max(this._contentFactor, n.getContentSize().x / o.width);
                    r = n.getClippedBounds().getBoundingBox();
                    s = Math.min(s, r.x);
                    a = Math.min(a, r.y);
                    l = Math.max(l, r.x + r.width);
                    h = Math.max(h, r.y + r.height);
                }
                this._homeBounds = new g.Rect(s, a, l - s, h - a);
                this._contentSize = new g.Point(this._homeBounds.width * this._contentFactor, this._homeBounds.height * this._contentFactor);
            } else {
                this._homeBounds = new g.Rect(0, 0, 1, 1);
                this._contentSize = new g.Point(1, 1);
                this._contentFactor = 1;
            }
            this._contentFactor === i && this._homeBounds.equals(e) && this._contentSize.equals(t) || this.raiseEvent("metrics-change", {});
        },
        _raiseRemoveItem: function(e) {
            this.raiseEvent("remove-item", {
                item: e
            });
        }
    });
}(OpenSeadragon);
var _c;
$RefreshReg$(_c, "OpenSeadragon");

//# sourceMappingURL=index.f3781f06.js.map