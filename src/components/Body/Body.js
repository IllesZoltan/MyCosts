import React, { Component } from 'react'
import './Body.css'
import Infoline from './Infoline/Infoline'
import { connect } from 'react-redux'
import GroupSection from './body_items/GroupSection'
import TargetSection from './body_items/TargetSection'
import DataSection from './body_items/DataSection'
import NewGroupEntry from '../Popups/NewGroupEntry'
import EditGroup from '../Popups/EditGroup'
import NewTargetEntry from '../Popups/NewTargetEntry'
import EditTarget from '../Popups/EditTarget'
import NewDataEntry from '../Popups/NewDataEntry'
import EditData from '../Popups/EditData'



class Body extends Component {

    currentPopup(){
        let popup = undefined;
        if(this.props.showPopup === "NewGroup"){
            popup = <NewGroupEntry title = "Group"/>
        }
        if(this.props.showPopup === "EditGroup"){
            popup = <EditGroup title = "Group"/>
        }

        if(this.props.showPopup === "NewTarget"){
            popup = <NewTargetEntry title = "Target" />
        }
        if(this.props.showPopup === "EditTarget"){
            popup = <EditTarget title = "Target"/>
        }

        if(this.props.showPopup === "NewData"){
            popup = <NewDataEntry title = "Data" />
        }
        if(this.props.showPopup === "EditData"){
            popup = <EditData title = "Data"/>
        }
        return popup;
    }


    render() {
        return (
            <div className="body-container">
                <Infoline />
                {this.currentPopup()}
                <div className="body-titleline">
                    <h3>Költség vezetés</h3>
                </div>
                <div className="cost-controller">
                    <GroupSection />
                    <TargetSection />
                    <DataSection />

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Body)