// let Code = {
//
// };

// document.addEventListener('DOMContentLoaded', () => {
//     'use strict';
//     //document.forms[0].querySelector('input[type="submit"]').addEventListener('click', function(e){
//     //   e || ( e = window.event);
//     //   e.preventDefault ? e.preventDefault() : (e.returnValue = false);
//     //   e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
//     //});
//
//     document.forms[0].addEventListener('click', function(e){
//         e || ( e = window.event);
//
//         const target = e.target || e.srcElement;
//         let form = target.closest('.main-form');
//         if (form){
//             form.style.backgroundColor = 'green';
//         }
//         if (!document.forms[0].isRed.checked && target.matches('input[type="submit"]')) {
//             e.preventDefault ? e.preventDefault() : (e.returnValue = false);
//             e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
//         }
//     });
//     let xhr = new XMLHttpRequest();
//
//     (xhr.addEventListener || xhr.attachEvent).call(xhr, 'readystatechange', function() {
//        if (this.readyState != 4) return;
//
//        if (this.status !== 200){
//            console.error(`Ошибка ${this.status} : ${this.statusText}`);
//        }
//
//        alert(this.responseText);
//     });
//     xhr.error = function(data){
//       console.dir(data);
//     };
//
//     xhr.open('GET', 'https://yandex.ru/search/');
//     // xhr.setRequestHeader('Origin', 'localhost');
//
//     let f = new FormData(document.forms[0]);
//     xhr.send(f);
//
//     let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//     xhr = new XHR();
//
// // (2) запрос на другой домен :)
//     xhr.open('GET', 'http://yandex.ru/search/?text=xmlhttpreqest', true);
//     // xhr.setRequestHeader('Origin', 'localhost');
//
//     xhr.onload = function() {
//         // alert( this.responseText );
//     };
//
//     xhr.onerror = function() {
//         alert( 'Ошибка ' + this.status );
//     };
//
//     xhr.send();
// });
//

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.error(`chrome.runtime.onMessage.addListener`)
    fetch(request.input, request.init).then(function(response) {
        return response.text().then(function(text) {
            sendResponse([{
                body: text,
                status: response.status,
                statusText: response.statusText,
            }, null]);
        });
    }, function(error) {
        sendResponse([null, error]);
    });
    return true;
});
