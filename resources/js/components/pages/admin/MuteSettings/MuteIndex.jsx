import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { Progress } from "@/components/elements/Progress";
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCommentSlash, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { getPercentage, getStyleAndName, paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";

function MuteIndex({ data, flash, errors }) {
  const pagination = paginationItems(data)
  const [mutesData] = useState(data.data)
  const { t } = useTranslation();

  const handleClick = (id) => {
    router.visit(route('admin.mutes.show', id));
  }

  useFlashMessages(flash, errors)

  const CommsColumns = [
    "Id",
    "MOD/Type",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={t('mutes_settings.mutes_overview')}>
      <div>
        <Table.Header
          title={t('mutes_settings.mutes')}
          icon={faMicrophoneSlash}
        >
          <Button.InternalLink to={route('admin.mutes.create')}>
            {t('mutes_settings.create_mute')}
          </Button.InternalLink>
        </Table.Header>
        <Table.Component
          columns={CommsColumns}
          dataLength={mutesData.length}
        >
          {mutesData.map((mute) => {
            const { name, style } = getStyleAndName(mute, t)

            return (
              <Table.Row
                key={mute.id}
                onClick={() => handleClick(mute.id)}
              >
                <Table.Td>{mute.id}</Table.Td>
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
      {mutesData.length >= 10 && <Table.Pagination paginationData={pagination} />}
    </PageContentBlock>
  )
}

export default MuteIndex
