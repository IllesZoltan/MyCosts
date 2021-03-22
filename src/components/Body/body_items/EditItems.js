import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class EditItems extends Component {
    render() {
        return (
            <div className="cost-cont-btn">
                <div className="s-buttons"><Link to={"n"+this.props.section}><img src="icons8-add-new-96.png" alt="New icon" /></Link></div>
                <div className="s-buttons"><Link to={"e"+this.props.section}><img src="icons8-edit-128.png" alt="Edit icon" /></Link></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(EditItems)