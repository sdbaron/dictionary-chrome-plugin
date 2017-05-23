'use strict';
const Mustache=require('mustache');
import cardTemplate from './card.mst';
import './card.scss';

// (function() {
//     window.SDBDictionary || (window.SDBDictionary = {});
//     window.SDBDictionary.Yandex || (window.SDBDictionary.Yandex = {});
//
//     window.SDBDictionary.Yandex.Presenter = {
//         /**
//          * Форматирует результат перевода в html
//          * @param {string} text Результат перевода
//          * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
//          */
//         renderView: function (text, parentElement) {
//             const data = JSON.parse(text);
//
//             parentElement.innerHTML = text;
//
//         },
//
//         clearView(parentElement){
//             parentElement.innerHTML = '';
//         }
//
//     };
//
//     function getDef(data){
//
//     }
//
//     function getHtml(data){
//         let result = '';
//         for(let def of data['def']){
//             // что перводили
//             const text = def.text;
//             // какая часть речи у переводимого слова
//             const pos = def.pos;
//             for (let translate of def['tr']){
//                 // перевод
//                 const trText = translate.text;
//                 // часть речи
//                 const trPos = translate.pos;
//
//             }
//         }
//         let msg = '';
//     }
// })();

class Presenter{
    /**
     * Форматирует результат перевода в html
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет всатвлен результат
     */
    renderView(text, parentElement) {
        const data = JSON.parse(text);

        parentElement.innerHTML = getHtml(data);

    }

    clearView(parentElement){
        parentElement.innerHTML = '';
    }

}

export default Presenter;

function getDef(data){

}

function getHtml(data){
    return Mustache.render(cardTemplate, data);

}