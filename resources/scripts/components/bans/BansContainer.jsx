import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getBansData } from '@/api/bans/getBans';

function BansContainer() {
  const [query, setQuery] = useState('');
  const [limitQuery, setLimitQuery] = useState(10)
  const [bansData, setBansData] = useState([]);
  const { t } = useTranslation();

  const getBanStyleAndName = (props) => {
    const now = Date.now();
    const end = new Date(props.end_at).getTime();

    if (props.removed_by) {
      return {
        banStyle: 'bg-blue-500',
        banName: `${props.time_ban_name} (${t('unbanned', { ns: 'table' })})`
      };
    }

    if (props.time_ban_value === 0) {
      return {
        banStyle: 'bg-red-500',
        banName: props.time_ban_name
      };
    }

    if (end > now) {
      return {
        banStyle: 'bg-yellow-500',
        banName: props.time_ban_name
      };
    }

    return {
      banStyle: 'bg-green-500',
      banName: `${props.time_ban_name} (${t('expired', { ns: 'table' })})`
    };
  };

  const getBanPercentage = (props) => {
    // When the ban is permanent or when the ban has been revoked.
    if (props.end_at === null || props.removed_by) {
      return 100;
    }

    const now = Date.now();
    const end = new Date(props.end_at).getTime();
    const difference = end - now;
    const percentage = 100 - (difference / (1000 * 60 * 60 * 24 * 365)) * 100;

    return percentage > 100 ? 100 : percentage;
  };

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
      <AnimationFade>
        <Table.Component columns={BansColumns} height={`max-h-screen`} setQuery={setQuery} limitQuery={limitQuery} setLimitQuery={setLimitQuery} dataLength={bansData.length}>
          {bansData.map((ban) => {
            const { banStyle, banName } = getBanStyleAndName(ban)

            return (
              <Table.Row key={ban.id}>
                <Table.Td>
                  <div className='flex gap-1'>
                    <Image src={`/images/games/${ban.mod_icon}.png`} alt={ban.mod_icon} className="h-5"/>
                    <Image src={ban.flag_url || '/images/unknown.svg'} className="h-5 w-7"/>
                  </div>
                </Table.Td>
                <Table.Td>{ban.created_at}</Table.Td>
                <Table.Td>{ban.player_name}</Table.Td>
                <Table.Td>{ban.admin_name}</Table.Td>
                <Table.Td className={'flex justify-start'}>
                  <div className={`${banStyle} px-1 rounded text-center w-fit`}>
                    <span className='text-xs font-semibold'>
                      {banName}
                    </span>
                  </div>
                </Table.Td>
                <Table.Td>
                  <Progress bgColor={banStyle} completed={getBanPercentage(ban)}/>
                </Table.Td>
              </Table.Row>
            )
        })}
        </Table.Component>
      </AnimationFade>
    </PageContentBlock>
  )
}

export { BansContainer }
