import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { PermissionObject, FlashProp, ErrorsProp } from "@/types";
import { Option } from "@/components/elements/field/Field";
import { RoleCreateSchema } from "@/yup/YupSchemas";
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  permissions: PermissionObject[]
  auth: {
    user: UserData
  }
}

interface Values {
  name: string
  description: string
  permissions: string
}

function RoleCreate(props: Props) {
  const [permissionsData] = useState(props.permissions);
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('admin.roles.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('role_settings.create_new_role')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          description: '',
          permissions: ''
        }}
        validationSchema={RoleCreateSchema()}
      >
        {({ isSubmitting, setFieldValue }) => (
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
                />
                <Field.Text
                  name={'description'}
                  id={'description'}
                  label={t('role_settings.role_description')}
                />
                <Field.MultiSelect
                  name={'permissions'}
                  id={'permissions'}
                  label={t('role_settings.permissions')}
                  closeMenuOnSelect={false}
                  blurInputOnSelect={false}
                  // @ts-expect-error
                  onChange={(options: readonly Option[]) => {
                    setFieldValue('permissions', options.map((option) => option.value))
                  }}
                  options={permissionsData.map((permission) => ({ label: permission.readable_name, value: permission.name }))}
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

export default RoleCreate
