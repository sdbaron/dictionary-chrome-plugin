import SoundPlayer from '../../sound/SoundPlayer'

const urlTemplate = 'https://api.lingvolive.com/sounds?uri={{dict}}/{{file}}'

export default class LingvoSoundPlayer extends SoundPlayer {
  constructor({ containerElement, dict, name }) {
    super({ containerElement, dict, name })
  }

  getSoundSrc() {
    const { dict, name } = this
    return encodeURI(urlTemplate.replace('{{dict}}', dict).replace('{{file}}', name))
  }
}
