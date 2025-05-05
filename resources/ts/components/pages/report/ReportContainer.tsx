import { useEffect, useState } from "react";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Button } from "@/components/elements/button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { getServerData } from '@/api/getServers';
import { ReportFormSchema } from "@/yup/YupSchemas";
import { Formik, FormikHelpers } from "formik";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { ServerDataResponse, PageProps } from "@/types";
import route from 'ziggy-js';

interface Props extends PageProps {
  serversIds: number[]
}

interface Values {
  player_steam_id: string
  player_ip: string
  player_name: string
  comments: string
  reporter_name: string
  reporter_email: string
  server_id: string
  upload_demo: string
}

function ReportContainer(props: Props) {
  const [ serverData, setServerData ] = useState<ServerDataResponse[]>([]);
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
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
        for (const server of props.serversIds) {
          const response = await getServerData(server, false);
          setServerData((prevState) => [...prevState, response.server]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchServerData();
  }, []);

  useFlashMessages(props.flash, props.errors)

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
        validationSchema={ReportFormSchema()}
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
              <Field.FieldRow>
                <Field.Text
                  name={'player_steam_id'}
                  id={'player_steam_id'}
                  label={t('report.steam_id')}
                  description={t('generic.steam_id_formats')}
                  maxLength={20}
                />
                <Field.Text
                  name={'player_ip'}
                  id={'player_ip'}
                  label={t('report.player_ip')}
                />
                <Field.Text
                  name={'player_name'}
                  id={'player_name'}
                  label={t('report.player_name')}
                />
                <Field.TextArea
                  name={'comments'}
                  id={'comments'}
                  label={t('report.comments')}
                  className={'border-2 rounded'}
                />
                <Field.Text
                  name={'reporter_name'}
                  id={'reporter_name'}
                  label={t('report.your_name')}
                />
                <Field.Email
                  name={'reporter_email'}
                  id={'reporter_email'}
                  label={t('report.your_email')}
                />
                <Field.Select
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
                  {serverData.map((server) => (
                    <option key={server.Id} value={server.Id}>
                      {server.HostName}
                    </option>
                  ))}
                </Field.Select>
                <Field.File
                  name={'upload_demo'}
                  id={'upload_demo'}
                  label={t('report.upload_demo')}
                  onChange={(e) => setFieldValue('upload_demo', e.target.files![0])}
                />
              </Field.FieldRow>
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
