import React, { Component } from 'react'
import './Header.css'


class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clock: new Date()
    }
  }

  dateDisplay() {
    const mnthArr = ['JAN', 'FEB', 'MÁRC', 'ÁPR', 'MÁJ', 'JÚN', 'JÚL', 'AUG', 'SZEP', 'OKT', 'NOV', 'DEC']
    const d = new Date()
    const newDate = d.getFullYear() + '. ' + mnthArr[d.getMonth()] + ' ' + d.getDate() + '.'
    return newDate
  }

  correct(str){
    let retStr = ""
    str < 10 ? retStr = '0'+str : retStr = str+""
    return retStr
  }

  render() {
    const {clock} = this.state
    const separator = ':'
    return (
      <div className="date-data">
        <div>{this.dateDisplay()}</div>
        <div className="show-clock">
          <div>{this.correct(clock.getHours())}</div>
          <div>{separator}</div>
          <div>{this.correct(clock.getMinutes())}</div>
          <div>{separator}</div>
          <div>{this.correct(clock.getSeconds())}</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState({
        clock: new Date()
      })
    },1000)
  }
}

export default Clock






/**

https://www.youtube.com/watch?v=NAx76xx40jM

import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  render () {
    const {count} = this.state
    return (
      <div>
        <h1>Current Count: {count}</h1>
      </div>
    )
  }
  // setInterval
  // clearInterval
  componentDidMount () {
    const {startCount} = this.props
    this.setState({
      count: startCount
    })
    this.doIntervalChange()
  }

  doIntervalChange = () => {
      this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count - 1
      }))
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.myInterval)
  }
}

export default Timer

*/