const express = require('express');
const app = express();
const cors = require('cors');
//const { applyMiddleware } = require('redux');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./CostsDB.db');



const PORT = 3030;

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS grp ( Gid VARCHAR(150), Gname VARCHAR(80))',
    (error) => { console.error('Group creating error: ', error) }
  )
  db.run(
    'CREATE TABLE IF NOT EXISTS targ (Gid VARCHAR(150), Tid VARCHAR(150), Tname VARCHAR(80))',
    (error) => { console.log('Target creating error: ', error) }
  )
  db.run(
    'CREATE TABLE IF NOT EXISTS data ( Gid VARCHAR(150), Tid VARCHAR(150), Did VARCHAR(150), Ddata VARCHAR(300))',  //Ddata = JSON.stringify(dátum, idő, leírás, ár)
    (error) => { console.log('Data creating error: ', error) }
  )
  db.run(
    'CREATE TABLE IF NOT EXISTS descrpt ( Gid VARCHAR(150), DscptID INTEGER, Dscpt VARCHAR(200))',
    (error) => { console.log('Description error: ', error) }
  )
  //db.close();
})


let GRP = undefined;
let currGRP_TRG = {};
let currTRG_DAT = {};
let currGRP_DESCRPT = {};

const gAvs = {
  all: 0,
  yearly: 0,
  monthly: 0
}

let groupList = [];
let targetList = [];
let dataList = [];
let descrptList = [];
let currGRPid = "";
let currTRGid = "";
let currDTAid = "";
let alert = "";


function groupAvailability(valToCheck) {
  let checkedOK = false;
  if (GRP !== undefined) {
    Object.keys(GRP).forEach(element => {
      if (valToCheck.regNR === element) {
        checkedOK = `Existing group id: ${element}:${GRP[element]}`;
      }
      if (valToCheck.name === GRP[element]) {
        checkedOK = `Existing group name: ${element}:${GRP[element]}`;
      }
    })
  } else {
    GRP = undefined
  }
  return checkedOK;
}

function descrptAvailability(valToCheck) {
  let descChecked = false;
  if (currGRP_DESCRPT !== {}) {
    Object.values(currGRP_DESCRPT).forEach(itm => {
      if (itm === valToCheck) {
        descChecked = true;
      }
    })
  }
  return descChecked;
}

function targetAvailability(valToCheck) {
  let TcheckedOK = false;
  if (currGRP_TRG !== {}) {
    Object.keys(currGRP_TRG).forEach(element => {
      if (element === currGRPid.gid) {
        Object.keys(currGRP_TRG[element]).forEach(item => {
          if (valToCheck.regNR === item) {
            TcheckedOK = `Existing target id: ${element}:${currGRP_TRG[element]}`;
          }
          if (valToCheck.name === currGRP_TRG[element][item]) {
            TcheckedOK = `Existing target name: ${element}:${currGRP_TRG[element][item]}`;
          }
        })
      }
    })
  } else {
    currGRP_TRG = {}
  }
  return TcheckedOK;
}


function dataAvailability(valToCheck) {
  let DcheckedOK = false;
  if (currTRG_DAT !== {}) {
    Object.keys(currTRG_DAT).forEach(element => {
      if (element === currGRPid.gid) {
        Object.keys(currTRG_DAT[element]).forEach(item => {
          if (item === currTRGid.tid) {
            Object.keys(currTRG_DAT[element][item]).forEach(dat => {
              if (valToCheck.regNR === dat) {
                DcheckedOK = `Existing data id: ${element}:${currGRP_TRG[element]}`;
              }
              if (JSON.stringify(valToCheck.name) === JSON.stringify(currGRP_TRG[element][item][dat])) {
                DcheckedOK = `Existing data name: ${element}:${JSON.stringify(currGRP_TRG[element])}`;
              }
            })
          }
        })
      }
    })
  } else {
    currTRG_DAT = {}
  }
  return DcheckedOK;
}

function GRannualAvarage(prices) {
  let sum = 0;
  let avarage = 0;
  console.log('srv func ann avarage ', prices);
  sum = prices.reduce(function (a, b) { a + b }, 0);
  avarage = sum / prices.length

  return avarage;
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* 
* Külön route kell, hogy meg lehessen tölteni a GRP-t
*/
app.post('/groupListInit', (req, res) => {
  GRP = req.body.Glist;
  alert = "";
  res.send(GRP);
})



/*
* Az asynchron "SELECT" miatt itt nem lehet megtölteni a GRP-t
*/

app.get('/getGroupList', (req, res) => {
  const groups = {};
  db.serialize(() => {
    db.all(
      'SELECT * FROM grp',
      (err, row) => {
        if (err) { console.error('Groups download error: ', err); }
        row.forEach(item => {
          groups[item.Gid] = item.Gname
        })

        groupList = [alert, groups]
        res.send(groupList)
      }
    )
  })
})

app.post('/addNewGroup', (req, res) => {
  const newGroup = req.body
  const isAvailable = groupAvailability(newGroup);
  if (typeof (isAvailable) === 'boolean') {
    if (!isAvailable) {
      //GRP[newGroup.ID] = newGroup.name
      db.serialize(() => {
        db.run(
          `INSERT INTO grp VALUES ('${newGroup.regNR}','${newGroup.name}')`,
          (err) => { console.error('Inserting error: ', err) }
        )
      })
    }
  } else {
    alert = isAvailable
  }
  res.send(newGroup)
})


app.post('/groupEDIT', (req, res) => {
  const grEdit = req.body.grEditID;
  db.serialize(() => {
    db.run(
      // JSON.stringify(grEdit.gName) = OK ; grEdit.gName = SQLITE error:no such column
      `UPDATE grp SET Gname = ${JSON.stringify(grEdit.gName)} WHERE Gid = ${grEdit.gId}`,
      (err) => { console.error('Updating error: ', err) }
    )
  })
  res.send(GRP)
})


app.post('/groupDEL', (req, res) => {
  const grDel = req.body.delGrID;
  db.serialize(() => {
    db.run(
      `DELETE FROM data WHERE Gid = ${grDel}`,
      (err) => { console.error('Group-Data deleting error: ', err) }
    )
    db.run(
      `DELETE FROM targ WHERE Gid = ${grDel}`,
      (err) => { console.error('Group-Target deleting error: ', err) }
    )
    db.run(
      `DELETE FROM grp WHERE Gid = ${grDel}`,
      (err) => { console.error('Group deleting error: ', err) }
    )
  })
  res.send(grDel)
})


app.post('/grpAvarages', (req, res) => {
  Object.keys(gAvs).forEach(key => gAvs[key] = 0);
  const T_keys = req.body.tarKey;
  const dates = [];
  db.serialize(() => {
    T_keys.forEach(item => {
      db.all(
        `SELECT * FROM data WHERE Gid = ${currGRPid.gid} AND Tid = ${item}`,
        (err, row) => {
          if (err) { console.error('Group annual avarage-data error: ', err); }
          row.forEach(element => {
            //A csoport teljes költsége
            gAvs.all += parseInt(JSON.parse(element.Ddata)["price"]);

            //A csoport évi költsége
            let count = 0;
            dates.forEach(item => {
              //if (item === JSOelement.Dd}ataN.parse()["date"]) { count++ 
            })
            if (count === 0) { dates.push(JSON.parse(element.Ddata)["date"]) }
            console.log('srv g av ', dates)
          })
          // datas.forEach(item => {
          //   row.forEach(el => {
          //     console.log('srv grpAvarages ',el)
          //   })
          // })
        }
      )
    })
  })
  res.send()
})

app.get('/getGroupAvarages', (req, res) => {
  res.send(gAvs);
})


app.post('/getCurrentGroup', (req, res) => {
  targetList.length = 0;
  currGRPid = req.body.grID;
  res.send();
})

app.post('/targetListInit', (req, res) => {
  currGRP_TRG[currGRPid.gid] = req.body.Tlist;
  alert = "";
  res.send(currGRP_TRG)
})

app.get('/getDescriptionList', (req, res) => {
  let descrpt = []
  db.serialize(() => {
    db.all(
      `SELECT * FROM descrpt WHERE Gid = ${currGRPid.gid}`,
      (err, row) => {
        if (err) { console.error('Description download error: ', err) }
        if (row) {
          row.forEach((item, idx) => {
            descrpt[idx] = item
            descrptList.push(item.Dscpt)
          })
          res.send(descrpt);
        }
      }
      )
  })
})
// app.post('/descrptListInit',(req,res) => {
//   let a=1;
//   res.send(a)
// })
app.post('/addNewDescrpt', (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    console.log('srv addDescrpt ', key, value);
    const descrptAvailable = descrptAvailability(value);
    if (!descrptAvailable) {
      db.serialize(() => {
        db.run(
          `INSERT INTO descrpt VALUES ('${currGRPid.gid}','${key}','${value}')`,
          (err) => { console.error('New description error: ', err) }
        )
      })
    }
  })
  res.send(req.body);
})

app.get('/getCurrentGroupTargets', (req, res) => {
  const targs = {};
  // let annualAvarage = 0;
  // let dataNr = 1;
  db.serialize(() => {
    db.all(
      `SELECT * FROM targ WHERE Gid = ${currGRPid.gid}`,
      (err, row) => {
        if (err) { console.error('Target download error: ', err); }
        row.forEach(item => {
          targs[item.Tid] = item.Tname;




          //****Csoport átlag kiszámítás***



          // db.all(
          //   `SELECT * FROM data WHERE Gid = ${currGRPid.gid} AND Tid = ${item.Tid}`,
          //   (err, row) => {
          //     if (err) { console.error('Group annual avarage-data error: ', err); }
          //     annualAvarage = (annualAvarage + parseInt(JSON.parse(row[0].Ddata)["price"])) / dataNr;
          //     dataNr++;

          //   }
          //   )
        })
        targetList = [alert, targs]
        res.send(targetList)
      }
    )
  })
})

app.post('/addNewTarget', (req, res) => {
  const newTarget = req.body;
  const newTargObject = {}
  const tarIsAvailable = targetAvailability(newTarget);

  if (!tarIsAvailable) {
    newTargObject[newTarget.regNR] = newTarget.name
    //currGRP_TRG[currGRPid.gid] = newTargObject
    db.serialize(() => {
      db.run(
        `INSERT INTO targ VALUES ('${currGRPid.gid}','${newTarget.regNR}','${newTarget.name}')`,
        (err) => { console.error('Inserting error: ', err) }
      )
    })
  } else {
    alert = tarIsAvailable
  }
  res.send(newTarget)
})

app.post('/targEDIT', (req, res) => {
  const targEditID = req.body.tEditID;
  db.serialize(() => {
    db.run(
      `UPDATE targ SET Tname = ${JSON.stringify(targEditID.tName)} WHERE Gid = ${currGRPid.gid} AND Tid = ${targEditID.tId}`,
      (err) => { console.error('Target updating error: ', err) }
    )
  })
  res.send(targEditID)
})

app.post('/targetDEL', (req, res) => {
  const targetID = req.body.delTrgID;
  db.serialize(() => {
    db.run(
      `DELETE FROM data WHERE Gid = ${currGRPid.gid} AND Tid = ${targetID}`,
      (err) => { console.error('Target-Data deleting error: ', err) }
    )
    db.run(
      `DELETE FROM targ WHERE Gid = ${currGRPid.gid} AND Tid = ${targetID}`,
      (err) => { console.error('Target deleting error: ', err) }
    )
  })
  res.send(targetID)
})



app.post('/getCurrentTarget', (req, res) => {
  dataList.length = 0;
  currTRGid = req.body.targID;
  res.send(currTRGid);
})

app.post('/dataListInit', (req, res) => {
  const targDat = {};
  targDat[currTRGid.tid] = req.body.dList
  currTRG_DAT[currGRPid.gid] = targDat;
  alert = "";
  res.send(currTRG_DAT)
})

app.get('/getCurrentTargetData', (req, res) => {
  const datas = {};
  db.serialize(() => {
    db.all(
      `SELECT * FROM data WHERE Gid = ${currGRPid.gid} AND Tid = ${currTRGid.tid}`,
      (err, row) => {
        if (err) { console.error('Data loading error: ', err) }
        row.forEach(item => {
          datas[item.Did] = item.Ddata;
        })
        dataList = [alert, datas]
        res.send(dataList);
      }
    )
  })
})

app.post('/addNewData', (req, res) => {
  const newData = req.body;
  const datIsAvailable = dataAvailability(newData);

  if (!datIsAvailable) {
    db.serialize(() => {
      db.run(
        `INSERT INTO data VALUES('${currGRPid.gid}','${currTRGid.tid}','${newData.regNR}','${JSON.stringify(newData.name)}')`,
        (err) => { console.error('Data inserting error: ', err) }
      )
    })
  }
  res.send(newData)
})

app.post('/dataEDIT', (req, res) => {
  const editData = req.body.dEditID;
  db.serialize(() => {
    db.run(                       //Ha object-et stringify, akkor ''-közé kell helyezni
      `UPDATE data SET Ddata = '${JSON.stringify(editData.dName)}' WHERE Gid = ${currGRPid.gid} AND Tid = ${currTRGid.tid} AND Did = ${editData.dId}`,
      (err) => { console.error('Data editing error: ', err) }
    )
  })

  res.send(editData)
})

app.post('/dataDEL', (req, res) => {
  const delDataID = req.body.delDta

  db.serialize(() => {
    db.run(
      `DELETE FROM data WHERE Gid = ${currGRPid.gid} AND Tid = ${currTRGid.tid} AND Did = ${delDataID}`,
      (err) => { console.error('Data deleting error: ', err) }
    )
  })

  res.send(delDataID)
})


// app.get('/getDescriptionList',(req,res) => {
//   let descrpt = {D:["description", "from", "server"]}
//   res.send(descrpt);
// })









app.listen(PORT, () => {
  console.log(`The API is listening to port: ${PORT}`);
})









// DB.create();
// getGr();
// console.log('srv group in DB ', GRP);

// async function getGr() {

//   const tempGRP = await DB.getGroups();
//   GRP = tem1pGRP;
//   console.log('srv awaited ', GRP);
//   //if (tempGRP) { GRP = tempGRP }
// }


// app.get('/', (req, res) => {
//   res.send('SQLITE server!')
// })

// app.get('/getDB', (req, res) => {
//   console.log('storage groups ',DB.getGroups());
//   res.send(JSON.stringify(DB))
// })



// app.get('/getGroupList', (req, res) => {
//   let groupIFO = undefined;
//   let allGroups = [];
//   console.log('srv list ', GRP);
//   if (GRP) { allGroups = Object.values(GRP) };
//   groupList = [[""], allGroups];
//   if (!alert) {
//     if (allGroups.length === 0) {
//       groupList[0][0] = 'A CSOPORT lista üres ...'
//     }
//     groupIFO = groupList;
//   } else {
//     groupList[0][0] = alert;
//     groupIFO = groupList;
//   }
//   res.send(JSON.stringify(groupIFO))

// })



//const GRP = { 'G001': 'Személyes', 'G002': 'Autó' }
//const TARG = {
//              'G001': {
//                        'T001': 'Aldi',
//                        'T002': 'Lidl'
//              },
//              'G002': {
//                        'T001': 'Alianz'
//              }
// }   //const TARG = { 'G001%T001': 'Aldi', 'G001%T002': 'Lidl' }, 'G002%T001': 'Alianz' } }

//const DATA = {
//  'G001%T001%D001': {date:'2020.08.06', time:'12:00', description: 'Élelmiszer', cost: '6200'},
//  'G001%T001%D002': {date:'2020.09.15', time:'16:30', description: 'Élelmiszer', cost: '16340'}
//}
// const DATA = {
//   'G001': {
//     'T001': {
//       'D001': {
//         date: '2020.08.06.',
//         time: '12:00',
//         description: 'Élelmiszer',
//         cost: '6200'
//       },
//       'D002': {
//         date: '2020.09.15.',
//         time: '16:30',
//         description: 'Élelmiszer',
//         cost: '16340'
//       }
//     },
//     'T002': {
//       'D001': {
//         date: '2020.09.10.',
//         time: '14:40',
//         description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//         cost: '10320'
//       },
//       'D002': {
//         date: '2020.09.22.',
//         time: '13:40',
//         description: 'Élelmiszer',
//         cost: '10520'
//       },
//       'D003': {
//         date: '2020.09.10.',
//         time: '14:40',
//         description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//         cost: '10320'
//       },
//       'D004': {
//         date: '2020.09.22.',
//         time: '13:40',
//         description: 'Élelmiszer',
//         cost: '10520'
//       },
//       'D005': {
//         date: '2020.09.10.',
//         time: '14:40',
//         description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//         cost: '10320'
//       },
//       'D006': {
//         date: '2020.09.22.',
//         time: '13:40',
//         description: 'Élelmiszer',
//         cost: '10520'
//       },
//       'D007': {
//         date: '2020.09.10.',
//         time: '14:40',
//         description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//         cost: '10320'
//       },
//       'D008': {
//         date: '2020.09.22.',
//         time: '13:40',
//         description: 'Élelmiszer',
//         cost: '10520'
//       }
//     }
//   },
//   'G002': {
//     'T001': {
//       'D001': {
//         date: '2020.07.20.',
//         time: '10:00',
//         description: 'Biztosítás',
//         cost: '21000'
//       }
//     }
//   }
// }

/*************************************************** */


/***************************************************************
 *
 * @DATABASE
 *
 */

// const DB = [
//   {
//     name: 'Személyes',
//     target: [
//       {
//         name: 'Aldi',
//         data: [
//           {
//             date: '2020.08.06.',
//             time: '12:00',
//             description: 'Élelmiszer',
//             cost: '6200'
//           },
//           {
//             date: '2020.09.15.',
//             time: '16:30',
//             description: 'Élelmiszer',
//             cost: '16340'
//           }
//         ]
//       },
//       {
//         name: 'Lidl',
//         data: [
//           {
//             date: '2020.09.10.',
//             time: '14:40',
//             description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//             cost: '10320'
//           },
//           {
//             date: '2020.09.22.',
//             time: '13:40',
//             description: 'Élelmiszer',
//             cost: '10520'
//           },
//           {
//             date: '2020.09.10.',
//             time: '14:40',
//             description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//             cost: '10320'
//           },
//           {
//             date: '2020.09.22.',
//             time: '13:40',
//             description: 'Élelmiszer',
//             cost: '10520'
//           },
//           {
//             date: '2020.09.10.',
//             time: '14:40',
//             description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//             cost: '10320'
//           },
//           {
//             date: '2020.09.22.',
//             time: '13:40',
//             description: 'Élelmiszer',
//             cost: '10520'
//           },
//           {
//             date: '2020.09.10.',
//             time: '14:40',
//             description: 'Élelmiszer dséfladskfgpok dsfélmgporma pogfpaoidsfpo gfpoiasdpö9asfpo lpsado',
//             cost: '10320'
//           },
//           {
//             date: '2020.09.22.',
//             time: '13:40',
//             description: 'Élelmiszer',
//             cost: '10520'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Autó',
//     target: [
//       {
//         name: 'Alianz',
//         data: [
//           {
//             date: '2020.07.20.',
//             time: '10:00',
//             description: 'Biztosítás',
//             cost: '21000'
//           }
//         ]
//       }
//     ]
//   }
// ]