/* eslint-env browser */
//hier werden events, die auf 
//der Seite des Clients wahrgenommen werden
//und ausgeloest werden, behandelt
import MessageChatField from "./user_interface/MessageChatField.js";
import VideoControl from "./user_interface/VideoControl.js";
import AppClient from "../js/AppClient.js";

// eslint-disable-next-line no-undef
var messageChatField,
videoControl, appClient;

function init() {
   // changeVideoUrl();
    appClient=new AppClient();
    messageChatField=new MessageChatField(appClient);
    videoControl=new VideoControl(appClient);
  }

//youtube links zum Probieren 
//https://www.youtube.com/watch?v=d27gTrPPAyk
//https://www.youtube.com/watch?v=C3lWwBslWqg
/*function changeVideoUrl() {
  console.log("in changeVideoURL Methode drin ");
  document.getElementById("submitButton").addEventListener("click", () => {
    let newUrl = document.getElementById("urlInput").value;
    console.log(newUrl);
    myPlayer.src({ type: "video/youtube", src:newUrl});
    myPlayer.play();
});
}*/

init();