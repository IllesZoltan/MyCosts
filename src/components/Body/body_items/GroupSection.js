import React, { Component } from 'react';
import EditItems from './EditItems';
import GroupItems from './GroupItems';
import './Sections.css';

export default class GroupSection extends Component {
    render() {
        return (
            <div className="group">
                <div className="section-title">
                    <div className="s-title">Csoport</div>
                    <EditItems sectionNew = {"NewGroup"} sectionEdit = {"EditGroup"}/>
                </div>
                    <GroupItems />
            </div>
        )
    }
}