import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Avatar } from "@/components/Avatar";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { AdminEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { useUserStore, UserData } from "@/stores/user";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { FlashProp, ErrorsProp, RoleObject, GroupObject } from "@/types";
import { capitalize } from "lodash";
import route from 'ziggy-js';
import { can } from "@/helpers";

interface Props {
  roles: RoleObject[]
  groups: GroupObject[]
  user: UserData
  flash: FlashProp
  errors: ErrorsProp
  auth: {
    user: UserData
  }
  timeZone: string
}

interface Values {
  name: string
  email: string
  steam_id: string
  role: number
  groups: string
  current_password: string
  new_password: string
  new_password_confirmation: string
}

function AdminShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [roles] = useState<RoleObject[]>(props.roles);
  const [groups] = useState<GroupObject[]>(props.groups);
  const [setUserData, clearData] = useUserStore((state) => [state.setUserData, state.clearData]);
  const [userCanEdit, userCanDelete] = [can('admin.admins.edit'), can('admin.admins.destroy')];
  const { t } = useTranslation();

  const selectedGroups = props.user.groups?.map((group) => ({label: group.name, value: group.id}));

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.settings.update', props.user.id), { ...values }, {
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
    router.delete(route('admin.settings.destroy', props.user.id), {
      onSuccess: () => {
        if (props.user.id == props.auth.user.id) {
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

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('admin_settings.admin_editing_name', { adminName: props.user.name })}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: props.user.name,
          email: props.user.email,
          steam_id: props.user.steam_id,
          role: (props.user.roles.at(0)?.id ?? '') as number,
          groups: (selectedGroups?.map((group) => group.value) ?? []) as unknown as string,
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        }}

        validationSchema={AdminEditSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <div className={'flex flex-col gap-4 p-4 bg-dark-primary'}>
            <div className="flex flex-col md:flex-row items-center md:text-left gap-4" style={{ wordBreak: 'break-word' }}>
              <div className="max-w-[150px] md:flex items-center">
                <Avatar
                  email={props.user.email}
                  size={100}
                  className={'w-full h-full'}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <h1 className="text-lg">{props.user.name}</h1>
                  <p className="flex gap-1 items-center text-base">
                    {props.user.email}
                    <FontAwesomeIcon
                      icon={props.user.email_verified_at ? faCircleCheck : faCircleXmark}
                      color={props.user.email_verified_at ? 'green' : '#b91c1c'}
                    />
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2 md:text-right">
                  <h1>{capitalize(props.user.roles.at(0)?.name)}</h1>
                  <p>{t('generic.created_at')}: {FormatLocaleDate(props.user.created_at, props.timeZone)}</p>
                </div>
                <Modal
                  isVisible={modalVisible}
                  onClickCloseBtn={hideModal}
                  onPressEscKey={hideModal}
                  onClickBackdrop={hideModal}
                >
                  <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl text-left">{t('admin_settings.delete_admin', { adminName: props.user.name })}?</h3>
                      <p className="text-sm">
                        {t('admin_settings.delete_admin_message')}
                      </p>
                      {props.user.id == props.auth.user.id && (
                        <p className="text-red-500">
                          {t('admin_settings.delete_own_account_warning')}
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
              </div>
            </div>
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
                    label={t('admin_settings.admin_name')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'email'}
                    id={'email'}
                    label={t('admin_settings.admin_email')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'steam_id'}
                    id={'steam_id'}
                    label={t('admin_settings.admin_steam_id')}
                    description={t('generic.steam_id_formats')}
                    disabled={!userCanEdit}
                  />
                  <Field.Select
                    name={'role'}
                    id={'role'}
                    label={t('role_settings.role')}
                    value={values.role as number || 'default_value'}
                    onChange={(e) => setFieldValue('role', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    <option key={'disabled'} value={'default_value'} disabled>
                      {t('generic.select_role')}
                    </option>
                    {roles.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.MultiSelect
                    name={'groups'}
                    id={'groups'}
                    label={t('generic.group')}
                    closeMenuOnSelect={false}
                    blurInputOnSelect={false}
                    isMulti={true}
                    // @ts-expect-error
                    onChange={(options: readonly Option[]) => {
                      setFieldValue('groups', options.map((option) => option.value))
                    }}
                    defaultValue={selectedGroups}
                    options={groups.map((group) => ({ label: group.name, value: group.id }))}
                    isDisabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'current_password'}
                    id={'current_password'}
                    label={t('admin_settings.admin_current_password')}
                    disabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'new_password'}
                    id={'new_password'}
                    label={t('admin_settings.admin_new_password')}
                    disabled={!userCanEdit}
                  />
                  <Field.Password
                    name={'new_password_confirmation'}
                    id={'new_password_confirmation'}
                    label={t('admin_settings.admin_confirm_new_password')}
                    disabled={!userCanEdit}
                  />
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('submit', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header'} disabled={!userCanDelete} onClick={showModal}>
                    {t('delete_account', { ns: 'buttons' })}
                  </Button.Danger>
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
