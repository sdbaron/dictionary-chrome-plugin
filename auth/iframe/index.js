
console.log('iframe start')

function getMessage(event) {
  const { origin, data } = event || {}
  console.log(`IFRAME getMessage() origin=${origin} data=${data}`)
  const { action, value } = data
  switch (action) {
    case 'getSessionId':
      setTimeout(() => {
        const pairs = document.cookie.split(';')
        pairs && pairs.forEach(p => {
          const [name, val] = p.split('=')
          if (name === 'sid') {
            window.parent.postMessage({ sessionId: val }, '*')
          }
        })
      })
      break;
    case 'setSessionId':
      value && (document.cookie = `sid=${value}`)
      break

  }
}

function onPageLoad() {
  window.addEventListener('message', getMessage)
  window.parent.postMessage('', '*')
  window.parent.postMessage('Hello from inside iframe', '*')
}

if (window.document.readyState === 'complete') onPageLoad()
else window.addEventListener('load', onPageLoad)

function getSession() {

}

function setSession(data) {

}
