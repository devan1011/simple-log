import type { Log, LogMessage } from "./log";

type LogCss = (
  current: LogMessage,
  next: LogMessage | undefined,
  prev: LogMessage | undefined,
) => string;

type LogDefaults = (log: Log) => Log;

export class LogConfig {
  public static environment: string = process.env.NODE_ENV || 'development';

  private static _defaults: Record<string, LogDefaults> = {};

  private static _css: LogCss = (
    current: LogMessage,
    next:    LogMessage | undefined,
    prev:    LogMessage | undefined,
  ) => `
    ${current.color ? 'text-shadow: 0px 1px 1px #0004, 0px 2px 8px #0002;' : ''}
    padding: 1px ${current.payload.length ? '6px' : '0px'};
    font-size: 12px;
    line-height: 16px;
    border-top-left-radius: ${prev?.color ? '0' : '4px'};
    border-bottom-left-radius: ${prev?.color ? '0' : '4px'};
    border-top-right-radius: ${next?.color ? '0' : '4px'};
    border-bottom-right-radius: ${next?.color ? '0' : '4px'};
    color: ${current.color ? '#fff' : 'inherit'};
    background-color: ${current.color};
  `;

  public static css(callback: LogCss) {
    this._css = callback;
  }

  public static getCss(...args: Parameters<LogCss>) {
    return LogConfig._css(...args);
  }

  public static defaults(): LogDefaults;
  public static defaults(tag: string): LogDefaults;
  public static defaults(defaults: LogDefaults): LogDefaults;
  public static defaults(tag: string, defaults: LogDefaults): LogDefaults;
  public static defaults(...args: (string | LogDefaults | undefined)[]): LogDefaults {  
    const tag = typeof args[0] === 'string' ? args[0] : '*';
    const func = typeof args[0] === 'function'
     ? args[0] : typeof args[1] === 'function'
     ? args[1] : undefined;

    if (func) {
      this._defaults[tag] = func;
    }   

    return (log: Log) => {
      if (this._defaults[tag] instanceof Function) {
        this._defaults[tag](log);
      }

      return log;
    }
  }
}
