'use strict'
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

    return fetchResource(request, { method: 'GET' }).then(response => response.text())
  }
}

