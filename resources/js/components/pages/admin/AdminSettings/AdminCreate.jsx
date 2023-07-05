import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { AdminCreateSchema } from "@/yup/YupSchemas"
import { useTranslation } from "react-i18next";

function AdminCreate({ flash, errors }) {
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.settings.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('admin_settings.create_new_admin')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          steam_id: '',
          password: '',
          password_confirmation: ''
        }}

        validationSchema={AdminCreateSchema()}
      >
        {({ isSubmitting }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                <Field.Text
                  name={'name'}
                  id={'name'}
                  label={t('admin_settings.admin_name')}
                />
                <Field.Text
                  name={'email'}
                  id={'email'}
                  label={t('admin_settings.admin_email')}
                />
                <Field.Text
                  name={'steam_id'}
                  id={'steam_id'}
                  label={t('admin_settings.admin_steam_id')}
                />
                <Field.Password
                  name={'password'}
                  id={'password'}
                  label={t('admin_settings.admin_password')}
                />
                <Field.Password
                  name={'password_confirmation'}
                  id={'password_confirmation'}
                  label={t('admin_settings.admin_confirm_new_password')}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting}>
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

export default AdminCreate
