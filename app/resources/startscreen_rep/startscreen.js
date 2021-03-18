/* eslint-disable no-unused-vars */
import GenerateRoom from "./GenerateRoom.js";

// const link = "http://localhost:5500/";
// var newField, 
// roomId;


function init(){
    var generateRoomObj=new GenerateRoom();
    
   // var genID = roomId;
//     var createRoomLinkButton=document.querySelector(".cta");
//     newField=document.querySelector(".createdLink");
//     //newField.value="";
//     createRoomLinkButton.addEventListener("click", createRandomSymbols);
 }

// function createRandomSymbols(){
//     console.log("createRandomLink");
//     newField.style.visibility="visible";
//     roomId = Math.random().toString(36).substr(2, 12);
//     console.log("ID" + roomId);
//     newField.innerHTML = link+roomId;
// }

// function CopyToClipboard(containerid) {
//     if (document.selection) {
//       var range = document.body.createTextRange();
//       range.moveToElementText(document.getElementById(containerid));
//       range.select().createTextRange();
//       document.execCommand("copy");
//     } else if (window.getSelection) {
//       var range = document.createRange();
//       range.selectNode(document.getElementById(containerid));
//       window.getSelection().addRange(range);
//       document.execCommand("copy");
//       alert("Text has been copied, now paste in the text-area")
//     }
//   }

init();