import { Graphics } from '@core';
import { Tile, BOARD_STATE } from '@modules';

export function Board(): FunctionComponent {

    const { tileSize, columns, rows } = BOARD_STATE;
    
    return (
        <Graphics
            name='board'
            draw={{
                type: 'rect',
                x: 0,
                y: 0,
                width: columns * tileSize,
                height: rows * tileSize
            }}
            fill={{ color: 0x000000 }}
        >            
            { BOARD_STATE.board.map(
                el => el.map( ( { type, col, row, state, color } ) =>
                    type && <Tile id='tile' type={type} col={col} row={row} state={state} color={color} />
                )
            ) }
        </Graphics>
    );

}