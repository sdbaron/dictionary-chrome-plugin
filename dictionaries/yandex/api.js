window.SDBDictionary || (window.SDBDictionary = {});
window.SDBDictionary.Api || (window.SDBDictionary.Api = {});

window.SDBDictionary.Api.Yandex = {
    /**
     * Возвращает промис с переводом текста
     * @param {string} text Переводимый текст
     * @param {string} langFrom Двухсимвольное обозначение исходного языка
     * @param {string} langTo Двухсимвольное обозначение целвого языка
     * @returns {Promise<string>} Промис результата перевода
     */
    translate: function (text, langFrom = 'de', langTo = 'ru') {
        return new Promise((success, reject) => {
                let xhr = new XMLHttpRequest();
                const personalKey = 'dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958';
                //let request=`https://translate.google.ru/translate_a/t?client=sd&text=${text}&hl=ru&sl=${langFrom}&tl=${langTo}`;
                let request = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${personalKey}&lang=${langFrom}-${langTo}&text=${text}&flags=4`;
                xhr.open('GET', request, true);
                xhr.send();

                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) return;

                    if (xhr.status == 200) {
                        success(xhr.responseText);
                    } else {
                        reject(new Error(`Ошибка при получении перевода: ${xhr.status}`));
                    }
                }
            }
        )
    },

    /**
     * Форматирует результат перевода в html
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
     */
    toHtml: function (text, parentElement) {
        'use strict';
        const data = JSON.parse(text);

    }

};


