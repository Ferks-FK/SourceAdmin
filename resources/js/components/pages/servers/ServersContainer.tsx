import React, { useEffect, useState } from 'react';
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Collapse } from "@/components/elements/Collapse";
import { getServerData, ResponseData } from '@/api/getServers';
import { paginationItems } from "@/helpers";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/elements/button";
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { PaginationProps, BanObject } from "@/types";

interface Props {
  data: PaginationProps & {
    data: BanObject[]
  }
  serversIds: number[]
}

interface ServerItem {
  id: number
  loading: boolean
  responseData?: ResponseData
}

function ServersContainer({ serversIds, ...props }: Props) {
  console.log(props)
  const pagination = paginationItems(props.data)
  const [serverData, setServerData] = useState<ServerItem[]>(serversIds.map((server_id) => {
    return { id: server_id, loading: true }
  }));
  const [activeTable, setActiveTable] = useState<string>('');
  const { t } = useTranslation()

  const handleActiveTable = (server_id: string) => {
    setActiveTable((prevState) => {
      if (prevState === server_id) {
        return ''
      }

      return server_id
    })
  }

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        for (const server of serversIds) {
          const response = await getServerData(server);

          setServerData((state) => state.map((server) => {
            if (server.id == response.server.Id) {
              return { id: server.id, loading: false, responseData: response }
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
            const serverInfo = server.responseData?.server
            const playerInfo = server.responseData?.players ?? []
            const serverId = `server_${serverInfo?.Id || server.id}`

            return (
              <React.Fragment key={serverId}>
                <Table.Row className={`${!serverInfo?.IsOnline && '!cursor-not-allowed'}`} onClick={() => serverInfo?.IsOnline ? handleActiveTable(serverId) : null}>
                  {server.loading ?
                    ServerColumns.map((column, index) => (
                      <Table.Td key={`connecting_${index}`}>
                        {column === "HostName" && t('servers.quering_server_data')}
                      </Table.Td>
                    ))
                    :
                    serverInfo ?
                      <>
                        <Table.Td>
                          <Image src={`/images/games/${serverInfo.Mod}.png`} alt={serverInfo.Mod} className="w-5" />
                        </Table.Td>
                        <Table.Td>
                          {serverInfo?.IsOnline ?
                            <Image src={`/images/${serverInfo.Os}.png`} className="w-5" />
                            :
                            "N/A"
                          }
                        </Table.Td>
                        <Table.Td>
                          {serverInfo?.IsOnline ?
                            <Image src={`/images/${serverInfo.Secure ? 'shield' : 'smac'}.png`} className="w-5" />
                            :
                            "N/A"
                          }
                        </Table.Td>
                        <Table.Td>{serverInfo.HostName}</Table.Td>
                        <Table.Td>{serverInfo?.IsOnline ? serverInfo.Players + "/" + serverInfo.MaxPlayers : "N/A"}</Table.Td>
                        <Table.Td>{serverInfo.Map}</Table.Td>
                        <Table.Td>{serverInfo?.IsOnline ? Math.round(serverInfo.Ping!) : "N/A"}</Table.Td>
                      </>
                      :
                      null
                  }
                </Table.Row>
                {serverInfo?.IsOnline &&
                  <tr>
                    <Table.Td colSpan={7} className={'!p-0'}>
                      <Collapse visible={activeTable === serverId}>
                        <Table.Component dataLength={playerInfo.length} className={'max-h-60'} columns={PlayerColumns}>
                          {playerInfo.length == 0 ? (
                            <Table.Row className={'!cursor-default'}>
                              <Table.Td colSpan={4} className={'py-4'}>
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
                              <Table.Row key={player.Name}>
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
      <Table.Pagination paginationData={pagination} visible={props.data.total > serversIds.length}/>
    </PageContentBlock>
  )
}

export default ServersContainer;
