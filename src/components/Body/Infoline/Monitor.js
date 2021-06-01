import React, { Component } from 'react'
import './Infoline.css'

class Monitor extends Component {
    
    render() {
        return (
            <div className="mContainer">
                <div className="monitor">
                    <div className="titleline">{this.props.TTL}</div>
                    <div className="m-content-cont">{this.props.CONT}</div>
                </div>
            </div>
        )
    }
}

export default Monitor