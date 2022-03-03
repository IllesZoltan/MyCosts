import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Popups.css';

class EditDescription extends Component {
    constructor() {
        super();
        this.newCheck = false;
        this.newInput = "";
        this.descptList = [];
        this.state = {
            newDesc: "",
        }
    }

    descrptEditDispatcher(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    showDescAlert(key, item) {
        const itemID = { type: "description", key: key, value: item }
        this.descrptEditDispatcher('alert', itemID);
    }

    handleInputChange(e) {
        if (e.target.value) {
            this.newInput = e.target.value;
        } else {
            this.newInput = "";
        }
    }

    newCheckBtn() {
        let nCheck;
        if (this.newCheck) {
            nCheck = <Link to='/item_loader'><div className="desc-check" onClick={() => this.saveChanges()}><img src="check-bw.png" alt="check" /></div></Link>
        } else {
            nCheck = <div className="desc-check"><img src="check-inactive.png" alt="check" /></div>
        }
        return nCheck;
    }

    enableToSend() {
        if (this.newInput) {
            this.newCheck = true;
        } else {
            this.newCheck = false;
        }
        this.setState({
            ...this.state,
            newDesc: this.newInput
        })
    }

    saveChanges() {
        this.descrptEditDispatcher('add-descrpt', this.state.newDesc);
        this.descrptEditDispatcher('descrpt-selection', "Select_Description");
    }

    componentDidMount() {
        this.props.Descriptions.forEach(element => {
            this.descptList.push(element.Dscpt);
        });
    }

    render() {
        return (
            <div className="desc-edit-cont">
                <div className="editDesc-header">
                    <div className="desc-title">Edit Descriptions</div>
                    <div className="new-desc">
                        <input placeholder="New description" onChange={(e) => this.handleInputChange(e)} onBlur={() => this.enableToSend()} />
                        {this.newCheckBtn()}
                    </div>
                </div>
                <div className="desc-sep-line"></div>
                {this.props.Descriptions.map((descs, idx) => {
                    return (
                        <div className="desc-row" key={idx}>
                            <input defaultValue={descs.Dscpt} onChange={(e) => this.handleInputChange(e)} />
                            <div className="desc-check"><img src="check-bw.png" alt="check" /></div>
                            <Link to='/alert'><div className="desc-check" onClick={() => this.showDescAlert(descs.DscptID, descs.Dscpt)}><img src="trash.png" alt="trash" /></div></Link>
                        </div>
                    )
                })

                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(EditDescription)