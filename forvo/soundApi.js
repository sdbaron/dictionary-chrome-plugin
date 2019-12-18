import ForvoSoundPlayer from './SoundPlayer'

export default class ForvoSoundApi {
  /**
   *
   * @param {HTMLElement|Element} containerElement
   * @param {string} text
   * @param {string} langFrom
   * @param {string} langTo
   * @returns {Promise<Array.<SoundPlayer>>}
   */
  createSoundPlayers(containerElement, text, langFrom = 'de', langTo = 'ru') {
    return ForvoSoundPlayer.createPlayers({ containerElement, name: text })
  }
}
