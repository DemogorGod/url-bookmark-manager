
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
// import { API, graphqlOperation } from 'aws-amplify'
// import * as mutations from '../../graphql/mutations'

let dynamoUser;
class Category extends Component {
    state = {
        edit: false,
        bookmarks: this.props.category.bookmarks,
        name: this.props.category.name
    }

    handleOnChangeInput = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    handleToggleEdit = () => { this.setState({ edit: !this.state.edit }) }

    handleSave = async () => {
        // let user = this.props.user
        // let bookmarks = user.bookmarks
        // for (let i = 0; i < bookmarks.length; i++) {
        //     if (bookmarks[i].id === this.props.bookmark.id) {
        //         bookmarks[i] = {
        //             name: this.state.name,
        //             url: this.state.url,
        //             id: this.props.bookmark.id
        //         }
        //     }
        // }
        // user.bookmarks = bookmarks
        // await delete user.createdAt
        // await delete user.updatedAt
        // await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
        // dynamoUser = await user
        // await this.props.setUser()
        // this.handleToggleEdit()
        // window.location.reload(true);
    }

    render() {
        return !this.state.edit ? (
            <div>
                <div className="bookmark-holder">
                    <h1><i className="material-icons edit-button" onClick={this.handleToggleEdit}>create</i>  {this.props.category.name}</h1>
                </div>
                <hr />
            </div>
        ) : (
                <div>
                    <button className='edit-buttons' onClick={this.handleToggleEdit}>Cancel</button>
                    <button className='edit-buttons' onClick={this.handleSave}>Save</button>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch({ type: 'SET_USER', value: dynamoUser })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)