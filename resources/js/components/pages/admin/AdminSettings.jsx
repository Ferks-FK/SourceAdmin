import { useState, useEffect } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Table } from "@/components/elements/table";

function AdminSettings({ data }) {
  const [ adminData, setAdminData ] = useState(data)


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
    <PageContentBlock title={'admins'}>
      <AdminLayout>
        <Table.Component
          columns={AdminColumns}
          dataLength={adminData.length}
        >
          {adminData.map((admin) => (
            <Table.Row key={admin.id}>
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

export default AdminSettings
