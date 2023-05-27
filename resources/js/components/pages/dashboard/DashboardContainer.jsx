import React, { useState, useEffect } from 'react';
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { getServerData } from '@/api/servers/getServers';
import { Table } from '@/components/elements/table';
import { Image } from '@/components/elements/Image';
import { Progress } from '@/components/elements/Progress';
import { useTranslation } from 'react-i18next';
import { getPercentage, getStyleAndName } from '@/helpers';

function DashboardContainer({ serversIds, ...props }) {
  const { serversCount, bansCount, bansData } = props;
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

  const TableCustomHeader = ({ title, total }) => (
    <div className='flex p-4 bg-lightDark justify-between rounded-sm'>
      <p className='text-sm'>{title}</p>
      <p className='text-sm'>{total}</p>
    </div>
  )

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

  return (
    <PageContentBlock title={'Dashboard'} className={'gap-10'}>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          {TableCustomHeader({
            title: 'Latest Servers',
            total: `Total Servers: ${serversCount}`
          })}
          <Table.Component columns={ServerColumns} dataLength={serverData.length}>
            {serverData.map((server) => {
              const serverInfo = server[0]
              console.log(serverInfo)

              return (
                <React.Fragment key={server.id}>
                  <Table.Row className={`${!serverInfo?.Is_online && '!cursor-not-allowed'} !cursor-default`}>
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
                </React.Fragment>
              )
            })}
          </Table.Component>
        </div>
        <div className='flex flex-col gap-2'>
          {TableCustomHeader({
            title: 'Latest Added Bans',
            total: `Total Bans: ${bansCount}`
          })}
          <Table.Component columns={BansColumns} className={`max-h-screen`} dataLength={bansData.length}>
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
      </div>
    </PageContentBlock>
  )
}

export default DashboardContainer
