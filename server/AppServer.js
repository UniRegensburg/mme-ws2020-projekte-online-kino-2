/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-env node */
import GenerateRoom from "../app/resources/startscreen_rep/GenerateRoom.js";
import animals from "animals";
import * as SocketIO from "socket.io";
import express from "express";
import http from "http";
import {Observable, Event} from "../utils/Observable.js";

var app, server, io,
    users = [], animalNames=[],
    connections = [], given_room, userroomes={}, newGiven_room;

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
        var roomLinksArray=GenerateRoom.getRoomLinksArray();
        console.log("roomLinksArray "+roomLinksArray);
        
        const middleware = (req, res, next) => {
          console.log("HIERMAL:" +req.params.room);
          next();
      };
      
      app.get('/:room', middleware, (req, res, next) => {
          newGiven_room = req.params.room; 
          //console.log("HIERE!!! "+newGiven_room+" GenerateRoom.getArray "+GenerateRoom.getLinkArray());
            if(newGiven_room==="iuliia" || newGiven_room==="app"){
              res.status(404).send("Fehler 404! Keine Verbindung");
            }
            else{
              next();
            }
          });       
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
        //  var randomAnimal=animals();
        //  if(animalNames.includes(randomAnimal)){
        //    socket.username=randomAnimal;
        //    animalNames.push(socket.username);
        //  }
          socket.username=animals();
          socket.on("roomId", (roomLink)=>{
              socket.given_room=roomLink;
              userroomes[socket.id]=socket.given_room;
              console.log("userroomes "+userroomes+" userroomes[socket.id] "+userroomes[socket.id]);
              console.log("socket is " + socket.id);
              console.log("givenroom sieht so aus! "+socket.given_room);
              socket.join(socket.given_room);
              console.log("io.sockets.adapter.rooms all "+io.sockets.adapter.rooms.get(socket.given_room).size);
            });
            
            //CHAT
            socket.on("send message", (data)=> { //Server erwartet von irgendwelchem Client das event "send message"
              console.log("data socket on is "+data + data.userName +data.message);
              io.sockets.in(socket.given_room).emit("new message", { 
                  userName: data.userName, 
                  savedUserName: socket.username,
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
              io.sockets.in(socket.given_room).emit("altered list", myList);
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
