import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { Formik } from "formik";
import { object, string } from 'yup';
import { router } from '@inertiajs/react';

function AppealContainer({ flash, errors }) {

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    router.post(route('appeal.store'), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
      onSuccess: () => {
        resetForm()
      }
    })
  }

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
    reason: string().required('The reason is required.'),
    player_email: string().required('Your email address is required.')
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
    <PageContentBlock title={'Protest a Ban'}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          steam_id: '',
          ip_address: '',
          player_name: '',
          reason: '',
          player_email: ''
        }}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form title={'Protest a Ban'} formSize={'xl'}>
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
                  label={'Your Name'}
                />
                <Field
                  type={'text-area'}
                  name={'reason'}
                  id={'reason'}
                  label={'Reason'}
                  placeholder={'Be as descriptive as possible as to why you should be unbanned.'}
                  className={'border-2 rounded'}
                />
                <Field
                  type={'email'}
                  name={'player_email'}
                  id={'player_email'}
                  label={'Your Email'}
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

export default AppealContainer
