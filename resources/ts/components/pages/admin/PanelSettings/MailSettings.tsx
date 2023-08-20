import { useState } from "react";
import { getSettings } from "@/api/getSettings";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Button } from "@/components/elements/button";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { router } from '@inertiajs/react';
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { ErrorsProp, FlashProp } from "@/types";
import { useSettingsStore } from "@/stores/settings";
import { MailSettingsSchema } from "@/yup/YupSchemas";
import { can } from "@/helpers";
import route from 'ziggy-js';

interface Props {
  group: string
}

interface Values extends Props {
  smtp_host: string
  smtp_port: number
  smtp_encryption: string
  smtp_username: string
  smtp_password: string
  smtp_mail_from: string
  smtp_mail_from_name: string
}

function MailSettings(props: Props) {
  const [flash, setFlash] = useState<FlashProp | null>(null);
  const [errors, setErrors] = useState<ErrorsProp | null>(null);
  const [settings, setSettings] = useSettingsStore((state) => [state.data, state.setSettings]);
  const [userCanEdit] = [can('admin.settings.edit')];
  const { t } = useTranslation();

  const getMailSettings = async () => {
    const response = await getSettings(props.group)

    setSettings({
      MailSettings: response
    })
  }

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.settings.update'), { ...values }, {
      // TODO Review typing.
      onSuccess: (page: any) => {
        setFlash(page.props.flash)
        setErrors(null)
        getMailSettings()
      },
      onError: (errors) => {
        setErrors(errors)
        setFlash(null)
      },
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  if (!settings?.MailSettings) {
    return null
  }

  return (
    <Formik
        onSubmit={handleSubmit}
        initialValues={{
          smtp_host: settings?.MailSettings?.smtp_host ?? '',
          smtp_port: settings?.MailSettings?.smtp_port ?? 25,
          smtp_encryption: settings?.MailSettings?.smtp_encryption ?? '',
          smtp_username: settings?.MailSettings?.smtp_username ?? '',
          smtp_password: settings?.MailSettings?.smtp_password ?? '',
          smtp_mail_from: settings?.MailSettings?.smtp_mail_from ?? '',
          smtp_mail_from_name: settings?.MailSettings?.smtp_mail_from_name ?? '',
          group: props.group
        }}
        validationSchema={MailSettingsSchema()}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <Field.FieldRow className={'lg:grid-cols-3'}>
                <Field.Text
                  name={'smtp_host'}
                  id={'smtp_host'}
                  label={'SMTP Host'}
                  disabled={!userCanEdit}
                />
                <Field.Text
                  name={'smtp_port'}
                  id={'smtp_port'}
                  label={'SMTP Port'}
                  disabled={!userCanEdit}
                />
                <Field.Select
                  name={'smtp_encryption'}
                  id={'smtp_encryption'}
                  label={'SMTP Encryption'}
                  value={values.smtp_encryption || 'tls'}
                  onChange={(e) => setFieldValue('smtp_encryption', e.target.value)}
                  disabled={!userCanEdit}
                >
                  <option value="none">None</option>
                  <option value="ssl">Secure Sockets Layer (SSL)</option>
                  <option value="tls">Transport Layer Security (TLS)</option>
                </Field.Select>
              </Field.FieldRow>
              <Field.FieldRow>
                <Field.Text
                  name={'smtp_username'}
                  id={'smtp_username'}
                  label={'Username'}
                  disabled={!userCanEdit}
                />
                <Field.Password
                  name={'smtp_password'}
                  id={'smtp_password'}
                  label={'Password'}
                  disabled={!userCanEdit}
                />
                <Field.Text
                  name={'smtp_mail_from'}
                  id={'smtp_mail_from'}
                  label={'Mail from'}
                  disabled={!userCanEdit}
                />
                <Field.Text
                  name={'smtp_mail_from_name'}
                  id={'smtp_mail_from_name'}
                  label={'Mail from name'}
                  disabled={!userCanEdit}
                />
              </Field.FieldRow>
              <div className="flex items-center justify-center gap-2">
                <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                  {t('update', { ns: 'buttons' })}
                </Button.Text>
              </div>
            </div>
          </Form>
        )}
      </Formik>
  )
}

export default MailSettings
