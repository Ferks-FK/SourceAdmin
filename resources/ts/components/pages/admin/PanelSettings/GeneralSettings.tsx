import { useCallback, useState } from "react";
import { getSettings } from "@/api/getSettings";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Button } from "@/components/elements/button";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { Spinner } from "@/components/elements/Spinner";
import { router } from '@inertiajs/react';
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { ErrorsProp, FlashProp } from "@/types";
import { useSettingsStore } from "@/stores/settings";
import route from 'ziggy-js';

interface Props {
  group: string
}

interface Values extends Props {
  site_name: string
  time_zone: string
}

function GeneralSettings(props: Props) {
  const [ flash, setFlash ] = useState<FlashProp | null>(null);
  const [ errors, setErrors ] = useState<ErrorsProp | null>(null);
  const [ settings, setSettings ] = useSettingsStore((state) => [ state.data, state.setSettings ]);
  const { t } = useTranslation();

  const getGeneralSettings = useCallback(async () => {
    const response = await getSettings(props.group);

    setSettings(response as Values)
  }, [settings])

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

  useFlashMessages(flash, errors)

  return (
    settings == undefined ? (
      <Spinner centered size="large"/>
    ) : (
      <Formik
      onSubmit={handleSubmit}
      initialValues={{
        site_name: settings.site_name,
        time_zone: settings.time_zone ?? '',
        group: props.group
      }}
    >
      {({ isSubmitting }) => {
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
                />
                <Field.Text
                  name={'time_zone'}
                  id={'time_zone'}
                  label={t('panel_settings.time_zone')}
                />
              </Field.FieldRow>
              <div className="flex items-center justify-center gap-2">
                <Button.Text type={'submit'} disabled={isSubmitting}>
                  {t('update', { ns: 'buttons' })}
                </Button.Text>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
    )
  )
}

export default GeneralSettings
