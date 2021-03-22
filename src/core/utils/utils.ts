import { resolve } from 'path';

export async function stall( time = 0 ): Promise<void> {

    if( time === 0 ) {
        await Promise.resolve();
    } else {
        await new Promise<void>( resolve => setTimeout( () =>  resolve() , time * 1000 ) );
    }
    
}

export function DeepEqual( a, b, ignoreKeys: string[] = [] ) {
    if ( a === b ) {
        return true;
    }

    if ( typeof a != 'object' || typeof b != 'object' || a == null || b == null ) {
        return false;
    }

    let keysA = Object.keys( a ), keysB = Object.keys( b );

    if ( keysA.length != keysB.length ) {
        return false;
    }

    for ( let key of keysA ) {
        if( ignoreKeys.includes( key ) ) {
            continue;
        }
        if ( !keysB.includes( key ) ) {
            return false;
        }

        if ( typeof a[key] === 'function' || typeof b[key] === 'function' ) {
            if ( a[key].toString() != b[key].toString() ) {
                return false;
            }
        } else {
            if ( !DeepEqual( a[key], b[key], ignoreKeys ) ) {
                return false;
            }
        }
    }

    return true;
}

export function DeepCopy<S extends unknown>( object: S ): S {

    const output = {} as S;

    for ( const key in object ) {
        output[key] = typeof object[key] === 'object' ? DeepCopy( object[key] ) : object[key];
    }

    return output;
    
}

export const IsType = <T>( value: unknown, condition: boolean ): value is T => condition;
