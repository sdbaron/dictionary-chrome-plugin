import React from 'react'
import ReactDOM from 'react-dom'

import CardMarks from './components/marks'
import CardTranslates from './components/translates'
import Article from './components/article'
import CardTranscription from './components/transcription'
import SoundsContainer from './components/sounds'

let soundPlayer = {}

function CardDefinition(props) {
  const defs = props.defs && props.defs.length
    ? props.defs.map((def, index) =>
        <li key={ index } className="sdb-popup-card-def">
          <Article def={ def }/>
          <span className="sdb-popup-card-def-text">{ def.text }</span>
          <CardTranscription def={ def.ts }/>
          <span className="sdb-popup-card-def-pos">{ def.pos }</span>

          <CardMarks def={ def }/>
          <span className="sdb-popup-card-def__examples-toggle" data-text-show="показать примеры"
                data-text-hide="скрыть примеры"/>
          <SoundsContainer apis={ props.soundApis } text={ def.text } srcLng={ props.srcLng } tgtLng={ props.tgtLng } />

          <CardTranslates translates={ def.tr }/>
        </li>
    )
    : (
      <li className="sdb-popup-card-def card-def_empty">
        <span className="sdb-popup-card-def-text">Translate has not been found</span>
      </li>
    )


  return (
    <ul className="sdb-popup-card-defs examples-expanded">{ defs }</ul>
  )
}

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="sdb-popup-card"><CardDefinition defs={ this.props.def } soundApis={ this.props.soundApis } srcLng={ this.props.srcLng } tgtLng={ this.props.tgtLng } /></div>
    )
  }

}

function render(rootElement, data) {
  ReactDOM.render(
    <Card def={ data.def } soundApis={ data.soundApis } srcLng={ data.srcLng } tgtLng={ data.tgtLng } />,
    rootElement
  )
}

export default render
