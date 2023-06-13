import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { ServerEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";

function ServerShow({ server, mods, regions, flash, errors, ziggy }) {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ serverData ] = useState(server[0]);
  const [ modsData ] = useState(mods);
  const [ regionsData ] = useState(regions);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    router.patch(route('admin.servers.update', serverData.Id), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      },
      onSuccess: () => {
        resetForm()
      }
    })
  }

  const handleDelete = () => {

  }

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={`Server ${serverData.HostName}`}>
      <AdminLayout ziggy={ziggy}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            ip: serverData.Ip,
            port: serverData.GamePort || serverData.Port,
            rcon: '',
            new_rcon: '',
            new_rcon_confirmation: '',
            mod_id: serverData.ModId,
            region_id: serverData.RegionId,
            enabled: serverData.Enabled
          }}
          validationSchema={ServerEditSchema}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <div className={'flex flex-col gap-4 p-4 bg-dark-primary'}>
              <div className="flex flex-col justify-between md:flex-row items-center md:items-start gap-4" style={{ wordBreak: 'break-word' }}>
                <div className="flex flex-col md:flex-row gap-2 items-center md:items-start text-center md:text-left max-w-sm">
                  <Image
                    src={`/images/games/${serverData.Mod}.png`}
                    alt={serverData.Mod}
                    className={'rounded-full w-24 pointer-events-none select-none'}
                  />
                  <div className={`flex flex-col gap-1 items-center md:items-start ${serverData.Is_online ? 'text-sm' : 'text-base'}`}>
                    <p>
                      {serverData.HostName}
                    </p>
                    <p className="flex gap-1 items-center text-base">
                      Status:
                      <FontAwesomeIcon icon={faCircle} color={serverData.Is_online ? 'green' : 'red'}/>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col items-center text-center md:items-end gap-2 md:text-right">
                    <p>Created At: {serverData.Created_At}</p>
                    <p>Updated At: {serverData.Updated_At}</p>
                    <Button.Danger className={'!font-header'} onClick={showModal}>
                      Delete Server
                    </Button.Danger>
                  </div>
                  <Modal
                    isVisible={modalVisible}
                    onClickCloseBtn={hideModal}
                    onPressEscKey={hideModal}
                    onClickBackdrop={hideModal}
                  >
                    <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-2xl text-left">Delete Server "{serverData.HostName}"?</h3>
                        <p className="text-sm">
                          When you confirm the deletion of the server, the action is permanent and cannot be undone.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button.Text onClick={hideModal}>
                          Cancel
                        </Button.Text>
                        <Button.Danger onClick={handleDelete}>
                          Delete
                        </Button.Danger>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
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
                      label={'Current RCON'}
                    />
                    <Field
                      type={'password'}
                      name={'new_rcon'}
                      id={'new_rcon'}
                      label={'New RCON'}
                    />
                    <Field
                      type={'password'}
                      name={'new_rcon_confirmation'}
                      id={'new_rcon_confirmation'}
                      label={'Confirm New RCON'}
                    />
                    <Field
                      type={'select'}
                      name={'mod_id'}
                      id={'mod_id'}
                      label={'Server MOD'}
                      value={values.mod_id}
                      onChange={(e) => setFieldValue('mod_id', e.target.value)}
                    >
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
                      value={values.region_id}
                      onChange={(e) => setFieldValue('region_id', e.target.value)}
                    >
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
            </div>
          )}
        </Formik>
      </AdminLayout>
    </PageContentBlock>
  )
}

export default ServerShow
