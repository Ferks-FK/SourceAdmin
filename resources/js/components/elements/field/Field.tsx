import { Field as FormikField } from "formik";
import { capitalize } from "lodash";
import { Label } from "@/components/elements/Label";
import { Input } from "@/components/elements/inputs";
import { TextArea as TextAreaComponent } from "@/components/elements/TextArea";
import { Select as SelectComponent } from "@/components/elements/Select";
import { FieldProps as FormikFieldProps } from 'formik';
import { FieldProps, BaseInputProps, TextAreaProps, SelectProps } from "@/components/elements/field/types";

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
        <Input.Text {...field} {...props}/>
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
        <Input.Password {...field} {...props}/>
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
        <Input.Email {...field} {...props}/>
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
        <TextAreaComponent {...field} {...props}/>
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
        <Input.CheckBox {...props}/>
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
        <Input.File {...props}/>
      </Field>
    )}
  </FormikField>
)

const Select = ({ name, label, description, children, ...props }: SelectProps) => (
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

const _Field = Object.assign(Field, {
  Text: Text,
  Password: Password,
  Email: Email,
  TextArea: TextArea,
  CheckBox: CheckBox,
  File: File,
  Select: Select
})

export default _Field
