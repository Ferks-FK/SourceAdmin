export enum Size {
    Default,
    Small,
    Large,
}

export enum Variant {
    Primary,
    Secondary,
}

export const Options = { Size, Variant };

export type ButtonProps = JSX.IntrinsicElements['input'] & {
    size?: Size;
    variant?: Variant;
};
