import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Infoline.css'
import Monitor from './Monitor'


class Infoline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cont: ""
        }
        this.groupContent = undefined;
        this.targetContent = undefined;
        this.dataContent = undefined;
    }

    currencyDisplayer(val) {
        let retVal = val;
        if (val.length > 3) {
            let sliceTime = (val.length - (val.length % 3)) / 3;
            let strLength = val.length - 3;
            while (sliceTime > 0) {
                retVal = retVal.slice(0, strLength) + "." + retVal.slice(strLength, retVal.length);
                strLength = strLength - 3;
                sliceTime--;
            }
        } else {
            retVal = val
        }
        retVal = retVal + " Ft";
        return retVal
    }

    costAvarages(type, all, yearly, monthly) {
        if (all) { all = ' . '.repeat(10) + this.currencyDisplayer(all) }
        if (yearly) { yearly = ' . '.repeat(10) + this.currencyDisplayer(yearly) }
        if (monthly) { monthly = ' . '.repeat(10) + this.currencyDisplayer(monthly) }
        return <div>
            <div className="mon-conts">{`Össz: ${all}`}</div>
            <div className="mon-conts">{`Évi: ${yearly}`}</div>
            <div className="mon-conts">{`Havi: ${monthly}`}</div>
            <Link to="/item_loader"><div className="mon-conts-btn" onClick={() => {this.dispatcher(type)}} >{"Költség Átlag"}</div></Link>
        </div>
    }

    mon1() {
        let retVal = "Csoport: ";
        const type = "G-AVARAGE";
        const all = this.props.GroupAvarages.all;
        const yearly = this.props.GroupAvarages.yearly;
        const monthly = this.props.GroupAvarages.monthly;

        if (this.props.ActiveGroup) {
            retVal += this.props.ActiveGroup
            this.groupContent = this.costAvarages(type, all, yearly, monthly);
        }

        return retVal
    }

    mon2() {
        let retVal = "Cél: ";
        const type = "T-AVARAGE";
        let all = "";
        let yearly = "";
        let monthly = "";
        if (this.props.ActiveTarget) {
            retVal += this.props.ActiveTarget
            this.targetContent = this.costAvarages(type, all, yearly, monthly)
        }

        return retVal
    }

    mon3() {
        return 'Jegyzetek'
    }

    dispatcher(type) {
        this.props.dispatch({ type: type, value: "" });
    }

    render() {
        return (
            <div className="display">
                <Monitor TTL={this.mon1()} CONT={this.groupContent} />
                <Monitor TTL={this.mon2()} CONT={this.targetContent} />
                <Monitor TTL={this.mon3()} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Infoline)