import React from "react";
import { Field as FormikField } from "formik";
import { capitalize } from "lodash";
import { Label } from "@/components/elements/Label";
import { Input } from "@/components/elements/inputs";
import { TextArea as TextAreaComponent } from "@/components/elements/TextArea";
import { Select as SelectComponent } from "@/components/elements/Select";
import { FieldProps as FormikFieldProps } from 'formik';
import { FieldProps, BaseInputProps, TextAreaProps, SelectProps } from "@/components/elements/field/types";
import Select, { Props } from 'react-select';
import { SelectStyle } from "./style";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const Field = ({ name, label, description, touched, field, errors, children }: FieldProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={name}>
          {label}
        </Label>
      )}
      {children}
      {touched[field.name] && errors[field.name] ? (
        <p className={'input-error'}>
          {capitalize(errors[field.name] as string)}
        </p>
      ) : description ? (
        <p className={'input-help'}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

const Text = ({ name, label, description, ...props }: BaseInputProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Input.Text {...field} {...props} />
      </Field>
    )}
  </FormikField>
)

const Password = ({ name, label, description, ...props }: BaseInputProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Input.Password {...field} {...props} />
      </Field>
    )}
  </FormikField>
)

const Email = ({ name, label, description, ...props }: BaseInputProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Input.Email {...field} {...props} />
      </Field>
    )}
  </FormikField>
)

const TextArea = ({ name, label, description, ...props }: TextAreaProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <TextAreaComponent {...field} {...props} />
      </Field>
    )}
  </FormikField>
)

const CheckBox = ({ name, label, description, ...props }: BaseInputProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Input.CheckBox {...props} />
      </Field>
    )}
  </FormikField>
)

const File = ({ name, label, description, ...props }: BaseInputProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Input.File {...props} />
      </Field>
    )}
  </FormikField>
)

const SelectElement = ({ name, label, description, children, ...props }: SelectProps) => (
  <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <SelectComponent {...props}>
          {children}
        </SelectComponent>
      </Field>
    )}
  </FormikField>
)

export type Option = {
  label: string
  value: string | number
}

type MultiSelectProps = Props & Omit<SelectProps, 'defaultValue'> & {
  options: Option | Option[]
}

const MultiSelect = ({ name, label, description, options, ...props }: MultiSelectProps) => {
  const { t } = useTranslation();

  return (
    <FormikField name={name}>
    {({ field, form: { errors, touched } }: FormikFieldProps) => (
      <Field
        name={name}
        label={label}
        description={description}
        touched={touched}
        field={field}
        errors={errors}
      >
        <Select
          isMulti={true}
          options={options}
          styles={SelectStyle}
          placeholder={t('generic.search')}
          noOptionsMessage={() => t('generic.no_options')}
          {...props}
        />
      </Field>
    )}
  </FormikField>
  )
}

type FieldRowProps = {
  children: React.ReactNode,
  className?: string
}

const FieldRow = ({ children, className }: FieldRowProps) => (
  <div className={classNames('grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6', className)}>
    {children}
  </div>
)

const _Field = Object.assign(Field, {
  FieldRow: FieldRow,
  Text: Text,
  Password: Password,
  Email: Email,
  TextArea: TextArea,
  CheckBox: CheckBox,
  File: File,
  Select: SelectElement,
  MultiSelect: MultiSelect
})

export default _Field
