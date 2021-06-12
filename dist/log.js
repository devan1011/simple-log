"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const utils_1 = require("./utils");
const logConfig_1 = require("./logConfig");
class Log {
    constructor(tag) {
        this._color = undefined;
        this.messages = [];
        this._abort = false;
        this._tag = tag || '*';
        return logConfig_1.LogConfig.defaults(this._tag)(this);
    }
    static tag(tag) {
        return new Log(tag);
    }
    log(method, ...payload) {
        if (this._abort)
            return this;
        console[method](...utils_1.compileMessages([
            ...this.messages,
            {
                color: this._color,
                payload,
            }
        ]));
        return this;
    }
    info(...payload) {
        return this.log('info', ...payload);
    }
    warn(...payload) {
        return this.log('warn', ...payload);
    }
    error(...payload) {
        return this.log('error', ...payload);
    }
    static log(method, ...payload) {
        return new Log().log(method, ...payload);
    }
    static info(...payload) {
        return new Log().info(...payload);
    }
    static warn(...payload) {
        return new Log().warn(...payload);
    }
    static error(...payload) {
        return new Log().error(...payload);
    }
    color(color, ...payload) {
        if (!payload.length) {
            this._color = color;
        }
        this.messages.push({
            color,
            payload,
        });
        return this;
    }
    static color(color, ...payload) {
        return new Log().color(color, ...payload);
    }
    red(...payload) { return this.color('#E57373', ...payload); }
    pink(...payload) { return this.color('#F06292', ...payload); }
    purple(...payload) { return this.color('#BA68C8', ...payload); }
    deepPurple(...payload) { return this.color('#9575CD', ...payload); }
    indigo(...payload) { return this.color('#7986CB', ...payload); }
    blue(...payload) { return this.color('#64B5F6', ...payload); }
    lightBlue(...payload) { return this.color('#4FC3F7', ...payload); }
    cyan(...payload) { return this.color('#4DD0E1', ...payload); }
    teal(...payload) { return this.color('#4DB6AC', ...payload); }
    green(...payload) { return this.color('#81C784', ...payload); }
    lightGreen(...payload) { return this.color('#AED581', ...payload); }
    lime(...payload) { return this.color('#D4E157', ...payload); }
    yellow(...payload) { return this.color('#FDD835', ...payload); }
    orange(...payload) { return this.color('#FFB74D', ...payload); }
    deepOrange(...payload) { return this.color('#FF8A65', ...payload); }
    static red(...payload) { return new Log().red(...payload); }
    static pink(...payload) { return new Log().pink(...payload); }
    static purple(...payload) { return new Log().purple(...payload); }
    static deepPurple(...payload) { return new Log().deepPurple(...payload); }
    static indigo(...payload) { return new Log().indigo(...payload); }
    static blue(...payload) { return new Log().blue(...payload); }
    static lightBlue(...payload) { return new Log().lightBlue(...payload); }
    static cyan(...payload) { return new Log().cyan(...payload); }
    static teal(...payload) { return new Log().teal(...payload); }
    static green(...payload) { return new Log().green(...payload); }
    static lightGreen(...payload) { return new Log().lightGreen(...payload); }
    static lime(...payload) { return new Log().lime(...payload); }
    static yellow(...payload) { return new Log().yellow(...payload); }
    static orange(...payload) { return new Log().orange(...payload); }
    static deepOrange(...payload) { return new Log().deepOrange(...payload); }
    text(...payload) {
        this.messages.push({
            color: undefined,
            payload,
        });
        return this;
    }
    static text(...payload) {
        return new Log().text(...payload);
    }
    space() { return this.text(); }
    static space() { return new Log().space(); }
    group(label, callback) {
        this.log('group', label);
        if (!this._abort && callback) {
            callback(this);
            this.log('groupEnd');
        }
        return this;
    }
    groupEnd() {
        return this.log('groupEnd');
    }
    static group(name, callback) {
        return new Log().group(name, callback);
    }
    static groupEnd() {
        return new Log().groupEnd();
    }
    clear() {
        this._color = undefined;
        this.messages = [];
        return logConfig_1.LogConfig.defaults(this._tag)(this);
    }
    if(condition, override = false) {
        if (!override && this._abort)
            return this;
        if (condition instanceof Function) {
            this._abort = !condition();
        }
        else {
            this._abort = !condition;
        }
        return this;
    }
    ifProduction() {
        return this.if(logConfig_1.LogConfig.environment === 'production');
    }
    ifStaging() {
        return this.if(logConfig_1.LogConfig.environment === 'staging');
    }
    ifDevelopment() {
        return this.if(logConfig_1.LogConfig.environment === 'development');
    }
    static if(condition) {
        return new Log().if(condition);
    }
}
exports.Log = Log;
