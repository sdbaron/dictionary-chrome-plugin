'use strict'
import { fetchResource } from "../../utils"
import LingvoSoundPlayer from './SoundPlayer'

const SERVICE_URL = 'https://developers.lingvolive.com'
const API_KEY = 'MzA1OTMzZjktNzY3OC00MTM4LTkzNTQtOWFiZjRhNWNiY2NkOjhjZmYwZTAyYWY2ODQ5ZmU5YjQ2YTA2NDFmMGYwNGEw'

// getToken(true).then(token => console.log(token))

export default class LingvoApi {
  constructor() {
    this.token = null // 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFMU1URXhNelkxTlRNc0lrMXZaR1ZzSWpwN0lrTm9ZWEpoWTNSbGNuTlFaWEpFWVhraU9qVXdNREF3TENKVmMyVnlTV1FpT2pRME1pd2lWVzVwY1hWbFNXUWlPaUl6TURVNU16Tm1PUzAzTmpjNExUUXhNemd0T1RNMU5DMDVZV0ptTkdFMVkySmpZMlFpZlgwLkpnS1l1R2l3LWFzSnZZeEtscUhySFdHV0x2b1dNMDB6cDZ4VVd4MERjNDA='
  }

  /**
   * Возвращает промис с переводом текста
   * @param {string} text Переводимый текст
   * @param {string} langFrom Двухсимвольное обозначение исходного языка
   * @param {string} langTo Двухсимвольное обозначение целевого языка
   * @returns {Promise<string>} Промис результата перевода
   */
  translate(text, langFrom = 'de', langTo = 'ru') {
    return requestByKey('Translation', getToken.bind(this), text, langFrom, langTo)
  }

  miniCard(text, langFrom = 'de', langTo = 'ru') {
    return requestByKey('Minicard', getToken.bind(this), text, langFrom, langTo)
  }

  /**
   *
   * @param {string} text
   * @param {string} langFrom
   * @param {string} langTo
   * @returns {Promise<Array.<SoundPlayer>>}
   */
  createSoundPlayers(text, langFrom = 'de', langTo = 'ru') {
    return this.miniCard(text, langFrom, langTo)
      .then(data => {
        const { Translation: { DictionaryName, SoundName } } = data && JSON.parse(data) || { Translation: {} }
        return SoundName && [new LingvoSoundPlayer({ dict: DictionaryName, name: SoundName })]
      })
  }

  // sound(text, langFrom = 'de', langTo = 'ru') {
  //   return this.miniCard(text, langFrom, langTo)
  //     .then(data => {
  //       const { Translation: { DictionaryName, SoundName } } = data && JSON.parse(data) || { Translation: {} }
  //       return { dictionaryName: DictionaryName, soundName: SoundName }
  //     })
  // }
}

/**
 *
 * @returns {Promise}
 * @this {LingvoApi}
 */
function getToken(forceGetToken = false) {
  if (!forceGetToken && this.token) return Promise.resolve(this.token)

  return new Promise((success) => {
    fetchResource(`${SERVICE_URL}/api/v1.1/authenticate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Basic ${API_KEY}`
      }
    }).then(data => {
      success(data.text())
    }).catch(error =>
      console.error(error && error.message || error)
    )
  })
}

function requestByKey(key, getToken, text, langFrom = 'de', langTo = 'ru') {
  return request(getToken, key, {
    text,
    srcLang: getLanguageCode(langFrom),
    dstLang: getLanguageCode(langTo),
  })

}

function getLanguageCode(langauge) {
  const data = {
    'de': 1031,
    'ru': 1049,
    'en': 1033
  }

  const code = data[langauge.toLowerCase()]
  if (!code) throw new Error(`Code for language ${langauge} not found`)

  return code
}

/**
 *
 * @param {function} getToken
 * @param key
 * @param params
 * @param forceGetToken
 * @this {LingvoApi}
 * @returns {Promise<any>}
 */
function request(getToken, key, params, forceGetToken = false) {
  return getToken(forceGetToken)
    .then(token => requestWithToken(token, key, params))
    .catch(err => {
      if (err.code === 401) {
        console.info(`${err.message}. Attempting get fresh token.`)
        return request(getToken, key, params, true)
      } else {
        console.error(err.message)
        throw err
      }
    })
}

function requestWithToken(token, key, params) {
  return new Promise((success, reject) => {
    fetchResource(encodeURI(makeApiURI(key, params)), {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        authorization: `Bearer ${token}`,
        'cache-control': 'no-cache'
      }
    }).then(response => {
      if (response.status === 200) success(response.text())
      else if (response.status === 401) {
        const err = new Error('Token is expired')
        err.code = 401
        reject(err)
      } else {
        reject(new Error(`Ошибка при получении перевода: ${response.status}`))
      }
    })

  })
}

function makeApiURI(key, params) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&')
  return `${SERVICE_URL}/api/v1/${key}${query && '?' + query}`
}
