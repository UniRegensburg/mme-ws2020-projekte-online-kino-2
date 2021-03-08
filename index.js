/* eslint-env node */

import AppServer from "./server/AppServer.js";
//var AppServer=require("./server/AppServer.js"),
var appServer;
/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    appServer = new AppServer("app", "libs");
    console.log("appServer " + appServer);
    appServer.start(5500);
    // server.process();
    //console.log("okay");

}

init();