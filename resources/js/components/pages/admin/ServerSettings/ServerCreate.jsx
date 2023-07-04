import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { ServerCreateSchema } from "@/yup/YupSchemas"
import { useTranslation } from "react-i18next";

function ServerCreate({ mods, regions, flash, errors }) {
  const [modsData] = useState(mods);
  const [regionsData] = useState(regions);
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.servers.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('servers_settings.create_new_server')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          ip: '',
          port: '',
          rcon: '',
          rcon_confirmation: '',
          mod_id: '',
          region_id: '',
          enabled: true
        }}
        validationSchema={ServerCreateSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                <Field.Text
                  name={'ip'}
                  label={t('servers_settings.server_ip_or_domain')}
                />
                <Field.Text
                  name={'port'}
                  label={t('servers_settings.server_port')}
                />
                <Field.Password
                  name={'rcon'}
                  label={t('servers_settings.server_rcon')}
                />
                <Field.Password
                  name={'rcon_confirmation'}
                  label={t('servers_settings.confirm_rcon')}
                />
                <Field.Select
                  name={'mod_id'}
                  label={t('servers_settings.server_mod')}
                  value={values.mod_id || 'default_value'}
                  onChange={(e) => setFieldValue('mod_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('generic.select_mod')}
                  </option>
                  {modsData.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Field.Select>
                <Field.Select
                  name={'region_id'}
                  label={t('servers_settings.server_region')}
                  value={values.region_id || 'default_value'}
                  onChange={(e) => setFieldValue('region_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('generic.select_region')}
                  </option>
                  {regionsData.map(({ id, region }) => (
                    <option key={id} value={id}>
                      {region}
                    </option>
                  ))}
                </Field.Select>
                <Field.CheckBox
                  name={'enabled'}
                  label={t('servers_settings.server_enabled')}
                  value={values.enabled}
                  checked={values.enabled}
                  onChange={(e) => setFieldValue('enabled', e.target.checked)}
                />
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

export default ServerCreate
