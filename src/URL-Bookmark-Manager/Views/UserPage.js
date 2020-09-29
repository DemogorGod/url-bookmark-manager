
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import * as mutations from '../../graphql/mutations'
import Navbar from '../Components/Navbar'
import URLManager from '../Components/URLManager'

let dynamoUser = null;
class URLBookManager extends Component {
    state = {
        cognitoUser: null
    }
    componentDidMount = async () => {
        const user = await Auth.currentAuthenticatedUser()
        user ? await this.setState({ cognitoUser: user }) : await this.setState({ cognitoUser: null })
        this.getUserInfo()
    }

    getUserInfo = async () => {
        try {
            const currentUser = this.state.cognitoUser
            const users = await API.graphql(graphqlOperation(queries.listUsers))
            const userList = users.data.listUsers.items
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].id === currentUser.attributes.sub) {
                    let user = await API.graphql(graphqlOperation(queries.getUser, { id: currentUser.attributes.sub }))
                    dynamoUser = user.data.getUser
                    this.props.setUser()
                }
            }
            if (!dynamoUser) {
                this.createNewUser()
            }
        } catch (error) {
            console.log(error)
        }
    }

    createNewUser = async () => {
        try {
            let input = {
                id: this.state.cognitoUser.attributes.sub,
                name: this.state.cognitoUser.username,
            }
            await API.graphql(graphqlOperation(mutations.createUser, { input: input }))
            this.props.setUser()
            console.log('created user')
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <URLManager />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch({ type: 'SET_USER', value: dynamoUser })
    }
}

export default connect(null, mapDispatchToProps)(URLBookManager)