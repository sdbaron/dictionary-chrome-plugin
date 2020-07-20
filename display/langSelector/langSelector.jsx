import React from 'react'
import ReactDOM from 'react-dom'

const langOptionsDefs = {
  'ru': 'Русский',
  'de': 'German',
  'en': 'English'
}

class LangSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lang: props.lang || 'de' }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    Object.keys(langOptionsDefs).some((key, ind) => {
      if (ind === e.selectedIndex) {
        this.setState({ lang: e.selectedIndex })
        return true
      }
    })
  }

  render() {
    const options = Object.entries(langOptionsDefs)
      .map(([value, name], index) =>
        (<option key={index} value={value}
                        className="">{name}</option>)
      )

    return (
      <select className="sdb-popup-card-lang-selector" onChange={this.onChange}
              defaultValue={this.state.lang} >
        {options}
      </select>
    )
  }

}

// function render(rootElement, data) {
//   ReactDOM.render(
//     <LangSelector name={data.name} lang={ data.lang } />,
//     rootElement
//   )
// }

export default LangSelector
