'use strict'
import { fetchResource } from "../utils"

const baseUrl = 'https://forvo.com/word/'

export default class Forvo {
  constructor(word) {
    this.word = word
  }

  /**
   *
   * @returns {Promise<string | void>}
   */
  getSrcPage() {
    const { /** @type {string} */ _srcPage } = this
    if (_srcPage) return Promise.resolve(_srcPage)

    return fetchResource(`${baseUrl}${this.word}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(function(data) {
        return data.clone().text()
      })
      .then(d => {
        return this._srcPage = d
      })
      .catch(error =>
        console.error(error && error.message || error)
      )
  }

  getAudioHost() {
    const { _audioHost } = this
    if (_audioHost) return Promise.resolve(_audioHost)

    const audioHostRg = /_AUDIO_HTTP_HOST=\'(.*?)'/i
    return this.getSrcPage().then(src => {
      const res = src.match(audioHostRg)
      return this._audioHost = (res && res.length > 1) && res[1]
    })
  }

  getAudioSources() {
    const { _audioSources } = this
    if (_audioSources) return Promise.resolve(_audioSources)
    const regexp = /Play\((.*?),'(.*?)','(.*?)',\s*(\w+),'(.*?)','(.*?),\s*'\w+'/gi
    return this.getSrcPage()
      .then(src => {
        if (!src) return Promise.resolve(null)

        const res = src.matchAll(regexp)
        return Array.from(res).map(r => ({
          id: r[1],
          mp3: r[2],
          ogg: r[3],
          audioMp3: r[5],
          audioOgg: r[6]
        }))
      })
      .then(audioSources => {
        return this.getAudioHost()
          .then(audioHost => {
            this._audioSources = audioSources && audioSources.length > 0 && audioSources

            audioSources && audioSources.forEach(audioInfo => {
              const { mp3, ogg, audioMp3, audioOgg } = audioInfo
              audioInfo.mp3Path = mp3 && `//${audioHost}/mp3/${base64Decode(mp3)}`
                || audioMp3 && `//${audioHost}//audios/mp3/${base64Decode(audioMp3)}`
              audioInfo.oggPath = ogg && `//${audioHost}/ogg/${base64Decode(ogg)}`
                || audioOgg && `//${audioHost}//audios/ogg/${base64Decode(audioOgg)}`
            })
            return this._audioSources
          })
      })
  }

}

function base64Decode(src) {
  var b, c, d, e, f, g, h, i,
    j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  let k = 0, ac = 0,
    l = "",
    m = []

  if (!src) return src

  src += ""
  do
    e = j.indexOf(src.charAt(k++)),
      f = j.indexOf(src.charAt(k++)),
      g = j.indexOf(src.charAt(k++)),
      h = j.indexOf(src.charAt(k++)),
      i = e << 18 | f << 12 | g << 6 | h,
      b = i >> 16 & 255,
      c = i >> 8 & 255,
      d = 255 & i,
      64 == g ? m[ac++] = String.fromCharCode(b) : 64 == h ? m[ac++] = String.fromCharCode(b, c) : m[ac++] = String.fromCharCode(b, c, d)
  while (k < src.length)
  return l = m.join(""),
    l = utf8Decode(l)
}

function utf8Decode(a) {
  var b = []
    , c = 0
    , d = 0
    , e = 0
    , f = 0
    , g = 0
  for (a += ""; c < a.length;)
    e = a.charCodeAt(c),
      128 > e ? (b[d++] = String.fromCharCode(e),
        c++) : e > 191 && 224 > e ? (f = a.charCodeAt(c + 1),
        b[d++] = String.fromCharCode((31 & e) << 6 | 63 & f),
        c += 2) : (f = a.charCodeAt(c + 1),
        g = a.charCodeAt(c + 2),
        b[d++] = String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | 63 & g),
        c += 3)
  return b.join("")
}
