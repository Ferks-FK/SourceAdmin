import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { FlashProp, ErrorsProp } from "@/types";
import { Option } from "@/components/elements/field/Field";
import { ModCreateSchema } from "@/yup/YupSchemas";
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  auth: {
    user: UserData
  }
}

interface Values {
  name: string
  mod: string
  upload_mod_icon: string
  enabled: boolean
}

export type OptionImage = Option & {
  image: string
}

function ModCreate(props: Props) {
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('admin.mods.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('mods_settings.create_new_mod')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          mod: '',
          upload_mod_icon: '',
          enabled: true
        }}
      validationSchema={ModCreateSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
            encType={'multipart/form-data'}
          >
            <div className="flex flex-col gap-6">
              <Field.FieldRow>
                <Field.Text
                  name={'name'}
                  id={'name'}
                  label={t('mods_settings.mod_name')}
                />
                <Field.Text
                  name={'mod'}
                  id={'mod'}
                  label={t('mods_settings.mod_image_name')}
                  description={t('mods_settings.mod_image_description')}
                />
                <Field.File
                  name={'upload_mod_icon'}
                  id={'upload_mod_icon'}
                  label={t('mods_settings.mod_icon')}
                  onChange={(e) => {
                    const mod_image = e.target.files![0]

                    setFieldValue('mod', mod_image?.name.toLowerCase().replace(/\s+|(\.[^.]+)$|\./g, ''))
                    setFieldValue('upload_mod_icon', mod_image)
                  }}
                />
                <Field.CheckBox
                  name={'enabled'}
                  id={'enabled'}
                  label={t('enabled', { ns: 'table' })}
                  value={values.enabled ? 1 : 0}
                  checked={values.enabled}
                  onChange={(e) => setFieldValue('enabled', e.target.checked)}
                />
              </Field.FieldRow>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting}>
                  {t('submit', { ns: 'buttons' })}
                </Button.Text>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default ModCreate
