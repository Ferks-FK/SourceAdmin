import { BaseProps } from '@/types';
import { FormikErrors, FormikTouched, FieldInputProps } from 'formik';

export interface FieldProps extends BaseProps {
    name: string
    label: string
    description?: string
    touched: FormikTouched<any>
    field: FieldInputProps<any>
    errors: FormikErrors<any>
}

export type BaseInputProps = Omit<FieldProps, 'touched' | 'field' | 'errors'>
