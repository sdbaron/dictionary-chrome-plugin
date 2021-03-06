import SoundPlayer from '../../sound/SoundPlayer'

const urlTemplate = 'https://api.lingvolive.com/sounds?uri={{dict}}/{{file}}'

export default class LingvoSoundPlayer extends SoundPlayer {
  constructor({ dict, name }) {
    super({ dict, name })
  }

  getSoundSrc() {
    const { dict, name } = this
    return Promise.resolve(encodeURI(urlTemplate.replace('{{dict}}', dict).replace('{{file}}', name)))
  }
}
