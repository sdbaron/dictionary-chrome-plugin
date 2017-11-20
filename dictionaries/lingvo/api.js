'use strict'
const SERVICE_URL = 'https://developers.lingvolive.com'
const API_KEY = 'MzA1OTMzZjktNzY3OC00MTM4LTkzNTQtOWFiZjRhNWNiY2NkOjhjZmYwZTAyYWY2ODQ5ZmU5YjQ2YTA2NDFmMGYwNGEw'

// getToken(true).then(token => console.log(token))

export default class LingvoApi {
    constructor() {
        this.token = 'Z342'; //null; // 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFMU1URXhNelkxTlRNc0lrMXZaR1ZzSWpwN0lrTm9ZWEpoWTNSbGNuTlFaWEpFWVhraU9qVXdNREF3TENKVmMyVnlTV1FpT2pRME1pd2lWVzVwY1hWbFNXUWlPaUl6TURVNU16Tm1PUzAzTmpjNExUUXhNemd0T1RNMU5DMDVZV0ptTkdFMVkySmpZMlFpZlgwLkpnS1l1R2l3LWFzSnZZeEtscUhySFdHV0x2b1dNMDB6cDZ4VVd4MERjNDA='
    }

    /**
     * Возвращает промис с переводом текста
     * @param {string} text Переводимый текст
     * @param {string} langFrom Двухсимвольное обозначение исходного языка
     * @param {string} langTo Двухсимвольное обозначение целевого языка
     * @param {boolean} [forceGetToken=false]
     * @returns {Promise<string>} Промис результата перевода
     */
    translate(text, langFrom = 'de', langTo = 'ru', forceGetToken = false) {
        return getToken.call(this, forceGetToken)
            .then(token => translate.call(this, token, text, langFrom, langTo))
            .catch(err => {
                if (err.code === 401) {
                    console.info(`${err.message}. Attempting get fresh token.`)
                    return this.translate( text, langFrom, langTo, true)
                } else {
                    console.error(err.message)
                    throw err
                }
            })
    }
}

/**
 *
 * @returns {Promise}
 * @this {LingvoApi}
 */
function getToken(forceGetToken = false) {
    if (!forceGetToken && this.token) return Promise.resolve(this.token)

    return new Promise((success) => {

        const xhr = new XMLHttpRequest()
        xhr.withCredentials = true

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText)
                success(this.responseText)
            }
        })

        xhr.open("POST", `${SERVICE_URL}/api/v1.1/authenticate`)
        xhr.setRequestHeader("authorization", `Basic ${API_KEY}`)

        xhr.send(null)
    })
}

function translate(token, text, langFrom = 'de', langTo = 'ru') {
    return new Promise((success, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText)
                }
            })

            xhr.open("GET", encodeURI(`${SERVICE_URL}/api/v1/Translation?text=${text}&srcLang=${getLanguageCode(langFrom)}&dstLang=${getLanguageCode(langTo)}`))
            xhr.setRequestHeader("authorization", `Bearer ${token}`)
            xhr.setRequestHeader("cache-control", "no-cache")

            xhr.send(null)

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return

                if (xhr.status === 200) {
                    success(xhr.responseText) }
                else if (xhr.status === 401) {
                    const err = new Error('Token is expired')
                    err.code = 401
                    reject(err)
                } else {
                    reject(new Error(`Ошибка при получении перевода: ${xhr.status}`))
                }
            }
        }
    )
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


// const api = new LingvoApi()
// api.translate('machen', 'de', 'ru')
//     .then(text => {
//         console.log(`translated: ${JSON.stringify(text)}`)
//     })
//     .catch(err => {
//             console.error(`error: ${err}`)
//         }
//     )

