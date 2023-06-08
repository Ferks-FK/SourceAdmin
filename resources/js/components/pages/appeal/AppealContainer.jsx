import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { Formik } from "formik";
import { router } from '@inertiajs/react';
import { AppealFormSchema } from "@/yup/YupSchemas";

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

  return (
    <PageContentBlock title={'Protest a Ban'}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          player_steam_id: '',
          player_ip: '',
          player_name: '',
          player_email: '',
          reason: ''
        }}
        validationSchema={AppealFormSchema}
      >
        {({ isSubmitting }) => (
          <Form title={'Protest a Ban'} formSize={'xl'}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
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
