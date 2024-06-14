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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const saveImpl_1 = __importDefault(require("./saveImpl"));
const stateProvider_1 = require("./stateProvider");
const exec_1 = require("@actions/exec");
const utils = __importStar(require("./utils/actionUtils"));
async function run() {
    try {
        await (0, saveImpl_1.default)(new stateProvider_1.StateProvider());
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
async function removeLibrary() {
    try {
        core.info(`Removing folder: ${process.env.GITHUB_WORKSPACE}/Library}`);
        await (0, exec_1.exec)(`rm -rf ${process.env.GITHUB_WORKSPACE}/Library`);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
// Use Promise.all to await the completion of both functions
Promise.all([run(), removeLibrary()])
    .catch((error) => {
    utils.logWarning(error.message);
});
exports.default = run;
