import React, {Component} from 'react'
import Header from './Header/Header'
import './Comps.css'
import Body from './Body/Body'

export default class InputPage extends Component {
    render(){
        return(
            <div className="app-body">
                <Header />
                <Body />
            </div>
        )
    }
    
}

