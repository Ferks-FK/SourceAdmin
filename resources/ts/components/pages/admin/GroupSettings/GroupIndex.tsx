import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { can, paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { PaginationProps, GroupObject, FlashProp, ErrorsProp } from "@/types";
import { GroupsColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  data: PaginationProps & {
    data: GroupObject[]
  }
  timeZone: string
}

function GroupIndex(props: Props) {
  const pagination = paginationItems(props.data)
  const [groupsData] = useState(props.data.data)
  const { t } = useTranslation()

  const handleClick = (id: number) => {
    router.visit(route('admin.groups.show', id));
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('groups_settings.groups_overview')}>
      <div>
        <Table.Header
          title={t('groups_settings.groups')}
          icon={faUsers}
        >
          {can('admin.groups.create') &&
            <Button.InternalLink to={route('admin.groups.create')}>
              {t('groups_settings.create_group')}
            </Button.InternalLink>
          }
        </Table.Header>
        <Table.Component
          columns={GroupsColumns}
          dataLength={groupsData.length}
        >
          {groupsData.map((group) => (
            <Table.Row
              key={group.id}
              onClick={() => handleClick(group.id)}
            >
              <Table.Td>{group.id}</Table.Td>
              <Table.Td>{group.name}</Table.Td>
              <Table.Td>{group.type}</Table.Td>
              <Table.Td
                className="ellipsis !text-current max-w-[15rem] lg:max-w-xs"
              >
                {group.description}
              </Table.Td>
              <Table.Td>{FormatLocaleDate(group.created_at, props.timeZone, undefined, false)}</Table.Td>
              <Table.Td>{FormatLocaleDate(group.updated_at, props.timeZone, undefined, false)}</Table.Td>
            </Table.Row>
          ))}
        </Table.Component>
      </div>
      <Table.Pagination paginationData={pagination} visible={props.data.total > groupsData.length}/>
    </PageContentBlock>
  )
}

export default GroupIndex
