import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditItems from './EditItems';
import './Sections.css';
import TargetItems from './TargetItems';

class TargetSection extends Component {
    render() {
        return (
            <div className="target">
                <div className="section-title">
                    <div className="s-title">Költség Cél</div>
                    <EditItems sectionNew = {"NewTarget"} sectionEdit = {"EditTarget"}/>
                </div>
                    <div className="active-item">{this.props.ActiveGroup}</div>
                    <TargetItems />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(TargetSection)