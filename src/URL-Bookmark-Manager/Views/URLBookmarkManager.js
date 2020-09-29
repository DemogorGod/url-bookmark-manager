
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth, Hub } from 'aws-amplify'
import Amplify from "aws-amplify"
import awsConfig from "../../aws-exports"
import UserPage from './UserPage'
import SignInPage from './SignInPage'

Amplify.configure(awsConfig)
class URLBookManager extends Component {
    state = {
        user: false,
    }

    componentDidMount() {
        this.getUserData();
        Hub.listen('auth', this, 'onHubCapsule')
    }


    getUserData = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser()
            user ? this.setState({ user }) : this.setState({ user: null })
        } catch (error) {
            console.log("error in attempting getting user data " + error)
        }
    }

    onHubCapsule = capsule => {
        switch (capsule.payload.event) {
            case "signIn":
                window.location.reload(true)
                // console.log('Signed in')
                this.getUserData()
                break;
            case "signOut":
                // console.log('Signed out')
                window.location.reload(true)
                this.setState({ user: null })
                break;
            case "singUp":
                console.log('signed up')
                this.getUserData()
                break;
            default:
                break;
        }
    }

    render() {
        const user = this.state.user
        return user ? (
            <div>
                <UserPage />
            </div>
        ) : (
                <div>
                    <SignInPage />
                </div>
            )
    }
}



export default connect(null, null)(URLBookManager)