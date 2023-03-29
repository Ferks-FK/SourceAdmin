import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { FlashMessageRender } from "@/components/FlashMessageRender";
import { Form } from "formik";
import { Select } from "@/components/elements/Select"
import { SupportedLanguages } from "@/i18n"
import { useTranslation } from "react-i18next";
import { AnimationFade } from "@/components/elements/AnimationFade";
import { SteamContainer } from "@/components/auth/steam/SteamContainer";

export default ({ title, ...props }) => {
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('i18nextLng')
  const changeLanguage = (lng) => {
    location.reload() // Refresh the page when the language is changed, to avoid untranslated strings.
    i18n.changeLanguage(lng)
  }

  return (
    <AnimationFade>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col w-full max-w-sm">
          { title && <h2 className="text-3xl text-center text-neutral-100 font-medium py-4">{title}</h2> }
          <FlashMessageRender className="mb-2 px-1"/>
          <Form { ...props }>
            <div className="flex flex-col p-5 rounded-md bg-lightDark max-w-6xl">
              {props.children}
            </div>
          </Form>
        </div>
        <div className="flex flex-col justify-between h-full w-full max-w-sm ">
          <SteamContainer>

          </SteamContainer>
        </div>
        {/* <div className="flex flex-col justify-between h-full w-full max-w-sm ">
          <div className="flex flex-col p-5 rounded-md bg-lightDark mt-5 items-center">
            <Select value={currentLanguage} onChange={(e) => changeLanguage(e.currentTarget.value)}>
              {SupportedLanguages.map(({ name, code }) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </Select>
          </div>
          <SourceAdminReg/>
        </div> */}
      </div>
    </AnimationFade>
  )
}
