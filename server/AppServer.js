/* eslint-env node */
import * as SocketIO from "socket.io";
import Message from "../app/resources/js/Message.js";
import path from "path";
import express from "express";
import http from "http"; //const http=require("http"); ist in Node.js implementiert
//const path=require("path");
//const express=require("express");
//var bodyParser = require("body-parser");
//const http = require("http");
//var Message=require("./app/resources/js/Message.js");
var app, server,io,
users = [], 
connections = [], messages=[];


/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

/*function onClientConnect(socket) { 
  console.log("socket is "+socket);
  //socket.on("message", onClientMessage.bind(socket));
  socket.on("new message", (data)=> {
    console.log(data);
    io.emit("new message", ()=>{
      var mes = new Message(socket.id, data.data, data.time);
      messages.push(mes);
    });
  });
}*/

class AppServer {

  constructor(appDir) {
    console.log("wir sind in constructor AppServer");
    app = express();
    app.use(express.static(appDir));
    //app.use(express.static(path.join("/app", appDir)));
    console.log("wir sind am Ende des constructors AppServer");

  }

  /**
   * Starts server on given port
   * 
   * @param  {Number} port Port to use for serving static files
   */
  start(port) {
    console.log("wir sind in start-Methode von AppServer");
    server=http.createServer(app);
   /* //*this.server.listen(port, function() {
      console.log(
        `AppServer started! Client available at http://localhost:${port}/app`
      );
    });*/
    //io=require('socket.io')(http);
    //*io = new SocketIO.Server(this.server);
   
    
    //Problem: Funktion wird nicht aufgerufen 
    //io = require("socket.io")(this.server);
   
    console.log("Kommen wir hierhin?");
   /* server.listen(port, ()=> {
      console.log(`AppServer started!!! Client available at http://localhost:${port}/app`);
     });
     */
    server.listen(port);
    console.log(
      `AppServer started! Client available at http://localhost:${port}/`
    );
    io=new SocketIO.Server(server);

    console.log("io hier"+io);
    io.on("connection", function(socket) { 
      connections.push(socket);
      console.log("socket is "+socket.id+connections.length);
      //socket.on("message", onClientMessage.bind(socket));
      socket.on("new message", (data)=> {
        console.log(data);
        socket.emit("new message", ()=>{
          var mes = new Message(socket.id, data.data, data.time);
          messages.push(mes);
        });
      });

    });
    console.log("wir sind am Ende der start-Methode von AppServer");

  }
  

   /* process(){
      io.sockets.on("connection", function(socket){
        connections.push(socket);
        socket.join("app");
        console.log("Anzahl von connections angebunden"+connections.length +socket.id);
        this.chatProcess(socket);
      });
    }

    //HIER CHAT ANPASSEN
    chatProcess(socket){
      socket.on("new message", (data)=> {
        console.log(data);
        io.sockets.in("app").emit("new message", ()=>{
          var mes = new Message(socket.id, data.data, data.time);
          messages.push(mes);
        });
      
      });
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

export default AppServer; 
//module.exports=AppServer;