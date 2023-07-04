import Record from "react";

export enum Position {
    Top,
    Center
}

export const Options = { Position }

export type ModalProps = JSX.IntrinsicElements['div'] & {
    isVisible: boolean,
    heading?: string,
    onClickCloseBtn: () => void,
    onClickBackdrop: () => null,
    onPressEscKey: () => null,
    animation: Record<string, any>,
    backdropAnimation: Record<string, any>,
    position?: Position
}
