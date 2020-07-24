import React from 'react'
import ReactDOM from 'react-dom'

import LangSelector from './langSelector'

const langOptionsDefs = {
  'ru': 'Русский',
  'de': 'German',
  'en': 'English'
}

class PairLangSelector extends React.Component {
  constructor(props) {
    super(props)
    const { srcLng, tgtLng } = props
    this.state = this.makeOptions({ srcLng, tgtLng })
    this.onSrcChange = this.onSrcChange.bind(this)
    this.onTgtChange = this.onTgtChange.bind(this)

  }

  onSrcChange(e) {
    this.setState(this.makeOptions({ srcLng: e.nativeEvent.target.selectedOptions[0].value }))
  }

  onTgtChange(e) {
    this.setState(this.makeOptions({ tgtLng: e.nativeEvent.target.selectedOptions[0].value }))
  }

  makeOptions(params) {
    let { srcLng, tgtLng } = params || {}
    const srcLangOptions = langOptionsDefs
    if (srcLng === undefined) srcLng = this.state.srcLng
    if (tgtLng === undefined) tgtLng = this.state.tgtLng
    const tgtLangOptions = Object.entries(langOptionsDefs)
      .reduce((res, [key, value]) => {
        key !== srcLng && (res[key] = value); return res }, {})

    if (srcLng === tgtLng) {
      tgtLng = Object.keys(tgtLangOptions)[0]
    }

    return { srcLng, tgtLng, srcLangOptions: langOptionsDefs, tgtLangOptions }
  }
  render() {

    const { srcLng, tgtLng, srcLangOptions, tgtLangOptions } = this.state
    // const srcLangOptions = langOptionsDefs
    //   // .reduce((res, [key, value]) => {
    //   //   key !== tgtLng && (res[key] = value); return res }, {})
    //
    // const tgtLangOptions = Object.entries(langOptionsDefs)
    //   .reduce((res, [key, value]) => {
    //     key !== srcLng && (res[key] = value); return res }, {})
    //
    // if (tgtLng === srcLng) this.setState({ tgtLng: Object.keys(tgtLangOptions)[0] })
    return <div>
      <LangSelector name="srcLng" lang={this.state.srcLng} onChange={this.onSrcChange} langOptionsDefs={srcLangOptions} />
      <LangSelector name="tgtLng" lang={this.state.tgtLng} onChange={this.onTgtChange} langOptionsDefs={tgtLangOptions}/>
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
