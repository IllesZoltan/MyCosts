import React, { Component } from 'react';
import EditItems from './EditItems';
import './Sections.css';
import TargetItems from './TargetItems';

export default class TargetSection extends Component {
    render() {
        return (
            <div className="target">
                <div className="section-title">
                    <div className="s-title">Költség Cél</div>
                    <EditItems sectionNew = {"NewTarget"} sectionEdit = {"EditTarget"}/>
                </div>
                    <TargetItems />
            </div>
        )
    }
}