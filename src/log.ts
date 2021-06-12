import { compileMessages } from "./utils";
import { LogConfig } from "./logConfig";

export type LogCondition = boolean | (() => boolean);
export type LogMethod = 'info'|'warn'|'error'|'group'|'groupEnd';
export interface LogMessage {
  color: string | undefined;
  payload: unknown[];
}

export class Log {
  private _tag: string;
  private _color: string | undefined = undefined;

  private messages: LogMessage[] = [];

  private _abort = false;

  constructor(tag?: string) {
    this._tag = tag || '*';

    return LogConfig.defaults(this._tag)(this);
  }

  public static tag(tag: string) {
    return new Log(tag);
  }

  public log(method: LogMethod, ...payload: unknown[]) {
    if (this._abort) return this;

    console[method](...compileMessages([
      ...this.messages,
      {
        color: this._color,
        payload,
      }
    ]));

    return this;
  }

  public info(...payload: unknown[]) {
    return this.log('info', ...payload);
  }

  public warn(...payload: unknown[]) {
    return this.log('warn', ...payload);
  }

  public error(...payload: unknown[]) {
    return this.log('error', ...payload);
  }


  public static log(method: LogMethod, ...payload: unknown[]) {
    return new Log().log(method, ...payload);
  }

  public static info(...payload: unknown[]) {
    return new Log().info(...payload);
  }

  public static warn(...payload: unknown[]) {
    return new Log().warn(...payload);
  }

  public static error(...payload: unknown[]) {
    return new Log().error(...payload);
  }


  public color(color: string, ...payload: unknown[]) {
    if (!payload.length) {
      this._color = color;
    }

    this.messages.push({
      color,
      payload,
    });

    return this;
  }

  public static color(color: string, ...payload: unknown[]) {
    return new Log().color(color, ...payload);
  }

  public red(...payload: unknown[])        { return this.color('#E57373', ...payload); }
  public pink(...payload: unknown[])       { return this.color('#F06292', ...payload); }
  public purple(...payload: unknown[])     { return this.color('#BA68C8', ...payload); }
  public deepPurple(...payload: unknown[]) { return this.color('#9575CD', ...payload); }
  public indigo(...payload: unknown[])     { return this.color('#7986CB', ...payload); }
  public blue(...payload: unknown[])       { return this.color('#64B5F6', ...payload); }
  public lightBlue(...payload: unknown[])  { return this.color('#4FC3F7', ...payload); }
  public cyan(...payload: unknown[])       { return this.color('#4DD0E1', ...payload); }
  public teal(...payload: unknown[])       { return this.color('#4DB6AC', ...payload); }
  public green(...payload: unknown[])      { return this.color('#81C784', ...payload); }
  public lightGreen(...payload: unknown[]) { return this.color('#AED581', ...payload); }
  public lime(...payload: unknown[])       { return this.color('#D4E157', ...payload); }
  public yellow(...payload: unknown[])     { return this.color('#FDD835', ...payload); }
  public orange(...payload: unknown[])     { return this.color('#FFB74D', ...payload); }
  public deepOrange(...payload: unknown[]) { return this.color('#FF8A65', ...payload); }

  public static red(...payload: unknown[])        { return new Log().red(...payload); }
  public static pink(...payload: unknown[])       { return new Log().pink(...payload); }
  public static purple(...payload: unknown[])     { return new Log().purple(...payload); }
  public static deepPurple(...payload: unknown[]) { return new Log().deepPurple(...payload); }
  public static indigo(...payload: unknown[])     { return new Log().indigo(...payload); }
  public static blue(...payload: unknown[])       { return new Log().blue(...payload); }
  public static lightBlue(...payload: unknown[])  { return new Log().lightBlue(...payload); }
  public static cyan(...payload: unknown[])       { return new Log().cyan(...payload); }
  public static teal(...payload: unknown[])       { return new Log().teal(...payload); }
  public static green(...payload: unknown[])      { return new Log().green(...payload); }
  public static lightGreen(...payload: unknown[]) { return new Log().lightGreen(...payload); }
  public static lime(...payload: unknown[])       { return new Log().lime(...payload); }
  public static yellow(...payload: unknown[])     { return new Log().yellow(...payload); }
  public static orange(...payload: unknown[])     { return new Log().orange(...payload); }
  public static deepOrange(...payload: unknown[]) { return new Log().deepOrange(...payload); }

  public text(...payload: unknown[]) {
    this.messages.push({
      color: undefined,
      payload,
    });

    return this;
  }

  public static text(...payload: unknown[]) {
    return new Log().text(...payload);
  }

  public space() { return this.text(); }
  public static space() { return new Log().space(); }

  public group(label?: unknown, callback?: (log: Log) => void) {
    this.log('group', label);

    if (!this._abort && callback) {
      callback(this);
      this.log('groupEnd');
    }

    return this;
  }

  public groupEnd() {
    return this.log('groupEnd');
  }

  public static group(name: unknown, callback?: (log: Log) => void) {
    return new Log().group(name, callback);
  }

  public static groupEnd() {
    return new Log().groupEnd();
  }

  public clear() {
    this._color = undefined;
    this.messages = [];

    return LogConfig.defaults(this._tag)(this);
  }

  public if(condition: LogCondition, override: boolean = false) {
    if (!override && this._abort) return this;

    if (condition instanceof Function) {
      this._abort = !condition();
    } else {
      this._abort = !condition;
    }

    return this;
  }

  public ifProduction() {
    return this.if(LogConfig.environment === 'production');
  }

  public ifStaging() {
    return this.if(LogConfig.environment === 'staging');
  }

  public ifDevelopment() {
    return this.if(LogConfig.environment === 'development');
  }

  public static if(condition: LogCondition) {
    return new Log().if(condition);
  }

  public tap<T>(value: T, tap?: (value: T) => void): T {
    if (tap) {
      tap(value);
    } else {
      this.info(value);
    }

    return value;
  }

  public static tap<T>(value: T, tap?: (value: T) => void): T {
    return new Log().tap(value, tap);
  }
}
