/* eslint-env node */

//import AppServer from "./server/AppServer.js";
var AppServer=require("./server/AppServer.js"),
server;
/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    // Access command line parameters from start command (see package.json)
    server = new AppServer("./app");
    server.start(8000);
    server.process();
}

init();