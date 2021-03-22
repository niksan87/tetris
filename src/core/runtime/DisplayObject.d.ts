declare namespace PIXI {

    interface DisplayObject {
        update: <T extends DisplayObjectProps>( props: T ) => void;
    }

}

type DisplayObjectProps = {
    name: string;
    alpha?: number;
    buttonMode?: boolean;
    interactive?: boolean;
    pivot?: Point | number;
    position?: Point | number;
    scale?: Point | number;
    x?: number;
    y?: number;
}