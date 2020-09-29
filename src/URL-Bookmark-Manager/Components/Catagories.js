
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Styles/URLManager.css'

class Catagories extends Component {
    state = {

    }
    render() {
        return (
            <div style={{ float: 'left', width: '100%' }}>
                catagories
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