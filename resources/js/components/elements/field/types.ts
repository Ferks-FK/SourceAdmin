import { FormikErrors, FormikTouched, FieldInputProps } from 'formik';
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
    description?: string
    touched: FormikTouched<any>
    field: FieldInputProps<any>
    errors: FormikErrors<any>
}

export type BaseInputProps = Omit<FieldProps, 'touched' | 'field' | 'errors'> & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>
export type TextAreaProps = Omit<FieldProps, 'touched' | 'field' | 'errors'> & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>
export type SelectProps = Omit<FieldProps, 'touched' | 'field' | 'errors'> & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'>
