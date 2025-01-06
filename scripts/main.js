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
         testShowCurrentExhibitions(resp)
      })
      .catch()
}

function showYear() {
   const yr = new Date().getFullYear()
   const ele = document.getElementById("year")
   ele.innerText = yr
}

function testShowCurrentExhibitions(arr) {
   const ele = document.getElementById("currentexhibitions")
   document.getElementById("loadingcurrentexhibitions").remove()
   ele.innerHTML = ""
   const thead = document.createElement("thead")
   const hrow = document.createElement("tr")
   const tbody = document.createElement("tbody")
   const headers = [
      "Title",
      "Exhibit Location",
      "Call Closes",
      "Submit an Entry",
   ]
   const table = document.createElement("table")
   headers.forEach((h) => {
      const th = document.createElement("th")
      th.innerText = h
      hrow.appendChild(th)
   })
   thead.appendChild(hrow)
   table.appendChild(thead)

   if (arr.length <= 0) {
      ele.innerHTML = "All calls have closed"
   } else {
      arr.forEach((a) => {
         let brow = document.createElement("tr")
         let cell = document.createElement("td")
         cell.innerText = a.exhibittitle
         brow.append(cell)

         cell = document.createElement("td")
         cell.innerText = a.location
         brow.append(cell)

         cell = document.createElement("td")
         if (a.cfeclosedate !== "") {
            let date = new Date(a.cfeclosedate)
            cell.innerHTML = date.toDateString()
         }
         brow.append(cell)

         cell = document.createElement("td")
         cell.innerHTML =
            "<a href='" +
            a.registrationlink +
            "' target='_blank'>Call For Entry</a>"
         brow.append(cell)
         tbody.appendChild(brow)
      })
      table.appendChild(tbody)
      ele.appendChild(table)
      table.classList.add("table", "table-striped")
   }
}

function showCurrentExhibitions(arr) {
   const ele = document.getElementById("currentexhibitions")
   document.getElementById("loadingcurrentexhibitions").remove()
   const schema = {
      Name: 0,
      Entries: 1,
   }

   if (arr.length <= 0) {
      ele.innerHTML = "All calls have closed"
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
