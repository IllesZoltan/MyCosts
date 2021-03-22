import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Sections.css';

class DataItems extends Component {
    render() {
        return (
            <div className="activeTargetData">
                {Object.values(this.props.data_elements).map((elem, idx) => {
                    return (
                        <div className="dataCont" key={idx}>
                            <div className="dataRow">
                                {Object.values(JSON.parse(elem)).map((items, ind) => {
                                    return (
                                        <div className="dataVal" key={ind}>{this.props.currencyConverter(ind, items)}</div>
                                    )
                                })
                                }
                            </div>
                        </div>
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

export default connect(mapStateToProps)(DataItems)