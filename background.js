let Code = {

};

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //document.forms[0].querySelector('input[type="submit"]').addEventListener('click', function(e){
    //   e || ( e = window.event);
    //   e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    //   e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    //});

    document.forms[0].addEventListener('click', function(e){
        e || ( e = window.event);
        const target = e.target || e.srcElement;
        if (!document.forms[0].isRed.checked && target.matches('input[type="submit"]')) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        }
    });
    const xhr = new XMLHttpRequest();

    (xhr.addEventListener || xhr.attachEvent).call(xhr, 'readystatechange', function() {
       if (this.readyState != 4) return;

       if (this.status !== 200){
           console.error(`Ошибка ${this.status} : ${this.statusText}`);
       }

       alert(this.responseText);
    });
    xhr.error = function(data){
      console.dir(data);
    };

    xhr.open('POST', 'https://yandex.ru/search/');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    let f = new FormData(document.forms[0]);
    xhr.send(f);
});
