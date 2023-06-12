export enum Position {
    Default,
    Top,
    Center
}

export const Options = { Position }

export type ModalProps = JSX.IntrinsicElements['div'] & {
    position?: Position
}
