import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let newInput = "";

class EditData extends Component {
    constructor() {
        super()
        this.state = {
            selectedItem: "",
            toEdit: true
        }
    }


    handleInputChange(e) {
        newInput = e.target.value
    }

    handleSubmit(key) {
        const editedTRG = {
            tId: key,
            tName: newInput
        }
        this.dispatchToState("EDIT-TRG", editedTRG);
    }

    hidePopup() {
        this.dispatchToState('popup', "");
        this.setState({
            selectedItem: "",
            toEdit: true
        })
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    showAlert(key, item) {
        const itemID = { type: "data", key: key, value: item }
        this.dispatchToState('alert', itemID);
    }

    isSelected(idx) {
        const nrOfItems = Object.keys(this.props.Targets[0]).length;
        if (this.state.toEdit) {
            for (let i = 0; i < nrOfItems; i++) {
                if (i !== idx) {
                    document.getElementById('input-new-item' + i).disabled = true
                }
            }
            document.getElementById('input-new-item' + idx).style.backgroundColor = 'rgb(161, 255, 156)'
            this.setState({
                selectedItem: idx,
                toEdit: false
            })
        }
    }

    checkBtn(keys, idx) {
        let check = undefined;
        let checkIMG = "";
        if (this.state.selectedItem === "" || this.state.selectedItem === idx) {
            checkIMG = 'check.png';
            check = <Link to="item_loader"><div id="checkB" className="edit-btn" onClick={() => this.handleSubmit(keys)}><img src={checkIMG} alt="check icon" /></div></Link>
        } else {
            checkIMG = "check-inactive.png";
            check = <div id="checkB" className="edit-btn"><img src={checkIMG} alt="check icon" /></div>
        }
        return check
    }

    trashBtn(keys, elem, idx) {
        let trash = undefined;
        let trashIMG = ""
        if (this.state.selectedItem === "" || this.state.selectedItem === idx) {
            trashIMG = 'trash.png';
            trash = <Link to="alert"><div className="edit-btn" onClick={() => this.showAlert(keys, elem)}><img src={trashIMG} alt="trash icon" /></div></Link>
        } else {
            trashIMG = "trash-inactive.png";
            trash = <div className="edit-btn"><img src={trashIMG} alt="trash icon" /></div>
        }
        return trash
    }




    render() {
        return (
            <div className="new-cont edit-cont data-edit-cont">
                <div className="new-title">{'Edit ' + this.props.title}</div>
                <div className="edit-list">
                    {Object.entries(this.props.Datas).map(([keys, elem], idx) => {
                        return (
                            <div className="edit-input" key={idx}>
                                <input id={"input-new-item" + idx} className="data-input" defaultValue={elem} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e) }} />
                                <input id={"input-new-item" + idx} className="data-input" defaultValue={elem} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e) }} />
                                <input id={"input-new-item" + idx} className="data-input" defaultValue={elem} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e) }} />
                                <input id={"input-new-item" + idx} className="data-input" defaultValue={elem} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e) }} />
                                {this.checkBtn(keys, idx)}
                                {this.trashBtn(keys, elem, idx)}
                            </div>
                        )
                    })
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

export default connect(mapStateToProps)(EditData)