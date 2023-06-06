import { useState, useEffect } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { router } from '@inertiajs/react';
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function AdminIndex({ data, ...props }) {
  const [ adminData, setAdminData ] = useState(data)

  const handleClick = (id) => {
    router.visit(route('admin.settings.show', id));
  }

  const AdminColumns = [
    "Id",
    "Name",
    "Email",
    "Steam ID",
    "Is Verified",
    "Role",
    "Immunity",
    "Created At",
    "Updated At"
  ]

  return (
    <PageContentBlock title={'Admins Overview'}>
      <AdminLayout ziggy={props.ziggy}>
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
              <Table.Td>{admin.created_at}</Table.Td>
              <Table.Td>{admin.updated_at}</Table.Td>
            </Table.Row>
          ))}
        </Table.Component>
      </AdminLayout>
    </PageContentBlock>
  )
}

export default AdminIndex
