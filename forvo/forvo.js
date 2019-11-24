var pronunciations = [
  ['<strong style="font-size:120%; margin-bottom:1px; display:block; max-width:200px">  Rechtsanwaltskanzlei в <span style="color:#04A300">немецкий<\/span><\/strong>  <span style="font-size:100%"> произнёс пользователь <a href="https://ru.forvo.com/user/Bartleby"/ >Bartleby<\/a> <br/> <span class="lang_xx">(мужчина, Германия)<\/span><\/span>',
    53.414036,
    10.023651,
    '1758851', // id
    'OTIzMzk0MC8zNC85MjMzOTQwXzM0XzE5ODEzOTBfMS5tcDM=', // path_mp3
    'OTIzMzk0MC8zNC85MjMzOTQwXzM0XzE5ODEzOTBfMS5vZ2c=', // path_ogg
    'good', // type
    'dC9zL3RzXzkyMzM5NDBfMzRfMTk4MTM5MF8xLm1wMw==', //path_audio_mp3
    'dC9zL3RzXzkyMzM5NDBfMzRfMTk4MTM5MF8xLm9nZw==', // path_audio_ogg
    'h' //quality
  ]
];
marker = createMarker(pronunciation[1], pronunciation[2], pronunciation[6], pronunciation[0], pronunciation[3], pronunciation[4], pronunciation[5],pronunciation[7],pronunciation[8],pronunciation[9]);
Play(id, path_mp3, path_ogg, true, path_audio_mp3, path_audio_ogg, quality);

const _AUDIO_HTTP_HOST = "audio00.forvo.com"

function Play(id, path_mp3, path_ogg, d, path_audio_mp3, path_audio_ogg, g) {
  // if (_SERVER_HOST == _AUDIO_HTTP_HOST) {
  //   var path_mp3 = defaultProtocol + "//" + _SERVER_HOST + "/player-mp3Handler.php?path=" + path_mp3
  //     , path_ogg = defaultProtocol + "//" + _SERVER_HOST + "/player-oggHandler.php?path=" + path_ogg;
  //   if ("undefined" != typeof path_audio_mp3 && void 0 !== path_audio_mp3 && null !== path_audio_mp3 && "" !== path_audio_mp3)
  //     var path_audio_mp3 = defaultProtocol + "//" + _SERVER_HOST + "/player-mp3-highHandler.php?path=" + path_audio_mp3;
  //   else
  //     var path_audio_mp3 = "";
  //   if ("undefined" != typeof path_audio_ogg && void 0 !== path_audio_ogg && null !== path_audio_ogg && "" !== path_audio_ogg)
  //     var path_audio_ogg = defaultProtocol + "//" + _SERVER_HOST + "/player-ogg-highHandler.php?path=" + path_audio_ogg;
  //   else
  //     var path_audio_ogg = ""
  // } else
    {
    var path_mp3 = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/mp3/" + base64_decode(path_mp3)
      , path_ogg = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/ogg/" + base64_decode(path_ogg);
    if ("undefined" != typeof path_audio_mp3 && void 0 !== path_audio_mp3 && null !== path_audio_mp3 && "" !== path_audio_mp3)
      var path_audio_mp3 = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/audios/mp3/" + base64_decode(path_audio_mp3); // atob(path_audio_mp3)
    else
      var path_audio_mp3 = "";
    if ("undefined" != typeof path_audio_ogg && void 0 !== path_audio_ogg && null !== path_audio_ogg && "" !== path_audio_ogg)
      var path_audio_ogg = defaultProtocol + "//" + _AUDIO_HTTP_HOST + "/audios/ogg/" + base64_decode(path_audio_ogg);
    else
      var path_audio_ogg = ""
  }
  if ("undefined" == typeof g || void 0 == g || null == g || "" == g)
    var g = "l";
  var h = !!document.createElement("audio").canPlayType;
  if (d = d ? !0 : !1,
    h) {
    var i = navigator.userAgent.toLowerCase()
      , j = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(i);
    createAudioObject(id, path_mp3, path_ogg, j, d, path_audio_mp3, path_audio_ogg, g)
  }
  return isNaN(id) && -1 != id.indexOf("_map") && (id = id.split("_", 1)),
    sumHit(id),
  "function" == typeof ga && ga("send", "event", "Play", "Web", id),
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

// b
// "https://audio00.forvo.com/mp3/8979374/34/8979374_34_6239_6316.mp3"
// c
// "https://audio00.forvo.com/ogg/8979374/34/8979374_34_6239_6316.ogg"
// e
// "https://audio00.forvo.com/audios/mp3/i/v/iv_8979374_34_6239_6316.mp3"
// f
// "https://audio00.forvo.com/audios/ogg/i/v/iv_8979374_34_6239_6316.ogg"

