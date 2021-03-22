import React, { Component } from 'react';
import EditItems from './EditItems';
import './Sections.css';

export default class DataSection extends Component {
    render() {
        return (
            <div className="data">
                <div className="section-title">
                    <div className="s-title">Költség Adatok</div>
                    <EditItems section={"data"} />
                </div>
                <div className="data-item-label">
                    <div>Dátum</div>
                    <div>Idő</div>
                    <div>Leírás</div>
                    <div>Ár</div>
                </div>
            </div>
        )
    }
}