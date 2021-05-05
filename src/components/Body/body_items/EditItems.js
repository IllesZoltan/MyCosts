import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class EditItems extends Component {

    newEntry(type) {
        if(type === "NewGroup"){
            this.dispatcher('popup', type)
        }
        if (type === "NewTarget") {
            if (this.props.ActiveGroup) {
                this.dispatcher('popup', type)
            }
        }
        if (type === "NewData") {
            if (this.props.ActiveTarget) {
                this.dispatcher('popup', type)
            }
        }
    }

    editItems(type) {
        if(type === "EditGroup"){
            this.dispatcher('popup', type)
        }
        if (type === "EditTarget") {
            if (this.props.ActiveGroup) {
                this.dispatcher('popup', type)
            }
        }
        if (type === "EditData") {
            if (this.props.ActiveGroup) {
                this.dispatcher('popup', type)
            }
        }
    }

    dispatcher(type, value) {
        this.props.dispatch({ type: type, value: value });
    }

    render() {
        return (
            <div className="cost-cont-btn">
                <Link to="/loaded_items"><div className="s-buttons" onClick={() => this.newEntry(this.props.sectionNew)}><img src="icons8-add-new-96.png" alt="New icon" /></div></Link>
                <Link to="/loaded_items"><div className="s-buttons" onClick={() => { this.editItems(this.props.sectionEdit) }}><img src="icons8-edit-128.png" alt="Edit icon" /></div></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(EditItems)