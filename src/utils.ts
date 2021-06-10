import type { LogMessage } from "./log";

export function compileMessages(messages: LogMessage[]) {
  let content: string = '';
  const parts: unknown[] = [];

  messages
    .forEach((message, index) => {
      const prevColor = messages[index - 1]?.color || '#fff0';
      const nextColor = messages[index + 1]?.color || '#fff0';

      const hasColor = message.color !== '#fff0';
      const hasContent = message.payload.length > 0;

      const style = `
        ${!hasColor ? '' : 'text-shadow: 0px 0px 6px #0004;'}
        padding: 2px ${hasContent ? '6px' : '0px'};
        margin: -1px 0 0 0;
        border-top-left-radius: ${prevColor === '#fff0' ? '4px' : '0'};
        border-bottom-left-radius: ${prevColor === '#fff0' ? '4px' : '0'};
        border-top-right-radius: ${nextColor === '#fff0' ? '4px' : '0'};
        border-bottom-right-radius: ${nextColor === '#fff0' ? '4px' : '0'};
        color: ${hasColor ? '#fff' : '#222'};
        background-color: ${message.color};
      `;

      if (!hasContent) {
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