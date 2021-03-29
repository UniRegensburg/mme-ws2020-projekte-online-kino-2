import { Observable, Event} from "../../../utils/Observable.js";

var ws;

class AppClient extends Observable {
    constructor() {
        super();
        // eslint-disable-next-line no-undef
        ws = io.connect();
    }

    //methods concerning generating room link, event-listeners for clients
    roomLinkCreating(){
      ws.on("created room link", (roomLink)=>{
        this.notifyAll(new Event("created room link", roomLink));
      });

      ws.on("roomlink correct", (correctOrNot)=>{
        this.notifyAll(new Event("roomlink correct", correctOrNot.ifCorrect));

      });
    }

    //methods concerning entering room, event-listener for clients
    enteringRoom(roomLinkValue){
      ws.emit("entering room", roomLinkValue);
    }

    //methods concerning text chat, event-listeners for clients
    connectForChatting() {
        ws.on("new message", (data)=>{
            this.notifyAll(new Event("new message", data));
        });
    }

    sendMessage(message) {
        ws.emit("send message", {message: message});
    }

    //methods concerning video controlling, event-listeners for clients
    connectForVideoControlling(){
        ws.on("just play", (data)=>{
            this.notifyAll(new Event("just play", data.videoTime));
        });

        ws.on("just stop", (data)=>{
            this.notifyAll(new Event("just stop", data.videoTime));
        });

        ws.on("change video with new src", (newSrc)=>{
            this.notifyAll(new Event("change video with new src", newSrc));
        });

        ws.on("new URL for PlayList", (newURL)=>{
            this.notifyAll(new Event("new URL for PlayList", newURL));
        });

        ws.on("synchronized info", (data)=>{
            this.notifyAll(new Event("synchronized info", data));
        });

        ws.on("altered list", (json)=>{
            this.notifyAll(new Event("altered list", json));
        });
    }

    //methods concerning emitting events
    sendCreateRandomRoomLink(){
        ws.emit("creating room link");
    }

    sendSynchronizedInfo(time, currentSrc){
        ws.emit("sending sync info", {time: time, currentSrc: currentSrc});
    }

    sendAlteredList(myList){
        // eslint-disable-next-line no-undef
        ws.emit("sending new list", JSON.stringify(myList));
    }

    sendVideoStarting(time){
        ws.emit("starting player", time);
    }

    sendVideoStopping(time){
        ws.emit("stopping player", time);
    }

    sendNewVideoSrc(newSrcFromSelectedVideo){
        ws.emit("change video from playlist", newSrcFromSelectedVideo);
    }

    sendNewURL(newURLForPlayList){
        ws.emit("add new URL", newURLForPlayList);
    }
}

export default AppClient;
