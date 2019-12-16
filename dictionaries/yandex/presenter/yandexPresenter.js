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
   * @param {Object} soundApi
   * @param {function} processTranslate
   */
  renderView(srcText, text, parentElement, srcLng, tgtLng, soundApi, processTranslate) {
    const data = JSON.parse(text)
    data.soundApi = soundApi

    const cardContent = this.textConverter.getHtml(data, parentElement)
    if (cardContent) {
      parentElement.innerHTML = cardContent
    }

    // const soundButtonsContainer = document.querySelector('.sdb-popup-card-def-sounds-container')
    // soundButtonsContainer && soundApi.createSoundPlayer(soundButtonsContainer, srcText, srcLng, tgtLng)
    //   .then(player => {
    //     player.render()
    //     return player
    //   })

    Array.from(document.querySelectorAll('.sdb-popup-card-def-sounds-container'))
      .forEach( soundButtonsContainer => {
        const { parentElement } = soundButtonsContainer || {}
        const textElement = parentElement.querySelector('.sdb-popup-card-def-text')
        soundButtonsContainer && textElement && soundApi.createSoundPlayer(soundButtonsContainer, textElement.innerText, srcLng, tgtLng)
          .then(player => {
            player.render()
            return player
          })
      })

    // Array.from(document.querySelectorAll('.sdb-popup-card-def-sound'))
    //   .forEach( e => {
    //     const articleElement = e.parentElement.querySelector('.sdb-popup-card-article')
    //     const textElement = e.parentElement.querySelector('.sdb-popup-card-def-text')
    //     const textSoundPlayerPromise = getSoundPlayer(textElement, soundApi, srcLng, tgtLng)
    //     const articleSoundPlayerPromise = getSoundPlayer(articleElement, soundApi, srcLng, tgtLng)
    //
    //     Promise.all([textSoundPlayerPromise, articleSoundPlayerPromise])
    //       .then(soundPlayers => {
    //         const textSoundPlayer = soundPlayers[0]
    //         const articleSoundPlayer = soundPlayers[1]
    //         if (!textSoundPlayer || !textSoundPlayer.soundName) {
    //           // have no sound for main word
    //           e.remove()
    //         } else {
    //           e.style.opacity = 1
    //           e.addEventListener('click', () => {
    //               textSoundPlayer.api.play()
    //             // if (articleSoundPlayer && articleSoundPlayer.soundName) {
    //             //   articleSoundPlayer.api.play()
    //             //   setTimeout(() => textSoundPlayer.api.play(), articleSoundPlayer.api.duration() * 1000 * 0.4)
    //             // } else {
    //             //   textSoundPlayer.api.play()
    //             // }
    //           })
    //         }
    //       })
    //   })

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
