/* eslint-env node */

import AppServer from "./server/AppServer.js";
//var AppServer=require("./server/AppServer.js"),
var appServer;
/**
 * Starts web server to serve files from "/app" folder
 */
function init() {
    appServer = new AppServer("app", "libs", "utils");
   // appServer.addEventListener("new socket registered", synchronizeVideoData.bind(appServer));
    console.log("appServer " + appServer);
    console.log("Hallo, hier bin ich");
    appServer.start(5500);
    
}

/*function synchronizeVideoData (){
   
}*/

init();