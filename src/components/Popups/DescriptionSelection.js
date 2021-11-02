import React, { Component } from 'react';
import { connect } from 'react-redux'

class DescriptionSelection extends Component {
    render() {
        return (
            <div className="">
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(DescriptionSelection)