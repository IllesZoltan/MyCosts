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
  getItem(value) {
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
  Datas: [],
  ActiveGroup: "",
  ActiveTarget: "",
  item_to_load: "group",
  showPopup: "",
  alertState: []
}

const store = createStore(reducer)
function reducer(state = initialState, action) {

  switch (action.type) {
    case "GROUP_LIST-INIT":

      const groupListToFetch = {
        Glist: action.value
      }
      const groupListFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(groupListToFetch)
      }
      fetch(serverURL + '/groupListInit', groupListFetchingOptions)
        .catch(err => console.error('Group list error: ', err));

      const grList = []
      grList.push(action.value)
      const groupsState = {
        ...state,
        Groups: grList
      }
      return groupsState

    case "ADD-GRP":
      //const grpArr = [...state.Groups]
      const nGrItem = new Item()
      const newGroup = nGrItem.getItem(action.value);
      //grpArr.push(newGroup)

      const groupToFetch = {}
      Object.entries(newGroup).forEach(([keys, values]) => {
        groupToFetch.regNR = keys;
        groupToFetch.name = values;
      })
      const newGroupFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(groupToFetch)
      }
      fetch(serverURL + '/addNewGroup', newGroupFetchingOptions)
        .catch(err => console.error('New group error: ', err))

      const addGrpState = {
        ...state,
        item_to_load: "group",
        ActiveGroup: "",
        Targets: [],
        Datas:[]
      }
      return addGrpState

    case "EDIT-GRP":
      const editedGroup = action.value;
      const editGroupToFetch = { grEditID: editedGroup }
      const editGrFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(editGroupToFetch)
      }
      fetch(serverURL + '/groupEDIT', editGrFetchingOptions)
        .catch(err => console.error('Group edit error: ', err));

      const editGrpState = {
        ...state,
        item_to_load: "group",
        ActiveGroup: "",
        Targets: [],
        Datas:[]
      }

      return editGrpState

    case "DEL-GRP":
      const delGroupToFetch = { delGrID: action.value }
      const delGroupFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(delGroupToFetch)
      }
      fetch(serverURL + '/groupDEL', delGroupFetchingOptions)
        .catch(err => console.error('Delete group error: ', err))

      const delGrpState = {
        ...state,
        Targets: [],
        ActiveGroup: "",
        item_to_load: "group",
        showPopup: "",
        alertState: []
      }
      return delGrpState

    case "SEL-GRP":
      const selGrp = { grID: action.value };
      const selGrpFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(selGrp)
      }
      fetch(serverURL + '/getCurrentGroup', selGrpFetchingOptions)
        .catch(err => { console.error('Selected group error: ', err) })

      const selGRstate = {
        ...state,
        ActiveGroup: action.value.gname,
        ActiveTarget: "",
        Datas:[],
        item_to_load: "target"
      }
      return selGRstate

    case "TARGET_LIST-INIT":
      const tarListToFetch = {
        Tlist: action.value
      }

      const tarListFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(tarListToFetch)
      }
      fetch(serverURL + '/targetListInit', tarListFetchingOptions)
        .catch(err => { console.error('Target list error: ', err) })

      const tarList = [];
      tarList.push(action.value);
      const targetsState = {
        ...state,
        Targets: tarList
      }
      return targetsState

    case "EDIT-TRG":
      const editedTarget = action.value;
      const editTargetToFetch = { tEditID: editedTarget }
      const editTrgFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(editTargetToFetch)
      }
      fetch(serverURL + '/targEDIT', editTrgFetchingOptions)
        .catch(err => console.error('Target edit error: ', err));

      const editTargState = {
        ...state,
        item_to_load: "target",
        showPopup: ""
      }

      return editTargState

    case "ADD-TRG":
      const nTargItem = new Item();
      const nTarg = nTargItem.getItem(action.value)
      const newTargToFetch = {}
      Object.entries(nTarg).forEach(([keys, values]) => {
        newTargToFetch.regNR = keys;
        newTargToFetch.name = values;
      });

      const newTargFetchingOptions = {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTargToFetch)
      }
      fetch(serverURL + '/addNewTarget', newTargFetchingOptions)
        .catch(err => { console.error('New Target error: ', err) })

      const addTrgState = {
        ...state,
        showPopup: ""
      }

      return addTrgState

    case "DEL-TRG":
      const delTargetToFetch = { delTrgID: action.value }
      const delTargetFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(delTargetToFetch)
      }
      fetch(serverURL + '/targetDEL', delTargetFetchingOptions)
        .catch(err => console.error('Delete group error: ', err))

      const delTargState = {
        ...state,
        item_to_load: "target",
        showPopup: "",
        alertState: []
      }

      return delTargState

    case "SEL-TRG":
      const selTarg = { targID: action.value };
      const selTargFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(selTarg)
      }
      fetch(serverURL + '/getCurrentTarget', selTargFetchingOptions)
        .catch(err => { console.error('Selected target error: ', err) })

      const selTargState = {
        ...state,
        item_to_load: "data",
        ActiveTarget: action.value.tname
      }
      return selTargState



    case "DATA_LIST-INIT":
      const dataListToFetch = {
        dList: action.value
      }

      const dataListFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dataListToFetch)
      }
      fetch(serverURL + '/dataListInit', dataListFetchingOptions)
        .catch(err => { console.error('Data list error: ', err) })

      const dataListState = {
        ...state,
        Datas: action.value
      }

      return dataListState

    case "ADD-DATA":
      const nDataItem = new Item();
      const newData = nDataItem.getItem(action.value);
      const newDataToFetch = {};

      Object.entries(newData).forEach(([keys, vals]) => {
        newDataToFetch.regNR = keys;
        newDataToFetch.name = vals;
      })

      const newDataFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newDataToFetch)
      }
      fetch(serverURL + '/addNewData', newDataFetchingOptions)
        .catch(err => { console.error('New data error: ', err) })

      const newDataState = {
        ...state,
        showPopup: ""
      }
      return newDataState




    case "popup":
      const popupState = {
        ...state,
        showPopup: action.value
      }
      return popupState

    case "alert":
      const data = {}
      const newAlert = []
      data[action.value.key] = action.value.value

      newAlert.push(action.value.type)
      newAlert.push(data)

      const newAlertState = {
        ...state,
        alertState: newAlert
      }
      return newAlertState


    case 'CLR':
      const clearedState = {
        ...state,
        Targets: [],
        Datas: [],
        ActiveGroup: "",
        ActiveTarget: "",
        item_to_load: "group",
        showPopup: "",
        alertState: []
      }
      return clearedState


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


