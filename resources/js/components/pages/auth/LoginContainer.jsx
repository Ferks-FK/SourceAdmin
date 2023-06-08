import { Formik } from "formik";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Field } from "@/components/elements/Field";
import { Form } from "@/components/elements/Form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/elements/button";
import { SteamContainer } from "@/components/pages/auth/steam/SteamContainer";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { LoginFormSchema } from "@/yup/YupSchemas";
import { router } from '@inertiajs/react';

function LoginContainer(props) {
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('auth.login'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash)

  return (
    <PageContentBlock title={'Login'}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          password: ''
        }}
        validationSchema={LoginFormSchema()}
      >
        {({ isSubmitting }) => (
          <div className="flex flex-col items-center">
            <Form title={t('login', { ns: 'buttons' })}>
              <Field type="text" name="name" label={t('login.username_or_email_label')} size="small" />
              <div className="mt-6">
                <Field type="password" name="password" label={t('login.password_label')} size="small" />
              </div>
              <div className="flex justify-center w-full mt-6">
                <Button.Text type="submit" disabled={isSubmitting} className={''}>
                  {t('login', { ns: 'buttons' })}
                </Button.Text>
              </div>
            </Form>
            <div className="flex flex-col justify-between h-full w-full max-w-sm">
              <div className="flex flex-wrap p-5 rounded-md bg-dark-secondary mt-5 justify-center gap-1">
                <SteamContainer />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default LoginContainer;
