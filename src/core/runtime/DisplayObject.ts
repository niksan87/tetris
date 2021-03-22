import * as PIXI from 'pixi.js';

export abstract class DisplayObject extends PIXI.DisplayObject { }

PIXI.DisplayObject.prototype.update = function<T extends DisplayObjectProps>( props: T ): void {

    name( this, props.name );
    alpha( this, props.alpha );
    buttonMode( this, props.buttonMode );
    interactive( this, props.interactive );
    x( this, props.x ?? ( props.position && ( typeof props.position === 'number' ? props.position : props.position.x ) ) );
    y( this, props.y ?? ( props.position && ( typeof props.position === 'number' ? props.position : props.position.y ) ) );
    pivot( this, props.pivot );
    scale( this, props.scale );
    
};
 
function name( instance: DisplayObject, value: string ): void {
    
    if( value !== instance.name ) {
        instance.name = value;
    }
    
}

function alpha( instance: DisplayObject, value = instance.alpha ): void {

    if( value !== instance.alpha ) {
        instance.alpha = value;
    }

}

function buttonMode( instance: DisplayObject, value = instance.buttonMode ): void {

    if( value !== instance.buttonMode ) {
        instance.buttonMode = value;
    }
    
}

function interactive( instance: DisplayObject, value = instance.interactive ): void {
    
    if( value !== instance.interactive ) {
        instance.interactive = value;
    }

}

function pivot( instance: DisplayObject, value: Point | number = instance.pivot ): void {

    const shouldUpdate = typeof value === 'number'
        ? instance.pivot.x !== value || instance.pivot.y !== value 
        : instance.pivot.x !== value.x || instance.pivot.y !== value.y;

    if( shouldUpdate ) {
        const newValue = typeof value === 'number' ? [ value, value ] : [ value.x, value.y ];
        instance.pivot.set( ...newValue );
    }

}

function x( instance: DisplayObject, value = instance.x ): void {
    
    if( value !== instance.x ) {
        instance.x = value;
    }
    
}

function y( instance: DisplayObject, value = instance.y ): void {
    
    if( value !== instance.y ) {
        instance.y = value;
    }

}

function scale( instance: DisplayObject, value: Point | number = instance.scale ): void {

    const shouldUpdate = typeof value === 'number'
        ? instance.scale.x !== value || instance.scale.y !== value 
        : instance.scale.x !== value.x || instance.scale.y !== value.y;

    if( shouldUpdate ) {
        const newValue = typeof value === 'number' ? [ value, value ] : [ value.x, value.y ];
        instance.scale.set( ...newValue );
    }
    
}