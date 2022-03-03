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
    const currentDate = Date.now();
    const newItem = {
      [currentDate]: value
    }
    return newItem
  }
}


const initialState = {
  Groups: [],
  GroupAvarages: { all: "", yearly: "", monthly: "" },
  Targets: [],
  TargetAvarages: { all: 0, yearly: 0, monthly: 0 },
  Datas: [],
  Descriptions: [],
  DateSelectionWindow: "",
  SelectedDate: "",
  TimeSelectionWindow: "",
  SelectedTime: "",
  DescriptionSelectionWindow: "",
  SelectedDescription: "",
  //descPopupWin: "",
  editDescPopupWin: false,
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
        ActiveGroup: "",
        Targets: [],
        Datas: [],
        item_to_load: "new-grp"
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
        ActiveGroup: "",
        Targets: [],
        Datas: [],
        item_to_load: "edit-grp"
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
        Datas: [],
        ActiveGroup: "",
        showPopup: "",
        alertState: [],
        item_to_load: "del-grp"
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
        Datas: [],
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
        showPopup: "",
        Datas: [],
        item_to_load: "edit-trg"
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
        showPopup: "",
        item_to_load: "new-trg",
        Datas: []
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
        Datas: [],
        showPopup: "",
        item_to_load: "del-trg",
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
        showPopup: "",
        item_to_load: "new-data"
      }
      return newDataState

    case 'EDIT-DATA':
      const editedData = action.value;
      const editedDataToFetch = { dEditID: editedData };
      const editedDataFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(editedDataToFetch)
      }
      fetch(serverURL + '/dataEDIT', editedDataFetchingOptions)
        .catch(err => { console.error('Edited data error: ', err) })

      const editedDataState = {
        ...state,
        showPopup: "",
      }
      return editedDataState

    case 'DEL-DATA':
      const delDataToFetch = { delDta: action.value }
      const delDataFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(delDataToFetch)
      }
      fetch(serverURL + '/dataDEL', delDataFetchingOptions)
        .catch(err => console.error('Deleting data error: ', err))

      const dataDelState = {
        ...state,
        showPopup: ""
      }
      return dataDelState




    case 'show-date':
      let dateDisplayState = {};

      if (action.value === "clear_hide") {
        dateDisplayState = {
          ...state,
          DateSelectionWindow: "",
          SelectedDate: ""
        }
      }
      if (action.value === "Select_Date") {
        dateDisplayState = {
          ...state,
          DateSelectionWindow: action.value,
          TimeSelectionWindow: "",
          DescriptionSelectionWindow: ""
        }
      }
      if (action.value === "save_date") {
        dateDisplayState = {
          ...state,
          DateSelectionWindow: "",
        }
      }
      return dateDisplayState

    case 'sel-date':
      const newDateState = {
        ...state,
        SelectedDate: action.value
      }
      return newDateState


    case 'show-time':
      let timeDisplayState = {};

      if (action.value === "clear_hide") {
        timeDisplayState = {
          ...state,
          TimeSelectionWindow: "",
          SelectedTime: ""
        }
      }
      if (action.value === "Select_Time") {
        timeDisplayState = {
          ...state,
          TimeSelectionWindow: action.value,
          DateSelectionWindow: "",
          DescriptionSelectionWindow: ""
        }
      }
      if (action.value === "save_time") {
        timeDisplayState = {
          ...state,
          TimeSelectionWindow: "",
        }
      }
      return timeDisplayState

    case 'sel-time':
      const newTimeState = {
        ...state,
        SelectedTime: action.value
      }
      return newTimeState



    case 'descrpt-selection':
      let descrptDisplayState = {};

      if (action.value === "clear_hide") {
        descrptDisplayState = {
          ...state,
          DescriptionSelectionWindow: "",
          SelectedDescription: ""
        }
      }
      if (action.value === "Select_Description") {
        descrptDisplayState = {
          ...state,
          DescriptionSelectionWindow: action.value,
          DateSelectionWindow: "",
          TimeSelectionWindow: "",
        }
      }
      if (action.value === "save_descrpt") {
        descrptDisplayState = {
          ...state,
          DescriptionSelectionWindow: ""
        }
      }
      return descrptDisplayState

    case 'sel-descrpt':
      const newDescriptionState = {
        ...state,
        SelectedDescription: action.value
      }
      return newDescriptionState

    case 'edit-descrpt':
      const editDstate = {
        ...state,
        editDescPopupWin: true
      }
      return editDstate

    case 'descrpt-init':
      const descrptNames = action.value
      let descrptInitState = {
        ...state,
        Descriptions: descrptNames
      }
      return descrptInitState;

    case 'add-descrpt':
      const createDescrpt = new Item()
      const newDescrpt = createDescrpt.getItem(action.value);
      const desArr = state.Descriptions;
      const descptToFetch = {};
      const newDescObject = {};
      newDescObject.Gid = desArr[0].Gid;
      Object.entries(newDescrpt).forEach(([key, value]) => {
        descptToFetch.dId = key;
        newDescObject.DscptID = key;
        descptToFetch.dName = value;
        newDescObject.Dscpt = value;
      })
      const descrptFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newDescrpt)
      }
      fetch(serverURL + '/addNewDescrpt', descrptFetchingOptions)
        .catch(err => console.error('Description adding error: ', err));

      desArr.push(newDescObject);
      const newDescrptState = {
        ...state,
        Descriptions: desArr,
        editDescPopupWin: false,
        item_to_load: "descrpt"
      }
      return newDescrptState;

    case 'hideALLsel':
      const allSelHide = {
        ...state,
        DateSelectionWindow: "",
        TimeSelectionWindow: "",
        DescriptionSelectionWindow: ""
      }
      return allSelHide



    case "G-AVARAGE":
      const targetsKeys = { tarKey: Object.keys(state.Targets[0]) }
      const gAvFetchingOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(targetsKeys)
      }
      fetch(serverURL + '/grpAvarages', gAvFetchingOptions)
        .catch(err => console.error('Group avarages error: ', err))

      const gAvState = {
        ...state,
        item_to_load: "g-avs"
      }
      return gAvState

    case "G_AVS_INIT":
      const gAvsInitState = {
        ...state,
        GroupAvarages: action.value
      }
      return gAvsInitState




    case "popup":
      const popupState = {
        ...state,
        showPopup: action.value
      }
      return popupState

    case "descPopup":
      const descPopupState = {
        ...state,
        descPopupWin: action.value
      }
      return descPopupState

    case "alert":
      const data = {}
      const newAlert = []
      data[action.value.key] = action.value.value

      newAlert.push(action.value.type)
      newAlert.push(data)

      const newAlertState = {
        ...state,
        alertState: newAlert,
        item_to_load: action.value.type
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


