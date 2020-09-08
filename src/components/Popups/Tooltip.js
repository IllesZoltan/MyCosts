import React, {Component} from 'react'

export default class Tooltip extends Component{
    constructor(props){
        super(props)
        this.ttText = props.ttText
    }

    render(){
        return(
        <div>{this.ttText}</div>
        )
    }
}