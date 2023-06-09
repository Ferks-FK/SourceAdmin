import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash, faCommentSlash, faFaceMeh, faServer, faHand } from "@fortawesome/free-solid-svg-icons";
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { getServerData } from '@/api/servers/getServers';
import { Table } from '@/components/elements/table';
import { Image } from '@/components/elements/Image';
import { Progress } from '@/components/elements/Progress';
import { useTranslation } from 'react-i18next';
import { getPercentage, getStyleAndName } from '@/helpers';

function DashboardContainer({ serversIds, ...props }) {
  const { serversCount, bansCount, mutesCount, bansData, mutesData } = props;
  const [serverData, setServerData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchServerData = async () => {
      setServerData(serversIds.map((server_id) => {
        return { id: server_id, loading: true }
      }))

      try {
        for (const server_id of serversIds) {
          const response = await getServerData(server_id, false);
          setServerData((state) => state.map((server) => {
            if (server.id == response[0].Id) {
              return response
            }

            return server
          }))
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchServerData();
  }, [])

  const ServerColumns = [
    "MOD",
    "OS",
    "VAC",
    "HostName",
    "Players",
    "Map",
    "Ping"
  ]

  const BansColumns = [
    "MOD/Country",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  const CommsColumns = [
    "MOD/Type",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={'Dashboard'} className={'gap-10'}>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col'>
          <Table.Header
            title={'Latest Servers'}
            icon={faServer}
            iconSize='1x'
          >
            <p>Total Servers: {serversCount}</p>
          </Table.Header>
          <Table.Component
            columns={ServerColumns}
            dataLength={serverData.length}
          >
            {serverData.map((server) => {
              const serverInfo = server[0]

              return (
                <Table.Row key={server.id || serverInfo?.Id} className={`${!serverInfo?.Is_online && '!cursor-not-allowed'} !cursor-default`}>
                  {server.loading ?
                    ServerColumns.map((column, index) => (
                      <Table.Td key={`connecting_${index}`}>
                        {column === "HostName" && t('servers.quering_server_data')}
                      </Table.Td>
                    ))
                    :
                    <>
                      <Table.Td>
                        <Image src={`/images/games/${serverInfo.Mod}.png`} alt={serverInfo.Mod} className="w-5" />
                      </Table.Td>
                      <Table.Td>
                        {serverInfo?.Is_online ?
                          <Image src={`/images/${serverInfo.Os}.png`} className="w-5" />
                          :
                          "N/A"
                        }
                      </Table.Td>
                      <Table.Td>
                        {serverInfo?.Is_online ?
                          <Image src={`/images/${serverInfo.Secure ? 'shield' : 'smac'}.png`} className="w-5" />
                          :
                          "N/A"
                        }
                      </Table.Td>
                      <Table.Td>{serverInfo.HostName}</Table.Td>
                      <Table.Td>{serverInfo?.Is_online ? serverInfo.Players + "/" + serverInfo.MaxPlayers : "N/A"}</Table.Td>
                      <Table.Td>{serverInfo.Map}</Table.Td>
                      <Table.Td>{serverInfo?.Is_online ? Math.round(serverInfo.Ping) : "N/A"}</Table.Td>
                    </>
                  }
                </Table.Row>
              )
            })}
          </Table.Component>
        </div>
        <div className='flex flex-col'>
          <Table.Header
            title={'Latest Added Bans'}
            icon={faFaceMeh}
            iconSize='1x'
          >
            <p>Total Bans: {bansCount}</p>
          </Table.Header>
          <Table.Component
            columns={BansColumns}
            className={`max-h-screen`}
            dataLength={bansData.length}
          >
            {bansData.map((ban) => {
              const { name, style } = getStyleAndName(ban, t)

              return (
                <Table.Row key={ban.id}>
                  <Table.Td>
                    <div className='flex gap-1'>
                      <Image src={`/images/games/${ban.mod_icon}.png`} alt={ban.mod_icon} className="h-5" />
                      <Image src={ban.flag_url || '/images/unknown.svg'} className="h-5 w-7" />
                    </div>
                  </Table.Td>
                  <Table.Td>{ban.created_at}</Table.Td>
                  <Table.Td>{ban.player_name}</Table.Td>
                  <Table.Td>{ban.admin_name}</Table.Td>
                  <Table.Td className={'text-center'}>
                    <div className={`${style} px-1 rounded text-center whitespace-nowrap w-fit`}>
                      <span className='text-xs font-semibold'>
                        {name}
                      </span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Progress bgColor={style} completed={getPercentage(ban)} />
                  </Table.Td>
                </Table.Row>
              )
            })}
          </Table.Component>
        </div>

        <div className='flex flex-col'>
          <Table.Header
            title={'Latest Added Comms Block'}
            icon={faMicrophoneSlash}
            iconSize='1x'
          >
            <p>Total Blocked: {mutesCount}</p>
          </Table.Header>
          <Table.Component
            columns={CommsColumns}
            dataLength={mutesData.length}
          >
            {mutesData.map((mute) => {
              const { name, style } = getStyleAndName(mute, t)

              return (
                <Table.Row key={mute.id}>
                  <Table.Td>
                    <div className='flex gap-1'>
                      <Image src={`/images/games/${mute.mod_icon}.png`} alt={mute.mod_icon} className="w-5" />
                      <FontAwesomeIcon icon={mute.type === 'voice' ? faMicrophoneSlash : faCommentSlash} size='xl' />
                    </div>
                  </Table.Td>
                  <Table.Td>{mute.created_at}</Table.Td>
                  <Table.Td>{mute.player_name}</Table.Td>
                  <Table.Td>{mute.admin_name}</Table.Td>
                  <Table.Td className={'text-center'}>
                    <div className={`${style} px-1 rounded text-center whitespace-nowrap w-fit`}>
                      <span className='text-xs font-semibold'>
                        {name}
                      </span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Progress bgColor={style} completed={getPercentage(mute)} />
                  </Table.Td>
                </Table.Row>
              )
            })}
          </Table.Component>
        </div>

        {/* It will be changed as soon as we have the plugin working and returning data from offending players. */}
        <div className='flex flex-col'>
          <Table.Header
            title={'Latest Players Blocked'}
            icon={faHand}
            iconSize='1x'
          >
            <p>Total Stopped: {mutesCount}</p>
          </Table.Header>
          <Table.Component
            columns={CommsColumns}
            dataLength={mutesData.length}
          >
            {mutesData.map((mute) => {
              const { name, style } = getStyleAndName(mute, t)

              return (
                <Table.Row key={mute.id}>
                  <Table.Td>
                    <div className='flex gap-1'>
                      <Image src={`/images/games/${mute.mod_icon}.png`} alt={mute.mod_icon} className="w-5" />
                      <FontAwesomeIcon icon={mute.type === 'voice' ? faMicrophoneSlash : faCommentSlash} size='xl' />
                    </div>
                  </Table.Td>
                  <Table.Td>{mute.created_at}</Table.Td>
                  <Table.Td>{mute.player_name}</Table.Td>
                  <Table.Td>{mute.admin_name}</Table.Td>
                  <Table.Td className={'text-center'}>
                    <div className={`${style} px-1 rounded text-center whitespace-nowrap w-fit`}>
                      <span className='text-xs font-semibold'>
                        {name}
                      </span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Progress bgColor={style} completed={getPercentage(mute)} />
                  </Table.Td>
                </Table.Row>
              )
            })}
          </Table.Component>
        </div>
      </div>
    </PageContentBlock>
  )
}

export default DashboardContainer
