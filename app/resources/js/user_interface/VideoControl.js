/* eslint-disable no-alert */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Observable from "../../../../utils/Observable.js";
var playButton, pauseButton, syncButton, shuffleButton, reverseButton, videoEl,
appClientHere, sortButton, submitButton, urlInputField, myList, framesBox;

class VideoControl extends Observable{
    constructor(appClient){
        super();
        appClientHere=appClient;
        this.getElements();
        // eslint-disable-next-line no-undef
        videoEl=videojs('my-player');

        var URL="https://www.googleapis.com/youtube/v3/videos?id=2V1fYJntoFA&part=contentDetails&key=AIzaSyAxCYr1QkQLBOglWwT9QXFZjtlNItiRa-Y";
        myList=[{name: "how to bathe your shibe" ,description: "",duration: 42, sources: [{
            src: 'https://www.youtube.com/watch?v=2V1fYJntoFA',//Hund
            type: 'video/youtube',
        }], thumbnail: [{src: "http://img.youtube.com/vi/2V1fYJntoFA/mqdefault.jpg"}]}];

        appClientHere.connectForVideoControlling();
        this.addListeners();
        videoEl.playlist(myList);
        videoEl.playlistUi({horizontal:true, playlistPicker:true, showDescription:true});
        //play through the playlist automatically
        videoEl.playlist.autoadvance(0); 
    }

    getElements(){
        playButton=document.querySelector("#playButton");
        pauseButton=document.querySelector("#pauseButton");
        syncButton=document.querySelector("#syncButton");
        shuffleButton=document.querySelector("#shuffleButton");
        reverseButton=document.querySelector("#reverseButton");
        framesBox=document.querySelector(".frames-box");
        sortButton=document.querySelector("#sortButton");
        submitButton=document.querySelector("#submitButton");
        urlInputField=document.querySelector("#urlInput");
    }

    addListeners(){
        submitButton.addEventListener("click", this.addVideoToPlayList);
        playButton.addEventListener("click", this.onPlayButtonClicked.bind(appClientHere));
        pauseButton.addEventListener("click", this.onPauseButtonClicked.bind(appClientHere));
        reverseButton.addEventListener("click", this.onReverseButtonClicked.bind(appClientHere));
        sortButton.addEventListener("click", this.onSortButtonClicked.bind(appClientHere));
        syncButton.addEventListener("click", this.onSyncButtonClicked.bind(appClientHere));
        shuffleButton.addEventListener("click", this.onShuffleButtonClicked.bind(appClientHere));
        appClientHere.addEventListener("new URL for PlayList", this.addNewVideoToPlayList);
        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.pauseVideo);
        appClientHere.addEventListener("synchronized info", this.synchronizeInfo);
        appClientHere.addEventListener("altered list", this.alterListForAll);   
    }

    addVideoToPlayList(){
        if(urlInputField.value===""){
            alert("Bitte kein leeres Element lassen");
            return;
        }
        if(!(urlInputField.value.includes("https://www.youtube.com/watch?v="))) {
            alert("Die YouTube-URL soll richtig sein");
            return;
        }
        if(videoEl.playlist.contains(urlInputField.value)){
            alert("Dieses Video existiert schon in PlayList");
            return;
        }
        
        appClientHere.sendNewURL(urlInputField.value);
    }

    onShuffleButtonClicked(){
        videoEl.playlist.shuffle({rest: false});
        appClientHere.sendAlteredList(videoEl.playlist());
        appClientHere.sendSynchronizedInfo(videoEl.currentTime(), videoEl.currentSrc());
    }

    processdata(data) {
        let hon = JSON.stringify(data);
        console.log(hon);
    }

    addNewVideoToPlayList(ev){
        var { id } = getVideoId(`${ev.data}`);
        var videoDuration;

        //The following lines fetches the JSON-representation of the Youtube  URL that is entered and converts the >outube-time format into a readable one, source is stated further down below
        fetch (`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&part=contentDetails&key=AIzaSyAxCYr1QkQLBOglWwT9QXFZjtlNItiRa-Y`).then(response => response.json()).then(
        data => {
        let jsonResponse = JSON.stringify(data);
        let jsonVideoInformation = JSON.parse(jsonResponse);
        videoDuration = jsonVideoInformation.items[0].contentDetails.duration;
        let videoName =jsonVideoInformation.items[0].snippet.title;
        
        var convertedTime = videoDuration.match(/\d+/g);
        
        //function taken from https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
        if (videoDuration.indexOf('M') >= 0 && videoDuration.indexOf('H') === -1 && videoDuration.indexOf('S') === -1) {
            convertedTime = [0, convertedTime[0], 0];
        }

        if (videoDuration.indexOf('H') >= 0 && videoDuration.indexOf('M') === -1) {
            convertedTime = [convertedTime[0], 0, convertedTime[1]];
        }
        if (videoDuration.indexOf('H') >= 0 && videoDuration.indexOf('M') === -1 && videoDuration.indexOf('S') === -1) {
            convertedTime = [convertedTime[0], 0, 0];
        }
        
        var readableVideoTime = 0;

        if(convertedTime.length === 3) {
            readableVideoTime = readableVideoTime + parseInt(convertedTime[0]) * 3600;
            readableVideoTime = readableVideoTime + parseInt(convertedTime[1]) * 60;
            readableVideoTime = readableVideoTime + parseInt(convertedTime[2]);
        }
        if(convertedTime.length === 2) {
            readableVideoTime = readableVideoTime + parseInt(convertedTime[0]) * 60;
            readableVideoTime = readableVideoTime + parseInt(convertedTime[1]);
        }
        if(convertedTime.length === 1) {
            readableVideoTime = readableVideoTime + parseInt(convertedTime[0]);
        }

        myList.push({name:videoName, duration: readableVideoTime, sources: [{
                src: `${ev.data}`,
                type: 'video/youtube',
            }], thumbnail:[{
            src: `http://img.youtube.com/vi/${id}/mqdefault.jpg`,
            }]});
            videoEl.playlist(myList);
            videoEl.playlistUi({horizontal:true , playlistPicker:true, showDescription:false});
            urlInputField.value="";
        });
    }

    onPlayButtonClicked() {
        appClientHere.sendVideoStarting(videoEl.currentTime());  
    }

    onPauseButtonClicked(){
        appClientHere.sendVideoStopping(videoEl.currentTime());
    }

    onSortButtonClicked(){
        myList.sort((a,b) => b.duration-a.duration);
        appClientHere.sendAlteredList(myList);
    }

    onReverseButtonClicked(){
        videoEl.playlist.reverse();
        appClientHere.sendAlteredList(videoEl.playlist());
    }

    onSyncButtonClicked(){
        appClientHere.sendAlteredList(videoEl.playlist());
        appClientHere.sendSynchronizedInfo(videoEl.currentTime(), videoEl.currentSrc());
    }

    playVideo(ev){
        videoEl.currentTime(ev.data);
        videoEl.play();
    }

    pauseVideo(ev){
        videoEl.currentTime(ev.data);
        videoEl.pause();
    }

    synchronizeInfo(ev){
        videoEl.src({type:"video/youtube", src: ev.data.currentSrc});
        videoEl.currentTime(ev.data.time);
    }

    alterListForAll(ev){       
        var newMyList=[];
        var parsedData=JSON.parse(ev.data);
            for(var i=0; i<parsedData.length; i++){
                    newMyList.push({name: parsedData[i].name, duration: parsedData[i].duration,sources: [{
                    src: parsedData[i].sources[0].src,
                    type: 'video/youtube',
                }], thumbnail:[{
                    src: parsedData[i].thumbnail[0].src,
                }]});
            }
        videoEl.playlist(newMyList);
        videoEl.playlistUi({horizontal:true, playlistPicker:true, showDescription:false});
    }

}
export default VideoControl;