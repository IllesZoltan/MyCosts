import React, { Component } from "react";
import './Popups.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import DescriptionSelection from "./DescriptionSelection";


class NewDataEntry extends Component {
    constructor() {
        super();
        this.inputs = ["Date", "Time", "Description", "Price"];
        this.newInput = "";
        this.state = {
            "date": "",
            "time": "",
            "description": "",
            "price": ""
        };
        this.fieldAlertBgr = "rgb(250, 178, 178)";
        this.sendData = false;
        this.nowActive = false;
    }

    fieldAlertTxt(placeHolderTxt) {
        return "Adding " + placeHolderTxt + " required";
    }

    // sendData() {
    //     let sendingData = false;
    //     const stateValues = Object.values(this.state);
    //     let emptyFields = 4;

    //     for (let i = 1; i < 5; i++) {
    //         if (!stateValues[i - 1]) {   //-- ha üres a mező
    //             console.log("newInput " + i);
    //         } else {
    //             console.log("field not empty ", i);
    //         }
    //     }

    //     if (emptyFields === 0) { sendingData = true }
    //     return sendingData;
    // }


    enableToSend(nr) {
        let filledFields = 0;
        for (let i = 1; i < 5; i++) {
            if (document.getElementById("newInput" + i).value !== "") {
                filledFields++;
            }
        }
        if (filledFields === 4) {
            this.sendData = true;
        } else {
            this.sendData = false;
        }
    }


    handleInputChange(e) {

        if (e.target.value) {
            this.newInput = e.target.value
        } else {
            this.newInput = "";
        }
    }


    changeFieldProperty(editable, fieldNR) {
        let fieldID = document.getElementById("newInput" + fieldNR);

        if (editable) {
            for (let i = 1; i < 5; i++) {
                document.getElementById('newInput' + i).disabled = editable
            }
            fieldID.disabled = !editable
            fieldID.style.backgroundColor = this.fieldAlertBgr
            fieldID.placeholder = this.fieldAlertTxt(fieldID.placeholder)
            fieldID.focus()
            fieldID.select()
        } else {
            fieldID.placeholder = this.inputs[fieldNR - 1];
            fieldID.disabled = editable;
            fieldID.style.backgroundColor = "white";
        }
    }

    // ON_CLICK
    checkAll() {

        //-- minden mező aktív állapotba helyezése
        for (let i = 1; i < 5; i++) {
            this.changeFieldProperty(false, i);
        }

    }

    checkClicked(fieldNrCheck) {
        const enteredValues = Object.values(this.state);

        //-- mező ellenőrzése
        if (enteredValues.indexOf("") > -1) {  //-- ha van üres mező
            if ((enteredValues.indexOf("") + 1) !== fieldNrCheck) {  //-- ha nem az az üres mező, amelyikre rá lett kattintva
                this.changeFieldProperty(true, (enteredValues.indexOf("") + 1))
            }
        } else {
            for (let i = 1; i < 5; i++) {
                this.changeFieldProperty(false, i);
            }
        }
        this.enableToSend(fieldNrCheck);
    }

    // markAllEmpty() {

    //     //if (this.nowActive) {
    //     if (document.getElementById("newInput1").value !== "") {
    //         for (let i = 1; i < 5; i++) {
    //             if (document.getElementById("newInput" + i).value === "") {
    //                 document.getElementById("newInput" + i).disabled = false
    //                 document.getElementById("newInput" + i).style.backgroundColor = this.fieldAlertBgr
    //                 document.getElementById("newInput" + i).placeholder = this.fieldAlertTxt(document.getElementById("newInput" + i).placeholder)
    //             }
    //         }
    //     }
    //     //}
    // }

    validityCheck(fieldNrCheck) {

        if (!document.getElementById("newInput" + fieldNrCheck).disabled) {
            if (fieldNrCheck === 1) {
                if (document.getElementById("newInput" + fieldNrCheck).value === "") {
                    this.dispatchToState('show-date', "Select_Date");
                } else {
                    if (this.sendData) {
                        this.dispatchToState('show-date', "Select_Date");
                    }
                    else { this.dispatchToState('show-date', "save_date"); }
                }
            }

            if (fieldNrCheck === 2) {
                if (document.getElementById("newInput" + fieldNrCheck).value === "") {
                    this.dispatchToState('show-time', "Select_Time");
                } else {
                    if (this.sendData) {
                        this.dispatchToState('show-time', "Select_Time");
                    }
                    else { this.dispatchToState('show-time', "save_time"); }
                }
            }

            if (fieldNrCheck === 3) {
                if (document.getElementById("newInput" + fieldNrCheck).value === "") {
                    this.dispatchToState('show-descrpt', "Select_Description");
                } else {
                    if (this.sendData) {
                        this.dispatchToState('show-descrpt', "Select_Description");
                    }
                    else { this.dispatchToState('show-descrpt', "save_descrpt"); }
                }
            }

            if (fieldNrCheck === 4) {
                this.dispatchToState('hideALLsel', "")
            }
        }

        this.checkAll();
        this.checkClicked(fieldNrCheck);


        this.setState({
            ...this.state
        })
    }

    // ON_BLURE
    updateState(e, type, nr) {
        if (e.target.value) {
            this.newInput = e.target.value;
        } else {
            this.newInput = "";
        }

        this.enableToSend(nr);

        this.setState({
            ...this.state,
            [type]: this.newInput
        })
    }

    dateSel() {
        let dateWin;
        if (this.props.DateSelectionWindow === "Select_Date") {
            dateWin = <DateSelection />
        }
        return dateWin;
    }

    timeSel() {
        let timeWin;
        if (this.props.TimeSelectionWindow === "Select_Time") {
            timeWin = <TimeSelection />
        }
        return timeWin;
    }

    descrptSel() {
        let descrptWin;
        if (this.props.DescriptionSelectionWindow === "Select_Description") {
            descrptWin = <DescriptionSelection />
        }
        return descrptWin;
    }


    handleSubmit = () => {


        this.hidePopup();

        //console.log('new data ', this.state);

        this.dispatchToState("ADD-DATA", this.state);

        // let isEmptyCheck = false;
        // Object.entries(this.state).forEach(([key, val]) => {
        //     if (val === "") {
        //         isEmptyCheck = true
        //         console.log('NDE ' + key + ' is empty!');
        //     }
        // })
        // if (!isEmptyCheck) {
        //     this.dispatchToState("ADD-DATA", this.state);
        // } else {
        //     console.log('NewDataEntry empty fields!');
        // }
    }

    //     getDescList(){
    // console.log("NDE getting description list");
    //     }

    hideInnerPopups() {
        if (this.dateSel() || this.timeSel() || this.descrptSel()) {
            this.dispatchToState('hideALLsel', "");
        }
    }

    hidePopup() {
        this.dispatchToState('popup', "");
        this.dispatchToState('show-date', "clear_hide");
        this.dispatchToState('show-time', "clear_hide");
        this.dispatchToState('show-descrpt', "clear_hide");
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    createBtn() {
        let btn;
        if (this.sendData) {
            btn = <Link to="/item_loader"><div className="new-btns create" onClick={() => this.handleSubmit()} >Create</div></Link>
            this.checkAll()
        } else {
            btn = <Link to="/loaded_items"><div className="new-btns create_standby" >Create</div></Link>
        }
        return btn
    }

    // componentDidMount(){
    //     this.getDescList();
    // }

    render() {
        return (
            <div className="new-cont">
                {this.dateSel()}
                {this.timeSel()}
                {this.descrptSel()}
                <div className="new-title" onClick={() => this.hideInnerPopups()}>{'Enter new ' + this.props.title}</div>
                <div className="new-input" onClick={() => this.hideInnerPopups()}>
                    <Link to="/loaded_items"><input id="newInput1" name="newInput1" placeholder={this.inputs[0]} value={this.props.SelectedDate} onClick={() => { this.validityCheck(1) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, "date", 1) }} autoComplete="off" /></Link>
                    <Link to="/loaded_items"><input id="newInput2" name="newInput2" placeholder={this.inputs[1]} value={this.props.SelectedTime} onClick={() => { this.validityCheck(2) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, "time", 2) }} autoComplete="off" /></Link>
                    <Link to="/loaded_items"><input id="newInput3" name="newInput3" placeholder={this.inputs[2]} value={this.props.SelectedDescription} onClick={() => { this.validityCheck(3) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, "description", 3) }} autoComplete="off" /></Link>
                    <input id="newInput4" name="newInput4" placeholder={this.inputs[3]} onClick={e => { this.validityCheck(4) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, "price", 4) }} autoComplete="off" />
                </div>
                <div className="btn-ribbon" onClick={() => this.hideInnerPopups()}>
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