# Simple Log Js
<a href="https://www.npmjs.com/package/@devanjs/log">
  <img src="https://img.shields.io/npm/v/@devanjs/log">
<a>

Simple to use chainable browser logger, with some extra handy utilities.

## Installation
```sh
$ npm i --save @devanjs/log
```

## Usage
### Basic
```js
import { Log } from "@devanjs/log";

Log.info('Standard Console.info');
Log.warn('Standard Console.warn');
Log.error('Standard Console.error');
```
![image](https://user-images.githubusercontent.com/29194430/121779680-c1166200-cb94-11eb-8f71-6a8a60f25016.png)


### Colors
```js
import { Log } from "@devanjs/log";

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
Log.amber('Amber').info();
Log.orange('Orange').info();
Log.deepOrange('Deep Orange').info();
```
![image](https://user-images.githubusercontent.com/29194430/121779588-6846c980-cb94-11eb-9109-3b7b7f74462d.png)

### Chainable
Fully chainable structure.
```js
import { Log } from "@devanjs/log";

/**
 * All methods are chainable, with each chain ending in:
 * .info(...)
 * .warn(...)
 * .error(...)
 */
Log.red('Red').info('FooBar');
Log.red('Red').green('Green').blue('Blue').info();
Log.red('Red').text('FooBar').green('Green').blue('Blue').info();
Log.red('Red').space().green('Green').blue('Blue').info();
```
![image](https://user-images.githubusercontent.com/29194430/121779643-9fb57600-cb94-11eb-994d-42163228e141.png)

### Groups
Support for console groups, while still maintaining chains and colors.
```js
import { Log } from "@devanjs/log";

/**
 * Automatic grouping using callback contents.
 */
Log.green('Green').group('Group', () => {
  Log.info('Automatic group');
});

/**
 * Manual grouping without using the callback.
 * (Requires groupEnd to be called)
 */
Log.blue('Blue').group('Group');
Log.info('Manual Group');
Log.groupEnd();
```
![image](https://user-images.githubusercontent.com/29194430/121779655-ab08a180-cb94-11eb-900c-d0918931965b.png)

### Defaults
Allows logs to be changed globally to avoid repeated calls in each use case. For example ifDevelopment, can be applied globally instead of being on every
log.
```js
import { Log } from "@devanjs/log";

/**
 * Global defaults to apply to all non tagged logs.
 */
LogConfig.defaults((log) => log.ifDevelopment().blue('Dev Only'));

Log.info('Global Default');

/**
 * Global defaults to apply to all tagged logs with same name.
 */
LogConfig.defaults('foobar', (log) => {
  return log
    .if(true)
    .red('Foobar');
});

Log.tag('foobar').info('Tag Default');
```
![image](https://user-images.githubusercontent.com/29194430/121779670-b78cfa00-cb94-11eb-81ce-070b4b1a14fb.png)

### Taps
Simple value wrapper that logs and returns input for easy logging of
values in large chains or call stacks.
```js
import { Log } from "@devanjs/log";

const foo = () => 'Hello There!';
const bar = (v: string) => v === 'Hello There!';

/**
 * Basic Taps
 */
bar(Log.tap(foo()));
bar(Log.red('Tap').tap(foo()));

/**
 * With custom callback
 */
bar(Log.tap(foo(), (v) => Log.red('Tap').info(v)));
```

## Contributing
Uses UID and GID to avoid permissions issues
```
$ export UID
$ export GID
```

Npm
```
$ docker-compose run node npm <command>
```

Dev Server
```
$ docker-compose up
```
