import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/SignInPage.css'
import { Auth } from 'aws-amplify'
class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        output: ''
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSignUp = async () => {
        try {
            const username = await this.state.username
            const password = await this.state.password
            const email = await this.state.username
            await Auth.signUp({
                username,
                password,
                attributes: { email }
            })
            this.props.switchPage(3)
        } catch (error) {
            console.log("Sign up error :")
            console.log(error)
            this.setState({ output: "Inputs can not be empty or have invalid characters" })
        }
    }

    render() {
        return (
            <div>
                <input type='text' name="username" value={this.state.username} placeholder="Username..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <br></br>
                <input type='text' name="password" value={this.state.password} placeholder="Password..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <br></br>
                <input type='text' name="email" value={this.state.email} placeholder="Email..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                <p>Already a user? <span onClick={() => this.props.switchPage(1)} className="sign-in-page-switch">Sign In</span></p>
                <button onClick={this.handleSignUp} className="sign-in-page-button">Sign Up</button>
                <p style={{ color: 'red' }}>{this.state.output}</p>
            </div>
        )
    }
}

export default connect(null, null)(SignUp)