import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataItems from './DataItems';
import EditItems from './EditItems';
import './Sections.css';

class DataSection extends Component {
    render() {
        return (
            <div className="data">
                <div className="section-title">
                    <div className="s-title">Költség Adatok</div>
                    <EditItems sectionNew={"NewData"} sectionEdit={"EditData"} />
                </div>
                <div className="active-item">{this.props.ActiveTarget}</div>
                <div className="data-item-label">
                    <div>Dátum</div>
                    <div>Idő</div>
                    <div>Leírás</div>
                    <div>Ár</div>
                </div>
                <DataItems />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ...state
    }
}

export default connect(mapStateToProps)(DataSection)