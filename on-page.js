(function () {

    const ns = window.SDBDisplay;
    const popup = ns.popup;

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

        // let style = getComputedStyle(target);
        let sel = window.getSelection();
        let selectedText = sel.toString();
        let rect = getRangeFromSelection(event.pageX, event.pageY);
        if (rect) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let top = rect.bottom + scrollTop;
            let left = rect.left + scrollLeft - 20;
            let right = left + 500;
            let widthOver = right - document.documentElement.clientWidth;
            if (widthOver > 0){
                left -= widthOver + 20;
                if (left < 0){
                    left += widthOver / 2;
                }
            }

            getTranslate(selectedText, top, left /*event.pageY, event.pageX*/);
        }
    }

    function getTranslate(text, top, left) {

        popup.showLoadingBar(text, top, left);
        // window.SDBDictionary.Api.Google.translate(text, 'de', 'ru')
        window.SDBDictionary.Api.Yandex.translate(text, 'de', 'ru')
            .then(translated => popup.show(translated, top, left))
            // .then(translated => setTimeout(() => popup.show(translated, top, left), 1000))
            .catch(error => {
                console.error(error.message);
                popup.hide();
            });
    }

    function getRangeFromSelection(x, y) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let sel = window.getSelection();
        let selectedText = sel.toString();
        if (selectedText) {
            const rangeCount = sel.rangeCount;
            x -= scrollLeft;
            y -= scrollTop;
            for (let i = 0; i < rangeCount; i++) {
                let range = sel.getRangeAt(i);
                let text = range.toString();
                // выберем регион, в котором встречается выделенное слово
                if (~text.indexOf(selectedText)) {
                    // и координаты указателя лежат в границах этого региона
                    let rect = range.getBoundingClientRect();
                    if ( x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        // return range;
                        return text === selectedText ? rect : getInfoFromRange(range);
                    }
                }
            }
        }

        return null;

        function getInfoFromRange(range){
            let rect = range.getBoundingClientRect();
            let text = range.toString();
            let ind = text.indexOf(selectedText);
            // если выделенный текст не в начале региона, тогда нужно найти смещение
            let startPos = 0;
            if (ind > 0){
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

        function getTextLength(text){
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


























