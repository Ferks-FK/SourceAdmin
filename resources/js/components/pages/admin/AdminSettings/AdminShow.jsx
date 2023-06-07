import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Size } from "@/components/elements/button/types";
import { Avatar } from "@/components/Avatar";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { AdminEditSchema } from "@/yup/YupSchemas";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function AdminShow({ user, ...props }) {

  return (
    <PageContentBlock title={`Admin ${user.name}`}>
      <AdminLayout ziggy={props.ziggy}>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            steam_id: user.steam_id,
            current_password: '',
            new_password: '',
            new_password_confirm: ''
          }}

          validationSchema={AdminEditSchema}
        >
          {({ isSubmitting, values }) => (
            <div className={'flex flex-col gap-4 bg-dark-primary'}>
              <div className="flex flex-col md:flex-row items-center md:text-left p-4 gap-4" style={{ wordBreak: 'break-word' }}>
                <div className="max-w-[150px] md:flex items-center">
                  <Avatar
                    email={user.email}
                    size={100}
                    className={'w-full h-full'}
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                  <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-lg">{user.name}</h1>
                    <p className="flex gap-1 items-center text-base">
                      {user.email}
                      <FontAwesomeIcon
                        icon={user.email_verified_at ? faCircleCheck : faCircleXmark}
                        color={user.email_verified_at ? 'green' : '#b91c1c'}
                      />
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-2 md:text-right">
                    <h1>admin</h1>
                    <p>{user.created_at}</p>
                    <Button.Danger size={Size.Default} className={'!font-header w-fit'}>
                      Delete Account
                    </Button.Danger>
                  </div>
                </div>
              </div>
              <Form formSize={'xl'} className={'pb-4'}>
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
                      name={'current_password'}
                      id={'current_password'}
                      label={'Current Password'}
                    />
                    <Field
                      type={'password'}
                      name={'new_password'}
                      id={'new_password'}
                      label={'New Password'}
                    />
                    <Field
                      type={'password'}
                      name={'new_password_confirm'}
                      id={'new_password_confirm'}
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
            </div>
          )}
        </Formik>
      </AdminLayout>
    </PageContentBlock>
  )
}

export default AdminShow
