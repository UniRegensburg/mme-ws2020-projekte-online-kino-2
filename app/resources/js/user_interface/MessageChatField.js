
const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();
var boardEl, messageEl, sendMessageButton, appClientHere;

/* adds entered message from user to the chat field in addition 
to the generated name and timestamp*/
function addMessageToBoard(message, boardEl) {
    let dateD = new Date(),    
    date = dateD.toLocaleTimeString(),
        tmpElement = document.createElement("div"),
        messageElement;
    tmpElement.innerHTML = MESSAGE_TEMPLATE;
    messageElement = tmpElement.firstChild;
    messageElement.querySelector(".timestamp").innerHTML = date;
    messageElement.querySelector(".text").innerHTML = message.message;
    messageElement.querySelector(".savedUserName").innerHTML=message.savedUserName;
    boardEl.insertBefore(messageElement, boardEl.firstChild);
}

class MessageChatField {

    constructor(appClient){
        appClientHere=appClient;
        this.setElements();
        appClientHere.connectForChatting();
        this.addListeners();    
    }

    setElements(){
        boardEl=document.querySelector(".board");
        sendMessageButton = document.querySelector(".editor input[type=\"button\"]");
        messageEl = document.querySelector(".editor textarea");
    }

    addListeners(){
        sendMessageButton.addEventListener("click", this.onMessageSend.bind(appClientHere));
        appClientHere.addEventListener("new message", this.onMessageReceived);
    }

    onMessageReceived(ev){
        addMessageToBoard(ev.data, boardEl);
    }

    onMessageSend() {
        if (messageEl.value === "") {
            // eslint-disable-next-line no-alert
            alert("Bitte Text eingeben!");
            return;
        }
        appClientHere.sendMessage(messageEl.value);
        messageEl.value = "";
    }
}

export default MessageChatField;