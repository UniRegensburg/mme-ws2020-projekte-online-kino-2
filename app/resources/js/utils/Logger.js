/* eslint-env browser */

/**
 * This module contains a simple Logger for JavaScript web application. Logging can be controlled by switching through 
 * different log levels and using matching log functions. If enabled, each log message will contain the name and line number 
 * of the calling function. All messages are printed using console.log().
 * 
 * # Demo output
 * 
 * 16:02:10 | [DEBUG] | Starting Client App (from init, in index.js@17)
 * 
 * # Log Level
 * 
 * OFF (default): No output
 * MESSAGE: Only Logger.message will produce output
 * ERROR: Only Logger.message and Logger.error will produce output
 * DEBUG: Logger.message, Logger.error, and Logger.debug will produce output
 * 
 * # Usage
 * 
 * - Add this file to your project
 * - Import Module, e.g. import Logger from "./path/to/Logger.js";
 * - Set log level at suitable place (for example on startup): e.g. Logger.setLevel(Logger.DEBUG)
 * - Use Logger.message, Logger.error, and Logger.debug to create logs 
 * - Use Logger.enableCallerInformation and Logger.disableCallerInformation to enable or disable information on calling function (default: disable)
 */

const LEVEL_OFF = Symbol("OFF"),
    LEVEL_MESSAGE = Symbol("MESSAGE"),
    LEVEL_ERROR = Symbol("ERROR"),
    LEVEL_DEBUG = Symbol("DEBUG"),
    SYMBOLS = [LEVEL_OFF, LEVEL_MESSAGE, LEVEL_ERROR, LEVEL_DEBUG];

var printCallerFunction = false;

function getFormatedTimestamp() {
    return new Date(Date.now()).toLocaleString(navigator.languages[0], { hour: "numeric", minute: "numeric", second: "numeric" });
}

function getCaller() {
    // Creates a default Error object to access stack trace for current function
    let errorForCallTracing = new Error(),
        // Stack contains a string with one line for each function call in stack trace
        // Stack trace should be ordered like this: getCaller <- log <- Logger.message|Logger.error|Logger.debug <- [external Caller]
        relevantStacktraceLine = errorForCallTracing.stack.split("\n")[3];
    return {
        // first part of trace line contains function name
        callerFunction: relevantStacktraceLine.split("@")[0],
        // file name and line number can be found at the end of each trace line
        callerFile: relevantStacktraceLine.substring(relevantStacktraceLine.lastIndexOf("/") + 1).split(":")[0],
        callerLine: relevantStacktraceLine.substring(relevantStacktraceLine.lastIndexOf("/") + 1).split(":")[1],
    };
}

function log(currentLevel, targetLevel, msg) {
    let currentLevelIndex = SYMBOLS.indexOf(currentLevel),
        targetLevelIndex = SYMBOLS.indexOf(targetLevel),
        timestamp,
        caller;
    if (targetLevelIndex > currentLevelIndex) {
        return;
    }
    timestamp = getFormatedTimestamp();
    caller = getCaller();
    /* eslint-disable no-console */
    if (printCallerFunction === true) {
        console.log(`${timestamp} | [${targetLevel.description}] | ${msg} (from ${caller.callerFunction}, in ${caller.callerFile}@${caller.callerLine})`);
    } else {
        console.log(`[${targetLevel.description}] | ${msg}`);
    }
    /* eslint-enable no-console */
}

class Logger {

    constructor() {
        this.level = LEVEL_MESSAGE;
    }

    message(msg) {
        log(this.level, LEVEL_MESSAGE, msg);
    }

    error(msg) {
        log(this.level, LEVEL_ERROR, msg);
    }

    debug(msg) {
        log(this.level, LEVEL_DEBUG, msg);
    }

    enableCallerInformation() {
        printCallerFunction = true;
    }

    disableCallerInformation() {
        printCallerFunction = false;
    }

    setLevel(level) {
        if (!SYMBOLS.includes(level)) {
            return;
        }
        this.level = level;
    }

}

Logger.prototype.OFF = LEVEL_OFF;
Logger.prototype.MESSAGE = LEVEL_MESSAGE;
Logger.prototype.ERROR = LEVEL_ERROR;
Logger.prototype.DEBUG = LEVEL_DEBUG;

export default new Logger();