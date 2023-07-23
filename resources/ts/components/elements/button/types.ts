import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

export enum Shape {
    Default,
    IconSquare,
}

export enum Size {
    Default,
    Small,
    Large,
}

export enum Variant {
    Primary,
    Secondary,
    Warning,
    Info,
}

export enum iconPosition {
    Right = 'right',
    Left = 'left'
}

export const Options = { Shape, Size, Variant, iconPosition };

export type ButtonProps = JSX.IntrinsicElements['button'] & {
    shape?: Shape;
    size?: Size;
    variant?: Variant;
};

export interface IconButtonProps extends ButtonProps {
    icon: IconDefinition
    iconSize?: SizeProp,
    iconPosition?: iconPosition
}

export interface LinkButtonProps extends ButtonProps {
    to: string,
    linkClassName?: string
  }
