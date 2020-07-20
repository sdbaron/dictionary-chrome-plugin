import React from 'react'
import ReactDOM from 'react-dom'

import LangSelector from './langSelector'

class PairLangSelector extends React.Component {
  constructor(props) {
    super(props)
    const { srcLng, tgtLng } = props
    this.state = { srcLng, tgtLng }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
  }

  render() {
    return <div>
      <LangSelector name="srcLng" lang={this.state.srcLng}/>
      <LangSelector name="tgtLng" lang={this.state.tgtLng}/>
    </div>
  }

}

function render(rootElement, data) {
  ReactDOM.render(
    <PairLangSelector srcLng={data.srcLng || 'de'} tgtLng={data.tgtLng || 'ru'}/>,
    rootElement
  )
}

export default render
