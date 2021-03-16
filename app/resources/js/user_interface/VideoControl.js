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
var playButton, pauseButton, syncButton, shuffleButton, nextButton, videoEl,
appClientHere, framesBox, submitButton, urlInputField, myList;

class VideoControl extends Observable{
    constructor(appClient){
        super();
        appClientHere=appClient;
        playButton=document.querySelector(".playButton");
        pauseButton=document.querySelector(".pauseButton");
        syncButton=document.querySelector(".syncButton");
        shuffleButton=document.querySelector(".shuffleButton");
       // nextButton=document.querySelector(".nextButton");
        framesBox=document.querySelector(".frames-box");

        submitButton=document.querySelector("#submitButton");
        urlInputField=document.querySelector("#urlInput");

        // eslint-disable-next-line no-undef
        videoEl=videojs('my-player');
     
        myList=[{sources: [{
            src: 'https://www.youtube.com/watch?v=2V1fYJntoFA',//Hund
            type: 'video/youtube',
        }], thumbnail: "https://i.ytimg.com/vi/2V1fYJntoFA/hqdefault.jpg"}];

        appClientHere.connectForVideoControlling();
        submitButton.addEventListener("click", this.addVideoToPlayList);
        playButton.addEventListener("click", this.onPlayButtonClicked.bind(appClientHere));
        pauseButton.addEventListener("click", this.onPauseButtonClicked.bind(appClientHere));
      //  videoEl.on("videoElSrc changed", this.changeVideo);
      //  framesBox.addEventListener("click", this.onPlayListElementClicked.bind(appClientHere));
        syncButton.addEventListener("click", this.sendSynchronization.bind(appClientHere));
        shuffleButton.addEventListener("click", this.shufflePlayList.bind(appClientHere));

        appClientHere.addEventListener("new URL for PlayList", this.addNewVideoToPlayList);
        appClientHere.addEventListener("just play", this.playVideo);
        appClientHere.addEventListener("just stop", this.pauseVideo);
       // appClientHere.addEventListener("change video with new src", this.changeVideoElement);
        appClientHere.addEventListener("synchronized info", this.synchronizeInfo);
        appClientHere.addEventListener("shuffled list", this.shuffleListForAll);
        
        videoEl.playlist(myList);
        videoEl.playlistUi({className: "frames-box" , horizontal:true, playlistPicker:false});
        videoEl.playlist.autoadvance(0); //play through the playlist automatically
    }

    addVideoToPlayList(){
        if(urlInputField.value===""){
            return;
        }
        if(!(urlInputField.value.includes("https://www.youtube.com/watch?v=")) || (urlInputField.value.length!==43)) {
            return;
        }
        /*myList.forEach(element => {
            console.log("element.sources.src "+element.sources.src);
        });*/
       
        
        appClientHere.sendNewURL(urlInputField.value);
    }

    shufflePlayList(){
        videoEl.playlist.shuffle({rest: true});
        console.log("videoEl.playlist() HIER "+videoEl.playlist()+" myList "+myList);
        appClientHere.sendShuffledList(videoEl.playlist());
    }
//YUOTUBE
//https://www.youtube.com/watch?v=C3lWwBslWqg sting desert rose
//https://www.youtube.com/watch?v=EgmXTmj62ic tamally maak

  /*  onPlayListElementClicked(ev){
        console.log("ev playListEl clicked "+ev);
        videoEl.trigger("videoElSrc changed");
    }*/

    addNewVideoToPlayList(ev){
        var { id } = getVideoId(`${ev.data}`);
        myList.push({sources: [{
            src: `${ev.data}`,
            type: 'video/youtube',
        }], thumbnail:[{
          src: `http://img.youtube.com/vi/${id}/hqdefault.jpg`,
        }]});
        videoEl.playlist(myList);
        videoEl.playlistUi({className: "frames-box" , horizontal:true , playlistPicker:false});
        urlInputField.value="";
        
       // myList.push(new VideoElement(ev.data, id).getVideoElement());
    }

    /*changeVideo(){
        appClientHere.sendNewVideoSrc(videoEl.currentSrc());
    }*/

    onPlayButtonClicked(){
        console.log("playButton gedrueckt um die Zeit "+videoEl.currentTime());
        appClientHere.sendVideoStarting(videoEl.currentTime());  
    }

    onPauseButtonClicked(){
        appClientHere.sendVideoStopping(videoEl.currentTime());
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

    /*changeVideoElement(ev){
        console.log("ev.data.src "+ev.data);
        videoEl.src({type:"video/youtube", src: ev.data});
       // videoEl.play();
    }*/

    synchronizeInfo(ev){
        videoEl.src({type:"video/youtube", src: ev.data.currentSrc});
        console.log("ev for synchronisation received "+ev+" ev.data.time "+ev.data.time +" ev.data.currscr "+ev.data.currentSrc);
        videoEl.currentTime(ev.data.time);
    }

    shuffleListForAll(ev){
        videoEl.playlist(ev.data);
        videoEl.playlistUi({className: "frames-box" , horizontal:true, playlistPicker:false});

        console.log("shuffled playlist received "+ev.data);
    }

}
export default VideoControl;