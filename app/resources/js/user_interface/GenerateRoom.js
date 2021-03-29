/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable one-var */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// /* eslint-disable vars-on-top /
// / eslint-disable no-unused-vars */

//GENERATE ROOM
const link = "http://localhost:5500/", 
ENTER = 13;
var newField, appClientHere, createRoomLinkButton, linkEnteringField;

// This class is responsible for generating a new Room, where the Users get to watch their videos.
// It generates the Room, registers Listeners and also checks if the entered Link/ID to the room is valid
class GenerateRoom {
    constructor(appClient){
        appClientHere=appClient;
        this.getElements();
        this.setListeners();
        appClientHere.roomLinkCreating();
    }

    getElements(){
      createRoomLinkButton=document.querySelector(".cta");
      newField=document.querySelector(".createdLink");
      document.querySelector(".startscreen-bereich").style.display="block";
      document.querySelector(".index-bereich").style.display="none";
      linkEnteringField=document.querySelector(".linkEnteringField");
    }

    setListeners(){
      linkEnteringField.addEventListener("keypress", this.showRoom.bind(appClientHere));
      createRoomLinkButton.addEventListener("click", this.onCreateRandomLinkClicked.bind(appClientHere));
      appClientHere.addEventListener("roomlink correct", this.proveLink );
      appClientHere.addEventListener("created room link", this.showCreatedLink);
    }

    showCreatedLink(ev){
      newField.style.visibility="visible";
      newField.innerHTML = ev.data;
    }

    onCreateRandomLinkClicked(){
      appClientHere.sendCreateRandomRoomLink();
    }

    showRoom(ev) {
      if(ev.keyCode===ENTER){
        appClientHere.enteringRoom(linkEnteringField.value);
      }
    }

    proveLink(ev){
      if(ev.data===true){
        document.querySelector(".index-bereich").style.display="block";
        document.querySelector(".startscreen-bereich").style.display="none";
      }
      else{
        document.querySelector(".index-bereich").style.display="none";
        document.querySelector(".startscreen-bereich").style.display="none";
        alert("Der eingetragene Link ist falsch");
      }
    }
}

 export default GenerateRoom;
