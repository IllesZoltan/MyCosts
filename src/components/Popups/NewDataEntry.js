import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class NewDataEntry extends Component {
    constructor() {
        super();
        this.newInput = "";
        this.state = {
            "date": "",
            "time": "",
            "description": "",
            "price": ""
        }
    }

    handleInputChange(e) {
        this.newInput = e.target.value
    }

    updateState(e,type) {
        this.setState({
            [type]: this.newInput
        })
    }

    handleSubmit = () => {
        //console.log('new data ',this.state);
        this.dispatchToState("ADD-DATA", this.state);
    }

    hidePopup() {
        this.dispatchToState('popup', "");
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    createBtn() {
        let btn;
        if (this.state["date"]) {
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
                <div className="new-input new-data-input">
                    <input id="newInput1" name="newInput1" placeholder={'Date'} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e,'date') }} />
                    <input id="newInput2" name="newInput2" placeholder={'Time'} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e,'time') }} />
                    <input id="newInput3" name="newInput3" placeholder={'Description'} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e,'description') }} />
                    <input id="newInput4" name="newInput4" placeholder={'Price'} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e,'price') }} />
                </div>
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

export default connect(mapStateToProps)(NewDataEntry)