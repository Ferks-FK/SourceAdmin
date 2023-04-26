import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Head } from '@inertiajs/react'

function PageContentBlock({ title, className, children }) {
  return (
    <>
      <Head title={title ?? 'Dashboard'}/>
      <div className="flex flex-col justify-between h-full">
        <div className={`h-[95%] ${className ?? ''}`}>
          <AnimationFade>
            {children}
          </AnimationFade>
        </div>
        <div className="my-3">
          <SourceAdminReg/>
        </div>
      </div>
    </>
  );
}

export { PageContentBlock }
