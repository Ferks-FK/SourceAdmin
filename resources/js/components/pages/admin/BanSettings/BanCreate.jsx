import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { BanCreateSchema } from "@/yup/YupSchemas";
import { useTranslation } from "react-i18next";

function BanCreate({ reasons, time_bans, admins, flash, errors, auth }) {
  const [reasonsData] = useState(reasons);
  const [timeBansData] = useState(time_bans);
  const [adminsData] = useState(admins);
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.bans.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('bans_settings.create_new_ban')}>
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
        validationSchema={BanCreateSchema}
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
                  label={t('report.player_ip')}
                />
                <Field
                  type={'text'}
                  name={'steam_id'}
                  id={'steam_id'}
                  label={t('bans_settings.player_steam_id')}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field
                  type={'select'}
                  name={'time_ban_id'}
                  id={'time_ban_id'}
                  label={t('generic.length')}
                  value={values.time_ban_id || 'default_value'}
                  onChange={(e) => setFieldValue('time_ban_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('generic.select_length')}
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
                  label={t('generic.admin')}
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
                  label={t('appeal.reason')}
                  value={values.reason_id || 'default_value'}
                  onChange={(e) => setFieldValue('reason_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('generic.select_reason')}
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

export default BanCreate
