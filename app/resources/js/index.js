/* eslint-env browser */
/* global getVideoId */
//hier werden events, die auf 
//der Seite des Clients wahrgenommen werden
//und ausgeloest werden, behandelt

// Importing debugging module
import Logger from "/libs/logger/Logger.js";

//const MessageChatField = require("./user_interface/MessageChatField.js");
//import MessageChatField from "./user_interface/MessageChatField.js";



var myPlayer = document.getElementById("my-player");

function init() {
    Logger.setLevel(Logger.DEBUG);
    Logger.debug("wir sind in init");
    changeVideoUrl();
    //var messageChatField=new MessageChatField();
    //Logger.debug(messageChatField);
    Logger.debug(document.getElementById("submitButton"));
}

function changeVideoUrl() {
    getVideoId('https://www.youtube.com/watch?v=C3lWwBslWqg');
    const id = getVideoId('https://www.youtube.com/watch?v=C3lWwBslWqg');

    Logger.debug("in changeVideoURL Methode drin ");

    document.getElementById("submitButton").addEventListener("click", (ev) => {
        Logger.debug("clickeEvent registered " + ev);
        Logger.debug("https://www.googleapis.com/youtube/v3/search/?key=%27+my_key+%27&part=snippet&q=%27+uri");
        myPlayer.src = "https://www.youtube.com/embed/" + id;
        Logger.debug(id);
    });
}
init();