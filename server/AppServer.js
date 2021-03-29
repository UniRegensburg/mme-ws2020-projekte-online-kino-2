
/* eslint-disable quotes */
/* eslint-disable camelcase */
/* eslint-disable vars-on-top */
/* eslint-env node */
import animals from "animals";
import * as SocketIO from "socket.io";
import express from "express";
import http from "http";

var app, server, io,
  connections = [],
  userroomes = {},
  roomLinks = [];

//http://localhost:5500/app/
class AppServer {

  constructor(appDir, libDir, utilsDir, port) {
    app = express();
    server = http.createServer(app);
    server.listen(process.env.PORT || port);
    app.use("/app", express.static(appDir));
    app.use("/libs", express.static(libDir));
    app.use("/utils", express.static(utilsDir));
  }

  start() {
    io = new SocketIO.Server(server);
    //created server register connected sockets
    io.sockets.on("connection", function (socket) {

      socket.username = animals();
      socket.on("entering room", (roomLink) => {
        if (roomLinks.includes(roomLink)) {
          socket.given_room = roomLink;
          userroomes[socket.id] = socket.given_room;
          socket.join(socket.given_room);
          socket.emit("roomlink correct", {
            ifCorrect: true});
        } else {
          socket.emit("roomlink correct", {
            ifCorrect: false});
        }
      });

      //functionality concerning room link generation
      socket.on("creating room link", () => {
        var roomId = Math.random().toString(36).substr(2, 12);
        //save endings from links
        roomLinks.push(roomId);
        socket.emit("created room link", roomId);
      });

      //functionalities concerning message chat
      socket.on("send message", (data) => {
        io.sockets.in(socket.given_room).emit("new message", {
          savedUserName: socket.username,
          timeStamp: Date.now(),
          message: data.message});
      });
      
      socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.leave(socket.given_room);
      });

      //functionalities concerning video controlling

      //Start player
      socket.on("starting player", (receivedVideoTime) => {
        io.sockets.in(socket.given_room).emit("just play", {
          videoTime: receivedVideoTime});
      });

      //Pause player
      socket.on("stopping player", (receivedVideoTime) => {
        io.sockets.in(socket.given_room).emit("just stop", {
          videoTime: receivedVideoTime});
      });

      //Choose video from playlist
      socket.on("change video from playlist", (newSrcFromChangedVideo) => {
        io.sockets.in(socket.given_room).emit("change video with new src", newSrcFromChangedVideo);
      });

      //Add new YouTube-URL for playlist
      socket.on("add new URL", (newURLForPlayList) => {
        io.sockets.in(socket.given_room).emit("new URL for PlayList", newURLForPlayList);
      });

      //Sync time and video-src of video-element for all clients
      socket.on("sending sync info", (data) => {
        io.sockets.in(socket.given_room).emit("synchronized info", data);
      });

      //Sync the whole playlist for all clients
      socket.on("sending new list", (myList) => {
        io.sockets.in(socket.given_room).emit("altered list", myList);
      });
    });
  }
  // Stops running express server
  stop() {
    if (server === undefined) {
      return;
    }
    server.close();
  }
}

export default AppServer;