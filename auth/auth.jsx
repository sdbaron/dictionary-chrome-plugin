export default class AuthLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="sdb-auth-form">
                <AuthForm defs={this.props.def}/>
                <Login defs={this.props.def}/>
                <UserInfo/>
            </div>
        )
    }
}
