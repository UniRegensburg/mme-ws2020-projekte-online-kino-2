/* eslint-disable no-console */

import { Observable, Event} from "../../../utils/Observable.js";

var ws;

class AppClient extends Observable {
    constructor() {
        super();
        // eslint-disable-next-line no-undef
        ws = io.connect();
     //   ws.on("connect", ()=>{
     //       ws.emit("room", room);
     //   });
    }

    connectForChatting() {
        ws.on("new message", (data)=>{
            this.notifyAll(new Event("new message", data));
        });
    }

    sendMessage(userName, message) {
        console.log("userName is "+userName+" message is "+message);
        ws.emit("send message", {userName: userName, message: message});
    }

    connectForVideoControlling(){
        ws.on("just play", (data)=>{
            console.log("videoEl event receivedTime: " + data+data.videoTime);
            this.notifyAll(new Event("just play", data.videoTime));
        });
        ws.on("just stop", (data)=>{
            this.notifyAll(new Event("just stop", data.videoTime));
        });
        ws.on("change video with new src", (newSrc)=>{
            console.log("change video with new src received by client "+newSrc );
            this.notifyAll(new Event("change video with new src", newSrc));
        });

        ws.on("new URL for PlayList", (newURL)=>{
            console.log("NEW URL HERE"+newURL);
            this.notifyAll(new Event("new URL for PlayList", newURL));
        });

        ws.on("synchronized info", (data)=>{
            this.notifyAll(new Event("synchronized info", data));
        });
    }

    sendSynchronizedInfo(time, currentSrc){
        console.log("time "+time+" currsrc "+currentSrc);
        ws.emit("sending sync info", {time: time, currentSrc: currentSrc});
    }

    sendVideoStarting(time){
        console.log("ws emitted ein obj "+time);
        ws.emit("starting player", time);
    }

    sendVideoStopping(time){
        ws.emit("stopping player", time);
    }

    sendNewVideoSrc(newSrcFromSelectedVideo){
        console.log("ws sendet das event change video from playlist "+newSrcFromSelectedVideo);
        ws.emit("change video from playlist", newSrcFromSelectedVideo);
    }

    sendNewURL(newURLForPlayList){
        console.log("ws sendet das event NEW URL for playlist "+newURLForPlayList);
        ws.emit("add new URL", newURLForPlayList);
    }
}

export default AppClient;
