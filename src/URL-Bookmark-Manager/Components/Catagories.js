
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'
import Category from './Catagory'

class Catagories extends Component {
    state = {
        search: '',
        catagories: []
    }

    handleOnChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount = () => {
        this.setState({ catagories: this.props.user.categorizedMarks })
    }

    handleSearch = () => {
        // let bookmarks = this.state.bookmarks
        // let search = this.state.search
        // let foundList = []
        // if (bookmarks) {
        //     for (let i = 0; i < bookmarks.length; i++) {
        //         if (bookmarks[i].name.toLowerCase() === this.state.search.toLowerCase()) {
        //             foundList.push(bookmarks[i])
        //         }
        //     }
        // }
        // if (foundList.length === 0) { this.setState({ output: 'No such name found...' }) }
        // this.setState({ bookmarks: foundList })
        // if (search === '') { this.setState({ bookmarks: this.props.user.bookmarks, output: '' }) }
    }
    render() {
        let catagories = this.state.catagories
        return catagories ? (
            <div style={{ float: 'left', width: '100%' }}>
                <input type='text'
                    name='search'
                    placeholder='Search...'
                    value={this.state.search}
                    className="search-input"
                    onChange={this.handleOnChangeInput} />
                <button onClick={this.handleSearch} className="search-button">Search</button>
                {catagories.map((category, index) =>
                    <Category key={index} category={category} />
                )}
            </div>
        ) : (
                <div>
                    <p>You have no catagories listed...</p>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Catagories)