//const { default: Observable } = require("../../../utils/Observable.js");
//const Message = require("./Message.js");

import {Observable, Event} from "../../../utils/Observable.js";
import Message from "../js/Message.js";

function onMessage(message){
    console.log("message allgemein "+message);
    this.notifyAll(new Event("new message", message));
}

class AppClient extends Observable {
    constructor(){
        super();
    }

    connect(){
        this.ws=io();
        this.ws.on("new message", onMessage.bind(this));
    }

    send(userName, message){
        this.ws.emit("new message", new Message(userName, message, Date.now()));
    }
}

export default new AppClient();
//module.exports=new AppClient();