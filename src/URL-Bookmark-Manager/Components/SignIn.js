import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/SignInPage.css'
import { Auth } from 'aws-amplify'
class SignIn extends Component {
    state = {
        username: '',
        password: '',
        output: ''
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSignIn = async () => {
        try {
            await Auth.signIn({ username: this.state.username, password: this.state.password })
        } catch (e) {
            console.log('sign in error ' + e)
            this.setState({ output: 'Please make sure your spelling is correct, and you have the right inputs!' })
        }
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div>
                <input type='text' name="username" value={this.state.username} placeholder="Username..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <br></br>
                <input type='password' name="password" value={this.state.password} placeholder="Password..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <p>Not a user yet? <span onClick={() => this.props.switchPage(2)} className="sign-in-page-switch">Register</span></p>
                <span onClick={() => this.props.switchPage(3)} className="sign-in-page-switch">Confirm New Email</span> <br></br>
                <button onClick={this.handleSignIn} className="sign-in-page-button">Sign In</button>
                <p style={{ color: 'red' }}>{this.state.output}</p>
            </div>
        )
    }
}

export default connect(null, null)(SignIn)