import { Log, LogConfig } from "../src";

Log.teal('Simple').lime('log').info();


Log.info();

Log.info('Standard Console.info');
Log.warn('Standard Console.warn');
Log.error('Standard Console.error');

Log.info();

Log.red('Red').info();
Log.pink('Pink').info();
Log.purple('Purple').info();
Log.deepPurple('Deep Purple').info();
Log.indigo('Indigo').info();
Log.blue('Blue').info();
Log.lightBlue('Light Blue').info();
Log.cyan('Cyan').info();
Log.teal('Teal').info();
Log.green('Green').info();
Log.lightGreen('Light Green').info();
Log.lime('Lime').info();
Log.yellow('Yellow').info();
Log.orange('Orange').info();
Log.deepOrange('Deep Orange').info();

Log.info();

Log.red('Red').info('FooBar');
Log.red('Red').green('Green').blue('Blue').info();
Log.red('Red').text('FooBar').green('Green').blue('Blue').info();
Log.red('Red').space().green('Green').blue('Blue').info();

Log.info();

Log.group('Group', () => {
  Log.info('Standard Group');
});

Log.info();

Log.green('Green').group('Group', () => {
  Log.info('Automatic group');
});

Log.info();

Log.blue('Blue').group('Group');
Log.info('Manual Group');
Log.groupEnd();

Log.info();

const foo = () => 'Hello There!';
const bar = (v) => v === 'Hello There!';

const result = bar(Log.tap(foo(), (v) => Log.red('Tap').info(v)));
bar(Log.red('Red').tap(foo()));

Log.info(result.toString());

Log.info();

LogConfig.defaults((log) => log.ifDevelopment().blue('Dev Only'));

Log.info('Global Default');

LogConfig.defaults('foobar', (log) => {
  return log
    .if(true)
    .red('Foobar');
});

Log.tag('foobar').info('Tag Default');
