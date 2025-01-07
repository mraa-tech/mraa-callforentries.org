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
