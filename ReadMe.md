# Simple Log Js
Simple to use chainable browser logger, with some extra handy utilities.

## Installation
```sh
$ npm i --save simple-logs-js
```

## Usage
### Basic
```js
import { Log } from "simple-log-js";

Log.info('Standard Console.info');
Log.warn('Standard Console.warn');
Log.error('Standard Console.error');
```

### Colors
```js
import { Log } from "simple-log-js";

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

### Chainable
```js
import { Log } from "simple-log-js";

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

### Groups
```js
import { Log } from "simple-log-js";

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

### Defaults
```js
import { Log } from "simple-log-js";

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