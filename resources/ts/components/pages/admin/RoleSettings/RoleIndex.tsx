import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { paginationItems } from '@/helpers';
import { useTranslation } from "react-i18next";
import { FormatLocaleDate } from "@/i18n/locales";
import { PaginationProps, RoleObject, FlashProp, ErrorsProp } from "@/types";
import { RolesColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  data: PaginationProps & {
    data: RoleObject[]
  }
  timeZone: string
}

function RoleIndex(props: Props) {
  const pagination = paginationItems(props.data)
  const [rolesData] = useState(props.data.data)
  const { t } = useTranslation();

  const handleClick = (id: number) => {
    router.visit(route('admin.roles.show', id));
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('roles', {ns: 'sidebar'})}>
      <div>
        <Table.Header
          title={t('roles', {ns: 'sidebar'})}
          icon={faUsersGear}
        >
          <Button.InternalLink to={route('admin.roles.create')}>
            {t('role_settings.create_role')}
          </Button.InternalLink>
        </Table.Header>
        <Table.Component
          columns={RolesColumns}
          dataLength={rolesData.length}
        >
          {rolesData.map((role) => (
              <Table.Row
                key={role.id}
                onClick={() => handleClick(role.id)}
              >
                <Table.Td>{role.id}</Table.Td>
                <Table.Td>{role.name}</Table.Td>
                <Table.Td>{role.users_count}</Table.Td>
                <Table.Td>{role.permissions_count}</Table.Td>
                <Table.Td>{FormatLocaleDate(role.created_at, props.timeZone, undefined, false)}</Table.Td>
                <Table.Td>{FormatLocaleDate(role.updated_at, props.timeZone, undefined, false)}</Table.Td>
              </Table.Row>
            ))}
        </Table.Component>
      </div>
      <Table.Pagination paginationData={pagination} visible={props.data.total > rolesData.length}/>
    </PageContentBlock>
  )
}

export default RoleIndex
