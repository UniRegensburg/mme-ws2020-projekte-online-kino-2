/* eslint-env node */

import AppServer from "./server/AppServer.js";
import SocketServerProxy from "./server/SocketServerProxy.js";


var appServer,
    socketServerProxy;

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    let httpServer;
    appServer = new AppServer("app", "libs");
    socketServerProxy = new SocketServerProxy();
    httpServer = appServer.start(5500);
    socketServerProxy.start(httpServer);
}

init();