import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { AdminCreateSchema } from "@/yup/YupSchemas"
import { useTranslation } from "react-i18next";
import { RoleObject, GroupObject, PageProps } from "@/types";
import { Option } from "@/components/elements/field/Field";
import { useState } from "react";
import route from 'ziggy-js';

interface Props extends PageProps {
  roles: RoleObject[]
  groups: GroupObject[]
}

interface Values {
  name: string
  email: string
  steam_id: string
  role: string
  groups: number[]
  password: string
  password_confirmation: string
}

function AdminCreate(props: Props) {
  const [roles] = useState<RoleObject[]>(props.roles);
  const [groups] = useState<GroupObject[]>(props.groups);
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('admin.admins.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('admin_settings.create_new_admin')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          steam_id: '',
          role: '',
          groups: [] as number[],
          password: '',
          password_confirmation: ''
        }}
        validationSchema={AdminCreateSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
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
                  description={t('generic.steam_id_formats')}
                />
                <Field.Select
                  name={'role'}
                  id={'role'}
                  label={t('role_settings.role')}
                  value={values.role || 'default_value'}
                  onChange={(e) => setFieldValue('role', e.target.value)}
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
                  // @ts-expect-error
                  onChange={(options: readonly Option[]) => {
                    setFieldValue('groups', options.map((option) => option.value))
                  }}
                  options={groups.map((group) => ({ label: group.name, value: group.id }))}
                />
                <Field.Password
                  name={'password'}
                  id={'password'}
                  label={t('admin_settings.admin_password')}
                />
                <Field.Password
                  name={'password_confirmation'}
                  id={'password_confirmation'}
                  label={t('admin_settings.admin_confirm_new_password')}
                />
              </Field.FieldRow>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting}>
                  {t('submit', {ns: 'buttons'})}
                </Button.Text>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default AdminCreate
