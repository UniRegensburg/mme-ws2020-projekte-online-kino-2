/* eslint-env node */
/* eslint no-console: 0 */

import fs from "fs";

/** 
 * Build File 
 *
 * Implementieren Sie hier alle (automatisierten) Schritte, die notwendig sind, um Ihre Anwendung
 * vor der Veröffentlichung zu testen und zu "bauen". Das könnte z.B. das Zusammenfügen von Javascript-Dateien 
 * oder die Optimierung von Ressourcen-Dateien sein.
 *
 * Diese Datei wird beim Aufrufen des `build`-Tasks (npm) automatisch ausgeführt.
 */

function build() {
    // Implementiere Sie hier die einzelnen Bauschritte
    console.log("Building \"Online Kino\"");
    publishClientLibraries();
}

/**
 * Kopiert die via NPM heruntergeladenen Client-Libraries in einen separaten Ordner (/libs) der über den Express-Server als static route 
 * zugänglich gemacht wird, damit die entsprechenden Dateien vom Client geladen werden können.
 */
function publishClientLibraries() {
    console.log("Copying get-video-id library");
    fs.mkdirSync("libs/get-video-id/", { recursive: true });
    fs.copyFileSync("node_modules/get-video-id/dist/get-video-id.js", "libs/get-video-id/get-video-id.js");
    fs.copyFileSync("node_modules/get-video-id/dist/get-video-id.min.js", "libs/get-video-id/get-video-id.min.js");
    fs.copyFileSync("node_modules/get-video-id/dist/get-video-id.js.map", "libs/get-video-id/get-video-id.js.map");
    fs.copyFileSync("node_modules/get-video-id/dist/get-video-id.min.js.map", "libs/get-video-id/get-video-id.min.js.map");
    console.log("Copying video.js library");
    fs.mkdirSync("libs/video-js/", { recursive: true });
    fs.copyFileSync("node_modules/video.js/dist/video-js.css", "libs/video-js/video-js.css");
    fs.copyFileSync("node_modules/video.js/dist/video-js.min.css", "libs/video-js/video-js.min.css");
    fs.copyFileSync("node_modules/video.js/dist/video.js", "libs/video-js/video.js");
    fs.copyFileSync("node_modules/video.js/dist/video.min.js", "libs/video-js/video.min.js");
    fs.mkdirSync("libs/videojs-youtube/", { recursive: true });
    fs.copyFileSync("node_modules/videojs-youtube/dist/Youtube.js", "libs/videojs-youtube/Youtube.js");
    fs.copyFileSync("node_modules/videojs-youtube/dist/Youtube.min.js", "libs/videojs-youtube/Youtube.min.js");

    console.log("Copying socket.io library");
    fs.mkdirSync("libs/socketio/", { recursive: true });
    fs.copyFileSync("node_modules/socket.io/client-dist/socket.io.js", "libs/socketio/socket.io.js");
    fs.copyFileSync("node_modules/socket.io/client-dist/socket.io.min.js", "libs/socketio/socket.io.min.js");
    fs.copyFileSync("node_modules/socket.io/dist/index.js", "libs/socketio/index.js");
    fs.copyFileSync("node_modules/socket.io/dist/socket.js", "libs/socketio/socket.js");
    fs.copyFileSync("node_modules/socket.io/dist/client.js", "libs/socketio/client.js");

    console.log("Copying videojs-playlist library");
    fs.mkdirSync("libs/videojs-playlist/", { recursive: true });
    fs.copyFileSync("node_modules/videojs-playlist/dist/videojs-playlist.js", "libs/videojs-playlist/videojs-playlist.js");
    fs.copyFileSync("node_modules/videojs-playlist/dist/videojs-playlist.es.js", "libs/videojs-playlist/videojs-playlist.es.js");
    fs.copyFileSync("node_modules/videojs-playlist/dist/videojs-playlist.cjs.js", "libs/videojs-playlist/videojs-playlist.cjs.js");
    fs.copyFileSync("node_modules/videojs-playlist/dist/videojs-playlist.min.js", "libs/videojs-playlist/videojs-playlist.min.js");

    console.log("Copying videojs-playlist-ui library");
    fs.mkdirSync("libs/videojs-playlist-ui/", { recursive: true });
    fs.copyFileSync("node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.js", "libs/videojs-playlist-ui/videojs-playlist-ui.js");
    fs.copyFileSync("node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.min.js", "libs/videojs-playlist-ui/videojs-playlist-ui.min.js");
    fs.copyFileSync("node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css", "libs/videojs-playlist-ui/videojs-playlist-ui.vertical.css");
    fs.copyFileSync("node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.css", "libs/videojs-playlist-ui/videojs-playlist-ui.css");

}

build();