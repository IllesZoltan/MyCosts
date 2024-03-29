import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import InputPage from './components/InputPage'
import ItemLoader from './components/Body/ItemLoader';
import Alert from './components/Body/Alert';


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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App