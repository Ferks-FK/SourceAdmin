import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { AnimationFade } from '@/components/elements/AnimationFade';
import { Head } from '@inertiajs/react';
import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string
}

function PageContentBlock({ title, children, className }: Props) {
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
