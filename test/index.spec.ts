import { Async, Sync } from '../src';

export class TestSync {
	@Sync()
	testNoParams(limit?: number): void {
		return;
	}

	@Sync({ shouldLogArguments: true })
	testWithArguments(limit?: number): void {
		return;
	}

	@Sync({ title: 'SyncCustomTitle' })
	testCustomTitle(limit?: number): void {
		return;
	}

	@Sync({ logger: console })
	testCustomLogger(limit?: number): void {
		return;
	}

	@Sync()
	testThrow(limit?: number): void {
		throw 'Error';
	}
}

export class TestAsync {
	@Async()
	async testNoParams(limit?: number): Promise<void> {
		return;
	}

	@Async({ shouldLogArguments: true })
	async testWithArguments(limit?: number): Promise<void> {
		return;
	}

	@Async({ title: 'AsyncCustomTitle' })
	async testCustomTitle(limit?: number): Promise<void> {
		return;
	}

	@Async({ logger: console })
	async testCustomLogger(limit?: number): Promise<void> {
		return;
	}

	@Async()
	async testThrow(limit?: number): Promise<void> {
		throw 'Error';
	}
}

describe('TestSync', () => {
	let test: TestSync;

	beforeEach(() => {
		test = new TestSync();
	});

	it('should run and log default', () => {
		spyOn(console, 'log').and.callThrough();

		test.testNoParams();

		expect(console.log).toHaveBeenCalledWith('TestSync::testNoParams - 0ms - Success', {
			title: 'TestSync::testNoParams',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run and log arguments', () => {
		const arg = 5;

		spyOn(console, 'log').and.callThrough();

		test.testWithArguments(arg);

		expect(console.log).toHaveBeenCalledWith('TestSync::testWithArguments - 0ms - Success', {
			title: 'TestSync::testWithArguments',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: [arg],
		});
	});

	it('should run and log CustomTitle', () => {
		spyOn(console, 'log').and.callThrough();

		test.testCustomTitle();

		expect(console.log).toHaveBeenCalledWith('SyncCustomTitle - 0ms - Success', {
			title: 'SyncCustomTitle',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run and log with given logger', () => {
		spyOn(console, 'log').and.callThrough();

		test.testCustomLogger();

		expect(console.log).toHaveBeenCalledWith('TestSync::testCustomLogger - 0ms - Success', {
			title: 'TestSync::testCustomLogger',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run, log and throw', () => {
		spyOn(console, 'log').and.callThrough();

		try {
			test.testThrow();
		} catch (err) {}

		expect(console.log).toHaveBeenCalledWith('TestSync::testThrow - 0ms - Failure', {
			title: 'TestSync::testThrow',
			executionTime: 0,
			unit: 'ms',
			succeed: false,
			arguments: undefined,
		});
	});
});

describe('TestAsync', () => {
	let test: TestAsync;

	beforeEach(() => {
		test = new TestAsync();
	});

	it('should run and log default', async () => {
		spyOn(console, 'log').and.callThrough();

		await test.testNoParams();

		expect(console.log).toHaveBeenCalledWith('TestAsync::testNoParams - 0ms - Success', {
			title: 'TestAsync::testNoParams',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run and log arguments', async () => {
		const arg = 2;

		spyOn(console, 'log').and.callThrough();

		await test.testWithArguments(arg);

		expect(console.log).toHaveBeenCalledWith('TestAsync::testWithArguments - 0ms - Success', {
			title: 'TestAsync::testWithArguments',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: [arg],
		});
	});

	it('should run and log CustomTitle', async () => {
		spyOn(console, 'log').and.callThrough();

		await test.testCustomTitle();

		expect(console.log).toHaveBeenCalledWith('AsyncCustomTitle - 0ms - Success', {
			title: 'AsyncCustomTitle',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run and log with given logger', async () => {
		spyOn(console, 'log').and.callThrough();

		await test.testCustomLogger();

		expect(console.log).toHaveBeenCalledWith('TestAsync::testCustomLogger - 0ms - Success', {
			title: 'TestAsync::testCustomLogger',
			executionTime: 0,
			unit: 'ms',
			succeed: true,
			arguments: undefined,
		});
	});

	it('should run, log and throw', async () => {
		spyOn(console, 'log').and.callThrough();

		try {
			await test.testThrow();
		} catch (err) {}

		expect(console.log).toHaveBeenCalledWith('TestAsync::testThrow - 0ms - Failure', {
			title: 'TestAsync::testThrow',
			executionTime: 0,
			unit: 'ms',
			succeed: false,
			arguments: undefined,
		});
	});
});
