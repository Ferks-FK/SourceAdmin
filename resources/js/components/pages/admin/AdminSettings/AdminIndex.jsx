import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { paginationItems } from '@/helpers';

function AdminIndex({ data, flash, errors }) {
  const pagination = paginationItems(data)
  const [adminData] = useState(data.data)

  const handleClick = (id) => {
    router.visit(route('admin.settings.show', id));
  }

  useFlashMessages(flash, errors)

  const AdminColumns = [
    "Id",
    "Name",
    "Email",
    "Steam ID",
    "Is Verified",
    "Role",
    "Immunity"
  ]

  return (
    <PageContentBlock title={'Admins Overview'}>
      <div>
        <Table.Header
          title={'Users'}
          icon={faUsers}
        >
          <Button.InternalLink to={route('admin.settings.create')}>
            Create User
          </Button.InternalLink>
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
              <Table.Td>{admin.email_verified_at ? "yes" : "no"}</Table.Td>
              <Table.Td>admin</Table.Td>
              <Table.Td>100</Table.Td>
            </Table.Row>
          ))}
        </Table.Component>
      </div>
      {adminData.length >= 10 && <Table.Pagination paginationData={pagination} />}
    </PageContentBlock>
  )
}

export default AdminIndex
