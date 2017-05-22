'use strict';

window.SDBDictionary || (window.SDBDictionary = {});
window.SDBDictionary.Google || (window.SDBDictionary.Google = {});

window.SDBDictionary.Google.Presenter = {
    /**
     * Форматирует результат перевода в html
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
     */
    renderView: function (text, parentElement) {
        parentElement.innerHTML = text;
    },

    clearView(parentElement){
        parentElement.innerHTML = '';
    }
};


