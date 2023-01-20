window.addEventListener("load", (event) => {
  console.log("page is fully loaded")
  let obj = JSON.parse(localStorage.getItem('drills') || "{}")
  for (let i = 0; i<8; i++) {
    let id = "drill" + (i)
    document.getElementById(id).innerText = obj[i][0]
  }
 
})

let drills = ["layups", "three pointers", "defense", "passing", "dunking", "guarding", "zone defense", "man to man", "free throws", "fouls", "video"]
let completed = []

function choice() {
  return drills[Math.floor(Math.random() * drills.length)]
}

function store() {
  console.log(completed)
  localStorage.setItem("drills", JSON.stringify(completed))
}

function clear_drill() {
  localStorage.removeItem("drills");
  console.log("clear")
}

for (let i = 0; i<8; i++) {
  let id = "drill" + (i)
  let drill = choice()
  let idx = drills.indexOf(drill)
  completed.push(drills.splice(idx, 1))

  document.getElementById(id).innerText = drill
    /* or, using arrow functions in a bit more complicated way:
    document.getElementById(id).innterText = () => {
      return drills[Math.floor(Math.random() * drills.length)]
    }
  */
}
