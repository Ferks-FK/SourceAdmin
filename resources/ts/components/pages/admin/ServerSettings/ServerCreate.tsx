import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { ServerCreateSchema } from "@/yup/YupSchemas"
import { useTranslation } from "react-i18next";
import { ModObject, RegionObject, PageProps } from "@/types";
import route from 'ziggy-js';

interface Props extends PageProps {
  mods: ModObject[]
  regions: RegionObject[]
}

interface Values {
  ip: string
  port: string
  rcon: string
  rcon_confirmation: string
  mod_id: string
  region_id: string
  enabled: boolean
}

function ServerCreate(props: Props) {
  const [modsData] = useState(props.mods);
  const [regionsData] = useState(props.regions);
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.post(route('admin.servers.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(props.flash, props.errors)

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
              <Field.FieldRow>
                <Field.Text
                  name={'ip'}
                  id={'ip'}
                  label={t('servers_settings.server_ip_or_domain')}
                />
                <Field.Text
                  name={'port'}
                  id={'port'}
                  label={t('servers_settings.server_port')}
                />
                <Field.Password
                  name={'rcon'}
                  id={'rcon'}
                  label={t('servers_settings.server_rcon')}
                />
                <Field.Password
                  name={'rcon_confirmation'}
                  id={'rcon_confirmation'}
                  label={t('servers_settings.confirm_rcon')}
                />
                <Field.Select
                  name={'mod_id'}
                  id={'mod_id'}
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
                  id={'region_id'}
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
                  id={'enabled'}
                  label={t('servers_settings.server_enabled')}
                  value={values.enabled ? 1 : 0}
                  checked={values.enabled}
                  onChange={(e) => setFieldValue('enabled', e.target.checked)}
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

export default ServerCreate
