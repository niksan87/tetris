import * as PIXI from 'pixi.js';
import { Injector, DeepEqual } from '@core';

@Injector.register( {
    group: 'components',
    singleton: false
} )
export class Graphics extends PIXI.Graphics {

    public constructor( props: GraphicsProps ) {
        super( props?.geometry );
        this.update( props );
    }

}

PIXI.Graphics.prototype.update = function<T extends GraphicsProps>( props: T ): void {

    const redraw = !(
        DeepEqual( props.draw, this.drawn )
        && DeepEqual( props.fill, this.filled )
        && DeepEqual( props.lineStyle, this.lineStyled )
    );
        
    if ( redraw ) {
        this.clear();
        this.draw( props );
    }

    PIXI.Container.prototype.update.call( this, props );
        
};

PIXI.Graphics.prototype.draw = function( { fill, lineStyle, draw }: GraphicsProps ): void {

    this.drawn = draw;
    this.filled = fill;
    this.lineStyled = lineStyle;

    if( fill ) {
        this.beginFill( fill?.color, fill?.alpha );
    }

    if( lineStyle ) {
        this.lineStyle( lineStyle?.width, lineStyle?.color, lineStyle?.alpha, lineStyle?.alignment, lineStyle?.native );
    }

    switch ( draw?.type ) {
        case 'rect':
            this.drawRect( draw.x, draw.y, draw.width, draw.height );                
            break;
        default:
            break;
    }

    this.endFill();

};