"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogConfig = void 0;
class LogConfig {
    static css(callback) {
        this._css = callback;
    }
    static getCss(...args) {
        return LogConfig._css(...args);
    }
    static defaults(...args) {
        const tag = typeof args[0] === 'string' ? args[0] : '*';
        const func = typeof args[0] === 'function'
            ? args[0] : typeof args[1] === 'function'
            ? args[1] : undefined;
        if (func) {
            this._defaults[tag] = func;
        }
        return (log) => {
            if (this._defaults[tag] instanceof Function) {
                this._defaults[tag](log);
            }
            return log;
        };
    }
}
exports.LogConfig = LogConfig;
LogConfig.environment = process.env.NODE_ENV || 'development';
LogConfig._defaults = {};
LogConfig._css = (current, next, prev) => `
    ${current.color ? 'text-shadow: 0px 1px 1px #0004, 0px 2px 8px #0002;' : ''}
    padding: 2px ${current.payload.length ? '6px' : '0px'};
    margin: -1px 0 0 0;
    border-top-left-radius: ${(prev === null || prev === void 0 ? void 0 : prev.color) ? '0' : '4px'};
    border-bottom-left-radius: ${(prev === null || prev === void 0 ? void 0 : prev.color) ? '0' : '4px'};
    border-top-right-radius: ${(next === null || next === void 0 ? void 0 : next.color) ? '0' : '4px'};
    border-bottom-right-radius: ${(next === null || next === void 0 ? void 0 : next.color) ? '0' : '4px'};
    color: ${current.color ? '#fff' : '#222'};
    background-color: ${current.color};
  `;
