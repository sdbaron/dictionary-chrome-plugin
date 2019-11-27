import YandexDictionaryApi from './dictionaries/yandex/api'
import LingvoApi from './dictionaries/lingvo/api'
import MustacheTextConverter from './dictionaries/yandex/presenter/mustache/textConverter'
import PugTextConverter from './dictionaries/yandex/presenter/pug/textConverter'
import ReactTextConverter from './dictionaries/yandex/presenter/react/textConverter'
import YandexPresenter from './dictionaries/yandex/presenter/presenter'
import Popup from './display/display'

/**
 *  Инициализация popup, подписвываемся на двойной клик, во время клика получаем выделенный текст и его координаты,
 *  вычисляем координаты всплывающего окна и открываем его
 *
 */

const popup = new Popup({
    translator: new YandexDictionaryApi(),
    presenter: new YandexPresenter(
      ReactTextConverter
      //PugTextConverter
      // MustacheTextConverter
    ),
    sound: new LingvoApi(),
  })

init()


function init() {
  //
  // showMessage("<b>Ok, lets begin!</b>");
  // loadDictionaryApi('chrome-extension://__MSG_@@extension_id__/dictionaries/yandex/api.js');
  console.warn("I am here")

  // handle any click
  document.addEventListener('click', catchOutsideClick)

  // handle double click for open popup
  document.addEventListener('dblclick', clickEventHandler)
}

/**
 * if click was happening outside popup then hide them
 * @param event
 */
function catchOutsideClick(event) {
  if (popup && popup.isVisible()) {
    const popupCls = Popup.getRootCssClass()
    // if click was happened ouside
    if (!event.target.closest('.' + popupCls)) {
      popup.hide()
    }
  }
}

function clickEventHandler(event) {
  if (!event.ctrlKey && !event.metaKey) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  // const { text, rect } = getRangeFromSelection(/* event.pageX - scrollLeft, event.pageY - scrollTop */ )
  const { text, rect } = getRangeFromSelection(event.clientX, event.clientY)
  if (rect) {
    let top = rect.bottom + scrollTop
    let left = rect.left + scrollLeft - 20
    let right = left + 500
    let widthOver = right - document.documentElement.clientWidth
    if (widthOver > 0) {
      left -= widthOver + 20
      if (left < 0) {
        left += widthOver / 2
      }
    }

    popup.process(text, top, left)
  }
}

function getRangeFromSelection() {
  let sel = window.getSelection()
  const rangeCount = sel.rangeCount
  if (rangeCount) {
    return { text: sel.toString(), rect: sel.getRangeAt(0).getBoundingClientRect() }
  } else {
    return { text: null, rect: null }
  }
}
