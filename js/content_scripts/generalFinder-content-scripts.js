function findMedia()
{
  var searchRegex = /((https|http):\/\/(www\.)?([^\s])+\.(mp4|avi|wmv|asf|flv|mkv|webm))/;
  var found = $('*').html().match(searchRegex)

  if (found) {
      return(found[0]);
  }

  return null;
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "findMedia") {
          var link = findMedia();
          // if we do not find something do not answer to give other frames a chance 
          if (link) {
            sendResponse(link);
          }
        }
    }
);
