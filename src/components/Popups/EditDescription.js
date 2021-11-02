import React, { Component } from 'react';
import { connect } from 'react-redux'

class EditDescription extends Component {
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

export default connect(mapStateToProps)(EditDescription)