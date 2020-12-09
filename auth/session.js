const MODULE_ID = 'DCN_Session'
const sessionIframeId = '__dcp_session_iframe'
const iframeSrc = 'https://lancinate-meridian.000webhostapp.com'

export default class Session {
  init() {
    let iframe = document.getElementById(sessionIframeId)
    iframe || (iframe = this.createIframe())

    this.iframe = iframe.contentWindow || iframe

    const iframeOrigin =iframeSrc.endsWith('/') ? iframeSrc.endsWith('/').slice(0, -1) : iframeSrc

    window.addEventListener('message', (event) => {
      const { origin, data } = event
      // console.log(`data from iframe=${JSON.stringify(data, null, 2)} origin=${origin}`)
      if (origin === iframeOrigin) {
        // data && console.log(`!!! data from iframe=${JSON.stringify(data, null, 2)} origin=${origin}`)
        if (data && data.sessionId && this.awaitResult) {
          this.awaitResult.resolve(data.sessionId)
        }
        if (data && data.handshake === 'DCN_Session_iframe') {
          this.awaitReady && this.awaitReady.resolve()
        }
      }
    })

  }

  getSessionId(canGenerate = true) {
    return this.iframeIsReady()
      .then(() => {
        this.awaitResult = new Deferred()
        this.iframe.postMessage({ action: 'getSessionId', value: canGenerate }, '*')
        return this.awaitResult.promise
          .then(res => {
            this.awaitResult = null
            return res
          })
      })
  }

  setSessionId(value) {
    this.iframeIsReady()
      .then(() => this.iframe.postMessage({ action: 'setSessionId', value }, '*'))
  }

  createIframe() {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    iframe.src = iframeSrc
    this.iframeIsReady()
    return iframe
  }

  iframeIsReady() {
    const { _iframeIsHandshaked, iframe } = this

    if (!_iframeIsHandshaked && iframe)  iframe.postMessage({ action: 'handshake', value: MODULE_ID }, '*')

    if (!this.readyPromise) {
      this.readyPromise = new Promise(resolve => {
        this.awaitReady || (this.awaitReady = new Deferred())
        return this.awaitReady.promise
          .then(res => {
            // this.awaitReady = null
            this._iframeIsHandshaked = true
            resolve(true)
          })
      })
    }

    return this.readyPromise
  }

}

/**
 * Returns a Deferred struct, which holds a pending promise and its associated
 * resolve and reject functions.
 *
 * This is preferred instead of creating a Promise instance to extract the
 * resolve/reject functions yourself:
 *
 * ```
 * // Avoid doing
 * let resolve;
 * const promise = new Promise(res => {
 *   resolve = res;
 * });
 *
 * // Good
 * const deferred = new Deferred();
 * const { promise, resolve } = deferred;
 * ```
 *
 * @template T
 */
export class Deferred {
  /**
   * Creates an instance of Deferred.
   */
  constructor() {
    let resolve = null
    let reject = null

    /**
     * @const {!Promise<T>}
     */
    this.promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })

    /**
     * @const {function(T=)}
     */
    this.resolve = resolve

    /**
     * @const {function(*=)}
     */
    this.reject = reject
  }
}
