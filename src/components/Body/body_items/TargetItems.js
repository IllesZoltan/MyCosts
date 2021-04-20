import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class TargetItems extends Component {

    isClicked(idx, elem) {
        const grp = {
            gid: idx,
            gname: elem
        }
        this.dispatchToState('SEL-GRP', grp)
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    render() {
        return (
            <div className="group-list">
                <div className="group-item-cont">
                    {this.props.Targets.map(el => Object.entries(el).map(([key, elem], idx) => {
                        return (
                            <Link to="/item_loader" key={idx}>
                                <div className="newItm" onClick={() => this.isClicked(key, elem)}>{elem}</div>
                            </Link>
                        )
                    }))
                    }
                </div>
            </div>
        )
    }


    // render() {
    //     return (
    //         <div className="ActiveGroupTargets">
    //             {this.props.Targets.map(el => {
    //                 Object.entries(el).map(([key, elem], idx) => {
    //                     return (
    //                         <Link to="/item_loader" key={idx}>
    //                             <div className={"newItm " + this.props.tar_additional_clName(elem, this.props.ActiveTarget)} onClick={this.props.tar_selection}>{elem}</div>
    //                         </Link>
    //                     )
    //                 })
    //             })
    //             }
    //         </div>
    //     )
    // }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(TargetItems)