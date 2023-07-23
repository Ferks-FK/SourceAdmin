import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { Progress } from "@/components/elements/Progress";
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { can, getPercentage, getStyleAndName, paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { PaginationProps, BanObject, FlashProp, ErrorsProp } from "@/types";
import { AdminBansColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  data: PaginationProps & {
    data: BanObject[]
  }
  timeZone: string
}

function BanIndex(props: Props) {
  const pagination = paginationItems(props.data)
  const [bansData] = useState(props.data.data);
  const { t } = useTranslation();

  const handleClick = (id: number) => {
    router.visit(route('admin.bans.show', id));
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('bans_settings.bans_overview')}>
      <div>
        <Table.Header
          title={t('bans_settings.bans')}
          icon={faBan}
        >
          {can('admin.bans.create') &&
            <Button.InternalLink to={route('admin.bans.create')}>
              {t('bans_settings.create_ban')}
            </Button.InternalLink>
          }
        </Table.Header>
        <Table.Component
          columns={AdminBansColumns}
          dataLength={bansData.length}
        >
          {bansData.map((ban) => {
            const { name, style } = getStyleAndName(ban, t)

            return (
              <Table.Row
                key={ban.id}
                onClick={() => handleClick(ban.id)}
              >
                <Table.Td>{ban.id}</Table.Td>
                <Table.Td>
                  <div className='flex gap-1'>
                    {ban.mod_icon ?
                      <Image src={`/images/games/${ban.mod_icon}.png`} alt={ban.mod_icon} className="h-5" />
                      :
                      <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
                    }
                    <Image src={ban.flag_url || '/images/unknown.svg'} className="h-5 w-7" />
                  </div>
                </Table.Td>
                <Table.Td>{FormatLocaleDate(ban.created_at, props.timeZone, undefined, false)}</Table.Td>
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
      <Table.Pagination paginationData={pagination} visible={props.data.total > bansData.length} />
    </PageContentBlock>
  )
}

export default BanIndex
