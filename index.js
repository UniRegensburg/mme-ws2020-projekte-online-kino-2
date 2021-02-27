/* eslint-env node */

//import AppServer from "./server/AppServer.js";
 const AppServer = require("./server/AppServer.js");

/**
 * Starts webserver to serve files from "/app" folder
 */
/*function init() {
    // Access command line parameters from start command (see package.json)
    appDirectory = process.argv[2], // folder with client files
    appPort = process.argv[3]; // port to use for serving static files
    server = new AppServer(appDirectory);
    console.log(process.argv[2]);
    server.start(appPort);
}*/
function init(){
    var appServer=new AppServer();
    appServer.start(8000);
}

init();