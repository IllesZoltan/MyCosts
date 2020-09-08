import React, { Component } from "react";
import './Popups.css'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class NewBranchEntry extends Component {
    constructor(props) {
        super(props)
        this.branch = props.branch
        this.newInput = "//"
    }

    

    handleInputChange = (e) => {
        this.newInput = e.target.value
        console.log('new branch entry - input value: ', this.newInput);
    }

    handleSubmit = () => {
        if(this.branch === "Group"){
            console.log('dispatch new input: ',this.newInput);
            this.props.dispatch({ type: "GRP", value: this.newInput });
        }
    }

    componentDidMount() {

    }

    getURL() {
        let retValue = ""
        if (this.branch === "Group") {
            retValue = "/newGrEntry"/*?value="+this.state.newBranch*/
        }
        return retValue
    }

    // inpValue(){
    //     return document.getElementById('newInput').value
    // }

    render() {
        //const urlBR = "/newGrEntry?value="+this.state.newBranch

        return (
            <div className="new-cont">
                <div className="new-title">{'Enter new ' + this.branch}</div>
                <div className="new-input"><input id="newInput" name="newInput" placeholder={'New ' + this.branch} onChange={e => { this.handleInputChange(e) }} /></div>
                <div className="btn-ribbon">
                    <Link to="/newGrEntry" ><div className="new-btns create" onClick={this.handleSubmit}>Create</div></Link>
                    <Link to="/"><div className="new-btns cancel">Cancel</div></Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        Groups: state.Groups,
        Targets: state.Targets
    }
}

// const mapDispatchToProps = (dispatch) => {

//     return {
//         handleSubmit: (newInput, branch) => {
//             if(branch === "Group"){
//                 console.log('new input: ',newInput);
//                 dispatch({ type: "GRP", value: newInput })
//             }
//         }
       
//     }
// }

export default connect(mapStateToProps)(NewBranchEntry)

//export default NewBranchEntry