(function() {
  const urlTemplate = 'https://api.lingvolive.com/sounds?uri=Universal (De-Ru)/{{file}}'
  const players = {}
  function play(name) {
    const url = encodeURI(urlTemplate.replace('{{file}}', name))
    const player = players[url] || (players[url] = new Audio(url))
    player.addEventListener(/* 'loadeddata' */ 'canplay', () => {
      player.play()
    })

    if (player.paused) {
      player.play()
    }
  }
  window.play = play
})()
