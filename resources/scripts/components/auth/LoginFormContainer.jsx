import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { FlashMessageRender } from "@/components/FlashMessageRender";
import { AnimationFade } from "@/components/elements/AnimationFade";
import { SteamContainer } from "@/components/auth/steam/SteamContainer";
import { Form } from "formik";

export default ({ title, ...props }) => {
  return (
    <AnimationFade>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col w-full max-w-sm">
          { title && <h2 className="text-3xl text-center text-neutral-100 font-medium py-4">{title}</h2> }
          <FlashMessageRender className="mb-2"/>
          <Form { ...props }>
            <div className="flex flex-col p-5 rounded-md bg-lightDark max-w-6xl">
              {props.children}
            </div>
          </Form>
        </div>
        <div className="flex flex-col justify-between h-full w-full max-w-sm">
          <div className="flex flex-wrap p-5 rounded-md bg-lightDark mt-5 justify-center gap-1">
            <SteamContainer/>
          </div>
        </div>
        <SourceAdminReg/>
      </div>
    </AnimationFade>
  )
}
