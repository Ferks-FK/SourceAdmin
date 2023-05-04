import { Formik } from "formik";
import { object, string } from 'yup';
import LoginFormContainer from "@/components/pages/auth/LoginFormContainer";
import { Field } from "@/components/elements/Field";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/elements/Button";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react'

function LoginContainer(props) {
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post('/auth/login', { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
    })
  }

  useFlashMessages(props.flash)

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: '', password: '' }}
        validationSchema={object().shape({
          name: string().required(t('login.name_required')),
          password: string().required(t('login.password_required'))
        })}
      >
        {({ isSubmitting }) => (
          <LoginFormContainer title={t('login', {ns: 'buttons'})}>
            <Field type="text" name="name" label={t('login.username_or_email_label')} size="small"/>
            <div className="mt-6">
              <Field type="password" name="password" label={t('login.password_label')} size="small"/>
            </div>
            <div className="flex justify-center w-full mt-6">
              <Button type="submit" disabled={isSubmitting} className={'p-2'}>
                {t('login', {ns: 'buttons'})}
              </Button>
            </div>
          </LoginFormContainer>
        )}
      </Formik>
    </>
  )
}

export default LoginContainer;
