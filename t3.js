const init = {
  method: 'get',
  // mode: 'cors',
  // credentials: 'omit'
}

const input = 'https://ru.forvo.com/word/rechtsanwaltskanzlei'
fetch(input, init).then(function(response) {
  return response.text().then(function(text) {
    console.log(`response.status=${response.status}`)
    // sendResponse([{
    //   body: text,
    //   status: response.status,
    //   statusText: response.statusText,
    // }, null]);
  });
}, function(error) {
  debugger
  // console.error(error)
  // sendResponse([null, error]);
});

// window.onerror = function(event) {
//   debugger
// }
//
// const img = document.createElement('img')
// img.onerror = function(e){
//   debugger
// }
// img.src = input


// Cross-Origin Read Blocking (CORB) blocked cross-origin response https://ru.forvo.com/word/rechtsanwaltskanzlei/ with MIME type text/html. See https://www.chromestatus.com/feature/5629709824032768 for more details.
