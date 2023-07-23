import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { FlashProp, ErrorsProp } from "@/types";
import { GroupCreateSchema } from "@/yup/YupSchemas";
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  auth: {
    user: UserData
  }
}

interface Values {
  name: string
  description: string
  type: string
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
          type: ''
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
                  onChange={(e) => setFieldValue('type', e.target.value)}
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
