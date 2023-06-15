import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { ServerCreateSchema } from "@/yup/YupSchemas"

function ServerCreate({ mods, regions, flash, errors, ziggy }) {
  const [modsData] = useState(mods);
  const [regionsData] = useState(regions);

  const handleSubmit = (values, { setSubmitting }) => {
    router.post(route('admin.servers.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={'Create New Server'}>
      <AdminLayout ziggy={ziggy}>
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
          validationSchema={ServerCreateSchema}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form formSize={'xl'} className={'pb-4'}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Field
                    type={'text'}
                    name={'ip'}
                    id={'ip'}
                    label={'Server IP/Domain'}
                  />
                  <Field
                    type={'text'}
                    name={'port'}
                    id={'port'}
                    label={'Server Port'}
                  />
                  <Field
                    type={'password'}
                    name={'rcon'}
                    id={'rcon'}
                    label={'Server RCON'}
                  />
                  <Field
                    type={'password'}
                    name={'rcon_confirmation'}
                    id={'rcon_confirmation'}
                    label={'Confirm RCON'}
                  />
                  <Field
                    type={'select'}
                    name={'mod_id'}
                    id={'mod_id'}
                    label={'Server MOD'}
                    value={values.mod_id || 'default_value'}
                    onChange={(e) => setFieldValue('mod_id', e.target.value)}
                  >
                    <option key={'disabled'} value={'default_value'} disabled>
                      Select MOD
                    </option>
                    {modsData.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <Field
                    type={'select'}
                    name={'region_id'}
                    id={'region_id'}
                    label={'Server Region'}
                    value={values.region_id || 'default_value'}
                    onChange={(e) => setFieldValue('region_id', e.target.value)}
                  >
                    <option key={'disabled'} value={'default_value'} disabled>
                      Select Region
                    </option>
                    {regionsData.map(({ id, region }) => (
                      <option key={id} value={id}>
                        {region}
                      </option>
                    ))}
                  </Field>
                  <Field
                    type={'checkbox'}
                    name={'enabled'}
                    id={'enabled'}
                    label={'Server Enabled'}
                    value={values.enabled}
                    checked={values.enabled}
                    onChange={(e) => setFieldValue('enabled', e.target.checked)}
                  />
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
      </AdminLayout>
    </PageContentBlock>
  )
}

export default ServerCreate
