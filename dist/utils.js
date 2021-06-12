"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileMessages = void 0;
const logConfig_1 = require("./logConfig");
function compileMessages(messages) {
    let content = '';
    const parts = [];
    messages
        .forEach((message, index) => {
        const next = messages[index + 1];
        const prev = messages[index - 1];
        const style = logConfig_1.LogConfig.getCss(message, next, prev);
        if (!message.payload.length) {
            content += '%c ';
            parts.push(style);
        }
        message
            .payload
            .forEach((payload) => {
            content += '%c';
            parts.push(style);
            switch (typeof payload) {
                case 'string':
                    content += `%s`;
                    parts.push(payload);
                    break;
                case 'object':
                    content += `%o`;
                    parts.push(payload);
                    break;
                case 'number':
                    content += `%f`;
                    parts.push(payload);
                    break;
                default:
            }
        });
    });
    return [content, ...parts];
}
exports.compileMessages = compileMessages;
