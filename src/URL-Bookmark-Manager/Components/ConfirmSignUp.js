import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/SignInPage.css'
import { Auth } from 'aws-amplify'
class SignIn extends Component {
    state = {
        username: '',
        code: '',
        output: ''
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleConfirmEmail = async () => {
        try {
            const username = this.state.username
            const code = this.state.code
            await Auth.confirmSignUp(username, code)
            this.props.switchPage(1)
        } catch (e) {
            console.log('sign in error ' + e)
            console.log(e)
            this.setState({ output: 'Code or username are invalid...' })
        }
        this.setState({
            username: '',
            code: ''
        })
    }

    render() {
        return (
            <div>
                <input type='text' name="username" value={this.state.username} placeholder="Username..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <br></br>
                <input type='text' name="code" value={this.state.code} placeholder="Code..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <p>Already confirmed? <span onClick={() => this.props.switchPage(1)} className="sign-in-page-switch">Sign In</span></p>
                {this.state.code} | {this.state.username}
                <button onClick={this.handleConfirmEmail} className="sign-in-page-button">Confirm Email</button>
                <p style={{ color: 'red' }}>{this.state.output}</p>
            </div>
        )
    }
}

export default connect(null, null)(SignIn)