import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { PageProps, PermissionObject } from "@/types";
import { GroupCreateSchema } from "@/yup/YupSchemas";
import { Option } from "@/components/elements/field/Field";
import route from 'ziggy-js';

interface Props extends PageProps {
  permissions: PermissionObject[]
}

interface Values {
  name: string
  description: string
  type: string,
  group_permissions: string
}

export const groupTypes = [
  {
    id: 1,
    name: 'Web'
  },
  {
    id: 2,
    name: 'Server'
  },
  {
    id: 3,
    name: 'Server Admin'
  }
]

function GroupCreate(props: Props) {
  const [permissions] = useState<PermissionObject[]>(props.permissions);
  const [value, setValue] = useState<Option[] | string>('');
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('admin.groups.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('groups_settings.create_new_group')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          description: '',
          type: '',
          group_permissions: ''
        }}
        validationSchema={GroupCreateSchema()}
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
                  label={t('groups_settings.group_name')}
                />
                <Field.Text
                  name={'description'}
                  id={'description'}
                  label={t('groups_settings.group_description')}
                />
                <Field.Select
                  name={'type'}
                  id={'type'}
                  label={t('groups_settings.group_type')}
                  value={values.type || 'default_value'}
                  onChange={(e) => {
                    setFieldValue('type', e.target.value)
                    setFieldValue('group_permissions', [])
                    setValue([])
                  }}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('generic.select_group')}
                  </option>
                  {groupTypes.map(({ id, name }) => (
                    <option key={id} value={name.toLowerCase().replace(' ', '_')}>
                      {name}
                    </option>
                  ))}
                </Field.Select>
                <Field.MultiSelect
                  name={'group_permissions'}
                  id={'group_permissions'}
                  label={t('groups_settings.group_permissions')}
                  closeMenuOnSelect={false}
                  blurInputOnSelect={false}
                  // @ts-expect-error
                  onChange={(options: Option[]) => {
                    setFieldValue('group_permissions', options.map((option) => option.value))
                    setValue(options)
                  }}
                  value={value as string}
                  options={permissions.filter((permission) => values.type === 'web' ? permission.type === 'web' : permission.type === 'server_admin').map((perm) => ({ label: perm.readable_name, value: perm.id }))}
                  isMulti={true}
                  isDisabled={values.type === '' || values.type === 'server'}
                />
              </Field.FieldRow>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting}>
                  {t('submit', { ns: 'buttons' })}
                </Button.Text>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </PageContentBlock>
  )
}

export default GroupCreate
