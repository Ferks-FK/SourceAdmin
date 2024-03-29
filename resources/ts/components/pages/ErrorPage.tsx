import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Image } from "@/components/elements/Image";
import { Button } from "@/components/elements/button";
import { Size } from "@/components/elements/button/types";
import { useTranslation } from 'react-i18next';
import route from 'ziggy-js';

interface Props {
  status: string
}

function ErrorPage({ status }: Props) {
  const { t } = useTranslation('errors');

  const title = {
    503: t(status, {status}),
    500: t(status, {status}),
    404: t(status, {status}),
    403: t(status, {status}),
    429: t(status, {status})
  }[status]

  return (
    <PageContentBlock title={title}>
      <div className='flex justify-center'>
        <div className='w-full sm:w-3/4 md:w-1/2 p-6 md:p-8 bg-dark-secondary rounded-lg shadow-lg text-center relative'>
          <div className='flex flex-col justify-between items-center'>
            <div className='pointer-events-none select-none'>
              <Image src={`/images/http_errors/${status}.png`} className={'w-full h-full'}/>
            </div>
            <Button.InternalLink to={route('home.index')} size={Size.Large}>
              {t('back', {ns: 'buttons'})}
            </Button.InternalLink>
          </div>
        </div>
      </div>
    </PageContentBlock>
  )
}

export default ErrorPage
