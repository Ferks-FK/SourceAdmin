import { useEffect, useState } from "react";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { getServerData } from '@/api/getServers';
import { ReportFormSchema } from "@/yup/YupSchemas";
import { Formik } from "formik";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

function ReportContainer({ serversIds, flash, errors }) {
  const [ serverData, setServerData ] = useState([]);
  const { t } = useTranslation();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    router.post(route('report.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
      onSuccess: () => {
        resetForm()
      }
    })
  }

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        for (const server of serversIds) {
          const response = await getServerData(server, false);
          setServerData((prevState) => [...prevState, response]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchServerData();
  }, []);

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={t('report.report')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          player_steam_id: '',
          player_ip: '',
          player_name: '',
          comments: '',
          reporter_name: '',
          reporter_email: '',
          server_id: '',
          upload_demo: ''
        }}
        validationSchema={ReportFormSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            title={t('report.report')}
            formikClassNames={'flex justify-center w-full'}
            formSize={'full'}
            className={'max-w-6xl w-full'}
            encType={'multipart/form-data'}
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
                <Field
                  type={'text'}
                  name={'player_steam_id'}
                  id={'player_steam_id'}
                  label={t('report.steam_id')}
                  maxLength={20}
                />
                <Field
                  type={'text'}
                  name={'player_ip'}
                  id={'player_ip'}
                  label={t('report.player_ip')}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field
                  type={'text-area'}
                  name={'comments'}
                  id={'comments'}
                  label={t('report.comments')}
                  className={'border-2 rounded'}
                />
                <Field
                  type={'text'}
                  name={'reporter_name'}
                  id={'reporter_name'}
                  label={t('report.your_name')}
                />
                <Field
                  type={'email'}
                  name={'reporter_email'}
                  id={'reporter_email'}
                  label={t('report.your_email')}
                />
                <Field
                  type={'select'}
                  name={'server_id'}
                  id={'server_id'}
                  label={t('servers.server')}
                  value={values.server_id || 'default_value'}
                  className={'border-2 hover:border-neutral-400'}
                  onChange={(e) => setFieldValue('server_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    {t('servers.select_server')}
                  </option>
                  {serverData.map((server) => {
                    const serverInfo = server[0]

                    return (
                      <option key={serverInfo.Id} value={serverInfo.Id}>
                        {serverInfo.HostName}
                      </option>
                    )
                  })}
                </Field>
                <Field
                  type={'file'}
                  name={'upload_demo'}
                  id={'upload_demo'}
                  label={t('report.upload_demo')}
                  onChange={(e) => setFieldValue('upload_demo', e.target.files[0])}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting} className={'p-2'}>
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

export default ReportContainer
