import { Field as FormikField } from "formik";
import { capitalize } from "lodash";
import { Input } from "@/components/elements/inputs";
import { Label } from "@/components/elements/Label";
import { Select } from "@/components/elements/Select";
import { TextArea } from "@/components/elements/TextArea";

function Field({ id, name, label, type, description, ...props }) {

  const TypeField = (type, field, props) => {
    switch (type) {
      case 'text':
        return (
          <Input.Text
            id={id}
            {...field}
            {...props}
          />
        )
      case 'password':
        return (
          <Input.Generic
            type={type}
            id={id}
            {...field}
            {...props}
          />
        )
      case 'email':
        return (
          <Input.Generic
            type={type}
            id={id}
            {...field}
            {...props}
          />
        )
      case 'file':
        return (
          <Input.File
            id={id}
            name={name}
            onChange={props.onChange}
          />
        )
      case 'select':
        return (
          <Select
            name={name}
            id={id}
            {...props}
          >
            {props.children}
          </Select>
        )
      case 'text-area':
        return (
          <TextArea
            name={name}
            id={id}
            {...props}
            {...field}
          />
        )
    }
  }

  return (
    <FormikField name={name}>
      {({ field, form: { errors, touched } }) => (
        <div>
          {label && (
            <Label htmlFor={name}>
              {label}
            </Label>
          )}
          {TypeField(type, field, props)}
          {touched[field.name] && errors[field.name] ? (
            <p className={'input-help'}>
              { capitalize(errors[field.name]) }
            </p>
          ) : description ? (
            <p className={'input-help'}>
              {description}
            </p>
          ) : null}
        </div>
      )}
    </FormikField>
  )
};

export { Field };
