function getCurrentExhibitionsResponse() {
   const data = MRAACommon.getOpenCalls()

   return data
}

function getExhibitPaymentsResponse() {
   const data = MRAACommon.getExhibitPayments()
   return data
}

function getTotalsByExhibitNameResponse() {
   const data = MRAACommon.getTotalsByExhibitName()
   return data
}

function getOpenShowsResponse() {
   const data = MRAACommon.getOpenShows()
   return data
}