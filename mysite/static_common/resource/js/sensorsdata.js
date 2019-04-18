if (typeof JSON !== "object") {
    JSON = {};
}(function() {
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        return n < 10 ? "0" + n : n;
    }

    function this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }
    var gap, indent, meta, rep;

    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\%u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else {
                if (typeof space === "string") {
                    indent = space;
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function(a) {
                    return "\%u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
}());
(function(sd) {
    sd = window[sd];
    var _ = sd._ = {};
    sd.para = sd.para || {};
    sd.para_default = {
        cross_subdomain: true,
        show_log: true
    };
    for (var i in sd.para_default) {
        if (sd.para[i] === void 0) {
            sd.para[i] = sd.para_default[i];
        }
    }
    var detector = {};
    (function() {
        var NA_VERSION = "-1";
        var win = window;
        var external = win.external;
        var userAgent = win.navigator.userAgent || "";
        var appVersion = win.navigator.appVersion || "";
        var vendor = win.navigator.vendor || "";
        var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
        var re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/;
        var re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/;
        var re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/;

        function toString(object) {
            return Object.prototype.toString.call(object);
        }

        function isObject(object) {
            return toString(object) === "[object Object]";
        }

        function isFunction(object) {
            return toString(object) === "[object Function]";
        }

        function each(object, factory) {
            for (var i = 0, l = object.length; i < l; i++) {
                if (factory.call(object, object[i], i) === false) {
                    break;
                }
            }
        }
        var DEVICES = [
            ["nokia", function(ua) {
                if (ua.indexOf("nokia ") !== -1) {
                    return /\bnokia ([0-9]+)?/;
                } else {
                    return /\bnokia([a-z0-9]+)?/;
                }
            }],
            ["samsung", function(ua) {
                if (ua.indexOf("samsung") !== -1) {
                    return /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/;
                } else {
                    return /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/;
                }
            }],
            ["wp", function(ua) {
                return ua.indexOf("windows phone ") !== -1 || ua.indexOf("xblwp") !== -1 || ua.indexOf("zunewp") !== -1 || ua.indexOf("windows ce") !== -1;
            }],
            ["pc", "windows"],
            ["ipad", "ipad"],
            ["ipod", "ipod"],
            ["iphone", /\biphone\b|\biph(\d)/],
            ["mac", "macintosh"],
            ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
            ["hongmi", /\bhm[ \-]?([a-z0-9]+)/],
            ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
            ["meizu", function(ua) {
                return ua.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/;
            }],
            ["nexus", /\bnexus ([0-9s.]+)/],
            ["huawei", function(ua) {
                var re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
                if (ua.indexOf("huawei-huawei") !== -1) {
                    return /\bhuawei\-huawei\-([a-z0-9\-]+)/;
                } else {
                    if (re_mediapad.test(ua)) {
                        return re_mediapad;
                    } else {
                        return /\bhuawei[ _\-]?([a-z0-9]+)/;
                    }
                }
            }],
            ["lenovo", function(ua) {
                if (ua.indexOf("lenovo-lenovo") !== -1) {
                    return /\blenovo\-lenovo[ \-]([a-z0-9]+)/;
                } else {
                    return /\blenovo[ \-]?([a-z0-9]+)/;
                }
            }],
            ["zte", function(ua) {
                if (/\bzte\-[tu]/.test(ua)) {
                    return /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/;
                } else {
                    return /\bzte[ _\-]?([a-su-z0-9\+]+)/;
                }
            }],
            ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
            ["htc", function(ua) {
                if (/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)) {
                    return /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/;
                } else {
                    return /\bhtc[ _\-]?([a-z0-9 ]+)/;
                }
            }],
            ["oppo", /\boppo[_]([a-z0-9]+)/],
            ["konka", /\bkonka[_\-]([a-z0-9]+)/],
            ["sonyericsson", /\bmt([a-z0-9]+)/],
            ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
            ["lg", /\blg[\-]([a-z0-9]+)/],
            ["android", /\bandroid\b|\badr\b/],
            ["blackberry", function(ua) {
                if (ua.indexOf("blackberry") >= 0) {
                    return /\bblackberry\s?(\d+)/;
                }
                return "bb10";
            }],
        ];
        var OS = [
            ["wp", function(ua) {
                if (ua.indexOf("windows phone ") !== -1) {
                    return /\bwindows phone (?:os )?([0-9.]+)/;
                } else {
                    if (ua.indexOf("xblwp") !== -1) {
                        return /\bxblwp([0-9.]+)/;
                    } else {
                        if (ua.indexOf("zunewp") !== -1) {
                            return /\bzunewp([0-9.]+)/;
                        }
                    }
                }
                return "windows phone";
            }],
            ["windows", /\bwindows nt ([0-9.]+)/],
            ["macosx", /\bmac os x ([0-9._]+)/],
            ["ios", function(ua) {
                if (/\bcpu(?: iphone)? os /.test(ua)) {
                    return /\bcpu(?: iphone)? os ([0-9._]+)/;
                } else {
                    if (ua.indexOf("iph os ") !== -1) {
                        return /\biph os ([0-9_]+)/;
                    } else {
                        return /\bios\b/;
                    }
                }
            }],
            ["yunos", /\baliyunos ([0-9.]+)/],
            ["android", function(ua) {
                if (ua.indexOf("android") >= 0) {
                    return /\bandroid[ \/-]?([0-9.x]+)?/;
                } else {
                    if (ua.indexOf("adr") >= 0) {
                        if (ua.indexOf("mqqbrowser") >= 0) {
                            return /\badr[ ]\(linux; u; ([0-9.]+)?/;
                        } else {
                            return /\badr(?:[ ]([0-9.]+))?/;
                        }
                    }
                }
                return "android";
            }],
            ["chromeos", /\bcros i686 ([0-9.]+)/],
            ["linux", "linux"],
            ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
            ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
            ["blackberry", function(ua) {
                var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5);
                return m ? {
                    version: m[1]
                } : "blackberry";
            }],
        ];

        function IEMode(ua) {
            if (!re_msie.test(ua)) {
                return null;
            }
            var m, engineMode, engineVersion, browserMode, browserVersion;
            if (ua.indexOf("trident/") !== -1) {
                m = /\btrident\/([0-9.]+)/.exec(ua);
                if (m && m.length >= 2) {
                    engineVersion = m[1];
                    var v_version = m[1].split(".");
                    v_version[0] = parseInt(v_version[0], 10) + 4;
                    browserVersion = v_version.join(".");
                }
            }
            m = re_msie.exec(ua);
            browserMode = m[1];
            var v_mode = m[1].split(".");
            if (typeof browserVersion === "undefined") {
                browserVersion = browserMode;
            }
            v_mode[0] = parseInt(v_mode[0], 10) - 4;
            engineMode = v_mode.join(".");
            if (typeof engineVersion === "undefined") {
                engineVersion = engineMode;
            }
            return {
                browserVersion: browserVersion,
                browserMode: browserMode,
                engineVersion: engineVersion,
                engineMode: engineMode,
                compatible: engineVersion !== engineMode
            };
        }

        function checkTW360External(key) {
            if (!external) {
                return;
            }
            try {
                var runpath = external.twGetRunPath.toLowerCase();
                var security = external.twGetSecurityID(win);
                var version = external.twGetVersion(security);
                if (runpath && runpath.indexOf(key) === -1) {
                    return false;
                }
                if (version) {
                    return {
                        version: version
                    };
                }
            } catch (ex) {}
        }
        var ENGINE = [
            ["edgehtml", /edge\/([0-9.]+)/],
            ["trident", re_msie],
            ["blink", function() {
                return "chrome" in win && "CSS" in win && /\bapplewebkit[\/]?([0-9.+]+)/;
            }],
            ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
            ["gecko", function(ua) {
                var match;
                if ((match = ua.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/))) {
                    return {
                        version: match[1] + "." + match[2]
                    };
                }
            }],
            ["presto", /\bpresto\/([0-9.]+)/],
            ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
            ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
            ["u2", /\bu2\/([0-9.]+)/],
            ["u3", /\bu3\/([0-9.]+)/],
        ];
        var BROWSER = [
            ["edge", /edge\/([0-9.]+)/],
            ["sogou", function(ua) {
                if (ua.indexOf("sogoumobilebrowser") >= 0) {
                    return /sogoumobilebrowser\/([0-9.]+)/;
                } else {
                    if (ua.indexOf("sogoumse") >= 0) {
                        return true;
                    }
                }
                return / se ([0-9.x]+)/;
            }],
            ["theworld", function() {
                var x = checkTW360External("theworld");
                if (typeof x !== "undefined") {
                    return x;
                }
                return "theworld";
            }],
            ["360", function(ua) {
                var x = checkTW360External("360se");
                if (typeof x !== "undefined") {
                    return x;
                }
                if (ua.indexOf("360 aphone browser") !== -1) {
                    return /\b360 aphone browser \(([^\)]+)\)/;
                }
                return /\b360(?:se|ee|chrome|browser)\b/;
            }],
            ["maxthon", function() {
                try {
                    if (external && (external.mxVersion || external.max_version)) {
                        return {
                            version: external.mxVersion || external.max_version
                        };
                    }
                } catch (ex) {}
                return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/;
            }],
            ["micromessenger", /\bmicromessenger\/([\d.]+)/],
            ["qq", /\bm?qqbrowser\/([0-9.]+)/],
            ["green", "greenbrowser"],
            ["tt", /\btencenttraveler ([0-9.]+)/],
            ["liebao", function(ua) {
                if (ua.indexOf("liebaofast") >= 0) {
                    return /\bliebaofast\/([0-9.]+)/;
                }
                if (ua.indexOf("lbbrowser") === -1) {
                    return false;
                }
                var version;
                try {
                    if (external && external.LiebaoGetVersion) {
                        version = external.LiebaoGetVersion();
                    }
                } catch (ex) {}
                return {
                    version: version || NA_VERSION
                };
            }],
            ["tao", /\btaobrowser\/([0-9.]+)/],
            ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
            ["saayaa", "saayaa"],
            ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
            ["ie", re_msie],
            ["mi", /\bmiuibrowser\/([0-9.]+)/],
            ["opera", function(ua) {
                var re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
                var re_opera_new = /\bopr\/([0-9.]+)/;
                return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
            }],
            ["oupeng", /\boupeng\/([0-9.]+)/],
            ["yandex", /yabrowser\/([0-9.]+)/],
            ["ali-ap", function(ua) {
                if (ua.indexOf("aliapp") > 0) {
                    return /\baliapp\(ap\/([0-9.]+)\)/;
                } else {
                    return /\balipayclient\/([0-9.]+)\b/;
                }
            }],
            ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
            ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
            ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
            ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
            ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
            ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
            ["uc", function(ua) {
                if (ua.indexOf("ucbrowser/") >= 0) {
                    return /\bucbrowser\/([0-9.]+)/;
                } else {
                    if (ua.indexOf("ubrowser/") >= 0) {
                        return /\bubrowser\/([0-9.]+)/;
                    } else {
                        if (/\buc\/[0-9]/.test(ua)) {
                            return /\buc\/([0-9.]+)/;
                        } else {
                            if (ua.indexOf("ucweb") >= 0) {
                                return /\bucweb([0-9.]+)?/;
                            } else {
                                return /\b(?:ucbrowser|uc)\b/;
                            }
                        }
                    }
                }
            }],
            ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
            ["android", function(ua) {
                if (ua.indexOf("android") === -1) {
                    return;
                }
                return /\bversion\/([0-9.]+(?: beta)?)/;
            }],
            ["blackberry", function(ua) {
                var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5);
                return m ? {
                    version: m[1]
                } : "blackberry";
            }],
            ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
            ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
            ["firefox", /\bfirefox\/([0-9.ab]+)/],
            ["nokia", /\bnokiabrowser\/([0-9.]+)/],
        ];

        function detect(name, expression, ua) {
            var expr = isFunction(expression) ? expression.call(null, ua) : expression;
            if (!expr) {
                return null;
            }
            var info = {
                name: name,
                version: NA_VERSION,
                codename: ""
            };
            var t = toString(expr);
            if (expr === true) {
                return info;
            } else {
                if (t === "[object String]") {
                    if (ua.indexOf(expr) !== -1) {
                        return info;
                    }
                } else {
                    if (isObject(expr)) {
                        if (expr.hasOwnProperty("version")) {
                            info.version = expr.version;
                        }
                        return info;
                    } else {
                        if (expr.exec) {
                            var m = expr.exec(ua);
                            if (m) {
                                if (m.length >= 2 && m[1]) {
                                    info.version = m[1].replace(/_/g, ".");
                                } else {
                                    info.version = NA_VERSION;
                                }
                                return info;
                            }
                        }
                    }
                }
            }
        }
        var na = {
            name: "na",
            version: NA_VERSION
        };

        function init(ua, patterns, factory, detector) {
            var detected = na;
            each(patterns, function(pattern) {
                var d = detect(pattern[0], pattern[1], ua);
                if (d) {
                    detected = d;
                    return false;
                }
            });
            factory.call(detector, detected.name, detected.version);
        }
        var parse = function(ua) {
            ua = (ua || "").toLowerCase();
            var d = {};
            init(ua, DEVICES, function(name, version) {
                var v = parseFloat(version);
                d.device = {
                    name: name,
                    version: v,
                    fullVersion: version
                };
                d.device[name] = v;
            }, d);
            init(ua, OS, function(name, version) {
                var v = parseFloat(version);
                d.os = {
                    name: name,
                    version: v,
                    fullVersion: version
                };
                d.os[name] = v;
            }, d);
            var ieCore = IEMode(ua);
            init(ua, ENGINE, function(name, version) {
                var mode = version;
                if (ieCore) {
                    version = ieCore.engineVersion || ieCore.engineMode;
                    mode = ieCore.engineMode;
                }
                var v = parseFloat(version);
                d.engine = {
                    name: name,
                    version: v,
                    fullVersion: version,
                    mode: parseFloat(mode),
                    fullMode: mode,
                    compatible: ieCore ? ieCore.compatible : false
                };
                d.engine[name] = v;
            }, d);
            init(ua, BROWSER, function(name, version) {
                var mode = version;
                if (ieCore) {
                    if (name === "ie") {
                        version = ieCore.browserVersion;
                    }
                    mode = ieCore.browserMode;
                }
                var v = parseFloat(version);
                d.browser = {
                    name: name,
                    version: v,
                    fullVersion: version,
                    mode: parseFloat(mode),
                    fullMode: mode,
                    compatible: ieCore ? ieCore.compatible : false
                };
                d.browser[name] = v;
            }, d);
            return d;
        };
        detector = parse(userAgent + " " + appVersion + " " + vendor);
    })();
    var ArrayProto = Array.prototype,
        FuncProto = Function.prototype,
        ObjProto = Object.prototype,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        navigator = window.navigator,
        document = window.document,
        userAgent = navigator.userAgent,
        LIB_VERSION = "1.5";
    var logger = typeof logger === "object" ? logger : {};
    logger.info = function() {
        if (!sd.para.show_log && !_.cookie.get('sa_log'))  {
            return false;
        }
        if (typeof console === "object" && console.log) {
            try {
                return console.log.apply(console, arguments);
            } catch (e) {
                console.log(arguments[0]);
            }
        }
    };
    (function() {
        var nativeBind = FuncProto.bind,
            nativeForEach = ArrayProto.forEach,
            nativeIndexOf = ArrayProto.indexOf,
            nativeIsArray = Array.isArray,
            breaker = {};
        var each = _.each = function(obj, iterator, context) {
            if (obj == null) {
                return false;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else {
                if (obj.length === +obj.length) {
                    for (var i = 0, l = obj.length; i < l; i++) {
                        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                            return false;
                        }
                    }
                } else {
                    for (var key in obj) {
                        if (hasOwnProperty.call(obj, key)) {
                            if (iterator.call(context, obj[key], key, obj) === breaker) {
                                return false;
                            }
                        }
                    }
                }
            }
        };
        _.extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0) {
                        obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        };
        _.coverExtend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0 && obj[prop] === void 0) {
                        obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        };
        _.isArray = nativeIsArray || function(obj) {
            return toString.call(obj) === "[object Array]";
        };
        _.isFunction = function(f) {
            try {
                return /^\s*\bfunction\b/.test(f);
            } catch (x) {
                return false;
            }
        };
        _.isArguments = function(obj) {
            return !!(obj && hasOwnProperty.call(obj, "callee"));
        };
        _.toArray = function(iterable) {
            if (!iterable) {
                return [];
            }
            if (iterable.toArray) {
                return iterable.toArray();
            }
            if (_.isArray(iterable)) {
                return slice.call(iterable);
            }
            if (_.isArguments(iterable)) {
                return slice.call(iterable);
            }
            return _.values(iterable);
        };
        _.values = function(obj) {
            var results = [];
            if (obj == null) {
                return results;
            }
            each(obj, function(value) {
                results[results.length] = value;
            });
            return results;
        };
        _.include = function(obj, target) {
            var found = false;
            if (obj == null) {
                return found;
            }
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
                return obj.indexOf(target) != -1;
            }
            each(obj, function(value) {
                if (found || (found = (value === target))) {
                    return breaker;
                }
            });
            return found;
        };
        _.includes = function(str, needle) {
            return str.indexOf(needle) !== -1;
        };
    })();
    _.inherit = function(subclass, superclass) {
        subclass.prototype = new superclass();
        subclass.prototype.constructor = subclass;
        subclass.superclass = superclass.prototype;
        return subclass;
    };
    _.isObject = function(obj) {
        return toString.call(obj) == "[object Object]";
    };
    _.isEmptyObject = function(obj) {
        if (_.isObject(obj)) {
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.isString = function(obj) {
        return toString.call(obj) == "[object String]";
    };
    _.isDate = function(obj) {
        return toString.call(obj) == "[object Date]";
    };
    _.isBoolean = function(obj) {
        return toString.call(obj) == "[object Boolean]";
    };
    _.isNumber = function(obj) {
        return (toString.call(obj) == "[object Number]" && /[\d\.]+/.test(String(obj)));
    };
    _.encodeDates = function(obj) {
        _.each(obj, function(v, k) {
            if (_.isDate(v)) {
                obj[k] = _.formatDate(v);
            } else {
                if (_.isObject(v)) {
                    obj[k] = _.encodeDates(v);
                }
            }
        });
        return obj;
    };
    _.formatDate = function(d) {
        function pad(n) {
            return n < 10 ? "0" + n : n;
        }
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "." + pad(d.getMilliseconds());
    };
    _.searchObjDate = function(o) {
        if (_.isObject(o)) {
            _.each(o, function(a, b) {
                if (_.isObject(a)) {
                    _.searchObjDate(o[b]);
                } else {
                    if (_.isDate(a)) {
                        o[b] = _.formatDate(a);
                    }
                }
            });
        }
    };
    _.strip_sa_properties = function(p) {
        if (!_.isObject(p)) {
            return p;
        }
        _.each(p, function(v, k) {
            if (_.isArray(v)) {
                var temp = [];
                _.each(v, function(arrv) {
                    if (_.isString(arrv)) {
                        temp.push(arrv);
                    } else {
                        logger.info("您的数据-", v, "的数组里的值必须是字符串,已经将其删除");
                    }
                });
                if (temp.length !== 0) {
                    p[k] = temp;
                } else {
                    delete p[k];
                    logger.info("已经删除空的数组");
                }
            }
            if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v))) {
                logger.info("您的数据-", v, "-格式不满足要求，我们已经将其删除");
                delete p[k];
            }
        });
        return p;
    };
    _.strip_empty_properties = function(p) {
        var ret = {};
        _.each(p, function(v, k) {
            if (_.isString(v) && v.length > 0) {
                ret[k] = v;
            }
        });
        return ret;
    };
    _.utf8Encode = function(string) {
        string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var utftext = "",
            start, end;
        var stringl = 0,
            n;
        start = end = 0;
        stringl = string.length;
        for (n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
            if (c1 < 128) {
                end++;
            } else {
                if ((c1 > 127) && (c1 < 2048)) {
                    enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
                } else {
                    enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
                }
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.substring(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }
        if (end > start) {
            utftext += string.substring(start, string.length);
        }
        return utftext;
    };
    _.detector = detector;
    _.base64Encode = function(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];
        if (!data) {
            return data;
        }
        data = _.utf8Encode(data);
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 63;
            h2 = bits >> 12 & 63;
            h3 = bits >> 6 & 63;
            h4 = bits & 63;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join("");
        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + "==";
                break;
            case 2:
                enc = enc.slice(0, -1) + "=";
                break;
        }
        return enc;
    };
    _.UUID = (function() {
        var T = function() {
            var d = 1 * new Date(),
                i = 0;
            while (d == 1 * new Date()) {
                i++;
            }
            return d.toString(16) + i.toString(16);
        };
        var R = function() {
            return Math.random().toString(16).replace(".", "");
        };
        var UA = function(n) {
            var ua = userAgent,
                i, ch, buffer = [],
                ret = 0;

            function xor(result, byte_array) {
                var j, tmp = 0;
                for (j = 0; j < byte_array.length; j++) {
                    tmp |= (buffer[j] << j * 8);
                }
                return result ^ tmp;
            }
            for (i = 0; i < ua.length; i++) {
                ch = ua.charCodeAt(i);
                buffer.unshift(ch & 255);
                if (buffer.length >= 4) {
                    ret = xor(ret, buffer);
                    buffer = [];
                }
            }
            if (buffer.length > 0) {
                ret = xor(ret, buffer);
            }
            return ret.toString(16);
        };
        return function() {
            var se = (screen.height * screen.width).toString(16);
            return (T() + "-" + R() + "-" + UA() + "-" + se + "-" + T());
        };
    })();
    _.getQueryParam = function(url, param) {
        param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + param + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(url);
        if (results === null || (results && typeof(results[1]) !== "string" && results[1].length)) {
            return "";
        } else {
            return decodeURIComponent(results[1]).replace(/\+/g, " ");
        }
    };
    _.cookie = {
        get: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            return null;
        },
        set: function(name, value, days, cross_subdomain, is_secure) {
            cross_subdomain = typeof cross_subdomain === "undefined" ? sd.para.cross_subdomain : cross_subdomain;
            var cdomain = "",
                expires = "",
                secure = "";
            days = typeof days === "undefined" ? 730 : days;
            if (cross_subdomain) {
                var matches = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                    domain = matches ? matches[0] : "";
                cdomain = ((domain) ? "; domain=." + domain : "");
            }
            if (days !== 0) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            if (is_secure) {
                secure = "; secure";
            }
            document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure;
        },
        remove: function(name, cross_subdomain) {
            cross_subdomain = typeof cross_subdomain === "undefined" ? sd.para.cross_subdomain : cross_subdomain;
            _.cookie.set(name, "", -1, cross_subdomain);
        }
    };
    _.localStorage = {
        get: function(name) {
            return window.localStorage.getItem(name);
        },
        parse: function(name) {
            var storedValue;
            try {
                storedValue = JSON.parse(_.localStorage.get(name)) || {};
            } catch (err) {}
            return storedValue;
        },
        set: function(name, value) {
            window.localStorage.setItem(name, value);
        },
        remove: function(name) {
            window.localStorage.removeItem(name);
        }
    };
    _.getQueryParam = function(url, param) {
        param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + param + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(url);
        if (results === null || (results && typeof(results[1]) !== "string" && results[1].length)) {
            return "";
        } else {
            return decodeURIComponent(results[1]).replace(/\+/g, " ");
        }
    };
    _.info = {
        campaignParams: function() {
            var campaign_keywords = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
                kw = "",
                params = {};
            _.each(campaign_keywords, function(kwkey) {
                kw = _.getQueryParam(location.href, kwkey);
                if (kw.length) {
                    params[kwkey] = kw;
                }
            });
            return params;
        },
        searchEngine: function(referrer) {
            if (referrer.search("https?://(.*)google.([^/?]*)") === 0) {
                return "google";
            } else {
                if (referrer.search("https?://(.*)bing.com") === 0) {
                    return "bing";
                } else {
                    if (referrer.search("https?://(.*)yahoo.com") === 0) {
                        return "yahoo";
                    } else {
                        if (referrer.search("https?://(.*)duckduckgo.com") === 0) {
                            return "duckduckgo";
                        } else {
                            return null;
                        }
                    }
                }
            }
        },
        browser: function(user_agent, vendor, opera) {
            var vendor = vendor || "";
            if (opera || _.includes(user_agent, " OPR/")) {
                if (_.includes(user_agent, "Mini")) {
                    return "Opera Mini";
                }
                return "Opera";
            } else {
                if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
                    return "BlackBerry";
                } else {
                    if (_.includes(user_agent, "IEMobile") || _.includes(user_agent, "WPDesktop")) {
                        return "Internet Explorer Mobile";
                    } else {
                        if (_.includes(user_agent, "Edge")) {
                            return "Microsoft Edge";
                        } else {
                            if (_.includes(user_agent, "FBIOS")) {
                                return "Facebook Mobile";
                            } else {
                                if (_.includes(user_agent, "Chrome")) {
                                    return "Chrome";
                                } else {
                                    if (_.includes(user_agent, "CriOS")) {
                                        return "Chrome iOS";
                                    } else {
                                        if (_.includes(vendor, "Apple")) {
                                            if (_.includes(user_agent, "Mobile")) {
                                                return "Mobile Safari";
                                            }
                                            return "Safari";
                                        } else {
                                            if (_.includes(user_agent, "Android")) {
                                                return "Android Mobile";
                                            } else {
                                                if (_.includes(user_agent, "Konqueror")) {
                                                    return "Konqueror";
                                                } else {
                                                    if (_.includes(user_agent, "Firefox")) {
                                                        return "Firefox";
                                                    } else {
                                                        if (_.includes(user_agent, "MSIE") || _.includes(user_agent, "Trident/")) {
                                                            return "Internet Explorer";
                                                        } else {
                                                            if (_.includes(user_agent, "Gecko")) {
                                                                return "Mozilla";
                                                            } else {
                                                                return "";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        browserVersion: function(userAgent, vendor, opera) {
            var browser = _.info.browser(userAgent, vendor, opera);
            var versionRegexs = {
                "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
                "Microsoft Edge": /Edge\/(\d+(\.\d+)?)/,
                Chrome: /Chrome\/(\d+(\.\d+)?)/,
                "Chrome iOS": /Chrome\/(\d+(\.\d+)?)/,
                Safari: /Version\/(\d+(\.\d+)?)/,
                "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
                Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
                Firefox: /Firefox\/(\d+(\.\d+)?)/,
                Konqueror: /Konqueror:(\d+(\.\d+)?)/,
                BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
                "Android Mobile": /android\s(\d+(\.\d+)?)/,
                "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
                Mozilla: /rv:(\d+(\.\d+)?)/
            };
            var regex = versionRegexs[browser];
            if (regex == undefined) {
                return null;
            }
            var matches = userAgent.match(regex);
            if (!matches) {
                return null;
            }
            return String(parseFloat(matches[matches.length - 2]));
        },
        os: function() {
            var a = userAgent;
            if (/Windows/i.test(a)) {
                if (/Phone/.test(a)) {
                    return "Windows Mobile";
                }
                return "Windows";
            } else {
                if (/(iPhone|iPad|iPod)/.test(a)) {
                    return "iOS";
                } else {
                    if (/Android/.test(a)) {
                        return "Android";
                    } else {
                        if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
                            return "BlackBerry";
                        } else {
                            if (/Mac/i.test(a)) {
                                return "Mac OS X";
                            } else {
                                if (/Linux/.test(a)) {
                                    return "Linux";
                                } else {
                                    return "";
                                }
                            }
                        }
                    }
                }
            }
        },
        device: function(user_agent) {
            if (/iPad/.test(user_agent)) {
                return "iPad";
            } else {
                if (/iPod/i.test(user_agent)) {
                    return "iPod";
                } else {
                    if (/iPhone/i.test(user_agent)) {
                        return "iPhone";
                    } else {
                        if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
                            return "BlackBerry";
                        } else {
                            if (/Windows Phone/i.test(user_agent)) {
                                return "Windows Phone";
                            } else {
                                if (/Windows/i.test(user_agent)) {
                                    return "Windows";
                                } else {
                                    if (/Macintosh/i.test(user_agent)) {
                                        return "Macintosh";
                                    } else {
                                        if (/Android/i.test(user_agent)) {
                                            return "Android";
                                        } else {
                                            if (/Linux/i.test(user_agent)) {
                                                return "Linux";
                                            } else {
                                                return "";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        referringDomain: function(referrer) {
            var split = referrer.split("/");
            if (split.length >= 3) {
                return split[2];
            }
            return "";
        },
        getBrowser: function() {
            return {
                _browser: detector.browser.name,
                _browser_version: String(detector.browser.version)
            };
        },
        properties: function() {
            return _.extend(_.strip_empty_properties({
                $os: detector.os.name,
                $model: detector.device.name
            }), {
                _browser_engine: detector.engine.name,
                $screen_height: screen.height,
                $screen_width: screen.width,
                $lib: "js",
                $lib_version: LIB_VERSION
            }, _.info.getBrowser());
        },
        currentProps: {},
        register: function(obj) {
            _.extend(_.info.currentProps, obj);
        }
    };
    var saEvent = {};
    saEvent.checkOption = {
        regChecks: {
            regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
        },
        checkPropertiesKey: function(obj) {
            var me = this,
                flag = true;
            _.each(obj, function(content, key) {
                if (!me.regChecks.regName.test(key)) {
                    flag = false;
                }
            });
            return flag;
        },
        check: function(a, b) {
            if (typeof this[a] === "string") {
                return this[this[a]](b);
            } else {
                return this[a](b);
            }
        },
        str: function(s) {
            if (!_.isString(s)) {
                logger.info("请检查参数格式,必须是字符串");
                return false;
            } else {
                return true;
            }
        },
        properties: function(p) {
            _.strip_sa_properties(p);
            if (p) {
                if (_.isObject(p)) {
                    if (this.checkPropertiesKey(p)) {
                        return true;
                    } else {
                        logger.info("properties里的key必须是由字符串数字_组成");
                        return false;
                    }
                } else {
                    logger.info("properties可以没有，但有的话必须是对象");
                    return false;
                }
            } else {
                return true;
            }
        },
        propertiesMust: function(p) {
            _.strip_sa_properties(p);
            if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
                logger.info("properties必须是对象且有值");
                return false;
            } else {
                if (this.checkPropertiesKey(p)) {
                    return true;
                } else {
                    logger.info("properties里的key必须是由字符串数字_组成");
                    return false;
                }
            }
        },
        event: function(s) {
            if (!_.isString(s) || !this["regChecks"]["regName"].test(s)) {
                logger.info("请检查参数格式,必须是字符串,且eventName必须是字符串_开头");
                return false;
            } else {
                return true;
            }
        },
        test_id: "str",
        group_id: "str",
        distinct_id: function(id) {
            if (_.isString(id) && /^.{1,255}$/.test(id)) {
                return true;
            } else {
                logger.info("distinct_id必须是不能为空，且小于255位的字符串");
                return false;
            }
        }
    };
    saEvent.check = function(p) {
        var flag = true;
        for (var i in p) {
            if (!this.checkOption.check(i, p[i])) {
                return false;
            }
        }
        return flag;
    };
    saEvent.send = function(p) {
        var data = {
            distinct_id: store.getDistinctId(),
            properties: {}
        };
        _.extend(data, p);
        if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
            _.extend(data.properties, p.properties);
        }
        if (!p.type || p.type.slice(0, 7) !== "profile") {
            _.extend(data.properties, store.getProps(), store.getSessionProps(), _.info.currentProps, _.info.properties());
        }
        data.time = new Date() * 1;
        _.searchObjDate(data);
        logger.info(data);
        this.path(JSON.stringify(data));
    };
    saEvent.path = function(data) {
        sd.requestImg = new Image();
        sd.requestImg.onload = sd.requestImg.onerror = function() {
            if (sd.requestImg) {
                sd.requestImg.onload = null;
                sd.requestImg.onerror = null;
                sd.requestImg = null;
            }
        };
        if (sd.para.server_url.indexOf("?") !== -1) {
            sd.requestImg.src = sd.para.server_url + "&data=" + encodeURIComponent(_.base64Encode(data));
        } else {
            sd.requestImg.src = sd.para.server_url + "?data=" + encodeURIComponent(_.base64Encode(data));
        }
    };
    var store = sd.store = {
        getProps: function() {
            return this._state.props;
        },
        getSessionProps: function() {
            return this._sessionState;
        },
        getDistinctId: function() {
            return this._state.distinct_id;
        },
        toState: function(ds) {
            var state = null;
            if (ds !== null && (typeof(state = JSON.parse(ds)) === "object")) {
                this._state = state;
            }
        },
        initSessionState: function() {
            var ds = _.cookie.get("sensorsdata2015session");
            var state = null;
            if (ds !== null && (typeof(state = JSON.parse(ds)) === "object")) {
                this._sessionState = state;
            }
        },
        setOnce: function(a, b) {
            if (!(a in this._state)) {
                this.set(a, b);
            }
        },
        set: function(name, value) {
            this._state[name] = value;
            this.save();
        },
        change: function(name, value) {
            this._state[name] = value;
        },
        setSessionProps: function(newp) {
            var props = this._sessionState;
            _.extend(props, newp);
            this.sessionSave(props);
        },
        setSessionPropsOnce: function(newp) {
            var props = this._sessionState;
            _.coverExtend(props, newp);
            this.sessionSave(props);
        },
        setProps: function(newp) {
            var props = this._state.props || {};
            _.extend(props, newp);
            this.set("props", props);
        },
        setPropsOnce: function(newp) {
            var props = this._state.props || {};
            _.coverExtend(props, newp);
            this.set("props", props);
        },
        sessionSave: function(props) {
            this._sessionState = props;
            _.cookie.set("sensorsdata2015session", JSON.stringify(this._sessionState), 0);
        },
        save: function() {
            if (sd.para.cross_subdomain) {
                _.cookie.set("sensorsdata2015jssdkcross", JSON.stringify(this._state), 730, true);
            } else {
                _.cookie.set("sensorsdata2015jssdk", JSON.stringify(this._state), 730, false);
            }
        },
        _sessionState: {},
        _state: {},
        init: function() {
            var ds = _.cookie.get("sensorsdata2015jssdk");
            var cs = _.cookie.get("sensorsdata2015jssdkcross");
            var cross = null;
            if (sd.para.cross_subdomain) {
                cross = cs;
                if (ds !== null) {
                    logger.info("在根域且子域有值，删除子域的cookie");
                    _.cookie.remove("sensorsdata2015jssdk", false);
                    _.cookie.remove("sensorsdata2015jssdk", true);
                }
                if (cross === null && ds !== null) {
                    logger.info("在根域且根域没值，子域有值，根域＝子域的值", ds);
                    cross = ds;
                }
            } else {
                logger.info("在子域");
                cross = ds;
            }
            this.initSessionState();
            if (cross !== null) {
                this.toState(cross);
                if (sd.para.cross_subdomain && cs === null) {
                    logger.info("在根域且根域没值，保存当前值到cookie中");
                    this.save();
                }
            } else {
                logger.info("没有值，set值");
                this.set("distinct_id", _.UUID());
            }
        }
    };
    var commonWays = {
        getUtm: function() {
            return _.info.campaignParams();
        },
        getStayTime: function() {
            return ((new Date()) - sd._t) / 1000;
        },
        setInitReferrer: function() {
            var _referrer = document.referrer;
            store.setPropsOnce({
                _init_referrer: _referrer,
                _init_referrer_domain: _.info.referringDomain(_referrer)
            });
        },
        setSessionReferrer: function() {
            var _referrer = document.referrer;
            store.setSessionPropsOnce({
                _session_referrer: _referrer,
                _session_referrer_domain: _.info.referringDomain(_referrer)
            });
        },
        setDefaultAttr: function() {
            _.info.register({
                _current_url: location.href,
                _referrer: document.referrer,
                _referring_domain: _.info.referringDomain(document.referrer)
            });
        },
        cookie: function() {}
    };
    sd.quick = function() {
        var arg = Array.prototype.slice.call(arguments);
        var arg0 = arg[0];
        var arg1 = arg.slice(1);
        if (typeof arg0 === "string" && commonWays[arg0]) {
            return commonWays[arg0].apply(sd, arg1);
        } else {
            if (typeof arg0 === "function") {
                arg0.apply(sd, arg1);
            } else {
                logger.info("quick方法中没有这个功能" + arg[0]);
            }
        }
    };
    sd.track = function(e, p) {
        if (saEvent.check({
                event: e,
                properties: p
            })) {
            saEvent.send({
                type: "track",
                event: e,
                properties: p
            });
        }
    };
    sd.setProfile = function(p) {
        if (saEvent.check({
                propertiesMust: p
            })) {
            saEvent.send({
                type: "profile_set",
                properties: p
            });
        }
    };
    sd.setOnceProfile = function(p) {
        if (saEvent.check({
                propertiesMust: p
            })) {
            saEvent.send({
                type: "profile_set_once",
                properties: p
            });
        }
    };
    sd.appendProfile = function(p) {
        if (saEvent.check({
                propertiesMust: p
            })) {
            _.each(p, function(value, key) {
                if (_.isString(value)) {
                    p[key] = [value];
                } else {
                    if (_.isArray(value)) {} else {
                        delete p[key];
                        logger.info("appendProfile属性的值必须是字符串或者数组");
                    }
                }
            });
            if (!_.isEmptyObject(p)) {
                saEvent.send({
                    type: "profile_append",
                    properties: p
                });
            }
        }
    };
    sd.incrementProfile = function(p) {
        var str = p;
        if (_.isString(p)) {
            p = {};
            p[str] = 1;
        }

        function isChecked(p) {
            for (var i in p) {
                if (!/-*\d+/.test(String(p[i]))) {
                    return false;
                }
            }
            return true;
        }
        if (saEvent.check({
                propertiesMust: p
            })) {
            if (isChecked(p)) {
                saEvent.send({
                    type: "profile_increment",
                    properties: p
                });
            } else {
                logger.info("profile_increment的值只能是数字");
            }
        }
    };
    sd.deleteProfile = function() {
        saEvent.send({
            type: "profile_delete"
        });
        store.set("distinct_id", _.UUID());
    };
    sd.unsetProfile = function(p) {
        var str = p;
        var temp = {};
        if (_.isString(p)) {
            p = [];
            p.push(str);
        }
        if (_.isArray(p)) {
            _.each(p, function(v) {
                if (_.isString(v)) {
                    temp[v] = true;
                } else {
                    logger.info("profile_unset给的数组里面的值必须时string,已经过滤掉", v);
                }
            });
            saEvent.send({
                type: "profile_unset",
                properties: temp
            });
        } else {
            logger.info("profile_unset的参数是数组");
        }
    };
    sd.identify = function(id, isSave) {
        if (typeof id === "undefined") {
            store.set("distinct_id", _.UUID());
        } else {
            if (saEvent.check({
                    distinct_id: id
                })) {
                if (isSave === true) {
                    store.set("distinct_id", id);
                } else {
                    store.change("distinct_id", id);
                }
            } else {
                logger.info("identify的参数必须是字符串");
            }
        }
    };
    sd.trackSignup = function(id, e, p) {
        if (saEvent.check({
                distinct_id: id,
                event: e,
                properties: p
            })) {
            saEvent.send({
                original_id: store.getDistinctId(),
                distinct_id: id,
                type: "track_signup",
                event: e,
                properties: p
            });
            store.set("distinct_id", id);
        }
    };
    sd.trackAbtest = function(t, g) {
        if (saEvent.check({
                test_id: t,
                group_id: g
            })) {
            saEvent.send({
                type: "track_abtest",
                properties: {
                    test_id: t,
                    group_id: g
                }
            });
        }
    };
    sd.register = function(props) {
        if (saEvent.check({
                properties: props
            })) {
            store.setProps(props);
        } else {
            logger.info("register输入的参数有误");
        }
    };
    sd.registerOnce = function(props) {
        if (saEvent.check({
                properties: props
            })) {
            store.setPropsOnce("props", props);
        } else {
            logger.info("registerOnce输入的参数有误");
        }
    };
    sd.registerSession = function(props) {
        if (saEvent.check({
                properties: props
            })) {
            store.setSessionProps(props);
        } else {
            logger.info("registerSession输入的参数有误");
        }
    };
    sd.registerSessionOnce = function(props) {
        if (saEvent.check({
                properties: props
            })) {
            store.setSessionPropsOnce(props);
        } else {
            logger.info("registerSessionOnce输入的参数有误");
        }
    };
    sd.init = function() {
        store.init();
        _.each(sd._q, function(content) {
            sd[content[0]].apply(sd, slice.call(content[1]));
        });
    };
    sd.init();
})(window.sensorsDataAnalytic201505);