"use strict";

import './display.scss';

let messageElement = document.createElement('div');
document.body.insertBefore(messageElement, document.body.firstChild);

// const SDBDisplay = {
//     // showMessage: function (message) {
//     //     messageElement.innerHTML = message;
//     // },
//     Popup: Popup
// };

/**
 *
 * @param {[translate.<function>, renderView.<function>]} apis
 * @returns {{show: show, hide: hide, showLoadingBar: showLoadingBar, hideLoadingBar: hideLoadingBar}}
 * @constructor
 */
function Popup(apis) {
    let popupElement;
    let loadingBar;
    let header;
    let body;
    /**
     * @returns enum
     *
     */
    return {
        show: show,
        hide: hide,
        isVisible: isVisible,
        showLoadingBar: showLoadingBar,
        hideLoadingBar: hideLoadingBar
    };

    /**
     * @param {string|null} message -
     * @param {number} [top] -
     * @param {number} [left] -
     */
    function show(message, top, left) {
        if (!popupElement) {
            create();
        }
        setPopupPosition(top, left);

        hideLoadingBar();
        const apiPromises = apis.map(api => {
            return api.translator.translate(message, 'de', 'ru')
                .then(text => api.presenter.renderView(text, body))
        });

        return Promise.all(apiPromises).then(() => {
            popupElement.classList.remove('sdb-popup_hide');
            return true;
        })

    }

    function showLoadingBar(text, top, left) {
        if (!popupElement) {
            create();
        }

        popupElement.classList.add('sdb-popup_loading');
        setPopupPosition(top, left);
        loadingBar.innerHTML = `Ищем перевод слова ${text}...`;
        apis.forEach(api => api.presenter.clearView(body));
    }

    function setPopupPosition(srcTop, left) {
        // try set popup under te selected word
        let top = srcTop + 10;
        popupElement.style.top = !top ? 0 : (top + 'px');
        popupElement.style.left = !left ? 0 : (left + 'px');
    }

    function hideLoadingBar() {
        popupElement.classList.remove('sdb-popup_loading');
    }

    function displayMessage(text, parentElement) {
        parentElement.innerHTML = text;
    }

    function hide() {
        if (popupElement) {
            popupElement.classList.add(popupHiddenCssClass);
        }
    }

    function isVisible(){
        return popupElement && !popupElement.classList.contains(popupHiddenCssClass);
    }

    function create() {
        const p = popupElement = document.createElement('div');
        p.classList.add('sdb-popup');

        loadingBar = document.createElement('div');
        loadingBar.classList.add('sdb-popup__loading-bar');
        loadingBar.innerHTML = 'Loading...';
        p.appendChild(loadingBar);
        // p.addEventListener('click', () => hide());

        header = document.createElement('div');
        header.classList.add('sdb-popup__header');
        p.appendChild(header);
        // header.addEventListener('click', () => hide());

        body = document.createElement('div');
        body.classList.add('sdb-popup__body');
        p.appendChild(body);

        document.body.appendChild(p);
    }
}

Popup.getRootCssClass = () => rootPopupCssClass;

export default Popup;

const popupHiddenCssClass = 'sdb-popup_hide';
const rootPopupCssClass = 'sdb-popup';