'use strict'
// window.SDBDictionary || (window.SDBDictionary = {});
// window.SDBDictionary.Yandex || (window.SDBDictionary.Yandex = {});
//
// window.SDBDictionary.Yandex.Api = {
import { fetchResource } from "../../utils"

const REG = 'yandexApiCallbackRegistry'
export default class YandexApi {
  constructor() {
    this.callbackCounter = 0
    window[REG] || (window[REG] = {})
  }

  /**
   * Возвращает промис с переводом текста
   * @param {string} text Переводимый текст
   * @param {string} langFrom Двухсимвольное обозначение исходного языка
   * @param {string} langTo Двухсимвольное обозначение целвого языка
   * @returns {Promise<string>} Промис результата перевода
   */
  translate(text, langFrom = 'de', langTo = 'ru') {
    // let xhr = new XMLHttpRequest();
    //let request=`https://translate.google.ru/translate_a/t?client=sd&text=${text}&hl=ru&sl=${langFrom}&tl=${langTo}`;
    const dictionaryKey = 'dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958'
    let request = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${dictionaryKey}&lang=${langFrom}-${langTo}&text=${text}&flags=4`
    // const translateKey = 'trnsl.1.1.20170520T132215Z.0b9839920231de8d.ab7ce95a4c5deeae64928bc39640507c474c890f';
    // let request = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&lang=${langFrom}-${langTo}&text=${text}`;
    // xhr.open('GET', request, true);
    // xhr.send();

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState !== 4) return;
    //
    //     if (xhr.status === 200) {
    //         success(xhr.responseText);
    //     } else {
    //         reject(new Error(`Ошибка при получении перевода: ${xhr.status}`));
    //     }
    // }
    debugger
    fetchResource('https://ru.forvo.com/word/rechtsanwaltskanzlei', {
      method: 'GET',
      credentials: 'include',
    }).then(function(data){
      return data.clone().text()
    }).then( d => {
      debugger
    })
      .catch(error=>
      console.error(error && error.message || error)
    )


    return fetchResource(request, {
      method: 'GET',
      // credentials: 'include',
      // mode: 'cors',
    }).then(response => response.text())
    // return fetch(request, {
    //   method: 'GET',
    //   // credentials: 'include',
    //   // mode: 'cors',
    // }).then(response => response.text())
    // return this.getByJSONP(request)
  }

  getByJSONP(request) {
    const callbackName = `ycb${this.callbackCounter++}`
    return new Promise((resolve, reject) => {
      window[REG][callbackName] = (data) => {
        resolve(data)
      }
      console.log(`window[${REG}][${callbackName}] = ${window[REG][callbackName]}`)
      const script = document.createElement('script')
      script.src = request // `${request}&callback=window.${REG}.${callbackName}`
      script.onload = () => {
        console.log(`onload: window[${REG}][${callbackName}] = ${window[REG][callbackName]}`)
        debugger
      }
      document.body.appendChild(script)
    })
  }

}

// export default Api;
// };


