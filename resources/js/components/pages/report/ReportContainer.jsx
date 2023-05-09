import { useEffect, useState } from "react";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { getServerData } from '@/api/servers/getServers';
import { Formik } from "formik";
import { object, string } from 'yup';
import { router } from '@inertiajs/react';

function ReportContainer({ serversIds, flash, errors }) {
  const [ serverData, setServerData ] = useState([]);
  const [ currentServer, setCurrentServer ] = useState('');
  const [ file, setFile ] = useState('');

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    router.post(route('report.create'), { ...values }, {
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

  const schema = object().shape({
    steam_id: string().matches(
      /^STEAM_[0-1]:[0-1]:\d{1,10}$|^\d{17}$/,
      'SteamID invalid.'
    ),
    ip_address: string().matches(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'IP Address invalid.'
    ),
    player_name: string().required('The player name is required.'),
    comments: string().required('The comments is required.'),
    reporter_name: string(),
    reporter_email: string().required('Your email address is required.')
  }).test(function (value) {
    const { steam_id, ip_address } = value;

    if (!steam_id && !ip_address) {
      return this.createError({
        message: 'At least one of the following fields must be provided: Steam ID, Player IP.',
        path: 'steam_id'
      })
    }

    return true;
  })

  return (
    <PageContentBlock title={'Report'}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          steam_id: '',
          ip_address: '',
          player_name: '',
          comments: '',
          reporter_name: '',
          reporter_email: '',
          server: '',
          upload_demo: ''
        }}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form title={'Report'} formSize={'xl'}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Field
                  type={'text'}
                  name={'steam_id'}
                  id={'steam_id'}
                  label={'Steam ID'}
                  maxLength={20}
                />
                <Field
                  type={'text'}
                  name={'ip_address'}
                  id={'ip_address'}
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
                  id={'comment'}
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
                  name={'server'}
                  id={'server'}
                  label={'Server'}
                  value={currentServer || 'default_value'}
                  className={'border-2 hover:border-neutral-400'}
                  onChange={(e) => setCurrentServer(e.currentTarget.value)}
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
                  <option key={'other_server'} value="other_server">
                    Other server not listed here
                  </option>
                </Field>
                <Field
                  type={'file'}
                  name={'upload_demo'}
                  id={'upload_demo'}
                  label={'Upload Demo'}
                  onChange={(e) => setFile(e.target.files[0])}
                  value={file}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button type={'submit'} disabled={isSubmitting} className={'p-2'}>
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default ReportContainer
