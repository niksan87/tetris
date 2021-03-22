export const BOARD_STATE: BoardState = {
    columns: 14,
    rows: 20,
    board: [],
    tileSize: 0,
    tetromino: {
        x: 0,
        y: 0,
        shape: [],
        color: 0
    },
    level: 0,
    points: 0,
    lines: 0,
};

export const COLORS = {
    PURPLE: 0xCC00CC,
    YELLOW: 0xFFFF00,
    GREEN: 0x00FF00,
    RED: 0xFF0000,
    BLUE: 0x0000AA,
    CYAN: 0x00FFFF,
    ORANGE: 0xFF7700,
    BLACK: 0x000000
};

export const TETROMINOS = {
    'I': [
        [ 0, 1, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 1, 0, 0 ]
    ],
    'L': [
        [ 0, 1, 0 ],
        [ 0, 1, 0 ],
        [ 0, 1, 1 ],
    ],
    'J': [
        [ 0, 1, 0 ],
        [ 0, 1, 0 ],
        [ 1, 1, 0 ],
    ],
    'S': [
        [ 0, 1, 1 ],
        [ 1, 1, 0 ],
        [ 0, 0, 0 ],
    ],
    'Z': [
        [ 1, 1, 0 ],
        [ 0, 1, 1 ],
        [ 0, 0, 0 ],
    ],
    'T': [
        [ 0, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 1, 0 ],
    ],
    'O': [
        [ 1, 1 ],
        [ 1, 1 ]
    ]
};