/* eslint-env node */
import AppServer from "./server/AppServer.js";
var appServer;
const PORT = 5500;

function init() {
    appServer = new AppServer("app", "libs", "utils", PORT);
    appServer.start();
}
init();
