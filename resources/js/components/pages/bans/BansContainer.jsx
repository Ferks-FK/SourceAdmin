import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { useEffect, useState } from 'react';
import { getPercentage, getStyleAndName, filterData } from '@/helpers';
import { useTranslation } from "react-i18next";
import { router } from '@inertiajs/react';

function BansContainer({ data }) {
  const pagination = {
    currentPage: data.current_page,
    lastPage: data.last_page,
    perPage: data.per_page,
    total: data.total,
    from: data.from,
    to: data.to,
    nextPageUrl: data.next_page_url,
    prevPageUrl: data.prev_page_url
  }
  const [ query, setQuery ] = useState('');
  const [ page, setPage ] = useState(pagination.currentPage);
  const [ bansData, setBansData ] = useState(data.data)
  const { t } = useTranslation()

  useEffect(() => {
    router.get('/bans', { page: page }, {
      onSuccess: (data) => {
        setBansData(data.props.data.data)
      },
      onFinish: () => console.log('terminei'),
      preserveState: true
    })
  }, [page])

  // useEffect(() => {
  //   const filterBansData = async () => {
  //     const keys = ['mod_icon', 'admin_name', 'player_name', 'removed_by', 'time_ban_name']
  //     const filteredData = filterData(bansData, keys, query)

  //     router.get('/bans', { limit: 100 }, {
  //       onSuccess: (page) => {
  //         setBansData(filteredData.filter((item, index) => index < page.props.data.length))
  //       },
  //       onError: () => {
  //         console.log('deu erro')
  //       },
  //       onFinish: () => console.log('terminei'),
  //       preserveState: true,
  //       preserveScroll: true
  //     })
  //   };

  //   if (query.length === 0 || query.length > 2) {
  //     filterBansData();
  //   }

  // }, [query, page]);

  const BansColumns = [
    "MOD/Country",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={"Bans"}>
      <Table.Component
        columns={BansColumns}
        className={`max-h-full`}
        setQuery={setQuery}
        dataLength={bansData.length}
        page={page}
        setPage={setPage}
        paginationData={pagination}
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
    </PageContentBlock>
  )
}

export default BansContainer
