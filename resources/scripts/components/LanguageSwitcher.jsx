import { useState, useEffect } from "react";
import { Modal } from "@/components/elements/Modal";
import { Select } from "@/components/elements/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "@/i18n/locales";
import http from "@/api/http";

function LanguageSwitcher() {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('i18nextLng');
  const changeLanguage = (lng) => i18n.changeLanguage(lng)
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    i18n.on('languageChanged', () => {
      http.post(`/api/locale`, {'locale': i18n.language}).then(response => {
        console.log(`Language set to ${response.data.locale}.`)
      })
      .catch(error => {
        console.error(error)
      }).finally(
        location.reload() // Refresh the page when the language is changed, to avoid untranslated strings.
      )
    })
  }, [])

  return (
    <>
      <Modal
        visible={modalVisible}
        handleModal={handleModal}
        dismissable={true}
      >
        <div className="flex flex-col justify-between h-full w-full max-w-sm">
          <Select value={currentLanguage} onChange={(e) => changeLanguage(e.currentTarget.value)}>
            {SupportedLanguages.map(({ name, code }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </Select>
        </div>
      </Modal>

      <FontAwesomeIcon
        icon={faLanguage}
        size="xl"
        className="text-slate-300 hover:text-slate-100 cursor-pointer"
        onClick={() => setModalVisible(true)}
      />
    </>
  )
}

export { LanguageSwitcher }
