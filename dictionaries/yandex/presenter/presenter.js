'use strict';
// import './card.scss';

class Presenter {
    /**
     *
     * @param {function} TextConverter -
     */
    constructor(TextConverter){
        this.textConverter = TextConverter;
    }
    /**
     * Форматирует результат перевода в html
     * @param {string} text Результат перевода
     * @param {HTMLElement} parentElement Элемент, в котрый будет вставлен результат
     */
    renderView(text, parentElement, srcLng, tgtLng, processTranslate ) {
        const data = JSON.parse(text);

        const cardContent = this.textConverter.getHtml(data, parentElement);
        if (cardContent) {
            parentElement.innerHTML = cardContent;
        }

        const cardDefinitionElement = document.querySelector('.sdb-popup-card-defs');
        const exampleToggleElement = parentElement.querySelector('.sdb-popup-card-def__examples-toggle');
        if (exampleToggleElement) {
            exampleToggleElement.addEventListener('click', () => {
                cardDefinitionElement.classList.toggle('examples-expanded');
            });
        }

        if (exampleToggleElement && (!cardDefinitionElement || !cardDefinitionElement.querySelector('.sdb-popup-card-example'))){
            exampleToggleElement.style.display = 'none';
        }

        let linksToTranslate = parentElement.querySelectorAll('.sdb-popup-card-mean-href');
        for( let link of linksToTranslate){
            link.addEventListener('click', event => {
                event.preventDefault();
                processTranslate(link.innerHTML, srcLng, tgtLng);
            })
        }

        linksToTranslate = parentElement.querySelectorAll('.sdb-popup-card-translate-text, .sdb-popup-card-synonym-list__item-text');
        for( let link of linksToTranslate){
            link.addEventListener('click', event => {
                event.preventDefault();
                processTranslate(link.innerHTML, tgtLng, srcLng);
            })
        }

        (function f() {
            let gens = parentElement.querySelectorAll('.cart-marks__gen');
            [].forEach.call(gens, gen => {
                let hint = getHint(gen.innerText);
                if (hint) {
                    gen.setAttribute('title', hint);
                }
            });

            function getHint(value) {
                switch (value) {
                    case 'm':
                    case 'м':
                        return 'Мужской род';
                    case 'ж':
                    case 'f':
                        return 'Женский род';
                    case 'ср':
                    case 'n':
                        return 'Средний род';
                    default:
                        return 'Неизвестно!'
                }
            }
        })()

    }

    clearView(parentElement) {
        parentElement.innerHTML = '';
    }

}

export default Presenter;
