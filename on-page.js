(function() {

    const ns = window.SDBYandexDict;
    const showMessage = ns.showMessage;
    const popup = ns.popup;

    init();

    function init() {
        //
        // showMessage("<b>Ok, lets begin!</b>");
        console.warn("I am here");
        document.addEventListener("dblclick", clickEventHandler);
    }

    function clickEventHandler(event) {
        const target = event.target;
        if (!event.ctrlKey && !event.metaKey) return;

        // let style = getComputedStyle(target);

        let selectedText = window.getSelection().toString();
        if (selectedText) {
            const message = `${event.pageX}:${event.pageY} => ${selectedText} `;
            // showMessage(message);
            getTranslate(selectedText, event.pageY, event.pageX);
        }
    }

    function getTranslate(text, top, left ){
        let xhr = new XMLHttpRequest();
        const personalKey = 'dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958';
        const langFrom = 'de';
        const langTo = 'ru';
        //let request=`https://translate.google.ru/translate_a/t?client=sd&text=${text}&hl=ru&sl=${langFrom}&tl=${langTo}`;
        let request = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${personalKey}&lang=${langFrom}-${langTo}&text=${text}&flags=4`;
        xhr.open('GET', request, true);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status == 200){
                popup.show(xhr.responseText, top, left);
            } else {
                console.error('ошибка');
            }
        }
    }
})();

