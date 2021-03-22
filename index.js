/* eslint-env node */

import Logger from "./libs/logger/Logger.js";
import AppServer from "./server/AppServer.js";
import SocketServerProxy from "./server/SocketServerProxy.js";


var appServer,
    socketServerProxy;

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    let httpServer;
    Logger.setLevel(Logger.DEBUG);
    Logger.debug("Starting server application");
    appServer = new AppServer("app", "libs", "shared");
    socketServerProxy = new SocketServerProxy();
    httpServer = appServer.start(5500);
    socketServerProxy.start(httpServer);
}

init();