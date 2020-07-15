'use strict'

import './display.scss'

let messageElement = document.createElement('div')
document.body.insertBefore(messageElement, document.body.firstChild)

/**
 @typedef Api
 @type {object}
 @property {object} sound
 @property {object} presenter
 */

/**
 *
 * @param {Object} apis
 * @param {String} [srcLng='de']
 * @param {String} [tgtLng='ru']
 * @returns {{show: show, hide: hide, showLoadingBar: showLoadingBar, hideLoadingBar: hideLoadingBar}}
 * @constructor
 */
function Popup(apis, srcLng = 'de', tgtLng = 'ru') {
  let popupElement
  let loadingBar
  let header
  let body
  /**
   * @returns enum
   *
   */
  return {
    process: process,
    show: show,
    hide: hide,
    isVisible: isVisible,
    showLoadingBar: showLoadingBar,
    hideLoadingBar: hideLoadingBar,
  }

  function process(text, top, left, src, tgt) {
    src || (src = srcLng)
    tgt || (tgt = tgtLng)
    this.showLoadingBar(text, top, left)
    this.show(text, top, left, src, tgt)
      .catch(error => {
        console.error(error.message)
        this.hide()
      })
  }

  /**
   * @param {string|null} message -
   * @param {number} [top] -
   * @param {number} [left] -
   * @param {string} src
   * @param {string} tgt
   */
  function show(message, top, left, src, tgt) {
    src || (src = srcLng)
    tgt || (tgt = tgtLng)
    if (!popupElement) {
      create()
    }
    setPopupPosition(top, left)

    hideLoadingBar()

    const { translator, sound, presenter } = apis
    return translator.translate(message, src, tgt)
      .then(text => presenter.renderView(
        message,
        text,
        body,
        src,
        tgt,
        sound,
        (text, sourceLang, targetLang) => this.process(text, top, left, sourceLang, targetLang)
        )
      )
      .then(() => popupElement.classList.remove('sdb-popup_hide'))
  }

  function showLoadingBar(text, top, left) {
    if (!popupElement) {
      create()
    }

    popupElement.classList.add('sdb-popup_loading')
    setPopupPosition(top, left)
    loadingBar.innerHTML = `Ищем перевод слова ${text}...`
    const { presenter } = apis
    presenter && presenter.clearView(body)
  }

  function setPopupPosition(srcTop, left) {
    // try set popup under te selected word
    let top = srcTop + 10
    popupElement.style.top = !top ? 0 : (top + 'px')
    popupElement.style.left = !left ? 0 : (left + 'px')
  }

  function hideLoadingBar() {
    popupElement.classList.remove('sdb-popup_loading')
  }

  function displayMessage(text, parentElement) {
    parentElement.innerHTML = text
  }

  function hide() {
    if (popupElement) {
      popupElement.classList.add(popupHiddenCssClass)
    }
  }

  function isVisible() {
    return popupElement && !popupElement.classList.contains(popupHiddenCssClass)
  }

  function create() {
    const p = popupElement = document.createElement('div')
    p.classList.add('sdb-popup')

    loadingBar = document.createElement('div')
    loadingBar.classList.add('sdb-popup__loading-bar')
    loadingBar.innerHTML = 'Loading...'
    p.appendChild(loadingBar)
    // p.addEventListener('click', () => hide());

    header = document.createElement('div')
    header.classList.add('sdb-popup__header')
    p.appendChild(header)
    // header.addEventListener('click', () => hide());

    body = document.createElement('div')
    body.classList.add('sdb-popup__body')
    p.appendChild(body)

    document.body.appendChild(p)

  }
}

Popup.getRootCssClass = () => rootPopupCssClass

export default Popup

const popupHiddenCssClass = 'sdb-popup_hide'
const rootPopupCssClass = 'sdb-popup'
