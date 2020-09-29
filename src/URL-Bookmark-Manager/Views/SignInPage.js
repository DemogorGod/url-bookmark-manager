
import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../Assets/university-logo-1140x268.jpg'
import '../Styles/SignInPage.css'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import ConfirmSignUp from '../Components/ConfirmSignUp'
class SignInPage extends Component {
    state = {
        signInPage: 1
    }

    handleSwitchPage = (number) => {
        this.setState({ signInPage: number })
    }

    render() {
        return (
            <div className="sign-in-page">
                <img src={logo} alt="" style={{ width: '100%' }} />
                <h1>Welcome to URL-Bookmark-Manager</h1>
                <p>Sign in to operate the application</p>
                {this.state.signInPage === 1 ?
                    <SignIn switchPage={this.handleSwitchPage} /> : null
                }
                {this.state.signInPage === 2 ?
                    <SignUp switchPage={this.handleSwitchPage} /> : null
                }
                {this.state.signInPage === 3 ?
                    <ConfirmSignUp switchPage={this.handleSwitchPage} /> : null
                }
            </div>
        )
    }
}

export default connect(null, null)(SignInPage)