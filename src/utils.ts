import type { LogMessage } from "./log";
import { LogConfig } from "./logConfig";

export function compileMessages(messages: LogMessage[]) {
  let content: string = '';
  const parts: unknown[] = [];

  messages
    .forEach((message, index) => {
      const next = messages[index + 1];
      const prev = messages[index - 1];

      const style = LogConfig.getCss(message, next, prev);

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