import { Engine } from '@core';
import { Main, MainViewModel, BoardViewModel } from '@modules';

window.onload = () => Engine.create( {
    name: 'Tetris app',
    width: 800,
    height: 800,
    view: Main,
    viewModels: [
        MainViewModel,
        BoardViewModel,
    ],
    fitToScreen: true
} );