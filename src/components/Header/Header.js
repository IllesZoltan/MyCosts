import React, { Component } from 'react'
import Title from './Title'
import Subtitle from './Subtitle'
import Clock from './Clock'
import './Header.css'


export default class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="header-left">
                    <Title />
                    <Subtitle />
                </div>
                <div className="time">
                    <Clock />
                </div>
            </div>
        )
    }
}