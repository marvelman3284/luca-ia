// TODO: export schedule as pdf?

// declare needed lists
let drills = ["drill0", "drill1", "drill2", "drill3", "drill4", "drill5", "drill6", "drill7", "drill8", "drill9", "drill10"]
let descriptions = ["description for drill 0", "description for drill 1", "description for drill 2", "description for drill 3", "description for drill 4", "description for drill 5", "description for drill 6", "description for drill 7", "description for drill 8", "description for drill 9", "description for drill 10"]
// note how the lists are linked, the value at position 0 for both lists corresponds to drill0

let newDrills = []
let newDescriptions = []

// DONE: store drills (should store all drills) vs store schedule (store only the n number used)
for (let i = 0; i < drills.length; i++) {
  let table = document.getElementById("allDrills")

  let newRow = table.insertRow(1)
  let drillName = newRow.insertCell(0)
  let drillDesc = newRow.insertCell(1)
  let del = newRow.insertCell(2)

  drillName.innerText = drills[i]
  drillDesc.innerText = descriptions[i]
  del.innerHTML = `<input type="button" value="click to delete row" onclick="deleteRow(this)"></input>`
}

let completed_drills = []
let completed_desc = []

let saved_drills = JSON.parse(localStorage.getItem('drills') || "{}") // check if something is stored in localstoreage

let saved_desc = JSON.parse(localStorage.getItem('descriptions') || "{}") // check if something is stored in localstoreage

try { // try to retrieve the stored data
  for (let i = 0; i < saved_drills.length; i++) {
    let table = document.getElementById("allDrills")

    let newRow = table.insertRow(1)

    newRow.insertCell(0).innerText = saved_drills[i][0]
    newRow.insertCell(1).innerText = saved_desc[i][0]
    newRow.insertCell(2).innerHTML = `<input type="button" value="click to delete row" onclick="deleteRow(this)"></input>`
    
    drills.push(saved_drills[i][0])
    console.log(drills)
    descriptions.push(saved_drills[i][0])
  }
} catch (TypeError) { // if nothing is stored then js will throw a TypeError, catch it and print out a log s statement
  console.log('notin stored')
}

function choice(drills, descriptions) {
  let idx = Math.floor(Math.random() * drills.length) // generate a random number between 0 and drills.length
  return [drills[idx], descriptions[idx]] // return a list with the random drill and its corresponding description
}

// save the drill and the description in the browsers localstorage
function storeSchedule() {
  localStorage.setItem("schedule", JSON.stringify(completed_drills))
  localStorage.setItem("scheduleDescriptions", JSON.stringify(completed_desc))
}

function loadSch() {
  let loadDrills = JSON.parse(localStorage.getItem("schedule")) || {}
  let loadDescriptions = JSON.parse(localStorage.getItem("scheduleDescriptions")) || {}
  // TODO: check if null => return

  let table = document.getElementById("schedule")
  table.innerHTML = ""

  
  let loadHeading = table.createTHead().insertRow(0)

  loadHeading.insertCell(0).outerHTML = "<th> Time </th>"
  loadHeading.insertCell(1).outerHTML = "<th> Drill Name </th>"
  loadHeading.insertCell(2).outerHTML = "<th>Drill Description </th>"

  let loadFinalRow = table.insertRow(1)

  loadFinalRow.insertCell(0).innerText = "15 min"
  loadFinalRow.insertCell(1).innerText = "Cooldown"
  loadFinalRow.insertCell(2).innerText = "Practice ends with a cooldown"

  for (let i = 0; i < 6; i++) {
    let newRow = table.insertRow(1)

    newRow.insertCell(0).innerText = "10 min"
    newRow.insertCell(1).innerText = loadDrills[i]
    newRow.insertCell(2).innerText = loadDescriptions[i]
  }

  let loadWarmup = table.insertRow(1)
  loadWarmup.insertCell(0).innerText = "15 min"
  loadWarmup.insertCell(1).innerText = "Warmup"
  loadWarmup.insertCell(2).innerText = "Warmup Drills"
}

function storeDrills() {
  console.log("called")
  localStorage.setItem("drills", JSON.stringify(newDrills))
  localStorage.setItem("descriptions", JSON.stringify(newDescriptions))
}

// clear the saved data
function clear_drill() {
  localStorage.removeItem("drills");
  localStorage.removeItem("descriptions");
}


// TODO: see if there is drills in localstorage
// if there arent then store the default drills in there
// everytime a drill is added or deleted the localstorage should be updated
// then display an alert that says reload to allow for changes to take affect or something
// FIX: fix the code its written like shit this file needs to be organized

function deleteRow(o) {
  // TODO: remove from list then rewrite the localstorage saved items
  let td = o.parentNode;
  let tr = td.parentNode; // the row to be removed
  tr.parentNode.removeChild(tr);
}

function addRow() {
  let table = document.getElementById("allDrills")
  let drillNameAlert = window.prompt("What is the name of the drill")
  let drillDescAlert = window.prompt("Enter the description of the drill")

  if (drillNameAlert == null || drillNameAlert == "" || drillDescAlert == null || drillDescAlert == "") {
    alert("One (or more) fields was left empty!")
    return
  }

  let newRow = table.insertRow(1)
  newRow.insertCell(0).innerText = drillNameAlert
  newRow.insertCell(1).innerText = drillDescAlert
  newRow.insertCell(2).innerHTML = `<input type="button" value="click to delete row" onclick="deleteRow(this)"></input>`

  newDrills.push(drillNameAlert)
  newDescriptions.push(drillDescAlert)

  alert("Reload to be able to use the new drill in a schedule")
}

function genSch() {
  let table = document.getElementById("schedule")
  table.innerHTML = ""

  drills = drills.concat(completed_drills)
  descriptions = descriptions.concat(completed_desc)
  completed_drills = []
  completed_desc = []
  
  let heading = table.createTHead()
  let headingRow = heading.insertRow(0)

  headingRow.insertCell(0).outerHTML = "<th> Time </th>"
  headingRow.insertCell(1).outerHTML = "<th> Drill Name </th>"
  headingRow.insertCell(2).outerHTML = "<th>Drill Description </th>"

  let finalRow = table.insertRow(1)

  finalRow.insertCell(0).innerText = "15 min"
  finalRow.insertCell(1).innerText = "Cooldown"
  finalRow.insertCell(2).innerText = "Practice ends with a cooldown"

  for (let i = 0; i < 6; i++) {
    let drill = choice(drills, descriptions)

    let newRow = table.insertRow(1)

    newRow.insertCell(0).innerText = "10 min"
    newRow.insertCell(1).innerText = drill[0]
    newRow.insertCell(2).innerText = drill[1]
    let idx = drills.indexOf(drill[0]) // find the index of the drill (that also will link to the index of the description)

    completed_drills.push(drills.splice(idx, 1)) // remove the drill from the drills list move the drill to the completed list
    completed_desc.push(descriptions.splice(idx, 1)) // do the same for descriptions
  }

  let warmup = table.insertRow(1)
  warmup.insertCell(0).innerText = "15 min"
  warmup.insertCell(1).innerText = "Warmup"
  warmup.insertCell(2).innerText = "Warmup Drills"
}
