import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { useEffect, useState } from 'react';
import { getPercentage, getStyleAndName } from '@/helpers';
import { useTranslation } from "react-i18next";
import { getBansData } from '@/api/bans/getBans';

function BansContainer() {
  const [query, setQuery] = useState('');
  const [limitQuery, setLimitQuery] = useState(10)
  const [bansData, setBansData] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const fetchBansData = async () => {
      try {
        const response = await getBansData(limitQuery, query);
        setBansData(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (query.length === 0 || query.length > 2) {
      fetchBansData();
    }
  }, [query, limitQuery]);

  const BansColumns = [
    "MOD/Country",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={"Bans"}>
      <Table.Component columns={BansColumns} height={`max-h-screen`} setQuery={setQuery} limitQuery={limitQuery} setLimitQuery={setLimitQuery} dataLength={bansData.length}>
        {bansData.map((ban) => {
          const { name, style } = getStyleAndName(ban, t)

          return (
            <Table.Row key={ban.id}>
              <Table.Td>
                <div className='flex gap-1'>
                  <Image src={`/images/games/${ban.mod_icon}.png`} alt={ban.mod_icon} className="h-5" />
                  <Image src={ban.flag_url || '/images/unknown.svg'} className="h-5 w-7" />
                </div>
              </Table.Td>
              <Table.Td>{ban.created_at}</Table.Td>
              <Table.Td>{ban.player_name}</Table.Td>
              <Table.Td>{ban.admin_name}</Table.Td>
              <Table.Td className={'flex justify-start'}>
                <div className={`${style} px-1 rounded text-center w-fit`}>
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
    </PageContentBlock>
  )
}

export { BansContainer }
