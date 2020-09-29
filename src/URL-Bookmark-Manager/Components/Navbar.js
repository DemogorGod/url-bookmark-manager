
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/UserPage.css'
import { Auth } from 'aws-amplify'
class Navbar extends Component {
    state = {
        changePassword: false,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        output: ''
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSignOut = async () => {
        await Auth.signOut()
    }
    handleTogglePasswordView = () => {
        this.setState({ changePassword: !this.state.changePassword })
    }

    handleChangePassword = async () => {
        if (this.state.newPassword === this.state.confirmNewPassword) {
            try {
                const user = await Auth.currentAuthenticatedUser()
                const oldPassword = this.state.oldPassword
                const newPassword = this.state.newPassword
                await Auth.changePassword(user, oldPassword, newPassword)
                this.handleTogglePasswordView()
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    changePassword: '',
                })
                alert("Your Password has changed!")
            } catch (e) {
                console.log(e)
                this.setState({ output: 'There was something wrong, please check your inputs! :(' })
            }
        } else {
            this.setState({ output: 'Your new password does not match!! ' })
        }
    }
    render() {
        const passwordView = this.state.changePassword
        return (
            <div>
                <div className="navbar-holder">
                    <button onClick={this.handleSignOut}>Sign Out</button>
                    <button onClick={this.handleTogglePasswordView}>Change Password</button>
                    <p className='welcome-message'>Welcome, <span>{this.props.user.name}</span></p>
                </div>
                {passwordView ?
                    <div className="change-password-holder">
                        <input type='text' name="oldPassword" value={this.state.oldPassword} placeholder="Old Password..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                        <br />
                        <input type='text' name="newPassword" value={this.state.newPassword} placeholder="New Password..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                        <br />
                        <input type='text' name="confirmNewPassword" value={this.state.confirmNewPassword} placeholder="Confirm New Password..." onChange={this.handleOnChangeInput} className="sign-in-page-inputs" />
                        <br></br>
                        <button onClick={this.handleChangePassword}>Change Password</button>
                        <br />
                        <button onClick={this.handleTogglePasswordView}>Cancel</button>
                        <p style={{ color: 'red' }}>{this.state.output}</p>
                    </div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Navbar)