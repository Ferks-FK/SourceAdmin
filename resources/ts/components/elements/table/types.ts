import { PaginationProps as PaginationBaseProps } from '@/types';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { HTMLAttributes } from 'react';

export enum iconPosition {
    Right = 'right',
    Left = 'left'
}

export enum SizeRowProps {
    Sm = 'sm',
    Base = 'base'
}

type ColumnObject = {
    name: string
    i18nKey: string
    ns?: string
}

export type TableProps = JSX.IntrinsicElements['table'] & {
    columns: ColumnObject[]
    dataLength: number
};

export interface HeaderProps extends HTMLAttributes<HTMLTableCellElement> {
    title?: string
    icon?: IconDefinition
    iconSize?: SizeProp
    iconPosition?: iconPosition
}

export interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
    size?: SizeRowProps
}

export type TDProps = JSX.IntrinsicElements['td']

export interface PaginationProps {
    paginationData: PaginationBaseProps
    visible: boolean
}
