import React from 'react'
import ReactDOM from 'react-dom'

import LangSelector from './langSelector'
import './pairLangSelector.scss'

const langOptionsDefs = {
  'ru': 'Русский',
  'de': 'German',
  'en': 'English'
}

class PairLangSelector extends React.Component {
  constructor(props) {
    super(props)
    const { storage } = props
    let { srcLng, tgtLng } = props
    if (storage) {
      srcLng = storage.get('srcLng') || srcLng
      tgtLng = storage.get('tgtLng') || tgtLng
    }
    this.state = { srcLng, tgtLng }
    this.state = { ...this.state, ...this.makeOptions({ srcLng, tgtLng }) }
    this.onSrcChange = this.onSrcChange.bind(this)
    this.onTgtChange = this.onTgtChange.bind(this)
  }

  onSrcChange(e) {
    const { storage } = this.props
    const srcLng = e.nativeEvent.target.selectedOptions[0].value
    storage && storage.save( 'srcLng', srcLng)
    this.setState(this.makeOptions({ srcLng }))
  }

  onTgtChange(e) {
    const { storage } = this.props
    const tgtLng = e.nativeEvent.target.selectedOptions[0].value
    storage && storage.save('tgtLng', tgtLng)

    this.setState(this.makeOptions({ tgtLng }))
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
      const { storage } = this.props
      tgtLng = Object.keys(tgtLangOptions)[0]
      storage && storage.save('tgtLng', tgtLng)
      this.setState(this.makeOptions({ tgtLng }))

    }

    return { srcLng, tgtLng, srcLangOptions: langOptionsDefs, tgtLangOptions }
  }
  render() {

    const { srcLng, tgtLng, srcLangOptions, tgtLangOptions } = this.state
    return <div className="sdb-popup-card-pair-lang-selector">
      <LangSelector name="srcLng" lang={srcLng} onChange={this.onSrcChange} langOptionsDefs={srcLangOptions} className="sdb-popup-card-pair-lang-selector__src-lang-selector" />
      <LangSelector name="tgtLng" lang={tgtLng} onChange={this.onTgtChange} langOptionsDefs={tgtLangOptions} className="sdb-popup-card-pair-lang-selector__tgt-lang-selector" />
    </div>
  }

}


function render(rootElement, data) {
  ReactDOM.render(
    <PairLangSelector srcLng={data.srcLng || 'de'} tgtLng={data.tgtLng || 'ru'} storage={data.storage}/>,
    rootElement
  )
}

export default render
