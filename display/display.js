(function () {
    let messageElement = document.createElement('div');
    document.body.insertBefore(messageElement, document.body.firstChild);

    window.SDBYandexDict = {
        showMessage: function (message) {
            messageElement.innerHTML = message;
        },
        popup: new Popup

    };

    function Popup() {
        let popupElement;
        let header;
        let body;

        /**
         * @param {string} message -
         * @param {number} [srcTop] -
         * @param {number} [left] -
         */
        function show(message, srcTop, left) {
            if (!popupElement) {
                create();
            }
            let top = srcTop + 20;
            popupElement.style.top = !top ? 0 : (top + 'px');
            popupElement.style.left = !left ? 0 : (left + 'px');

            displayMessage(message);

            popupElement.classList.remove('sdb-popup_hide');
        }

        function displayMessage(message){
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

            header = document.createElement('div');
            header.classList.add('sdb-popup__header');
            p.appendChild(header);
            p.addEventListener('click', () => hide());

            body = document.createElement('div');
            body.classList.add('sdb-popup__body');
            p.appendChild(body);

            document.body.appendChild(p);
        }

        return {
            show: show,
            hide: hide
        }
    }


})();