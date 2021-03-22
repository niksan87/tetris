type TileProps = {
    id?: string;
    col: number;
    row: number;
    type: number;
    state: 'transient' | 'permanent';
    color?: number;
    x?: number;
    y?: number;
}