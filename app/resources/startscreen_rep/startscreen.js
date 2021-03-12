
var newField;

function init(){
    var createRoomLinkButton=document.querySelector(".cta");
    newField=document.querySelector(".createdLink");
    newField.value="";
    createRoomLinkButton.addEventListener("click", createRandomSymbols);
}

function createRandomSymbols(){
    console.log("createRandomLink");
    newField.style.visibility="visible";
    newField.value=Math.random().toString(36).substr(2, 12);

}

init();