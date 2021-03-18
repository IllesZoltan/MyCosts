import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';


/**
 * 
 * @REACT_REDUX_TUTORIAL
 * https://www.simplilearn.com/tutorials/reactjs-tutorial/react-with-redux
 * https://www.youtube.com/watch?v=CVpUuw9XSjY
 * jQuerry - Mapael -- Vector Maps with clickable countries
 */



const initialState = {
  Groups: [],
  Targets: [],
  item_to_load: "group"
}

const store = createStore(reducer)
function reducer(state = initialState, action) {

  switch (action.type) {
    case "GRP":
      const grpArr = [...state.Groups]
      grpArr.push(action.value)

      const newState = {
        ...state,
        Groups: grpArr
      }
      return newState

    case "TRG":
      console.log('index.js - Action target: ', action.value);
      const targArr = state.Targets
      return {
        Groups: state.Groups,
        Targets: targArr
      }
    default: return state
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


