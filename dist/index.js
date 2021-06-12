"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogConfig = exports.Log = void 0;
const log_1 = require("./log");
Object.defineProperty(exports, "Log", { enumerable: true, get: function () { return log_1.Log; } });
const logConfig_1 = require("./logConfig");
Object.defineProperty(exports, "LogConfig", { enumerable: true, get: function () { return logConfig_1.LogConfig; } });
exports.default = log_1.Log;
