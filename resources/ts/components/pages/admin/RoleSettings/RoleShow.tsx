import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Modal } from "@/components/elements/modal";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData, useUserStore } from "@/stores/user";
import { RoleObject, PermissionObject, PageProps } from "@/types";
import { Option } from "@/components/elements/field/Field";
import { RoleEditSchema } from '@/yup/YupSchemas';
import route from 'ziggy-js';
import { can } from "@/helpers";

interface Props extends PageProps {
  role: RoleObject
  permissions: PermissionObject[]
}

interface Values {
  name: string
  description: string
  permissions: string
}

function RoleShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [permissionsData] = useState<PermissionObject[]>(props.permissions);
  const [setUserData] = useUserStore((state) => [state.setUserData]);
  const [userCanEdit, userCanDelete] = [can('admin.roles.edit'), can('admin.roles.destroy')];
  const { t } = useTranslation();

  const selectedPermissions = props.role.permissions?.map((permission) => ({ label: permission.readable_name, value: permission.name }))

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.roles.update', props.role.id), { ...values }, {
      // TODO Review typing.
      onSuccess: (page: any) => {
        const user: UserData = page.props.auth.user

        setUserData(user)
      },
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.roles.destroy', props.role.id))
    hideModal()
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('role_settings.role_editing_name', { roleName: props.role.name })}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: props.role.name,
          description: props.role.description ?? '',
          permissions: (selectedPermissions?.map((permission) => permission.value) ?? []) as unknown as string
        }}
        validationSchema={RoleEditSchema()}
      >
        {({ isSubmitting, setFieldValue }) => (
          <>
            <Modal
              isVisible={modalVisible}
              onClickCloseBtn={hideModal}
              onPressEscKey={hideModal}
              onClickBackdrop={hideModal}
            >
              <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">{t('role_settings.delete_role', { roleName: props.role.name })}?</h3>
                  <p className="text-base">
                    {t('role_settings.delete_role_message')}
                  </p>
                  {props.role.id == props.auth.user.roles.at(0)?.id && (
                    <p className="text-sm text-red-500">
                      {t('role_settings.delete_own_role_warning')}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    {t('cancel', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger onClick={handleDelete}>
                    {t('delete', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </div>
            </Modal>
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <Field.FieldRow>
                  <Field.Text
                    name={'name'}
                    id={'name'}
                    label={t('role_settings.role_name')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'description'}
                    id={'description'}
                    label={t('role_settings.role_description')}
                    disabled={!userCanEdit}
                  />
                  <Field.MultiSelect
                    name={'permissions'}
                    id={'permissions'}
                    label={t('role_settings.permissions')}
                    closeMenuOnSelect={false}
                    blurInputOnSelect={false}
                    isMulti={true}
                    // @ts-expect-error
                    onChange={(options: readonly Option[]) => {
                      setFieldValue('permissions', options.map((option) => option.value))
                    }}
                    defaultValue={selectedPermissions}
                    options={permissionsData.map((permission) => ({ label: permission.readable_name, value: permission.name }))}
                    isDisabled={!userCanEdit}
                  />
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('update', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header !w-fit'} disabled={!userCanDelete} onClick={showModal}>
                    {t('delete_role', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default RoleShow
