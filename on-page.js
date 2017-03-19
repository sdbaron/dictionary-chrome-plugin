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
        let selectedText = window.getSelection().toString();
        if (selectedText) {
            // const message = `${event.pageX}:${event.pageY} => ${selectedText} `;
            // showMessage(message);
            getTranslate(selectedText, event.pageY, event.pageX);
        }
    }

    function getTranslate(text, top, left) {

        popup.showLoadingBar(text, event.pageY, event.pageX);
        window.SDBDictionary.Api.Yandex.translate(text, 'de', 'ru')
            .then(translated => setTimeout(() => popup.show(translated, top, left), 1000))
            .catch(error => {
                console.error(error.message);
                popup.hide();
            });
    }
})();

