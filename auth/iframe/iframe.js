
window.addEventListener('message', getMessage)

function getMessage(event) {
  const { origin, data } = event || {}
  console.log(`getMessage() origin=${origin} data=${data}`)
}

function postMessage(data, targetOrigin = '*') {
  window.postMessage(data, targetOrigin)
}

window.parent.postMessage('Hello from inside iframe', '*')
