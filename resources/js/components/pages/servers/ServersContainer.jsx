import React, { useEffect, useState } from 'react';
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Collapse } from "@/components/elements/Collapse";
import { getServerData } from '@/api/getServers';
import { paginationItems } from "@/helpers";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/elements/button";
import { faServer } from '@fortawesome/free-solid-svg-icons';

function ServersContainer({ serversIds, data }) {
  const pagination = paginationItems(data)
  const [serverData, setServerData] = useState([]);
  const [activeTable, setActiveTable] = useState('');
  const { t } = useTranslation()

  const handleActiveTable = (server_id) => {
    setActiveTable((prevState) => {
      if (prevState === server_id) {
        return ''
      }

      return server_id
    })
  }

  useEffect(() => {
    const fetchServerData = async () => {
      setServerData(serversIds.map((server_id) => {
        return { id: server_id, loading: true }
      }))

      try {
        for (const server of serversIds) {
          const response = await getServerData(server);

          setServerData((state) => state.map((server) => {
            if (server.id == response[0].Id) {
              return response
            }

            return server
          }))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchServerData()
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

  const PlayerColumns = [
    "Name",
    "Score",
    "Time"
  ]

  return (
    <PageContentBlock title={t('servers.servers')}>
      <div>
        <Table.Header
          title={t('servers.servers')}
          icon={faServer}
          iconSize='1x'
        />
        <Table.Component
          columns={ServerColumns}
          dataLength={serverData.length}
        >
          {serverData.map((server) => {
            const serverInfo = server[0]
            const playerInfo = server[1] ? server[1] : []
            const serverId = `server_${serverInfo?.Id || server.id}`

            return (
              <React.Fragment key={serverId}>
                <Table.Row className={`${!serverInfo?.Is_online && '!cursor-not-allowed'}`} onClick={() => serverInfo?.Is_online ? handleActiveTable(serverId) : null}>
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
                {serverInfo?.Is_online &&
                  <tr>
                    <Table.Td colSpan="7" className={'!p-0'}>
                      <Collapse visible={activeTable === serverId}>
                        <Table.Component className={'max-h-60'} columns={PlayerColumns}>
                          {playerInfo.length == 0 ? (
                            <Table.Row className={'!cursor-default'}>
                              <Table.Td colSpan="4" className={'py-4'}>
                                <div className="flex flex-col items-center gap-2">
                                  <p className='text-neutral-300'>{t('no_players_found', { ns: 'table' })}</p>
                                  <Button.ExternalLink to={`steam://connect/${serverInfo.Ip}:${serverInfo.GamePort}`}>
                                    {t('connect', { ns: 'table' })}
                                  </Button.ExternalLink>
                                </div>
                              </Table.Td>
                            </Table.Row>
                          )
                            :
                            playerInfo.map((player) => (
                              <Table.Row id={player.Id} key={player.Name}>
                                <Table.Td>{player.Name}</Table.Td>
                                <Table.Td>{player.Frags}</Table.Td>
                                <Table.Td>{player.TimeF}</Table.Td>
                              </Table.Row>
                            ))}
                        </Table.Component>
                      </Collapse>
                    </Table.Td>
                  </tr>
                }
              </React.Fragment>
            )
          })}
        </Table.Component>
      </div>
      {serversIds.length >= 10 && <Table.Pagination paginationData={pagination}/>}
    </PageContentBlock>
  )
}

export default ServersContainer;
