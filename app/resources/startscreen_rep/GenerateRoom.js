/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable one-var */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// /* eslint-disable vars-on-top /
// / eslint-disable no-unused-vars */

//import AppClient from "../js/AppClient";

// export default new GenerateRoom();

//ALTER CODE GENARATE ROOM
const link = "http://localhost:5500/";
var newField, 
roomId, roomLinks=[], appClientHere, createRoomLinkButton, linkEnteringField;

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
    constructor(appClient){
        appClientHere=appClient;
        createRoomLinkButton=document.querySelector(".cta");
        newField=document.querySelector(".createdLink");
        document.querySelector(".startscreen-bereich").style.display="block";
        document.querySelector(".index-bereich").style.display="none";


        console.log("wir sind in generate room");
        linkEnteringField=document.querySelector(".linkEnteringField");
        linkEnteringField.addEventListener("keypress", this.showRoom.bind(appClientHere));
        // var copyTextButton=document.querySelector(".copy-text");
        // copyTextButton.addEventListener("click", copyToClipboard);
        //newField.value="";
        appClientHere.roomLinkCreating();
       // newField.addEventListener("click", this.showRoom);
       
        createRoomLinkButton.addEventListener("click", this.onCreateRandomLinkClicked.bind(appClientHere));
        appClientHere.addEventListener("roomlink correct", this.proveLink );

        appClientHere.addEventListener("created room link", this.showCreatedLink);
    }

    showCreatedLink(ev){
      console.log("von server created link is "+ev.data);
      newField.style.visibility="visible";
      newField.innerHTML = ev.data;
    }

    onCreateRandomLinkClicked(){
      appClientHere.sendCreateRandomRoomLink();
    }

    showRoom(ev) {
      console.log("wir aendern html "+ev.target);

      if(ev.keyCode===13){
        console.log("wir aendern html und value linkEnteringField.innerHTML is "+linkEnteringField.value);
        appClientHere.enteringRoom(linkEnteringField.value);

      }

    }

    proveLink(ev){
      console.log("proving link "+ev.data);
      if(ev.data===true){
        console.log("proving link TRUE ");

        document.querySelector(".index-bereich").style.display="block";
        document.querySelector(".startscreen-bereich").style.display="none";
      
      }
      else{
        console.log("proving link FALSE ");

        document.querySelector(".index-bereich").style.display="none";
        document.querySelector(".startscreen-bereich").style.display="none";
        alert("Der eingetragene link ist falsch");
      }
    }

    static getRoomLinksArray(){
        console.log("roomLinks STARTSCREEN "+roomLinks);
        return roomLinks;
    }
}

 export default GenerateRoom;
