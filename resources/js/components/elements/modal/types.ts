import Record from "react";

export enum Position {
    Top,
    Center
}

export const Options = { Position }

export type ModalProps = JSX.IntrinsicElements['div'] & {
    isVisible: boolean,
    heading?: string,
    onClickCloseBtn: () => void | null,
    onClickBackdrop: () => void | null,
    onPressEscKey: () => void,
    animation?: Record<string, any>,
    backdropAnimation?: Record<string, any>,
    position?: Position
}
