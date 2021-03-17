/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-env node */
import * as SocketIO from "socket.io";
import express from "express";
import http from "http";
import {Observable, Event} from "../utils/Observable.js";

var app, server, io,
    //users = [], 
    connections = [], given_room, userroomes={};

/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

class AppServer {
  
    constructor(appDir, libDir, utilsDir) {
        app = express();
        // Static serving client code
        app.use("/:room", express.static(appDir));
        // Static serving client libraries
        app.use("/libs", express.static(libDir));
        app.use("/utils", express.static(utilsDir));
        
    }

    start(port) {
       /* app.get("/:room", function(req, res) {
          given_room = req.params.room;
          console.log("given_room "+given_room);
          res.sendFile(__dirname + "/index.html");
        });*/
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
            socket.on("roomId", (roomLink)=>{
              socket.given_room=roomLink;
              userroomes[socket.id]=given_room;
              
              console.log("userroomes "+userroomes+"userroomes[given_room]"+userroomes[socket.id]);
              console.log("socket is " + socket.id + " connections.length "+connections.length);
              console.log("givenroom sieht so aus! "+socket.given_room);
              socket.join(socket.given_room);
            });
            //CHAT
            socket.on("send message", (data)=> { //Server erwartet von irgendwelchem Client das event "send message"
              console.log("data socket on is "+data + data.userName +data.message);
              // Server schickt unter dem event "new message" an alle anderern Clients das frueher empfangene event 
              io.sockets.in(socket.given_room).emit("new message", { 
                  userName: data.userName, 
                  timeStamp: Date.now(),
                  message: data.message});                
            });
            socket.on("disconnect", ()=>{
              connections.splice(connections.indexOf(socket), 1);
              console.log(socket.id +" disconnected from server");
              socket.leave(socket.given_room);
            }); 
            
            //VIDEO STEUERUNG
            //Hier starten wir den Player, egal um welche Zeit
            socket.on("starting player", (receivedVideoTime)=>{
              console.log("starting play event gefangen"+receivedVideoTime);
              io.sockets.in(socket.given_room).emit("just play", {videoTime: receivedVideoTime});
              console.log("okay, videoEl abgesendet");
            });

            //Hier pausieren wir den Player, egal um welche Zeit
            socket.on("stopping player", (receivedVideoTime)=>{
              io.sockets.in(socket.given_room).emit("just stop", {videoTime: receivedVideoTime});
            });

            //Hier lauschen wir auf Aenderungen des Videorsrc, wenn ein Video aus PlayList ausgewaehlt wird
            socket.on("change video from playlist", (newSrcFromChangedVideo)=>{
              console.log("appserver faengt newSrcFromChangedVideo "+newSrcFromChangedVideo);
              io.sockets.in(socket.given_room).emit("change video with new src", newSrcFromChangedVideo);
            });

            socket.on("add new URL", (newURLForPlayList)=>{
              console.log("newURL received by server from client"+newURLForPlayList);
              io.sockets.in(socket.given_room).emit("new URL for PlayList", newURLForPlayList);
            });

            socket.on("sending sync info", (data)=>{
              console.log("SERVER time "+data.time+" currsrc "+data.currentSrc);
              io.sockets.in(socket.given_room).emit("synchronized info", data);
            });

            socket.on("sending new list", (myList)=>{
              console.log("JSON.stringify(myList)) HERE "+myList);
              var parsedData=JSON.parse(myList);
              console.log("parsedData.length"+parsedData.length);
              for(var i=0; i<parsedData.length; i++){
                  console.log("parsedData[i].sources "+parsedData[i].sources+" parsedData[i].thumbnail "+parsedData[i].thumbnail[0].src+
                  " parsedData[i].sources.src "+parsedData[i].sources[0].src);
              }
            //  io.sockets.in(socket.given_room).emit("shuffled list", JSON.stringify(myList));
            io.sockets.in(socket.given_room).emit("shuffled list", myList);
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
