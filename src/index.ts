export function ExecTimeSync(params?: ExecutionTimeDecoratorParameters) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
		const originalMethod = descriptor.value;
		const useHrtime = isInNode();

		descriptor.value = function (...args: any[]) {
			const logParameters: ExecutionTimeLogParameters = {
				title: getTitle(params?.title, target, propertyKey),
				start: !useHrtime ? getTime() : 0,
				startNs: useHrtime ? getTimeNs() : BigInt(0),
				succeed: true,
				arguments: params?.shouldLogArguments ? args : undefined,
				loggerMethod: params?.loggerMethod,
			};

			try {
				const result = originalMethod.apply(this, args);
				logExecutionTime(logParameters);
				return result;
			} catch (err) {
				logParameters.succeed = false;
				logExecutionTime(logParameters);
				throw err;
			}
		};
		return descriptor;
	};
}

export function ExecTimeAsync(params?: ExecutionTimeDecoratorParameters) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
		const originalMethod = descriptor.value;
		const useHrtime = isInNode();

		descriptor.value = async function (...args: any[]) {
			const logParameters: ExecutionTimeLogParameters = {
				title: getTitle(params?.title, target, propertyKey),
				start: !useHrtime ? getTime() : 0,
				startNs: useHrtime ? getTimeNs() : BigInt(0),
				succeed: true,
				arguments: params?.shouldLogArguments ? args : undefined,
				loggerMethod: params?.loggerMethod,
			};

			try {
				const result = await originalMethod.apply(this, args);
				logExecutionTime(logParameters);
				return result;
			} catch (err) {
				logParameters.succeed = false;
				logExecutionTime(logParameters);
				throw err;
			}
		};
		return descriptor;
	};
}

export type ExecutionTimeDecoratorParameters = {
	title?: string;
	shouldLogArguments?: boolean;
	loggerMethod?: any;
};

type ExecutionTimeLogParameters = {
	loggerMethod: any;
	title: string;
	start: number;
	startNs: bigint;
	succeed: boolean;
	arguments: any[] | undefined;
};

function getTime(): number {
	return new Date().valueOf();
}

function getTimeNs(): bigint {
	return process.hrtime.bigint();
}

function getTitle(title: string | undefined, target: any, propertyKey: string): string {
	return title || `${target instanceof Function ? target.name : target.constructor.name}::${propertyKey}`;
}

function isInNode(): boolean {
	return typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof process.hrtime !== 'undefined' ;
}

function logExecutionTime(logParams: ExecutionTimeLogParameters): void {
	const executionTime = (logParams.start === 0) ? Number(getTimeNs() - logParams.startNs) / 1000000 : getTime() - logParams.start;
	const logObject = {
		title: logParams.title,
		executionTime,
		unit: 'ms',
		succeed: logParams.succeed,
		arguments: logParams.arguments,
	};

	if (logParams.loggerMethod) {
		logParams.loggerMethod(`${logParams.title} - ${executionTime}ms - ${logParams.succeed ? 'Success' : 'Failure'}`, logObject);
	} else {
		console.log(`${logParams.title} - ${executionTime}ms - ${logParams.succeed ? 'Success' : 'Failure'}`, logObject);
	}
}
