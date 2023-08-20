import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSidebarStore } from "@/stores/components/sidebar";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/i18n/locales";
import { setLocale } from "@/api/locale";
import { Select } from "@/components/elements/Select";
import { useSettingsStore } from "@/stores/settings";

interface Props {
  locale: string
}

function Header(props: Props) {
  const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible]);
  const [ settings ] = useSettingsStore((state) => [ state.data ]);
  const { i18n } = useTranslation();

  const currentLanguage = localStorage.getItem('i18nextLng');
  const handleSidebar = () => setSidebarIsVisible()
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng)

  const handleLanguageChange = () => {
    try {
      setLocale(i18n.language);
    } catch (error) {
      console.error(error);
    }
  };

  // Sets the language of the client on the backend at first startup.
  if (currentLanguage !== props.locale) {
    handleLanguageChange()
  }

  useEffect(() => {
    i18n.on('languageChanged', handleLanguageChange);

    return () => i18n.off('languageChanged', handleLanguageChange)
  }, [i18n.language])

  return (
    <>
      <header className="flex w-full h-[3.6rem] bg-dark-primary border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center w-full h-full mx-4 sm:mx-7">
          <div className="text-center py-3 ellipsis w-36 mobile:w-auto">
            <a href="/" className="text-xl text-white text-center no-underline">
              {settings?.GeneralSettings?.site_name}
            </a>
          </div>
					<div className="flex gap-4">
            <div className="flex items-center">
              <Select
                value={currentLanguage ?? ''}
                onChange={(e) => changeLanguage(e.currentTarget.value)}
                className={'!py-1.5 text-sm'}
              >
                {supportedLanguages.map(({ name, code }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
						<div className="flex items-center md:hidden">
							<div className="text-3xl">
								<FontAwesomeIcon icon={sidebarIsVisible ? faXmark : faBars} size="sm" className="text-white cursor-pointer transition-all duration-300 ease-in-out" onClick={handleSidebar}/>
							</div>
						</div>
					</div>
        </div>
      </header>
    </>
  );
};

export { Header }
