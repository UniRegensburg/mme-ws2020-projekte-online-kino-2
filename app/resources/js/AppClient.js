
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

    connect() {
        ws.on("new message", (data)=>{
            console.log("message allgemein: " + data);
            this.notifyAll(new Event("new message", data));
        });
    }

    static send(userName, message) {
        console.log("userName is "+userName+" message is "+message);
        ws.emit("send message", {userName: userName, message: message});
    }
}

export default AppClient;
