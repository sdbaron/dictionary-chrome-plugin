/**
 *  Инициализация popop, подписвываемся на двойной клик, во время клика получаем выделенный текст и его координаты,
 *  вычисляем координаты всплывающего окна и открываем его
 *
 */
(function () {

    const ns = window.SDBDisplay;

    const popup = new ns.Popup([
        {
            translator: window.SDBDictionary.Yandex.Api,
            presenter: window.SDBDictionary.Yandex.Presenter
        }
    ]);

    init();


    function init() {
        //
        // showMessage("<b>Ok, lets begin!</b>");
        // loadDictionaryApi('chrome-extension://__MSG_@@extension_id__/dictionaries/yandex/api.js');
        console.warn("I am here");
        document.addEventListener("dblclick", clickEventHandler);
    }

    // function loadDictionaryApi(path) {
    //     let script = document.createElement('script');
    //     script.src = path;
    //     document.head.appendChild(script);
    // }
    //

    function clickEventHandler(event) {
        // const target = event.target;
        if (!event.ctrlKey && !event.metaKey) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // let style = getComputedStyle(target);
        let sel = window.getSelection();
        let selectedText = sel.toString();
        let rect = getRangeFromSelection(event.pageX - scrollLeft, event.pageY - scrollTop);
        if (rect) {
            let top = rect.bottom + scrollTop;
            let left = rect.left + scrollLeft - 20;
            let right = left + 500;
            let widthOver = right - document.documentElement.clientWidth;
            if (widthOver > 0) {
                left -= widthOver + 20;
                if (left < 0) {
                    left += widthOver / 2;
                }
            }

            getTranslate(selectedText, top, left);
        }
    }

    function getTranslate(text, top, left) {

        popup.showLoadingBar(text, top, left);
        popup.show(text, top, left).catch(
            error => {
                console.error(error.message);
                popup.hide();
            });
    }

    function getRangeFromSelection(x, y) {
        let sel = window.getSelection();
        let selectedText = sel.toString().trim();
        if (selectedText) {
            const rangeCount = sel.rangeCount;
            for (let i = 0; i < rangeCount; i++) {
                let range = sel.getRangeAt(i);
                let text = range.toString().trim();
                // выберем регион, в котором встречается выделенное слово
                if (~text.indexOf(selectedText)) {
                    // и координаты указателя лежат в границах этого региона
                    let rect = range.getBoundingClientRect();
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        // return range;
                        return text === selectedText ? rect : getInfoFromRange(range);
                    }
                }
            }
        }
        // нет совпадений
        return null;

        function getInfoFromRange(range) {
            let rect = range.getBoundingClientRect();
            let text = range.toString();
            let ind = text.indexOf(selectedText);
            // если выделенный текст не в начале региона, тогда нужно найти смещение
            let startPos = 0;
            if (ind > 0) {
                let startPos = getTextLength(text.substr(0, ind));
            }
            let width = getTextLength(selectedText);

            return {
                left: rect.x + startPos,
                width: width,
                right: rect.x + startPos + width,
                top: rect.y,
                height: rect.height,
                bottom: rect.bottom
            }

        }

        function getTextLength(text) {
            let parentElement = sel.anchorNode.parentElement;
            let clone = parentElement.cloneNode(false);
            clone.innerHTML = text;
            clone.style.top = '-10000px';
            clone.style.left = '-10000px';
            clone.style.position = 'absolute';
            let container = parentElement;
            if (container.parentElement) container = container.parentElement;
            container.appendChild(clone);
            const width = clone.clientWidth;
            container.removeChild(clone);
            return width;
        }
    }

})();