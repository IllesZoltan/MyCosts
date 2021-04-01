import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import InputPage from './components/InputPage'
import ItemLoader from './components/Body/ItemLoader';
import Alert from './components/Body/Alert';
//import NewBranchEntry from './components/Popups/NewGroupEntry';
//import NewGroupEntry from './components/Popups/NewGroupEntry';
//import { connect } from 'react-redux';




class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/item_loader" render = {() => <ItemLoader />} />
            <Route path="/loaded_items" render = {() => <InputPage />} />
            <Route path="/alert" render = {() => <Alert type={this.props.type} item={this.props.item}/>} />
            <Route path="/" render = {() => <ItemLoader />}/>
            {/* <Route path="/ngroup"><NewGroupEntry /> </Route>
            <Route path="/ntarget"><NewBranchEntry /></Route>
            <Route path="/newGrEntry" render={() => <InputPage />} />  Azonnali frissítés miatt kell így leírni */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


// function getParam(){
//   const uj = window.location.search.substr(1)
//   const retUj = uj.split('=')
//   const newArr = []
//   newArr.push(decodeURI(retUj[1]))

//   console.log('state groups: ',newArr);
//   return newArr
// }

// function mapStateToProps(state) {

//   return {
//     Groups: state.Groups
//   }
// }

//export default connect(mapStateToProps)(App);

export default App