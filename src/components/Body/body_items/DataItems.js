import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import './Sections.css';

class DataItems extends Component {

    currencyConverter(nr, val) {
        let retVal = "";
        if (nr === 3) {
            if (val.length > 3) {
                retVal = val.slice(0, val.length - 3) + "." + val.slice((val.length - 3), val.length) + " Ft"
            } else {
                retVal = val + " Ft"
            }
        } else {
            retVal = val
        }
        return retVal
    }

    render() {
        return (
            <div className="activeTargetData">
                {Object.values(this.props.Datas).map((elem, idx) => {
                    return (
                        <div className="dataCont" key={idx}>
                            <div className="dataRow">
                                {Object.values(JSON.parse(elem)).map((items, ind) => {
                                    return (
                                        <div className="dataVal" key={ind}>{this.currencyConverter(ind, items)}</div>
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