import { Field as FormikField } from "formik";
import { capitalize } from "lodash";
import { Input } from "@/components/elements/inputs";
import { Label } from "@/components/elements/Label";

function Field({ id, name, label, description, validate, ...props }) {

  return (
    <FormikField name={name} validate={validate}>
      {({ field, form: { errors, touched } }) => (
        <div>
          {label && (
            <Label htmlFor={name}>
              {label}
            </Label>
          )}
          <Input.Text
            {...field}
            {...props}
          />
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

export default Field;
