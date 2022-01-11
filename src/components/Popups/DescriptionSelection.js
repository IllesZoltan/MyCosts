import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditDescription from './EditDescription';
//import './Popups.css';

class DescriptionSelection extends Component {
    constructor() {
        super();
        this.state = {
            selDesc: false,
            editDesc: false
        }
    }

    descDispatcher(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    selectedDescrpt(e) {
        document.getElementById("newInput3").focus();
        document.getElementById("newInput3").select();
        this.descDispatcher('sel-descrpt', e.target.innerText)
        this.descDispatcher('show-descrpt', "save_descrpt")
    }

    editDescList() {
        this.setState({
            ...this.state,
            editDesc: true
        })
    }

    descPopup() {
        let descWin;
        if (this.state.editDesc) {
            descWin = <EditDescription />
        }
        return descWin;
    }

    render() {
        return (
            <div className="sel-desc sel-table">
                {this.descPopup()}
                <div className="desc-header">
                    <Link to="/loaded_items"><div className="desc-headr-img" onClick={() => this.editDescList()}><img src="edit-bw.png" alt="edit" /></div></ Link>
                </div>
                {this.props.Descriptions.map((desc, idx) => {
                    return (
                        <Link to="/loaded_items" key={idx}>
                            <div className="desc-item" onClick={(e) => { this.selectedDescrpt(e) }}>{desc}</div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(DescriptionSelection)