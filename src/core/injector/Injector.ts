const registries: RegistryObject = {};
const instances: InstanceObject = {};

export const Injector = { register, unregister, isRegistered, inject, destroy, disable, isCreated, instances, registries };

function register( settings: RegistrySettings ): DecoratorFactory {

    return function( constructor: Constructor ): void {
    
        const id = constructor.name

        if( !instances[settings.group] ) {
            instances[settings.group] = {};
        }
    
        registries[id] = {
            constructor: constructor,
            settings: settings,
            count: 0,
        };
    
    };
    
}

function unregister( constructor: Constructor ): void {
    
    const id = constructor.name
    
    if ( registries[id] ) {
        delete registries[id];
    } else {
        console.warn( `Cannot deregister a registry with id '${id}' because it is not registered.` );
    }
            
}

function inject<T extends object>( constructor: Constructor<T>, id?: string, args?: unknown ): T {
    
    const registryId = constructor.name
    const registry = registries[registryId];

    
    if ( !registry ) {
        throw new Error( `Cannot inject instance of registry '${registryId}' because it is not registered.` );
    }

    if( registry.settings.disabled ) {
        throw new Error( `Cannot inject instance of registry '${registryId}' because it is disabled.` );
    }

    const group = instances[registry.settings.group];

    id = id || constructor.name

    if ( group[id] ) {
        return group[id];
    }

    if ( registry.settings.singleton && registry.count > 0 ) {
        throw new Error( `Cannot inject instance of registry '${registryId}' because it is a singleton and it already exists.` );
    }
    
    registry.count++;
    
    const arrArgs = args ? Array.isArray( args ) ? args : [ args ]: [];
    
    const instance = Reflect.construct( constructor, arrArgs );
        
    group[id] = instance;

    return instance;
    
}

function destroy( constructor: Constructor<object>, id?: string ): void {

    id = id || constructor.name

    const registryId = constructor.name
    const registry = registries[registryId];

    if( !registry ) {
        throw new Error( `Cannot destroy instance with id '${id}' because registry with id '${registryId}' is not registered.` );
    }

    if( !instances[registry.settings.group][id] ) {
        throw new Error( `Cannot destroy instance with id '${id}' because it doesn't exist.` );
    }

    delete instances[registry.settings.group][id];

    registry.count--;
    
}

function isRegistered( constructor: Constructor ): boolean {
    
    return Boolean( registries[constructor.name] );
    
}

function disable( constructor: Constructor ): void {

    const registryId = constructor.name
    const registry = registries[registryId];

    if( !registry ) {
        throw new Error( `Cannot disable registry with id '${registryId}' because it doesn't exist.` );
    }

    registry.settings.disabled = true;
    
}

function isCreated( constructor: Constructor, id?: string ): boolean {
    
    const registryId = constructor.name;
    const registry = registries[registryId];
    id ||= constructor.name
    
    if( !registry ) {
        return false;
    }

    const group = instances[registry.settings.group];

    return Boolean( group[id] );
}