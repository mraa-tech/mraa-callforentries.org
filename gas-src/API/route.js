const ROUTES = {
   path: function (r, callback) {
      ROUTES[r] = callback
   },
}
ROUTES.path("currentexhibitions", getCurrentExhibitionsResponse)

function doGet(e) {
   let result = route(e.parameter["q"])
   let response = JSON.stringify(result)

   return ContentService.createTextOutput(response).setMimeType(
      ContentService.MimeType.JSON
   )
}

function doPost(e) {
   let result = route("post", e.parameter["q"])
}

function route(path) {
   let result = ROUTES[path]()
   return result
}

function getCurrentExhibitionsResponse() {
   return MRAACommon.getOpenCalls()
}
