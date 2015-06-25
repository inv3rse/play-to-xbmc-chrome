function findMedia()
{
  var searchRegex = /((((https|http):\/\/(www\.)?([^\s])+\.(mp4|avi|wmv|asf|flv|mkv|webm))(\?[a-zA-Z0-9\?&=]+)?)(\s|$|"|'))/;
  var found = $('*').html().match(searchRegex)

  if (found) {
    content = []
    content.push({
      id: "myTestID1",
      title: "foundVideo",
      url: found[3]
    });

    if (found[2] != found[3]) {
      content.push({
        id: "myTestID2",
        title: "foundVideo + Param",
        url: found[2]
      });
    }

    return content;
  }

  return null;
}

var media = findMedia();
if (media) {
  chrome.runtime.sendMessage({action: 'addUrls', media: media});
}