declare namespace PIXI {

    interface Container {
        removeChildrenRecursively: () => void;
    }

}

type ContainerProps = {
    width?: number;
    height?: number;
} & DisplayObjectProps