import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { can } from '@/helpers';
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { PaginationProps, GroupObject, PageProps } from "@/types";
import { GroupsColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props extends PageProps {
  data: {
    pagination_data: GroupObject[]
    pagination_props: PaginationProps
  }
}

function GroupIndex(props: Props) {
  const [groupsData] = useState<GroupObject[]>(props.data.pagination_data);
  const pagination = props.data.pagination_props;
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
              <Table.Td>{t(`groups_settings.group_type_${group.type}`)}</Table.Td>
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
      <Table.Pagination paginationData={pagination} visible={pagination.total > groupsData.length}/>
    </PageContentBlock>
  )
}

export default GroupIndex
