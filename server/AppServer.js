/* eslint-env node */
//*import * as SocketIO from "socket.io";
//*import path from "path";
//*import express from "express";
//*import http from "http"; //const http=require("http"); ist in Node.js implementiert
//const path=require("path");
const express=require("express");
//var bodyParser = require("body-parser");
const http = require("http");

var app, io,
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


class AppServer {

  /**
   * Creates full path to given appDir and constructors express application with
   * static "/app" route to serve files from app directory.
   * 
   * @constructor
   * @param  {String} appDir Relative path to application dir (from parent)
   */
  constructor(appDir) {
    app = express();
    app.use("/app", express.static(appDir));
    //app.use(express.static(path.join("/app", appDir)));

  }


  /**
   * Starts server on given port
   * 
   * @param  {Number} port Port to use for serving static files
   */
  start(port) {

    this.server=http.createServer(app);
   /* //*this.server.listen(port, function() {
      console.log(
        `AppServer started! Client available at http://localhost:${port}/app`
      );
    });*/
    //io=require('socket.io')(http);
    //*io = new SocketIO.Server(this.server);
   
    this.server.listen(port, ()=> {
    console.log(`AppServer started!!! Client available at http://localhost:${port}/app`);
    });
    //Problem: Funktion wird nicht aufgerufen 
    io = require("socket.io")(this.server);
    console.log("io hier"+io);

    }

    process(){
      io.sockets.on("connection", function(socket){
        connections.push(socket);
        socket.join("app");
        console.log("Anzahl von connections angebunden"+connections.length +socket.id);
  
      });
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

//*export default AppServer; 
module.exports=AppServer;