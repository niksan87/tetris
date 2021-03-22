import * as PIXI from 'pixi.js';
import { Injector, stall } from '@core';

@Injector.register( {
    group: 'components',
    singleton: false
} )
export class Container extends PIXI.Container {

    public constructor( props: ContainerProps ) {
        super();
        this.update( props );
    }

}

PIXI.Container.prototype.removeChildrenRecursively = function(): void {

    this?.children?.forEach( ( child?: Container | PIXI.DisplayObject ) => {

        if( ( child as Container )?.children?.length > 0 ) {
            ( child as Container )?.removeChildrenRecursively();
        }

        this.removeChildren();

    } );
    
};

PIXI.Container.prototype.update = function<T extends ContainerProps>( props: T ): void {

    PIXI.DisplayObject.prototype.update.call( this, props );

    width( this, props );
    height( this, props );
    
};

async function width( instance: Container, props: ContainerProps ) {
    
    await stall( 0 );

    const value = props.width ?? instance.width;

    if( value !== instance.width && !props.scale ) {
        instance.width = value;
    }

}

async function height( instance: Container, props: ContainerProps ) {
    
    await stall( 0 );

    const value = props.height ?? instance.height;
    
    if( value !== instance.height && !props.scale ) {
        instance.height = value;
    }

}