import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let newInput = ""

class NewGroupEntry extends Component {


    handleInputChange(e) {
        newInput = e.target.value
    }

    handleSubmit = () => {
        if (newInput) {
            this.dispatchToState("ADD-GRP", newInput);
        }
    }

    hidePopup() {
        this.dispatchToState('popup', "");
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    render() {
        return (
            <div className="new-cont">
                <div className="new-title">{'Enter new ' + this.props.title}</div>
                <div className="new-input"><input id="newInput" name="newInput" placeholder={'New ' + this.props.title} onChange={e => { this.handleInputChange(e) }} /></div>
                <div className="btn-ribbon">
                    <Link to="/item_loader" ><div className="new-btns create" onClick={() => this.handleSubmit()}>Create</div></Link>
                    <Link to="/loaded_items"><div className="new-btns cancel" onClick={() => this.hidePopup()}>Cancel</div></Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(NewGroupEntry)