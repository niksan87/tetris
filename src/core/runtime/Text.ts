import * as PIXI from 'pixi.js';
import { Injector } from '@core';

@Injector.register( {
    group: 'components',
    singleton: false
} )
export class Text extends PIXI.Text {
    
    public constructor( props: TextProps ) {
        super( 'default text' );
        this.update( props );
    }
}

PIXI.Text.prototype.update = function<T extends TextProps>( props: T ): void {

    PIXI.Sprite.prototype.update.call( this, props );

    text( this, props.text );
    align( this, props.align );
    fill( this, props.fill );
    fontSize( this, props.fontSize );
    fontWeight( this, props.fontWeight );

};

function text( instance: Text, value = 'default text' ): void {

    if( value !== instance.text ) {
        instance.text = value;
    }

}

function align( instance: Text, value = 'left' ): void {

    if( value !== instance.style.align ) {
        instance.style.align = value;
    }

}

function fill( instance: Text, value: string | string[] | number | number[] | CanvasGradient | CanvasPattern = 'black' ): void {

    if( value !== instance.style.fill ) {
        instance.style.fill = value;
    }

}

function fontSize( instance: Text, value: number | string = 26 ): void {

    if( value !== instance.style.fontSize ) {
        instance.style.fontSize = value;
    }

}

function fontWeight( instance: Text, value = 'normal' ): void {

    if( value !== instance.style.fontWeight ) {
        instance.style.fontWeight = value;
    }

}