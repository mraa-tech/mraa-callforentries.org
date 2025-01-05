// Endpoint => Call For Entries Dashboard
const EP_DASHBOARD =
   "https://script.google.com/macros/s/AKfycbw-L_jwHLpTW1ltdQM-iBL69WVQbkhB55Jw0Ir0FkXQoW2pUm5YWXlMTTf0DBZZMooS/exec" +
   "?q="

function fetchCurrentExhibitions() {
   const yr = new Date().getFullYear()
   const url = EP_DASHBOARD + "currentexhibitions"
   fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
         t = resp
         showCurrentExhibitions(resp)
      })
      .catch()
}

function showYear() {
   const yr = new Date().getFullYear()
   const ele = document.getElementById("yr")
   ele.innerText = yr
}

function showCurrentExhibitions(arr) {
   const ele = document.getElementById("currentexhibitions")
   document.getElementById("loadingcurrentexhibitions").remove()
   const schema = {
      Name: 0,
      Entries: 1,
   }

   if (arr.length <= 0) {
      ele.innerHTML = "No open calls"
   } else {
      //build table
      const table = document.createElement("table")

      //create headers
      const headers = Object.keys(schema)
      const thead = document.createElement("thead")
      const hrow = document.createElement("tr")
      headers.forEach((h) => {
         let hdr = document.createElement("th")
         hdr.innerText = h
         hrow.append(hdr)
      })
      thead.append(hrow)
      table.append(thead)

      //create body
      const tbody = document.createElement("tbody")
      arr.forEach((r) => {
         let brow = document.createElement("tr")
         r.shift() //remove the event id
         r.forEach((c) => {
            let cell = document.createElement("td")
            cell.innerText = c
            brow.append(cell)
         })
         tbody.append(brow)
      })
      table.append(tbody)

      ele.append(table)
      table.classList.add("table", "table-borderless")
   }
}

document.addEventListener("DOMContentLoaded", showYear)
document.addEventListener("DOMContentLoaded", fetchCurrentExhibitions)
