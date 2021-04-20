import { getDB } from '../dynamoDB'

// const userIdKey = 'dspUserId'
const defaultEmail = 'default.user@gmail.com'

const fieldEmailName = 'Email'
const fieldPasswordName = 'Password'

const userDataKey = 'dcpUserData'

export default function getCurrentUserData() {
    return new Promise(resolve => {
        chrome.storage.local.get([userDataKey], function(result) {
            const d = result && result[userDataKey] && result[userDataKey].Item || {}
            let email = d[fieldEmailName]
            let promiseGetData
            if (!email) {
                email = defaultEmail
                promiseGetData = getUserData(email)
                    .then(setCurrentUserData)
            } else {
                promiseGetData = Promise.resolve(d)
            }
            promiseGetData.then(data => resolve(data))
        })

    })
}

function setCurrentUserData(data) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set({ [userDataKey]: data || {} }, function() {
                console.log('Value is set to ' + data)
                resolve(data)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getUserData(email, password) {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => {
                // debugger
                db.getData(email)
                    .then(data => {
                        console.warn(`d=${JSON.stringify(data, null, 2)}`)
                        const { Password: pw } = data
                        if (password && pw !== password) reject(Error('Invalid email or password'))
                        resolve(data)
                    })
                    .catch(err => {
                        console.error(err)
                        reject(err)
                    })
            })
    })
}

export function updateCurrentUserData() {
    return new Promise((resolve, reject) => {
        getCurrentUserData()
            .then(data => {
                const email = data && data[fieldEmailName]
                const { tgt, src } = data || {}

                getDB()
                    .then(db => {
                        // debugger
                        db.updateData(email, tgt, src)
                            .then(data => {
                                resolve(data)
                            })
                            .catch(err => {
                                console.error(err)
                                reject(err)
                            })
                    })
            })
    })
}

export function logout() {
    return new Promise((resolve, reject) => {
        try {
            const data = { [fieldEmailName]: defaultEmail }
            chrome.storage.local.set({ [userDataKey]: data }, function() {
                updateCurrentUserData()
                    .then(data => resolve(data))
            })
        } catch (err) {
            reject(err)
        }
    })
}
