import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Head } from '@inertiajs/react';
import classNames from "classnames";

function PageContentBlock({ title, children, className }) {
  return (
    <>
      <Head title={title ?? 'Dashboard'}/>
      <div className={classNames('flex flex-col justify-between w-full h-full overflow-y-auto', className)}>
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
