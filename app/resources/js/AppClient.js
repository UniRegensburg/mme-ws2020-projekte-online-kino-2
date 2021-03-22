//const { default: Observable } = require("../../../utils/Observable.js");
//const Message = require("./Message.js");

// Importing debugging module
import Logger from "./utils/Logger.js";

import io from "socket.io-client";
import { Observable, Event } from "../../../utils/Observable.js";
import Message from "./js/Message.js";
//./Message.js

function onMessage(message) {
    Logger.debug("message allgemein " + message);
    this.notifyAll(new Event("new message", message));
}

class AppClient extends Observable {
    constructor() {
        super();
    }

    connect() {
        this.ws = io("http://localhost:8000/app");
        this.ws.on("new message", onMessage.bind(this));
    }

    send(userName, message) {
        this.ws.emit("new message", new Message(userName, message, Date.now()));
    }
}

export default AppClient;
//module.exports=new AppClient();