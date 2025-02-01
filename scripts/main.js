// Endpoint => Call For Entries Dashboard
const EP_DASHBOARD =
   "https://script.google.com/macros/s/AKfycbw-L_jwHLpTW1ltdQM-iBL69WVQbkhB55Jw0Ir0FkXQoW2pUm5YWXlMTTf0DBZZMooS/exec" +
   "?q="
// test endpoint
const EP_DASHBOARD_TEST =
   "https://script.google.com/macros/s/AKfycbw-L_jwHLpTW1ltdQM-iBL69WVQbkhB55Jw0Ir0FkXQoW2pUm5YWXlMTTf0DBZZMooS/exec?q=openshows"

function fetchOpenShows() {
   const url = EP_DASHBOARD + "openshows"
   fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
         t = resp
         showOpenShows(resp)
      })
      .catch()
}

function fetchCurrentExhibitions() {
   const url = EP_DASHBOARD + "currentexhibitions"
   fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
         t = resp
         showCurrentExhibitions(resp)
      })
      .catch()
}

function fetchTotalsByExhibitName() {
   const url = EP_DASHBOARD + "totalsbyexhibitname"
   fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
         t = resp
         showTotalsByExhibitName(resp)
      })
      .catch()
}

function showYear() {
   const yr = new Date().getFullYear()
   const ele = document.getElementById("year")
   ele.innerText = yr
}

function showOpenShows(arr) {
   const ele = document.getElementById("openshows")
   document.getElementById("loadingopenshows").remove()
   ele.innerHTML = ""
   const thead = document.createElement("thead")
   const hrow = document.createElement("tr")
   const tbody = document.createElement("tbody")
   const headers = [
      "Title",
      "Exhibit Location",
      "Drop Off Date",
      "Pick Up Date",
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
      ele.innerHTML = "All shows have closed"
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
         if (a.showdropoffdate !== "") {
            let date = new Date(a.showdropoffdate)
            cell.innerHTML = date.toDateString()
         }
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
   ele.innerHTML = ""
   const thead = document.createElement("thead")
   const hrow = document.createElement("tr")
   const tbody = document.createElement("tbody")
   const headers = [
      "Title",
      "Exhibit Location",
      "Call Closes",
      "Call for Entries",
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
            "' target='_blank' class='btn btn-primary'>Enter the Show</a>"
         // cell.classList.add("btn", "btn-primary", "mt-2")
         brow.append(cell)
         tbody.appendChild(brow)
      })
      table.appendChild(tbody)
      ele.appendChild(table)
      table.classList.add("table", "table-striped")
   }
}

function showTotalsByExhibitName(arr) {
   const ele = document.getElementById("paymentsrecorded")
   document.getElementById("loadingpaymentsrecorded").remove()
   const schema = {
      "Exhibit Title": 0,
      "Last Name": 1,
      "First Name": 2,
      Entries: 3,
      "Amount Paid": 4,
   }

   //build table
   const table = document.createElement("table")
   //create headers
   const headers = Object.keys(schema)
   //arr = arr.shift() // remove the headers
   const thead = document.createElement("thead")
   const hrow = document.createElement("tr")
   headers.forEach((h) => {
      let hdr = document.createElement("th")
      hdr.innerText = h
      hrow.append(hdr)
      thead.append(hrow)
      table.append(thead)
   })
   // create footer
   const tfoot = document.createElement("tfoot")

   //create body
   const tbody = document.createElement("tbody")

   arr.forEach((r, i) => {
      let brow = document.createElement("tr")
      r.forEach((c, i) => {
         if (i === schema["Amount Paid"]) {
            c = "$" + c
         }
         let cell = document.createElement("td")
         cell.innerText = c
         brow.append(cell)
      })
      if (i === arr.length - 1) {
         tfoot.append(brow)
      } else {
         tbody.append(brow)
      }
   })

   table.append(tbody)
   table.append(tfoot)
   table.classList.add("table", "table-striped")
   ele.append(table)
}

document.addEventListener("DOMContentLoaded", showYear)
document.addEventListener("DOMContentLoaded", fetchCurrentExhibitions)
document.addEventListener("DOMContentLoaded", fetchTotalsByExhibitName)
document.addEventListener("DOMContentLoaded", fetchOpenShows)