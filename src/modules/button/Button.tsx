import { Engine, Graphics, Text } from '@core';
import { BOARD_STATE } from '@modules';

export function Button( props: ButtonProps ): FunctionComponent {

    return (
        <Graphics
            name='button'
            draw={{ type: 'rect', x: 0, y: 0, width: props.width, height: props.height }}
            fill={{ color: 0xc1c1c1 }}
            interactive
            buttonMode
            x={props.x}
            y={props.y}
        >
            <Text
                name='button-text'
                text={props.text.toUpperCase()}
                pivot={{ x: -props.width / 2, y: -props.height / 2 }}
                anchor={0.5}
                fontWeight='bold'
            />
        </Graphics>
    );

}