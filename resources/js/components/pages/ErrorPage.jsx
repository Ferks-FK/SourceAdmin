import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { Image } from "@/components/elements/Image";
import { Button } from "@/components/elements/Button";
import { useTranslation } from 'react-i18next';

function ErrorPage({ status }) {
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
        <div className='w-full sm:w-3/4 md:w-1/2 p-6 md:p-8 bg-lightDark rounded-lg shadow-lg text-center relative'>
          <div className='flex flex-col justify-between items-center'>
            <div className='pointer-events-none select-none'>
              <Image src={`/images/http_errors/${status}.png`} className={'w-full h-full'}/>
            </div>
            <Button to={route('home.index')} className={'w-min'}>
              {t('back', {ns: 'buttons'})}
            </Button>
          </div>
        </div>
      </div>
    </PageContentBlock>
  )
}

export default ErrorPage
