import { Form as FormikForm, FormikFormProps } from "formik";
import classNames from "classnames";
import { HTMLAttributes } from "react";

type Props =  HTMLAttributes<HTMLDivElement> & FormikFormProps & {
  title?: string
  formSize?: FormSize
  formikClassNames?: string
}

type FormSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

function Form({ title, formSize, children, className, formikClassNames, ...props }: Props) {
  const handleFormSize = () => {
    switch (formSize) {
      case 'xs':
        return 'max-w-xs'
      case 'sm':
        return 'max-w-sm'
      case 'md':
        return 'max-w-md'
      case 'lg':
        return 'max-w-lg'
      case 'xl':
        return 'max-w-xl'
      case 'full':
        return 'max-w-full'
      default:
        return 'max-w-sm'
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <div className={`flex flex-col w-full overflow-y-auto items-center ${handleFormSize()}`}>
        { title && <h2 className="text-3xl text-center text-neutral-100 font-medium py-4">{title}</h2> }
        <FormikForm { ...props } className={classNames(formikClassNames)}>
          <div className={classNames('flex flex-col p-5 rounded-md bg-dark-secondary', className)}>
            {children}
          </div>
        </FormikForm>
      </div>
    </div>
  )
}

export { Form }
