import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Button } from "@/components/elements/button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { Formik, FormikHelpers } from "formik";
import { router } from '@inertiajs/react';
import { AppealFormSchema } from "@/yup/YupSchemas";
import { useTranslation } from "react-i18next";
import { FlashProp, ErrorsProp } from "@/types";
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
}

interface Values {
  player_steam_id: string
  player_ip: string
  player_name: string
  player_email: string
  reason: string
}

function AppealContainer({ flash, errors }: Props) {
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
    router.post(route('appeal.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
      onSuccess: () => {
        resetForm()
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('appeal.protest')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          player_steam_id: '',
          player_ip: '',
          player_name: '',
          player_email: '',
          reason: ''
        }}
        validationSchema={AppealFormSchema()}
      >
        {({ isSubmitting }) => (
          <Form
            title={t('appeal.protest')}
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <Field.FieldRow>
                <Field.Text
                  name={'player_steam_id'}
                  label={t('report.steam_id')}
                  description={t('generic.steam_id_formats')}
                  maxLength={20}
                />
                <Field.Text
                  name={'player_ip'}
                  id={'player_ip'}
                  label={t('report.player_ip')}
                />
                <Field.Text
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field.TextArea
                  name={'reason'}
                  id={'reason'}
                  label={t('generic.reason')}
                  placeholder={t('appeal.reason_placeholder')}
                  className={'border-2 rounded'}
                />
                <Field.Email
                  name={'player_email'}
                  id={'player_email'}
                  label={t('report.your_email')}
                />
              </Field.FieldRow>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting} className={'p-2'}>
                  {t('submit', {ns: 'buttons'})}
                </Button.Text>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default AppealContainer
