import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { MuteCreateSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';

function MuteCreate({ reasons, time_bans, admins, flash, errors, auth }) {
  const [reasonsData] = useState(reasons);
  const [timeBansData] = useState(time_bans);
  const [adminsData] = useState(admins);

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.mutes.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={'Create New Mute'}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          ip: '',
          steam_id: '',
          player_name: '',
          time_ban_id: '',
          admin_id: auth.user.id,
          reason_id: ''
        }}
        validationSchema={MuteCreateSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-3">
                <Field
                  type={'text'}
                  name={'ip'}
                  id={'ip'}
                  label={'Player IP'}
                />
                <Field
                  type={'text'}
                  name={'steam_id'}
                  id={'steam_id'}
                  label={'Player SteamID'}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  id={'player_name'}
                  label={'Player Name'}
                />
                <Field
                  type={'select'}
                  name={'time_ban_id'}
                  id={'time_ban_id'}
                  label={'Ban Length'}
                  value={values.time_ban_id || 'default_value'}
                  onChange={(e) => setFieldValue('time_ban_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    Select Length
                  </option>
                  {timeBansData.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Field>
                <Field
                  type={'select'}
                  name={'admin_id'}
                  id={'admin_id'}
                  label={'Admin'}
                  value={values.admin_id}
                  onChange={(e) => setFieldValue('admin_id', e.target.value)}
                >
                  {adminsData.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Field>
                <Field
                  type={'select'}
                  name={'reason_id'}
                  id={'reason_id'}
                  label={'Reason'}
                  value={values.reason_id || 'default_value'}
                  onChange={(e) => setFieldValue('reason_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    Select Reason
                  </option>
                  {reasonsData.map(({ id, reason }) => (
                    <option key={id} value={id}>
                      {reason}
                    </option>
                  ))}
                </Field>
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
    </PageContentBlock>
  )
}

export default MuteCreate
