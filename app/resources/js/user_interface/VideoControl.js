/* eslint-disable no-alert */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Observable from "../../../../utils/Observable.js";
//import VideoElement from "../VideoElement.js";
//import Sources from "./Sources.js";
var playButton, pauseButton, syncButton, shuffleButton, reverseButton, videoEl,
appClientHere, sortButton, submitButton, urlInputField, myList, framesBox;

class VideoControl extends Observable{
    constructor(appClient){
        super();
        appClientHere=appClient;
        playButton=document.querySelector(".playButton");
        pauseButton=document.querySelector(".pauseButton");
        syncButton=document.querySelector(".syncButton");
        shuffleButton=document.querySelector(".shuffleButton");
        reverseButton=document.querySelector(".reverseButton");
        framesBox=document.querySelector(".frames-box");
        sortButton=document.querySelector(".sortButton");
        submitButton=document.querySelector("#submitButton");
        urlInputField=document.querySelector("#urlInput");

        // eslint-disable-next-line no-undef
        videoEl=videojs('my-player');
     
        myList=[{sources: [{
            src: 'https://www.youtube.com/watch?v=2V1fYJntoFA',//Hund
            type: 'video/youtube',
        }], thumbnail: [{src: "http://img.youtube.com/vi/2V1fYJntoFA/hqdefault.jpg"}]}];

        appClientHere.connectForVideoControlling();
        submitButton.addEventListener("click", this.addVideoToPlayList);
        playButton.addEventListener("click", this.onPlayButtonClicked.bind(appClientHere));
        pauseButton.addEventListener("click", this.onPauseButtonClicked.bind(appClientHere));
        reverseButton.addEventListener("click", this.onReverseButtonClicked.bind(appClientHere));
        sortButton.addEventListener("click", this.onSortButtonClicked.bind(appClientHere));
        syncButton.addEventListener("click", this.sendSynchronization.bind(appClientHere));
        shuffleButton.addEventListener("click", this.shufflePlayList.bind(appClientHere));

        appClientHere.addEventListener("new URL for PlayList", this.addNewVideoToPlayList);
        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.pauseVideo);
        appClientHere.addEventListener("synchronized info", this.synchronizeInfo);
        appClientHere.addEventListener("shuffled list", this.shuffleListForAll);
        appClientHere.addEventListener("sorted by Duration", this.shuffleListForAll);
        
        videoEl.playlist(myList);
        videoEl.playlistUi({className: "frames-box" , horizontal:true, playlistPicker:false});
        videoEl.playlist.autoadvance(0); //play through the playlist automatically
    }

    addVideoToPlayList(){
        if(urlInputField.value===""){
            alert("Kein leeres Element");
            return;
        }
        if(!(urlInputField.value.includes("https://www.youtube.com/watch?v=")) || (urlInputField.value.length!==43)) {
            alert("Die YouTube-URL soll richtig sein");
            return;
        }
        if(videoEl.playlist.contains(urlInputField.value)){
            alert("Dieses Video existiert schon in PlayList");
            return;

        }
        
        appClientHere.sendNewURL(urlInputField.value);
    }


    shufflePlayList(){
        videoEl.playlist.shuffle({rest: false});
        console.log("videoEl.playlist() HIER "+videoEl.playlist()+" myList "+myList);
        appClientHere.sendAlteredList(videoEl.playlist());
    }
//YUOTUBE
//https://www.youtube.com/watch?v=C3lWwBslWqg sting desert rose
//https://www.youtube.com/watch?v=EgmXTmj62ic tamally maak
    processdata(data) {
        let hon = JSON.stringify(data);
        console.log(hon);
    }

    addNewVideoToPlayList(ev){
    console.log("HERE NEW SRC "+ev.data);
    var { id } = getVideoId(`${ev.data}`);
    var videoDuration;
    fetch (`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&fileDetails&key=AIzaSyAxCYr1QkQLBOglWwT9QXFZjtlNItiRa-Y`).then(response => response.json()).then(
    data => {
    let jsonResponse = JSON.stringify(data);
    let jsonVideoInformation = JSON.parse(jsonResponse);
    videoDuration = jsonVideoInformation.items[0].contentDetails.duration;
    console.log(jsonVideoInformation.items[0].contentDetails.duration);
    
    var timeDuration = videoDuration.match(/\d+/g);
     
    //function taken from https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
    
    if (videoDuration.indexOf('M') >= 0 && videoDuration.indexOf('H') === -1 && videoDuration.indexOf('S') === -1) {
        timeDuration = [0, timeDuration[0], 0];
    }

    if (videoDuration.indexOf('H') >= 0 && videoDuration.indexOf('M') === -1) {
        timeDuration = [timeDuration[0], 0, timeDuration[1]];
    }
    if (videoDuration.indexOf('H') >= 0 && videoDuration.indexOf('M') === -1 && videoDuration.indexOf('S') === -1) {
        timeDuration = [timeDuration[0], 0, 0];
    }
    
    var trueDuration = 0;

    if(timeDuration.length === 3) {
        trueDuration = trueDuration + parseInt(timeDuration[0]) * 3600;
        trueDuration = trueDuration + parseInt(timeDuration[1]) * 60;
        trueDuration = trueDuration + parseInt(timeDuration[2]);
    }
    if(timeDuration.length === 2) {
        trueDuration = trueDuration + parseInt(timeDuration[0]) * 60;
        trueDuration = trueDuration + parseInt(timeDuration[1]);
    }
    if(timeDuration.length === 1) {
        trueDuration = trueDuration + parseInt(timeDuration[0]);
    }


   
    myList.push({duration: trueDuration, sources: [{
            src: `${ev.data}`,
            type: 'video/youtube',
        }], thumbnail:[{
          src: `http://img.youtube.com/vi/${id}/hqdefault.jpg`,
        }]});
        videoEl.playlist(myList);
        videoEl.playlistUi({className: "frames-box" , horizontal:true , playlistPicker:false});
        urlInputField.value="";
        console.log(myList);
    });
    }

    onPlayButtonClicked() {
        console.log("playButton gedrueckt um die Zeit "+videoEl.currentTime());
        appClientHere.sendVideoStarting(videoEl.currentTime());  
    }

    onPauseButtonClicked(){
        appClientHere.sendVideoStopping(videoEl.currentTime());
    }

    compare(a,b) {
        return a-b;
    }

    onSortButtonClicked(){
        myList.sort((a,b) => b.duration-a.duration);
        appClientHere.sendAlteredList(myList);
    }

    onReverseButtonClicked(){
        videoEl.playlist.reverse();
        appClientHere.sendAlteredList(videoEl.playlist());
    }

    sendSynchronization(){
        appClientHere.sendSynchronizedInfo(videoEl.currentTime(), videoEl.currentSrc());
    }

    playVideo(ev){
        console.log("gesendete Zeit"+ev.data);
        videoEl.currentTime(ev.data);
        videoEl.play();
    }

    pauseVideo(ev){
        videoEl.currentTime(ev.data);
        videoEl.pause();
    }

    synchronizeInfo(ev){
        videoEl.src({type:"video/youtube", src: ev.data.currentSrc});
        console.log("ev for synchronisation received "+ev+" ev.data.time "+ev.data.time +" ev.data.currscr "+ev.data.currentSrc);
        videoEl.currentTime(ev.data.time);
    }

    shuffleListForAll(ev){       
        var newMyList=[];
       // console.log("shuffled playlist received "+ev.data +" length "+ev.data.length);
       // console.log("sources "+JSON.parse(ev.data)+" JSON.parse(ev.data) length "+JSON.parse(ev.data).length);
        var parsedData=JSON.parse(ev.data);
            for(var i=0; i<parsedData.length; i++){
                    newMyList.push({duration: parsedData[i].duration,sources: [{
                    src: parsedData[i].sources[0].src,
                    type: 'video/youtube',
                }], thumbnail:[{
                    src: parsedData[i].thumbnail[0].src,
                }]});
            }
        videoEl.playlist(newMyList);
        videoEl.playlistUi({className: "frames-box" , horizontal:true, playlistPicker:false});
    }

}
export default VideoControl;