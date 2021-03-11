/* eslint-disable one-var */
/* eslint-disable no-console */
import AppClient from "../AppClient.js";

const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();
var boardEl, messageEl, sendMessageButton, userNameEl, appClient;

function addMessageToBoard(message, boardEl) {
    let dateD = new Date();    
    let date = dateD.toLocaleTimeString(),
        tmpElement = document.createElement("div"),
        messageElement;
        console.log("server time "+new Date(message.timeStamp).toLocaleTimeString()+" data client time "+date);
    tmpElement.innerHTML = MESSAGE_TEMPLATE;
    messageElement = tmpElement.firstChild;
    messageElement.querySelector(".timestamp").innerHTML = date;
    messageElement.querySelector(".user-name").innerHTML = message.userName;
    messageElement.querySelector(".text").innerHTML = message.message;
    boardEl.insertBefore(messageElement, boardEl.firstChild);
    console.log("date is "+date+" messageElement is "+messageElement+ " tmpElement is "+tmpElement);
    
}

class MessageChatField {

    constructor(){
        
        boardEl=document.querySelector(".board");
        console.log("this.boardEl is "+boardEl);

        sendMessageButton = document.querySelector(".editor input[type=\"button\"]");
        console.log("this.sendMessageButton is "+sendMessageButton);
        
        userNameEl = document.querySelector(".editor input[type=\"text\"]");
        console.log("this.userNameEl is "+userNameEl);

        messageEl = document.querySelector(".editor textarea");
        console.log("this.messageEl is "+messageEl);

        appClient=new AppClient();
        appClient.connect();
        sendMessageButton.addEventListener("click", this.onMessageSend);
        appClient.addEventListener("new message", this.onMessageReceived);
        
    }

    onMessageReceived(ev){
        console.log("onMessageReceived: ev is "+ev+" ev.data is "+ev.data);
        //ev.data.data.forEach(message => addMessageToBoard(message, boardEl));
        addMessageToBoard(ev.data, boardEl);
    }

    onMessageSend() {
        console.log("onMessageSend: hier");
        if (userNameEl.value === "" || messageEl.value === "") {
            return;
        }
        console.log("Trying to send message");
        AppClient.send(userNameEl.value, messageEl.value);
        messageEl.value = "";
        userNameEl.value="";
    }
}

export default MessageChatField;
