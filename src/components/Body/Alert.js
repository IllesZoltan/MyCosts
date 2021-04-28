import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Body.css'

class Alert extends Component {

    handleSubmit(key){
        if(this.props.alertState[0] === "group"){
            this.dispatchToState('DEL-GRP',key)
        }
        if(this.props.alertState[0] === "target"){
            this.dispatchToState('DEL-TRG',key)
        }
    }

    hidePopup() {
        this.dispatchToState('popup', "");
    }

    dispatchToState(type, value) {
        this.props.dispatch({ type: type, value: value })
    }

    render() {
        return (
            <div className="alertWindow">
                {Object.entries(this.props.alertState[1]).map(([keys, item], ind) => {

                    return (
                        <div className="alert-cont" key={ind}>
                            <div className="alert-header">
                                <div className="alert-text">A következő elemet törölni ?</div>
                                <div className="alert-data">{item}</div>
                            </div>
                            <div className="btn-ribbon">
                                <Link to="/item_loader" ><div className="new-btns del" onClick={() => this.handleSubmit(keys)}>Töröl</div></Link>
                                <Link to="/loaded_items"><div className="new-btns not-del" onClick={() => this.hidePopup()}>Mégsem</div></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(Alert)