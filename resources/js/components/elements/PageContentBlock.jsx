import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Head } from '@inertiajs/react';

function PageContentBlock({ title, children }) {
  return (
    <>
      <Head title={title ?? 'Dashboard'}/>
      <div className="flex flex-col justify-between w-full h-full overflow-y-auto">
        <AnimationFade>
          {children}
        </AnimationFade>
        <div className="mt-3">
          <SourceAdminReg/>
        </div>
      </div>
    </>
  );
}

export { PageContentBlock }
