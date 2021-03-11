/* eslint-env browser */
//hier werden events, die auf 
//der Seite des Clients wahrgenommen werden
//und ausgeloest werden, behandelt
import MessageChatField from "./user_interface/MessageChatField.js";

// eslint-disable-next-line no-undef
var myPlayer = videojs('my-player'), messageChatField;

function init() {
    changeVideoUrl();
    messageChatField=new MessageChatField();
    console.log("messageChatField is "+messageChatField);
    console.log(document.getElementById("submitButton"));
  }

//youtube links zum Probieren 
//https://www.youtube.com/watch?v=d27gTrPPAyk
//https://www.youtube.com/watch?v=C3lWwBslWqg
function changeVideoUrl() {
  console.log("in changeVideoURL Methode drin ");
  document.getElementById("submitButton").addEventListener("click", () => {
    let newUrl = document.getElementById("urlInput").value;
    console.log(newUrl);
    myPlayer.src({ type: "video/youtube", src:newUrl});
    myPlayer.play();
});
}

init();