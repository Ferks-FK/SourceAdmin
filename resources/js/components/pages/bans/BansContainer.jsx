import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { Input } from "@/components/elements/inputs";
import { Size } from "@/components/elements/inputs/types";
import { useEffect, useState } from 'react';
import { getPercentage, getStyleAndName, filterData, paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";
import { useFlashesStore } from '@/stores/flashes';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import http from '@/api/http';

function BansContainer({ data }) {
  const pagination = paginationItems(data)
  const [addError, clearFlashes] = useFlashesStore((state) => [state.addError, state.clearFlashes])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const [bansData, setBansData] = useState(data.data)
  const { t } = useTranslation()

  useEffect(() => {
    clearFlashes();

    if (searchQuery.length == 0 || searchQuery.length > 2) {
      const keys = ['mod_icon', 'admin_name', 'player_name', 'removed_by', 'time_ban_name']

      // Set the results to the default query when it is no longer being searched.
      if (searchQuery.length == 0) {
        setBansData(data.data)
      } else {
        // Consult the data based on the search term.
        // This will probably be redone.
        http.get(route('bans.search'), { params: { all: true } }).then((response) => {
          setBansData(filterData(response.data, keys, searchQuery))
        }).catch((error) => {
          addError({ message: error.message })
        })
      }
    }
  }, [searchQuery])

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
      <div>
        <Table.Header
          title={t('bans', { ns: 'sidebar' })}
          icon={faBan}
          iconSize='1x'
        >
          <Input.Search
            size={Size.Small}
            placeholder={t('generic.search')}
            onChange={setSearchQuery}
          />
        </Table.Header>
        <Table.Component
          columns={BansColumns}
          className={`max-h-full`}
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
      <Table.Pagination page={currentPage} setPage={setCurrentPage} paginationData={pagination} />
    </PageContentBlock>
  )
}

export default BansContainer
