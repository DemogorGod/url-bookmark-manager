
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

let dynamoUser;
class Bookmark extends Component {
    state = {
        edit: false,
        url: this.props.bookmark.url,
        name: this.props.bookmark.name
    }

    handleOnChangeInput = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    handleToggleEdit = () => { this.setState({ edit: !this.state.edit }) }

    handleSave = async () => {
        let user = this.props.user
        let bookmarks = user.bookmarks
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].id === this.props.bookmark.id) {
                bookmarks[i] = {
                    name: this.state.name,
                    url: this.state.url,
                    id: this.props.bookmark.id
                }
            }
        }
        user.bookmarks = bookmarks
        await delete user.createdAt
        await delete user.updatedAt
        await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
        dynamoUser = await user
        await this.props.setUser()
        this.handleToggleEdit()
        window.location.reload(true);
    }
    render() {
        return !this.state.edit ? (
            <div>
                <div className="bookmark-holder">
                    <h1><i className="material-icons edit-button" onClick={this.handleToggleEdit}>create</i>  {this.props.bookmark.name}</h1>
                    <a href={this.props.bookmark.url} rel="noopener noreferrer" target="_blank">{this.props.bookmark.url}</a>
                    <span>x</span>
                </div>
                <hr />
            </div>
        ) : (
                <div>
                    <div className="bookmark-holder">
                        <input type='text'
                            name='name'
                            value={this.state.name}
                            placeholder='Name...'
                            className='manager-input'
                            onChange={this.handleOnChangeInput} />
                        <input type='text'
                            name='url'
                            value={this.state.url}
                            placeholder='Url...'
                            className='manager-input'
                            onChange={this.handleOnChangeInput} />
                        <button className='edit-buttons' onClick={this.handleToggleEdit}>Cancel</button>
                        <button className='edit-buttons' onClick={this.handleSave}>Save</button>
                    </div>
                    <hr />
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark)