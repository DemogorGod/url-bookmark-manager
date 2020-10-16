
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
import Bookmark from './Bookmark'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

// import { API, graphqlOperation } from 'aws-amplify'
// import * as mutations from '../../graphql/mutations'

let dynamoUser;
class Category extends Component {
    state = {
        edit: false,
        expand: false,
        add: false,
        select: 'NewBookmark',
        name: '',
        url: 'http://',
        categoryName: this.props.category.name
    }
    componentDidMount = () => {
        // console.log(this.props.category.bookmarks)
    }

    handleOnChangeInput = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    handleToggleAdd = () => {
        this.setState({ add: !this.state.add })
        if (!this.state.add) {
            this.setState({ select: 'NewBookmark' })
        }
    }

    handleToggleEdit = () => { this.setState({ edit: !this.state.edit }) }
    handleToggleExpand = () => { this.setState({ expand: !this.state.expand }) }

    handleSave = async () => {
        let category = this.props.category
        category.name = this.state.categoryName
        let user = this.props.user
        let index;
        for (let i = 0; i < user.categorizedMarks.length; i++) {
            if (category.id === user.categorizedMarks[i].id) {
                index = i
            }
        }
        user.categorizedMarks[index] = category
        await delete user.createdAt
        await delete user.updatedAt
        await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
        window.location.reload(true);
    }

    handleAddBookmark = async () => {
        if (this.state.name && this.state.url) {
            try {
                let bookmarker;
                let user = this.props.user
                if (this.state.select === 'NewBookmark') {
                    bookmarker = {
                        id: '_' + Math.random().toString(36).substr(0, 20),
                        name: this.state.name,
                        url: this.state.url
                    }
                } else {
                    for (let i = 0; i < user.bookmarks.length; i++) {
                        if (this.state.select === user.bookmarks[i].id) {
                            bookmarker = user.bookmarks[i]
                        }
                    }
                }
                let userBookmarks = []
                if (this.props.user.bookmarks) {
                    userBookmarks = this.props.user.bookmarks
                    userBookmarks.push(bookmarker)
                } else {
                    userBookmarks.push(bookmarker)
                }
                user.bookmarks = await userBookmarks
                let category = this.props.category
                category.bookmarks.push(bookmarker)
                console.log(category)
                console.log(user)
                for (let i = 0; i < user.categorizedMarks.length; i++) {
                    if (user.categorizedMarks[i].id === category.id) {
                        user.categorizedMarks[i] = category
                    }
                }
                console.log(user)
                await delete user.createdAt
                await delete user.updatedAt
                await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
                this.setState({ name: '', url: 'http://' })
            } catch (error) {
                console.log(error)
            }
        } else {
            this.setState({ output: 'Please do not leave inputs empty!' })
        }
    }



    render() {
        return (
            <div className="category-container">
                {this.state.add ?
                    <div className="add-bookmark-to-category" >
                        <h1 >
                            Category: {this.props.category.name}
                        </h1>
                        <select name="select" onChange={this.handleOnChangeInput} >
                            <option value="NewBookmark" >New Bookmark</option>
                            {this.props.user.bookmarks.map((bookmark, index) =>
                                <option value={bookmark.id} key={index}>{bookmark.name}</option>
                            )}
                        </select>
                        {this.state.select === 'NewBookmark' ?
                            <div>
                                <input type='text'
                                    name='name'
                                    value={this.state.name}
                                    placeholder='Name...'
                                    onChange={this.handleOnChangeInput} />
                                <input type='text'
                                    name='url'
                                    value={this.state.url}
                                    placeholder='Url...'
                                    onChange={this.handleOnChangeInput} />
                            </div> : null
                        }
                        <button className='edit-buttons' onClick={this.handleAddBookmark}>Add</button>
                        <button className='edit-buttons' onClick={this.handleToggleAdd}>Cancel</button>
                    </div> : null
                }
                <div className="bookmark-holder">
                    <h1 >
                        {!this.state.edit ?
                            <div>
                                <i className="material-icons edit-button" onClick={this.handleToggleEdit}>create</i>
                                {this.props.category.name}
                            </div> :
                            <div>
                                <input type='text'
                                    name='categoryName'
                                    value={this.state.categoryName}
                                    placeholder='Name...'
                                    className="manager-input"
                                    onChange={this.handleOnChangeInput} />
                                <i className="material-icons edit-button" onClick={this.handleSave}>done</i>
                                <i className="material-icons edit-button" onClick={this.handleToggleEdit}>close</i>
                            </div>
                        }
                    </h1>
                    {!this.state.expand ?
                        <div>
                            <i className="material-icons add-button-category" onClick={this.handleToggleAdd}>playlist_add</i>
                            <div onClick={this.handleToggleExpand} className="expand-bookmarks">
                                <i className="material-icons expand-button" >expand_more</i>
                            </div>
                        </div> :
                        <div >
                            <i className="material-icons add-button-category" onClick={this.handleToggleAdd}>playlist_add</i>
                            <div onClick={this.handleToggleExpand} className="expand-bookmarks">
                                <i className="material-icons expand-button" >expand_less</i>
                            </div>
                            <div className="expanded-bookmarks">
                                {this.props.category.bookmarks.length > 0 ?
                                    <div>
                                        {this.props.category.bookmarks.map((bookmark, index) =>
                                            <div key={index}>
                                                <Bookmark bookmark={bookmark} />
                                            </div>
                                        )}
                                    </div> :
                                    <div style={{ height: '50px' }}>You do not have any bookmarks added to this category...</div>
                                }
                                <br />
                            </div>
                        </div>
                    }
                    <hr style={{ width: '100%' }} />
                </div>
            </div >
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