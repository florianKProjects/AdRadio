
var arrayRecord = [];
let fmp4Data;
window.createfMP4 = createfMP4;
window.fmp4Data = fmp4Data = {
        'audio': [],
        'video': []
        };
function setstatios(url){
        debugger;
        document.getElementById("staionName").innerHTML = url;
        if(Hls.isSupported())
        {
            var video = document.getElementById('video');
            var hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.BUFFER_APPENDING, function (event, data) {
              fmp4Data['audio'].push(data.data);
    });
            video.play();
        }
        else if (video.canPlayType('application/vnd.apple.mpegurl'))
        {   
            video.src = 'playlist.m3u8';
            video.addEventListener('canplay',function()
            {
                video.play();
            });
        }
    }

function RECOGNITION(file)
{
var request = new XMLHttpRequest();

request.open("POST", "https://api.audd.io/?jsonp=?");
request.setRequestHeader("file","");
request.setRequestHeader("return", 'timecode,apple_music');
request.setRequestHeader("api_token", 'test');

request.send(file);
}

function arrayConcat(inputArray) {
    var totalLength = inputArray.reduce(function (prev, cur) { return prev + cur.length; }, 0);
    var result = new Uint8Array(totalLength);
    var offset = 0;
    inputArray.forEach(function (element) {
        result.set(element, offset);
        offset += element.length;
    });
    return result;
}
function createfMP4(type) {

    if (fmp4Data[type].length) {
        var blob = new Blob([arrayConcat(fmp4Data[type])], {
            type: 'application/octet-stream'
        });

        let filename = type + '-' + new Date().toISOString() + '.mp3';
        var formData = new FormData();
        
        formData.append(filename,blob)
        debugger;
        RECOGNITION(formData);
       debugger;
        $('body').append('<a download="hlsjs-' + filename + '" href="' + window.URL.createObjectURL(blob) + '">Download ' + filename + ' track</a><br>');
    }
}

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
function arrayConcat(inputArray) {
    var totalLength = inputArray.reduce(function (prev, cur) { return prev + cur.length; }, 0);
    var result = new Uint8Array(totalLength);
    var offset = 0;
    inputArray.forEach(function (element) {
        result.set(element, offset);
        offset += element.length;
    });
    return result;
}
$(document).ready(function() {
    statios=[
                {
                    stationName : "Radio88",
                    imageUrl:'http://cdn-profiles.tunein.com/s47350/images/logog.jpg?t=155853',
                    Url:"https://kanlivep2event-i.akamaihd.net/hls/live/749623/749623/master.m3u8"
                },
                {
                    stationName : "GalGalatz",
                    imageUrl:'https://upload.wikimedia.org/wikipedia/he/thumb/4/40/Galgalz.svg/1280px-Galgalz.svg.png',
                    Url:"https://kanlivep2event-i.akamaihd.net/hls/live/749623/749623/master.m3u8"
                },
            ]
            parseAll(statios);
    });
//------- html Maker-------------------    
function parseAll(data) {
    Object.keys(data).forEach(key => {
        let html = $( 
            '<div class="staion"><a href="#"><div class="img" style="background-image:url('+data[key].imageUrl+');"></div></a><div calss="statioName"><h3 onclick=setstatios("'+data[key].Url+'") >' + data[key].stationName + '</h3></div></div>'   
        );
    $("#statiosList").append(html);
});

}