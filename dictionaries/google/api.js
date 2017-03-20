window.SDBDictionary || (window.SDBDictionary = {});
window.SDBDictionary.Api || (window.SDBDictionary.Api = {});

window.SDBDictionary.Api.Google = {
    translate: function( text, langFrom='de', langTo='ru' ) {
        return new Promise((success, reject) => {
                let xhr = new XMLHttpRequest();
                let request=`https://translate.google.ru/translate_a/t?client=sd&text=${text}&hl=ru&sl=${langFrom}&tl=${langTo}`;
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
        return text;

    }

};


