
import { Observable, Event} from "../../../utils/Observable.js";

var ws;

/*function onMessage(message) {
    console.log("message allgemein " + message);
    this.notifyAll(new Event("new message", message));
}*/

class AppClient extends Observable {
    constructor() {
        super();
        // eslint-disable-next-line no-undef
        ws = io.connect();
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
    }

    sendVideoStarting(time){
        console.log("ws emitted ein obj "+time);
        ws.emit("starting player", time);
    }

    sendVideoStopping(time){
        ws.emit("stopping player", time);
    }
}

export default AppClient;
