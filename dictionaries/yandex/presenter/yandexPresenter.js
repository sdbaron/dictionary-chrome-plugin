'use strict'

// import './card.scss';
import { TextConverter as ReactTextConverter } from '../presenter/react/textConverter'

// import SoundPlayer from "../../../display/sound"

export class YandexPresenter {
  /**
   *
   * @param {function} TextConverter -
   */
  constructor(TextConverter = ReactTextConverter) {
    this.textConverter = TextConverter
  }

  /**
   * Форматирует результат перевода в html
   * @param {string} srcText переводимое тече
   * @param {string} text Результат перевода
   * @param {HTMLElement} parentElement Элемент, в котрый будет вставлен результат
   * @param {string} srcLng
   * @param {string} tgtLng
   * @param {[Object]} soundApis
   * @param {function} processTranslate
   */
  renderView(srcText, text, parentElement, srcLng, tgtLng, soundApis, processTranslate) {
    const data = JSON.parse(text)
    data.soundApis = soundApis

    const cardContent = this.textConverter.getHtml(data, parentElement)
    if (cardContent) {
      parentElement.innerHTML = cardContent
    }

    Array.from(document.querySelectorAll('.sdb-popup-card-def-sounds-container'))
      .forEach(soundButtonsContainer => {
        const { parentElement } = soundButtonsContainer || {}
        const textElement = parentElement.querySelector('.sdb-popup-card-def-text')
        soundButtonsContainer && textElement
        && soundApis.forEach(api => {
          api.createSoundPlayers(soundButtonsContainer, textElement.innerText, srcLng, tgtLng)
            .then(playersPromise => {
              playersPromise && playersPromise.forEach(player => player.then(p => p.render()))
            })
        })
      })

    const cardDefinitionElement = document.querySelector('.sdb-popup-card-defs')
    const exampleToggleElement = parentElement.querySelector('.sdb-popup-card-def__examples-toggle')
    if (exampleToggleElement) {
      exampleToggleElement.addEventListener('click', () => {
        cardDefinitionElement.classList.toggle('examples-expanded')
      })
    }

    if (exampleToggleElement && (!cardDefinitionElement || !cardDefinitionElement.querySelector('.sdb-popup-card-example'))) {
      exampleToggleElement.style.display = 'none'
    }

    let linksToTranslate = parentElement.querySelectorAll('.sdb-popup-card-mean-href')
    for (let link of linksToTranslate) {
      link.addEventListener('click', event => {
        event.preventDefault()
        processTranslate(link.innerHTML, srcLng, tgtLng)
      })
    }

    linksToTranslate = parentElement.querySelectorAll('.sdb-popup-card-translate-text, .sdb-popup-card-synonym-list__item-text')
    for (let link of linksToTranslate) {
      link.addEventListener('click', event => {
        event.preventDefault()
        processTranslate(link.innerHTML, tgtLng, srcLng)
      })
    }

    (function f() {
      let gens = parentElement.querySelectorAll('.cart-marks__gen');
      [].forEach.call(gens, gen => {
        let hint = getHint(gen.innerText)
        if (hint) {
          gen.setAttribute('title', hint)
        }
      })

      function getHint(value) {
        switch (value) {
          case 'm':
          case 'м':
            return 'Мужской род'
          case 'ж':
          case 'f':
            return 'Женский род'
          case 'ср':
          case 'n':
            return 'Средний род'
          default:
            return 'Неизвестно!'
        }
      }
    })()

  }

  clearView(parentElement) {
    parentElement.innerHTML = ''
  }

}

/**
 *
 * @param {HTMLElement|Element} textElement
 * @param {object} soundApi
 * @param {string} srcLng
 * @param {string} tgtLng
 * @returns {Promise<{{play: function, soundName: string}}>}
 */
// function getSoundPlayer(textElement, soundApi, srcLng, tgtLng) {
//   return soundApi.sound(textElement && textElement.innerText && textElement.innerText.toLowerCase() || null, srcLng, tgtLng)
//     .then(data => {
//       const { soundName, dictionaryName } = data || {}
//       const soundPlayer = new SoundPlayer(dictionaryName)
//       let play = null
//       if (dictionaryName && soundPlayer) {
//         soundPlayer.load(soundName)
//         play = () => soundPlayer.play()
//       }
//       return { api: soundPlayer.getApi(), play, soundName, textElement }
//     })
//     .catch(err => {
//         console.error(`error: ${err}`)
//       },
//     )
// }
