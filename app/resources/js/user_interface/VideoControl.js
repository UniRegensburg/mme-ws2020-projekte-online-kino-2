/* eslint-disable quotes */
/* eslint-disable no-console */
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
        nextButton.addEventListener("click", this.changeVideo.bind(appClientHere));

        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.pauseVideo);
        appClientHere.addEventListener("change video with new src", this.changeVideoElement);
        //liElement wird angeklickt, wird ein Event generiert
        //liElement "click", func);
        //func() { ;
        //videoEl.notifyAll(new Event("change video")}
        //videoEl lauscht auf dieses Event und aendert dann seine src fuer ausgewaehltes Video
        //videoEl.addEventListener("change video", this.changeVideoElement)
        videoEl.playlist([{
            sources: [{
                src: 'https://www.youtube.com/watch?v=2V1fYJntoFA',//Hund
                type: 'video/youtube',
            }], thumbnail:true },{
            sources: [{
              src: 'https://www.youtube.com/watch?v=C3lWwBslWqg', //Sting
              type: 'video/youtube',
          }],thumbnail:true }, {
            sources: [{
              src: 'https://www.youtube.com/watch?v=3pL1plgdPbg', //
              type: 'video/youtube',
          }],thumbnail:true }, {}]);
        videoEl.playlistUi({className: "frames-box" , horizontal:true});
    }

    changeVideo(){
        console.log("onnextbutton clicked");
        appClientHere.sendNewVideoSrc("https://www.youtube.com/watch?v=d27gTrPPAyk");
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

    pauseVideo(ev){
        videoEl.currentTime(ev.data);
        videoEl.pause();
    }

    changeVideoElement(ev){
        console.log("ev.data.src "+ev.data);
        videoEl.src({type:"video/youtube", src: ev.data});
        videoEl.play();
    }
}
export default VideoControl;