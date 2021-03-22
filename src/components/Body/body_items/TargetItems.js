import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sections.css';

class TargetItems extends Component {
    render() {
        return (
            <div className="ActiveGroupTargets">
                {this.props.target_elements.map((elem, idx) => {
                    return (
                        <Link to="/item_loader" key={idx}>
                            <div className={"newItm " + this.props.tar_additional_clName(elem, this.props.ActiveTarget)} onClick={this.props.tar_selection}>{elem}</div>
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

export default connect(mapStateToProps)(TargetItems)