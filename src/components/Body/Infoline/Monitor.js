import React, { Component } from 'react'
import './Infoline.css'

class Monitor extends Component {
    constructor(props) {
        super(props)
        this.dispTXT = this.props.TXT
    }
    render() {
        return (
            <div className="mContainer">
                <div className="monitor">
                    {this.dispTXT.map((element,idx) => {
                        return (
                            <div key={idx}>{element}</div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default Monitor