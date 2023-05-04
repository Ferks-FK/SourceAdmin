import { FlashMessageRender } from "@/components/FlashMessageRender";
import { Form as FormikForm } from "formik";
import { useTranslation } from "react-i18next";

function Form({ title, formSize, children, ...props }) {
  const { i18n } = useTranslation();

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
    <div className="flex flex-col w-full h-full items-center gap-4">
      <div className={`flex flex-col w-full overflow-y-auto ${handleFormSize()}`}>
        { title && <h2 className="text-3xl text-center text-neutral-100 font-medium py-4">{title}</h2> }
        <FlashMessageRender className="mb-2"/>
        <FormikForm { ...props }>
          <div className="flex flex-col p-5 rounded-md bg-lightDark max-w-6xl">
            {children}
          </div>
        </FormikForm>
      </div>
    </div>
  )
}

export { Form }
