// on page load...
window.addEventListener("load", (event) => {
  let saved_drills = JSON.parse(localStorage.getItem('drills') || "{}")  // check if something is stored in localstoreage
  let saved_desc = JSON.parse(localStorage.getItem('descriptions') || "{}")  // check if something is stored in localstoreage
  try {  // try to retrieve the stored data
    for (let i = 0; i < 8; i++) {
      let id = ["drill" + (i), "description" + (i)]
      document.getElementById(id[0]).innerText = saved_drills[i][0]
      document.getElementById(id[1]).innerText = saved_desc[i][0]
    }
  } catch (TypeError) {  // if nothing is stored then js will throw a TypeError, catch it and print out a log s statement
    console.log('notin stored')
  }
})

// declare needed lists
let drills = ["drill0", "drill1", "drill2", "drill3", "drill4", "drill5", "drill6", "drill7", "drill8", "drill9", "drill10"]
let descriptions = ["description for drill 0", "description for drill 1", "description for drill 2", "description for drill 3", "description for drill 4", "description for drill 5", "description for drill 6", "description for drill 7", "description for drill 8", "description for drill 9", "description for drill 10"]
// note how the lists are linked, the value at position 0 for both lists corresponds to drill0

let completed_drills = []
let compoleted_desc = []


function choice() {
  let idx = Math.floor(Math.random() * drills.length)  // generate a random number between 0 and drills.length
  return [drills[idx], descriptions[idx]]  // return a list with the random drill and its corresponding description
}

// save the drill and the description in the browsers localstorage
function store() {
  localStorage.setItem("drills", JSON.stringify(completed_drills))
  localStorage.setItem("descriptions", JSON.stringify(compoleted_desc))
}

// clear the saved data
function clear_drill() {
  localStorage.removeItem("drills");
  localStorage.removeItem("descriptions");
}

for (let i = 0; i < 8; i++) {
  let id = ["drill" + (i), "description" + (i)]  // dynamically create the id's based on the loop iteration
  let drill = choice()  // choose a random drill and its description
  let idx = drills.indexOf(drill[0])  // find the index of the drill (that also will link to the index of the description)
  completed_drills.push(drills.splice(idx, 1))  // remove the drill from the drills list move the drill to the completed list
  compoleted_desc.push(descriptions.splice(idx, 1))  // do the same for descriptions

  // change the html text
  document.getElementById(id[0]).innerText = drill[0]
  document.getElementById(id[1]).innerText = drill[1]
}
