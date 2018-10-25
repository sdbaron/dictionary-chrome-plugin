import React from 'react'
import ReactDOM from 'react-dom'

import CardMarks from './components/marks'
import CardTranslates from './components/translates'
import Article from './components/article'
import CardTranscription from './components/transcription'

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
          <div className="sdb-popup-card-def-sound __sdb-popup-card-def-sound_animation__">
            <svg className="" data-reactid="s0.0.0" viewBox="0 0 25 21">
              <title> sound1 </title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7zM15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#1D9BF5"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#8ECDFA"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#D2EBFD"></path>
              </g>
            </svg>
            <svg className="" data-reactid="s0.0.1" viewBox="0 0 25 21">
              <title> sound4 </title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7z" stroke="#1D9BF5"></path>
                <path d="M15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#8ECDFA"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#1D9BF5"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#D2EBFD"></path>
              </g>
            </svg>
            <svg className="" data-reactid="s0.0.2" viewBox="0 0 25 21">
              <title> sound2 </title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7z" stroke="#1D9BF5"></path>
                <path d="M15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#D2EBFD"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#8ECDFA"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#1D9BF5"></path>
              </g>
            </svg>
            <svg className="" data-reactid="s0.0.3" viewBox="0 0 25 21">
              <title> sound3 </title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7z" stroke="#1D9BF5"></path>
                <path d="M15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#8ECDFA"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#D2EBFD"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#1D9BF5"></path>
              </g>
            </svg>
            <svg className="default-sound" data-reactid="s0.0.4" viewBox="0 0 25 21">
              <title>sound</title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7z" stroke="#1D9BF5"></path>
                <path d="M15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#D2EBFD"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#D2EBFD"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#D2EBFD"></path>
              </g>
            </svg>
            <svg className="default-sound-hover" data-reactid="s0.0.5" viewBox="0 0 25 21">
              <title> sound2 </title>
              <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.525 7.445h-3.5c-.83 0-1.5.672-1.5 1.5v3c0 .828.67 1.5 1.5 1.5h3.5l7 7v-20l-7 7z" stroke="#1D9BF5"></path>
                <path d="M15.525 6.945c1.125.818 2 2.002 2 3.5 0 1.498-.874 2.682-2 3.5" stroke="#1D9BF5"></path>
                <path d="M17.525 4.445c1.667 1.376 3 3.67 3 6 0 2.326-1.34 4.624-3 6" stroke="#1D9BF5"></path>
                <path d="M19.525 2.445c2.223 1.835 4 4.893 4 8 0 3.1-1.785 6.165-4 8" stroke="#1D9BF5"></path>
              </g>
            </svg>

          </div>
          <CardTranslates translates={ def.tr }/>
        </li>
    )
    : (
      <li className="sdb-popup-card-def card-def_empty">
        <span classNmae="sdb-popup-card-def-text">Translate has not been found</span>
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
      <div className="sdb-popup-card"><CardDefinition defs={ this.props.def }/></div>
    )
  }

}

function render(rootElement, data) {
  soundPlayer = data.soundPlayer
  ReactDOM.render(
    <Card def={ data.def }/>,
    rootElement
  )
}

export default render
