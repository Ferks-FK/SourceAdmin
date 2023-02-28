import { Formik } from "formik";
import { object, string } from 'yup';
import LoginFormContainer from "@/components/auth/LoginFormContainer";
import { Button } from '@mui/material';
import Field from "@/components/elements/Field"
import login from '@/api/auth/login';
import { useEffect } from "react";
import { useFlashesStore } from "@/stores/flashes";

function LoginContainer() {
  const [ clearAndAddHttpError, clearFlashes ] = useFlashesStore((state) => [ state.clearAndAddHttpError, state.clearFlashes ])

  useEffect(() => {
    clearFlashes()
  }, [])

  const handleSubmit = (values, { setSubmitting }) => {
    clearFlashes()

    login({ ...values }).then(response => {
      if (response.complete) {
        return window.location = '/'
      }
    }).catch(error => {
      setSubmitting(false);
      clearAndAddHttpError({error});
    })
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: '', password: '' }}
        validationSchema={object().shape({
          name: string().required('A username or email address must be provided.'),
          password: string().required('Account password is required.')
        })}
      >
        {({ isSubmitting, setSubmitting }) => (
          <LoginFormContainer title={'Login'}>
            <Field type="text" name="name" label="Username or Email" size="small"/>
            <div className="mt-6">
              <Field type="password" name="password" label="Password" size="small"/>
            </div>
            <div className="flex justify-center w-full mt-6">
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Login
              </Button>
            </div>
          </LoginFormContainer>
        )}
      </Formik>
    </>
  )
}

export default LoginContainer;
