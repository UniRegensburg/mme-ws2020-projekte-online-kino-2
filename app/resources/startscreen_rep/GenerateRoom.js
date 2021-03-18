/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable one-var */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// /* eslint-disable vars-on-top /
// / eslint-disable no-unused-vars */

// var linkArray;

// class GenerateRoom {
//     constructor(){
//         linkArray=["app, roomOne, roomTwo"];
//     }

//     static getLinkArray(){
//         return linkArray;
//     }
// }

// export default new GenerateRoom();

//ALTER CODE GENARATE ROOM
const link = "http://localhost:5500/";
var newField, 
roomId, roomLinks=[];

function createRandomSymbols(){
    console.log("createRandomLink");
    newField.style.visibility="visible";
    roomId = Math.random().toString(36).substr(2, 12);
    console.log("ID" + roomId);
    roomLinks.push(roomId);
    console.log("roomLinks "+roomLinks);
    newField.innerHTML = link+roomId;
}

function CopyToClipboard(containerid) {
  /*  if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      alert("Text has been copied, now paste in the text-area")
    }*/
  }

class GenerateRoom {
    constructor(){
        var createRoomLinkButton=document.querySelector(".cta");
        newField=document.querySelector(".createdLink");
        // var copyTextButton=document.querySelector(".copy-text");
        // copyTextButton.addEventListener("click", copyToClipboard);
        //newField.value="";
        createRoomLinkButton.addEventListener("click", createRandomSymbols);
    }

    static getRoomLinksArray(){
        console.log("roomLinks STARTSCREEN "+roomLinks);
        return roomLinks;
    }
}

 export default GenerateRoom;
