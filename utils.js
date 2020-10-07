export function fetchResource(input, init) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({type: 'fetch', input, init}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        // Use undefined on a 204 - No Content
        const body = response.body ? new Blob([response.body]) : undefined;
        resolve(new Response(body, {
          status: response.status,
          statusText: response.statusText,
        }));
      }
    });
  });
}

export function getDB() {
  return new Promise((resolve, reject) => {
    // chrome.tabs.executeScript({file: 'aws-sdk-2.7.16.js'});
    // resolve(`AWS=${window.AWS}`)
    chrome.runtime.sendMessage({type: 'dynamoDB'}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        // Use undefined on a 204 - No Content
        resolve(response)
      }
    });
  });
}
