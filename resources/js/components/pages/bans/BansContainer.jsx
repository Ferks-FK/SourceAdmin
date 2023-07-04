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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from 'use-debounce';
import { faBan, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import http from '@/api/http';

function BansContainer({ data }) {
  const pagination = paginationItems(data)
  const [addError, clearFlashes] = useFlashesStore((state) => [state.addError, state.clearFlashes])
  const [searchQuery, setSearchQuery] = useState('');
  const [bansData, setBansData] = useState(data.data)
  const { t } = useTranslation()
  const [debouncedValue] = useDebounce(searchQuery, 500)

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
          setBansData(filterData({data: response.data, keys: keys, query: searchQuery}))
        }).catch((error) => {
          addError({ message: error.message })
        })
      }
    }
  }, [debouncedValue])

  const BansColumns = [
    "MOD/Country",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={t('bans', { ns: 'sidebar' })}>
      <div>
        <Table.Header
          title={t('bans', { ns: 'sidebar' })}
          icon={faBan}
          iconSize='1x'
        >
          <Input.Search
            size={Size.Small}
            placeholder={t('generic.search')}
            searchQuery={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                    {ban.mod_icon ?
                      <Image src={`/images/games/${ban.mod_icon}.png`} alt={ban.mod_icon} className="h-5" />
                      :
                      <FontAwesomeIcon icon={faCircleQuestion} size='lg'/>
                    }
                    <Image src={ban.flag_url || '/images/unknown.svg'} className="h-5 w-7" />
                  </div>
                </Table.Td>
                <Table.Td>{ban.created_at}</Table.Td>
                <Table.Td>{ban.player_name}</Table.Td>
                <Table.Td>{ban.admin_name ?? t('generic.admin_deleted')}</Table.Td>
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
      {bansData.length >= 10 && <Table.Pagination paginationData={pagination}/>}
    </PageContentBlock>
  )
}

export default BansContainer
