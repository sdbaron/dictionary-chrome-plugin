
console.log('iframe start')

function getMessage(event) {
  const { origin, data } = event || {}
  console.log(`IFRAME getMessage() origin=${origin} data=${data && JSON.stringify(data, null, 2)}`)
  const { action, value } = data
  switch (action) {
    case 'getSessionId':
      setTimeout(() => {

        const pairs = document.cookie.split(';')
        let sessionId = getSession()
        if (!sessionId && value === true) {
          sessionId = createUId()
          setSession(sessionId)
        }
        window.parent.postMessage({ sessionId }, '*')
      })
      break;
    case 'setSessionId':
      setSession(value)
      break
  }
}

function onPageLoad() {
  window.addEventListener('message', getMessage)
  window.parent.postMessage('', '*')
  window.parent.postMessage('Hello from inside iframe', '*')
  console.log('iframe onPageLoad')
}

if (window.document.readyState === 'complete') onPageLoad()
else window.addEventListener('load', onPageLoad)

const SessionIdName = '__dcp_sid'

function getSession() {
  const pairs = document.cookie.split(';')
  let sessionId
  pairs && pairs.some(p => {
    const [name, val] = p.split('=')
    if (name.trim() === SessionIdName) {
      sessionId = val
      return true
    }
  })
  return sessionId
}

function setSession(value) {
  value && (document.cookie = `${SessionIdName}=${value}; SameSite=None;`)
}

function createUId(cc = 3) {
  const getChunk = (radix= 16) => Math.random().toString(radix).substring(2)
  let id = ''
  for(let i = 0; i < cc; i++) {
    id += getChunk()
  }
  return id
}
