import { Engine, Graphics } from '@core';
import { BOARD_STATE } from '@modules';

export function Tile( { type, row, col, color, x, y, id }: TileProps ): FunctionComponent {

    const size = BOARD_STATE.tileSize;
    
    return (
        <Graphics
            name={`${id}_row_${row}_col_${col}`}
            draw={{ type: 'rect', x: ( x || 0 ) + size * col, y: ( y || 0 ) + size * row, width: size, height: size }}
            fill={{ color, alpha: type + 0.1 }}
            lineStyle={{ color: 0xffffff, width: 1, alpha: 0.05, alignment: 1 }}
        />
    );
    
}