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
}

build();