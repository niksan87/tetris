type TypeFn<T> = ( args?: any ) => T;

type Constructor<T extends object = object> = ( new ( ...args: any[] ) => T );

type Point = {
    x: number;
    y: number;
};

type Dictionary<T> = {
    [index: string]: T;
}