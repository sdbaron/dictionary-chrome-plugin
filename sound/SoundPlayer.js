// import { getHtml } from './react/getHtml'
import { getHtml } from './pub/getHtml'
import './style.scss'

export default class SoundPlayer {
  constructor({ containerElement, name, soundSource, dict }) {
    this.dict = dict
    this.containerElement = containerElement
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

  render() {
    const { containerElement } = this
    if (containerElement) {
      const content = getHtml(containerElement)
      if (content) {
        const d = document.createElement('div')
        d.className = 'sdb-popup-card-def-sound __sdb-popup-card-def-sound_animation__'
        d.innerHTML = content
        containerElement.appendChild(d)
        d.addEventListener('click', () => this.play())
      }
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
