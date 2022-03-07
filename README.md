# execution-time-tracker-decorator

<p style="text-align: center;">
	<b>Measure execution time of your methods both in Node.js and Browser apps.</b>
	<br/>
	<br/>
	<a href="https://github.com/JasonMejane/execution-time-tracker-decorator">
		<img src="https://img.shields.io/github/v/release/JasonMejane/execution-time-tracker-decorator" alt="Release" />
	</a>&nbsp;
	<a href="https://www.npmjs.com/execution-time-tracker-decorator">
    	<img src="https://img.shields.io/npm/v/execution-time-tracker-decorator.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="execution-time-tracker-decorator on npm" />
	</a>&nbsp;
	<span>
		<img src="https://img.shields.io/bundlephobia/min/execution-time-tracker-decorator" alt="Package size" />
	</span>&nbsp;
	<a href="https://github.com/JasonMejane/execution-time-tracker-decorator/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/JasonMejane/execution-time-tracker-decorator" alt="Licence" />
	</a>
	<span>
		<img src="https://img.shields.io/badge/dependencies-0-success" alt="Dependencies" />
	</span>&nbsp;
	<a href="https://github.com/JasonMejane/execution-time-tracker-decorator/issues">
		<img src="https://img.shields.io/github/issues/JasonMejane/execution-time-tracker-decorator" alt="Issues" />
	</a>&nbsp;
	<br/>
	<span>
		<img src="https://github.com/JasonMejane/execution-time-tracker-decorator/actions/workflows/nodejs_ci_master.yml/badge.svg" alt="Node.js CI" />
	</span>&nbsp;
	<span>
		<img src="https://img.shields.io/badge/coverage-93%25-success" alt="Coverage" />
	</span>&nbsp;
</p>

## Install

In terminal, run:
```sh
npm i execution-time-tracker-decorator
```

## Usage

### Import

In your project, import the decorators you need :
```typescript
import { Async, Sync } from 'execution-time-tracker-decorator';
```

### Decorate methods

Two decorators are available:
- `@Sync()` for synchronous methods
- `@Async()` for asynchronous ones.

Examples:
```typescript
class Demo {

    @Sync()
	syncFunction(): number {
		let a = 0;
		for (let i = 0; i < 100; i++) {
			a++;
		}
		return a;
	}

    @Async()
    async asyncFunction(): Promise<string> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('foo');
			}, 300);
		});
	}

}
```


## Options

Both `@Sync()` and `@Async()` accept an optional object parameter which contain options to adapt to your needs. If one or more of these options are not provided, default values will be used.

The available options are:
- `title`: `string` (default = `<ClassName>::<DecoratedMethodName>`), the title string to be logged.
- `shouldLogArguments`: `boolean` (default = `false`), when true, arguments passed to the decorated method will be added to the logs.
- `logger`: `any` (default = `console`), the custom logger to use.

Examples:
```typescript
class Demo {

    @Sync({ title: 'CustomTitle' })
	syncFunctionA(): number {
		let a = 0;
		for (let i = 0; i < 10000000; i++) {
			a++;
		}
		return a;
	}

    @Sync({ shouldLogArguments: true })
	syncFunctionB(param1: number, param2: string): number {
		let a = param;
		for (let i = 0; i < 100; i++) {
			a++;
		}
		return a;
	}

    @Sync()
	syncFunctionThrow(): number {
		let a = 0;
		for (let i = 0; i < 10000000; i++) {
			a++;
		}
		throw a;
	}

    @Async({ logger: this.logger })
	async asyncFunction(): Promise<string> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('bar');
			}, 300);
		});
	}

}
```

Results
```console
syncFunctionA();
'CustomTitle - 8ms - Success', Object{title: 'CustomTitle', executionTime: 8, unit: 'ms', succeed: true, arguments: undefined}

syncFunctionB(5, 'stringParam');
'Demo::syncFunctionB - 1ms - Success', Object{title: 'Demo::syncFunctionB', executionTime: 1, unit: 'ms', succeed: true, arguments: [5, 'stringParam']}

syncFunctionThrow();
'Demo::syncFunctionThrow - 8ms - Failure', Object{title: 'Demo::syncFunctionThrow', executionTime: 8, unit: 'ms', succeed: false, arguments: undefined}
```

When using a custom logger, be sure that `logger.log` can be called, and accept multiple parameters.

Using a custom logger or not, the first parameter that will be passed is the main message (`<Title> - <ExecutionTimeMs> - <Success status>`), the second is an object containing these properties:
```typescript
{
	title: string,
	executionTime: number,
	unit: 'ms',
	succeed: boolean,
	arguments: any[] | undefined,
}
```

## Notes

If decorators are used in a Node.js app, `process.hrtime.bigint()` will be used, resulting in a nanosecond precision execution time value, which will be expressed as milliseconds, i.e. 104136211ns will be logged as 104.1362ms.

Otherwise, `new Date().valueOf()` will be used, which has a millisecond precision.
