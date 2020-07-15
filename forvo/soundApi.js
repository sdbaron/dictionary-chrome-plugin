import ForvoSoundPlayer from './soundPlayer'

export default class ForvoSoundApi {
  /**
   *
   * @param {string} text
   * @param {string} langFrom
   * @param {string} langTo
   * @returns {Promise<Array.<SoundPlayer>>}
   */
  createSoundPlayers(text, langFrom = 'de', langTo = 'ru') {
    return ForvoSoundPlayer.createPlayers({ lng: langFrom, name: text })
  }
}
