import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { FlashMessageRender } from "@/components/FlashMessageRender";
import { Form } from "formik"

export default ({ title, ...props }) => (
  <div className="flex flex-col w-full h-full items-center justify-between">
    <div className="flex flex-col w-full max-w-sm">
      { title && <h2 className="text-3xl text-center text-neutral-100 font-medium py-4">{title}</h2> }
      <FlashMessageRender className="mb-2 px-1"/>
      <Form { ...props }>
        <div className="flex flex-col p-5 rounded-md bg-lightDark max-w-6xl">
          {props.children}
        </div>
      </Form>
    </div>
    <SourceAdminReg/>
  </div>
)
