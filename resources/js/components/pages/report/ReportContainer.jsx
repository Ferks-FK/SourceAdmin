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

function ReportContainer({ serversIds, flash, errors }) {
  const [ serverData, setServerData ] = useState([]);

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
    <PageContentBlock title={'Report'}>
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
            title={'Report'}
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
                  label={'Steam ID'}
                  maxLength={20}
                />
                <Field
                  type={'text'}
                  name={'player_ip'}
                  id={'player_ip'}
                  label={'Player IP'}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  id={'player_name'}
                  label={'Player Name'}
                />
                <Field
                  type={'text-area'}
                  name={'comments'}
                  id={'comments'}
                  label={'Comments'}
                  className={'border-2 rounded'}
                />
                <Field
                  type={'text'}
                  name={'reporter_name'}
                  id={'reporter_name'}
                  label={'Your Name'}
                />
                <Field
                  type={'email'}
                  name={'reporter_email'}
                  id={'reporter_email'}
                  label={'Your Email'}
                />
                <Field
                  type={'select'}
                  name={'server_id'}
                  id={'server_id'}
                  label={'Server'}
                  value={values.server_id || 'default_value'}
                  className={'border-2 hover:border-neutral-400'}
                  onChange={(e) => setFieldValue('server_id', e.target.value)}
                >
                  <option key={'disabled'} value={'default_value'} disabled>
                    Select Server
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
                  label={'Upload Demo'}
                  onChange={(e) => setFieldValue('upload_demo', e.target.files[0])}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button.Text type={'submit'} disabled={isSubmitting} className={'p-2'}>
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

export default ReportContainer
