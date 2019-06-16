const SERVICE_URL = 'https://developers.lingvolive.com'
const API_KEY = 'MzA1OTMzZjktNzY3OC00MTM4LTkzNTQtOWFiZjRhNWNiY2NkOjhjZmYwZTAyYWY2ODQ5ZmU5YjQ2YTA2NDFmMGYwNGEw'
const input = `${SERVICE_URL}/api/v1.1/authenticate`
const init = {
  method: 'POST',
  credentials: 'include',
  headers: {
    authorization: `Basic ${API_KEY}`
}
}
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
  console.error(error)
  // sendResponse([null, error]);
});
