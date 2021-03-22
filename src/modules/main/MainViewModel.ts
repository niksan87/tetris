import { Injector, ViewModel, InteractionManager, EventManager, Engine } from '@core';
import { MAIN_STATE, MAIN_EVENTS } from '@modules';

@Injector.register( {
    group: 'viewModels',
    singleton: true
} )
export class MainViewModel extends ViewModel<MainState> {

    protected initState(): MainState {
        return MAIN_STATE;
    }

    protected onInit(): void {
        InteractionManager.onClick( 'button', () => this.onClick() );
        EventManager.on( MAIN_EVENTS.GAME_OVER, () => this.onGameOver() );
    }

    private onClick(): void {
        this.state.init = false;
        this.state.gameOver = false;
        this.state.game = true;
        EventManager.run( MAIN_EVENTS.START_GAME );
        Engine.render();
    }

    private onGameOver(): void {
        this.state.gameOver = true;
        InteractionManager.onClick( 'button', () => this.onClick() );
        Engine.render();
    }
}