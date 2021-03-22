import { Engine, Container, stall } from '@core';

export const InteractionManager = { register, onClick, onKeyDown, clear };

const components: Dictionary<Container> = {};

function register( instance: Container ): void {
    components[instance.name] = instance;
    onClick( instance.name, () => Engine.render() );
}

async function onClick( id: string, handler: TypeFn<void> ): Promise<void> {

    await stall( 0 );

    if( !components[id] ) {
        throw `Component with id '${id}' doesn't exist.`;
    }

    components[id].on( 'click', () => handler() );
}

let keyHandlers: any[] = [];

function onKeyDown( key: Key, handler: TypeFn<void> ): void {
    
    const keyHandler = ( { keyCode } ) => {
        if( ( keyCode === 37 && key === 'left' )
        || ( keyCode === 39 && key === 'right' )
        || ( keyCode === 38 && key === 'up' )
        || keyCode === 40 && key === 'down' ) {
            handler();
        }
    };

    keyHandlers.push( keyHandler );

    window.addEventListener( 'keydown', keyHandler );
}

function clear(): void {
    keyHandlers.forEach( keyHandler => window.removeEventListener( 'keydown', keyHandler ) );
}