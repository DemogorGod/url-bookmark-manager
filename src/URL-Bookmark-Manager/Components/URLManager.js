
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
import ALLBookmarks from '../Components/AllBookmarks'
import Catagories from '../Components/Catagories'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

class URLManager extends Component {
    state = {
        catagories: false,
        allBookmarks: true,
        addBookmarker: false,
        addCategory: false,
        name: '',
        url: 'http://',
        output: ''
    }

    componentDidMount = () => {

    }
    toggleCatagories = () => { this.setState({ catagories: true, allBookmarks: false }) }
    toggleAllBookmarkers = () => { this.setState({ catagories: false, allBookmarks: true }) }

    switchAddBookmarker = () => { this.setState({ addBookmarker: !this.state.addBookmarker, addCategory: false, output: '' }) }
    switchAddCategory = () => { this.setState({ addCategory: !this.state.addCategory, addBookmarker: false, output: '' }) }

    handleOnChangeInput = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    handleCreateBookmarker = async () => {
        if (this.state.name && this.state.url) {
            try {
                let bookmarker = {
                    id: '_' + Math.random().toString(36).substr(0, 20),
                    name: this.state.name,
                    url: this.state.url
                }
                let userBookmarks = []
                if (this.props.user.bookmarks) {
                    userBookmarks = this.props.user.bookmarks
                    userBookmarks.push(bookmarker)
                } else {
                    userBookmarks.push(bookmarker)
                }

                let user = this.props.user
                user.bookmarks = await userBookmarks
                await delete user.createdAt
                await delete user.updatedAt
                await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
                this.switchAddBookmarker()
                this.setState({ name: '', url: 'http://' })
            } catch (error) {
                console.log(error)
            }
        } else {
            this.setState({ output: 'Please do not leave inputs empty!' })
        }
    }

    handleCreateCategory = async () => {
        if (this.state.name) {
            try {
                let category = {
                    id: '_' + Math.random().toString(36).substr(0, 20),
                    name: this.state.name,
                    bookmarks: []
                }
                let userCategories = []
                let push = true
                if (this.props.user.categorizedMarks) {
                    userCategories = this.props.user.categorizedMarks
                    for (let i = 0; i < userCategories.length; i++) {
                        if (category.name === userCategories[i].name) { push = false }
                    }
                    if (push) {
                        userCategories.push(category)
                        let user = this.props.user
                        user.categorizedMarks = await userCategories
                        await delete user.createdAt
                        await delete user.updatedAt
                        await API.graphql(graphqlOperation(mutations.updateUser, { input: user }))
                        this.switchAddCategory()
                        this.setState({ name: '' })
                    } else {
                        this.setState({ output: 'This category already exists' })
                        this.setState({ name: '' })
                    }
                } else {
                    userCategories.push(category)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            this.setState({ output: 'Please do not leave inputs empty!' })
        }
    }
    render() {
        return this.props.user ? (
            <div className="URLM-container">
                <h1>Welcome to URL Bookmark Manager</h1>
                <p>Created by: Stevan Najeeb</p>
                <div className="managers-holder">
                    <button className="URLM-button"
                        style={{ color: this.state.allBookmarks ? '#deb23a' : '#000000' }}
                        onClick={this.toggleAllBookmarkers}>
                        All Bookmarks <span className="add-button" onClick={this.switchAddBookmarker}>+</span>
                    </button>
                    <button className="URLM-button"
                        style={{ color: this.state.catagories ? '#deb23a' : '#000000' }}
                        onClick={this.toggleCatagories}>
                        Catagories <span className="add-button" onClick={this.switchAddCategory}>+</span>
                    </button>
                    <hr style={{ float: 'left', width: '100%' }} />
                    {this.state.addBookmarker ?
                        <div>
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
                            <button className='manager-button' onClick={this.handleCreateBookmarker}>Create</button>
                            <button className='manager-button' onClick={this.switchAddBookmarker}>Cancel</button>
                            <p style={{ color: 'red', float: 'left', width: '100%' }}>{this.state.output}</p>
                        </div> : null
                    }
                    {this.state.addCategory ?
                        <div>
                            <input type='text'
                                name='name'
                                value={this.state.name}
                                placeholder='Name...'
                                className='manager-input'
                                onChange={this.handleOnChangeInput} />
                            <button className='manager-button' onClick={this.handleCreateCategory}>Create</button>
                            <button className='manager-button' onClick={this.switchAddCategory}>Cancel</button>
                            <p style={{ color: 'red', float: 'left', width: '100%' }}>{this.state.output}</p>
                        </div> : null
                    }
                    {this.state.catagories ?
                        <Catagories /> : null
                    }
                    {this.state.allBookmarks ?
                        <ALLBookmarks bookmarks={this.props.user.bookmarks} /> : null
                    }
                </div>
            </div>
        ) : (<div>loading</div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(URLManager)