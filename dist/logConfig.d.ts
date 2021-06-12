import type { Log, LogMessage } from "./log";
declare type LogCss = (current: LogMessage, next: LogMessage | undefined, prev: LogMessage | undefined) => string;
declare type LogDefaults = (log: Log) => Log;
export declare class LogConfig {
    static environment: string;
    private static _defaults;
    private static _css;
    static css(callback: LogCss): void;
    static getCss(...args: Parameters<LogCss>): string;
    static defaults(): LogDefaults;
    static defaults(tag: string): LogDefaults;
    static defaults(defaults: LogDefaults): LogDefaults;
    static defaults(tag: string, defaults: LogDefaults): LogDefaults;
}
export {};
