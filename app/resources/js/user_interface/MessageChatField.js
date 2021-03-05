//var AppClient = require("../AppClient.js");
import AppClient from "../AppClient.js";

const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();

function addMessageToBoard(message, boardEl) {
    let date = new Date(message.time).toLocaleDateString(),
        tmpElement = document.createElement("div"),
        messageElement;
    tmpElement.innerHTML = MESSAGE_TEMPLATE;
    messageElement = tmpElement.firstChild;
    messageElement.querySelector(".timestamp").innerHTML = date;
    messageElement.querySelector(".user-name").innerHTML = message.from;
    messageElement.querySelector(".text").innerHTML = message.data;
    boardEl.insertBefore(messageElement, boardEl.firstChild);
}

class MessageChatField {

    constructor(){
        
        this.boardEl=document.querySelector(".board");
        this.sendMessageButton = document.querySelector(".editor input[type=\"button-send\"]");
        this.userNameEl = document.querySelector(".editor input[type=\"text\"]");
        this.messageEl = document.querySelector(".editor textarea");
        this.sendMessageButton.addEventListener("click", this.onMessageSend);

        AppClient.addEventListener("new message", this.onMessageReceived);
        AppClient.connect();

    }

    onMessageReceived(ev){
        ev.data.data.forEach(message => addMessageToBoard(message, this.boardEl));
    }

    onMessageSend() {
        if (this.userNameEl.value === "" || this.messageEl.value === "") {
            return;
        }
        console.log("Trying to send message");
        AppClient.send(this.userNameEl.value, this.messageEl.value);
        this.messageEl.value = "";
    }
}

export default MessageChatField;
//module.exports=MessageChatField;