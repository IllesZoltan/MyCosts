import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let newInput = "";
let toEdit = true;
let selectedItem = "";

class EditGroup extends Component {


    handleInputChange(e) {
        newInput = e.target.value
    }

    handleSubmit(key) {
        const editedGRP = {
            gId: key,
            gName: newInput
        }
        this.dispatchToState("EDIT-GRP", editedGRP);
    }

    hidePopup() {
        this.dispatchToState('popup', "");
        toEdit = true;
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    showAlert(key, item) {
        const itemID = { key: key, value: item }
        this.dispatchToState('alert', itemID);
    }

    // delGr(groupKey) {
    //     this.dispatchToState('DEL-GRP', groupKey);
    //     toEdit = true;
    // }

    isSelected(idx) {
        const nrOfItems = Object.keys(this.props.Groups[0]).length;
        if (toEdit) {
            for (let i = 0; i < nrOfItems; i++) {
                if (i !== idx) {
                    document.getElementById('input-new-group' + i).disabled = true
                }
            }
            document.getElementById('input-new-group' + idx).style.backgroundColor = 'rgb(161, 255, 156)'
            selectedItem = idx;
            toEdit = false;
        }
    }

    


    render() {
        return (
            <div className="new-cont edit-cont">
                <div className="new-title">{'Edit ' + this.props.title}</div>
                <div className="edit-list">
                    {this.props.Groups.map(el => Object.entries(el).map(([keys, elem], idx) => {
                        return (
                            <div className="edit-input" key={idx}>
                                <input id={"input-new-group" + idx} defaultValue={elem} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e) }} />
                                <Link to="item_loader"><div className="edit-btn" onClick={() => this.handleSubmit(keys)}><img src="check.png" alt="check icon" /></div></Link>
                                <Link to="alert"><div className="edit-btn" onClick={() => this.showAlert(keys, elem)}><img src="trash.png" alt="trash icon" /></div></Link>
                            </div>

                        )
                    }))
                    }
                </div>
                < div className="btn-ribbon only-cancel">
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

export default connect(mapStateToProps)(EditGroup)