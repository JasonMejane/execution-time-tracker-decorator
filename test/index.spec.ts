/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { ExecTimeAsync, ExecTimeSync } from '../src';

export class TestSync {
    @ExecTimeSync()
    testNoParams(): void {
        return;
    }

    @ExecTimeSync({ shouldLogArguments: true })
    testWithArguments(limit?: number): void {
        return;
    }

    @ExecTimeSync({ title: 'SyncCustomTitle' })
    testCustomTitle(): void {
        return;
    }

    @ExecTimeSync()
    testThrow(): void {
        throw 'Error';
    }
}

export class TestAsync {
    @ExecTimeAsync()
    async testNoParams(): Promise<void> {
        return;
    }

    @ExecTimeAsync({ shouldLogArguments: true })
    async testWithArguments(limit?: number): Promise<void> {
        return;
    }

    @ExecTimeAsync({ title: 'AsyncCustomTitle' })
    async testCustomTitle(): Promise<void> {
        return;
    }

    @ExecTimeAsync()
    async testThrow(): Promise<void> {
        throw 'Error';
    }
}

describe('TestSync', () => {
    let test: TestSync;

    beforeEach(async () => {
        jasmine.clock().install();
        test = new TestSync();
    });

    afterEach(async () => {
        jasmine.clock().uninstall();
    });

    it('should run and log default', async () => {
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

    it('should run and log arguments', async () => {
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

    it('should run and log CustomTitle', async () => {
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

    it('should run, log and throw', async () => {
        spyOn(console, 'log').and.callThrough();

        try {
            test.testThrow();
        } catch (err) {
            /* empty */
        }

        expect(console.log).toHaveBeenCalledWith('TestSync::testThrow - 0ms - Failure', {
            title: 'TestSync::testThrow',
            executionTime: 0,
            unit: 'ms',
            succeed: false,
            arguments: undefined,
        });
    });
});

describe('TestAsync', async () => {
    let test: TestAsync;

    beforeEach(async () => {
        jasmine.clock().install();
        test = new TestAsync();
    });

    afterEach(async () => {
        jasmine.clock().uninstall();
    });

    it('should run and log default', async () => {
        spyOn(console, 'log').and.callThrough();

        await test.testNoParams();
        jasmine.clock().tick(0);

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
        jasmine.clock().tick(0);

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
        jasmine.clock().tick(0);

        expect(console.log).toHaveBeenCalledWith('AsyncCustomTitle - 0ms - Success', {
            title: 'AsyncCustomTitle',
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
        } catch (err) {
            /* empty */
        }
        jasmine.clock().tick(0);

        expect(console.log).toHaveBeenCalledWith('TestAsync::testThrow - 0ms - Failure', {
            title: 'TestAsync::testThrow',
            executionTime: 0,
            unit: 'ms',
            succeed: false,
            arguments: undefined,
        });
    });
});
