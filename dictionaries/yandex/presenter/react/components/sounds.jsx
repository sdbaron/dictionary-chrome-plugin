/***
 * Button for sound
 */
import React from 'react';
// import Sound from './sound'
import SoundButton from '../../../../../sound/react/soundButton'

export default class SoundsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    const soundButtonsContainer = null

    props.apis.forEach(api => {
      api.createSoundPlayers(soundButtonsContainer, props.text.toLowerCase(), props.srcLng, props.tgtLng)
        .then(playersPromise => {
          playersPromise && playersPromise.forEach(player => player.then(p => {
            // this.setState({ players: this.state.players.concat(p) })
            this.setState({ players: [ ...(this.state.players || []), p ] })
          }))
        })
    })
  }

  componentWillUnmount() {
    this.setState({ players: null })
  }


  render() {
    const { state: { players }} = this
    const buttons = players && players.map((player, i) =>
      <SoundButton player={ player } key={ i } />
    ) || null

    return (
      <div className="sdb-popup-card-def-sounds-container">
        { buttons }
      </div>
    )
  }

}
