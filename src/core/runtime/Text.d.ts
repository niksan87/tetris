type TextProps = {
    text?: string;
    align?: 'left' | 'center' | 'right';
    fill?: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
} & SpriteProps;