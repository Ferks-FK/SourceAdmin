import { Label } from "@/components/elements/Label";
import { Field as FormikField } from "formik";
import { capitalize } from "lodash";

function TextArea({ name, label, id, description, rows = 5, className, ...props }) {
  return (
    <FormikField name={name}>
      {({ field, form: { errors, touched } }) => (
        <div className="flex flex-col">
          {label && (
            <Label htmlFor={name}>
              {label}
            </Label>
          )}
          <textarea
            name={name}
            id={id}
            rows={rows}
            className={`w-full p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 hover:border-neutral-400 transition-all duration-100 ease-in-out ${className ?? ''}`}
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
}

export { TextArea }
