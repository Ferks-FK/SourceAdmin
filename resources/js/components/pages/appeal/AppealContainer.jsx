import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { Formik } from "formik";
import { router } from '@inertiajs/react';
import { AppealFormSchema } from "@/yup/YupSchemas";
import { useTranslation } from "react-i18next";

function AppealContainer({ flash, errors }) {
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
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
        validationSchema={AppealFormSchema}
      >
        {({ isSubmitting }) => (
          <Form
            title={t('appeal.protest')}
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
                <Field
                  type={'text'}
                  name={'player_steam_id'}
                  id={'player_steam_id'}
                  label={t('report.steam_id')}
                  maxLength={20}
                />
                <Field
                  type={'text'}
                  name={'player_ip'}
                  id={'player_ip'}
                  label={t('report.player_ip')}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field
                  type={'text-area'}
                  name={'reason'}
                  id={'reason'}
                  label={t('appeal.reason')}
                  placeholder={t('appeal.reason_placeholder')}
                  className={'border-2 rounded'}
                />
                <Field
                  type={'email'}
                  name={'player_email'}
                  id={'player_email'}
                  label={t('report.your_email')}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button type={'submit'} disabled={isSubmitting} className={'p-2'}>
                  {t('submit', {ns: 'buttons'})}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default AppealContainer
