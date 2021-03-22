export const EventManager = { on, run };

function on( event: TetrisEvent, handler: TypeFn<unknown> ): void {
    window.addEventListener( event, handler );
}

function run( event: TetrisEvent ) {
    window.dispatchEvent( new Event( event ) );
}