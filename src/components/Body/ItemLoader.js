import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Body.css';


const serverURL = 'http://localhost:3030';


class ItemLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupsData: {},
            Gavs: {},
            AllGroupNames: [],
            CurrentGroupTargets: [],
            CurrentTargetData: [],
            itemAlert: ""
        }
    }

    hideCancelBtn() {
        let cancelVisible = "";
        if (this.props.item_to_load === 'group') {
            cancelVisible = 'hide-cancel';
        };
        return cancelVisible;
    }


    infoText() {
        let infos = "";
        if (this.props.item_to_load === 'group') {
            this.state.itemAlert === "" ? infos = '\nCsoport lista betöltése ...' : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'new-grp') {
            this.state.itemAlert === "" ? infos = '\nÚj csoport mentése ...' : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'edit-grp') {
            this.state.itemAlert === "" ? infos = '\nCsoport módosítva ...' : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'del-grp') {
            this.state.itemAlert === "" ? infos = '\nCsoport törölve ...' : infos = this.state.itemAlert
        }

        if (this.props.item_to_load === 'target') {
            this.state.itemAlert === "" ? infos = `${this.props.ActiveGroup}\n\n célok betöltése ...` : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'new-trg') {
            this.state.itemAlert === "" ? infos = `${this.props.ActiveGroup}\n\n új cél mentése ...` : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'del-trg') {
            infos = `Csoport: ${this.props.ActiveGroup}\n\n cél törlése ...`
        }
        if (this.props.item_to_load === 'edit-trg') {
            infos = `Csoport: ${this.props.ActiveGroup}\n\n cél módosítva ...`
        }

        if (this.props.item_to_load === 'data') {
            this.state.itemAlert === "" ? infos = `${this.props.ActiveGroup}: -${this.props.ActiveTarget}\n\n adatok betöltése ...` : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'new-data') {
            this.state.itemAlert === "" ? infos = `${this.props.ActiveGroup}: -${this.props.ActiveTarget}\n\n új adat mentése ...` : infos = this.state.itemAlert
        }
        if (this.props.item_to_load === 'empty-input') {
            this.state.itemAlert === "" ? infos = 'Üres beviteli mező ! ...' : infos = this.state.itemAlert
        }
        return infos;
    }

    downloadList() {
        if (this.props.item_to_load === 'group' || this.props.item_to_load === 'new-group' || this.props.item_to_load === 'del-grp' || this.props.item_to_load === 'edit-grp') {
            this.stateDispatcher('GROUP_LIST-INIT', this.state.GroupsData)
        }

        if (this.props.item_to_load === 'target' || this.props.item_to_load === 'new-target' || this.props.item_to_load === 'del-target' || this.props.item_to_load === 'edit-target') {
            this.stateDispatcher('TARGET_LIST-INIT', this.state.CurrentGroupTargets)
        }

        if (this.props.item_to_load === 'data' || this.props.item_to_load === 'new-data') {
            this.stateDispatcher('DATA_LIST-INIT', this.state.CurrentTargetData)
        }
        if(this.props.item_to_load === 'g-avs'){
            this.stateDispatcher('G_AVS_INIT', this.state.Gavs)
        }
    }


    stateDispatcher(typeStr, data) {
        this.props.dispatch({ type: typeStr, value: data })
    }

    getGroups() {
        fetch(serverURL + '/getGroupList')
            .then(response => response.json())
            .then(data => {
                let iAlert = "";
                if (Object.entries(data[1]).length === 0) {
                    iAlert = "Nincs letölthető csoport ..."
                    this.stateDispatcher('popup', 'NewGroup')
                } else {
                    iAlert = data[0];
                    this.stateDispatcher('popup', '')
                }
                this.setState({
                    GroupsData: data[1],
                    AllGroupNames: Object.values(data[1]),
                    itemAlert: iAlert
                });
            })
    }

    getGroupAvs(){
        fetch(serverURL + '/getGroupAvarages')
        .then(response => response.json())
        .then(avs => {
            this.setState({
                Gavs: avs
            })
        })
    }

    getTargets() {
        fetch(serverURL + '/getCurrentGroupTargets')
            .then(response => response.json())
            .then(data => {
                let tAlert = "";
                if (data[0] === "") {
                    if (Object.entries(data[1]).length === 0) {
                        tAlert = `Csoport: ${this.props.ActiveGroup}\n\nNincs letölthető cél ...`;
                        this.stateDispatcher('popup', 'NewTarget');
                    }
                } else {
                    tAlert = data[0];
                }
                this.setState({
                    CurrentGroupTargets: data[1],
                    itemAlert: tAlert
                })
            })
    }


    getData() {
        fetch(serverURL + '/getCurrentTargetData')
            .then(response => response.json())
            .then(data => {
                let dAlert = "";
                if (data[0] === "") {
                    if (Object.entries(data[1]).length === 0) {
                        dAlert = `${this.props.ActiveTarget}\n\nNincsenek letölthető adatok ...`;
                        this.stateDispatcher('popup', 'NewData');
                    }
                } else {
                    dAlert = data[0];
                }
                this.setState({
                    CurrentTargetData: data[1],
                    itemAlert: dAlert
                })
            })
    }


    componentDidMount() {
        if (this.props.item_to_load === 'group' || this.props.item_to_load === 'new-group' || this.props.item_to_load === 'del-grp' || this.props.item_to_load === 'edit-grp') {
            this.getGroups();
        }
        if (this.props.item_to_load === 'target' || this.props.item_to_load === 'new-target' || this.props.item_to_load === 'del-target' || this.props.item_to_load === 'edit-target') {
            this.getTargets();
        }
        if (this.props.item_to_load === 'data' || this.props.item_to_load === 'new-data') {
           this.getData();
        }
        if(this.props.item_to_load === 'g-avs'){
            this.getGroupAvs()
        }
    }






    render() {
        return (
            <div className={"loader " + this.props.addClName}>
                <div>
                    <textarea type="text" value={this.infoText()} readOnly />
                </div>
                <div className="btn-line">
                    <Link to="/loaded_items" className="load-btn-cont">
                        <div className="load-btn" onClick={() => this.downloadList()}>Load</div>
                    </Link>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps)(ItemLoader)



// cancelDownload() {
    //     console.log('IL cancel ',this.props.item_to_load);
    //     let listType = "";
    //     if (this.props.item_to_load === 'new-group') {
    //         listType = 'C-GRPs'
    //     }
    //     if (this.props.item_to_load === 'target') {
    //         listType = 'C-TRGs'
    //     }
    //     if (this.props.item_to_load === 'data') {
    //         listType = 'C-DTAs'
    //     }
    //     this.stateDispatcher(listType, "")
    // }
