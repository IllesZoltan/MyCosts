import React, {Component} from 'react'
import './Infoline.css'
import Monitor from './Monitor'

class Infoline extends Component {
    
    render(){
        const mon1 = ['Általános infók','a beírt opciókról']
        const mon2 = ['Jelenlegi Állapot','a beírt adatokról']
        const mon3 = ['Jegyzetek']
        return(
            <div className="display">
                <Monitor TXT= {mon1}/>
                <Monitor TXT={mon2}/>
                <Monitor TXT={mon3}/>
            </div>
        )
    }
}

export default Infoline