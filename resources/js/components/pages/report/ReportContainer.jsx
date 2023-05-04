import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { TextArea } from "@/components/elements/TextArea";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { Formik } from "formik";
import { object, string } from 'yup';
import { router } from '@inertiajs/react';

function ReportContainer(props) {
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

  useFlashMessages(props.flash)

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          steam_id: '',
          ip_address: '',
          player_name: '',
          comments: '',
          reporter_email: ''
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
                  label={'Steam ID'}
                  size={'small'}
                  maxLength={20}
                />
                <Field
                  type={'text'}
                  name={'ip_address'}
                  label={'Player IP'}
                  size={'small'}
                />
                <Field
                  type={'text'}
                  name={'player_name'}
                  label={'Player Name'}
                  size={'small'}
                />
                <TextArea
                  name={'comments'}
                  id={'comment'}
                  label={'Comments'}
                  className={'border-2 rounded'}
                />
                <Field
                  type={'text'}
                  name={'reporter_name'}
                  label={'Your Name'}
                  size={'small'}
                />
                <Field
                  type={'email'}
                  name={'reporter_email'}
                  label={'Your Email'}
                  size={'small'}
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
    </>
  )
}

export default ReportContainer
