/* eslint-env node */

import express from "express";
import http from "http";
var app, server;

/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

class AppServer {
    constructor(appDir, libDir, sharedDir) {
        app = express();
        // Static serving client code
        app.use("/app", express.static(appDir));
        // Static serving moduels shared between client and server
        app.use("/shared", express.static(sharedDir));
        // Static serving client libraries
        app.use("/libs", express.static(libDir));
    }

    start(port) {
        server = http.createServer(app);
        server.listen(port);
        return server;
    }

    /**
     * Stops running express server
     */
    stop() {
        if (this.server === undefined) {
            return;
        }
        this.server.close();
    }
}

export default AppServer;
//module.exports=AppServer;