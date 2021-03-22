import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sections.css';

class GroupItems extends Component {
    render() {
        return (
            <div className="group-list">
                <div className = "newItm clear">Clear</div>
                {this.props.Groups.map((elem, idx) => {
                    return (
                        <Link to="/item_loader" key={idx}>
                            <div className="newItm" /*onClick={this.props.tar_selection}*/>{elem}</div>
                        </Link>
                    )
                })
                }
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