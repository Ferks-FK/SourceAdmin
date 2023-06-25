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
import { getPercentage, getStyleAndName, paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";

function BanIndex({ data, flash, errors }) {
  const pagination = paginationItems(data)
  const [bansData] = useState(data.data);
  const { t } = useTranslation();

  const handleClick = (id) => {
    router.visit(route('admin.bans.show', id));
  }

  useFlashMessages(flash, errors)

  const BansColumns = [
    "Id",
    "MOD/Country",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={'Bans Overview'}>
      <div>
        <Table.Header
          title={'Bans'}
          icon={faBan}
        >
          <Button.InternalLink to={route('admin.bans.create')}>
            Create Ban
          </Button.InternalLink>
        </Table.Header>
        <Table.Component
          columns={BansColumns}
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
                <Table.Td>{ban.created_at}</Table.Td>
                <Table.Td>{ban.player_name}</Table.Td>
                <Table.Td>{ban.admin_name ?? 'Admin Deleted'}</Table.Td>
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
      {bansData.length >= 10 && <Table.Pagination paginationData={pagination} />}
    </PageContentBlock>
  )
}

export default BanIndex
