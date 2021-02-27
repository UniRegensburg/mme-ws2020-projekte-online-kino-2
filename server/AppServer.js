/* eslint-env node */
//import * as SocketIO from "socket.io";
//var io = require('socket.io');
/*const path = require("path"),
  express = require("express");
  const http=require("http"); */



var io;


/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

class AppServer {

  /**
   * Creates full path to given appDir and constructors express application with
   * static "/app" route to serve files from app directory.
   * 
   * @constructor
   * @param  {String} appDir Relative path to application dir (from parent)
   */
 /* constructor(appDir) {
    this.appDir = path.join(__dirname, "../", appDir); 
    this.app = express();
    this.app.use("/app", express.static(this.appDir));
  }
  */
  constructor(){
    var express = require('express');
    this.app = express();
    this.app.use("/app", express.static(__dirname + '/'));
    this.server = require('http').createServer(this.app);

  }

  start(port){
    io = require('socket.io').listen(this.server);
    this.server.listen(port);
    console.log('Server Started . . .');

  }

  /**
   * Starts server on given port
   * 
   * @param  {Number} port Port to use for serving static files
   */
  /*start(port) {
    this.server=http.createServer(this.app);
   /* this.server = this.app.listen(port, function() {
      console.log(
        `AppServer started. Client available at http://localhost:${port}/app`
      );
    });
    this.server.listen(port, function() {
      console.log(
        `AppServer started. Client available at http://localhost:${port}/app`
      );
    });
    io = new SocketIO.Server(this.server);
  }
  */

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

 module.exports = AppServer;

//export default AppServer; 