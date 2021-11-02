import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class TimeSelection extends Component {
    constructor() {
        super()
        this.state = {
            hToSel: false,
            minToSel: false,
        }
    }

    dispatcher(type, value) {
        this.props.dispatch({ type: type, value: value });
    }


    //--HOUR
    selHour() {
        document.getElementById("h_list").className = "__list list";
        document.getElementById("min_list").className = "list__";
        this.setState({
            ...this.state,
            hToSel: true
        })
    }

    hourSelection() {
        const hours = []
        if (this.state.hToSel) {
            for (let i = 0; i < 24; i++) {
                if (i < 10) { i = "0" + i }
                hours.push(<div key={i + 100} onClick={e => this.hSelected(e)}>{i}</div>)
            }
        }
        return hours
    }

    hSelected(e) {
        document.getElementById("hh").innerText = e.target.innerText;
        document.getElementById("h_list").className = "list__"
    }

    //--MINUTE
    selMinute() {
        document.getElementById("min_list").className = "__list list";
        document.getElementById("h_list").className = "list__";
        this.setState({
            ...this.state,
            minToSel: true
        })
    }

    minuteSelection() {
        const minutes = []
        if (this.state.minToSel) {
            for (let i = 0; i < 60; i++) {
                if (i > 0 && i % 5 === 0) {
                    if (i < 10) { i = "0" + i }
                    minutes.push(<Link to="/loaded_items" key={i + 300}><div key={i + 100} onClick={e => this.minSelected(e)}>{i}</div></Link>)
                }
            }
        }
        return minutes
    }

    minSelected(e) {
        document.getElementById("min").innerText = e.target.innerText;
        document.getElementById("min_list").className = "list__";
        const hour = document.getElementById("hh").innerText;
        const minute = e.target.innerText;
        const selTime = `${hour}:${minute}`;
        document.getElementById("newInput2").focus();
        document.getElementById("newInput2").select();
        this.dispatcher("sel-time", selTime);
        this.dispatcher('show-time', "save_time");
    }


    render() {
        return (
            <div className="sel-time sel-table">
                <div className="cont">
                    <div id="hh" className="sel-display" onClick={() => this.selHour()}>00</div>
                    <div id="h_list" className="list__">{this.hourSelection()}</div>
                </div>
                <div className="cont">
                    <div id="min" className="sel-display" onClick={() => this.selMinute()}>00</div>
                    <div id="min_list" className="list__">{this.minuteSelection()}</div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(TimeSelection)