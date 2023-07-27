import { Formik, FormikHelpers } from "formik";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Field } from "@/components/elements/field";
import { Form } from "@/components/elements/Form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/elements/button";
import { SteamContainer } from "@/components/pages/auth/steam/SteamContainer";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { LoginFormSchema } from "@/yup/YupSchemas";
import { useUserStore } from "@/stores/user";
import { router } from '@inertiajs/react';
import { UserData } from "@/stores/user";
import { PageProps } from "@/types";
import route from 'ziggy-js'

interface Values {
  name: string
  password: string
}

function LoginContainer(props: PageProps) {
  const [setUserData, isLogged] = useUserStore((state) => [state.setUserData, state.isLogged])
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('auth.login'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
      // TODO Review typing.
      onSuccess: (page: any) => {
        const user: UserData = page.props.auth.user;

        if (!isLogged && user) {
          setUserData(user)
        }
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
            <Form
              title={t('login', { ns: 'buttons' })}
              formikClassNames={'flex justify-center w-full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Field.Text
                    name="name"
                    label={t('login.username_or_email_label')}
                  />
                  <Field.Password
                    name="password"
                    label={t('login.password_label')}
                  />
                </div>
                <div className="flex justify-center w-full">
                  <Button.Text type="submit" disabled={isSubmitting} className={'!w-20'}>
                    {t('login', { ns: 'buttons' })}
                  </Button.Text>
                </div>
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
