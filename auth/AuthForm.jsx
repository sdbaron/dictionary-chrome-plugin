export default class AuthLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="sdb-auth-form">
                <label>Email<input type="email" id="user_id"/></label>
                <label>Password<input id="password" type="password"/></label>
                <input type="submit" onclick={this.createUser}></input>
                <UserInfo userId={this.props.userId} />
            </div>
        )
    }
}
