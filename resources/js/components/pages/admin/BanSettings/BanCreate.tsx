import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { BanCreateSchema } from "@/yup/YupSchemas";
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { ReasonObject, TimeBanObject, AdminObject, FlashProp, ErrorsProp } from "@/types";
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  reasons: ReasonObject[]
  timeBans: TimeBanObject[]
  admins: AdminObject[]
  auth: {
    user: UserData
  }
}

interface Values {
  ip: string
  steam_id: string
  player_name: string
  time_ban_id: string
  admin_id: number
  reason_id: string
}

function BanCreate(props: Props) {
  const [reasonsData] = useState(props.reasons);
  const [timeBansData] = useState(props.timeBans);
  const [adminsData] = useState(props.admins);
  const { t } = useTranslation();

  console.log(adminsData)

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    console.log(values)
    router.post(route('admin.bans.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('bans_settings.create_new_ban')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          ip: '',
          steam_id: '',
          player_name: '',
          time_ban_id: '',
          admin_id: props.auth.user.id,
          reason_id: ''
        }}
        validationSchema={BanCreateSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-3">
                <Field.Text
                  name={'ip'}
                  id={'ip'}
                  label={t('report.player_ip')}
                />
                <Field.Text
                  name={'steam_id'}
                  id={'steam_id'}
                  label={t('bans_settings.player_steam_id')}
                  description={t('generic.steam_id_formats')}
                />
                <Field.Text
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field.Select
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
                </Field.Select>
                <Field.Select
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
                </Field.Select>
                <Field.Select
                  name={'reason_id'}
                  id={'reason_id'}
                  label={t('generic.reason')}
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
                </Field.Select>
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
