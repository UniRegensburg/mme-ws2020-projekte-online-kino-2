/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-env node */
import * as SocketIO from "socket.io";
import Message from "../app/resources/js/Message.js";
//import path from "path";
import express from "express";
//import {createServer} from "http"; //const http=require("http"); ist in Node.js implementiert
//import {Server} from "socket.io";
import http from "http";


//const path=require("path");
//const express=require("express");
//var bodyParser = require("body-parser");
//const http = require("http");
//var Message=require("./app/resources/js/Message.js");
var app, server, io,
    //users = [], 
    connections = [],
    messages = [];


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
  
    constructor(appDir, libDir, utilsDir) {
        app = express();
        // Static serving client code
        app.use("/app", express.static(appDir));
        
        // Static serving client libraries
        app.use("/libs", express.static(libDir));
        app.use("/utils", express.static(utilsDir));
    }

    start(port) {

        console.log("wir sind in start-Methode von AppServer");
        server = http.createServer(app);
        console.log("Kommen wir hierhin?");
        server.listen(port);
        console.log(
            `AppServer started! Client available at http://localhost:${port}/app`
        );
        io = new SocketIO.Server(server);
        console.log("io hier" + io);

        io.sockets.on("connection", function(socket) { //der erstellte Server registriert angebundene Sockets
            connections.push(socket);
            console.log("socket is " + socket.id + connections.length);
            socket.join("app");
            //CHAT
            socket.on("send message", (data)=> { //Server erwartet von irgendwelchem Client das event "send message"
              console.log("data socket on is "+data + data.userName +data.message);
              // Server schickt unter dem event "new message" an alle anderern Clients das frueher empfangene event 
              io.sockets.in("app").emit("new message", { 
                  userName: data.userName, 
                  timeStamp: Date.now(),
                  message: data.message});
                console.log("mes is "+mes);
                var mes=new Message(data.userName, data.message, Date.now());
                messages.push(mes);
                console.log("mesagges length is "+messages.length);

            });
            socket.on("disconnect", ()=>{
              connections.splice(connections.indexOf(socket), 1);
              console.log(socket.id +" disconnected from server");
            }); 
            
            //VIDEO STEUERUNG
            //Hier starten wir den Player, egal um welche Zeit
            socket.on("starting player", (receivedVideoTime)=>{
              console.log("starting play event gefangen"+receivedVideoTime);
              io.sockets.in("app").emit("just play", {videoTime: receivedVideoTime});
              console.log("okay, videoEl abgesendet");
            });

            //Hier pausieren wir den Player, egal um welche Zeit
            socket.on("stopping player", (receivedVideoTime)=>{
              io.sockets.in("app").emit("just stop", {videoTime: receivedVideoTime});
            });
        });
    }
    /**   
     * Stops running express server 
     */
        stop() {
        if (server === undefined) {
            return;
    }
        server.close();
        console.log("server closed");
    }
  }

export default AppServer;
