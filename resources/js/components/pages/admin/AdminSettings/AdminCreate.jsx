import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { AdminCreateSchema } from "@/yup/YupSchemas"

function AdminCreate({ flash, errors, ziggy }) {

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.settings.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={'Create New Admin'}>
      <AdminLayout ziggy={ziggy}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            email: '',
            steam_id: '',
            password: '',
            password_confirmation: ''
          }}

          validationSchema={AdminCreateSchema}
        >
          {({ isSubmitting }) => (
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                  <Field
                    type={'text'}
                    name={'name'}
                    id={'name'}
                    label={'Admin Name'}
                  />
                  <Field
                    type={'text'}
                    name={'email'}
                    id={'email'}
                    label={'Admin Email'}
                  />
                  <Field
                    type={'text'}
                    name={'steam_id'}
                    id={'steam_id'}
                    label={'Admin SteamID'}
                  />
                  <Field
                    type={'password'}
                    name={'password'}
                    id={'password'}
                    label={'Password'}
                  />
                  <Field
                    type={'password'}
                    name={'password_confirmation'}
                    id={'password_confirmation'}
                    label={'Confirm Password'}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Button.Text type={'submit'} disabled={isSubmitting}>
                    Submit
                  </Button.Text>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </AdminLayout>
    </PageContentBlock>
  )
}

export default AdminCreate
