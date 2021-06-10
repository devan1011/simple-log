import { Log } from "./log";

export default Log;

// console.log(Log);

Log.info('Hello There!');
Log.warn('Hello There!');
Log.error('Hello There!');

Log
  .purple('Mqtt')
  .space()
  .orange('WARN')
  .warn('Looks like something went wrong')
  .info(new Error('Test'))
  .info({ foo: 'bar' });

Log
  .purple('Mqtt')
  .space()
  .red('ERROR')
  .error('Looks like something went wrong');

Log.red('Test').deepOrange('Test').info('Hello There!');
Log.pink('Test').orange('Test').info('Hello There!');
Log.purple('Test').amber('Test').info('Hello There!');
Log.deepPurple('Test').yellow('Test').info('Hello There!');
Log.indigo('Test').lime('Test').info('Hello There!');
Log.blue('Test').lightGreen('Test').info('Hello There!');
Log.lightBlue('Test').green('Test').info('Hello There!');
Log.cyan('Test').teal('Test').info('Hello There!');
Log.teal('Test').cyan('Test').info('Hello There!');
Log.green('Test').lightBlue('Test').info('Hello There!');
Log.lightGreen('Test').blue('Test').info('Hello There!');
Log.lime('Test').indigo('Test').info('Hello There!');
Log.yellow('Test').deepPurple('Test').info('Hello There!');
Log.amber('Test').purple('Test').info('Hello There!');
Log.orange('Test').pink('Test').info('Hello There!');
Log.deepOrange('Test').red('Test').info('Hello There!');

// Log.name('test-log').info('Hello There!');
// Log.if(true).info('Hello There!');

// Log.if(true).red('Red').green('Green').info('Info');
