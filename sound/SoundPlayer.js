export default class SoundPlayer {
  constructor({ containerElement, dict, name }) {
    this.dict = dict
    this.containerElement = containerElement
    this.name = name
    this.audioElement = new Audio(this.getSoundSrc())
  }

  /**
   * @returns {string}
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

  render() {
    const { containerElement } = this
    if (containerElement) {
      // TODO: рисуем значок и вешаем на ено обработчик клика, который проигрывает звук
    }
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
