import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Collapse } from "@/components/elements/Collapse";
import { getServerData, getServersList } from '@/api/servers/getServers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimationFade } from '@/components/elements/AnimationFade';

function ServersContainer() {
  const [serverData, setServerData] = useState([]);
  const [activeTable, setActiveTable] = useState('');
  const [limitQuery, setLimitQuery] = useState(10);
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
      const serverList = await getServersList(limitQuery)

      setServerData(serverList.map((server_id) => {
        return { id: server_id, loading: true }
      }))

      serverList.forEach(server => {
        getServerData(server, true).then(response => {
          const serverInfo = response[0]
          const playersInfo = response[1] ? response[1] : []
          const servers = []

          setServerData((state) => state.map((server) => {
            if (server.id == serverInfo.Id) {
              servers.push(serverInfo, playersInfo)
              return servers
            }

            return server
          }))
        })
      })
    }

    fetchServerData()
  }, [limitQuery])

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
    <PageContentBlock title={'Servers'}>
      <AnimationFade>
        <Table.Component columns={ServerColumns} limitQuery={limitQuery} setLimitQuery={setLimitQuery}>
          {serverData.map((server) => {
            const serverInfo = server[0]
            const playerInfo = server[1]
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
                        <Table.Component height={'max-h-60'} columns={PlayerColumns}>
                          {playerInfo instanceof Array && playerInfo.map((player) => (
                            <Table.Row id={player.Id} key={player.Name}>
                              <Table.Td className={'!py-2 !px-6'}>{player.Name}</Table.Td>
                              <Table.Td className={'!py-2 !px-6'}>{player.Frags}</Table.Td>
                              <Table.Td className={'!py-2 !px-6'}>{player.TimeF}</Table.Td>
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
      </AnimationFade>
    </PageContentBlock>
  )
}

export { ServersContainer };
