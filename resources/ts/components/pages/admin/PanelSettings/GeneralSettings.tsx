import { useCallback, useEffect, useState } from "react";
import { getSettings, getTimeZones } from "@/api/getSettings";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Button } from "@/components/elements/button";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { router } from '@inertiajs/react';
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { ErrorsProp, FlashProp } from "@/types";
import { useSettingsStore } from "@/stores/settings";
import { Option } from "@/components/elements/field/Field";
import { can } from "@/helpers";
import { GeneralSettingsSchema } from "@/yup/YupSchemas";
import route from 'ziggy-js';

interface Props {
  group: string
}

interface Values extends Props {
  site_name: string
  time_zone: string
  steam_web_api_key: string
}

function GeneralSettings(props: Props) {
  const [flash, setFlash] = useState<FlashProp | null>(null);
  const [errors, setErrors] = useState<ErrorsProp | null>(null);
  const [settings, setSettings] = useSettingsStore((state) => [state.data, state.setSettings]);
  const [timeZones, setTimeZones] = useState<string[] | null>(null);
  const [userCanEdit] = [can('admin.settings.edit')];
  const { t } = useTranslation();

  const getGeneralSettings = async () => {
    const response = await getSettings(props.group);

    setSettings({
      GeneralSettings: response
    })
  }

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.settings.update'), { ...values }, {
      // TODO Review typing.
      onSuccess: (page: any) => {
        setFlash(page.props.flash)
        setErrors(null)
        getGeneralSettings() // Get the updated settings.
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

  useEffect(() => {
    const getTimeZonesList = async () => {
      const response = await getTimeZones();

      setTimeZones(response)
    }

    getTimeZonesList()
  }, [])

  useFlashMessages(flash, errors)

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        site_name: settings?.GeneralSettings?.site_name ?? '',
        time_zone: settings?.GeneralSettings?.time_zone ?? '',
        steam_web_api_key: settings?.GeneralSettings?.steam_web_api_key ?? '',
        group: props.group
      }}
      validationSchema={GeneralSettingsSchema()}
    >
      {({ isSubmitting, setFieldValue }) => {
        return (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <Field.FieldRow>
                <Field.Text
                  name={'site_name'}
                  id={'site_name'}
                  label={t('panel_settings.site_name')}
                  disabled={!userCanEdit}
                />
                <Field.MultiSelect
                  name={'time_zone'}
                  id={'time_zone'}
                  label={t('panel_settings.time_zone')}
                  closeMenuOnSelect={true}
                  blurInputOnSelect={true}
                  // @ts-expect-error
                  onChange={(option: Option) => {
                    setFieldValue('time_zone', option.value)
                  }}
                  defaultValue={{ label: settings?.GeneralSettings?.time_zone, value: settings?.GeneralSettings?.time_zone }}
                  options={timeZones ? timeZones.map((timeZone) => ({ label: timeZone, value: timeZone })) : []}
                  isDisabled={!userCanEdit}
                />
                <Field.Text
                  name={'steam_web_api_key'}
                  id={'steam_web_api_key'}
                  label={t('panel_settings.steam_api_key')}
                  description={t('panel_settings.steam_api_key_description')}
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
        )
      }}
    </Formik>
  )
}

export default GeneralSettings
