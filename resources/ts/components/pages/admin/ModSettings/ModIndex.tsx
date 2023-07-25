import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Table } from "@/components/elements/table";
import { Button } from "@/components/elements/button";
import { Image } from "@/components/elements/Image";
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { can } from '@/helpers';
import { useTranslation } from "react-i18next";
import { PaginationProps, ModObject, PageProps } from "@/types";
import { ModsColumns } from '@/TableColumns';
import route from 'ziggy-js';

interface Props extends PageProps {
  data: {
    pagination_data: ModObject[]
    pagination_props: PaginationProps
  }
}

function ModIndex(props: Props) {
  const [modsData] = useState<ModObject[]>(props.data.pagination_data);
  const pagination = props.data.pagination_props;
  const { t } = useTranslation()

  const handleClick = (id: number) => {
    router.visit(route('admin.mods.show', id));
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('mods_settings.mods_overview')}>
      <div>
        <Table.Header
          title={t('mods_settings.mods')}
          icon={faBoxesStacked}
        >
          {can('admin.mods.create') &&
            <Button.InternalLink to={route('admin.mods.create')}>
              {t('mods_settings.create_mod')}
            </Button.InternalLink>
          }
        </Table.Header>
        <Table.Component
          columns={ModsColumns}
          dataLength={modsData.length}
        >
          {modsData.map((mod) => (
            <Table.Row
              key={mod.id}
              onClick={() => handleClick(mod.id)}
            >
              <Table.Td>{mod.id}</Table.Td>
              <Table.Td>
                <Image src={`/images/games/${mod.mod}.png`} alt={mod.name} className="w-5"/>
              </Table.Td>
              <Table.Td>{mod.name}</Table.Td>
              <Table.Td>
                <FontAwesomeIcon icon={mod.enabled ? faCheckCircle : faCircleXmark} color={mod.enabled ? 'green' : '#d62727'} className="w-5"/>
              </Table.Td>
            </Table.Row>
          ))}
        </Table.Component>
      </div>
      <Table.Pagination paginationData={pagination} visible={pagination.total > modsData.length}/>
    </PageContentBlock>
  )
}

export default ModIndex
