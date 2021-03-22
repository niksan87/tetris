import * as PIXI from 'pixi.js';
import { Injector } from '@core';

@Injector.register( {
    group: 'components',
    singleton: false
} )
export class Sprite extends PIXI.Sprite {
    
    public constructor( props: SpriteProps ) {
        super( PIXI.Texture.EMPTY );
        this.update( props );
    }
}

PIXI.Sprite.prototype.update = function<T extends SpriteProps>( props: T ): void {

    PIXI.Container.prototype.update.call( this, props );
    anchor( this, props.anchor );

};

function anchor( instance: Sprite, value: Point | number = { x: 0, y: 0 } ): void {
    
    const shouldUpdate = typeof value === 'number'
        ? instance.anchor.x !== value || instance.anchor.y !== value 
        : instance.anchor.x !== value.x || instance.anchor.y !== value.y;

    if( shouldUpdate ) {
        const newValue = typeof value === 'number' ? [ value, value ] : [ value.x, value.y ];
        instance.anchor.set( ...newValue );
    }

}