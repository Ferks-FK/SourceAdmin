import { useEffect, useState } from 'react';
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { Input } from "@/components/elements/inputs";
import { Size } from "@/components/elements/inputs/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash, faCommentSlash, faBan, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getPercentage, getStyleAndName, filterData, paginationItems } from '@/helpers';
import { useDebounce } from 'use-debounce';
import { useFlashesStore } from '@/stores/flashes';
import http from '@/api/http';

function MutesContainer({ data }) {
  const pagination = paginationItems(data)
  const [addError, clearFlashes] = useFlashesStore((state) => [state.addError, state.clearFlashes])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const [mutesData, setMutesData] = useState(data.data);
  const [debouncedValue] = useDebounce(searchQuery, 500)
  const { t } = useTranslation();

  useEffect(() => {
    clearFlashes()

    if (searchQuery.length == 0 || searchQuery.length > 2) {
      const keys = ['mod_icon', 'admin_name', 'player_name', 'removed_by', 'time_ban_name', 'type']

      // Set the results to the default query when it is no longer being searched.
      if (searchQuery.length == 0) {
        setMutesData(data.data)
      } else {
        // Consult the data based on the search term.
        // This will probably be redone.
        http.get(route('mutes.search'), { params: { all: true } }).then((response) => {
          setMutesData(filterData({data: response.data, keys: keys, query: searchQuery}))
        }).catch((error) => {
          addError({ message: error.message })
        })
      }
    }
  }, [debouncedValue])


  const CommsColumns = [
    "MOD/Type",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={t('mutes', { ns: 'sidebar' })}>
      <div>
        <Table.Header
          title={t('mutes', { ns: 'sidebar' })}
          icon={faMicrophoneSlash}
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
          columns={CommsColumns}
          dataLength={mutesData.length}
        >
          {mutesData.map((mute) => {
            const { name, style } = getStyleAndName(mute, t)

            return (
              <Table.Row key={mute.id}>
                <Table.Td>
                  <div className='flex gap-1'>
                    {mute.mod_icon ?
                      <Image src={`/images/games/${mute.mod_icon}.png`} alt={mute.mod_icon} className="h-5" />
                      :
                      <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
                    }
                    <FontAwesomeIcon icon={mute.type === 'voice' ? faMicrophoneSlash : faCommentSlash} size='xl' />
                  </div>
                </Table.Td>
                <Table.Td>{mute.created_at}</Table.Td>
                <Table.Td>{mute.player_name}</Table.Td>
                <Table.Td>{mute.admin_name ?? t('generic.admin_deleted')}</Table.Td>
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
      {mutesData.length >= 10 && <Table.Pagination paginationData={pagination}/>}
    </PageContentBlock>
  )
}

export default MutesContainer
