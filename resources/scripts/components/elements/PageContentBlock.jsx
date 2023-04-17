import { useEffect } from "react";
import { SourceAdminReg } from "@/components/elements/SourceAdminReg";
import { AnimationFade } from '@/components/elements/AnimationFade';

function PageContentBlock({ title, className, children }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <>
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
