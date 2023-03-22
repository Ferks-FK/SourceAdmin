import { PageContentBlock } from '@/components/elements/PageContentBlock';
import { AnimationFade } from '@/components/elements/AnimationFade';

function DashboardContainer() {
  return (
    <PageContentBlock title={'Dashboard'}>
      <AnimationFade>
        <p>Dashboard</p>
      </AnimationFade>
    </PageContentBlock>
  )
}

export { DashboardContainer };
