import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class NewDataEntry extends Component {
    constructor() {
        super();
        this.toEdit = true;
        this.inputs = ["Date", "Time", "Description", "Price"];
        this.newInput = "";
        this.state = {
            "date": "",
            "time": "",
            "description": "",
            "price": ""
        }
    }

    handleInputChange(e) {
        if (e.target.value) {
            this.newInput = e.target.value + e.target.placeholder
        } else {
            this.newInput = "";
        }
    }

    // ON_CLICK
    validityCheck(e) {
        let fieldNrPreCheck = parseInt(e.target.id.slice(e.target.id.length - 1, e.target.id.length))
        const prevEnteredValues = Object.values(this.state)


        if (document.getElementById('newInput' + fieldNrPreCheck).disabled === false) {
            console.log('NDE onclick ', e.target.placeholder, ' - ', fieldNrPreCheck, '  >  top empty field: ', prevEnteredValues.indexOf("") + 1);

            if (e.target.value) {
                this.newInput = e.target.value + e.target.placeholder
            } else {
                this.newInput = ""
            }


            if (this.toEdit) {
                if (prevEnteredValues.indexOf("") > -1) {  //-- ha van üres field
                    if ((prevEnteredValues.indexOf("") + 1) !== fieldNrPreCheck) {  //-- ha nem az az üres field, amelyikre rá lett kattintva
                        for (let i = 1; i < 5; i++) {
                            document.getElementById('newInput' + i).disabled = true
                        }

                        
                        document.getElementById('newInput' + (prevEnteredValues.indexOf("") + 1)).disabled = false
                        document.getElementById('newInput' + (prevEnteredValues.indexOf("") + 1)).style.backgroundColor = "red"
                        document.getElementById('newInput' + (prevEnteredValues.indexOf("") + 1)).focus()
                        document.getElementById('newInput' + (prevEnteredValues.indexOf("") + 1)).select()
                        //this.toEdit = false;
                        console.log('NDE empty field style: ',document.getElementById('newInput' + (prevEnteredValues.indexOf("") + 1)).style.backgroundColor);
                    }
                }
            }

            //     if (!enteredValues[fieldNrPreCheck - 2]) {
            //         console.log('NDE alarm !', this.inputs[fieldNrPreCheck - 2]);
            //         for (let i = 1; i < 5; i++) {
            //             if (i === (fieldNrPreCheck - 1)) {
            //                 document.getElementById('newInput' + i).focus = true;
            //                 document.getElementById('newInput' + i).disabled = false;
            //                 document.getElementById('newInput' + i).style.backgroundColor = "red"
            //             } else {
            //                 document.getElementById('newInput' + i).disabled = true
            //             }
            //         }
            //         //document.getElementById('newInput' + (fieldNrPreCheck - 1)).disabled = false
            //         //document.getElementById('newInput' + (fieldNrPreCheck - 1)).style.backgroundColor = "red"
            //     }

            //     console.log('NDE validity ', fieldNrPreCheck - 2, this.newInput, enteredValues, enteredValues[fieldNrPreCheck - 2]);
            //}
        }
    }



    // ON_BLURE
    updateState(e, type) {
        // let fieldNrPostCheck = parseInt(e.target.id.slice(e.target.id.length - 1, e.target.id.length))
        // const postEnteredValues = Object.values(this.state)
        // console.log('NDE post ', type, fieldNrPostCheck);
        // if (e.target.value) {
        //     this.newInput = e.target.value + e.target.placeholder
        //     document.getElemenytById('newInput' + fieldNrPostCheck).style.backgroundColor = "white"
        // } else {
        //     this.newInput = "";
        //     document.getElementById('newInput' + fieldNrPostCheck).style.backgroundColor = "red"
        // }
        if (e.target.value) {
            for (let i = 1; i < 5; i++) {
                document.getElementById('newInput' + i).disabled = false;
                document.getElementById('newInput' + i).style.backgroundColor = "white"
            }
        }
        // else {
        //     e.target.style.backgroundColor = "red"
        //     for (let i = 1; i < 5; i++) {
        //         if (i !== fieldNrPostCheck) {
        //             document.getElementById('newInput' + i).disabled = true;
        //             //document.getElementById('newInput' + i).style.backgroundColor = "white"
        //         }
        //     }
        // }

        this.setState({
            ...this.state,
            [type]: this.newInput
        })
    }

    handleSubmit = () => {
        //console.log('new data ',this.state);
        let isEmptyCheck = false;
        Object.entries(this.state).forEach(([key, val]) => {
            if (val === "") {
                isEmptyCheck = true
                console.log('NDE ' + key + ' is empty!');
            }
        })
        if (!isEmptyCheck) {
            this.dispatchToState("ADD-DATA", this.state);
        } else {
            console.log('NewDataEntry empty fields!');
        }
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
                    <input id="newInput1" name="newInput1" placeholder={this.inputs[0]} onClick={e => { this.validityCheck(e) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, 'date') }} />
                    <input id="newInput2" name="newInput2" placeholder={this.inputs[1]} onClick={e => { this.validityCheck(e) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, 'time') }} />
                    <input id="newInput3" name="newInput3" placeholder={this.inputs[2]} onClick={e => { this.validityCheck(e) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, 'description') }} />
                    <input id="newInput4" name="newInput4" placeholder={this.inputs[3]} onClick={e => { this.validityCheck(e) }} onChange={e => { this.handleInputChange(e) }} onBlur={e => { this.updateState(e, 'price') }} />
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