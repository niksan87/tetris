type BoardState = {
    columns: number;
    rows: number;
    board: TileProps[][];
    tileSize: number;
    tetromino: TetrominoProps;
    nextTetromino?: TetrominoProps;
    level: number;
    points: number;
    lines: number;
}

type TetrominoProps = {
    x: number;
    y: number;
    shape: number[][];
    color: number;
}