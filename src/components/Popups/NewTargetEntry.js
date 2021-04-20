import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class NewTargetEntry extends Component {
    constructor() {
        super();
        this.newInput = "";
        this.state = {
            input: ""
        }
    }

    handleInputChange(e) {
        this.newInput = e.target.value
    }

    updateState(e) {
        this.setState({
            input: this.newInput
        })
    }

    handleSubmit = () => {
        this.dispatchToState("ADD-TRG", this.state.input);
    }

    hidePopup() {
        this.dispatchToState('popup', "");
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    createBtn() {
        let btn;
        if (this.state.input) {
            btn = <Link to="/item_loader"><div className="new-btns create" onClick={() => this.handleSubmit()} >Create</div></Link>
        } else {
            btn = <Link to="/loaded_items"><div className="new-btns create" onClick={() => this.hidePopup()} >Create</div></Link>
        }
        return btn
    }

    render() {
        return (
            <div className="new-cont">
                <div className="new-title">{'Enter new ' + this.props.title}</div>
                <div className="new-input"><input id="newInput" name="newInput" placeholder={'New ' + this.props.title} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e) }} /></div>
                <div className="btn-ribbon">
                    {this.createBtn()}
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

export default connect(mapStateToProps)(NewTargetEntry)