import { useState, useEffect } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Variant } from "@/components/elements/button/types";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { getServerData } from "@/api/getServers";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { MuteEditSchema } from "@/yup/YupSchemas";
import { faClock, faCommentSlash, faHourglassHalf, faMicrophoneSlash, faNetworkWired, faPlay, faQuestion, faServer, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faSteam } from "@fortawesome/free-brands-svg-icons"
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";

function MuteShow({ mute, reasons, timeBans, flash, errors }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [serverInfo, setServerInfo] = useState([]);
  const [reasonsData] = useState(reasons);
  const [timeBansData] = useState(timeBans);
  const [muteInfo] = useState(mute);

  console.log(muteInfo)

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await getServerData(muteInfo.server_id, false);

        setServerInfo(response[0])
      } catch (error) {
        console.error(error)
      }
    }

    if (muteInfo.server_id) {
      fetchServerData()
    }
  }, [])

  const handleSubmit = (values, { setSubmitting }) => {
    router.patch(route('admin.mutes.update', muteInfo.id), { ...values })
  }

  const handleDelete = () => {
    router.delete(route('admin.mutes.destroy', muteInfo.id))
  }

  const handleUnmute = () => {
    router.put(route('admin.mutes.action.unmute', muteInfo.id))
  }

  const handleRemute = () => {
    router.put(route('admin.mutes.action.remute', muteInfo.id))
  }

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
    setModalContent('');
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={`Mute Of ${muteInfo.player_name}`}>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 bg-dark-primary">
        <ul>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faUser} color="white" className="w-4" />&nbsp;
            <p>Player Name: {muteInfo.player_name}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faNetworkWired} color="white" className="w-4" />&nbsp;
            <p>Player IP: {muteInfo.ip ?? 'No IP present.'}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faSteam} color="white" className="w-4" />&nbsp;
            <p>Player SteamID: {muteInfo.steam_id ?? 'No SteamID present.'}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faPlay} color="white" className="w-4" />&nbsp;
            <p>Created At: {muteInfo.created_at}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faHourglassHalf} color="white" className="w-4" />&nbsp;
            <p>Length: {muteInfo.time_ban_name}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faClock} color="white" className="w-4" />&nbsp;
            <p>Expires At: {muteInfo.time_ban_value == 0 ? 'Never.' : muteInfo.end_at}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faQuestion} color="white" className="w-4" />&nbsp;
            <p>Reason: {muteInfo.reason}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faUserGear} color="white" className="w-4" />&nbsp;
            <p>Muted By: {muteInfo.admin_name ?? 'Admin Deleted.'}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={muteInfo.type === 'voice' ? faMicrophoneSlash : faCommentSlash} color="white" className="w-4" />&nbsp;
            <p>Total Mutes: {muteInfo.ban_count}</p>
          </li>
          <li className="flex mobile:items-center">
            <FontAwesomeIcon icon={faServer} color="white" className="w-4" />&nbsp;
            <p>Muted From: {muteInfo.server_id ? serverInfo.HostName : 'Server Deleted.'}</p>
          </li>
        </ul>
        <div className="flex justify-center gap-2">
          {muteInfo.player_is_muted ?
            <Button.Text variant={Variant.Warning} onClick={() => showModal(
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">Unmute player "{muteInfo.player_name}"?</h3>
                  <p className="text-sm">
                    When you confirm the unmute of the player mute, the player will be unmuted from your servers and will be able to speak/type again.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    Cancel
                  </Button.Text>
                  <Button.Danger onClick={handleUnmute}>
                    Unmute
                  </Button.Danger>
                </div>
              </>
            )}>
              Unmute
            </Button.Text>
            :
            <Button.Text variant={Variant.Info} onClick={() => showModal(
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">Remute player "{muteInfo.player_name}"?</h3>
                  <p className="text-sm">
                    When you confirm the remute of the player, he will be mutated from all your servers again.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    Cancel
                  </Button.Text>
                  <Button.Danger onClick={handleRemute}>
                    Remute
                  </Button.Danger>
                </div>
              </>
            )}>
              Remute
            </Button.Text>
          }
          <Button.Danger className={'!font-header'} onClick={() => showModal(
            <>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl text-left">Delete mute of "{muteInfo.player_name}"?</h3>
                <p className="text-sm">
                  When you confirm the deletion of the mute, it will be deleted from the database, and the muted player will be able to speak/type again on the servers.
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
            </>
          )}>
            Delete Mute
          </Button.Danger>
        </div>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          reason_id: muteInfo.reason_id,
          time_ban_id: muteInfo.time_ban_id
        }}
        validationSchema={MuteEditSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <div className="flex flex-col gap-4 p-4 bg-dark-primary">
            <Modal
              isVisible={modalVisible}
              onClickCloseBtn={hideModal}
              onPressEscKey={hideModal}
              onClickBackdrop={hideModal}
            >
              <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                {modalContent}
              </div>
            </Modal>
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-2 lg:gap-4">
                  <Field
                    type={'select'}
                    name={'time_ban_id'}
                    id={'time_ban_id'}
                    label={'Length'}
                    value={values.time_ban_id}
                    onChange={(e) => setFieldValue('time_ban_id', e.target.value)}
                  >
                    {timeBansData.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <Field
                    type={'select'}
                    name={'reason_id'}
                    id={'reason_id'}
                    label={'Reason'}
                    value={values.reason_id}
                    onChange={(e) => setFieldValue('reason_id', e.target.value)}
                  >
                    {reasonsData.map(({ id, reason }) => (
                      <option key={id} value={id}>
                        {reason}
                      </option>
                    ))}
                  </Field>
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
    </PageContentBlock>
  )
}

export default MuteShow
