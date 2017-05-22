'use strict';
window.SDBDictionary || (window.SDBDictionary = {});
window.SDBDictionary.Yandex || (window.SDBDictionary.Yandex = {});

window.SDBDictionary.Yandex.Presenter = {
    /**
     * Форматирует результат перевода в html
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
     */
    renderView: function (text, parentElement) {
        const data = JSON.parse(text);
        parentElement.innerHTML = text;

    },

    clearView(parentElement){
        parentElement.innerHTML = '';
    }
};


