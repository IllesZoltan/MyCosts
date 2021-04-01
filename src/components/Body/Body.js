import React, { Component } from 'react'
import './Body.css'
import Infoline from './Infoline/Infoline'
import { connect } from 'react-redux'
import GroupSection from './body_items/GroupSection'
import TargetSection from './body_items/TargetSection'
import DataSection from './body_items/DataSection'
import NewGroupEntry from '../Popups/NewGroupEntry'
import EditGroup from '../Popups/EditGroup'



class Body extends Component {
    // constructor(props) {
    //     super(props)
    //     this.props = props
    // }

    currentPopup(){
        let popup = undefined;

        if(this.props.showPopup === "NewGroup"){
            popup = <NewGroupEntry title = "Group"/>
        }
        if(this.props.showPopup === "EditGroup"){
            popup = <EditGroup title = "Group"/>
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

                    {/* <div className="groups">
                        <div className="section-title">
                            <div className="s-title">Csoport</div>
                            <div className="cost-cont-btn">
                                <div className="s-buttons"><a href="/ngroup"><img src="icons8-add-new-96.png" alt="New icon" /></a></div>
                                <div className="s-buttons"><img src="icons8-edit-128.png" alt="Edit icon" /></div>
                            </div>
                        </div>
                        <div className="newGrpGrp">
                            {this.props.Groups.map((elem, idx) => {
                                return (
                                    <div className="newGrp" key={idx}>{elem}</div>
                                )
                            })
                            }

                        </div>
                    </div> */}


                    {/* <div className="targets">
                        <div className="section-title">
                            <div className="s-title">Költség Cél</div>
                            <div className="cost-cont-btn">
                                <div className="s-buttons"><a href="/ntarget"><img src="icons8-add-new-96.png" alt="New icon" /></a></div>
                                <div className="s-buttons"><img src="icons8-edit-128.png" alt="Edit icon" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="cost-data">
                        <div className="section-title">
                            <div className="s-title">Költség Adatok</div>
                            <div className="cost-cont-btn">
                                <div className="s-buttons"><img src="icons8-add-new-96.png" alt="New icon" /></div>
                                <div className="s-buttons"><img src="icons8-edit-128.png" alt="Edit icon" /></div>
                            </div>
                        </div>
                        <div className="item-label">
                            <div>Dátum</div>
                            <div>Idő</div>
                            <div>Leírás</div>
                            <div>Ár</div>
                        </div>
                    </div> */}
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