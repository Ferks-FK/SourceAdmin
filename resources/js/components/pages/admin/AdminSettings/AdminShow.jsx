import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Avatar } from "@/components/Avatar";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { AdminEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { useUserStore } from "@/stores/user";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";

function AdminShow({ user, flash, errors, ziggy, auth }) {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ clearData ] = useUserStore((state) => [state.clearData])

  const handleSubmit = (values, { setSubmitting }) => {
    router.patch(route('admin.settings.update', user.id), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.settings.destroy', user.id), {
      onSuccess: () => {
        if (props.user.id == props.auth.user.id) {
          clearData()
        }
      }
    })
  }

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={`Admin ${user.name}`}>
      <AdminLayout ziggy={ziggy}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: user.name,
            email: user.email,
            steam_id: user.steam_id,
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
          }}

          validationSchema={AdminEditSchema}
        >
          {({ isSubmitting }) => (
            <div className={'flex flex-col gap-4 p-4 bg-dark-primary'}>
              <div className="flex flex-col md:flex-row items-center md:text-left gap-4" style={{ wordBreak: 'break-word' }}>
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
                    <Button.Danger className={'!font-header'} onClick={showModal}>
                      Delete Account
                    </Button.Danger>
                  </div>
                  <Modal
                    isVisible={modalVisible}
                    onClickCloseBtn={hideModal}
                    onPressEscKey={hideModal}
                    onClickBackdrop={hideModal}
                  >
                    <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-2xl text-left">Delete Admin "{user.name}"?</h3>
                        <p className="text-sm">
                          When you confirm the deletion of the user, the action is permanent and cannot be undone.
                          He will also lose the rights to the servers he is associated with.
                        </p>
                        {user.id == auth.user.id && (
                          <p className="text-red-500">
                            You are about to delete your own account!
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button.Text onClick={hideModal}>
                          Cancel
                        </Button.Text>
                        <Button.Danger onClick={handleDelete}>
                          Delete
                        </Button.Danger>
                      </div>
                    </div>
                  </Modal>
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
                      name={'new_password_confirmation'}
                      id={'new_password_confirmation'}
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
