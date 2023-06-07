import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { AdminCreateSchema } from "@/yup/YupSchemas"

function AdminCreate({ ...props }) {

  return (
    <PageContentBlock title={'Create New Admin'}>
      <AdminLayout ziggy={props.ziggy}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            steam_id: '',
            password: '',
            confirm_password: ''
          }}

          validationSchema={AdminCreateSchema}
        >
          {({ isSubmitting }) => (
            <Form formSize={'xl'}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
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
                    name={'confirm_password'}
                    id={'confirm_password'}
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
