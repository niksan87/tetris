declare namespace PIXI {

    interface Graphics {
        draw: ( props: GraphicsProps ) => void;
        drawn?: DrawProps;
        filled?: FillProps;
        lineStyled?: LineStyleProps;
    }

}

type GraphicsProps = {
    geometry?: PIXI.GraphicsGeometry;
    draw?: DrawProps;
    fill?: FillProps;
    lineStyle?: LineStyleProps;
    lineTextureStyle?: LineTextureStyle;
} & ContainerProps;

type DrawProps = DrawRectProps;

type DrawRectProps = {
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
}

type FillProps = {
    color?: number;
    alpha?: number;
}

type LineStyleProps = {
    width?: number;
    color?: number;
    alpha?: number;
    alignment?: number;
    native?: boolean;
}