
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
import Bookmark from './Bookmark'

class AllBookmarks extends Component {
    state = {
        search: '',
        output: '',
        bookmarks: null
    }

    componentDidMount = () => {
        this.setState({ bookmarks: this.props.bookmarks })
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSearch = () => {
        let bookmarks = this.state.bookmarks
        let search = this.state.search
        let foundList = []
        if (bookmarks) {
            for (let i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].name.toLowerCase() === this.state.search.toLowerCase()) {
                    foundList.push(bookmarks[i])
                }
            }
        }
        if (foundList.length === 0) { this.setState({ output: 'No such name found...' }) }
        this.setState({ bookmarks: foundList })
        if (search === '') { this.setState({ bookmarks: this.props.user.bookmarks, output: '' }) }
    }

    render() {
        const bookmarks = this.state.bookmarks
        return (
            <div style={{ float: 'left', width: '100%' }}>
                <input type='text'
                    name='search'
                    placeholder='Search...'
                    value={this.state.search}
                    className="search-input"
                    onChange={this.handleOnChangeInput} />
                <button onClick={this.handleSearch} className="search-button">Search</button>
                <p style={{ width: '100%', color: 'red' }}>{this.state.output}</p>
                {bookmarks ?
                    <div>
                        {bookmarks.map(((bookmark, index) =>
                            <Bookmark key={index} bookmark={bookmark} />
                        ))}
                    </div> :
                    <div>
                        You do not have any bookmarks created at this moment
                    </div>
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

export default connect(mapStateToProps, null)(AllBookmarks)