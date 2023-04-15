"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const https_1 = require("https");
const path_1 = require("path");
const unzipper_1 = require("unzipper");
// Only run for Windows
if (process.platform != 'win32')
    process.exit();
/* Download DU.zip */
const zipUrl = 'https://download.sysinternals.com/files/DU.zip';
const exePath = (0, path_1.join)(__dirname, '..', 'bin', 'du.exe');
console.info(`Downloading 'du' for your system from '${zipUrl}'...`);
(0, https_1.get)(zipUrl, (res) => {
    if (res.statusCode != 200) {
        console.error(`Error while downloading '${zipUrl}'`);
        process.exit(1);
    }
    if (!fs.existsSync((0, path_1.dirname)(exePath))) {
        fs.mkdirSync((0, path_1.dirname)(exePath));
    }
    res.pipe((0, unzipper_1.ParseOne)(/du\.exe/))
        .pipe(fs.createWriteStream(exePath))
        .on('close', () => {
        console.info(`Successfully downloaded 'du'!`);
    });
});
//# sourceMappingURL=prepublish.npm.js.map