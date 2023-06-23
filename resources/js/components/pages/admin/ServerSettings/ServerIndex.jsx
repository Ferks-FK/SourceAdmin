import { useEffect, useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { router } from '@inertiajs/react';
import { getServerData } from '@/api/getServers';
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { paginationItems } from '@/helpers';
import { useTranslation } from 'react-i18next';

function ServerIndex({ serversIds, data, flash, errors, ziggy }) {
  const pagination = paginationItems(data)
  const [serverData, setServerData] = useState([])
  const { t } = useTranslation()

  const handleClick = (id) => {
    router.visit(route('admin.servers.show', id))
  }

  useEffect(() => {
    const fetchServerData = async () => {
      setServerData(serversIds.map((server_id) => {
        return { id: server_id, loading: true }
      }))

      try {
        for (const server of serversIds) {
          const response = await getServerData(server, false);

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

  useFlashMessages(flash, errors);

  const ServerColumns = [
    "MOD",
    "OS",
    "VAC",
    "HostName",
    "Players",
    "Map",
    "Ping"
  ]

  return (
    <PageContentBlock title={'Servers Overview'}>
      <AdminLayout ziggy={ziggy}>
        <div>
          <Table.Header
            title={'Servers'}
            icon={faServer}
          >
            <Button.InternalLink to={route('admin.servers.create')}>
              Create Server
            </Button.InternalLink>
          </Table.Header>
          <Table.Component
            columns={ServerColumns}
            dataLength={serverData.length}
          >
            {serverData.map((server) => {
              const serverInfo = server[0]
              const serverId = `server_${serverInfo?.Id || server.id}`

              return (
                <Table.Row key={serverId}onClick={() => handleClick(server.id || serverInfo?.Id)}>
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
        {serversIds.length >= 10 && <Table.Pagination paginationData={pagination}/>}
      </AdminLayout>
    </PageContentBlock>
  )
}

export default ServerIndex
