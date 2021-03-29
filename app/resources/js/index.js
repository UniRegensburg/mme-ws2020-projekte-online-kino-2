/* eslint-disable no-unused-vars */
// Events that are triggered on the client side are intercepted here

import MessageChatField from "./user_interface/MessageChatField.js";
import VideoControl from "./user_interface/VideoControl.js";
import AppClient from "../js/AppClient.js";
import GenerateRoom from "./user_interface/GenerateRoom.js";

// eslint-disable-next-line no-undef
var messageChatField,
videoControl, appClient, generateRoomObj;

function init() {
    appClient=new AppClient();
    generateRoomObj=new GenerateRoom(appClient);
    messageChatField=new MessageChatField(appClient);
    videoControl=new VideoControl(appClient);
  }
  
init();