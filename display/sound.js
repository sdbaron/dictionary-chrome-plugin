const urlTemplate = 'https://api.lingvolive.com/sounds?uri={{dict}}/{{file}}'
const players = {}

export default class SoundPlayer {
  constructor(dict) {
    this.dict = dict
  }

  play(name) {
    const url = encodeURI(urlTemplate.replace('{{dict}}', this.dict).replace('{{file}}', name))
    const player = players[url] || (players[url] = new Audio(url))
    player.addEventListener('canplay', () => {
      player.play()
    })

    if (player.paused) {
      player.play()
    }
  }
}
