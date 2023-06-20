import { useState, useEffect } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/elements/button";
import { Variant } from "@/components/elements/button/types";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/Field";
import { Formik } from "formik";
import { getServerData } from "@/api/servers/getServers";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { faBan, faClock, faHourglassHalf, faNetworkWired, faPlay, faQuestion, faServer, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faSteam } from "@fortawesome/free-brands-svg-icons"
import { router } from '@inertiajs/react';
import { Modal } from "@/components/elements/modal";

function BanShow({ ban, reasons, timeBans, flash, errors, ziggy }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [serverInfo, setServerInfo] = useState([]);
  const [reasonsData] = useState(reasons);
  const [timeBansData] = useState(timeBans);
  const [banInfo] = useState(ban);

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await getServerData(banInfo.server_id, false);

        setServerInfo(response[0])
      } catch (error) {
        console.error(error)
      }
    }

    if (banInfo.server_id) {
      fetchServerData()
    }
  }, [])

  const handleSubmit = (values, { setSubmitting }) => {
    router.patch(route('admin.bans.update', banInfo.id), { ...values })
  }

  const handleDelete = () => {
    router.delete(route('admin.bans.destroy', banInfo.id))
  }

  const handleUnban = () => {
    router.put(route('admin.bans.action.unban', banInfo.id))
  }

  const handleReban = () => {
    router.put(route('admin.bans.action.reban', banInfo.id))
  }

  function showModal(content) {
    setModalContent(content);
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
    setModalContent('');
  }

  useFlashMessages(flash, errors)

  return (
    <PageContentBlock title={`Ban Of ${banInfo.player_name}`}>
      <AdminLayout ziggy={ziggy}>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 bg-dark-primary">
          <ul>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faUser} color="white" className="w-4" />&nbsp;
              <p>Player Name: {banInfo.player_name}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faNetworkWired} color="white" className="w-4" />&nbsp;
              <p>Player IP: {banInfo.ip ?? 'No IP present.'}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faSteam} color="white" className="w-4" />&nbsp;
              <p>Player SteamID: {banInfo.steam_id ?? 'No SteamID present.'}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faPlay} color="white" className="w-4" />&nbsp;
              <p>Created At: {banInfo.created_at}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faHourglassHalf} color="white" className="w-4" />&nbsp;
              <p>Length: {banInfo.time_ban_name}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faClock} color="white" className="w-4" />&nbsp;
              <p>Expires At: {banInfo.time_ban_value == 0 ? 'Never.' : banInfo.end_at}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faQuestion} color="white" className="w-4" />&nbsp;
              <p>Reason: {banInfo.reason}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faUserGear} color="white" className="w-4" />&nbsp;
              <p>Banned By: {banInfo.admin_name ?? 'Admin Deleted.'}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faBan} color="white" className="w-4" />&nbsp;
              <p>Total Bans: {banInfo.ban_count}</p>
            </li>
            <li className="flex mobile:items-center">
              <FontAwesomeIcon icon={faServer} color="white" className="w-4" />&nbsp;
              <p>Banned From: {banInfo.server_id ? serverInfo.HostName : 'Server Deleted.'}</p>
            </li>
          </ul>
          <div className="flex justify-center gap-2">
            {banInfo.player_is_banned ?
              <Button.Text variant={Variant.Warning} onClick={() => showModal(
                <>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl text-left">Unban player "{banInfo.player_name}"?</h3>
                    <p className="text-sm">
                      When you confirm the unbanning of the player, he will be unbanned from your servers and will be able to connect to any of them again.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button.Text onClick={hideModal}>
                      Cancel
                    </Button.Text>
                    <Button.Danger onClick={handleUnban}>
                      Unban
                    </Button.Danger>
                  </div>
                </>
              )}>
                Unban
              </Button.Text>
              :
              <Button.Text variant={Variant.Info} onClick={() => showModal(
                <>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl text-left">Reban player "{banInfo.player_name}"?</h3>
                    <p className="text-sm">
                      When you confirm the player reban, he will be banned from all your servers again.
                      If he is currently online, he will be disconnected.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button.Text onClick={hideModal}>
                      Cancel
                    </Button.Text>
                    <Button.Danger onClick={handleReban}>
                      Reban
                    </Button.Danger>
                  </div>
                </>
              )}>
                Reban
              </Button.Text>
            }
            <Button.Danger className={'!font-header'} onClick={() => showModal(
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">Delete ban of "{banInfo.player_name}"?</h3>
                  <p className="text-sm">
                    When you confirm the deletion of the ban, it will be deleted from the database, and the banned player will be able to connect to your servers again.
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
              Delete Ban
            </Button.Danger>
          </div>
        </div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            reason_id: banInfo.reason_id,
            time_ban_id: banInfo.time_ban_id
          }}
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
      </AdminLayout>
    </PageContentBlock>
  )
}

export default BanShow
