import React from 'react'
import { getUserData } from './userData'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onInputChange(id, event) {
        this.setState({[id]: event.target.value})
    }

    onSubmit(event) {
        const id = this.state.id
        const password = this.state.password
        getUserData(id, password)
            .then(data => {
                debugger
            })
            .catch(err => {
                debugger
            })
        event.preventDefault()
    }

    render() {
        return (
            <form className="sdb-login-form" onSubmit={this.onSubmit.bind(this)}>
                <label>Email<input type="email" value={this.state.id} onChange={this.onInputChange.bind(this, 'id')}/></label>
                <label>Password<input type="password" value={this.state.password} onChange={this.onInputChange.bind(this, 'password')}/></label>
                <input type="submit" value="Login"/>
            </form>
        )
    }
}
