import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Popups.css';

class EditDescription extends Component {
    constructor() {
        super();
        this.newCheck = false;
        this.newInput = "";
        this.state = {
            newDesc: "",
        }
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
            nCheck = <Link to='/loaded_items'><div className="desc-check" onClick={() => this.saveChanges()}><img src="check-bw.png" alt="check" /></div></Link>
        } else {
            nCheck = <div className="desc-check" onClick={() => this.saveChanges()}><img src="check-inactive.png" alt="check" /></div>
        }
        return nCheck;
    }

    enableToSend() {
        console.log('edit desc send ', this.newInput);
        if (this.newInput) {
            this.newCheck = true;
        } else {
            this.newCheck = false;
        }
        this.setState({
            ...this.state
        })
    }

    saveChanges() {
        console.log("edit desc changed ", this.newInput);
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
                            <input defaultValue={descs} onChange={(e) => this.handleInputChange(e)} />
                            <div className="desc-check"><img src="check-bw.png" alt="check" /></div>
                            <div className="desc-check"><img src="trash.png" alt="trash" /></div>
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