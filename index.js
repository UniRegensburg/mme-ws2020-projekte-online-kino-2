/* eslint-env node */

import AppServer from "./server/AppServer.js";
//var AppServer=require("./server/AppServer.js"),
var appServer;
/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    appServer = new AppServer("app");
    console.log("appServer "+appServer+ typeof appServer);
    appServer.start(8000);
   // server.process();
   console.log("2");

}

init();