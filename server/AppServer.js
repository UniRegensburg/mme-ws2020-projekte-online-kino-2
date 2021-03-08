/* eslint-env node */
import * as SocketIO from "socket.io";
import Message from "../app/resources/js/Message.js";
//import path from "path";
import express from "express";
import http from "http"; //const http=require("http"); ist in Node.js implementiert
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
    constructor(appDir, libDir) {
        app = express();
        // Static serving client code
        app.use("/app", express.static(appDir));
        // Static serving client libraries
        app.use("/libs", express.static(libDir));
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
        io.on("connection", function(socket) {
            connections.push(socket);
            console.log("socket is " + socket.id + connections.length);
            //socket.on("message", onClientMessage.bind(socket));
            socket.on("new message", (data) => {
                console.log(data);
                //server io schickt an alle angebundenen
                //Sockets event "new message"
                io.sockets.emit("new message", () => {
                    var mes = new Message(data.from, data.data, data.time);
                    messages.push(mes);
                });
            });

        });
        //  console.log("wir sind am Ende der start-Methode von AppServer");
        /*app.listen(port, ()=> {
          console.log(`AppServer started!!! Client available at http://localhost:${port}/app`);
         });*/
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