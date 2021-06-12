"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
_1.Log.teal('Simple').lime('log').info();
_1.Log.info();
_1.Log.info('Standard Console.info');
_1.Log.warn('Standard Console.warn');
_1.Log.error('Standard Console.error');
_1.Log.info();
_1.Log.red('Red').info();
_1.Log.pink('Pink').info();
_1.Log.purple('Purple').info();
_1.Log.deepPurple('Deep Purple').info();
_1.Log.indigo('Indigo').info();
_1.Log.blue('Blue').info();
_1.Log.lightBlue('Light Blue').info();
_1.Log.cyan('Cyan').info();
_1.Log.teal('Teal').info();
_1.Log.green('Green').info();
_1.Log.lightGreen('Light Green').info();
_1.Log.lime('Lime').info();
_1.Log.yellow('Yellow').info();
_1.Log.orange('Orange').info();
_1.Log.deepOrange('Deep Orange').info();
_1.Log.info();
_1.Log.red('Red').info('FooBar');
_1.Log.red('Red').green('Green').blue('Blue').info();
_1.Log.red('Red').text('FooBar').green('Green').blue('Blue').info();
_1.Log.red('Red').space().green('Green').blue('Blue').info();
_1.Log.info();
_1.Log.group('Group', () => {
    _1.Log.info('Standard Group');
});
_1.Log.info();
_1.Log.green('Green').group('Group', () => {
    _1.Log.info('Automatic group');
});
_1.Log.info();
_1.Log.blue('Blue').group('Group');
_1.Log.info('Manual Group');
_1.Log.groupEnd();
_1.Log.info();
const foo = () => 'Hello There!';
const bar = (v) => v === 'Hello There!';
const result = bar(_1.Log.tap(foo(), (v) => _1.Log.red('Tap').info(v)));
bar(_1.Log.red('Red').tap(foo()));
_1.Log.info(result.toString());
_1.Log.info();
_1.LogConfig.defaults((log) => log.ifDevelopment().blue('Dev Only'));
_1.Log.info('Global Default');
_1.LogConfig.defaults('foobar', (log) => {
    return log
        .if(true)
        .red('Foobar');
});
_1.Log.tag('foobar').info('Tag Default');
