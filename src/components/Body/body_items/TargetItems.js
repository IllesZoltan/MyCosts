import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class TargetItems extends Component {

    isClicked(idx, elem) {
        const targ = {
            tid: idx,
            tname: elem
        }
        this.dispatchToState('SEL-TRG', targ)
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    render() {
        return (
            <div className="item-list">
                <div className="item-cont">
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
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(TargetItems)