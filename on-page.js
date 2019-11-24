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

const popup = new Popup([
  {
    translator: new YandexDictionaryApi(),
    presenter: new YandexPresenter(
      ReactTextConverter
      //PugTextConverter
      // MustacheTextConverter
    ),
    sound: new LingvoApi(),
  }
])

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

// function getRangeFromSelection(x, y) {
//   let el = document.elementFromPoint(x, y)
//   alert(`tagName=${el.tagName} nodeType=${el.nodeType}\n text=${el.innerHTML}`)
  // const rangeCount = sel.rangeCount
  // let values = []
  // let result = {}
  // for (let i = 0; i < rangeCount; i++) {
  //   let range = sel.getRangeAt(i)
  //   if (range.startContainer.nodeType === 3 && range.endContainer.nodeType === 3) {
  //     if (range.startContainer.nodeValue === range.endContainer.nodeValue) {
  //       let s = range.startContainer.nodeValue
  //       s = s && s.substr(range.startOffset)
  //       const text = s && s.split(' ')[0]
  //       text && values.push(text)
  //     } else {
  //       let s = range.startContainer.nodeValue
  //       s = s && s.substr(range.startOffset)
  //       s && values.push(s)
  //       let ss = range.endContainer.nodeValue
  //       ss = ss && ss.slice(0, range.endOffset)
  //       ss && values.push(ss)
  //     }
  //     const found = values.length && Array.from(range.getClientRects()).some((rect, i) => {
  //       const text = values[i]
  //       const width = getTextLength(text)
  //       if (x >= rect.left && x <= (rect.left + width) && y >= rect.top && y <= rect.bottom) {
  //         result = { text, rect}
  //         return true
  //       }
  //     })
  //     if (found) break
  //   }
  // }
  // return result

//   function getTextLength(text) {
//     let parentElement = sel.anchorNode.parentElement
//     let clone = parentElement.cloneNode(false)
//     const wrapper = document.createElement('div')
//     wrapper.style.top = '-10000px'
//     wrapper.style.left = '-10000px'
//     wrapper.style.position = 'absolute'
//
//     clone.innerHTML = text
//     clone.style.position = 'relative'
//     clone.style.display = 'inline'
//     clone.style.border = 0
//     clone.style.margin = 0
//     clone.style.padding = 0
//     // clone.style.opacity = 0
//     wrapper.appendChild(clone)
//
//     let container = parentElement
//     if (container.parentElement) container = container.parentElement
//     container.appendChild(wrapper)
//     const width = wrapper.clientWidth // clone.getBoundingClientRect().width
//     container.removeChild(wrapper)
//     return width
//   }
// }
function getRangeFromSelection() {
  let sel = window.getSelection()
  const rangeCount = sel.rangeCount
  if (rangeCount) {
    return { text: sel.toString(), rect: sel.getRangeAt(0).getBoundingClientRect() }
  } else {
    return { text: null, rect: null }
  }
}
  // let values = []
  // let result = {}
  // let text = ''
  // for (let i = 0; i < rangeCount; i++) {
  //   let range = sel.getRangeAt(i)
  //   text += range.toString()
    // if (range.startContainer.nodeType === 3 && range.endContainer.nodeType === 3) {
    //   // выделение начинается и заканчивается в текстовых узлах
    //   if (range.startContainer.nodeValue === range.endContainer.nodeValue) {
    //     // выделение было сделано в одном текстовм узле
    //     let s = range.startContainer.nodeValue
    //     // узел текстовый, поэтому startOffset обозначает
    //     // количество выделенных символов, начиная с начала узла
    //     s = s && s.substr(range.startOffset)
    //     const words = s && s.split(/(\s|&nbsp;|\.|,|:|\?|!|\/|\\|–|-|>|<|=)/)
    //     words && (values = values.concat(words))
    //   } else {
    //     // начало выделения в одном контейнере, конец выделения – в другом
    //     let s = range.startContainer.nodeValue
    //     // узел текстовый, поэтому startOffset обозначает
    //     // количество выделенных символов, начиная с начала узла
    //     s = s && s.substr(range.startOffset)
    //     s && values.push(s)
    //     let ss = range.endContainer.nodeValue
    //     ss = ss && ss.slice(0, range.endOffset)
    //     ss && values.push(ss)
    //   }
    //   const found = values.length && Array.from(range.getClientRects()).some((rect, i) => {
    //     const text = values[i]
    //     const width = getTextLength(text)
    //     if (x >= rect.left && x <= (rect.left + width) && y >= rect.top && y <= rect.bottom) {
    //       result = { text, rect}
    //       return true
    //     }
    //   })
    //   if (found) break
    // }
  // }
  // result = { text, rect: sel.getBoundingClientRect() }
  // return result

//   function getTextLength(text) {
//     let parentElement = sel.anchorNode.parentElement
//     let clone = parentElement.cloneNode(false)
//     const wrapper = document.createElement('div')
//     wrapper.style.top = '-10000px'
//     wrapper.style.left = '-10000px'
//     wrapper.style.position = 'absolute'
//
//     clone.innerHTML = text
//     clone.style.position = 'relative'
//     clone.style.display = 'inline'
//     clone.style.border = 0
//     clone.style.margin = 0
//     clone.style.padding = 0
//     // clone.style.opacity = 0
//     wrapper.appendChild(clone)
//
//     let container = parentElement
//     if (container.parentElement) container = container.parentElement
//     container.appendChild(wrapper)
//     const width = wrapper.clientWidth // clone.getBoundingClientRect().width
//     container.removeChild(wrapper)
//     return width
//   }
// }
