/* eslint-env browser */
//hier werden events, die auf 
//der Seite des Clients wahrgenommen werden
//und ausgeloest werden, behandelt
// import getVideoId from '../../../node_modules/get-video-id/dist/get-video-id.js';
import getVideoId from "/get-video-id";
//const MessageChatField = require("./user_interface/MessageChatField.js");
//import MessageChatField from "./user_interface/MessageChatField.js";
var myPlayer = document.getElementById("my-player");

function init() {
	console.log("wir sind in init");
	changeVideoUrl();
	//var messageChatField=new MessageChatField();
	//console.log(messageChatField);
	console.log(document.getElementById("submitButton"));
}

function changeVideoUrl() {
	getVideoId('https://www.youtube.com/watch?v=C3lWwBslWqg');
	const id = getVideoId('https://www.youtube.com/watch?v=C3lWwBslWqg');

	console.log("in changeVideoURL Methode drin ");
	
	document.getElementById("submitButton").addEventListener("click", (ev) => {
		console.log("clickeEvent registered "+ev);
		// console.log("https://www.googleapis.com/youtube/v3/search/?key=%27+my_key+%27&part=snippet&q=%27+uri)
		myPlayer.src="https://www.youtube.com/embed/"+id;
		console.log(id);
	});
}	
init();