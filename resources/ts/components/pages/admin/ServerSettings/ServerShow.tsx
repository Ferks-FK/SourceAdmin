import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { ServerEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { ServerDataResponse, ModObject, RegionObject, PageProps } from "@/types";
import route from 'ziggy-js';
import { can } from "@/helpers";

interface Props extends PageProps {
  server: ServerDataResponse & {
    ModId: number | null
    RegionId: number
    Enabled: string | boolean
    Created_At: string
    Updated_At: string
  }
  mods: ModObject[]
  regions: RegionObject[]
}

interface Values {
  ip: string
  port: number
  rcon: string
  new_rcon: string
  new_rcon_confirmation: string
  mod_id: number | null
  region_id: number
  enabled: string | boolean
}

function ServerShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [serverData] = useState(props.server);
  const [modsData] = useState(props.mods);
  const [regionsData] = useState(props.regions);
  const [userCanEdit, userCanDelete] = [can('admin.servers.edit'), can('admin.servers.destroy')]
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.servers.update', serverData?.Id), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.servers.destroy', serverData?.Id))
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('servers_settings.server_name', { serverName: serverData.HostName })}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          ip: serverData.Ip,
          port: serverData.GamePort,
          rcon: '',
          new_rcon: '',
          new_rcon_confirmation: '',
          mod_id: serverData.ModId,
          region_id: serverData.RegionId,
          enabled: serverData.Enabled
        }}
        validationSchema={ServerEditSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <div className={'flex flex-col gap-4 p-4 bg-dark-primary'}>
            <div className="flex flex-col justify-between md:flex-row items-center md:items-start gap-4" style={{ wordBreak: 'break-word' }}>
              <div className="flex flex-col md:flex-row gap-2 items-center md:items-start text-center md:text-left max-w-sm">
                {serverData.Mod &&
                  <Image
                    src={`/images/games/${serverData.Mod}.png`}
                    alt={serverData.Mod}
                    className={'rounded-full w-24 pointer-events-none select-none'}
                  />
                }
                <div className={`flex flex-col gap-1 items-center md:items-start ${serverData.IsOnline ? 'text-sm' : 'text-base'}`}>
                  <p>
                    {serverData.HostName}
                  </p>
                  <p className="flex gap-1 items-center text-base">
                    {t('generic.status')}:
                    <FontAwesomeIcon icon={faCircle} color={serverData.IsOnline ? 'green' : 'red'} />
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col items-center text-center md:items-end gap-2 md:text-right">
                  <p>{t('generic.created_at')}: {FormatLocaleDate(serverData.Created_At, props.timeZone)}</p>
                  <p>{t('generic.updated_at')}: {FormatLocaleDate(serverData.Updated_At, props.timeZone)}</p>
                </div>
                <Modal
                  isVisible={modalVisible}
                  onClickCloseBtn={hideModal}
                  onPressEscKey={hideModal}
                  onClickBackdrop={hideModal}
                >
                  <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl text-left">{t('servers_settings.delete_server', { serverName: serverData.HostName })}?</h3>
                      <p className="text-sm">
                        {t('servers_settings.delete_server_message')}
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
                  </div>
                </Modal>
              </div>
            </div>
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <Field.FieldRow>
                  <Field.Text
                    name={'ip'}
                    id={'ip'}
                    label={t('servers_settings.server_ip_or_domain')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'port'}
                    id={'port'}
                    label={t('servers_settings.server_port')}
                    disabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'rcon'}
                    id={'rcon'}
                    label={t('servers_settings.current_rcon')}
                    disabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'new_rcon'}
                    id={'new_rcon'}
                    label={t('servers_settings.new_rcon')}
                    disabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'new_rcon_confirmation'}
                    id={'new_rcon_confirmation'}
                    label={t('servers_settings.confirm_new_rcon')}
                    disabled={!userCanEdit}
                  />
                  <Field.Select
                    name={'mod_id'}
                    id={'mod_id'}
                    label={t('servers_settings.server_mod')}
                    value={values.mod_id ?? undefined}
                    onChange={(e) => setFieldValue('mod_id', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    {modsData.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.Select
                    name={'region_id'}
                    id={'region_id'}
                    label={t('servers_settings.server_region')}
                    value={values.region_id}
                    onChange={(e) => setFieldValue('region_id', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    {regionsData.map(({ id, region }) => (
                      <option key={id} value={id}>
                        {region}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.CheckBox
                    name={'enabled'}
                    id={'enabled'}
                    label={t('servers_settings.server_enabled')}
                    value={values.enabled as string}
                    checked={values.enabled as boolean}
                    onChange={(e) => setFieldValue('enabled', e.target.checked)}
                    disabled={!userCanEdit}
                  />
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('submit', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header'} disabled={!userCanDelete} onClick={showModal}>
                    {t('delete_server', { ns: 'buttons' })}
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

export default ServerShow
