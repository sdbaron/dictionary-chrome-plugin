(function () {
    let messageElement = document.createElement('div');
    document.body.insertBefore(messageElement, document.body.firstChild);

    window.SDBDisplay = {
        showMessage: function (message) {
            messageElement.innerHTML = message;
        },
        popup: new Popup

    };

    function Popup() {
        let popupElement;
        let loadingBar;
        let header;
        let body;

        return {
            show: show,
            hide: hide,
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

            displayMessage(message);

            popupElement.classList.remove('sdb-popup_hide');

        }

        function showLoadingBar(text, top, left) {
            show(null, top, left);
            loadingBar.innerHTML = `Ищем перевод слова ${text}...`;
            popupElement.classList.add('sdb-popup_loading');
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

        function displayMessage(message) {
            body.innerHTML = message;
        }

        function hide() {
            if (popupElement) {
                popupElement.classList.add('sdb-popup_hide');
            }
        }

        function create() {
            const p = popupElement = document.createElement('div');
            p.classList.add('sdb-popup');

            loadingBar = document.createElement('div');
            loadingBar.classList.add('sdb-popup__loading-bar');
            loadingBar.innerHTML = 'Loading...';
            p.appendChild(loadingBar);
            p.addEventListener('click', () => hide());

            header = document.createElement('div');
            header.classList.add('sdb-popup__header');
            p.appendChild(header);
            p.addEventListener('click', () => hide());

            body = document.createElement('div');
            body.classList.add('sdb-popup__body');
            p.appendChild(body);

            document.body.appendChild(p);
        }

    }
})();