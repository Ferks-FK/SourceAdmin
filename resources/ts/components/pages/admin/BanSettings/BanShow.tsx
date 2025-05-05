import { useState, useEffect } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Variant } from "@/components/elements/button/types";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik } from "formik";
import { getServerData } from "@/api/getServers";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { BanEditSchema } from "@/yup/YupSchemas";
import { faBan, faClock, faHourglassHalf, faNetworkWired, faPlay, faQuestion, faServer, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faSteam } from "@fortawesome/free-brands-svg-icons"
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { BanObject, ReasonObject, TimeBanObject, ServerDataResponse, PageProps } from "@/types";
import route from 'ziggy-js';
import { can } from "@/helpers";

interface Props extends PageProps {
  ban: BanObject
  reasons: ReasonObject[]
  timeBans: TimeBanObject[]
}

interface Values {
  reason_id: number
  time_ban_id: number
}

function BanShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [serverInfo, setServerInfo] = useState<ServerDataResponse | null>(null);
  const [reasonsData] = useState(props.reasons);
  const [timeBansData] = useState(props.timeBans);
  const [banInfo] = useState(props.ban);
  const [userCanEdit, userCanDelete] = [can('admin.bans.edit'), can('admin.bans.destroy')];
  const { t } = useTranslation();

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await getServerData(banInfo.server_id!, false);

        setServerInfo(response.server)
      } catch (error) {
        console.error(error)
      }
    }


    if (banInfo.server_id) {
      fetchServerData()
    }
  }, [])

  const handleSubmit = (values: Values) => {
    router.patch(route('admin.bans.update', banInfo.id), { ...values })
  }

  const handleDelete = () => {
    router.delete(route('admin.bans.destroy', banInfo.id))
  }

  const handleUnban = () => {
    router.put(route('admin.bans.action.unban', banInfo.id))
  }

  const handleReban = () => {
    router.put(route('admin.bans.action.reban', banInfo.id))
  }

  const showModal = (content: JSX.Element) => {
    setModalContent(content);
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('bans_settings.ban_of', { playerName: banInfo.player_name })}>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 bg-dark-primary">
        <ul>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faUser} color="white" className="w-4" />&nbsp;
            <p>{t('report.player_name')}: {banInfo.player_name}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faNetworkWired} color="white" className="w-4" />&nbsp;
            <p>{t('report.player_ip')}: {banInfo.player_ip ?? t('generic.no_ip')}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faSteam} color="white" className="w-4" />&nbsp;
            <p>{t('report.steam_id')}: {banInfo.player_steam_id ?? t('generic.no_steam')}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faPlay} color="white" className="w-4" />&nbsp;
            <p>{t('generic.created_at')}: {FormatLocaleDate(banInfo.created_at, props.timeZone)}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faHourglassHalf} color="white" className="w-4" />&nbsp;
            <p>{t('generic.length')}: {banInfo.time_ban_name}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faClock} color="white" className="w-4" />&nbsp;
            <p>{t('generic.expires_at')}: {banInfo.time_ban_value == 0 ? t('generic.never') : FormatLocaleDate(banInfo.end_at, props.timeZone)}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faQuestion} color="white" className="w-4" />&nbsp;
            <p>{t('generic.reason')}: {banInfo.reason}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faUserGear} color="white" className="w-4" />&nbsp;
            <p>{t('bans_settings.banned_by')}: {banInfo.admin_name ?? t('generic.admin_deleted')}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faBan} color="white" className="w-4" />&nbsp;
            <p>{t('admin_overview.total_bans')}: {banInfo.ban_count}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faServer} color="white" className="w-4" />&nbsp;
            {serverInfo !== null ? (
              <p>
                {t('bans_settings.banned_from')}: {banInfo.server_id ? serverInfo.HostName : t('generic.server_deleted')}
              </p>
            ) : (
              <p>
                {t('bans_settings.banned_from')}: {t('generic.server_deleted')}
              </p>
            )}
          </li>
        </ul>
        <div className="flex justify-center gap-2">
          {banInfo.player_is_banned ?
            <Button.Text variant={Variant.Warning} onClick={() => showModal(
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">{t('bans_settings.unban_player', { playerName: banInfo.player_name })}?</h3>
                  <p className="text-sm">
                    {t('bans_settings.unban_player_message')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    {t('cancel', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger onClick={handleUnban}>
                    {t('unban', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </>
            )}>
              {t('unban', { ns: 'buttons' })}
            </Button.Text>
            :
            <Button.Text variant={Variant.Info} onClick={() => showModal(
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">{t('bans_settings.reban_player', { playerName: banInfo.player_name })}?</h3>
                  <p className="text-sm">
                    {t('bans_settings.reban_player_message')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    {t('cancel', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger onClick={handleReban}>
                    {t('reban', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </>
            )}>
              {t('reban', { ns: 'buttons' })}
            </Button.Text>
          }
        </div>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          reason_id: banInfo.reason_id,
          time_ban_id: banInfo.time_ban_id
        }}
        validationSchema={BanEditSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <div className="flex flex-col gap-4 p-4 bg-dark-primary">
            <Modal
              isVisible={modalVisible}
              onClickCloseBtn={hideModal}
              onPressEscKey={hideModal}
              onClickBackdrop={hideModal}
            >
              <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                {modalContent}
              </div>
            </Modal>
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <Field.FieldRow>
                  <Field.Select
                    name={'time_ban_id'}
                    id={'time_ban_id'}
                    label={t('generic.length')}
                    value={values.time_ban_id}
                    onChange={(e) => setFieldValue('time_ban_id', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    {timeBansData.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.Select
                    name={'reason_id'}
                    id={'reason_id'}
                    label={t('generic.reason')}
                    value={values.reason_id}
                    onChange={(e) => setFieldValue('reason_id', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    {reasonsData.map(({ id, reason }) => (
                      <option key={id} value={id}>
                        {reason}
                      </option>
                    ))}
                  </Field.Select>
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('submit', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header'} disabled={!userCanDelete} onClick={() => showModal(
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-2xl text-left">{t('bans_settings.delete_ban_of', { playerName: banInfo.player_name })}?</h3>
                        <p className="text-sm">
                          {t('bans_settings.delete_ban_of_message')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button.Text onClick={hideModal}>
                          {t('cancel', { ns: 'buttons' })}
                        </Button.Text>
                        <Button.Danger onClick={handleDelete}>
                          {t('delete', { ns: 'buttons' })}
                        </Button.Danger>
                      </div>
                    </>
                  )}>
                    {t('delete_ban', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default BanShow
