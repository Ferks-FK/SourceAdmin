import { Formik } from "formik";
import { object, string } from 'yup';
import LoginFormContainer from "@/components/pages/auth/LoginFormContainer";
import Field from "@/components/elements/Field";
import { useFlashesStore } from "@/stores/flashes";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/elements/Button";
import { usePage } from '@inertiajs/react';
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react'

function LoginContainer() {
  const [ clearAndAddHttpError, clearFlashes ] = useFlashesStore((state) => [ state.clearAndAddHttpError, state.clearFlashes ])
  const { errors, flash } = usePage().props
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post('/auth/login',
    { ...values },
    {
      onFinish: () => {
        setSubmitting(false)

      },
    })
  }

  //useFlashMessages(flash)

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
        {({ isSubmitting, setSubmitting }) => (
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
