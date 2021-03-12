/* eslint-disable vars-on-top */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Observable from "../../../../utils/Observable.js";
var playButton, pauseButton, syncButton, previousButton, nextButton, videoEl,
appClientHere, framesBox, submitButton, urlInputField;

class VideoControl extends Observable{
    constructor(appClient){
        super();
        appClientHere=appClient;
        playButton=document.querySelector(".playButton");
        pauseButton=document.querySelector(".pauseButton");
        syncButton=document.querySelector(".syncButton");
        previousButton=document.querySelector(".previousButton");
        nextButton=document.querySelector(".nextButton");
        framesBox=document.querySelector(".frames-box");

        submitButton=document.querySelector("#submitButton");
        urlInputField=document.querySelector("#urlInput");
        submitButton.addEventListener("click", this.addVideoToPlayList);
        
        // eslint-disable-next-line no-undef
        videoEl=videojs('my-player');

        appClientHere.connectForVideoControlling();
        playButton.addEventListener("click", this.onPlayButtonClicked.bind(appClientHere));
        pauseButton.addEventListener("click", this.onPauseButtonClicked.bind(appClientHere));
        videoEl.on("videoElSrc changed", this.changeVideo);
        framesBox.addEventListener("click", this.onPlayListElementClicked.bind(appClientHere));

        appClientHere.addEventListener("new URL for PlayList", this.addNewVideoToPlayList);
        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.pauseVideo);
        appClientHere.addEventListener("change video with new src", this.changeVideoElement);
       
        videoEl.playlist([{
            sources: [{
                src: 'https://www.youtube.com/watch?v=2V1fYJntoFA',//Hund
                type: 'video/youtube',
            }], thumbnail: "https://i.ytimg.com/vi/2V1fYJntoFA/hqdefault.jpg"},{
            sources: [{
              src: 'https://www.youtube.com/watch?v=C3lWwBslWqg', //Sting
              type: 'video/youtube',
          }],thumbnail: "https://i.ytimg.com/vi/C3lWwBslWqg/hqdefault.jpg" }, {
            sources: [{
              src: 'https://www.youtube.com/watch?v=3pL1plgdPbg', //
              type: 'video/youtube',
          }],thumbnail: "https://i.ytimg.com/vi/3pL1plgdPbg/hqdefault.jpg" }]);
        videoEl.playlistUi({className: "frames-box" , horizontal:true});
        videoEl.playlist.autoadvance(0); //play through the playlist automatically

    }

    addVideoToPlayList(){
        appClientHere.sendNewURL(urlInputField.value);
    }

    onPlayListElementClicked(ev){
        console.log("ev playListEl clicked "+ev);
        videoEl.trigger("videoElSrc changed");
    }

    addNewVideoToPlayList(ev){
        //!!!!HIER sollen wir yu der PlayListe ein neues Link dynamisch hinzufuegen!!!!
        var lastInd=videoEl.playlist.lastIndex()+1;
        console.log("WE RECEIVED URL FOR ADDING"+ev+ev.data+" lastIndex "+lastInd+" videoEl.playlist.currentItem(lastInd) "+videoEl.playlist.currentItem(lastInd-1));
        var el=videoEl.playlist.currentItem(lastInd);
        {sources: [{ src: "https://www.youtube.com/watch?v=2V1fYJntoFA", type: 'video/youtube',}], thumbnail: true};
          //videoEl.playlist.load({sources: [{ src: "https://www.youtube.com/watch?v=2V1fYJntoFA"}]});
        //={sources: [{ src: "https://www.youtube.com/watch?v=2V1fYJntoFA"}]};
    }

    changeVideo(){
        appClientHere.sendNewVideoSrc(videoEl.currentSrc());
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
       // videoEl.play();
    }
}
export default VideoControl;