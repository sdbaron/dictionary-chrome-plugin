window.addEventListener("DOMContentLoaded", init);

function init(){
    let root = document.getElementById("main");
    root.innerHTML = "<b>Ok, lets begin!</b>";
}

const url = 'https://forvo.com/word/vergessen/'

Play(132743,
  'ODk3OTM3NC8zNC84OTc5Mzc0XzM0XzIxOTYwXzEubXAz',
  'ODk3OTM3NC8zNC84OTc5Mzc0XzM0XzIxOTYwXzEub2dn',
  false,
  'MS82LzE2Xzg5NzkzNzRfMzRfMjE5NjBfMS5tcDM=',
  'MS82LzE2Xzg5NzkzNzRfMzRfMjE5NjBfMS5vZ2c=',
  'h')
var _SERVER_HOST = 'forvo.com'
var _AUDIO_HTTP_HOST = "audio00.forvo.com"
var defaultProtocol = "https:"

function Play(a, b, c, d, e, f, g) {
    if (_SERVER_HOST == _AUDIO_HTTP_HOST) {
        var b = defaultProtocol + "//" + _SERVER_HOST + "/player-mp3Handler.php?path=" + b
          , c = defaultProtocol + "//" + _SERVER_HOST + "/player-oggHandler.php?path=" + c;
        if ("undefined" != typeof e && void 0 !== e && null !== e && "" !== e)
            var e = defaultProtocol + "//" + _SERVER_HOST + "/player-mp3-highHandler.php?path=" + e;
        else
            var e = "";
        if ("undefined" != typeof f && void 0 !== f && null !== f && "" !== f)
            var f = defaultProtocol + "//" + _SERVER_HOST + "/player-ogg-highHandler.php?path=" + f;
        else
            var f = ""
    } else {
        var b = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/mp3/" + base64_decode(b)
          , c = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/ogg/" + base64_decode(c);
        if ("undefined" != typeof e && void 0 !== e && null !== e && "" !== e)
            var e = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/audios/mp3/" + base64_decode(e);
        else
            var e = "";
        if ("undefined" != typeof f && void 0 !== f && null !== f && "" !== f)
            var f = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/audios/ogg/" + base64_decode(f);
        else
            var f = ""
    }
    if ("undefined" == typeof g || void 0 == g || null == g || "" == g)
        var g = "l";
    var h = !!document.createElement("audio").canPlayType;
    if (d = d ? !0 : !1,
      h) {
        var i = navigator.userAgent.toLowerCase()
          , j = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(i);
        createAudioObject(a, b, c, j, d, e, f, g)
    } else {
        var k = '<object type="application/x-shockwave-flash" data="' + player_path + '" width="1" height="1"><param name="movie" value="' + player_path + '" /><param name="flashvars" value="path=' + b + "&amp;_SERVER_HTTP_HOST=" + _SERVER_HOST + '" /></object>'
          , l = document.getElementById("player");
        l.innerHTML = k
    }
    return isNaN(a) && -1 != a.indexOf("_map") && (a = a.split("_", 1)),
      sumHit(a),
    "function" == typeof ga && ga("send", "event", "Play", "Web", a),
      !0
}

function createAudioObject(a, b, c, d, e, f, g, h) {
    var i = document.createElement("audio");
    if ("undefined" != typeof h && void 0 !== h && null !== h && "" !== h && "h" == h) {
        if ("undefined" != typeof f && void 0 !== f && null !== f && "" !== f) {
            var j = document.createElement("source");
            j.type = "audio/mp3",
              j.src = f,
              i.appendChild(j)
        }
        if ("undefined" != typeof g && void 0 !== g && null !== g && "" !== g) {
            var k = document.createElement("source");
            k.type = "audio/ogg",
              k.src = g,
              i.appendChild(k)
        }
    }
    if (null !== b) {
        var l = document.createElement("source");
        l.type = "audio/mp3",
          l.src = b,
          i.appendChild(l)
    }
    if (null !== c) {
        var m = document.createElement("source");
        m.type = "audio/ogg",
          m.src = c,
          i.appendChild(m)
    }
    if (d || (i.autoplay = !0),
      e) {
        var n = function(a) {
            var b = a.target.src
              , c = window.location.href;
            reportMissingAudioFile(b, c)
        };
        i.addEventListener("error", n, !0)
    } else {
        var o = $("#play_" + a)
          , p = function() {
            o.removeClass("error"),
              o.addClass("loading")
        }
          , q = function() {
            o.removeClass("error"),
              o.removeClass("loading"),
              o.addClass("playing")
        }
          , n = function(a) {
            o.removeClass("loading"),
              o.removeClass("playing"),
              o.addClass("error");
            var b = a.target.src
              , c = window.location.href;
            reportMissingAudioFile(b, c)
        }
          , r = function() {
            o.removeClass("loading"),
              o.removeClass("playing")
        };
        i.addEventListener("loadstart", p, !1),
          i.addEventListener("play", q, !1),
          i.addEventListener("error", n, !0),
          i.addEventListener("ended", r, !1)
    }
    d && i.play()
}
function base64_decode(a) {
    var b, c, d, e, f, g, h, i, j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = ac = 0, l = "", m = [];
    if (!a)
        return a;
    a += "";
    do
        e = j.indexOf(a.charAt(k++)),
          f = j.indexOf(a.charAt(k++)),
          g = j.indexOf(a.charAt(k++)),
          h = j.indexOf(a.charAt(k++)),
          i = e << 18 | f << 12 | g << 6 | h,
          b = i >> 16 & 255,
          c = i >> 8 & 255,
          d = 255 & i,
          64 == g ? m[ac++] = String.fromCharCode(b) : 64 == h ? m[ac++] = String.fromCharCode(b, c) : m[ac++] = String.fromCharCode(b, c, d);
    while (k < a.length);return l = m.join(""),
      l = utf8_decode(l)
}
function utf8_to_b64(a) {
    return window.btoa(encodeURIComponent(escape(a)))
}
function b64_to_utf8(a) {
    return unescape(decodeURIComponent(window.atob(a)))
}
function utf8_decode(a) {
    var b = []
      , c = 0
      , d = 0
      , e = 0
      , f = 0
      , g = 0;
    for (a += ""; c < a.length; )
        e = a.charCodeAt(c),
          128 > e ? (b[d++] = String.fromCharCode(e),
            c++) : e > 191 && 224 > e ? (f = a.charCodeAt(c + 1),
            b[d++] = String.fromCharCode((31 & e) << 6 | 63 & f),
            c += 2) : (f = a.charCodeAt(c + 1),
            g = a.charCodeAt(c + 2),
            b[d++] = String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | 63 & g),
            c += 3);
    return b.join("")
}
