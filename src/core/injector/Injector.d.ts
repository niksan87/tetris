type RegistrySettings = {
    group: string;
    singleton: boolean;
    disabled?: boolean;
};

type Registry = {
    constructor: Constructor;
    settings: RegistrySettings;
    count: number;
};

type RegistryObject = { [key: string]: Registry; };

type InstanceObject = { [key: string]: object }

type DecoratorFactory = ( constructor: Constructor ) => void;
