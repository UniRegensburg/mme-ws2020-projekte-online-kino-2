/* eslint-disable no-unused-vars */

import Observable from "../../../../utils/Observable.js";
var playButton, pauseButton, syncButton, previousButton, nextButton, videoEl,
appClientHere;

class VideoControl extends Observable{
    constructor(appClient){
        super();
        appClientHere=appClient;
        playButton=document.querySelector(".playButton");
        pauseButton=document.querySelector(".pauseButton");
        syncButton=document.querySelector(".syncButton");
        previousButton=document.querySelector(".previousButton");
        nextButton=document.querySelector(".nextButton");
        // eslint-disable-next-line no-undef
        videoEl=videojs('my-player');

        appClientHere.connectForVideoControlling();
        playButton.addEventListener("click", this.onPlayButtonClicked.bind(appClientHere));
        pauseButton.addEventListener("click", this.onPauseButtonClicked.bind(appClientHere));
        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.stopVideo);
    }

    onPlayButtonClicked(){
        console.log("playButton gedrueckt um die Zeit "+videoEl.currentTime());
        appClientHere.sendVideoStarting(videoEl.currentTime());  
    }

    onPauseButtonClicked(){
        appClientHere.sendVideoStopping(videoEl.currentTime());
    }

    playVideo(ev){
        console.log("gesendete Zeit"+ev.data);
        videoEl.currentTime(ev.data);
        videoEl.play();
    }

    stopVideo(ev){
        videoEl.currentTime(ev.data);
        videoEl.pause();
    }
}
export default VideoControl;