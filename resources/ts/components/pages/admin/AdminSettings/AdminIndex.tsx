import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleXmark, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { paginationItems, can } from '@/helpers';
import { useTranslation } from "react-i18next";
import { PaginationProps, PageProps, FlashProp, ErrorsProp } from "@/types";
import { UserData } from "@/stores/user";
import { AdminColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props extends PageProps {
  flash: FlashProp
  errors: ErrorsProp
  data: PaginationProps & {
    data: UserData[]
  }
}

function AdminIndex(props: Props) {
  const pagination = paginationItems(props.data)
  const [adminData] = useState(props.data.data)
  const { t } = useTranslation();

  const handleClick = (id: number) => {
    router.visit(route('admin.settings.show', id));
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('admin_overview.admin_overview')}>
      <div>
        <Table.Header
          title={t('admin_settings.users')}
          icon={faUsers}
        >
          {can('admin.admins.create') &&
            <Button.InternalLink to={route('admin.settings.create')}>
              {t('admin_settings.create_user')}
            </Button.InternalLink>
          }
        </Table.Header>
        <Table.Component
          columns={AdminColumns}
          dataLength={adminData.length}
        >
          {adminData.map((admin) => (
            <Table.Row
              key={admin.id}
              className={'whitespace-nowrap'}
              onClick={() => handleClick(admin.id)}
            >
              <Table.Td>{admin.id}</Table.Td>
              <Table.Td>{admin.name}</Table.Td>
              <Table.Td>{admin.email}</Table.Td>
              <Table.Td>{admin.steam_id}</Table.Td>
              <Table.Td>
                <FontAwesomeIcon icon={admin.email_verified_at ? faCheckCircle : faCircleXmark} color={admin.email_verified_at ? 'green' : '#d62727'} className="w-5"/>
              </Table.Td>
              <Table.Td>{admin.roles.at(0)?.name}</Table.Td>
              <Table.Td>100</Table.Td>
            </Table.Row>
          ))}
        </Table.Component>
      </div>
      <Table.Pagination paginationData={pagination} visible={props.data.total > adminData.length} />
    </PageContentBlock>
  )
}

export default AdminIndex
