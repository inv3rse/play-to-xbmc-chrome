getEmbeddedVideos();

function getEmbeddedVideos() {
    var videoList = [];
    var videoIdList = [];

    var $iframes = $('iframe[src*="youtube.com/embed"]');
    var regex = ".*youtube.com/embed/([^&/?]+).*";
    for (var i = 0; i < $iframes.length; i++) {
        var obj = $($iframes[i])[0];

        if (obj && obj.src && obj.src.match(regex)) {
            videoIdList.push(obj.src.match(regex)[1]);
        }
    }
    
    if (videoIdList.length === 0) {
        return;
    }

    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + combineVideoIdList(videoIdList) + "&key=AIzaSyA3INgfTLddMbrJm8f68xpvfPZDAzDqk10";
    $.getJSON(url, function (data) {
        for (var i = 0; i < data.items.length; i++) {
            var item = data.items[i];
            var title = item.snippet.title;
            var videoID = item.id;
            var videoURL = 'https://www.youtube.com/watch?v=';
            var url = videoURL + videoID;

            videoList.push({
                id: videoID,
                title: title,
                url: url
            });
        }

        if (videoList.length > 0) {
            chrome.runtime.sendMessage({action: 'addUrls', media: videoList});
        }
    });
}

function combineVideoIdList(videoIdList) {
    var videoIdString = '';
    for (var i = 0; i < videoIdList.length; i++) {
        var videoId = videoIdList[i];
        if (i != 0) {
            videoIdString += ',';
        }
        videoIdString += videoId;
    }

    return videoIdString;
}
