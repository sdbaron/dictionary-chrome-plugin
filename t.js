// const request = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958&lang=de-ru&text=sagen&flags=4'
// fetch(request, {
//   method: 'GET',
//   // credentials: 'include',
//   // mode: 'cors',
// }).then(response => {
//   // console.log(`response.text()=${response.text()}`)
//   return response.text()
// }).then(text => {
//   console.log(`text=${text}`)
// })
// function myCallback(d) {
//
// }
// const src = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958&lang=de-ru&text=sagen&flags=4'
// const script = document.createElement('script')
// script.src = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170204T094736Z.4a8cda8b35129593.50f7488e10edade7598f506c52a1ab431d8e1958&lang=de-ru&text=sagen&flags=4&callback=myCallback'


window.onerror = function(event) {
  debugger
}

const src = 'https://ru.forvo.com/word/rechtsanwaltskanzlei/#de'
const REG = 'REG'
getByJSONP(src)
  .then(d => {

  })
  .catch(error => {
    debugger
  })

// script.onload = () => {
//   debugger;
// }
function getByJSONP(request) {
  window[REG] = {}
  const callbackName = `ycb${this.callbackCounter++}`
  return new Promise((resolve, reject) => {
    window[REG][callbackName] = (data) => {
      console.log(`DATA IS READY`)
      resolve(data)
    }

    // console.log(`window[${REG}][${callbackName}] = ${window[REG][callbackName]}`)
    const script = document.createElement('script')
    script.src = `${request}&callback=window.${REG}.${callbackName}`
    script.onload = () => {
      debugger
      // console.log(`onload: window[${REG}][${callbackName}] = ${window[REG][callbackName]}`)
    }
    script.onerror = function(error) {
      debugger
    }
    document.body.appendChild(script)
  })
}

// document.body.appendChild(script)
