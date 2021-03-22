import { Text, Graphics, Engine, Container } from '@core';
import { Board, Button, Tile, MAIN_STATE, BOARD_STATE } from '@modules';

export function Main(): FunctionComponent {

    const engineWidth = Engine.width();
    const engineHeight = Engine.height();
    
    return (
        <fragment>
            {
                MAIN_STATE.init && (
                    <fragment>
                        <Text
                            name='title'
                            text={'Tetris'.toUpperCase()}
                            fill={0xebebeb}
                            fontWeight={'bold'}
                            fontSize={100}
                            position={{ x: engineWidth / 2, y: engineHeight / 2.5 }}
                            anchor={0.5}
                        />
                        <Button
                            x={engineWidth / 2 - engineWidth / 8}
                            y={engineHeight / 2}
                            width={engineWidth / 4}
                            height={engineHeight / 10}
                            text='Start game'
                        />
                    </fragment>
                )
            }
            { 
                MAIN_STATE.game && (
                    <fragment>
                        <Board />
                        <Text
                            name='level'
                            text={`Level: ${BOARD_STATE.level}`}
                            fill={0xffffff}
                            align='center'
                            position={{
                                x: ( engineWidth - ( BOARD_STATE.columns * BOARD_STATE.tileSize ) ) / 2 + BOARD_STATE.columns * BOARD_STATE.tileSize,
                                y: 100
                            }}
                            anchor={{ x:0.5, y: 0 }}
                        />
                        <Text
                            name='lines'
                            text={`Lines: ${BOARD_STATE.lines}`}
                            fill={0xffffff}
                            align='center'
                            position={{
                                x: ( engineWidth - ( BOARD_STATE.columns * BOARD_STATE.tileSize ) ) / 2 + BOARD_STATE.columns * BOARD_STATE.tileSize,
                                y: 200
                            }}
                            anchor={{ x:0.5, y: 0 }}
                        />
                        <Text
                            name='points'
                            text={`Points: ${BOARD_STATE.points}`}
                            fill={0xffffff}
                            align='center'
                            position={{
                                x: ( engineWidth - ( BOARD_STATE.columns * BOARD_STATE.tileSize ) ) / 2 + BOARD_STATE.columns * BOARD_STATE.tileSize,
                                y: 300
                            }}
                            anchor={{ x:0.5, y: 0 }}
                        />
                        <Text
                            name='next-text'
                            text={'Next:'}
                            fill={0xffffff}
                            align='center'
                            position={{
                                x: ( engineWidth - ( BOARD_STATE.columns * BOARD_STATE.tileSize ) ) / 2 + BOARD_STATE.columns * BOARD_STATE.tileSize,
                                y: 400
                            }}
                            anchor={{ x:0.5, y: 0 }}
                        />
                        {
                            BOARD_STATE.nextTetromino?.shape.map( ( row, rowIndex ) => row.map( ( col, colIndex ) => {
                                return col &&
                                <Tile
                                    id='preview'
                                    type={1}
                                    col={colIndex}
                                    row={rowIndex}
                                    state={'permanent'}
                                    color={BOARD_STATE.nextTetromino?.color}
                                    x={( engineWidth - ( BOARD_STATE.columns * BOARD_STATE.tileSize ) ) / 2 + BOARD_STATE.columns * BOARD_STATE.tileSize - BOARD_STATE.nextTetromino!.shape.length / 2 * BOARD_STATE.tileSize}
                                    y={500}
                                />;
                            } ) )
                        }
                    </fragment>
                ) }
            {
                MAIN_STATE.gameOver && (
                    <fragment>
                        <Graphics
                            name='overlay'
                            draw={{ type: 'rect', x: 0, y: 0, width: engineWidth, height: engineHeight }}
                            fill={{ color: 0x000000, alpha: 0.9 }}
                        />
                        <Text
                            name='game-over'
                            text={'Game over!'}
                            fill={0xebebeb}
                            fontWeight={'bold'}
                            fontSize={40}
                            position={{ x: engineWidth / 2, y: engineHeight / 2.5 }}
                            anchor={0.5}
                        />
                        <Button
                            x={engineWidth / 2 - engineWidth / 8}
                            y={engineHeight / 2}
                            width={engineWidth / 4}
                            height={engineHeight / 10}
                            text='Play again'
                        />
                    </fragment>
                )
            }
        </fragment>        
    );
}