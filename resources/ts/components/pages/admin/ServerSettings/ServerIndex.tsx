import { useEffect, useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { router } from '@inertiajs/react';
import { getServerData } from '@/api/getServers';
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { paginationItems } from '@/helpers';
import { useTranslation } from 'react-i18next';
import { PaginationProps, ServerDataResponse, FlashProp, ErrorsProp } from "@/types";
import { AdminServerColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  serversIds: number[]
  data: PaginationProps & {
    data: ServerDataResponse[]
  }
}

interface ServerItem {
  id: number
  loading: boolean
  responseData?: ServerDataResponse
}

function ServerIndex(props: Props) {
  const pagination = paginationItems(props.data)
  const [serverData, setServerData] = useState<ServerItem[]>(props.serversIds.map((server_id) => {
    return { id: server_id, loading: true }
  }))
  const { t } = useTranslation()

  const handleClick = (id: number) => {
    router.visit(route('admin.servers.show', id))
  }

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        for (const server of props.serversIds) {
          const response = await getServerData(server, false);

          setServerData((state) => state.map((server) => {
            if (server.id == response.server.Id) {
              return { id: server.id, loading: false, responseData: response.server }
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

  useFlashMessages(props.flash, props.errors);

  return (
    <PageContentBlock title={t('servers_settings.servers_overview')}>
      <div>
        <Table.Header
          title={t('servers.servers')}
          icon={faServer}
        >
          <Button.InternalLink to={route('admin.servers.create')}>
            {t('servers_settings.create_server')}
          </Button.InternalLink>
        </Table.Header>
        <Table.Component
          columns={AdminServerColumns}
          dataLength={serverData.length}
        >
          {serverData.map((server) => {
            const serverInfo = server.responseData
            const serverId = `server_${serverInfo?.Id || server.id}`

            return (
              <Table.Row key={serverId} onClick={() => handleClick(server.id)}>
                {server.loading ?
                  AdminServerColumns.map((column, index) => (
                    <Table.Td key={`connecting_${index}`}>
                      {column.name === "HostName" && t('servers.quering_server_data')}
                    </Table.Td>
                  ))
                  :
                  serverInfo ?
                  <>
                    <Table.Td>{serverInfo.Id}</Table.Td>
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
            )
          })}
        </Table.Component>
      </div>
      <Table.Pagination paginationData={pagination} visible={props.data.total > props.serversIds.length}/>
    </PageContentBlock>
  )
}

export default ServerIndex
