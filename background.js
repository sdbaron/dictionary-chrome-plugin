
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.error(`chrome.runtime.onMessage.addListener`)
    const { type } = request
    if (type === 'fetch') {
        fetch(request.input, request.init).then(function(response) {
            return response.text().then(function(text) {
                sendResponse([
                    {
                        body: text,
                        status: response.status,
                        statusText: response.statusText,
                    }, null
                ]);
            });
        }, function(error) {
            sendResponse([null, error]);
        });
    } else if (type === 'dynamoDB') {
    }
    return true;
});
