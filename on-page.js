import YandexDictionaryApi from './dictionaries/yandex/api'
import LingvoApi from './dictionaries/lingvo/api'
import ForvoSoundApi from './forvo/soundApi'

// import { TextConverter}  from './dictionaries/yandex/presenter/mustache/textConverter'
// import { TextConverter} from './dictionaries/yandex/presenter/pug/textConverter'
import { TextConverter} from './dictionaries/yandex/presenter/react/textConverter'
import { YandexPresenter } from './dictionaries/yandex/presenter/yandexPresenter'
import Popup from './display/display'

/**
 *  Инициализация popup, подписывваемся на двойной клик,
 *  во время клика получаем выделенный текст и его координаты,
 *  вычисляем координаты всплывающего окна и открываем его
 *
 */

const popup = new Popup({
    translator: new YandexDictionaryApi(),
    presenter: new YandexPresenter(TextConverter),
    sound: [new LingvoApi(), new ForvoSoundApi()],
  },
  'de', 'ru')

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
  const { clientX, clientY } = event
  const { text, rect } = getRangeFromSelection()
  if (rect) {
    let top = (rect.bottom || clientY)+ scrollTop
    let left = (rect.left || clientX) + scrollLeft - 20
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
    const range = sel.getRangeAt(0)
    return { text: sel.toString(), rect: range.getBoundingClientRect() || null }
  } else {
    return { text: null, rect: null }
  }
}
