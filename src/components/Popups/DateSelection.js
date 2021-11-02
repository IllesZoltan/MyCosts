import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class DateSelection extends Component {
    constructor() {
        super()
        this.state = {
            yToSel: false,
            mToSel: false,
            dToSel: false
        }
    }

    dispatcher(type, value) {
        this.props.dispatch({ type: type, value: value });
    }


    //-- YEAR
    selYear() {
        document.getElementById("y_list").className = "__list list";
        document.getElementById("m_list").className = "list__";
        document.getElementById("d_list").className = "list__";
        this.setState({
            ...this.state,
            yToSel: true
        })
    }

    yearSelection() {
        const years = []
        if (this.state.yToSel) {
            for (let i = 2021; i < 2041; i++) {
                years.push(<div key={i + 100} onClick={e => this.ySelected(e)}>{i}</div>)
            }
        }
        return years
    }

    ySelected(e) {
        document.getElementById("yy").innerText = e.target.innerText;
        document.getElementById("y_list").className = "list__"
    }
    
    //--MONTH
    selMonth() {
        document.getElementById("m_list").className = "__list list";
        document.getElementById("y_list").className = "list__";
        document.getElementById("d_list").className = "list__";
        this.setState({
            ...this.state,
            mToSel: true
        })
    }

    monthSelection() {
        const months = []
        if (this.state.mToSel) {
            for (let i = 1; i < 13; i++) {
                if (i < 10) { i = "0" + i }
                months.push(<div key={i + 100} onClick={e => this.mSelected(e)}>{i}</div>)
            }
        }
        return months
    }

    mSelected(e) {
        document.getElementById("mm").innerText = e.target.innerText;
        document.getElementById("m_list").className = "list__";

    }

    //--DAY
    selDay() {
        document.getElementById("d_list").className = "__list list";
        document.getElementById("y_list").className = "list__";
        document.getElementById("m_list").className = "list__";
        this.setState({
            ...this.state,
            dToSel: true
        })
    }

    daySelection() {
        const days = []
        if (this.state.dToSel) {
            for (let i = 1; i < 32; i++) {
                if (i < 10) { i = "0" + i }
                days.push(<Link to="/loaded_items" key={i + 300}><div key={i + 200} onClick={e => this.dSelected(e)}>{i}</div></Link>)
            }
        }
        return days
    }

    dSelected(e) {
        document.getElementById("dd").innerText = e.target.innerText;
        document.getElementById("d_list").className = "list__";
        const year = document.getElementById("yy").innerText;
        const month = document.getElementById("mm").innerText;
        const day = e.target.innerText;
        const selDate = `${year}.${month}.${day}.`;
        document.getElementById("newInput1").focus();
        document.getElementById("newInput1").select();
        this.dispatcher("sel-date", selDate);
        this.dispatcher('show-date', "save_date");
    }




    render() {
        return (
            <div className="sel-date sel-table">
                <div className="cont">
                    <div id="yy" className="sel-display" onClick={() => this.selYear()}>2021</div>
                    <div id="y_list" className="list__">{this.yearSelection()}</div>
                </div>
                <div className="cont">
                    <div id="mm" className="sel-display" onClick={() => this.selMonth()}>01</div>
                    <div id="m_list" className="list__">{this.monthSelection()}</div>
                </div>
                <div className="cont">
                    <div id="dd" className="sel-display" onClick={() => this.selDay()}>01</div>
                    <div id="d_list" className="list__">{this.daySelection()}</div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(DateSelection)