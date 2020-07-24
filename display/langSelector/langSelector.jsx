import React from 'react'

class LangSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = Object.entries(this.props.langOptionsDefs)
      .map(([value, name], index) =>
        (<option key={value} value={value}
                        className="">{name}</option>)
      )

    return (
      <select className="sdb-popup-card-lang-selector" onChange={this.props.onChange}
              defaultValue={this.props.lang} >
        {options}
      </select>
    )
  }

}

export default LangSelector
