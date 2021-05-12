import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const newInput = [];

class EditData extends Component {
    constructor() {
        super()
        this.state = {
            selectedItem: "",
            toEdit: true
        }
    }


    handleInputChange(e, id) {
        newInput[id] = e.target.value
    }

    handleSubmit(key) {
        const dataObject = {};
        const inpIDs = ['date', 'time', 'description', 'price'];

        for (let a = 0; a < newInput.length; a++) {
            dataObject[inpIDs[a]] = newInput[a]
        }
        const editedDATA = {
            dId: key,
            dName: dataObject
        }
        this.dispatchToState("EDIT-DATA", editedDATA);
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
        const inputIDs = ['date', 'time', 'description', 'price']
        const nrOfItems = Object.keys(this.props.Datas).length;
        if (this.state.toEdit) {
            for (let i = 0; i < nrOfItems; i++) {
                if (i !== idx) {
                    for (let j = 0; j < inputIDs.length; j++) {
                        document.getElementById('input-' + inputIDs[j] + i).disabled = true
                    }
                }
            }
            for (let j = 0; j < inputIDs.length; j++) {
                document.getElementById('input-' + inputIDs[j] + idx).style.backgroundColor = 'rgb(161, 255, 156)';
                newInput[j] = document.getElementById('input-' + inputIDs[j] + idx).value;
            }
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
        const dataValues = Object.values(JSON.parse(elem))
        let dataAlert = `${dataValues[0]}/${dataValues[2]}/${dataValues[3]}`
        let trash = undefined;
        let trashIMG = ""
        if (this.state.selectedItem === "" || this.state.selectedItem === idx) {
            trashIMG = 'trash.png';
            trash = <Link to="alert"><div className="edit-btn" onClick={() => this.showAlert(keys, dataAlert)}><img src={trashIMG} alt="trash icon" /></div></Link>
        } else {
            trashIMG = "trash-inactive.png";
            trash = <div className="edit-btn"><img src={trashIMG} alt="trash icon" /></div>
        }
        return trash
    }

    dataDetails(elem, idx) {
        const datas = <div>
            <input id={"input-date" + idx} className="data-input" defaultValue={JSON.parse(elem)["date"]} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e, 0) }} />
            <input id={"input-time" + idx} className="data-input" defaultValue={JSON.parse(elem)["time"]} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e, 1) }} />
            <input id={"input-description" + idx} className="data-input" defaultValue={JSON.parse(elem)["description"]} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e, 2) }} />
            <input id={"input-price" + idx} className="data-input" defaultValue={JSON.parse(elem)["price"]} onClick={() => this.isSelected(idx)} onChange={e => { this.handleInputChange(e, 3) }} />
        </div>
        return datas
    }





    render() {
        return (
            <div className="new-cont edit-cont data-edit-cont">
                <div className="new-title">{'Edit ' + this.props.title}</div>
                <div className="edit-list">
                    {Object.entries(this.props.Datas).map(([keys, elem], idx) => {
                        return (
                            <div className="edit-input" key={idx}>
                                {this.dataDetails(elem, idx)}
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