
type Config = {
    name: string;
    width: number;
    height: number;
    view: TypeFn<Component>;
    viewModels: Constructor<object>[];
    fitToScreen: boolean;
}

type FunctionType = TypeFn<Component>;

type ClassType = Constructor<PIXI.Container>;

type ComponentType = ClassType | FunctionType | 'fragment';

type FunctionComponent = {
    type: FunctionType;
    props: DisplayObjectProps;
    children: Component[];
}

type ClassComponent = {
    type: ClassType;
    props: DisplayObjectProps;
    children: Component[];
}

type Component = {
    type: ComponentType;
    props: DisplayObjectProps;
    children: Component[];
}

declare const parse: ( type: ComponentType, props: ComponentProps, ...children: ComponentChildren[] ) => Component | Component[];