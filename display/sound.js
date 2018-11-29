const urlTemplate = 'https://api.lingvolive.com/sounds?uri={{dict}}/{{file}}'
const players = {}

export default class SoundPlayer {
  constructor(dict) {
    this.dict = dict
    this.name = null
  }

  load(name) {
    this.name = name
    getPlayer.call(this)
  }

  getApi() {
    return {
      subscribe: (eventName, handler) => getPlayer.call(this, name).addEventListener(eventName, handler),
      unsubscribe: (eventName, handler) => getPlayer.call(this, name).removeEventListener(eventName, handler),
      duration: () => getPlayer.call(this, name).duration,
      play: (name = null) => this.play(name)
    }
  }

  play(name = null) {
    const player = getPlayer.call(this, name)

    player.addEventListener('canplay', () => {
      player.play()
    })

    if (player.paused) {
      player.play()
    }

  }
}

function getPlayer(name = null) {
  this.name = name || this.name
  const url = encodeURI(urlTemplate.replace('{{dict}}', this.dict).replace('{{file}}', this.name))
  return players[url] || (players[url] = new Audio(url))

}
