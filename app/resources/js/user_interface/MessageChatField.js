/* eslint-disable no-alert */
/* eslint-disable one-var */
/* eslint-disable no-console */

const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();
var boardEl, messageEl, sendMessageButton, userNameEl, appClientHere;

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

    constructor(appClient){
        appClientHere=appClient;
        boardEl=document.querySelector(".board");
        sendMessageButton = document.querySelector(".editor input[type=\"button\"]");
        userNameEl = document.querySelector(".editor input[type=\"text\"]");
        messageEl = document.querySelector(".editor textarea");

        appClientHere.connectForChatting();
        sendMessageButton.addEventListener("click", this.onMessageSend.bind(appClientHere));
        appClientHere.addEventListener("new message", this.onMessageReceived);
        
    }

    onMessageReceived(ev){
        addMessageToBoard(ev.data, boardEl);
    }

    onMessageSend() {
        if (userNameEl.value === "" || messageEl.value === "") {
            alert("Bitte Name und Text eingeben!");

            return;
        }
        appClientHere.sendMessage(userNameEl.value, messageEl.value);
        messageEl.value = "";
        userNameEl.value="";
    }
}

export default MessageChatField;
