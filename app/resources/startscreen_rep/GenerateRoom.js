/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */

var linkArray;

class GenerateRoom {
    constructor(){
        linkArray=["app, roomOne, roomTwo"];
    }

    static getLinkArray(){
        return linkArray;
    }
}

export default new GenerateRoom();
