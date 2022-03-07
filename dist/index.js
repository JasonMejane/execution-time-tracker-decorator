function Sync(params) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const useHrtime = isInNode();
        descriptor.value = function (...args) {
            const logParameters = {
                title: getTitle(params === null || params === void 0 ? void 0 : params.title, target, propertyKey),
                start: !useHrtime ? getTime() : 0,
                startNs: useHrtime ? getTimeNs() : BigInt(0),
                succeed: true,
                arguments: (params === null || params === void 0 ? void 0 : params.shouldLogArguments) ? args : undefined,
                logger: params === null || params === void 0 ? void 0 : params.logger,
            };
            try {
                const result = originalMethod.apply(this, args);
                logExecutionTime(logParameters);
                return result;
            }
            catch (err) {
                logParameters.succeed = false;
                logExecutionTime(logParameters);
                throw err;
            }
        };
        return descriptor;
    };
}
function Async(params) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const useHrtime = isInNode();
        descriptor.value = async function (...args) {
            const logParameters = {
                title: getTitle(params === null || params === void 0 ? void 0 : params.title, target, propertyKey),
                start: !useHrtime ? getTime() : 0,
                startNs: useHrtime ? getTimeNs() : BigInt(0),
                succeed: true,
                arguments: (params === null || params === void 0 ? void 0 : params.shouldLogArguments) ? args : undefined,
                logger: params === null || params === void 0 ? void 0 : params.logger,
            };
            try {
                const result = await originalMethod.apply(this, args);
                logExecutionTime(logParameters);
                return result;
            }
            catch (err) {
                logParameters.succeed = false;
                logExecutionTime(logParameters);
                throw err;
            }
        };
        return descriptor;
    };
}
function getTime() {
    return new Date().valueOf();
}
function getTimeNs() {
    return process.hrtime.bigint();
}
function getTitle(title, target, propertyKey) {
    return title || `${target instanceof Function ? target.name : target.constructor.name}::${propertyKey}`;
}
function isInNode() {
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof process.hrtime !== 'undefined';
}
function logExecutionTime(logParams) {
    const executionTime = (logParams.start === 0) ? Number(getTimeNs() - logParams.startNs) / 1000 : getTime() - logParams.start;
    (logParams.logger || console).log(`${logParams.title} - ${executionTime}ms - ${logParams.succeed ? 'Success' : 'Failure'}`, {
        title: logParams.title,
        executionTime,
        unit: 'ms',
        succeed: logParams.succeed,
        arguments: logParams.arguments,
    });
}
export { Async, Sync };
