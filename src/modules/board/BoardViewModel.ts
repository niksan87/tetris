import { Engine, EventManager, Injector, InteractionManager, ViewModel } from '@core';
import { BOARD_STATE, TETROMINOS, COLORS, MAIN_EVENTS } from '@modules';

@Injector.register( {
    group: 'viewModels',
    singleton: true
} )
export class BoardViewModel extends ViewModel<BoardState> {

    private tetrominoCounter: number;
    private dropInterval: number;
    private currentLines: number;

    protected initState(): BoardState {
        return BOARD_STATE;
    }

    protected onInit(): void {
        this.setTileSize();
        EventManager.on( MAIN_EVENTS.START_GAME, () => this.onStartGame() );
    }

    private onStartGame(): void {
        this.tetrominoCounter = 0;
        this.state.level = 0;
        this.state.points = 0;
        InteractionManager.clear();
        InteractionManager.onKeyDown( 'left', () => this.onLeft() );
        InteractionManager.onKeyDown( 'right', () => this.onRight()  );
        InteractionManager.onKeyDown( 'up', () => this.onUp()  );
        InteractionManager.onKeyDown( 'down', () => this.onDown()  );
        this.createBoard();
        this.createTetromino();
        this.createNextTetromino();
        this.updateTetromino();
        this.startDropInterval();
    }

    protected setTileSize(): void {
        this.state.tileSize = Engine.height() / this.state.rows;
    }

    private createBoard(): void {
        this.state.board = [ ...Array( BOARD_STATE.rows ).keys() ]
            .map( row => [ ...Array( BOARD_STATE.columns ).keys() ]
                .map( col => ( { col, row, type: 0, state: 'transient' } ) )
            );
    }

    private getRandomTetrominoShape(): number[][] {
        return Object.values( TETROMINOS )[Math.floor( Math.random() * Object.keys( TETROMINOS ).length )];
    }

    private getRandomColor(): number {
        const keys = Object.keys( COLORS );
        const color = COLORS[keys[ keys.length * Math.random() << 0]];
        return color === COLORS.BLACK ? this.getRandomColor() : color;
    }

    private getTetromino(): TetrominoProps {
        return {
            shape: this.getRandomTetrominoShape(),
            color: this.getRandomColor(),
            x: BOARD_STATE.columns / 2,
            y: 0
        };
    }

    private getNextLevelIntervalTime(): number {
        const time = 1000 - ( this.state.level * 100 );
        return time < 100 ? 100 : time;
    }

    private startDropInterval(): void {
        this.dropInterval = setInterval( () => this.onDown(), this.getNextLevelIntervalTime() );
    }

    private clearDropInterval(): void {
        clearInterval( this.dropInterval );
    }

    private createTetromino(): void {
        this.state.tetromino = this.state.nextTetromino || this.getTetromino();
    }

    private createNextTetromino(): void {
        this.state.nextTetromino = this.getTetromino();        
    }

    private updateTetromino(): void {
        this.state.tetromino.shape.forEach( ( row, rowIndex ) => {
            row.forEach( ( col, colIndex ) => {
                if( col === 1 ) {
                    const tile = this.state.board[this.state.tetromino.y + rowIndex][this.state.tetromino.x + colIndex];
                    tile.type = col;
                    tile.color = this.state.tetromino.color;
                }
            } );
        } );
    }

    private updateDropSpeed(): void {
        if( this.tetrominoCounter % 5 === 0 ) {
            this.state.level++;
            this.tetrominoCounter = 0;
        }
    }

    private rotateTetromino( direction = 1 ): void {
        const rotated = this.state.tetromino.shape.map( ( _, index ) => this.state.tetromino.shape.map( col => col[index] ) );
        
        this.state.tetromino.shape = direction > 0 
            ? rotated.map( row => row.reverse() )
            : rotated.reverse();
    }

    private freezeTetromino(): void {
        this.state.board.forEach( el => el.forEach( tile => {
            if( tile.type === 1 && tile.state === 'transient' ) {
                tile.state = 'permanent';
            }
        } ) );
    }

    private updateBoardState(): void {
        this.state.board.forEach( el => el.forEach( tile => {
            if( tile.state === 'transient' ) {
                tile.type = 0;
                tile.color = COLORS.BLACK;
            }
        } ) );
    }

    private updateRowsPositions( index: number ): void {
        for ( let i = 1; i <= index; i++ ) {
            this.state.board[i] = this.state.board[i].map( tile => {
                tile.row++;
                return tile;
            } );
        }
    }

    private updatePoints(): void {
        if( this.currentLines == 1 ) {
            this.state.points += 100;
        } else if ( this.currentLines === 2 ) {
            this.state.points += 200;
        } else if ( this.currentLines === 3 ) {
            this.state.points += 400;
        } else if ( this.currentLines >= 4 ) {
            this.state.points += 800;
        }
    }

    private updateLines(): void {
        this.state.lines += this.currentLines;
        this.currentLines = 0;
    }

    private destroyRows(): void {
        this.currentLines = 0;
        this.state.board.forEach( ( el, index ) => {
            if( !el.some( ( tile ) => tile.type === 0 ) ) {
                this.currentLines++;
                this.state.board.splice( index, 1 );
                this.state.board.unshift( [ ...Array( BOARD_STATE.columns ).keys() ].map( col => ( { col, row: 0, type: 0, state: 'transient' } ) ) );
                this.updateRowsPositions( index );
            }
        } );

    }

    private onRight(): void {

        if( this.checkCollision( 1, 0 ) ) {
            return;
        }

        this.state.tetromino.x++;
        this.updateBoardState();
        this.updateTetromino();
        Engine.render();
    }

    private onLeft(): void {

        if( this.checkCollision( -1, 0 ) ) {
            return;
        }

        this.state.tetromino.x--;
        this.updateBoardState();
        this.updateTetromino();
        Engine.render();
    }

    private onUp(): void {

        this.rotateTetromino();

        let initialX = this.state.tetromino.x;
        let offset = 1;

        while( this.checkCollision( 0,0 ) ) {
            this.state.tetromino.x += offset;
            offset = -( offset + ( offset > 0 ? 1 : -1 ) );
            if( offset > this.state.tetromino.shape.length ) {
                this.rotateTetromino( -1 );
                this.state.tetromino.x = initialX;
            } 
        }

        this.updateBoardState();
        this.updateTetromino();

        Engine.render();

    }

    private gameOver(): void {
        this.clearDropInterval();
        InteractionManager.clear();
        EventManager.run( MAIN_EVENTS.GAME_OVER );
    }

    private isGameOver(): boolean {
        let output = false;
        this.state.tetromino.shape.forEach( row  => {
            row.forEach( ( col, colIndex ) => {
                if( this.state.board[this.state.nextTetromino!.shape.length][this.state.nextTetromino!.x + colIndex]?.type === 1 ) {
                    output = true;
                }
            } );
        } );

        return output;
    }

    private onDown(): void {
        
        this.clearDropInterval();

        if( this.checkCollision( 0, 1 ) ) {

            if( this.isGameOver() ) {
                this.gameOver();
            } else {
                this.tetrominoCounter++;
                this.state.tetromino.y++;
                this.freezeTetromino();
                this.destroyRows();
                this.createTetromino();
                this.createNextTetromino();
                this.updateTetromino();
                this.updateDropSpeed();
                this.updatePoints();
                this.updateLines();
            }
            
        } else {
            this.state.tetromino.y++;
            this.updateBoardState();
            this.updateTetromino();
        }
        
        this.startDropInterval();
        
        Engine.render();
    }

    private checkCollision( stepX: number, stepY: number ): boolean {

        for ( let y = 0; y < this.state.tetromino.shape.length; y++ ) {
            for ( let x = 0; x < this.state.tetromino.shape[y].length; x++ ) {
                if( this.state.tetromino.shape[y][x] === 1 ) {
                    const newY = y + this.state.tetromino.y + stepY;
                    const newX = x + this.state.tetromino.x + stepX;
                    const hasNextRow = Boolean( BOARD_STATE.board[newY] );
                    const hasNextColumn = Boolean( BOARD_STATE.board[newY]?.[newX] );
                    const nextIsOccupied = Boolean( BOARD_STATE.board[newY]?.[newX]?.state === 'permanent' );                    
                    if( !hasNextColumn || !hasNextRow || nextIsOccupied ) {
                        return true;
                    }
                }
            }
        }

        return false;

    }

}