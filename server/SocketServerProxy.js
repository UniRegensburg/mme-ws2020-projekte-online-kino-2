/* eslint-env node */

import * as SocketIO from "socket.io";
import Message from "../shared/com/Message.js";

var io,
    connections,
    messages;

function onConnect(socket) {
    connections.push(socket);
    console.log("socket is " + socket.id + connections.length);
    socket.on(Message.NEW_MESSAGE, onNewMessageFromClient);
}

function onNewMessageFromClient(data) {
    console.log(data);
    //server io schickt an alle angebundenen
    //Sockets event "new message"
    io.sockets.emit("new message", () => {
        var mes = new Message(Message.NEW_MESSAGE, data.data, data.time);
        messages.push(mes);
    });
}


class SocketServerProxy {

    start(server) {
        connections = [];
        messages = [];
        io = new SocketIO.Server(server);
        io.on("connection", onConnect);
    }

}

export default SocketServerProxy;