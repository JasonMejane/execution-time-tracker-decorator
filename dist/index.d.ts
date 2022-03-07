declare function Sync(params?: ExecutionTimeDecoratorParameters): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
declare function Async(params?: ExecutionTimeDecoratorParameters): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
declare type ExecutionTimeDecoratorParameters = {
    title?: string;
    shouldLogArguments?: boolean;
    logger?: any;
};
export { Async, Sync };
