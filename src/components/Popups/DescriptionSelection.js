import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditDescription from './EditDescription';
//import './Popups.css';

class DescriptionSelection extends Component {
    constructor() {
        super();
        this.GroupDescriptions = [];
        this.state = {
            selDesc: false,
        };
    }

    descDispatcher(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    selectedDescrpt(e) {
        document.getElementById("newInput3").focus();
        document.getElementById("newInput3").select();
        this.descDispatcher('sel-descrpt', e.target.innerText)
        this.descDispatcher('descrpt-selection', "save_descrpt")
    }

    editDescList(nr) {
        if (this.GroupDescriptions.length === 0 || nr === 1) {
            this.descDispatcher('edit-descrpt', true);
        }
        this.setState({
            ...this.state
        })
    }

    descPopup() {
        let descWin;
        if (this.props.editDescPopupWin) {
            descWin = <EditDescription />
        }
        return descWin;
    }

    componentDidMount() {
        this.props.Descriptions.forEach(element => {
            this.GroupDescriptions.push(element.Dscpt);
            console.log('desc sel mount ',element);
        });
        this.editDescList(0);
    }

    render() {
        return (
            <div className="sel-desc sel-table">
                {this.descPopup()}
                <div className="desc-header">
                    <div className='sel-desc-title'>Description</div>
                    <Link to="/loaded_items"><div className="desc-headr-img" onClick={() => this.editDescList(1)}><img src="edit-bw.png" alt="edit" /></div></ Link>
                </div>
                {this.GroupDescriptions.map((desc, idx) => {
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