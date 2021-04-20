import getCurrentUserData from './auth/userData'

(() => {
    let root = document.getElementById("main");
    getCurrentUserData()
        .then(data => {
            console.warn(`data: ${data}`)
            root.innerHTML = `${JSON.stringify(data, null, 2)}`;
        })
        .catch(err => {
            console.error(`Error: ${err}`)
        })
}) ()
