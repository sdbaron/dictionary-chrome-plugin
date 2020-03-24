import './style.scss'

export default class SoundPlayer {
  /**
   * returns {Promise<SoundPlayer>}
   */
  constructor({ lng, name, soundSource, dict }) {
    this.dict = dict
    this.lng = lng
    this.name = name
    this.soundSource = soundSource
    return this.getSoundSrc().then(soundSrc => {
      this.audioElement = new Audio(soundSrc)
      return this
    })
  }

  /**
   * @returns {Promise<string>}
   */
  getSoundSrc() {
    throw Error('method id not realised')
  }

  subscribe(eventName, handler) {
    const { audioElement } = this
    audioElement && audioElement.addEventListener(eventName, handler)
  }

  unsubscribe(eventName, handler) {
    const { audioElement } = this
    audioElement && audioElement.removeEventListener(eventName, handler)
  }

  duration() {
    const { audioElement } = this
    return audioElement && audioElement.duration || 0
  }

  getRenderData() {

  }

  play() {
    const { audioElement } = this

    audioElement && audioElement.addEventListener('canplay', () => {
      audioElement.play()
        .then(() => {
          // TODO: удачно начлаось воспроизведение звука – начнём анимацию, например
        })
        .catch(() => {
          // TODO: звук не воспроищвёлся – покажем ошибку?
        })
    })

    if (audioElement.paused) {
      audioElement.play()
        .then(() => {
          // TODO: удачно начлаось воспроизведение звука – начнём анимацию, например
        })
        .catch(() => {
          // TODO: звук не воспроищвёлся – покажем ошибку?
        })
    }
  }

  pause() {
    const { audioElement } = this
    audioElement && !audioElement.paused && audioElement.pause()
  }
}
