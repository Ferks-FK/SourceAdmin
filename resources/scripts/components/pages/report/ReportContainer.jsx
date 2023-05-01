import { Form } from "@/components/elements/Form";
import Field from "@/components/elements/Field";
import { Button } from "@/components/elements/Button";
import { Label } from "@/components/elements/Label";
import { TextArea } from "@/components/elements/TextArea";
import { Formik } from "formik";
import { object, string } from 'yup';


function ReportContainer() {

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
  }

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
        validationSchema={object().shape({
          steam_id: string().matches(
            /^STEAM_[0-1]:[0-1]:\d{1,10}$|^\d{17}$/,
            'SteamID inválido'
          ),
          ip_address: string().matches(
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            'IP Address invalid'
          ),
          player_name: string().required('O nome do jogador é obrigatorio.'),
          comments: string().required('Os comentários são obrigatórios.'),
          reporter_email: string().required('Seu email é obrigatorio.')
        }).test(function(value) {
          const { steam_id, ip_address } = value;

          if (!steam_id && !ip_address) {
            return this.createError({
              message: 'Pelo menos um dos seguintes campos devem ser preenchidos: Steam-ID, IP-Address',
              path: 'steam_id'
            })
          }

          return true;
        })}
      >
        {({ isSubmitting, setSubmitting }) => (
          <Form title={'Report'} formSize={'xl'}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Field
                  type={'text'}
                  name={'steam_id'}
                  label={'Steam ID'}
                  size={'small'}
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
