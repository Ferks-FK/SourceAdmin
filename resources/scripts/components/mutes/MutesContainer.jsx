import { useEffect, useState } from 'react';
import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Table } from "@/components/elements/table";
import { Image } from "@/components/elements/Image";
import { Progress } from '@/components/elements/Progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash, faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getPercentage, getStyleAndName } from '@/helpers';
import { getMutesData } from "@/api/mutes/getMutes";

function MutesContainer() {
  const [query, setQuery] = useState('');
  const [limitQuery, setLimitQuery] = useState(10)
  const [mutesData, setMutesData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMutesData = async () => {
      try {
        const response = await getMutesData(limitQuery, query);
        setMutesData(response)
      } catch (error) {
        console.error(error)
      }
    }

    if (query.length === 0 || query.length > 2) {
      fetchMutesData();
    }
  }, [query, limitQuery])


  const CommsColumns = [
    "MOD/Type",
    "Date/Time",
    "Player",
    "Admin",
    "Length",
    "Progress"
  ]

  return (
    <PageContentBlock title={"Comms"}>
      <AnimationFade>
        <Table.Component columns={CommsColumns} setQuery={setQuery} limitQuery={limitQuery} setLimitQuery={setLimitQuery} dataLength={mutesData.length}>
          {mutesData.map((mute) => {
            const { name, style } = getStyleAndName(mute, t)

            return (
              <Table.Row key={mute.id}>
                <Table.Td>
                  <div className='flex gap-1'>
                    <Image src={`/images/games/${mute.mod_icon}.png`} alt={mute.mod_icon} className="w-5" />
                    <FontAwesomeIcon icon={mute.type === 'voice' ? faMicrophoneSlash : faCommentSlash} size='xl' />
                  </div>
                </Table.Td>
                <Table.Td>{mute.created_at}</Table.Td>
                <Table.Td>{mute.player_name}</Table.Td>
                <Table.Td>{mute.admin_name}</Table.Td>
                <Table.Td className={'flex justify-start'}>
                  <div className={`${style} px-1 rounded text-center w-fit`}>
                    <span className='text-xs font-semibold'>
                      {name}
                    </span>
                  </div>
                </Table.Td>
                <Table.Td>
                  <Progress bgColor={style} completed={getPercentage(mute)} />
                </Table.Td>
              </Table.Row>
            )
          })}
        </Table.Component>
      </AnimationFade>
    </PageContentBlock>
  )
}

export { MutesContainer }
