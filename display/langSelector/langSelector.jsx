import React from 'react'
import ReactDOM from 'react-dom'

function Selector(props) {
  const options = props.options
    ? props.options.map((opt, index) =>
      <option key={ index } value={ opt.value } className="">{ opt.name }
      </option>
    )
    : (null)

  return (
    <sector className="sdb-popup-card-lang-selector">
     { options }
    </sector>
  )
}

class LangSelector extends React.Component {
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
    <LangSelector def={ data.def } soundApis={ data.soundApis } srcLng={ data.srcLng } tgtLng={ data.tgtLng } />,
    rootElement
  )
}

export default render
