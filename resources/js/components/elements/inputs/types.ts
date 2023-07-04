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

export type InputProps = JSX.IntrinsicElements['input'] & {
    size?: Size
    variant?: Variant
};

export interface InputSearchProps extends InputProps {
    searchQuery: string
    minChars: number
}
