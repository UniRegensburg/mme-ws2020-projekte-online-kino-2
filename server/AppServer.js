/* eslint-env node */
import * as SocketIO from "socket.io";
import path from "path";
import express from "express";
import http from "http"; //const http=require("http"); ist in Node.js implementiert

var io, 
users = [], 
connections = [];


/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */
/*function onClientConnect(socket){
  console.log("kuku");
   socket.join("app");
   console.log("jemand angebunden");
    connections.push(socket);
    console.log('Connected: sockets connected '+ connections.length);
}*/

class AppServer {

  /**
   * Creates full path to given appDir and constructors express application with
   * static "/app" route to serve files from app directory.
   * 
   * @constructor
   * @param  {String} appDir Relative path to application dir (from parent)
   */
  constructor(appDir) {
    this.app = express();
    this.app.use("/app", express.static(appDir));
  }


  /**
   * Starts server on given port
   * 
   * @param  {Number} port Port to use for serving static files
   */
  start(port) {
    this.server=http.createServer(this.app);
    this.server.listen(port, function() {
      console.log(
        `AppServer started. Client available at http://localhost:${port}/app`
      );
    });
    console.log("hier sind wir");
    //io=require('socket.io')(http);
    io = new SocketIO.Server(this.server);
    console.log("io"+io);

    //Problem: Funktion wird nicht aufgerufen 
    io.on("connection", function (socket){
      console.log("connections"+connections);
      socket.join("app");
      console.log("jemand angebunden");
      connections.push(socket);
      console.log('Connected: sockets connected '+ connections.length);
    });
    console.log("kuku1");
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