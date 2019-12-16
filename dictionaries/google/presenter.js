'use strict';

window.SDBDictionary || (window.SDBDictionary = {});
window.SDBDictionary.Google || (window.SDBDictionary.Google = {});

window.SDBDictionary.Google.Presenter = {
    /**
     * Форматирует результат перевода в html
     * @param {string} srcText переводимое тече
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
     */
    renderView: function (srcText, text, parentElement) {
        parentElement.innerHTML = text;
    },

    clearView(parentElement){
        parentElement.innerHTML = '';
    }
};


