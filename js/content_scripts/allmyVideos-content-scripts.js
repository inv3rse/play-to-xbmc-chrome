// find media and the corresponding resolution
function findSources()
{
  options = [];
  sources = $('*').html().match(/("sources" : (\[[^\]]*\]))/);
  if (sources)
  {
    sources = JSON.parse('{' + sources[1] + '}').sources;
    for (var i = 0; i < sources.length; i++)
    {
      if (sources[i].file && sources[i].label)
      {
        options.push(
          {
            id: "AllmyVideos" + sources[i].label,
            title: "AllmyVideos (" + sources[i].label + "p)",
            url: sources[i].file
          }
        );
      }
    }
  }
  return options;
}

var media = findSources();
if (media.length > 0) {
  chrome.runtime.sendMessage({action: 'addUrls', media: media});
}
