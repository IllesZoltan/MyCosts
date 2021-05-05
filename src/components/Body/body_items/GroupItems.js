import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class GroupItems extends Component {

    isClicked(idx, elem) {
        const grp = {
            gid: idx,
            gname: elem
        }
        this.dispatchToState('SEL-GRP', grp)
    }

    clearAll(){
        this.dispatchToState('CLR', "")
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    render() {
        return (
            <div className="item-list">
                <Link to="/loaded-items"><div className="newItm clear" onClick={() => this.clearAll()}>Clear</div></Link>
                <div className="item-cont">
                    {this.props.Groups.map(el => Object.entries(el).map(([key, elem], idx) => {
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

export default connect(mapStateToProps)(GroupItems)