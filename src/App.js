import React, { Component } from 'react';
import './App.css';
import InputPage from './components/startPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NewBranchEntry from './components/Popups/NewBranchEntry';
import ItemLoader from './components/Body/ItemLoader';
//import { connect } from 'react-redux';




class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/loaded_items" render = {() => <InputPage />} />
            <Route path="/ngroup"><NewBranchEntry /> </Route>
            <Route path="/ntarget"><NewBranchEntry /></Route>
            <Route path="/newGrEntry" render={() => <InputPage />} />  {/*Azonnali frissítés miatt kell így leírni*/}
            <Route path="/">
              <ItemLoader />
              
            </Route>
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