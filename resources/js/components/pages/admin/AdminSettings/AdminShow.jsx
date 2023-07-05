import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Avatar } from "@/components/Avatar";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik } from "formik";
import { AdminEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { useUserStore } from "@/stores/user";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";
import { useTranslation } from "react-i18next";

function AdminShow({ user, flash, errors, auth }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [clearData] = useUserStore((state) => [state.clearData])
  const { t } = useTranslation();

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
        if (user.id == auth.user.id) {
          clearData()
        }
      }
    })
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('admin_settings.admin_editing_name', {adminName: user.name})}>
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

        validationSchema={AdminEditSchema()}
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
                    {t('delete_account', {ns: 'buttons'})}
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
                      <h3 className="text-2xl text-left">{t('admin_settings.delete_admin', {adminName: user.name})}?</h3>
                      <p className="text-sm">
                        {t('admin_settings.delete_admin_message')}
                      </p>
                      {user.id == auth.user.id && (
                        <p className="text-red-500">
                          {t('admin_settings.delete_own_account_warning')}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button.Text onClick={hideModal}>
                        {t('cancel', {ns: 'buttons'})}
                      </Button.Text>
                      <Button.Danger onClick={handleDelete}>
                        {t('delete', {ns: 'buttons'})}
                      </Button.Danger>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
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
                    name={'current_password'}
                    id={'current_password'}
                    label={t('admin_settings.admin_current_password')}
                  />
                  <Field.Password
                    name={'new_password'}
                    id={'new_password'}
                    label={t('admin_settings.admin_new_password')}
                  />
                  <Field.Password
                    name={'new_password_confirmation'}
                    id={'new_password_confirmation'}
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
          </div>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default AdminShow
