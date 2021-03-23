import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';


const serverURL = 'http://localhost:3030';

/**
 * 
 * @REACT_REDUX_TUTORIAL
 * https://www.simplilearn.com/tutorials/reactjs-tutorial/react-with-redux
 * https://www.youtube.com/watch?v=CVpUuw9XSjY
 * jQuerry - Mapael -- Vector Maps with clickable countries
 */

class Item {
  getItem(value){
    const currentDate = Date.now()
    const newItem = {
      [currentDate]: value
    }
    return newItem
  }
}


const initialState = {
  Groups: [],
  Targets: [],
  item_to_load: "group",
  showPopup: ""
}

const store = createStore(reducer)
function reducer(state = initialState, action) {

  switch (action.type) {
    case "GROUP_LIST-INIT":
      
      console.log('index gr list ',action.value);
      const grList = []
      grList.push(action.value)
      const groupsState = {
        ...state,
        Groups: grList
      }
    return groupsState

    case "ADD-GRP":
      const grpArr = [...state.Groups]
      const nItem = new Item()
      const newGroup = nItem.getItem(action.value);
      Object.entries(newGroup).forEach(([keys,elem]) => console.log('index new group ',keys,':',elem ));
      grpArr.push(newGroup)

      const groupToFetch = {}
      Object.entries(newGroup).forEach(([keys,values]) => {
        groupToFetch.ID = keys;
        groupToFetch.name = values;
      })
      const fetchToState = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(groupToFetch)
      }

      fetch(serverURL+'/addNewGroup',fetchToState)
      .catch(err => console.error('New group error: ',err))
      

      const newState = {
        ...state,
        Groups: grpArr
      }
      return newState

    // case "ADD-TRG":
    //   const targArr = state.Targets
    //   return {
    //     Groups: state.Groups,
    //     Targets: targArr
    //   }


    case "popup":
      const popupState = {
        ...state,
        showPopup: action.value
      }
      return popupState


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


