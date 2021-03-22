import * as PIXI from 'pixi.js';
import { InteractionManager, Injector, Container, IsType } from '@core';
  
export const Engine = { create, parse, render, width, height };

let renderer: PIXI.Renderer;
let ticker: PIXI.Ticker;
let root: PIXI.Container;
let view: TypeFn<Component>;

function create( config: Config ): void {
    document.title = config.name;
    renderer = new PIXI.Renderer( {
        backgroundColor: 0x222222,
        width: config.fitToScreen ? window.innerHeight : config.width,
        height: config.fitToScreen ? window.innerHeight : config.height
    } );
    ticker = new PIXI.Ticker();
    root = new PIXI.Container();
    view = config.view;
    document.body.append( renderer.view );
    ticker.add( () => renderer.render( root ) );
    ticker.start();
    config.viewModels.forEach( viewModel => Injector.inject( viewModel, viewModel.name ) );
    if( config.fitToScreen ) {
        renderer.resize( window.innerHeight, window.innerHeight );
    }
    render();
}

function parse( type: ComponentType, props: DisplayObjectProps, ...children: Component[] ): Component | Component[] | void {
    
    if( type === 'fragment' ) {
        return children;
    }

    if( typeof type === 'string' ) {
        throw `Component can't be of type '${type}'.`;
    }

    return { type, props, children };

}

function render(): void {
    root.removeChildrenRecursively();
    renderComponent( view(), root );
}

function width(): number {
    return renderer.width;
}

function height(): number {
    return renderer.height;
}

function isClassComponent( value: Component ): value is ClassComponent {
    return value.type !== 'fragment' && IsType<ClassComponent>( value, value.type?.prototype instanceof Object.getPrototypeOf( Container ) );
}

function renderClassComponent( { type, props, children }: ClassComponent, parent: Container ): void {

    const isCreated = Injector.isCreated( type, props.name );
    const instance: Container =  Injector.inject( type, props.name, [ props ] );

    if( isCreated ) {
        instance.update( props );
    }
    InteractionManager.register( instance );

    parent.addChild( instance );

    children.forEach( child => renderComponent( child, instance ) );

}

function renderComponent( value: Component | Component[], parent: Container ): void {

    if( !value ) {
        return;
    }

    if( Array.isArray( value ) ) {
        return value.forEach( component => renderComponent( component, parent ) );
    }

    if( value.type === 'fragment' ) {
        return renderComponent( value.children, parent );
    }

    if( isClassComponent( value ) ) {
        return renderClassComponent( value, parent! );
    }

    renderComponent( Reflect.construct( value.type, [ value.props ] ), parent );

}