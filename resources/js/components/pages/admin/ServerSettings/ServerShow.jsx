import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { Avatar } from "@/components/Avatar";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { AdminEditSchema } from "@/yup/YupSchemas";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { useUserStore } from "@/stores/user";
import { faCircle, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";

function ServerShow({ server, mods, flash, errors, ziggy }) {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ serverData ] = useState(server[0]);
  const [ modData ] = useState(mods)

  console.log(serverData.ModId)

  const handleDelete = () => {

  }

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <PageContentBlock title={`Server ${serverData.HostName}`}>
      <AdminLayout ziggy={ziggy}>
        <Formik
          initialValues={{
            ip: serverData.Ip,
            port: serverData.GamePort || serverData.Port,
            rcon: '',
            new_rcon: '',
            new_rcon_confirmation: '',
            mod_id: serverData.ModId
          }}
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
                  <div className="flex flex-col gap-1 items-center md:items-start">
                    <p className={`${serverData.Is_online ? 'text-sm' : 'text-base'}`}>
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
                      {/* <div className="flex flex-col gap-4">
                        <h3 className="text-2xl text-left">Delete Admin "{user.name}"?</h3>
                        <p className="text-sm">
                          When you confirm the deletion of the user, the action is permanent and cannot be undone.
                          He will also lose the rights to the servers he is associated with.
                        </p>
                        {user.id == auth.user.id && (
                          <p className="text-red-500">
                            You are about to delete your own account!
                          </p>
                        )}
                      </div> */}
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
                      {modData.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </Field>
                    <Field
                      type={'select'}
                      name={'server_region_id'}
                      id={'server_region_id'}
                      label={'Server Region'}
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
